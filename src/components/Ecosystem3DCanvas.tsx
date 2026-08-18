import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { ArrowRight, Activity, Sparkles, Filter } from 'lucide-react';
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
    position: new THREE.Vector3(-2.8, 0.8, 0.5),
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
    position: new THREE.Vector3(-4.4, 2.2, -0.6),
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
    position: new THREE.Vector3(-4.8, -0.8, 0.2),
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
    position: new THREE.Vector3(-2.2, -1.9, 0.8),
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
    position: new THREE.Vector3(-3.9, -2.8, -0.4),
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
    position: new THREE.Vector3(2.8, 1.2, 0.4),
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
    position: new THREE.Vector3(4.5, -0.3, -0.5),
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
    position: new THREE.Vector3(3.6, -2.2, 0.3),
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
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('saturumah');
  const [screenCoords, setScreenCoords] = useState<{ [id: string]: { x: number; y: number; visible: boolean } }>({});
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  // Mouse / Pointer tracking for camera parallax
  const pointerRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
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
    return NODES_CONFIG.find((n) => n.id === selectedNodeId) || NODES_CONFIG[0];
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

  // Handle Mouse / Touch move for Parallax
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    pointerRef.current.targetX = x * 0.8;
    pointerRef.current.targetY = y * 0.5;
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

    try {
      const width = container.clientWidth || 600;
      const height = container.clientHeight || 500;

      // 1. Scene
      scene = new THREE.Scene();
      sceneRef.current = scene;
      scene.background = new THREE.Color(0xf9f8f6); // Warm Ivory matching LTStudio bg

      // 2. Camera
      camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
      camera.position.set(0, 0, 11.5);
      cameraRef.current = camera;

      // 3. Renderer inside try/catch
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
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
      scene.add(ambientLight);

      const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
      dirLight1.position.set(5, 10, 7);
      scene.add(dirLight1);

      const dirLight2 = new THREE.DirectionalLight(0xd95d7d, 0.35); // Muted rose backlight
      dirLight2.position.set(-5, -5, -5);
      scene.add(dirLight2);

      // 5. Build 3D Nodes
      const meshesMap: { [id: string]: THREE.Group } = {};

      NODES_CONFIG.forEach((nodeData) => {
        const group = new THREE.Group();
        group.position.copy(nodeData.position);

        if (nodeData.id === 'ltstudio') {
          // Central LTStudio Core Architecture
          const coreGeo = new THREE.OctahedronGeometry(0.7, 0);
          const coreMat = new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            roughness: 0.3,
            metalness: 0.8
          });
          const coreMesh = new THREE.Mesh(coreGeo, coreMat);
          group.add(coreMesh);

          // Concentric Translucent Outer Ring
          const ringGeo = new THREE.TorusGeometry(1.1, 0.02, 16, 64);
          const ringMat = new THREE.MeshBasicMaterial({
            color: 0xd95d7d,
            transparent: true,
            opacity: 0.6
          });
          const ringMesh = new THREE.Mesh(ringGeo, ringMat);
          ringMesh.rotation.x = Math.PI / 2.5;
          group.add(ringMesh);

          // Second subtle outer ring
          const ringGeo2 = new THREE.TorusGeometry(1.4, 0.015, 16, 64);
          const ringMat2 = new THREE.MeshBasicMaterial({
            color: 0x1a1a1a,
            transparent: true,
            opacity: 0.2
          });
          const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
          ringMesh2.rotation.y = Math.PI / 3;
          group.add(ringMesh2);
        } else {
          // Minimalist Floating Architectural Block for Products
          const isHub = nodeData.id === 'saturumah' || nodeData.id === 'dayone';
          const widthSize = isHub ? 0.85 : 0.7;
          const heightSize = isHub ? 0.5 : 0.4;
          const depthSize = 0.2;

          const blockGeo = new THREE.BoxGeometry(widthSize, heightSize, depthSize);
          const blockMat = new THREE.MeshStandardMaterial({
            color: isHub ? 0x1a1a1a : 0xf4f3f0,
            roughness: 0.4,
            metalness: isHub ? 0.5 : 0.1
          });
          const blockMesh = new THREE.Mesh(blockGeo, blockMat);
          group.add(blockMesh);

          // Border outline frame
          const edges = new THREE.EdgesGeometry(blockGeo);
          const lineMat = new THREE.LineBasicMaterial({
            color: isHub ? 0xd95d7d : 0x1a1a1a,
            transparent: true,
            opacity: isHub ? 0.9 : 0.3
          });
          const wireframe = new THREE.LineSegments(edges, lineMat);
          group.add(wireframe);

          // Indicator status dot
          const dotGeo = new THREE.SphereGeometry(0.04, 12, 12);
          const dotMat = new THREE.MeshBasicMaterial({
            color: nodeData.status === 'Daily Driver' || nodeData.status === 'Live' ? 0xd95d7d : 0xa0a0a0
          });
          const dotMesh = new THREE.Mesh(dotGeo, dotMat);
          dotMesh.position.set(widthSize / 2 - 0.08, heightSize / 2 - 0.08, depthSize / 2 + 0.01);
          group.add(dotMesh);
        }

        scene!.add(group);
        meshesMap[nodeData.id] = group;
      });
      meshesMapRef.current = meshesMap;

      // 6. Build Interconnected Curves & Connections
      const connections: ConnectionData[] = [];
      const lineGroup = new THREE.Group();
      scene.add(lineGroup);

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
            color: isPrimary ? 0xd95d7d : 0xc8c7c2,
            transparent: true,
            opacity: isPrimary ? 0.6 : 0.3
          });

          const lineMesh = new THREE.Line(curveGeo, lineMat);
          lineGroup.add(lineMesh);

          const particleCount = isPrimary ? 5 : 3;
          const particles = Array.from({ length: particleCount }).map((_, i) => ({
            progress: i / particleCount,
            speed: 0.002 + Math.random() * 0.001,
            size: isPrimary ? 0.05 : 0.04
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

      // 7. Particle Geometry for Flowing Data
      const totalParticles = connections.reduce((sum, c) => sum + c.particles.length, 0);
      const particlePositions = new Float32Array(totalParticles * 3);
      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

      const particleMat = new THREE.PointsMaterial({
        color: 0xd95d7d,
        size: 0.08,
        transparent: true,
        opacity: 0.85
      });

      const particleSystem = new THREE.Points(particleGeo, particleMat);
      scene.add(particleSystem);

      // 8. Resize Handler
      const handleResize = () => {
        if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        cameraRef.current.aspect = w / h;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(w, h);
      };

      window.addEventListener('resize', handleResize);

      // 9. Animation Loop
      const clock = new THREE.Clock();

      const animate = () => {
        animationFrameRef.current = requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // Pointer lerp
        pointerRef.current.x += (pointerRef.current.targetX - pointerRef.current.x) * 0.05;
        pointerRef.current.y += (pointerRef.current.targetY - pointerRef.current.y) * 0.05;

        // Camera Motion
        if (cameraRef.current && !isReducedMotion) {
          cameraRef.current.position.x = pointerRef.current.x * 1.2;
          cameraRef.current.position.y = pointerRef.current.y * 0.8;
          cameraRef.current.lookAt(0, 0, 0);
        }

        // Rotate Central Core Node slowly
        if (meshesMapRef.current['ltstudio'] && !isReducedMotion) {
          meshesMapRef.current['ltstudio'].rotation.y = elapsedTime * 0.25;
          meshesMapRef.current['ltstudio'].rotation.x = Math.sin(elapsedTime * 0.3) * 0.1;
        }

        // Gentle floating hover motion for nodes
        if (!isReducedMotion) {
          NODES_CONFIG.forEach((node, idx) => {
            const mesh = meshesMapRef.current[node.id];
            if (mesh && node.id !== 'ltstudio') {
              mesh.position.y = node.position.y + Math.sin(elapsedTime * 1.2 + idx) * 0.05;
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

        // Project 3D positions to 2D Screen Coordinates for HTML Labels
        if (cameraRef.current && containerRef.current) {
          const w = containerRef.current.clientWidth;
          const h = containerRef.current.clientHeight;
          const newCoords: { [id: string]: { x: number; y: number; visible: boolean } } = {};

          NODES_CONFIG.forEach((node) => {
            const mesh = meshesMapRef.current[node.id];
            const pos = mesh ? mesh.position : node.position;
            const vector = pos.clone();
            vector.project(cameraRef.current!);

            const x = (vector.x * 0.5 + 0.5) * w;
            const y = (-(vector.y * 0.5) + 0.5) * h;
            const visible = vector.z < 1;

            newCoords[node.id] = { x, y, visible };
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

  // Handle clicks on nodes
  const handleNodeClick = (nodeId: string) => {
    setSelectedNodeId(nodeId);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className="relative w-full h-[520px] sm:h-[600px] lg:h-[650px] bg-[#F9F8F6] border border-[#1A1A1A] overflow-hidden select-none shadow-xs group"
    >
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1A1A1A_1px,transparent_1px)] [background-size:20px_20px]"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-[#D95D7D]/10 via-transparent to-transparent pointer-events-none rounded-full blur-3xl"></div>

      {/* 3D WebGL Canvas or 2D Vector SVG Graph Fallback */}
      {webglSupported ? (
        <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />
      ) : (
        /* Fallback 2D Vector Architecture Living Diagram */
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center p-6">
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="roseLine" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D95D7D" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#1A1A1A" stopOpacity="0.3" />
              </linearGradient>
            </defs>

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
                      stroke={isConnected ? '#D95D7D' : '#E5E5E2'}
                      strokeWidth={isConnected ? 2 : 1}
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

            if (activeFilter !== 'all' && node.category !== 'Core' && node.category !== activeFilter) {
              return null;
            }

            const isDimmed =
              (activeFocusId && !isConnected) ||
              (activeFilter !== 'all' && node.category !== 'Core' && node.category !== activeFilter);

            return (
              <div
                key={node.id}
                style={{
                  left: `${node.fallback2D.x}%`,
                  top: `${node.fallback2D.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                onClick={() => handleNodeClick(node.id)}
                className={`absolute z-10 cursor-pointer transition-all duration-200 ${
                  isDimmed ? 'opacity-30 scale-95' : 'opacity-100 scale-100'
                }`}
              >
                <div
                  className={`px-3 py-1.5 rounded-none border font-mono transition-all flex items-center gap-2 shadow-xs ${
                    isCore
                      ? 'bg-[#1A1A1A] text-[#F9F8F6] border-[#D95D7D]'
                      : isSelected
                      ? 'bg-[#1A1A1A] text-[#F9F8F6] border-[#D95D7D] ring-2 ring-[#D95D7D]/30'
                      : isHovered
                      ? 'bg-[#F4F3F0] text-[#1A1A1A] border-[#D95D7D] -translate-y-0.5'
                      : isConnected && activeFocusId
                      ? 'bg-[#F9F8F6] text-[#1A1A1A] border-[#D95D7D]'
                      : 'bg-[#F9F8F6]/95 text-[#1A1A1A] border-[#E5E5E2] hover:border-[#1A1A1A]'
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
                        : 'bg-[#1A1A1A]/30'
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
        (Object.entries(screenCoords) as [string, { x: number; y: number; visible: boolean }][]).map(
          ([nodeId, coords]) => {
            const node = NODES_CONFIG.find((n) => n.id === nodeId);
            if (!node || !coords.visible) return null;

            const isCore = node.id === 'ltstudio';
            const isHovered = hoveredNodeId === nodeId;
            const isSelected = selectedNodeId === nodeId;
            const isConnected = connectedNodeIds.has(nodeId);

            if (activeFilter !== 'all' && node.category !== 'Core' && node.category !== activeFilter) {
              return null;
            }

            const isDimmed =
              (activeFocusId && !isConnected) ||
              (activeFilter !== 'all' && node.category !== 'Core' && node.category !== activeFilter);

            return (
              <div
                key={nodeId}
                style={{
                  left: `${coords.x}px`,
                  top: `${coords.y}px`,
                  transform: 'translate(-50%, -100%)'
                }}
                onMouseEnter={() => setHoveredNodeId(nodeId)}
                onMouseLeave={() => setHoveredNodeId(null)}
                onClick={() => handleNodeClick(nodeId)}
                className={`absolute z-10 transition-all duration-200 cursor-pointer pointer-events-auto ${
                  isDimmed ? 'opacity-30 scale-95' : 'opacity-100 scale-100'
                }`}
              >
                <div
                  className={`px-3 py-1.5 rounded-none border font-mono transition-all flex items-center gap-2 shadow-xs ${
                    isCore
                      ? 'bg-[#1A1A1A] text-[#F9F8F6] border-[#D95D7D]'
                      : isSelected
                      ? 'bg-[#1A1A1A] text-[#F9F8F6] border-[#D95D7D] ring-2 ring-[#D95D7D]/30'
                      : isHovered
                      ? 'bg-[#F4F3F0] text-[#1A1A1A] border-[#D95D7D] shadow-md -translate-y-1'
                      : isConnected && activeFocusId
                      ? 'bg-[#F9F8F6] text-[#1A1A1A] border-[#D95D7D]'
                      : 'bg-[#F9F8F6]/90 text-[#1A1A1A] border-[#E5E5E2] hover:border-[#1A1A1A]'
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
                        : 'bg-[#1A1A1A]/30'
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
          }
        )}

      {/* Top Controls Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="flex items-center gap-2 bg-[#F9F8F6]/90 backdrop-blur-xs border border-[#1A1A1A] p-1 pointer-events-auto shadow-xs">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/50 px-2 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            {language === 'id' ? 'Ranah' : 'Domain'}:
          </span>
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#1A1A1A] text-[#F9F8F6] font-bold'
                : 'text-[#1A1A1A]/70 hover:bg-[#E5E5E2]'
            }`}
          >
            {language === 'id' ? 'Semua Node' : 'All Nodes'}
          </button>
          <button
            onClick={() => setActiveFilter('Personal')}
            className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
              activeFilter === 'Personal'
                ? 'bg-[#1A1A1A] text-[#F9F8F6] font-bold'
                : 'text-[#1A1A1A]/70 hover:bg-[#E5E5E2]'
            }`}
          >
            {language === 'id' ? 'Pribadi' : 'Personal'}
          </button>
          <button
            onClick={() => setActiveFilter('Professional')}
            className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
              activeFilter === 'Professional'
                ? 'bg-[#1A1A1A] text-[#F9F8F6] font-bold'
                : 'text-[#1A1A1A]/70 hover:bg-[#E5E5E2]'
            }`}
          >
            {language === 'id' ? 'Profesional' : 'Professional'}
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-[#F9F8F6]/90 border border-[#E5E5E2] px-3 py-1 text-[10px] font-mono text-[#1A1A1A]/60">
          {webglSupported ? (
            <>
              <Sparkles className="w-3 h-3 text-[#D95D7D]" />
              <span>
                {language === 'id'
                  ? 'Interaktif 3D • Sorot & Klik untuk Detail Alur'
                  : 'Interactive 3D • Hover & Click Node to Inspect Flow'}
              </span>
            </>
          ) : (
            <>
              <Activity className="w-3 h-3 text-[#D95D7D]" />
              <span>
                {language === 'id'
                  ? 'Diagram Sistem Ekosistem • Klik Node'
                  : 'Ecosystem Graph Architecture • Click Node'}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Floating Active Inspector Card overlay at Bottom Left */}
      {selectedNode && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-20 bg-[#F9F8F6] border-2 border-[#1A1A1A] p-4 sm:p-5 shadow-xl transition-all duration-300 pointer-events-auto">
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
              onClick={() => setSelectedNodeId(null)}
              className="text-[#1A1A1A]/40 hover:text-[#1A1A1A] p-1 cursor-pointer text-xs font-mono"
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
                  key={id}
                  onClick={() => setSelectedNodeId(id)}
                  className="px-2 py-0.5 bg-[#F4F3F0] border border-[#E5E5E2] text-[#1A1A1A] hover:border-[#D95D7D] hover:text-[#D95D7D] cursor-pointer"
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
                onClick={() => onOpenProductDetail(selectedProductObj)}
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
