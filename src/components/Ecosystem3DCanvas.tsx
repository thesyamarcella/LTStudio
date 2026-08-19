import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { ArrowRight, Activity, Sparkles, Filter, RotateCcw, ZoomIn, ZoomOut, Move } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Product } from '../types';

interface Node3DData {
  id: string;
  name: string;
  category: 'Personal' | 'Professional' | 'Core';
  role: string;
  tagline: string;
  status: string;
  position: THREE.Vector3;
  connectedTo: string[];
  // 2D Normalized Coordinates (0-100%) for Fallback Vector Graph
  fallback2D: { x: number; y: number };
}

interface ConnectionData {
  fromId: string;
  toId: string;
  curve: THREE.QuadraticBezierCurve3;
  particles: { progress: number; speed: number; size: number }[];
  isPrimary?: boolean;
}

const NODES_CONFIG: Node3DData[] = [
  {
    id: 'ltstudio',
    name: 'LTStudio',
    category: 'Core',
    role: 'Central System Philosophy',
    tagline: 'One action should benefit many workflows.',
    status: 'System Core',
    position: new THREE.Vector3(0, 0.1, 0),
    connectedTo: ['saturumah', 'dayone'],
    fallback2D: { x: 50, y: 48 }
  },
  // Personal Life Domain
  {
    id: 'saturumah',
    name: 'SatuRumah',
    category: 'Personal',
    role: 'Central Household Hub',
    tagline: 'One home. One source of truth.',
    status: 'Daily Driver',
    position: new THREE.Vector3(-3.0, 0.9, 0.8),
    connectedTo: ['everafter', 'our', 'littlebetter', 'dayone'],
    fallback2D: { x: 30, y: 38 }
  },
  {
    id: 'everafter',
    name: 'EverAfter',
    category: 'Personal',
    role: 'Milestone Event Management',
    tagline: 'Wedding & Event Engine',
    status: 'Daily Driver',
    position: new THREE.Vector3(-4.6, 2.3, -0.6),
    connectedTo: ['saturumah'],
    fallback2D: { x: 14, y: 22 }
  },
  {
    id: 'our',
    name: 'OUR',
    category: 'Personal',
    role: 'Family Archive & Vault',
    tagline: 'Family Document Repository',
    status: 'Live',
    position: new THREE.Vector3(-4.9, -0.7, 0.3),
    connectedTo: ['saturumah'],
    fallback2D: { x: 12, y: 55 }
  },
  {
    id: 'littlebetter',
    name: 'LittleBetter',
    category: 'Personal',
    role: 'Health & Wellness Log',
    tagline: 'Personal Medical Core',
    status: 'Daily Driver',
    position: new THREE.Vector3(-2.4, -2.0, 0.9),
    connectedTo: ['saturumah', 'getaway'],
    fallback2D: { x: 26, y: 76 }
  },
  {
    id: 'getaway',
    name: 'GetAway',
    category: 'Personal',
    role: 'Travel Contextualizer',
    tagline: 'Itinerary & Route Engine',
    status: 'In Development',
    position: new THREE.Vector3(-4.2, -2.9, -0.5),
    connectedTo: ['littlebetter'],
    fallback2D: { x: 10, y: 86 }
  },
  // Professional Life Domain
  {
    id: 'dayone',
    name: 'DayOne',
    category: 'Professional',
    role: 'Personal Productivity',
    tagline: 'Context-Aware Workspace',
    status: 'In Development',
    position: new THREE.Vector3(3.0, 1.3, 0.6),
    connectedTo: ['forge', 'saturumah'],
    fallback2D: { x: 72, y: 35 }
  },
  {
    id: 'forge',
    name: 'Forge',
    category: 'Professional',
    role: 'Studio-Building Layer',
    tagline: 'Independent Studio Infrastructure',
    status: 'Future',
    position: new THREE.Vector3(4.7, -0.2, -0.5),
    connectedTo: ['dayone', 'align'],
    fallback2D: { x: 88, y: 52 }
  },
  {
    id: 'align',
    name: 'Align',
    category: 'Professional',
    role: 'Organizational Alignment',
    tagline: 'Strategic Governance Engine',
    status: 'Future',
    position: new THREE.Vector3(3.8, -2.3, 0.4),
    connectedTo: ['forge'],
    fallback2D: { x: 78, y: 78 }
  }
];

function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    return Boolean(gl);
  } catch {
    return false;
  }
}

interface Ecosystem3DCanvasProps {
  onOpenProductDetail?: (product: Product) => void;
}

