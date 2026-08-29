import React, { useId } from 'react';

export type AppLogoId =
  | 'ltstudio'
  | 'dayone'
  | 'forge'
  | 'align'
  | 'thesya'
  | 'getaway'
  | 'everafter'
  | 'saturumah'
  | 'our'
  | 'littlebetter'
  | 'sela';

export interface AppLogoProps {
  id: string;
  size?: number | string;
  className?: string;
  showCard?: boolean;
  showSubtitle?: boolean;
  showName?: boolean;
}

export const APP_LOGO_META: Record<
  string,
  {
    name: string;
    subtitle: string;
    accentColor: string;
    bgFill: string;
    strokeColor: string;
  }
> = {
  ltstudio: {
    name: 'LTStudio',
    subtitle: 'CONNECT',
    accentColor: '#E11D48',
    bgFill: '#FFFFFF',
    strokeColor: '#E2E2E6'
  },
  dayone: {
    name: 'DayOne',
    subtitle: 'ASCEND',
    accentColor: '#059669',
    bgFill: '#FFFFFF',
    strokeColor: '#E3EAE4'
  },
  forge: {
    name: 'Forge',
    subtitle: 'EXECUTE',
    accentColor: '#EA580C',
    bgFill: '#FAFAFA',
    strokeColor: '#E5E5E5'
  },
  align: {
    name: 'Align',
    subtitle: 'ALIGN',
    accentColor: '#0284C7',
    bgFill: '#F0F9FF',
    strokeColor: '#BAE6FD'
  },
  thesya: {
    name: 'Thesya',
    subtitle: 'ENGINEER',
    accentColor: '#059669',
    bgFill: '#F4FBF7',
    strokeColor: '#D1EBE1'
  },
  getaway: {
    name: 'GetAway',
    subtitle: 'NAVIGATE',
    accentColor: '#D97706',
    bgFill: '#FFFBEB',
    strokeColor: '#FDE68A'
  },
  everafter: {
    name: 'EverAfter',
    subtitle: 'UNITE',
    accentColor: '#B88E3E',
    bgFill: '#FAF8F5',
    strokeColor: '#E3DAD0'
  },
  saturumah: {
    name: 'SatuRumah',
    subtitle: 'BELONG',
    accentColor: '#C87D65',
    bgFill: '#F2F5F3',
    strokeColor: '#D1DCD5'
  },
  our: {
    name: 'OUR',
    subtitle: 'PRESERVE',
    accentColor: '#D97706',
    bgFill: '#F8FAFC',
    strokeColor: '#E2E8F0'
  },
  littlebetter: {
    name: 'LittleBetter',
    subtitle: 'NURTURE',
    accentColor: '#059669',
    bgFill: '#F4FBF7',
    strokeColor: '#D1EBE1'
  },
  sela: {
    name: 'Sela',
    subtitle: 'PAUSE',
    accentColor: '#C89B67',
    bgFill: '#FDFBF7',
    strokeColor: '#E6DEC2'
  }
};

