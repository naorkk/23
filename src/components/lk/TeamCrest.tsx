import { useState } from "react";
import type { TeamInfo } from "./products";

interface Props {
  team: TeamInfo;
  size?: number;
  className?: string;
}

function getProxiedLogoUrl(url: string) {
  if (!url) return "";
  if (url.includes("wikimedia.org") || url.includes("nba.com") || url.includes("wikipedia")) {
    return `https://images.weserv.nl/?url=${encodeURIComponent(url)}`;
  }
  return url;
}

export function TeamCrest({ team, size = 56, className = "" }: Props) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`relative shrink-0 select-none flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      title={team.name}
    >
      {team.officialLogoUrl && !imgError ? (
        <img
          src={getProxiedLogoUrl(team.officialLogoUrl)}
          alt={team.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-contain filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        renderCrestSvg(team, size)
      )}
    </div>
  );
}

interface CardProps {
  team: TeamInfo;
  onClick?: () => void;
}

export function TeamCrestCard({ team, onClick }: CardProps) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-2.5 p-2 rounded-2xl border border-transparent hover:border-[#D4AF37]/45 hover:bg-white/[0.04] transition-all duration-300 active:scale-95"
    >
      <div className="relative w-14 h-14 rounded-full flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-shadow duration-300">
        <TeamCrest team={team} size={50} />
      </div>
      <span className="text-[10px] font-medium text-center text-foreground/60 group-hover:text-[#F3CF5D] transition-colors leading-tight max-w-[76px] truncate">
        {team.nameHe}
      </span>
    </button>
  );
}

// ── CUSTOM VECTOR CREST ENGINE ──────────────────────────────────────────────

function renderCrestSvg(team: TeamInfo, size: number) {
  const primary = team.primaryColor;
  const secondary = team.secondaryColor;
  const abbrev = team.abbrev;
  const slug = team.slug;

  // Outer glow and shadow effects
  const shadowFilter = `drop-shadow(0px 3px 6px rgba(0,0,0,0.4))`;

  // Specific custom SVG designs
  switch (slug) {
    case "arsenal":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: shadowFilter }}>
          {/* Shield Base */}
          <path d="M10,10 L90,10 L90,45 C90,75 50,95 50,95 C50,95 10,75 10,45 Z" fill={primary} stroke="#F3CF5D" strokeWidth="3" />
          <path d="M16,16 L84,16 L84,45 C84,70 50,87 50,87 C50,87 16,70 16,45 Z" fill={secondary} opacity="0.4" />
          {/* Golden Cannon */}
          <rect x="35" y="44" width="36" height="8" rx="2" fill="#F3CF5D" transform="rotate(-12, 50, 50)" />
          <circle cx="34" cy="42" r="6" fill="#F3CF5D" transform="rotate(-12, 50, 50)" />
          <rect x="24" y="40" width="8" height="12" fill="#F3CF5D" transform="rotate(-12, 50, 50)" />
          <polygon points="68,43 78,41 78,49 68,47" fill="#F3CF5D" transform="rotate(-12, 50, 50)" />
          <circle cx="50" cy="46" r="3.5" fill={primary} transform="rotate(-12, 50, 50)" />
          {/* Stars */}
          <polygon points="50,20 53,26 60,26 55,30 57,36 50,32 43,36 45,30 40,26 47,26" fill="#F3CF5D" />
        </svg>
      );

    case "manchester-united":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: shadowFilter }}>
          {/* Shield */}
          <path d="M15,10 L85,10 C85,10 85,55 50,92 C15,55 15,10 15,10 Z" fill={primary} stroke="#F3CF5D" strokeWidth="2.5" />
          {/* Yellow inner area */}
          <path d="M22,16 L78,16 C78,16 78,52 50,84 C22,52 22,16 22,16 Z" fill="#FBE122" opacity="0.9" />
          {/* Red Devil silhouette */}
          <path d="M50,30 C45,30 42,33 42,37 C42,42 45,44 45,48 C43,48 40,46 38,44 C39,49 42,52 45,54 C45,58 43,62 40,66 C46,65 49,61 50,57 C51,61 54,65 60,66 C57,62 55,58 55,54 C58,52 61,49 62,44 C60,46 57,48 55,48 C55,44 58,42 58,37 C58,33 55,30 50,30 Z" fill={primary} />
          {/* Trident */}
          <rect x="49" y="38" width="2" height="26" fill={primary} />
          <path d="M44,42 C47,46 53,46 56,42" fill="none" stroke={primary} strokeWidth="2" />
          {/* Ship at the top */}
          <path d="M35,26 L65,26 C65,26 60,20 50,20 C40,20 35,26 35,26 Z" fill={secondary} />
          <polygon points="50,15 50,20 53,20" fill={secondary} />
        </svg>
      );

    case "liverpool":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: shadowFilter }}>
          {/* Shield */}
          <path d="M12,12 L88,12 L80,55 C80,78 50,92 50,92 C50,92 20,78 20,55 Z" fill={primary} stroke="#00B2A9" strokeWidth="3" />
          <path d="M18,17 L82,17 L75,53 C75,73 50,86 50,86 C50,86 25,73 25,53 Z" fill="#000000" opacity="0.3" />
          {/* Stylized Liver Bird */}
          <path d="M50,25 C47,25 44,28 44,32 C44,35 46,38 48,42 C45,43 42,42 38,40 C41,47 46,49 50,51 C50,56 47,62 44,68 C52,66 56,60 58,54 C62,55 66,54 70,51 C66,49 61,48 57,48 C58,42 61,38 61,32 C61,28 58,25 53,25 Z" fill="#F3CF5D" />
          {/* Details (seaweed in beak) */}
          <path d="M42,30 C38,30 36,32 34,31" fill="none" stroke="#F3CF5D" strokeWidth="1.5" />
          {/* Shankly Gates pattern top */}
          <rect x="25" y="6" width="50" height="4" fill="#00B2A9" rx="1" />
          <circle cx="50" cy="8" r="3" fill="#F3CF5D" />
        </svg>
      );

    case "chelsea":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: shadowFilter }}>
          {/* Circular badge */}
          <circle cx="50" cy="50" r="46" fill={primary} stroke="#FFFFFF" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="36" fill="none" stroke="#EE242C" strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Inner Circle */}
          <circle cx="50" cy="50" r="30" fill="#FFFFFF" />
          {/* Lion silhouette holding staff */}
          <path d="M50,30 C45,30 42,34 40,38 C42,42 45,42 43,48 C46,46 48,48 52,48 C50,54 52,58 55,62 C53,65 52,68 50,71 C55,70 58,66 60,63 C63,65 66,62 68,58 C65,58 63,55 63,52 C65,48 67,44 65,39 C62,37 58,35 55,35 Z" fill={primary} />
          <path d="M43,36 C42,34 38,34 37,35 C38,37 39,39 39,42 C36,43 35,46 36,49 C39,47 41,45 42,45 C43,48 45,51 46,55" fill="none" stroke={primary} strokeWidth="2" />
          {/* Red Roses/Footballs on the sides */}
          <circle cx="22" cy="50" r="3" fill="#EE242C" />
          <circle cx="78" cy="50" r="3" fill="#EE242C" />
        </svg>
      );

    case "real-madrid":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: shadowFilter }}>
          {/* Crown on top */}
          <path d="M30,22 L35,10 L50,16 L65,10 L70,22 Z" fill="#FEBE10" stroke="#00529F" strokeWidth="1" />
          <circle cx="50" cy="8" r="3.5" fill="#FEBE10" />
          <circle cx="35" cy="10" r="2" fill="#EE242C" />
          <circle cx="65" cy="10" r="2" fill="#EE242C" />
          {/* Oval Shield Base */}
          <ellipse cx="50" cy="56" rx="34" ry="38" fill="#FFFFFF" stroke="#FEBE10" strokeWidth="3.5" />
          {/* Diagonal Blue Sash */}
          <clipPath id="rm-clip">
            <ellipse cx="50" cy="56" rx="32" ry="36" />
          </clipPath>
          <polygon points="20,86 80,26 90,36 30,96" fill="#00529F" clipPath="url(#rm-clip)" />
          {/* Monogram letters 'MCF' stylized */}
          <text x="50" y="65" textAnchor="middle" fill="#FEBE10" fontSize="24" fontWeight="900" fontFamily="serif" style={{ filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.7))' }}>
            MCF
          </text>
        </svg>
      );

    case "barcelona":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: shadowFilter }}>
          {/* Shield base */}
          <path d="M12,12 L88,12 L85,42 C85,68 50,92 50,92 C50,92 15,68 15,42 Z" fill="#F58426" stroke="#FEBE10" strokeWidth="3" />
          <clipPath id="fcb-clip">
            <path d="M14,14 L86,14 L83,42 C83,66 50,89 50,89 C50,89 17,66 17,42 Z" />
          </clipPath>
          <g clipPath="url(#fcb-clip)">
            {/* Top Left: St George Cross */}
            <rect x="14" y="14" width="36" height="24" fill="#FFFFFF" />
            <rect x="30" y="14" width="4" height="24" fill="#CB3524" />
            <rect x="14" y="24" width="36" height="4" fill="#CB3524" />
            {/* Top Right: Catalan Flags */}
            <rect x="50" y="14" width="36" height="24" fill="#FEBE10" />
            <rect x="56" y="14" width="3" height="24" fill="#CB3524" />
            <rect x="65" y="14" width="3" height="24" fill="#CB3524" />
            <rect x="74" y="14" width="3" height="24" fill="#CB3524" />
            {/* Gold Center Bar separator */}
            <rect x="14" y="38" width="72" height="4" fill="#FEBE10" />
            {/* Bottom: Blaugrana Stripes */}
            <rect x="14" y="42" width="72" height="50" fill={secondary} />
            <rect x="28" y="42" width="10" height="50" fill={primary} />
            <rect x="48" y="42" width="10" height="50" fill={primary} />
            <rect x="68" y="42" width="10" height="50" fill={primary} />
            {/* Retro gold ball in center */}
            <circle cx="50" cy="56" r="8" fill="#FEBE10" stroke="#552583" strokeWidth="1" />
            <path d="M46,53 C49,56 52,56 54,53" fill="none" stroke="#552583" />
            <line x1="50" y1="48" x2="50" y2="64" stroke="#552583" />
          </g>
        </svg>
      );

    case "juventus":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: shadowFilter }}>
          {/* Modern Sleek Shield */}
          <path d="M15,10 L85,10 C85,10 85,65 50,92 C15,65 15,10 15,10 Z" fill="#000000" stroke="#FFFFFF" strokeWidth="3" />
          {/* Double J Emblem */}
          <path d="M35,24 L48,24 L48,56 C48,64 42,70 34,70 C28,70 24,65 24,60 L34,60 C34,62 36,63 38,63 C40,63 41,61 41,58 L41,34 L35,34 Z" fill="#FFFFFF" />
          <path d="M54,24 L67,24 L67,56 C67,64 61,70 53,70 C47,70 43,65 43,60 L53,60 C53,62 55,63 57,63 C59,63 60,61 60,58 L60,34 L54,34 Z" fill="#FFFFFF" />
          {/* Gold Star at the top */}
          <polygon points="50,13 52,18 57,18 53,21 55,26 50,23 45,26 47,21 43,18 48,18" fill="#F3CF5D" />
        </svg>
      );

    case "ac-milan":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: shadowFilter }}>
          {/* Gold Oval Shield */}
          <ellipse cx="50" cy="50" rx="34" ry="46" fill="#FFFFFF" stroke="#FEBE10" strokeWidth="3" />
          <clipPath id="acm-clip">
            <ellipse cx="50" cy="50" rx="32" ry="44" />
          </clipPath>
          <g clipPath="url(#acm-clip)">
            {/* Split Shield */}
            <rect x="15" y="4" width="35" height="92" fill="#000000" />
            {/* Left side: Red Stripes */}
            <rect x="23" y="4" width="5" height="92" fill={primary} />
            <rect x="35" y="4" width="5" height="92" fill={primary} />
            <rect x="47" y="4" width="3" height="92" fill={primary} />
            {/* Right side: White with Red Cross */}
            <rect x="50" y="4" width="35" height="92" fill="#FFFFFF" />
            <rect x="65" y="4" width="6" height="92" fill={primary} />
            <rect x="50" y="44" width="36" height="6" fill={primary} />
            {/* Gold circle on top with 'ACM 1899' text */}
            <rect x="25" y="24" width="50" height="15" rx="4" fill="#000000" stroke="#FEBE10" strokeWidth="1" />
            <text x="50" y="34" textAnchor="middle" fill="#FEBE10" fontSize="8" fontWeight="bold">ACM 1899</text>
          </g>
        </svg>
      );

    case "inter-milan":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: shadowFilter }}>
          {/* Concentric circles */}
          <circle cx="50" cy="50" r="46" fill="#000000" stroke="#F3CF5D" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="38" fill={primary} stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="32" fill="#000000" />
          {/* Stylized Inter Monogram I M */}
          <text x="50" y="58" textAnchor="middle" fill="#F3CF5D" fontSize="30" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.05em">
            IM
          </text>
          {/* Gold Star on top */}
          <polygon points="50,6 52,11 57,11 53,14 55,19 50,16 45,19 47,14 43,11 48,11" fill="#F3CF5D" />
        </svg>
      );

    case "bayern-munich":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: shadowFilter }}>
          {/* Circular badge */}
          <circle cx="50" cy="50" r="46" fill={primary} stroke="#FFFFFF" strokeWidth="3" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
          {/* Inner blue checkered area */}
          <circle cx="50" cy="50" r="26" fill="#00A5DE" stroke="#FFFFFF" strokeWidth="2.5" />
          {/* Diamond checks (simplified checkers) */}
          <path d="M50,24 L60,34 L50,44 L40,34 Z" fill="#FFFFFF" />
          <path d="M50,44 L60,54 L50,64 L40,54 Z" fill="#FFFFFF" />
          <path d="M35,39 L45,49 L35,59 L25,49 Z" fill="#FFFFFF" opacity="0.6" />
          <path d="M65,39 L75,49 L65,59 L55,49 Z" fill="#FFFFFF" opacity="0.6" />
          <text x="50" y="21" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="bold" letterSpacing="0.05em">FC BAYERN</text>
          <text x="50" y="83" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="bold" letterSpacing="0.05em">MUNCHEN</text>
        </svg>
      );

    case "psg":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: shadowFilter }}>
          <circle cx="50" cy="50" r="46" fill={primary} stroke="#FFFFFF" strokeWidth="3" />
          {/* Eiffel Tower silhouette in Red */}
          <path d="M42,75 L45,55 L47,38 L45,26 C45,26 49,20 50,20 C51,20 55,26 55,26 L53,38 L55,55 L58,75 L52,75 L50,60 L48,75 Z" fill={secondary} />
          <path d="M45,55 L55,55" stroke="#FFFFFF" strokeWidth="2.5" />
          {/* Golden Fleur-de-lis lily at the bottom */}
          <path d="M50,65 C48,65 47,68 47,70 C47,72 50,75 50,75 C50,75 53,72 53,70 C53,68 52,65 50,65 Z M45,71 C45,69 47,69 48,70 C49,71 50,73 50,73 C50,73 49,71 47,71 Z M55,71 C55,69 53,69 52,70 C51,71 50,73 50,73 C50,73 51,71 53,71 Z" fill="#F3CF5D" />
          {/* Top text simplified */}
          <circle cx="50" cy="50" r="36" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      );

    case "celtic":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: shadowFilter }}>
          {/* Green Circle */}
          <circle cx="50" cy="50" r="46" fill={primary} stroke="#F3CF5D" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="38" fill="#FFFFFF" />
          {/* Four leaf clover / shamrock */}
          <path d="M50,38 C46,30 38,30 38,38 C38,46 46,46 50,42 C54,46 62,46 62,38 C62,30 54,30 50,38 Z M50,46 C46,50 46,58 38,58 C30,58 30,50 38,46 C42,46 46,48 50,46 Z M50,46 C54,48 58,46 62,46 C70,50 70,58 62,58 C54,58 54,50 50,46 Z" fill={primary} />
          {/* Stem */}
          <path d="M50,46 L50,72" stroke={primary} strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      );

    case "bulls":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: shadowFilter }}>
          {/* Red Bull Face Silhouette */}
          <rect x="10" y="24" width="80" height="52" fill="none" />
          {/* Bull head path */}
          <path d="M22,20 L78,20 C78,20 74,32 50,36 C26,32 22,20 22,20 Z" fill={primary} />
          <path d="M30,34 L70,34 L66,66 C66,66 64,74 50,78 C36,74 34,66 34,66 Z" fill={primary} />
          {/* Horns */}
          <path d="M22,20 C14,16 10,8 10,8 C10,8 14,22 30,26 Z" fill="#FFFFFF" stroke={primary} strokeWidth="1" />
          <path d="M78,20 C86,16 90,8 90,8 C90,8 86,22 70,26 Z" fill="#FFFFFF" stroke={primary} strokeWidth="1" />
          {/* Eyes */}
          <polygon points="38,46 44,48 42,43" fill="#000000" />
          <polygon points="62,46 56,48 58,43" fill="#000000" />
          <polygon points="38,46 44,48 42,43" fill="#FFFFFF" stroke={primary} strokeWidth="1.5" />
          <polygon points="62,46 56,48 58,43" fill="#FFFFFF" stroke={primary} strokeWidth="1.5" />
          {/* Red tip of horns */}
          <path d="M10,8 C10,8 11,12 14,14 C12,12 10,8 10,8 Z" fill={primary} />
          <path d="M90,8 C90,8 89,12 86,14 C88,12 90,8 90,8 Z" fill={primary} />
        </svg>
      );

    case "lakers":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: shadowFilter }}>
          {/* Gold Basketball with speed lines */}
          <circle cx="50" cy="50" r="42" fill={primary} stroke={secondary} strokeWidth="2.5" />
          {/* Basketball lines */}
          <path d="M12,50 C24,35 76,35 88,50" fill="none" stroke={secondary} strokeWidth="2" />
          <path d="M12,50 C24,65 76,65 88,50" fill="none" stroke={secondary} strokeWidth="2" />
          <path d="M50,8 L50,92" fill="none" stroke={secondary} strokeWidth="2" />
          {/* Star decorations */}
          <polygon points="20,24 23,28 28,28 24,31 26,36 21,33 16,36 18,31 14,28 19,28" fill="#FFFFFF" />
          <polygon points="80,24 83,28 88,28 84,31 86,36 81,33 76,36 78,31 74,28 79,28" fill="#FFFFFF" />
          <text x="50" y="55" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.04em" style={{ filter: 'drop-shadow(1px 2px 2px rgba(0,0,0,0.8))' }}>
            LAKERS
          </text>
        </svg>
      );

    case "warriors":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: shadowFilter }}>
          <circle cx="50" cy="50" r="46" fill={primary} stroke="#FFC72C" strokeWidth="3" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="#FFC72C" strokeWidth="1" />
          {/* Bay Bridge yellow silhouette */}
          <path d="M25,58 L75,58 L75,64 L25,64 Z" fill="#FFC72C" />
          <path d="M32,58 L32,40 L35,40 L35,58 Z" fill="#FFC72C" />
          <path d="M65,58 L65,40 L68,40 L68,58 Z" fill="#FFC72C" />
          {/* Cable lines */}
          <path d="M25,48 C35,42 45,41 50,41 C55,41 65,42 75,48" fill="none" stroke="#FFC72C" strokeWidth="2.5" />
          <path d="M25,52 C35,47 45,46 50,46 C55,46 65,47 75,52" fill="none" stroke="#FFC72C" strokeWidth="1.5" />
        </svg>
      );

    case "brazil":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: shadowFilter }}>
          {/* Yellow shield with green border */}
          <path d="M12,12 L88,12 L80,55 C80,78 50,92 50,92 C50,92 20,78 20,55 Z" fill={primary} stroke={secondary} strokeWidth="3.5" />
          {/* Cross band or monogram */}
          <text x="50" y="52" textAnchor="middle" fill={secondary} fontSize="26" fontWeight="bold" fontFamily="serif">CBF</text>
          {/* 5 stars at the top */}
          <g fill="#F3CF5D" transform="translate(0, -6)">
            <polygon points="26,10 28,14 33,14 29,16 31,21 26,18 21,21 23,16 19,14 24,14" />
            <polygon points="38,10 40,14 45,14 41,16 43,21 38,18 33,21 35,16 31,14 36,14" />
            <polygon points="50,6 52,10 57,10 53,12 55,17 50,14 45,17 47,12 43,10 48,10" />
            <polygon points="62,10 64,14 69,14 65,16 67,21 62,18 57,21 59,16 55,14 60,14" />
            <polygon points="74,10 76,14 81,14 77,16 79,21 74,18 69,21 71,16 67,14 72,14" />
          </g>
        </svg>
      );

    case "argentina":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: shadowFilter }}>
          {/* Shield base */}
          <path d="M12,12 L88,12 L80,55 C80,78 50,92 50,92 C50,92 20,78 20,55 Z" fill={primary} stroke="#F3CF5D" strokeWidth="3" />
          <clipPath id="arg-clip">
            <path d="M14,14 L86,14 L78,53 C78,75 50,89 50,89 C50,89 22,75 22,53 Z" />
          </clipPath>
          <g clipPath="url(#arg-clip)">
            {/* White stripes */}
            <rect x="36" y="10" width="12" height="85" fill="#FFFFFF" />
            <rect x="52" y="10" width="12" height="85" fill="#FFFFFF" />
            {/* Monogram AFA */}
            <text x="50" y="58" textAnchor="middle" fill="#F3CF5D" fontSize="24" fontWeight="bold" fontFamily="serif" style={{ filter: 'drop-shadow(1px 2px 2px rgba(0,0,0,0.6))' }}>AFA</text>
          </g>
          {/* 3 stars on top */}
          <g fill="#F3CF5D" transform="translate(0, -6)">
            <polygon points="35,10 37,13 41,13 38,15 39,19 35,17 31,19 32,15 29,13 33,13" />
            <polygon points="50,6 52,9 56,9 53,11 54,15 50,13 46,15 47,11 44,9 48,9" />
            <polygon points="65,10 67,13 71,13 68,15 69,19 65,17 61,19 62,15 59,13 63,13" />
          </g>
        </svg>
      );

    case "boca-juniors":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: shadowFilter }}>
          {/* Shield */}
          <path d="M12,12 L88,12 L80,55 C80,78 50,92 50,92 C50,92 20,78 20,55 Z" fill={primary} stroke="#F3CF5D" strokeWidth="3.5" />
          {/* Gold bar in center */}
          <rect x="14" y="34" width="72" height="24" fill={secondary} />
          {/* Letters CABJ */}
          <text x="50" y="51" textAnchor="middle" fill={primary} fontSize="14" fontWeight="bold" fontFamily="sans-serif">CABJ</text>
        </svg>
      );

    case "river-plate":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: shadowFilter }}>
          {/* Shield */}
          <path d="M12,12 L88,12 L80,55 C80,78 50,92 50,92 C50,92 20,78 20,55 Z" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
          <clipPath id="rp-clip">
            <path d="M14,14 L86,14 L78,53 C78,75 50,89 50,89 C50,89 22,75 22,53 Z" />
          </clipPath>
          {/* Red Diagonal sash */}
          <polygon points="12,96 76,14 88,24 24,106" fill={primary} clipPath="url(#rp-clip)" />
          {/* Letters CARP */}
          <text x="50" y="56" textAnchor="middle" fill="#000000" fontSize="13" fontWeight="bold" fontFamily="sans-serif" style={{ filter: 'drop-shadow(1px 1px 1px rgba(255,255,255,0.8))' }}>CARP</text>
        </svg>
      );

    default:
      // Generic Royal Shield Fallback for other teams
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: shadowFilter }}>
          {/* Shield frame */}
          <path d="M12,10 L88,10 L82,55 C82,78 50,94 50,94 C50,94 18,78 18,55 Z" fill={primary} stroke="#F3CF5D" strokeWidth="3.5" />
          {/* Glossy overlay */}
          <path d="M16,14 L84,14 L79,53 C79,72 50,87 50,87 C50,87 21,72 21,53 Z" fill={secondary} opacity="0.3" />
          {/* Diagonal sash in secondary color */}
          <clipPath id="gen-clip">
            <path d="M16,14 L84,14 L79,53 C79,72 50,87 50,87 C50,87 21,72 21,53 Z" />
          </clipPath>
          <polygon points="10,90 80,10 95,25 25,105" fill={secondary} opacity="0.4" clipPath="url(#gen-clip)" />
          {/* Bold Serif text abbreviations */}
          <text
            x="50"
            y="58"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="25"
            fontWeight="900"
            fontFamily="serif"
            letterSpacing="-0.05em"
            style={{ filter: 'drop-shadow(1px 2px 3px rgba(0,0,0,0.85))' }}
          >
            {abbrev}
          </text>
          {/* Little decorative star at bottom */}
          <polygon points="50,70 52,74 56,74 53,76 54,80 50,78 46,80 47,76 44,74 48,74" fill="#F3CF5D" />
        </svg>
      );
  }
}
