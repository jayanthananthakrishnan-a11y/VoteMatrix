// ============================================================
// partyConfig.js
// Comprehensive party color + alliance map for Indian elections.
// Covers all parties appearing in 2024 Lok Sabha results.
// ============================================================

export const PARTY_COLORS = {
  // ── NDA Parties ──────────────────────────────────────────
  "BJP":        "#FF6B00",   // Saffron orange
  "TDP":        "#FFD700",   // Gold yellow
  "JD(U)":      "#00873D",   // Green
  "SHS":        "#F26D21",   // Shiv Sena orange
  "LJP(RV)":    "#0057A8",   // Blue
  "LJP":        "#0057A8",   // Blue (alias)
  "JD(S)":      "#008080",   // Teal
  "JSP":        "#FFB300",   // Amber
  "RLD":        "#2E7D32",   // Dark green
  "AD(S)":      "#6D4C41",   // Brown
  "AGP":        "#1565C0",   // Blue
  "AJSU":       "#E65100",   // Deep orange
  "HAM(S)":     "#7B1FA2",   // Purple
  "NCP":        "#1A237E",   // Dark navy (Ajit faction)
  "SKM":        "#C62828",   // Dark red
  "NDPP":       "#33691E",   // Olive green
  "NPP":        "#00796B",   // Teal green
  "NPF":        "#4527A0",   // Deep purple
  "MNF":        "#00838F",   // Cyan
  "PMK":        "#FF6F00",   // Dark amber
  "AIADMK":     "#000000",   // Black (ADMK official)
  "ADMK":       "#000000",   // Black (alias)
  "AINRC":      "#880E4F",   // Dark pink

  // ── INDIA Bloc Parties ───────────────────────────────────
  "INC":        "#19AAED",   // Congress blue
  "SP":         "#E53935",   // Samajwadi red
  "AITC":       "#00BCD4",   // TMC cyan/teal
  "TMC":        "#00BCD4",   // TMC alias
  "DMK":        "#DD0000",   // DMK red
  "SS(UBT)":    "#FF5722",   // Uddhav Sena deep orange
  "NCP-SP":     "#8E24AA",   // Sharad Pawar NCP purple
  "CPI(M)":     "#B71C1C",   // CPM dark red
  "RJD":        "#4CAF50",   // RJD green
  "IUML":       "#1B5E20",   // Dark green
  "JMM":        "#FF8F00",   // Jharkhand Mukti amber
  "CPI":        "#D32F2F",   // CPI red
  "CPI(ML)L":   "#C62828",   // CPI ML red
  "JKNC":       "#1976D2",   // NC blue
  "VCK":        "#6A1B9A",   // VCK purple
  "BAP":        "#2E7D32",   // Green
  "KEC":        "#00695C",   // Teal
  "MDMK":       "#E65100",   // Orange
  "RLP":        "#1565C0",   // Blue
  "RSP":        "#B71C1C",   // Red
  "AIFB":       "#C62828",   // Red
  "KC(M)":      "#1A237E",   // Navy
  "KDMK":       "#BF360C",   // Deep orange
  "AIMIM":      "#004D40",   // Dark teal
  "AAP":        "#0288D1",   // AAP sky blue

  // ── Regional / Others ────────────────────────────────────
  "YSRCP":      "#1565C0",   // Blue
  "TRS":        "#E91E63",   // Pink (BRS)
  "BRS":        "#E91E63",   // Pink
  "BSP":        "#1565C0",   // Blue elephant
  "SAD":        "#1B5E20",   // Akali dark green
  "UPPL":       "#FF8F00",   // Amber
  "ZPM":        "#006064",   // Dark cyan
  "ASOM GANA":  "#FF6F00",   // Orange
  "AIFB":       "#B71C1C",   // Red
  "PDF":        "#4527A0",   // Purple
  "GFP":        "#0277BD",   // Blue
  "GHMC":       "#2E7D32",   // Green
  "HGDP":       "#6D4C41",   // Brown
  "IPF":        "#880E4F",   // Dark pink
  "JPC":        "#33691E",   // Olive
  "KEC(M)":     "#004D40",   // Dark teal
  "KMDK":       "#BF360C",   // Deep orange
  "LJSP":       "#0057A8",   // Blue
  "MNPP":       "#006064",   // Cyan
  "NISHAD":     "#1565C0",   // Blue
  "PBND":       "#4CAF50",   // Green
  "PDA":        "#7B1FA2",   // Purple
  "PWP":        "#E65100",   // Orange
  "RLJP":       "#0288D1",   // Sky blue
  "SBSP":       "#FF8F00",   // Amber
  "SDF":        "#00796B",   // Teal
  "SJAPP":      "#C62828",   // Red
  "SUCI(C)":    "#D32F2F",   // Red
  "TC":         "#1976D2",   // Blue
  "UGDP":       "#2E7D32",   // Green
  "VBKP":       "#6D4C41",   // Brown
  "WPP":        "#880E4F",   // Pink
  "YSR CLP":    "#1565C0",   // Blue

  // Tamil Nadu specific
  "NTK":        "#8B0000",   // Dark red
  "AIADMK":     "#000000",   // Black
  "MNM":        "#FF4081",   // Pink
  "TVK":        "#C62828",   // Red

  // Kerala specific
  "KERALA INC": "#1976D2",
  "CPI(ML)":    "#B71C1C",
  "INL":        "#2E7D32",
  "NCP":        "#1A237E",
  "PDP":        "#006064",

  // West Bengal specific
  "CPIM":       "#B71C1C",   // alias
  "RSP":        "#D32F2F",
  "AIFB":       "#C62828",
  "FB":         "#B71C1C",

  // Special entries
  "NOTA":       "#374151",   // Dark grey
  "IND":        "#78909C",   // Blue grey
  "IND.":       "#78909C",   // alias
};