export const AppLogo: React.FC<AppLogoProps> = ({
  id,
  size = 56,
  className = '',
  showCard = true,
  showSubtitle = false,
  showName = false
}) => {
  const normalizedId = id.toLowerCase().replace(/[^a-z0-9]/g, '');
  const meta = APP_LOGO_META[normalizedId] || APP_LOGO_META.ltstudio;
  const uid = useId().replace(/:/g, '_');

  // Gradient & Filter IDs
  const glowPink = `glow_pink_${uid}`;
  const glowGold = `glow_gold_${uid}`;
  const glowEmerald = `glow_emerald_${uid}`;
  const glowCopper = `glow_copper_${uid}`;
  const glowCobalt = `glow_cobalt_${uid}`;

  const getawayPlaneGrad = `getaway_plane_${uid}`;
  const getawayOrbitGrad = `getaway_orbit_${uid}`;
  const jewelTopGrad = `jewel_top_${uid}`;
  const jewelBottomGrad = `jewel_bottom_${uid}`;
  const roseOrbitGrad = `rose_orbit_${uid}`;
  const copperGrad = `copper_grad_${uid}`;
  const machinedCoreGrad = `machined_core_${uid}`;
  const cobaltGrad = `cobalt_grad_${uid}`;
  const cyanCoreGrad = `cyan_core_${uid}`;
  const sageGrad = `sage_grad_${uid}`;
  const hearthGrad = `hearth_grad_${uid}`;
  const goldVaultGrad = `gold_vault_${uid}`;

  const viewBox = showName || showSubtitle ? '0 0 200 268' : '0 0 200 200';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={size}
      height={typeof size === 'number' && (showName || showSubtitle) ? (size * 268) / 200 : size}
      className={`select-none shrink-0 ${className}`}
      aria-label={`${meta.name} Logo (${meta.subtitle})`}
      role="img"
    >
      <defs>
        <filter id={glowPink} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id={glowGold} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id={glowEmerald} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id={glowCopper} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id={glowCobalt} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <linearGradient id={getawayPlaneGrad} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="35%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#9A3412" />
        </linearGradient>
        <linearGradient id={getawayOrbitGrad} x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#D46E52" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#EA580C" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#D97706" stopOpacity="0.5" />
        </linearGradient>

        <linearGradient id={jewelTopGrad} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5E3B3" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
        <linearGradient id={jewelBottomGrad} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B88E3E" />
          <stop offset="100%" stopColor="#73541E" />
        </linearGradient>
        <linearGradient id={roseOrbitGrad} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3D2838" />
          <stop offset="50%" stopColor="#7A4D59" />
          <stop offset="100%" stopColor="#B88B95" />
        </linearGradient>

        <linearGradient id={copperGrad} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9A3412" />
          <stop offset="50%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id={machinedCoreGrad} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDBA74" />
          <stop offset="50%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#7C2D12" />
        </linearGradient>

        <linearGradient id={cobaltGrad} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="50%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
        <linearGradient id={cyanCoreGrad} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>

        <linearGradient id={sageGrad} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1E4620" />
          <stop offset="50%" stopColor="#2D6A4F" />
          <stop offset="100%" stopColor="#52B788" />
        </linearGradient>

        <linearGradient id={hearthGrad} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#9A3412" />
        </linearGradient>
        <linearGradient id={goldVaultGrad} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
      </defs>

      {/* Card Base */}
      {showCard && (
        <rect
          width="200"
          height="200"
          rx="45"
          fill={meta.bgFill}
          stroke={meta.strokeColor}
          strokeWidth="2"
        />
      )}

      {/* Specific Logo Mark Renderers */}
      {normalizedId === 'ltstudio' && (
        <g>
          <line x1="40" y1="100" x2="160" y2="100" stroke="#E2E2E6" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="100" y1="40" x2="100" y2="160" stroke="#E2E2E6" strokeWidth="1.5" strokeDasharray="4 4" />
          <polygon points="100,55 145,100 100,145 55,100" fill="#18181B" />
          <polygon points="100,55 145,100 100,100 55,100" fill="#3F3F46" opacity="0.4" />
          <ellipse cx="100" cy="100" rx="66" ry="22" transform="rotate(-25 100 100)" stroke="#E11D48" strokeWidth="5" fill="none" opacity="0.3" />
          <ellipse cx="100" cy="100" rx="66" ry="22" transform="rotate(-25 100 100)" stroke="#E11D48" strokeWidth="3" strokeDasharray="12 8" fill="none" />
          <path d="M 42 112 A 66 22 0 0 0 142 118" transform="rotate(-25 100 100)" stroke="#E11D48" strokeWidth="5" strokeLinecap="round" fill="none" />
          <circle cx="100" cy="100" r="10" fill="#E11D48" filter={`url(#${glowPink})`} />
          <circle cx="100" cy="100" r="4" fill="#FFFFFF" />
        </g>
      )}

      {normalizedId === 'dayone' && (
        <g>
          <line x1="148" y1="45" x2="148" y2="155" stroke="#52B788" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.4" />
          <rect x="42" y="128" width="116" height="18" rx="5" fill="#D1E7DD" stroke="#A3D1BE" strokeWidth="2" opacity="0.8" />
          <rect x="42" y="98" width="82" height="18" rx="5" fill="#A3D1BE" stroke="#7CB9A1" strokeWidth="2" opacity="0.9" />
          <rect x="42" y="68" width="52" height="18" rx="5" fill="#7CB9A1" />
          <path d="M 48 137 L 148 77" stroke="#7CB9A1" strokeWidth="4" strokeDasharray="6 6" strokeLinecap="round" />
          <polygon points="148,62 161,77 148,92 135,77" fill="#059669" filter={`url(#${glowEmerald})`} />
          <circle cx="148" cy="77" r="3" fill="#FFFFFF" />
        </g>
      )}

      {normalizedId === 'forge' && (
        <g>
          <line x1="35" y1="100" x2="165" y2="100" stroke="#E5E5E5" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="100" y1="35" x2="100" y2="165" stroke="#E5E5E5" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="40" y1="135" x2="52" y2="135" stroke="#EA580C" strokeWidth="2" opacity="0.7" />
          <line x1="40" y1="140" x2="52" y2="140" stroke="#EA580C" strokeWidth="2" opacity="0.7" />
          <line x1="148" y1="135" x2="160" y2="135" stroke="#EA580C" strokeWidth="2" opacity="0.7" />
          <path d="M 40 135 L 75 135 L 100 110" stroke={`url(#${copperGrad})`} strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 40 65 L 75 65 L 100 90" stroke={`url(#${copperGrad})`} strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 160 135 L 125 135 L 100 110" stroke={`url(#${copperGrad})`} strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="60" cy="135" r="3" fill="#EA580C" />
          <circle cx="60" cy="65" r="3" fill="#EA580C" />
          <circle cx="140" cy="135" r="3" fill="#EA580C" />
          <line x1="100" y1="90" x2="100" y2="40" stroke={`url(#${copperGrad})`} strokeWidth="5" strokeLinecap="round" />
          <path d="M 92 48 L 100 36 L 108 48" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <polygon points="100,78 122,90 122,112 100,124 78,112 78,90" fill={`url(#${machinedCoreGrad})`} stroke="#EA580C" strokeWidth="2" filter={`url(#${glowCopper})`} />
          <polygon points="100,78 122,90 100,100 78,90" fill="#FFFFFF" opacity="0.4" />
          <circle cx="100" cy="100" r="4" fill="#FFFFFF" />
        </g>
      )}

      {normalizedId === 'align' && (
        <g>
          <line x1="35" y1="60" x2="165" y2="60" stroke="#BAE6FD" strokeWidth="1" strokeDasharray="2 4" />
          <line x1="35" y1="88" x2="165" y2="88" stroke="#BAE6FD" strokeWidth="1" strokeDasharray="2 4" />
          <line x1="35" y1="116" x2="165" y2="116" stroke="#BAE6FD" strokeWidth="1" strokeDasharray="2 4" />
          <line x1="35" y1="144" x2="165" y2="144" stroke="#BAE6FD" strokeWidth="1" strokeDasharray="2 4" />
          <line x1="100" y1="35" x2="100" y2="165" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
          <line x1="45" y1="60" x2="100" y2="60" stroke={`url(#${cobaltGrad})`} strokeWidth="3" />
          <circle cx="55" cy="60" r="3" fill="#0284C7" />
          <line x1="150" y1="88" x2="100" y2="88" stroke={`url(#${cobaltGrad})`} strokeWidth="3" />
          <circle cx="140" cy="88" r="3" fill="#0284C7" />
          <line x1="58" y1="116" x2="100" y2="116" stroke={`url(#${cobaltGrad})`} strokeWidth="3" />
          <circle cx="68" cy="116" r="3" fill="#0284C7" />
          <line x1="135" y1="144" x2="100" y2="144" stroke={`url(#${cobaltGrad})`} strokeWidth="3" />
          <circle cx="125" cy="144" r="3" fill="#0284C7" />
          <circle cx="100" cy="102" r="22" stroke="#0284C7" strokeWidth="2" strokeDasharray="6 4" fill="none" opacity="0.6" />
          <polygon points="100,88 114,102 100,116 86,102" fill={`url(#${cyanCoreGrad})`} filter={`url(#${glowCobalt})`} />
          <circle cx="100" cy="102" r="3" fill="#F0F9FF" />
        </g>
      )}

      {normalizedId === 'thesya' && (
        <g>
          <rect x="46" y="46" width="108" height="108" rx="12" stroke="#D1EBE1" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
          <line x1="62" y1="70" x2="138" y2="70" stroke="#18181B" strokeWidth="6" strokeLinecap="round" />
          <circle cx="62" cy="70" r="3" fill="#059669" />
          <circle cx="138" cy="70" r="3" fill="#059669" />
          <line x1="100" y1="70" x2="100" y2="92" stroke="#059669" strokeWidth="3" strokeDasharray="3 3" />
          <line x1="72" y1="86" x2="72" y2="130" stroke="#059669" strokeWidth="6" strokeLinecap="round" />
          <circle cx="72" cy="86" r="2.5" fill="#18181B" />
          <circle cx="72" cy="130" r="2.5" fill="#18181B" />
          <path d="M 72 96 L 100 118 L 128 96" stroke="#059669" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <line x1="128" y1="86" x2="128" y2="130" stroke="#059669" strokeWidth="6" strokeLinecap="round" />
          <circle cx="128" cy="86" r="2.5" fill="#18181B" />
          <circle cx="128" cy="130" r="2.5" fill="#18181B" />
          <circle cx="100" cy="118" r="5.5" fill="#18181B" />
          <circle cx="100" cy="118" r="2.5" fill="#059669" />
        </g>
      )}

      {normalizedId === 'getaway' && (
        <g transform="translate(10, 10) scale(0.3515)">
          <circle cx="256" cy="256" r="190" stroke={`url(#${getawayOrbitGrad})`} strokeWidth="14" strokeDasharray="24 18" strokeLinecap="round" fill="none" opacity="0.85" />
          <path d="M 90 310 C 150 250, 360 250, 422 310" stroke={`url(#${getawayPlaneGrad})`} strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.55" />
          <path d="M 110 375 C 145 355, 175 348, 205 340" stroke="#EA580C" strokeWidth="10" strokeLinecap="round" strokeDasharray="14 14" fill="none" />
          <circle cx="358" cy="148" r="24" fill="#F59E0B" filter={`url(#${glowGold})`} />
          <circle cx="358" cy="148" r="14" fill="#FFFFFF" />
          <polygon points="140,345 240,248 395,165 358,260 260,292 195,355" fill={`url(#${getawayPlaneGrad})`} />
          <polygon points="240,248 395,165 290,242" fill="#FFFFFF" fillOpacity="0.45" />
          <polygon points="160,362 190,305 220,324" fill="#7C2D12" />
        </g>
      )}

      {normalizedId === 'everafter' && (
        <g>
          <line x1="100" y1="35" x2="100" y2="165" stroke="#B88E3E" strokeWidth="1" strokeDasharray="2 4" opacity="0.3" />
          <circle cx="80" cy="85" r="42" stroke={`url(#${roseOrbitGrad})`} strokeWidth="3" fill="none" opacity="0.9" />
          <circle cx="120" cy="85" r="42" stroke="#B88B95" strokeWidth="3" fill="none" opacity="0.85" />
          <line x1="100" y1="85" x2="100" y2="160" stroke={`url(#${jewelTopGrad})`} strokeWidth="4" strokeLinecap="round" />
          <line x1="100" y1="85" x2="100" y2="160" stroke="#3D2838" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          <path d="M 100 48 Q 100 55 107 55 Q 100 55 100 62 Q 100 55 93 55 Q 100 55 100 48 Z" fill="#D4AF37" filter={`url(#${glowGold})`} />
          <g transform="translate(100, 85)">
            <polygon points="0,-14 13,0 0,6 -13,0" fill={`url(#${jewelTopGrad})`} filter={`url(#${glowGold})`} />
            <polygon points="0,14 13,0 0,6 -13,0" fill={`url(#${jewelBottomGrad})`} />
            <polygon points="0,-7 7,0 0,3 -7,0" fill="#FFF8E7" />
            <circle cx="0" cy="0" r="1.5" fill="#231820" />
          </g>
        </g>
      )}

      {normalizedId === 'saturumah' && (
        <g>
          <line x1="38" y1="142" x2="162" y2="142" stroke="#526E5C" strokeWidth="2" strokeDasharray="4 4" opacity="0.3" />
          <line x1="100" y1="45" x2="100" y2="155" stroke="#526E5C" strokeWidth="1" strokeDasharray="2 4" opacity="0.2" />
          <polygon points="62,110 100,72 138,110" fill="#526E5C" opacity="0.15" />
          <path d="M 45 106 L 100 58 L 155 106" stroke="#526E5C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7" />
          <path d="M 38 120 L 78 120 L 100 98 L 122 120 L 162 120" stroke="#18181B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="76" y="108" width="48" height="34" rx="4" fill="#F2F5F3" stroke="#C87D65" strokeWidth="3" />
          <circle cx="100" cy="125" r="8" fill={`url(#${hearthGrad})`} filter={`url(#${glowGold})`} />
          <circle cx="100" cy="125" r="3" fill="#FFF8E7" />
        </g>
      )}

      {normalizedId === 'our' && (
        <g>
          <line x1="100" y1="40" x2="100" y2="160" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.2" />
          <path d="M 62 55 L 132 55 L 142 145 L 72 145 Z" fill="#CBD5E1" opacity="0.5" />
          <path d="M 68 65 L 138 65 L 130 152 L 60 152 Z" stroke="#64748B" strokeWidth="3" fill="#F8FAFC" strokeLinejoin="round" />
          <path d="M 52 78 L 124 78 L 138 128 L 66 128 Z" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <polygon points="100,82 118,104 100,126 82,104" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" />
          <polygon points="100,88 112,104 100,120 88,104" fill={`url(#${goldVaultGrad})`} filter={`url(#${glowGold})`} />
          <circle cx="100" cy="104" r="2.5" fill="#1E293B" />
        </g>
      )}

      {normalizedId === 'littlebetter' && (
        <g>
          <circle cx="100" cy="100" r="62" stroke="#2D6A4F" strokeWidth="1" strokeDasharray="2 6" fill="none" opacity="0.3" />
          <circle cx="100" cy="100" r="42" stroke="#2D6A4F" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.2" />
          <path d="M 52 135 C 72 135, 68 102, 92 102 C 116 102, 110 60, 148 60" stroke={`url(#${sageGrad})`} strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M 52 135 C 72 135, 68 102, 92 102 C 116 102, 110 60, 148 60" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.8" />
          <circle cx="52" cy="135" r="4" fill="#1E4620" />
          <circle cx="92" cy="102" r="4" fill="#2D6A4F" />
          <circle cx="148" cy="60" r="14" fill="#52B788" opacity="0.3" filter={`url(#${glowEmerald})`} />
          <circle cx="148" cy="60" r="8" fill="#52B788" />
          <circle cx="148" cy="60" r="3" fill="#FFFFFF" />
        </g>
      )}

      {normalizedId === 'sela' && (
        <g>
          <path d="M 45 140 Q 100 120 100 80" stroke="#C89B67" strokeWidth="2" strokeDasharray="3 3" fill="none" opacity="0.4" />
          <rect x="45" y="58" width="44" height="84" rx="8" fill="#EBE3D5" />
          <rect x="45" y="58" width="44" height="84" rx="8" stroke="#DCD2BF" strokeWidth="1.5" fill="none" />
          <rect x="111" y="58" width="44" height="84" rx="8" fill="#D5CBB9" />
          <rect x="111" y="58" width="44" height="84" rx="8" stroke="#C5B9A5" strokeWidth="1.5" fill="none" />
          <circle cx="100" cy="100" r="10" fill="#C89B67" opacity="0.25" filter={`url(#${glowGold})`} />
          <circle cx="100" cy="100" r="6" fill="#1F1A17" />
          <circle cx="100" cy="100" r="2.5" fill="#C89B67" />
        </g>
      )}

      {/* Optional Integrated Typography Labels below */}
      {showName && (
        <text
          x="100"
          y="238"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="14"
          fontWeight="600"
          fill="#18181B"
          textAnchor="middle"
        >
          {meta.name}
        </text>
      )}

      {showSubtitle && (
        <text
          x="100"
          y="255"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="10"
          fontWeight="700"
          letterSpacing="1"
          fill={meta.accentColor}
          textAnchor="middle"
        >
          {meta.subtitle}
        </text>
      )}
    </svg>
  );
};
