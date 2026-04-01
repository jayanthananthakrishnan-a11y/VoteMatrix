// ============================================================
// historicalMockData.js
// Mock data for 2019 and 2014 Lok Sabha elections.
// Keyed by stateSlug + constSno (same as live data).
// Replace with real data when PDFs are extracted.
// ============================================================

export const HISTORICAL_DATA = {

  // ── TAMIL NADU ──────────────────────────────────────────

  // Chennai North (sno: 1 in TN Lok Sabha)
  'tamil-nadu:1': {
    2019: {
      constituencyName: 'Chennai North',
      totalElectors: 1421000, totalPolled: 900834, totalValidVotes: 889000,
      voterTurnoutPct: 63.4,
      candidates: [
        { candidateName: 'K. Veeraswamy',   party: 'DMK',    symbol: 'Rising Sun',    totalVotesSecured: 521000, voteSharePct: 58.6 },
        { candidateName: 'J. Jayavardhan',  party: 'ADMK',   symbol: 'Two Leaves',    totalVotesSecured: 260000, voteSharePct: 29.2 },
        { candidateName: 'M. Ponraj',       party: 'BJP',    symbol: 'Lotus',          totalVotesSecured: 68000,  voteSharePct: 7.6  },
        { candidateName: 'NOTA',            party: 'NOTA',   symbol: 'NOTA',           totalVotesSecured: 14000,  voteSharePct: 1.6  },
      ],
    },
    2014: {
      constituencyName: 'Chennai North',
      totalElectors: 1380000, totalPolled: 939400, totalValidVotes: 927000,
      voterTurnoutPct: 68.1,
      candidates: [
        { candidateName: 'K. Veeraswamy',    party: 'DMK',    symbol: 'Rising Sun',  totalVotesSecured: 398000, voteSharePct: 42.9 },
        { candidateName: 'K. R. Rajamani',   party: 'ADMK',   symbol: 'Two Leaves',  totalVotesSecured: 350000, voteSharePct: 37.8 },
        { candidateName: 'S. Suresh',        party: 'BJP',    symbol: 'Lotus',        totalVotesSecured: 54000,  voteSharePct: 5.8  },
        { candidateName: 'NOTA',             party: 'NOTA',   symbol: 'NOTA',         totalVotesSecured: 9200,   voteSharePct: 1.0  },
      ],
    },
  },

  // Coimbatore (sno: 20 in TN Lok Sabha)
  'tamil-nadu:20': {
    2019: {
      constituencyName: 'Coimbatore',
      totalElectors: 1620000, totalPolled: 1105200, totalValidVotes: 1089000,
      voterTurnoutPct: 68.2,
      candidates: [
        { candidateName: 'PR Natarajan',         party: 'CPI(M)', symbol: 'Hammer Sickle Star', totalVotesSecured: 463337, voteSharePct: 42.5 },
        { candidateName: 'C. P. Radhakrishnan',  party: 'BJP',    symbol: 'Lotus',               totalVotesSecured: 431359, voteSharePct: 39.6 },
        { candidateName: 'T. Manoharan',         party: 'ADMK',   symbol: 'Two Leaves',          totalVotesSecured: 149000, voteSharePct: 13.7 },
        { candidateName: 'NOTA',                 party: 'NOTA',   symbol: 'NOTA',                totalVotesSecured: 18000,  voteSharePct: 1.7  },
      ],
    },
    2014: {
      constituencyName: 'Coimbatore',
      totalElectors: 1580000, totalPolled: 1139600, totalValidVotes: 1124000,
      voterTurnoutPct: 72.1,
      candidates: [
        { candidateName: 'C. P. Radhakrishnan',  party: 'BJP',    symbol: 'Lotus',               totalVotesSecured: 432000, voteSharePct: 38.4 },
        { candidateName: 'PR Natarajan',         party: 'CPI(M)', symbol: 'Hammer Sickle Star',  totalVotesSecured: 310000, voteSharePct: 27.6 },
        { candidateName: 'T. Subramanian',       party: 'ADMK',   symbol: 'Two Leaves',          totalVotesSecured: 340000, voteSharePct: 30.2 },
        { candidateName: 'NOTA',                 party: 'NOTA',   symbol: 'NOTA',                totalVotesSecured: 11200,  voteSharePct: 1.0  },
      ],
    },
  },

  // ── UTTAR PRADESH ───────────────────────────────────────

  // Varanasi (sno: 73 in UP Lok Sabha)
  'uttar-pradesh:73': {
    2019: {
      constituencyName: 'Varanasi',
      totalElectors: 1839059, totalPolled: 1033730, totalValidVotes: 1019000,
      voterTurnoutPct: 56.3,
      candidates: [
        { candidateName: 'Narendra Modi',   party: 'BJP',  symbol: 'Lotus',          totalVotesSecured: 674664, voteSharePct: 66.2 },
        { candidateName: 'Shalini Yadav',   party: 'SP',   symbol: 'Bicycle',        totalVotesSecured: 195159, voteSharePct: 19.2 },
        { candidateName: 'Ajay Rai',        party: 'INC',  symbol: 'Hand',           totalVotesSecured: 152548, voteSharePct: 14.9 },
        { candidateName: 'NOTA',            party: 'NOTA', symbol: 'NOTA',           totalVotesSecured: 14630,  voteSharePct: 1.4  },
      ],
    },
    2014: {
      constituencyName: 'Varanasi',
      totalElectors: 1725148, totalPolled: 1016202, totalValidVotes: 1003000,
      voterTurnoutPct: 58.9,
      candidates: [
        { candidateName: 'Narendra Modi',    party: 'BJP',  symbol: 'Lotus',   totalVotesSecured: 581022, voteSharePct: 57.9 },
        { candidateName: 'Arvind Kejriwal',  party: 'AAP',  symbol: 'Broom',   totalVotesSecured: 209238, voteSharePct: 20.9 },
        { candidateName: 'Ajay Rai',         party: 'INC',  symbol: 'Hand',    totalVotesSecured: 75614,  voteSharePct: 7.5  },
        { candidateName: 'Mukhtar Ansari',   party: 'BSP',  symbol: 'Elephant',totalVotesSecured: 74122,  voteSharePct: 7.4  },
      ],
    },
  },

  // Rae Bareli (sno: 63 in UP Lok Sabha)
  'uttar-pradesh:63': {
    2019: {
      constituencyName: 'Rae Bareli',
      totalElectors: 1700000, totalPolled: 958100, totalValidVotes: 945000,
      voterTurnoutPct: 56.8,
      candidates: [
        { candidateName: 'Sonia Gandhi',     party: 'INC',  symbol: 'Hand',    totalVotesSecured: 534918, voteSharePct: 56.6 },
        { candidateName: 'Dinesh Pratap Singh', party: 'BJP', symbol: 'Lotus', totalVotesSecured: 363610, voteSharePct: 38.5 },
        { candidateName: 'NOTA',             party: 'NOTA', symbol: 'NOTA',    totalVotesSecured: 10400,  voteSharePct: 1.1  },
        { candidateName: 'Others',           party: 'IND',  symbol: 'Various', totalVotesSecured: 36072,  voteSharePct: 3.8  },
      ],
    },
    2014: {
      constituencyName: 'Rae Bareli',
      totalElectors: 1648000, totalPolled: 826576, totalValidVotes: 814000,
      voterTurnoutPct: 50.2,
      candidates: [
        { candidateName: 'Sonia Gandhi',       party: 'INC',  symbol: 'Hand',    totalVotesSecured: 352713, voteSharePct: 43.3 },
        { candidateName: 'Ajay Agarwal',       party: 'BJP',  symbol: 'Lotus',   totalVotesSecured: 300808, voteSharePct: 36.9 },
        { candidateName: 'NOTA',               party: 'NOTA', symbol: 'NOTA',    totalVotesSecured: 8200,   voteSharePct: 1.0  },
        { candidateName: 'Others',             party: 'BSP',  symbol: 'Elephant',totalVotesSecured: 152279, voteSharePct: 18.7 },
      ],
    },
  },

  // ── MAHARASHTRA ─────────────────────────────────────────

  // Mumbai North West (sno: 24)
  'maharashtra:24': {
    2019: {
      constituencyName: 'Mumbai North West',
      totalElectors: 1680000, totalPolled: 873600, totalValidVotes: 861000,
      voterTurnoutPct: 52.0,
      candidates: [
        { candidateName: 'Gajanan Kirtikar',  party: 'SHS',     symbol: 'Bow Arrow',  totalVotesSecured: 442672, voteSharePct: 51.4 },
        { candidateName: 'Amol Kirtikar',     party: 'SS(UBT)', symbol: 'Flaming Torch', totalVotesSecured: 390100, voteSharePct: 45.3 },
        { candidateName: 'NOTA',              party: 'NOTA',    symbol: 'NOTA',        totalVotesSecured: 9800,   voteSharePct: 1.1  },
        { candidateName: 'Others',            party: 'IND',     symbol: 'Various',     totalVotesSecured: 18428,  voteSharePct: 2.1  },
      ],
    },
    2014: {
      constituencyName: 'Mumbai North West',
      totalElectors: 1620000, totalPolled: 826200, totalValidVotes: 814000,
      voterTurnoutPct: 51.0,
      candidates: [
        { candidateName: 'Gajanan Kirtikar',  party: 'SHS',  symbol: 'Bow Arrow', totalVotesSecured: 380200, voteSharePct: 46.7 },
        { candidateName: 'Gurudas Kamat',     party: 'INC',  symbol: 'Hand',      totalVotesSecured: 281000, voteSharePct: 34.5 },
        { candidateName: 'NOTA',              party: 'NOTA', symbol: 'NOTA',      totalVotesSecured: 8100,   voteSharePct: 1.0  },
        { candidateName: 'Others',            party: 'IND',  symbol: 'Various',   totalVotesSecured: 144700, voteSharePct: 17.8 },
      ],
    },
  },

  // ── KERALA ──────────────────────────────────────────────

  // Thiruvananthapuram (sno: 1 in Kerala)
  'kerala:1': {
    2019: {
      constituencyName: 'Thiruvananthapuram',
      totalElectors: 1337649, totalPolled: 895220, totalValidVotes: 882000,
      voterTurnoutPct: 66.9,
      candidates: [
        { candidateName: 'Shashi Tharoor',   party: 'INC',    symbol: 'Hand',               totalVotesSecured: 416131, voteSharePct: 47.2 },
        { candidateName: 'Kummanam Rajasekharan', party: 'BJP', symbol: 'Lotus',            totalVotesSecured: 316142, voteSharePct: 35.8 },
        { candidateName: 'C. Divakaran',     party: 'CPI(M)', symbol: 'Hammer Sickle Star', totalVotesSecured: 136535, voteSharePct: 15.5 },
        { candidateName: 'NOTA',             party: 'NOTA',   symbol: 'NOTA',               totalVotesSecured: 8800,   voteSharePct: 1.0  },
      ],
    },
    2014: {
      constituencyName: 'Thiruvananthapuram',
      totalElectors: 1298000, totalPolled: 896820, totalValidVotes: 884000,
      voterTurnoutPct: 69.1,
      candidates: [
        { candidateName: 'Shashi Tharoor',   party: 'INC',    symbol: 'Hand',               totalVotesSecured: 297806, voteSharePct: 33.7 },
        { candidateName: 'O. Rajagopal',     party: 'BJP',    symbol: 'Lotus',               totalVotesSecured: 282336, voteSharePct: 31.9 },
        { candidateName: 'Bennet Abraham',   party: 'CPI(M)', symbol: 'Hammer Sickle Star',  totalVotesSecured: 272708, voteSharePct: 30.8 },
        { candidateName: 'NOTA',             party: 'NOTA',   symbol: 'NOTA',                totalVotesSecured: 8850,   voteSharePct: 1.0  },
      ],
    },
  },

  // ── WEST BENGAL ─────────────────────────────────────────

  // Kolkata North (sno: 8 in WB)
  'west-bengal:8': {
    2019: {
      constituencyName: 'Kolkata North',
      totalElectors: 1520000, totalPolled: 1033600, totalValidVotes: 1019000,
      voterTurnoutPct: 68.0,
      candidates: [
        { candidateName: 'Sudip Bandyopadhyay', party: 'AITC', symbol: 'Flowers and Grass', totalVotesSecured: 565138, voteSharePct: 55.5 },
        { candidateName: 'Rahul Sinha',          party: 'BJP',  symbol: 'Lotus',              totalVotesSecured: 392180, voteSharePct: 38.5 },
        { candidateName: 'NOTA',                 party: 'NOTA', symbol: 'NOTA',               totalVotesSecured: 10800,  voteSharePct: 1.1  },
        { candidateName: 'Others',               party: 'INC',  symbol: 'Hand',               totalVotesSecured: 50882,  voteSharePct: 5.0  },
      ],
    },
    2014: {
      constituencyName: 'Kolkata North',
      totalElectors: 1480000, totalPolled: 906760, totalValidVotes: 893000,
      voterTurnoutPct: 61.3,
      candidates: [
        { candidateName: 'Sudip Bandyopadhyay', party: 'AITC', symbol: 'Flowers and Grass', totalVotesSecured: 403240, voteSharePct: 45.2 },
        { candidateName: 'Smt. Krishna Bose',   party: 'INC',  symbol: 'Hand',              totalVotesSecured: 214350, voteSharePct: 24.0 },
        { candidateName: 'Prabhas Ghosh',       party: 'CPI(M)',symbol:'Hammer Sickle Star', totalVotesSecured: 168000, voteSharePct: 18.8 },
        { candidateName: 'Rahul Sinha',         party: 'BJP',  symbol: 'Lotus',              totalVotesSecured: 94000,  voteSharePct: 10.5 },
      ],
    },
  },
};

