import { TEAMS, type TeamInfo, type Product } from "./products";
import { TeamCrest } from "./TeamCrest";

interface Props {
  team?: TeamInfo;
  product?: Product;
  playerName?: string;
  playerNumber?: string;
  view?: "front" | "back" | "both";
  className?: string;
}

export function JerseyMockup({
  team,
  product,
  playerName,
  playerNumber,
  view = "front",
  className = "",
}: Props) {
  // Find team if not directly provided
  const resolvedTeam = team ?? TEAMS.find((t) => t.slug === product?.teamSlug);

  if (!resolvedTeam) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-zinc-900 rounded-2xl text-zinc-500 border border-zinc-800">
        No Team Selected
      </div>
    );
  }

  const primaryColor = resolvedTeam.primaryColor;
  const secondaryColor = resolvedTeam.secondaryColor;
  const isNBA = resolvedTeam.category === "nba" || product?.category === "nba";
  const pattern = product?.jerseyPattern ?? resolvedTeam.jerseyPattern;

  // Fallbacks for customized printing
  const displayNum = playerNumber || (resolvedTeam.currentPlayers?.[0]?.number ?? "10");
  const displayName = playerName || (resolvedTeam.currentPlayers?.[0]?.name ?? "ELITE");

  // SVG Paths
  const footballJerseyPath = "M 84,25 L 70,35 L 25,55 L 32,70 L 68,65 L 72,210 Q 100,216 128,210 L 132,65 L 168,70 L 175,55 L 130,35 L 116,25 Q 100,42 84,25 Z";
  const footballBodyPath = "M 84,25 L 70,35 L 68,65 L 72,210 Q 100,216 128,210 L 132,65 L 130,35 L 116,25 Q 100,42 84,25 Z";

  const nbaJerseyPath = "M 82,25 L 74,35 C 74,35 68,55 68,75 L 72,210 Q 100,216 128,210 L 132,75 C 132,55 126,35 126,35 L 118,25 Q 100,40 82,25 Z";

  const activeJerseyPath = isNBA ? nbaJerseyPath : footballJerseyPath;
  const activeBodyPath = isNBA ? nbaJerseyPath : footballBodyPath;

  // Renders the specific pattern elements
  const renderPattern = () => {
    switch (pattern) {
      case "stripes":
        return (
          <>
            {Array.from({ length: 9 }).map((_, i) => (
              <rect
                key={`stripe-${i}`}
                x={40 + i * 16}
                y={0}
                width={8}
                height={240}
                fill={secondaryColor}
                opacity="0.9"
              />
            ))}
          </>
        );
      case "hoops":
        return (
          <>
            {Array.from({ length: 11 }).map((_, i) => (
              <rect
                key={`hoop-${i}`}
                x={0}
                y={15 + i * 20}
                width={200}
                height={10}
                fill={secondaryColor}
                opacity="0.9"
              />
            ))}
          </>
        );
      case "sash":
        return (
          <polygon
            points="45,0 70,0 155,240 130,240"
            fill={secondaryColor}
            opacity="0.95"
          />
        );
      case "center-stripe":
        return (
          <rect
            x="85"
            y="0"
            width="30"
            height="240"
            fill={secondaryColor}
            opacity="0.95"
          />
        );
      case "psg-bar":
        return (
          <>
            {/* White side borders */}
            <rect x="88" y="0" width="24" height="240" fill="#FFFFFF" />
            {/* Red center bar */}
            <rect x="92" y="0" width="16" height="240" fill={secondaryColor} />
          </>
        );
      case "boca-band":
        return (
          <rect
            x="0"
            y="95"
            width="200"
            height="32"
            fill={secondaryColor}
            opacity="0.95"
          />
        );
      case "solid":
      default:
        return null;
    }
  };

  const renderFrontJersey = (showCrest = true) => {
    return (
      <g>
        {/* Drop shadow filter applied to the base */}
        <path
          d={activeJerseyPath}
          fill="#000000"
          opacity="0.4"
          transform="translate(2, 4)"
          style={{ filter: "blur(4px)" }}
        />

        {/* Base Jersey color */}
        <g clipPath="url(#jerseyClipFront)">
          <rect x="0" y="0" width="200" height="240" fill={primaryColor} />

          {/* Pattern layer */}
          <g clipPath="url(#bodyClipFront)">
            {renderPattern()}
          </g>

          {/* Shading/Creases overlay */}
          <rect
            x="0"
            y="0"
            width="200"
            height="240"
            fill="url(#bodyShadingGradient)"
            style={{ mixBlendMode: "multiply" }}
            opacity="0.65"
          />
          <rect
            x="0"
            y="0"
            width="200"
            height="240"
            fill="url(#foldGradient)"
            style={{ mixBlendMode: "overlay" }}
            opacity="0.4"
          />
          <rect
            x="0"
            y="0"
            width="200"
            height="240"
            fill="url(#meshPattern)"
            style={{ mixBlendMode: "overlay" }}
            opacity="0.5"
          />

          {/* Sleeve Trims (Football only) */}
          {!isNBA && (
            <>
              <path
                d="M 25,55 L 32,70"
                fill="none"
                stroke={secondaryColor}
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.9"
              />
              <path
                d="M 175,55 L 168,70"
                fill="none"
                stroke={secondaryColor}
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.9"
              />
            </>
          )}

          {/* Armhole Trims (NBA only) */}
          {isNBA && (
            <>
              <path
                d="M 74,35 C 74,35 68,55 68,75"
                fill="none"
                stroke={secondaryColor}
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.9"
              />
              <path
                d="M 126,35 C 126,35 132,55 132,75"
                fill="none"
                stroke={secondaryColor}
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.9"
              />
            </>
          )}

          {/* Inner Collar shadow */}
          <path
            d={isNBA ? "M 82,25 Q 100,18 118,25 Q 100,40 82,25 Z" : "M 84,25 Q 100,20 116,25 Q 100,42 84,25 Z"}
            fill="#111111"
            opacity="0.9"
          />

          {/* Collar Trim */}
          <path
            d={isNBA ? "M 82,25 Q 100,40 118,25" : "M 84,25 Q 100,42 116,25"}
            fill="none"
            stroke={secondaryColor}
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.9"
          />
        </g>

        {/* Dynamic Crest (using foreignObject to render the React SVG component) */}
        {showCrest && (
          <foreignObject x="54" y="58" width="24" height="24">
            <div className="w-full h-full flex items-center justify-center">
              <TeamCrest team={resolvedTeam} size={22} />
            </div>
          </foreignObject>
        )}

        {/* Elite Brand Logo (Right Chest) */}
        <path
          d="M 128,62 L 130,67 L 135,67 L 131,70 L 132.5,75 L 128,72 L 123.5,75 L 125,70 L 121,67 L 126,67 Z"
          fill="#F3CF5D"
          opacity="0.85"
        />

        {/* Front Details: Sponsor or Team Wordmark / Number */}
        {isNBA ? (
          <>
            {/* Wordmark */}
            <text
              x="100"
              y="105"
              textAnchor="middle"
              fill={secondaryColor === "#FFFFFF" ? "#FFFFFF" : "#FFFFFF"}
              fontSize="13"
              fontWeight="900"
              fontFamily="'Outfit', sans-serif"
              letterSpacing="0.08em"
              style={{
                textShadow: "1px 1px 2px rgba(0,0,0,0.6)",
                fill: secondaryColor,
              }}
            >
              {resolvedTeam.abbrev}
            </text>
            {/* Center Front Number */}
            <text
              x="100"
              y="142"
              textAnchor="middle"
              fill={secondaryColor}
              stroke={primaryColor}
              strokeWidth="0.75"
              fontSize="28"
              fontWeight="900"
              fontFamily="Impact, 'Outfit', sans-serif"
            >
              {displayNum}
            </text>
          </>
        ) : (
          <>
            {/* Sponsor Text */}
            <text
              x="100"
              y="115"
              textAnchor="middle"
              fill="#FFFFFF"
              fillOpacity="0.8"
              fontSize="12"
              fontWeight="900"
              fontFamily="'Outfit', sans-serif"
              letterSpacing="0.1em"
            >
              ELITE
            </text>
            <line
              x1="78"
              y1="121"
              x2="122"
              y2="121"
              stroke="#FFFFFF"
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <text
              x="100"
              y="131"
              textAnchor="middle"
              fill="#FFFFFF"
              fillOpacity="0.5"
              fontSize="6"
              fontWeight="bold"
              fontFamily="sans-serif"
              letterSpacing="0.25em"
            >
              CHAMPIONS
            </text>
          </>
        )}
      </g>
    );
  };

  const renderBackJersey = () => {
    return (
      <g>
        {/* Drop shadow */}
        <path
          d={activeJerseyPath}
          fill="#000000"
          opacity="0.4"
          transform="translate(2, 4)"
          style={{ filter: "blur(4px)" }}
        />

        {/* Base Jersey color */}
        <g clipPath="url(#jerseyClipBack)">
          <rect x="0" y="0" width="200" height="240" fill={primaryColor} />

          {/* Pattern layer */}
          <g clipPath="url(#bodyClipBack)">
            {renderPattern()}
          </g>

          {/* Shading/Creases overlay */}
          <rect
            x="0"
            y="0"
            width="200"
            height="240"
            fill="url(#bodyShadingGradient)"
            style={{ mixBlendMode: "multiply" }}
            opacity="0.65"
          />
          <rect
            x="0"
            y="0"
            width="200"
            height="240"
            fill="url(#foldGradient)"
            style={{ mixBlendMode: "overlay" }}
            opacity="0.4"
          />
          <rect
            x="0"
            y="0"
            width="200"
            height="240"
            fill="url(#meshPattern)"
            style={{ mixBlendMode: "overlay" }}
            opacity="0.5"
          />

          {/* Sleeve Trims (Football only) */}
          {!isNBA && (
            <>
              <path
                d="M 25,55 L 32,70"
                fill="none"
                stroke={secondaryColor}
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.9"
              />
              <path
                d="M 175,55 L 168,70"
                fill="none"
                stroke={secondaryColor}
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.9"
              />
            </>
          )}

          {/* Armhole Trims (NBA only) */}
          {isNBA && (
            <>
              <path
                d="M 74,35 C 74,35 68,55 68,75"
                fill="none"
                stroke={secondaryColor}
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.9"
              />
              <path
                d="M 126,35 C 126,35 132,55 132,75"
                fill="none"
                stroke={secondaryColor}
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.9"
              />
            </>
          )}

          {/* Inner Collar shadow */}
          <path
            d={isNBA ? "M 82,25 Q 100,18 118,25 Q 100,40 82,25 Z" : "M 84,25 Q 100,20 116,25 Q 100,42 84,25 Z"}
            fill="#111111"
            opacity="0.9"
          />

          {/* Collar Trim */}
          <path
            d={isNBA ? "M 82,25 Q 100,40 118,25" : "M 84,25 Q 100,42 116,25"}
            fill="none"
            stroke={secondaryColor}
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.9"
          />
        </g>

        {/* Back Jersey Prints: Name and Number */}
        <g style={{ filter: "drop-shadow(1px 2px 2px rgba(0,0,0,0.65))" }}>
          {/* Player Name */}
          <text
            x="100"
            y="72"
            textAnchor="middle"
            fill={secondaryColor}
            fontSize="10"
            fontWeight="900"
            fontFamily="'Outfit', sans-serif"
            letterSpacing="0.16em"
          >
            {displayName.toUpperCase()}
          </text>

          {/* Player Number */}
          <text
            x="100"
            y="146"
            textAnchor="middle"
            fill={secondaryColor}
            stroke={primaryColor}
            strokeWidth="1.25"
            fontSize="64"
            fontWeight="950"
            fontFamily="Impact, 'Outfit', sans-serif"
          >
            {displayNum}
          </text>
        </g>

        {/* Golden league crown decoration at top neck */}
        <circle cx="100" cy="45" r="4.5" fill="#F3CF5D" opacity="0.8" />
        <path d="M 98.5,45 L 100,42.5 L 101.5,45 Z" fill="#000" />
      </g>
    );
  };

  return (
    <div
      className={`w-full h-full flex items-center justify-center overflow-hidden p-2 rounded-2xl select-none ${className}`}
      style={{
        background: `radial-gradient(circle at center, #1C1C1E 0%, #0C0C0E 100%)`,
        boxShadow: "inset 0 0 24px rgba(0,0,0,0.8)",
      }}
    >
      <svg
        viewBox={view === "both" ? "0 0 420 240" : "0 0 200 240"}
        className="w-full h-full max-h-[85vh] transition-transform duration-500 hover:scale-[1.02]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Clips for the front jersey */}
          <clipPath id="jerseyClipFront">
            <path d={activeJerseyPath} />
          </clipPath>
          <clipPath id="bodyClipFront">
            <path d={activeBodyPath} />
          </clipPath>

          {/* Clips for the back jersey */}
          <clipPath id="jerseyClipBack">
            <path d={activeJerseyPath} />
          </clipPath>
          <clipPath id="bodyClipBack">
            <path d={activeBodyPath} />
          </clipPath>

          {/* 3D cylindrical body shading */}
          <linearGradient id="bodyShadingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
            <stop offset="20%" stopColor="#000000" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="80%" stopColor="#000000" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
          </linearGradient>

          {/* Organic athletic fabric folds */}
          <linearGradient id="foldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.18" />
            <stop offset="25%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="35%" stopColor="#000000" stopOpacity="0.25" />
            <stop offset="42%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#000000" stopOpacity="0" />
            <stop offset="65%" stopColor="#000000" stopOpacity="0.28" />
            <stop offset="72%" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="85%" stopColor="#000000" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.22" />
          </linearGradient>

          {/* Athletic mesh activewear micro texture */}
          <pattern id="meshPattern" width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.75" fill="#ffffff" fillOpacity="0.07" />
          </pattern>
        </defs>

        {view === "both" ? (
          <>
            <g transform="translate(5, 0)">
              {renderFrontJersey(true)}
            </g>
            <g transform="translate(215, 0)">
              {renderBackJersey()}
            </g>
          </>
        ) : view === "back" ? (
          renderBackJersey()
        ) : (
          renderFrontJersey(true)
        )}
      </svg>
    </div>
  );
}