export const Ecosystem3DCanvas: React.FC<Ecosystem3DCanvasProps> = ({ onOpenProductDetail }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { language, products } = useLanguage();

  const [activeFilter, setActiveFilter] = useState<'all' | 'Personal' | 'Professional'>('all');
  const activeFilterRef = useRef<'all' | 'Personal' | 'Professional'>('all');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [screenCoords, setScreenCoords] = useState<{
    [id: string]: { x: number; y: number; visible: boolean; depth: number };
  }>({});
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [isDraggingState, setIsDraggingState] = useState<boolean>(false);

  // Sync ref with activeFilter for the 60fps render loop
  useEffect(() => {
    activeFilterRef.current = activeFilter;
    // If a selected node is now filtered out (and not Core), unselect it
    if (selectedNodeId && activeFilter !== 'all') {
      const node = NODES_CONFIG.find((n) => n.id === selectedNodeId);
      if (node && node.category !== 'Core' && node.category !== activeFilter) {
        setSelectedNodeId(null);
      }
    }
  }, [activeFilter, selectedNodeId]);

  // Drag & Orbit state refs
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const totalDragDistanceRef = useRef(0);
  const rotationRef = useRef({ x: 0.1, y: 0, targetX: 0.1, targetY: 0 });
  const zoomRef = useRef({ distance: 11.5, targetDistance: 11.5 });
  const autoRotateRef = useRef(true);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const ecosystemGroupRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshesMapRef = useRef<{ [id: string]: THREE.Group }>({});
  const connectionsRef = useRef<ConnectionData[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handleChange = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Selected product object
  const selectedNode = useMemo(() => {
    if (!selectedNodeId) return null;
    return NODES_CONFIG.find((n) => n.id === selectedNodeId) || null;
  }, [selectedNodeId]);

  const selectedProductObj = useMemo(() => {
    if (!selectedNode) return null;
    return products.find((p) => p.id === selectedNode.id) || null;
  }, [selectedNode, products]);

  // Highlighted IDs based on hovered or selected node
  const activeFocusId = hoveredNodeId || selectedNodeId;
  const connectedNodeIds = useMemo(() => {
    if (!activeFocusId) return new Set<string>();
    const set = new Set<string>([activeFocusId]);

    // Find direct connections
    const target = NODES_CONFIG.find((n) => n.id === activeFocusId);
    if (target) {
      target.connectedTo.forEach((id) => set.add(id));
    }
    NODES_CONFIG.forEach((n) => {
      if (n.connectedTo.includes(activeFocusId)) {
        set.add(n.id);
      }
    });

    return set;
  }, [activeFocusId]);

  // Reset view to default orientation
  const handleResetView = useCallback(() => {
    rotationRef.current.targetX = 0.1;
    rotationRef.current.targetY = 0;
    rotationRef.current.x = 0.1;
    rotationRef.current.y = 0;
    zoomRef.current.targetDistance = 11.5;
    zoomRef.current.distance = 11.5;
    autoRotateRef.current = true;
    setSelectedNodeId(null);
    setHoveredNodeId(null);
    setActiveFilter('all');
  }, []);

  const handleZoom = useCallback((delta: number) => {
    zoomRef.current.targetDistance = Math.min(18, Math.max(6.0, zoomRef.current.targetDistance + delta));
    autoRotateRef.current = false;
  }, []);

  // Pointer event handlers for hand dragging & orbit
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    // CRITICAL: Do NOT start drag or capture pointer if clicking on buttons or interactive elements
    if (
      target.tagName === 'BUTTON' ||
      target.closest('button') ||
      target.closest('a') ||
      target.closest('[data-no-drag]') ||
      target.closest('.interactive-control') ||
      target.closest('.node-badge')
    ) {
      return;
    }

    // Only drag with primary mouse button or touch
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    isDraggingRef.current = true;
    setIsDraggingState(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    totalDragDistanceRef.current = 0;
    autoRotateRef.current = false;

    if (containerRef.current) {
      try {
        containerRef.current.setPointerCapture(e.pointerId);
      } catch {
        // Safe fallback
      }
    }
  }, []);

  const selectedNodeIdRef = useRef<string | null>(selectedNodeId);
  useEffect(() => {
    selectedNodeIdRef.current = selectedNodeId;
  }, [selectedNodeId]);

  const hoveredNodeIdRef = useRef<string | null>(hoveredNodeId);
  useEffect(() => {
    hoveredNodeIdRef.current = hoveredNodeId;
  }, [hoveredNodeId]);

  // Handle pointer move for rotation and hover raycasting
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;
      totalDragDistanceRef.current += Math.hypot(deltaX, deltaY);

      dragStartRef.current = { x: e.clientX, y: e.clientY };

      // Update target rotations (orbit around Y and X)
      rotationRef.current.targetY += deltaX * 0.007;
      rotationRef.current.targetX += deltaY * 0.005;

      // Clamp pitch angle so the scene doesn't flip upside down
      rotationRef.current.targetX = Math.max(-0.65, Math.min(0.65, rotationRef.current.targetX));
    } else {
      // 3D Raycaster Hover check
      if (cameraRef.current && ecosystemGroupRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const mouse = new THREE.Vector2(
          ((e.clientX - rect.left) / rect.width) * 2 - 1,
          -((e.clientY - rect.top) / rect.height) * 2 + 1
        );
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, cameraRef.current);
        const intersects = raycaster.intersectObjects(ecosystemGroupRef.current.children, true);
        let hitNodeId: string | null = null;
        for (const hit of intersects) {
          let current: THREE.Object3D | null = hit.object;
          while (current && current !== ecosystemGroupRef.current) {
            if (current.userData && current.userData.nodeId) {
              hitNodeId = current.userData.nodeId;
              break;
            }
            current = current.parent;
          }
          if (hitNodeId) break;
        }
        setHoveredNodeId(hitNodeId);
      }
    }
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDraggingState(false);

      if (containerRef.current && containerRef.current.hasPointerCapture(e.pointerId)) {
        try {
          containerRef.current.releasePointerCapture(e.pointerId);
        } catch {
          // Safe fallback
        }
      }

      // If it was a click (minimal drag distance), perform 3D Raycasting to inspect node
      if (totalDragDistanceRef.current < 8) {
        if (cameraRef.current && ecosystemGroupRef.current && containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const mouse = new THREE.Vector2(
            ((e.clientX - rect.left) / rect.width) * 2 - 1,
            -((e.clientY - rect.top) / rect.height) * 2 + 1
          );

          const raycaster = new THREE.Raycaster();
          raycaster.setFromCamera(mouse, cameraRef.current);
          const intersects = raycaster.intersectObjects(ecosystemGroupRef.current.children, true);

          let hitNodeId: string | null = null;
          for (const hit of intersects) {
            let current: THREE.Object3D | null = hit.object;
            while (current && current !== ecosystemGroupRef.current) {
              if (current.userData && current.userData.nodeId) {
                hitNodeId = current.userData.nodeId;
                break;
              }
              current = current.parent;
            }
            if (hitNodeId) break;
          }

          if (hitNodeId) {
            autoRotateRef.current = false;
            setSelectedNodeId((prev) => (prev === hitNodeId ? null : hitNodeId));
          } else {
            const target = e.target as HTMLElement;
            // Only clear selection if clicking on empty background
            if (target.tagName === 'CANVAS' || target === containerRef.current) {
              setSelectedNodeId(null);
            }
          }
        }
      }
    }
  }, []);

  // Wheel zoom handler
  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const zoomDelta = e.deltaY * 0.006;
    zoomRef.current.targetDistance = Math.min(18, Math.max(6.0, zoomRef.current.targetDistance + zoomDelta));
  }, []);

  // Initialize Three.js 3D Scene safely
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    if (!checkWebGLSupport()) {
      setWebglSupported(false);
      return;
    }

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let ecosystemGroup: THREE.Group | null = null;

    try {
      const width = container.clientWidth || 600;
      const height = container.clientHeight || 500;

      // 1. Scene
      scene = new THREE.Scene();
      sceneRef.current = scene;
      scene.background = new THREE.Color(0xf9f8f6); // Warm Ivory matching LTStudio background

      // 2. Camera
      camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
      camera.position.set(0, 0, zoomRef.current.distance);
      cameraRef.current = camera;

      // 3. Renderer
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'default'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      rendererRef.current = renderer;

      // 4. Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
      scene.add(ambientLight);

      const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.85);
      dirLight1.position.set(6, 12, 8);
      scene.add(dirLight1);

      const dirLight2 = new THREE.DirectionalLight(0xd95d7d, 0.4); // Muted rose rim light
      dirLight2.position.set(-6, -6, -4);
      scene.add(dirLight2);

      // 5. Ecosystem Main Group (Rotated during hand drag)
      ecosystemGroup = new THREE.Group();
      ecosystemGroupRef.current = ecosystemGroup;
      scene.add(ecosystemGroup);

      // 6. Build 3D Nodes
      const meshesMap: { [id: string]: THREE.Group } = {};

      NODES_CONFIG.forEach((nodeData) => {
        const group = new THREE.Group();
        group.position.copy(nodeData.position);
        group.userData = { nodeId: nodeData.id };

        if (nodeData.id === 'ltstudio') {
          // Central LTStudio Core Architecture
          const coreGeo = new THREE.OctahedronGeometry(0.75, 0);
          const coreMat = new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            roughness: 0.25,
            metalness: 0.85
          });
          const coreMesh = new THREE.Mesh(coreGeo, coreMat);
          coreMesh.userData = { nodeId: nodeData.id };
          group.add(coreMesh);

          // Concentric Translucent Outer Ring
          const ringGeo = new THREE.TorusGeometry(1.15, 0.02, 16, 64);
          const ringMat = new THREE.MeshBasicMaterial({
            color: 0xd95d7d,
            transparent: true,
            opacity: 0.7
          });
          const ringMesh = new THREE.Mesh(ringGeo, ringMat);
          ringMesh.rotation.x = Math.PI / 2.5;
          ringMesh.userData = { nodeId: nodeData.id };
          group.add(ringMesh);

          // Second subtle outer ring
          const ringGeo2 = new THREE.TorusGeometry(1.5, 0.015, 16, 64);
          const ringMat2 = new THREE.MeshBasicMaterial({
            color: 0x1a1a1a,
            transparent: true,
            opacity: 0.25
          });
          const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
          ringMesh2.rotation.y = Math.PI / 3;
          ringMesh2.userData = { nodeId: nodeData.id };
          group.add(ringMesh2);
        } else {
          // Minimalist Floating Architectural Block for Products
          const isHub = nodeData.id === 'saturumah' || nodeData.id === 'dayone';
          const widthSize = isHub ? 0.9 : 0.75;
          const heightSize = isHub ? 0.55 : 0.45;
          const depthSize = 0.25;

          const blockGeo = new THREE.BoxGeometry(widthSize, heightSize, depthSize);
          const blockMat = new THREE.MeshStandardMaterial({
            color: isHub ? 0x1a1a1a : 0xf4f3f0,
            roughness: 0.35,
            metalness: isHub ? 0.6 : 0.1
          });
          const blockMesh = new THREE.Mesh(blockGeo, blockMat);
          blockMesh.userData = { nodeId: nodeData.id };
          group.add(blockMesh);

          // Border outline frame
          const edges = new THREE.EdgesGeometry(blockGeo);
          const lineMat = new THREE.LineBasicMaterial({
            color: isHub ? 0xd95d7d : 0x1a1a1a,
            transparent: true,
            opacity: isHub ? 0.95 : 0.35
          });
          const wireframe = new THREE.LineSegments(edges, lineMat);
          wireframe.userData = { nodeId: nodeData.id };
          group.add(wireframe);

          // Indicator status dot
          const dotGeo = new THREE.SphereGeometry(0.045, 12, 12);
          const dotMat = new THREE.MeshBasicMaterial({
            color: nodeData.status === 'Daily Driver' || nodeData.status === 'Live' ? 0xd95d7d : 0x888888
          });
          const dotMesh = new THREE.Mesh(dotGeo, dotMat);
          dotMesh.position.set(widthSize / 2 - 0.09, heightSize / 2 - 0.09, depthSize / 2 + 0.01);
          dotMesh.userData = { nodeId: nodeData.id };
          group.add(dotMesh);
        }

        // Invisible generous click hit-box to make clicking 3D nodes effortless
        const hitBoxGeo = new THREE.SphereGeometry(0.85, 8, 8);
        const hitBoxMat = new THREE.MeshBasicMaterial({ visible: false });
        const hitBox = new THREE.Mesh(hitBoxGeo, hitBoxMat);
        hitBox.userData = { nodeId: nodeData.id };
        group.add(hitBox);

        ecosystemGroup!.add(group);
        meshesMap[nodeData.id] = group;
      });
      meshesMapRef.current = meshesMap;

      // 7. Build Interconnected Curves & Connections
      const connections: ConnectionData[] = [];
      const lineGroup = new THREE.Group();
      ecosystemGroup.add(lineGroup);

      const addedPairs = new Set<string>();

      NODES_CONFIG.forEach((node) => {
        node.connectedTo.forEach((targetId) => {
          const targetNode = NODES_CONFIG.find((n) => n.id === targetId);
          if (!targetNode) return;

          const pairKey = [node.id, targetId].sort().join('--');
          if (addedPairs.has(pairKey)) return;
          addedPairs.add(pairKey);

          const start = node.position;
          const end = targetNode.position;

          const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
          const dist = start.distanceTo(end);
          mid.z += dist * 0.15;

          const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
          const points = curve.getPoints(32);
          const curveGeo = new THREE.BufferGeometry().setFromPoints(points);

          const isPrimary = (node.id === 'saturumah' && targetId === 'dayone') || node.id === 'ltstudio';

          const lineMat = new THREE.LineBasicMaterial({
            color: isPrimary ? 0xd95d7d : 0xb5b4ae,
            transparent: true,
            opacity: isPrimary ? 0.75 : 0.4
          });

          const lineMesh = new THREE.Line(curveGeo, lineMat);
          lineGroup.add(lineMesh);

          const particleCount = isPrimary ? 5 : 3;
          const particles = Array.from({ length: particleCount }).map((_, i) => ({
            progress: i / particleCount,
            speed: 0.0025 + Math.random() * 0.001,
            size: isPrimary ? 0.06 : 0.045
          }));

          connections.push({
            fromId: node.id,
            toId: targetId,
            curve,
            particles,
            isPrimary
          });
        });
      });
      connectionsRef.current = connections;

      // 8. Particle Geometry for Flowing Data
      const totalParticles = connections.reduce((sum, c) => sum + c.particles.length, 0);
      const particlePositions = new Float32Array(totalParticles * 3);
      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

      const particleMat = new THREE.PointsMaterial({
        color: 0xd95d7d,
        size: 0.09,
        transparent: true,
        opacity: 0.9
      });

      const particleSystem = new THREE.Points(particleGeo, particleMat);
      ecosystemGroup.add(particleSystem);

      // 9. Resize Handler
      const handleResize = () => {
        if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        cameraRef.current.aspect = w / h;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(w, h);
      };

      window.addEventListener('resize', handleResize);

      // 10. Animation Loop
      const clock = new THREE.Clock();

      const animate = () => {
        animationFrameRef.current = requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // Smooth zoom lerp
        zoomRef.current.distance += (zoomRef.current.targetDistance - zoomRef.current.distance) * 0.1;
        if (cameraRef.current) {
          cameraRef.current.position.z = zoomRef.current.distance;
        }

        // Auto gentle ambient rotation if not currently dragging
        if (autoRotateRef.current && !isDraggingRef.current && !isReducedMotion) {
          rotationRef.current.targetY += 0.0012;
        }

        // Smooth rotation lerp for the entire ecosystem group
        rotationRef.current.x += (rotationRef.current.targetX - rotationRef.current.x) * 0.1;
        rotationRef.current.y += (rotationRef.current.targetY - rotationRef.current.y) * 0.1;

        if (ecosystemGroupRef.current) {
          ecosystemGroupRef.current.rotation.x = rotationRef.current.x;
          ecosystemGroupRef.current.rotation.y = rotationRef.current.y;
        }

        // Update 3D mesh scales based on domain filter smoothly
        NODES_CONFIG.forEach((node) => {
          const mesh = meshesMapRef.current[node.id];
          if (mesh) {
            const isFiltered =
              activeFilterRef.current === 'all' ||
              node.category === 'Core' ||
              node.category === activeFilterRef.current;
            const targetScale = isFiltered ? 1.0 : 0.35;
            mesh.scale.x += (targetScale - mesh.scale.x) * 0.12;
            mesh.scale.y += (targetScale - mesh.scale.y) * 0.12;
            mesh.scale.z += (targetScale - mesh.scale.z) * 0.12;
          }
        });

        // Rotate Central Core Node inner rings
        if (meshesMapRef.current['ltstudio'] && !isReducedMotion) {
          meshesMapRef.current['ltstudio'].rotation.y = elapsedTime * 0.35;
          meshesMapRef.current['ltstudio'].rotation.z = Math.sin(elapsedTime * 0.4) * 0.12;
        }

        // Gentle floating vertical motion for nodes
        if (!isReducedMotion) {
          NODES_CONFIG.forEach((node, idx) => {
            const mesh = meshesMapRef.current[node.id];
            if (mesh && node.id !== 'ltstudio') {
              mesh.position.y = node.position.y + Math.sin(elapsedTime * 1.3 + idx * 1.1) * 0.05;
            }
          });
        }

        // Update particle positions along curves
        let pIdx = 0;
        const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;

        connectionsRef.current.forEach((conn) => {
          conn.particles.forEach((p) => {
            if (!isReducedMotion) {
              p.progress = (p.progress + p.speed) % 1;
            }
            const pt = conn.curve.getPoint(p.progress);
            posAttr.setXYZ(pIdx, pt.x, pt.y, pt.z);
            pIdx++;
          });
        });
        posAttr.needsUpdate = true;

        // Project 3D World Positions of Nodes onto 2D Screen Coordinates for HTML Labels
        if (cameraRef.current && containerRef.current && ecosystemGroupRef.current) {
          const w = containerRef.current.clientWidth;
          const h = containerRef.current.clientHeight;
          const newCoords: {
            [id: string]: { x: number; y: number; visible: boolean; depth: number };
          } = {};

          const worldPos = new THREE.Vector3();

          NODES_CONFIG.forEach((node) => {
            const mesh = meshesMapRef.current[node.id];
            if (mesh) {
              mesh.getWorldPosition(worldPos);
            } else {
              worldPos.copy(node.position).applyEuler(ecosystemGroupRef.current!.rotation);
            }

            const projected = worldPos.clone().project(cameraRef.current!);

            const x = (projected.x * 0.5 + 0.5) * w;
            const y = (-(projected.y * 0.5) + 0.5) * h;
            // Visible as long as it's within the camera view volume
            const visible = projected.z < 1;
            const depth = projected.z;

            newCoords[node.id] = { x, y, visible, depth };
          });

          setScreenCoords(newCoords);
        }

        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      };

      animate();

      return () => {
        window.removeEventListener('resize', handleResize);
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        if (renderer) renderer.dispose();
        if (scene) scene.clear();
      };
    } catch (err) {
      console.warn('WebGL initialization failed, switching to vector graph fallback:', err);
      setWebglSupported(false);
    }
  }, [isReducedMotion]);

  // Handle clicks on nodes (from HTML badges)
  const handleNodeClick = (nodeId: string, e?: React.MouseEvent | React.PointerEvent) => {
    if (e) {
      e.stopPropagation();
    }
    autoRotateRef.current = false;
    setSelectedNodeId((prev) => (prev === nodeId ? null : nodeId));
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
      className={`relative w-full h-[520px] sm:h-[600px] lg:h-[650px] bg-[#F9F8F6] border border-[#1A1A1A] overflow-hidden select-none shadow-xs group touch-none ${
        isDraggingState ? 'cursor-grabbing' : hoveredNodeId ? 'cursor-pointer' : 'cursor-grab'
      }`}
    >
      {/* Background Subtle Architectural Grid */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#1A1A1A_1px,transparent_1px)] [background-size:20px_20px]"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-[#D95D7D]/10 via-transparent to-transparent pointer-events-none rounded-full blur-3xl"></div>

      {/* 3D WebGL Canvas or 2D Vector SVG Graph Fallback */}
      {webglSupported ? (
        <canvas ref={canvasRef} className="w-full h-full block" />
      ) : (
        /* Fallback 2D Vector Architecture Living Diagram */
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center p-6">
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Connecting Curved Lines between Nodes in 2D */}
            {NODES_CONFIG.map((node) =>
              node.connectedTo.map((targetId) => {
                const targetNode = NODES_CONFIG.find((n) => n.id === targetId);
                if (!targetNode) return null;

                const isConnected =
                  activeFocusId && (connectedNodeIds.has(node.id) && connectedNodeIds.has(targetId));

                return (
                  <g key={`${node.id}-${targetId}`}>
                    <path
                      d={`M ${node.fallback2D.x}% ${node.fallback2D.y}% Q ${(node.fallback2D.x + targetNode.fallback2D.x) / 2}% ${(node.fallback2D.y + targetNode.fallback2D.y) / 2 - 8}% ${targetNode.fallback2D.x}% ${targetNode.fallback2D.y}%`}
                      fill="none"
                      stroke={isConnected ? '#D95D7D' : '#D0CFCA'}
                      strokeWidth={isConnected ? 2.5 : 1}
                      strokeDasharray={isConnected ? 'none' : '4 4'}
                      className="transition-colors duration-300"
                    />
                  </g>
                );
              })
            )}
          </svg>

          {/* 2D Node Badges */}
          {NODES_CONFIG.map((node) => {
            const isCore = node.id === 'ltstudio';
            const isSelected = selectedNodeId === node.id;
            const isHovered = hoveredNodeId === node.id;
            const isConnected = connectedNodeIds.has(node.id);

            const matchesFilter =
              activeFilter === 'all' || node.category === 'Core' || node.category === activeFilter;

            return (
              <div
                key={node.id}
                data-no-drag="true"
                style={{
                  left: `${node.fallback2D.x}%`,
                  top: `${node.fallback2D.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onPointerDown={(e) => e.stopPropagation()}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                onClick={(e) => handleNodeClick(node.id, e)}
                className={`absolute z-10 cursor-pointer transition-all duration-200 node-badge ${
                  !matchesFilter
                    ? 'opacity-25 pointer-events-none scale-90'
                    : isSelected
                    ? 'opacity-100 scale-105 z-30'
                    : isHovered
                    ? 'opacity-100 scale-105 z-20'
                    : isConnected && activeFocusId
                    ? 'opacity-100 scale-100 z-20'
                    : activeFocusId
                    ? 'opacity-70 scale-95 z-10'
                    : 'opacity-100 scale-100 z-10'
                }`}
              >
                <div
                  className={`px-3 py-1.5 rounded-none border font-mono transition-all flex items-center gap-2 shadow-xs ${
                    isCore
                      ? 'bg-[#1A1A1A] text-[#F9F8F6] border-[#D95D7D]'
                      : isSelected
                      ? 'bg-[#1A1A1A] text-[#F9F8F6] border-[#D95D7D] ring-2 ring-[#D95D7D]/40 shadow-md'
                      : isHovered
                      ? 'bg-[#F4F3F0] text-[#1A1A1A] border-[#D95D7D] shadow-md -translate-y-0.5'
                      : isConnected && activeFocusId
                      ? 'bg-[#FFFFFF] text-[#1A1A1A] border-[#D95D7D]'
                      : 'bg-[#F9F8F6]/95 text-[#1A1A1A] border-[#1A1A1A]/30 hover:border-[#1A1A1A]'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isCore
                        ? 'bg-[#D95D7D] animate-pulse'
                        : isSelected || isHovered
                        ? 'bg-[#D95D7D]'
                        : node.status === 'Daily Driver' || node.status === 'Live'
                        ? 'bg-[#D95D7D]'
                        : 'bg-[#1A1A1A]/40'
                    }`}
                  ></span>
                  <div className="flex flex-col text-left">
                    <span className="text-[11px] font-bold tracking-tight uppercase leading-tight">
                      {node.name}
                    </span>
                    {isSelected && (
                      <span className="text-[9px] text-[#D95D7D] tracking-widest font-normal">
                        {node.role}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* HTML Typographic Labels Overlaid over Projected 3D Node Positions (When WebGL is active) */}
      {webglSupported &&
        (Object.entries(screenCoords) as [
          string,
          { x: number; y: number; visible: boolean; depth: number }
        ][]).map(([nodeId, coords]) => {
          const node = NODES_CONFIG.find((n) => n.id === nodeId);
          if (!node || !coords.visible) return null;

          const isCore = node.id === 'ltstudio';
          const isHovered = hoveredNodeId === nodeId;
          const isSelected = selectedNodeId === nodeId;
          const isConnected = connectedNodeIds.has(nodeId);

          const matchesFilter =
            activeFilter === 'all' || node.category === 'Core' || node.category === activeFilter;

          // Depth-based z-index (foreground nodes appear above background nodes)
          const baseZIndex = Math.max(1, Math.round((1 - coords.depth) * 50));
          const zIndex = isSelected ? 40 : isHovered ? 35 : isConnected && activeFocusId ? 30 : baseZIndex;

          return (
            <div
              key={nodeId}
              data-no-drag="true"
              style={{
                left: `${coords.x}px`,
                top: `${coords.y}px`,
                transform: 'translate(-50%, -100%)',
                zIndex
              }}
              onPointerDown={(e) => e.stopPropagation()}
              onMouseEnter={() => setHoveredNodeId(nodeId)}
              onMouseLeave={() => setHoveredNodeId(null)}
              onClick={(e) => handleNodeClick(nodeId, e)}
              className={`absolute transition-all duration-200 pointer-events-auto cursor-pointer node-badge ${
                !matchesFilter
                  ? 'opacity-25 pointer-events-none scale-90'
                  : isSelected
                  ? 'opacity-100 scale-105'
                  : isHovered
                  ? 'opacity-100 scale-105'
                  : isConnected && activeFocusId
                  ? 'opacity-100 scale-100'
                  : activeFocusId
                  ? 'opacity-75 scale-95'
                  : 'opacity-100 scale-100'
              }`}
            >
              <div
                className={`px-3 py-1.5 rounded-none border font-mono transition-all flex items-center gap-2 shadow-xs ${
                  isCore
                    ? 'bg-[#1A1A1A] text-[#F9F8F6] border-[#D95D7D]'
                    : isSelected
                    ? 'bg-[#1A1A1A] text-[#F9F8F6] border-[#D95D7D] ring-2 ring-[#D95D7D]/40 shadow-lg'
                    : isHovered
                    ? 'bg-[#F4F3F0] text-[#1A1A1A] border-[#D95D7D] shadow-md -translate-y-0.5'
                    : isConnected && activeFocusId
                    ? 'bg-[#FFFFFF] text-[#1A1A1A] border-[#D95D7D] shadow-xs'
                    : 'bg-[#F9F8F6]/95 text-[#1A1A1A] border-[#1A1A1A]/30 hover:border-[#1A1A1A]'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isCore
                      ? 'bg-[#D95D7D] animate-pulse'
                      : isSelected || isHovered
                      ? 'bg-[#D95D7D]'
                      : node.status === 'Daily Driver' || node.status === 'Live'
                      ? 'bg-[#D95D7D]'
                      : 'bg-[#1A1A1A]/40'
                  }`}
                ></span>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-bold tracking-tight uppercase leading-tight">
                    {node.name}
                  </span>
                  {isSelected && (
                    <span className="text-[9px] text-[#D95D7D] tracking-widest font-normal">
                      {node.role}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

      {/* Top Controls Bar */}
      <div 
        onPointerDown={(e) => e.stopPropagation()}
        className="absolute top-4 left-4 right-4 z-40 flex flex-wrap items-center justify-between gap-3 pointer-events-none"
      >
        {/* Domain Filters */}
        <div 
          data-no-drag="true"
          onPointerDown={(e) => e.stopPropagation()}
          className="flex items-center gap-1 bg-[#F9F8F6] border-2 border-[#1A1A1A] p-1 pointer-events-auto shadow-sm interactive-control"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 px-2 flex items-center gap-1 font-bold">
            <Filter className="w-3 h-3 text-[#D95D7D]" />
            {language === 'id' ? 'Ranah' : 'Domain'}:
          </span>
          <button
            type="button"
            data-no-drag="true"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              setActiveFilter('all');
            }}
            className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer border ${
              activeFilter === 'all'
                ? 'bg-[#1A1A1A] text-[#F9F8F6] border-[#1A1A1A] font-bold shadow-xs'
                : 'bg-transparent text-[#1A1A1A]/70 border-transparent hover:bg-[#E5E5E2]'
            }`}
          >
            {language === 'id' ? 'Semua' : 'All'}
          </button>
          <button
            type="button"
            data-no-drag="true"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              setActiveFilter('Personal');
            }}
            className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer border ${
              activeFilter === 'Personal'
                ? 'bg-[#1A1A1A] text-[#F9F8F6] border-[#1A1A1A] font-bold shadow-xs'
                : 'bg-transparent text-[#1A1A1A]/70 border-transparent hover:bg-[#E5E5E2]'
            }`}
          >
            {language === 'id' ? 'Pribadi' : 'Personal'}
          </button>
          <button
            type="button"
            data-no-drag="true"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              setActiveFilter('Professional');
            }}
            className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer border ${
              activeFilter === 'Professional'
                ? 'bg-[#1A1A1A] text-[#F9F8F6] border-[#1A1A1A] font-bold shadow-xs'
                : 'bg-transparent text-[#1A1A1A]/70 border-transparent hover:bg-[#E5E5E2]'
            }`}
          >
            {language === 'id' ? 'Profesional' : 'Professional'}
          </button>
        </div>

        {/* View & Navigation Controls (Drag Hint, Zoom, Reset) */}
        <div 
          onPointerDown={(e) => e.stopPropagation()}
          className="flex items-center gap-2 pointer-events-auto"
        >
          {/* Interaction status hint */}
          <div className="hidden sm:flex items-center gap-2 bg-[#F9F8F6] border border-[#1A1A1A]/40 px-3 py-1.5 text-[10px] font-mono text-[#1A1A1A]/70 shadow-xs">
            <Move className="w-3 h-3 text-[#D95D7D]" />
            <span>
              {language === 'id'
                ? 'Tarik untuk Memutar 3D • Klik Node untuk Detail'
                : 'Drag to Orbit 3D • Click Node to Inspect'}
            </span>
          </div>

          {/* Zoom In, Zoom Out, Reset Center */}
          <div 
            data-no-drag="true"
            onPointerDown={(e) => e.stopPropagation()}
            className="flex items-center bg-[#F9F8F6] border-2 border-[#1A1A1A] shadow-sm interactive-control"
          >
            <button
              type="button"
              data-no-drag="true"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                handleZoom(-2.0);
              }}
              title="Zoom In"
              aria-label="Zoom In"
              className="p-2 text-[#1A1A1A]/80 hover:text-[#1A1A1A] hover:bg-[#E5E5E2] border-r border-[#1A1A1A]/20 transition-colors cursor-pointer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              data-no-drag="true"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                handleZoom(2.0);
              }}
              title="Zoom Out"
              aria-label="Zoom Out"
              className="p-2 text-[#1A1A1A]/80 hover:text-[#1A1A1A] hover:bg-[#E5E5E2] border-r border-[#1A1A1A]/20 transition-colors cursor-pointer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              data-no-drag="true"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                handleResetView();
              }}
              title={language === 'id' ? 'Atur Ulang Tampilan' : 'Reset View'}
              aria-label="Reset View"
              className="p-2 text-[#1A1A1A]/80 hover:text-[#1A1A1A] hover:bg-[#E5E5E2] transition-colors cursor-pointer flex items-center gap-1.5 text-[10px] font-mono font-bold"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden md:inline">{language === 'id' ? 'Reset' : 'Reset'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Active Inspector Card overlay at Bottom Left */}
      {selectedNode && (
        <div
          data-no-drag="true"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-50 bg-[#F9F8F6] border-2 border-[#1A1A1A] p-4 sm:p-5 shadow-2xl transition-all duration-300 pointer-events-auto"
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/50">
                <span className="w-1.5 h-1.5 bg-[#D95D7D] rounded-full"></span>
                <span>{selectedNode.category} Node</span>
                <span>•</span>
                <span className="text-[#D95D7D] font-bold">{selectedNode.status}</span>
              </div>
              <h3 className="text-lg font-bold text-[#1A1A1A] tracking-tight">{selectedNode.name}</h3>
            </div>
            <button
              type="button"
              data-no-drag="true"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedNodeId(null);
              }}
              className="text-[#1A1A1A]/50 hover:text-[#1A1A1A] p-1 cursor-pointer text-xs font-mono"
              title="Close inspector"
            >
              ✕
            </button>
          </div>

          <p className="text-xs font-serif italic text-[#1A1A1A] mb-2">"{selectedNode.tagline}"</p>

          <p className="text-[11px] text-[#1A1A1A]/70 leading-relaxed font-sans mb-3">
            {selectedNode.role}.{' '}
            {language === 'id'
              ? 'Terhubung langsung ke dalam grafik ekosistem LTStudio.'
              : 'Directly connected within the LTStudio ecosystem graph.'}
          </p>

          {/* Connected list */}
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#1A1A1A]/60 mb-4 pb-3 border-b border-[#E5E5E2] flex-wrap">
            <span className="uppercase text-[#1A1A1A]/40">
              {language === 'id' ? 'Node Terkait:' : 'Connected Nodes:'}
            </span>
            {selectedNode.connectedTo.map((id) => {
              const connectedObj = NODES_CONFIG.find((n) => n.id === id);
              return (
                <button
                  type="button"
                  key={id}
                  data-no-drag="true"
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedNodeId(id);
                  }}
                  className="px-2 py-0.5 bg-[#F4F3F0] border border-[#E5E5E2] text-[#1A1A1A] hover:border-[#D95D7D] hover:text-[#D95D7D] cursor-pointer transition-colors"
                >
                  {connectedObj ? connectedObj.name : id}
                </button>
              );
            })}
          </div>

          {/* Action button */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-mono text-[#1A1A1A]/40 uppercase tracking-wider">
              [ {language === 'id' ? 'Alur Berlanjut' : 'Continuous Flow'} ]
            </span>
            {selectedProductObj && onOpenProductDetail && (
              <button
                type="button"
                data-no-drag="true"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenProductDetail(selectedProductObj);
                }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] text-[#F9F8F6] text-[10px] font-mono uppercase tracking-widest font-bold hover:bg-[#D95D7D] border border-[#1A1A1A] hover:border-[#D95D7D] transition-colors cursor-pointer"
              >
                <span>
                  {language === 'id' ? `Jelajahi ${selectedNode.name}` : `Explore ${selectedNode.name}`}
                </span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Decorative Corner Framing */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-[#1A1A1A] pointer-events-none"></div>
      <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-[#1A1A1A] pointer-events-none"></div>
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-[#1A1A1A] pointer-events-none"></div>
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-[#1A1A1A] pointer-events-none"></div>
    </div>
  );
};