// ── Alliance mapping ──────────────────────────────────────
export const PARTY_ALLIANCE = {
  // NDA
  "BJP": "NDA", "TDP": "NDA", "JD(U)": "NDA", "SHS": "NDA",
  "LJP(RV)": "NDA", "LJP": "NDA", "JD(S)": "NDA", "JSP": "NDA",
  "RLD": "NDA", "AD(S)": "NDA", "AGP": "NDA", "AJSU": "NDA",
  "HAM(S)": "NDA", "SKM": "NDA", "NDPP": "NDA", "NPP": "NDA",
  "NPF": "NDA", "MNF": "NDA", "PMK": "NDA", "AINRC": "NDA",
  "AIADMK": "NDA", "ADMK": "NDA",

  // INDIA Bloc
  "INC": "INDIA", "SP": "INDIA", "AITC": "INDIA", "TMC": "INDIA",
  "DMK": "INDIA", "SS(UBT)": "INDIA", "NCP-SP": "INDIA",
  "CPI(M)": "INDIA", "CPIM": "INDIA", "RJD": "INDIA", "IUML": "INDIA",
  "JMM": "INDIA", "CPI": "INDIA", "CPI(ML)L": "INDIA",
  "JKNC": "INDIA", "VCK": "INDIA", "BAP": "INDIA", "KEC": "INDIA",
  "MDMK": "INDIA", "RLP": "INDIA", "RSP": "INDIA", "AIFB": "INDIA",
  "KC(M)": "INDIA", "AAP": "INDIA",

  // Others / Regional (not in either bloc)
  "YSRCP": "Others", "TRS": "Others", "BRS": "Others",
  "BSP": "Others", "SAD": "Others", "UPPL": "Others",
  "ZPM": "Others", "AIMIM": "Others", "NTK": "Others",
  "MNM": "Others", "TVK": "Others", "NOTA": "Others",
  "IND": "Others",
};

// ── Alliance display config ───────────────────────────────
export const ALLIANCE_CONFIG = {
  NDA:    { color: "#FF6B00", label: "NDA",        textColor: "#FF6B00" },
  INDIA:  { color: "#19AAED", label: "INDIA Bloc", textColor: "#19AAED" },
  Others: { color: "#78909C", label: "Others",     textColor: "#78909C" },
};

// ── Helper functions ──────────────────────────────────────

// Get color for any party — never returns grey for known parties
export const getPartyColor = (party) => {
  if (!party) return "#78909C";
  // Direct match
  if (PARTY_COLORS[party]) return PARTY_COLORS[party];
  // Case-insensitive match
  const upper = party.toUpperCase();
  const key = Object.keys(PARTY_COLORS).find(k => k.toUpperCase() === upper);
  if (key) return PARTY_COLORS[key];
  // Partial match (e.g. "INC(T)" → "INC")
  const partial = Object.keys(PARTY_COLORS).find(k => upper.includes(k.toUpperCase()) || k.toUpperCase().includes(upper));
  if (partial) return PARTY_COLORS[partial];
  // Unknown party — generate a deterministic color from party name
  return generateColor(party);
};

// Get alliance for any party
export const getPartyAlliance = (party) => {
  if (!party) return "Others";
  if (PARTY_ALLIANCE[party]) return PARTY_ALLIANCE[party];
  const upper = party.toUpperCase();
  const key = Object.keys(PARTY_ALLIANCE).find(k => k.toUpperCase() === upper);
  return key ? PARTY_ALLIANCE[key] : "Others";
};

// Deterministic color from string — so unknown parties always get the same color
const generateColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  // Avoid greys and very dark/light colors
  return `hsl(${hue}, 60%, 52%)`;
};

// Get short display name for a party (trim long suffixes)
export const getPartyShortName = (party) => {
  if (!party) return '';
  // Already short
  if (party.length <= 8) return party;
  // Known long names
  const shorts = {
    "CPI(ML)L": "CPI(ML)",
    "LJP(RV)":  "LJP(RV)",
    "SS(UBT)":  "SS(UBT)",
    "NCP-SP":   "NCP-SP",
    "JD(U)":    "JD(U)",
    "JD(S)":    "JD(S)",
  };
  return shorts[party] || party;
};
