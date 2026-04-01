// ============================================================
// assemblyData.js — ZERO IMPORTS. Fully self-contained.
// ============================================================

// Inline party colors — no import needed
const PARTY_COLORS_LOCAL = {
  BJP: '#FF8C00', INC: '#0EA5E9', DMK: '#DD0000',
  AITC: '#06B6D4', AAP: '#0284C7', JMM: '#22C55E',
  'CPI(M)': '#BE123C', TDP: '#FFD700', JKNC: '#2563EB',
  'JD(U)': '#16A34A', NPP: '#00796B', NDPP: '#365314',
  ZPM: '#0C4A6E', SKM: '#9F1239', AINRC: '#7C3AED',
  BJD: '#1D4ED8', BRS: '#E91E63', SHS: '#EA580C',
  'CPI': '#D32F2F', SP: '#E53935', RJD: '#4CAF50',
  IUML: '#166534', JMM2: '#D97706', VCK: '#9333EA',
};

export const ALLIANCE_MAP_COLORS = {
  NDA:    '#FF8C00',
  INDIA:  '#0EA5E9',
  Others: '#94A3B8',
};

export const STATE_GOVERNMENTS = {
  'uttar-pradesh':          { stateName: 'Uttar Pradesh',      abbreviation: 'UP', rulingParty: 'BJP',    rulingAlliance: 'NDA',    cm: 'Yogi Adityanath',        totalSeats: 403, lastElectionYear: 2022, hasFullData: false },
  'gujarat':                { stateName: 'Gujarat',            abbreviation: 'GJ', rulingParty: 'BJP',    rulingAlliance: 'NDA',    cm: 'Bhupendra Patel',         totalSeats: 182, lastElectionYear: 2022, hasFullData: false },
  'madhya-pradesh':         { stateName: 'Madhya Pradesh',     abbreviation: 'MP', rulingParty: 'BJP',    rulingAlliance: 'NDA',    cm: 'Mohan Yadav',             totalSeats: 230, lastElectionYear: 2023, hasFullData: false },
  'rajasthan':              { stateName: 'Rajasthan',          abbreviation: 'RJ', rulingParty: 'BJP',    rulingAlliance: 'NDA',    cm: 'Bhajan Lal Sharma',       totalSeats: 200, lastElectionYear: 2023, hasFullData: false },
  'chhattisgarh':           { stateName: 'Chhattisgarh',       abbreviation: 'CG', rulingParty: 'BJP',    rulingAlliance: 'NDA',    cm: 'Vishnu Deo Sai',          totalSeats: 90,  lastElectionYear: 2023, hasFullData: false },
  'haryana':                { stateName: 'Haryana',            abbreviation: 'HR', rulingParty: 'BJP',    rulingAlliance: 'NDA',    cm: 'Nayab Singh Saini',       totalSeats: 90,  lastElectionYear: 2024, hasFullData: false },
  'maharashtra':            { stateName: 'Maharashtra',        abbreviation: 'MH', rulingParty: 'BJP',    rulingAlliance: 'NDA',    cm: 'Devendra Fadnavis',       totalSeats: 288, lastElectionYear: 2024, hasFullData: false },
  'assam':                  { stateName: 'Assam',              abbreviation: 'AS', rulingParty: 'BJP',    rulingAlliance: 'NDA',    cm: 'Himanta Biswa Sarma',     totalSeats: 126, lastElectionYear: 2021, hasFullData: false },
  'uttarakhand':            { stateName: 'Uttarakhand',        abbreviation: 'UK', rulingParty: 'BJP',    rulingAlliance: 'NDA',    cm: 'Pushkar Singh Dhami',     totalSeats: 70,  lastElectionYear: 2022, hasFullData: false },
  'goa':                    { stateName: 'Goa',                abbreviation: 'GA', rulingParty: 'BJP',    rulingAlliance: 'NDA',    cm: 'Pramod Sawant',           totalSeats: 40,  lastElectionYear: 2022, hasFullData: false },
  'manipur':                { stateName: 'Manipur',            abbreviation: 'MN', rulingParty: 'BJP',    rulingAlliance: 'NDA',    cm: 'N. Biren Singh',          totalSeats: 60,  lastElectionYear: 2022, hasFullData: false },
  'tripura':                { stateName: 'Tripura',            abbreviation: 'TR', rulingParty: 'BJP',    rulingAlliance: 'NDA',    cm: 'Manik Saha',              totalSeats: 60,  lastElectionYear: 2023, hasFullData: false },
  'nagaland':               { stateName: 'Nagaland',           abbreviation: 'NL', rulingParty: 'NDPP',   rulingAlliance: 'NDA',    cm: 'Neiphiu Rio',             totalSeats: 60,  lastElectionYear: 2023, hasFullData: false },
  'meghalaya':              { stateName: 'Meghalaya',          abbreviation: 'ML', rulingParty: 'NPP',    rulingAlliance: 'NDA',    cm: 'Conrad Sangma',           totalSeats: 60,  lastElectionYear: 2023, hasFullData: false },
  'arunachal-pradesh':      { stateName: 'Arunachal Pradesh',  abbreviation: 'AR', rulingParty: 'BJP',    rulingAlliance: 'NDA',    cm: 'Pema Khandu',             totalSeats: 60,  lastElectionYear: 2024, hasFullData: false },
  'sikkim':                 { stateName: 'Sikkim',             abbreviation: 'SK', rulingParty: 'SKM',    rulingAlliance: 'NDA',    cm: 'Prem Singh Tamang',       totalSeats: 32,  lastElectionYear: 2024, hasFullData: false },
  'andhra-pradesh':         { stateName: 'Andhra Pradesh',     abbreviation: 'AP', rulingParty: 'TDP',    rulingAlliance: 'NDA',    cm: 'N. Chandrababu Naidu',    totalSeats: 175, lastElectionYear: 2024, hasFullData: false },
  'odisha':                 { stateName: 'Odisha',             abbreviation: 'OD', rulingParty: 'BJP',    rulingAlliance: 'NDA',    cm: 'Mohan Majhi',             totalSeats: 147, lastElectionYear: 2024, hasFullData: false },
  'bihar':                  { stateName: 'Bihar',              abbreviation: 'BR', rulingParty: 'JD(U)', rulingAlliance: 'NDA',    cm: 'Nitish Kumar',            totalSeats: 243, lastElectionYear: 2020, hasFullData: false },
  'himachal-pradesh':       { stateName: 'Himachal Pradesh',   abbreviation: 'HP', rulingParty: 'INC',    rulingAlliance: 'INDIA',  cm: 'Sukhvinder Singh Sukhu',  totalSeats: 68,  lastElectionYear: 2022, hasFullData: false },
  'tamil-nadu':             { stateName: 'Tamil Nadu',         abbreviation: 'TN', rulingParty: 'DMK',    rulingAlliance: 'INDIA',  cm: 'M. K. Stalin',            totalSeats: 234, lastElectionYear: 2021, hasFullData: true  },
  'west-bengal':            { stateName: 'West Bengal',        abbreviation: 'WB', rulingParty: 'AITC',   rulingAlliance: 'Others', cm: 'Mamata Banerjee',         totalSeats: 294, lastElectionYear: 2021, hasFullData: true  },
  'kerala':                 { stateName: 'Kerala',             abbreviation: 'KL', rulingParty: 'CPI(M)', rulingAlliance: 'Others', cm: 'Pinarayi Vijayan',        totalSeats: 140, lastElectionYear: 2021, hasFullData: false },
  'karnataka':              { stateName: 'Karnataka',          abbreviation: 'KA', rulingParty: 'INC',    rulingAlliance: 'INDIA',  cm: 'Siddaramaiah',            totalSeats: 224, lastElectionYear: 2023, hasFullData: false },
  'telangana':              { stateName: 'Telangana',          abbreviation: 'TG', rulingParty: 'INC',    rulingAlliance: 'INDIA',  cm: 'A. Revanth Reddy',        totalSeats: 119, lastElectionYear: 2023, hasFullData: false },
  'jharkhand':              { stateName: 'Jharkhand',          abbreviation: 'JH', rulingParty: 'JMM',    rulingAlliance: 'INDIA',  cm: 'Hemant Soren',            totalSeats: 81,  lastElectionYear: 2024, hasFullData: false },
  'punjab':                 { stateName: 'Punjab',             abbreviation: 'PB', rulingParty: 'AAP',    rulingAlliance: 'INDIA',  cm: 'Bhagwant Mann',           totalSeats: 117, lastElectionYear: 2022, hasFullData: false },
  'mizoram':                { stateName: 'Mizoram',            abbreviation: 'MZ', rulingParty: 'ZPM',    rulingAlliance: 'Others', cm: 'Lalduhoma',               totalSeats: 40,  lastElectionYear: 2023, hasFullData: false },
  'delhi':                  { stateName: 'Delhi',              abbreviation: 'DL', rulingParty: 'BJP',    rulingAlliance: 'NDA',    cm: 'Rekha Gupta',             totalSeats: 70,  lastElectionYear: 2025, hasFullData: false, isUT: true },
  'jammu-and-kashmir':      { stateName: 'Jammu & Kashmir',    abbreviation: 'JK', rulingParty: 'JKNC',   rulingAlliance: 'INDIA',  cm: 'Omar Abdullah',           totalSeats: 90,  lastElectionYear: 2024, hasFullData: false, isUT: true },
  'puducherry':             { stateName: 'Puducherry',         abbreviation: 'PY', rulingParty: 'AINRC',  rulingAlliance: 'NDA',    cm: 'N. Rangasamy',            totalSeats: 30,  lastElectionYear: 2021, hasFullData: false, isUT: true },
  'chandigarh':             { stateName: 'Chandigarh',         abbreviation: 'CH', rulingParty: 'BJP',    rulingAlliance: 'NDA',    cm: 'Administrator (UT)',       totalSeats: 0,   lastElectionYear: null, hasFullData: false, isUT: true, noElection: true },
  'ladakh':                 { stateName: 'Ladakh',             abbreviation: 'LA', rulingParty: 'BJP',    rulingAlliance: 'NDA',    cm: 'LG Administered',         totalSeats: 0,   lastElectionYear: null, hasFullData: false, isUT: true, noElection: true },
  'andaman-and-nicobar':    { stateName: 'Andaman & Nicobar',  abbreviation: 'AN', rulingParty: 'BJP',    rulingAlliance: 'NDA',    cm: 'Administrator (UT)',       totalSeats: 0,   lastElectionYear: null, hasFullData: false, isUT: true, noElection: true },
  'lakshadweep':            { stateName: 'Lakshadweep',        abbreviation: 'LD', rulingParty: 'INC',    rulingAlliance: 'INDIA',  cm: 'Administrator (UT)',       totalSeats: 0,   lastElectionYear: null, hasFullData: false, isUT: true, noElection: true },
  'dadra-and-nagar-haveli': { stateName: 'Dadra & NH',         abbreviation: 'DN', rulingParty: 'BJP',    rulingAlliance: 'NDA',    cm: 'Administrator (UT)',       totalSeats: 0,   lastElectionYear: null, hasFullData: false, isUT: true, noElection: true },
};

// ── Exported helpers — pure functions, no imports needed ──

export const getStateGovt = (slug) => STATE_GOVERNMENTS[slug] || null;

export const getStatewiseAllianceSummary = () => {
  const counts = { NDA: 0, INDIA: 0, Others: 0 };
  Object.values(STATE_GOVERNMENTS).forEach(s => {
    if (s.noElection) return;
    const a = s.rulingAlliance;
    if (a === 'NDA') counts.NDA++;
    else if (a === 'INDIA') counts.INDIA++;
    else counts.Others++;
  });
  return counts;
};

export const getStatewisePartySummary = () => {
  const counts = {};
  Object.values(STATE_GOVERNMENTS).forEach(s => {
    if (s.noElection) return;
    counts[s.rulingParty] = (counts[s.rulingParty] || 0) + 1;
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([party, states]) => ({
      party, states,
      // Use local colors — no import needed
      color: PARTY_COLORS_LOCAL[party] || '#94A3B8',
    }));
};