// ── Helper ────────────────────────────────────────────────
export const getHistoricalData = (stateSlug, constSno, year) => {
  const key  = `${stateSlug}:${constSno}`;
  const entry = HISTORICAL_DATA[key];
  if (!entry || !entry[year]) return null;

  const data = entry[year];
  const sorted = [...data.candidates].sort((a,b) => b.totalVotesSecured - a.totalVotesSecured);

  return {
    constituency_name:  data.constituencyName,
    const_sno:          Number(constSno),
    total_electors:     data.totalElectors,
    total_polled:       data.totalPolled,
    total_valid_votes:  data.totalValidVotes,
    voter_turnout_pct:  data.voterTurnoutPct,
    uncontested:        false,
    candidates: sorted.map(c => ({
      candidate_name:      c.candidateName,
      party:               c.party,
      symbol:              c.symbol,
      category:            'general',
      total_votes_secured: c.totalVotesSecured,
      vote_share_pct:      c.voteSharePct,
    })),
    _source: 'mock',
    _year:   year,
  };
};

// Which constituencies have historical data
export const hasHistoricalData = (stateSlug, constSno) => {
  return !!HISTORICAL_DATA[`${stateSlug}:${constSno}`];
};

export const AVAILABLE_YEARS = [2024, 2019, 2014];
