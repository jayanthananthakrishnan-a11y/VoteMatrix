// ============================================================
// PHASE 1 MOCK DATA — No large JSON import, fully stable
// ============================================================

export const allianceData = {
  NDA: {
    total: 293,
    color: "#FF9933",
    parties: [
      { name: "BJP", seats: 240 }, { name: "TDP", seats: 16 }, { name: "JD(U)", seats: 12 },
      { name: "SHS", seats: 7 }, { name: "Others", seats: 18 },
    ]
  },
  INDIA: {
    total: 234,
    color: "#19AAED",
    parties: [
      { name: "INC", seats: 100 }, { name: "SP", seats: 37 }, { name: "AITC", seats: 29 },
      { name: "DMK", seats: 22 }, { name: "Others", seats: 46 },
    ]
  },
  Others: {
    total: 16,
    color: "#64748b",
    parties: [
      { name: "YSRCP", seats: 4 }, { name: "AAP", seats: 3 }, { name: "IND", seats: 9 }
    ]
  }
};

// All states/UTs for national navigation
export const allStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman & Nicobar", "Chandigarh", "Dadra & NH", "Lakshadweep",
  "Delhi", "Puducherry", "Jammu & Kashmir", "Ladakh"
];

// ============================================================
// STATE DATA (mock - Phase 1 uses Tamil Nadu as primary)
// ============================================================
export const stateDatabase = {
  "tamil-nadu": {
    stateName: "Tamil Nadu",
    totalSeats: 39,
    allianceSummary: [
      { label: "INDIA", seats: 39, color: "#19AAED" },
      { label: "NDA", seats: 0, color: "#FF9933" },
      { label: "Others", seats: 0, color: "#64748b" }
    ],
    partySummary: [
      { label: "DMK", seats: 22, color: "#DD0000" },
      { label: "INC", seats: 9, color: "#19AAED" },
      { label: "VCK", seats: 2, color: "#800080" },
      { label: "CPI(M)", seats: 2, color: "#de0000" },
      { label: "CPI", seats: 2, color: "#ff0040" },
      { label: "MDMK", seats: 1, color: "#ff6600" },
      { label: "IUML", seats: 1, color: "#006400" },
    ],
    constituencies: [
      { id: "TN-01", name: "Chennai North", winner: "K. Veeraswamy", party: "DMK", alliance: "INDIA", margin: 339235, marginPct: 36.1, turnout: 60.1, status: "SAFE" },
      { id: "TN-02", name: "Chennai South", winner: "Thamizhachi Thangapandian", party: "DMK", alliance: "INDIA", margin: 220000, marginPct: 24.3, turnout: 58.4, status: "SAFE" },
      { id: "TN-03", name: "Chennai Central", winner: "Dayanidhi Maran", party: "DMK", alliance: "INDIA", margin: 298000, marginPct: 30.2, turnout: 55.8, status: "SAFE" },
      { id: "TN-04", name: "Coimbatore", winner: "Ganapathi P Rajkumar", party: "DMK", alliance: "INDIA", margin: 118068, marginPct: 8.4, turnout: 64.8, status: "STABLE" },
      { id: "TN-05", name: "Dharmapuri", winner: "A. Mani", party: "DMK", alliance: "INDIA", margin: 21300, marginPct: 1.8, turnout: 81.2, status: "CRITICAL" },
      { id: "TN-06", name: "Madurai", winner: "S. Venkatesan", party: "CPI(M)", alliance: "INDIA", margin: 210000, marginPct: 20.1, turnout: 73.2, status: "SAFE" },
      { id: "TN-07", name: "Nilgiris", winner: "A. Raja", party: "DMK", alliance: "INDIA", margin: 240000, marginPct: 28.7, turnout: 71.5, status: "SAFE" },
      { id: "TN-08", name: "Salem", winner: "S. Senthil Kumar", party: "DMK", alliance: "INDIA", margin: 185000, marginPct: 16.4, turnout: 76.9, status: "SAFE" },
      { id: "TN-09", name: "Tiruchirappalli", winner: "Durai Vaiko", party: "INC", alliance: "INDIA", margin: 127000, marginPct: 12.2, turnout: 74.3, status: "STABLE" },
      { id: "TN-10", name: "Vellore", winner: "Kathir Anand", party: "DMK", alliance: "INDIA", margin: 183000, marginPct: 18.9, turnout: 79.1, status: "SAFE" },
    ]
  },
  "uttar-pradesh": {
    stateName: "Uttar Pradesh",
    totalSeats: 80,
    allianceSummary: [
      { label: "INDIA", seats: 43, color: "#19AAED" },
      { label: "NDA", seats: 36, color: "#FF9933" },
      { label: "Others", seats: 1, color: "#64748b" }
    ],
    partySummary: [
      { label: "SP", seats: 37, color: "#228B22" },
      { label: "BJP", seats: 33, color: "#FF9933" },
      { label: "INC", seats: 6, color: "#19AAED" },
      { label: "RLD", seats: 2, color: "#FFA500" },
      { label: "Others", seats: 2, color: "#64748b" }
    ],
    constituencies: [
      { id: "UP-37", name: "Varanasi", winner: "Narendra Modi", party: "BJP", alliance: "NDA", margin: 152513, marginPct: 13.8, turnout: 55.2, status: "STABLE" },
      { id: "UP-36", name: "Rae Bareli", winner: "Rahul Gandhi", party: "INC", alliance: "INDIA", margin: 390030, marginPct: 29.5, turnout: 56.8, status: "SAFE" },
      { id: "UP-43", name: "Lucknow", winner: "Rajnath Singh", party: "BJP", alliance: "NDA", margin: 120943, marginPct: 11.3, turnout: 53.7, status: "STABLE" },
      { id: "UP-01", name: "Saharanpur", winner: "Imran Masood", party: "INC", alliance: "INDIA", margin: 64889, marginPct: 7.2, turnout: 62.1, status: "STABLE" },
    ]
  },
  "maharashtra": {
    stateName: "Maharashtra",
    totalSeats: 48,
    allianceSummary: [
      { label: "NDA", seats: 17, color: "#FF9933" },
      { label: "INDIA", seats: 30, color: "#19AAED" },
      { label: "Others", seats: 1, color: "#64748b" }
    ],
    partySummary: [
      { label: "INC", seats: 13, color: "#19AAED" },
      { label: "BJP", seats: 9, color: "#FF9933" },
      { label: "SS(UBT)", seats: 9, color: "#FF6600" },
      { label: "NCP-SP", seats: 8, color: "#6A0DAD" },
      { label: "Others", seats: 9, color: "#64748b" }
    ],
    constituencies: [
      { id: "MH-24", name: "Mumbai North West", winner: "Ravindra Waikar", party: "SHS", alliance: "NDA", margin: 48, marginPct: 0.005, turnout: 52.1, status: "CRITICAL" },
      { id: "MH-26", name: "Mumbai South", winner: "Arvind Sawant", party: "SS(UBT)", alliance: "INDIA", margin: 53000, marginPct: 8.7, turnout: 49.8, status: "STABLE" },
    ]
  }
};

// ============================================================
// CONSTITUENCY DETAILED DATA (for ConstituencyView)
// ============================================================
export const constituencyDatabase = {
  "TN-01": {
    id: "TN-01",
    name: "Chennai North",
    state: "Tamil Nadu",
    stateSlug: "tamil-nadu",
    classification: "SAFE",
    years: {
      "2024": {
        winner: { name: "K. Veeraswamy", party: "DMK", votes: 497422, voteShare: 43.2 },
        runnerUp: { name: "R. C. Paul Kanagaraj", party: "BJP", votes: 158187, voteShare: 13.7 },
        margin: 339235,
        marginPct: 29.5,
        turnout: 60.1,
        totalVotes: 1150000,
        candidates: [
          { name: "K. Veeraswamy", party: "DMK", votes: 497422, voteShare: 43.2, isWinner: true },
          { name: "R. C. Paul Kanagaraj", party: "BJP", votes: 158187, voteShare: 13.7, isWinner: false },
          { name: "R. Manohar", party: "ADMK", votes: 158000, voteShare: 13.7, isWinner: false },
          { name: "S. Amudha", party: "NTK", votes: 75232, voteShare: 6.5, isWinner: false },
        ]
      },
      "2019": {
        winner: { name: "K. Veeraswamy", party: "DMK", votes: 521000, voteShare: 47.8 },
        runnerUp: { name: "J. Jayavardhan", party: "ADMK", votes: 260000, voteShare: 23.8 },
        margin: 261000,
        marginPct: 24.0,
        turnout: 63.4,
        totalVotes: 1090000,
        candidates: [
          { name: "K. Veeraswamy", party: "DMK", votes: 521000, voteShare: 47.8, isWinner: true },
          { name: "J. Jayavardhan", party: "ADMK", votes: 260000, voteShare: 23.8, isWinner: false },
          { name: "M. Ponraj", party: "BJP", votes: 98000, voteShare: 9.0, isWinner: false },
          { name: "Others", party: "IND", votes: 211000, voteShare: 19.4, isWinner: false },
        ]
      },
      "2014": {
        winner: { name: "K. Veeraswamy", party: "DMK", votes: 398000, voteShare: 36.2 },
        runnerUp: { name: "K. R. Rajamani", party: "ADMK", votes: 350000, voteShare: 31.8 },
        margin: 48000,
        marginPct: 4.4,
        turnout: 68.1,
        totalVotes: 1100000,
        candidates: [
          { name: "K. Veeraswamy", party: "DMK", votes: 398000, voteShare: 36.2, isWinner: true },
          { name: "K. R. Rajamani", party: "ADMK", votes: 350000, voteShare: 31.8, isWinner: false },
          { name: "S. Suresh", party: "BJP", votes: 54000, voteShare: 4.9, isWinner: false },
          { name: "Others", party: "IND", votes: 298000, voteShare: 27.1, isWinner: false },
        ]
      }
    },
    intelligence: {
      mostSuccessfulParty: "DMK",
      mostSuccessfulCandidate: "K. Veeraswamy",
      avgTurnout: 63.9,
      classification: "VERY SAFE",
      consecutiveWins: 3,
      notes: "DMK stronghold. Consistent winner since 2014. Urban constituency with high INC+DMK base."
    }
  },
  "TN-04": {
    id: "TN-04",
    name: "Coimbatore",
    state: "Tamil Nadu",
    stateSlug: "tamil-nadu",
    classification: "STABLE",
    years: {
      "2024": {
        winner: { name: "Ganapathi P Rajkumar", party: "DMK", votes: 568200, voteShare: 40.3 },
        runnerUp: { name: "K. Annamalai", party: "BJP", votes: 450132, voteShare: 31.9 },
        margin: 118068,
        marginPct: 8.4,
        turnout: 64.8,
        totalVotes: 1410000,
        candidates: [
          { name: "Ganapathi P Rajkumar", party: "DMK", votes: 568200, voteShare: 40.3, isWinner: true },
          { name: "K. Annamalai", party: "BJP", votes: 450132, voteShare: 31.9, isWinner: false },
          { name: "Singai Ramachandran", party: "ADMK", votes: 236490, voteShare: 16.8, isWinner: false },
          { name: "Kalamani Jaganathan", party: "NTK", votes: 82657, voteShare: 5.9, isWinner: false },
        ]
      },
      "2019": {
        winner: { name: "PR Natarajan", party: "CPI(M)", votes: 463337, voteShare: 37.1 },
        runnerUp: { name: "C. P. Radhakrishnan", party: "BJP", votes: 431359, voteShare: 34.5 },
        margin: 31978,
        marginPct: 2.6,
        turnout: 68.2,
        totalVotes: 1250000,
        candidates: [
          { name: "PR Natarajan", party: "CPI(M)", votes: 463337, voteShare: 37.1, isWinner: true },
          { name: "C. P. Radhakrishnan", party: "BJP", votes: 431359, voteShare: 34.5, isWinner: false },
          { name: "T. Manoharan", party: "ADMK", votes: 262000, voteShare: 21.0, isWinner: false },
          { name: "Others", party: "IND", votes: 93304, voteShare: 7.4, isWinner: false },
        ]
      },
      "2014": {
        winner: { name: "C. P. Radhakrishnan", party: "BJP", votes: 432000, voteShare: 33.8 },
        runnerUp: { name: "PR Natarajan", party: "CPI(M)", votes: 310000, voteShare: 24.3 },
        margin: 122000,
        marginPct: 9.5,
        turnout: 72.1,
        totalVotes: 1278000,
        candidates: [
          { name: "C. P. Radhakrishnan", party: "BJP", votes: 432000, voteShare: 33.8, isWinner: true },
          { name: "PR Natarajan", party: "CPI(M)", votes: 310000, voteShare: 24.3, isWinner: false },
          { name: "T. Subramanian", party: "ADMK", votes: 380000, voteShare: 29.8, isWinner: false },
          { name: "Others", party: "IND", votes: 156000, voteShare: 12.2, isWinner: false },
        ]
      }
    },
    intelligence: {
      mostSuccessfulParty: "Alternating",
      mostSuccessfulCandidate: "N/A (Swing)",
      avgTurnout: 68.4,
      classification: "SWING",
      consecutiveWins: 1,
      notes: "Classic swing seat. BJP won 2014, CPI(M) in 2019, DMK in 2024. BJP's K. Annamalai ran strong race despite losing."
    }
  },
  "TN-05": {
    id: "TN-05",
    name: "Dharmapuri",
    state: "Tamil Nadu",
    stateSlug: "tamil-nadu",
    classification: "CRITICAL",
    years: {
      "2024": {
        winner: { name: "A. Mani", party: "DMK", votes: 432667, voteShare: 33.6 },
        runnerUp: { name: "A. Soumiya Mathi Rajan", party: "PMK", votes: 411367, voteShare: 31.9 },
        margin: 21300,
        marginPct: 1.7,
        turnout: 81.2,
        totalVotes: 1287000,
        candidates: [
          { name: "A. Mani", party: "DMK", votes: 432667, voteShare: 33.6, isWinner: true },
          { name: "A. Soumiya Mathi Rajan", party: "PMK", votes: 411367, voteShare: 31.9, isWinner: false },
          { name: "R. Ashokan", party: "ADMK", votes: 293629, voteShare: 22.8, isWinner: false },
          { name: "Abinaya Ponnivalavan", party: "NTK", votes: 65381, voteShare: 5.1, isWinner: false },
        ]
      },
      "2019": {
        winner: { name: "A. Soumiya Mathi Rajan", party: "PMK", votes: 501000, voteShare: 38.5 },
        runnerUp: { name: "S. Senthil Kumar", party: "DMK", votes: 384000, voteShare: 29.5 },
        margin: 117000,
        marginPct: 9.0,
        turnout: 78.5,
        totalVotes: 1300000,
        candidates: [
          { name: "A. Soumiya Mathi Rajan", party: "PMK", votes: 501000, voteShare: 38.5, isWinner: true },
          { name: "S. Senthil Kumar", party: "DMK", votes: 384000, voteShare: 29.5, isWinner: false },
          { name: "M. Kumar", party: "ADMK", votes: 328000, voteShare: 25.2, isWinner: false },
          { name: "Others", party: "IND", votes: 87000, voteShare: 6.7, isWinner: false },
        ]
      },
      "2014": {
        winner: { name: "A. Soumiya Mathi Rajan", party: "PMK", votes: 452000, voteShare: 36.1 },
        runnerUp: { name: "R. Murugan", party: "BJP", votes: 220000, voteShare: 17.6 },
        margin: 232000,
        marginPct: 18.5,
        turnout: 80.3,
        totalVotes: 1252000,
        candidates: [
          { name: "A. Soumiya Mathi Rajan", party: "PMK", votes: 452000, voteShare: 36.1, isWinner: true },
          { name: "R. Murugan", party: "BJP", votes: 220000, voteShare: 17.6, isWinner: false },
          { name: "V. C. Sampath", party: "DMK", votes: 285000, voteShare: 22.8, isWinner: false },
          { name: "Others", party: "ADMK", votes: 295000, voteShare: 23.6, isWinner: false },
        ]
      }
    },
    intelligence: {
      mostSuccessfulParty: "PMK",
      mostSuccessfulCandidate: "A. Soumiya Mathi Rajan",
      avgTurnout: 80.0,
      classification: "SWING",
      consecutiveWins: 1,
      notes: "High-turnout rural constituency. PMK stronghold since 2014, narrowly lost 2024. DMK's win in 2024 was razor-thin."
    }
  },
  "UP-37": {
    id: "UP-37",
    name: "Varanasi",
    state: "Uttar Pradesh",
    stateSlug: "uttar-pradesh",
    classification: "STABLE",
    years: {
      "2024": {
        winner: { name: "Narendra Modi", party: "BJP", votes: 612970, voteShare: 54.2 },
        runnerUp: { name: "Ajay Rai", party: "INC", votes: 460457, voteShare: 40.7 },
        margin: 152513,
        marginPct: 13.5,
        turnout: 55.2,
        totalVotes: 1130000,
        candidates: [
          { name: "Narendra Modi", party: "BJP", votes: 612970, voteShare: 54.2, isWinner: true },
          { name: "Ajay Rai", party: "INC", votes: 460457, voteShare: 40.7, isWinner: false },
          { name: "Saurabh Kumar", party: "BSP", votes: 31000, voteShare: 2.7, isWinner: false },
          { name: "Others", party: "IND", votes: 25573, voteShare: 2.3, isWinner: false },
        ]
      },
      "2019": {
        winner: { name: "Narendra Modi", party: "BJP", votes: 674664, voteShare: 63.6 },
        runnerUp: { name: "Shalini Yadav", party: "SP", votes: 195159, voteShare: 18.4 },
        margin: 479505,
        marginPct: 45.2,
        turnout: 56.3,
        totalVotes: 1060000,
        candidates: [
          { name: "Narendra Modi", party: "BJP", votes: 674664, voteShare: 63.6, isWinner: true },
          { name: "Shalini Yadav", party: "SP", votes: 195159, voteShare: 18.4, isWinner: false },
          { name: "Ajay Rai", party: "INC", votes: 152548, voteShare: 14.4, isWinner: false },
          { name: "Others", party: "BSP", votes: 37629, voteShare: 3.5, isWinner: false },
        ]
      },
      "2014": {
        winner: { name: "Narendra Modi", party: "BJP", votes: 581022, voteShare: 56.4 },
        runnerUp: { name: "Arvind Kejriwal", party: "AAP", votes: 209238, voteShare: 20.3 },
        margin: 371784,
        marginPct: 36.1,
        turnout: 58.9,
        totalVotes: 1030000,
        candidates: [
          { name: "Narendra Modi", party: "BJP", votes: 581022, voteShare: 56.4, isWinner: true },
          { name: "Arvind Kejriwal", party: "AAP", votes: 209238, voteShare: 20.3, isWinner: false },
          { name: "Ajay Rai", party: "INC", votes: 75614, voteShare: 7.3, isWinner: false },
          { name: "Others", party: "BSP", votes: 164126, voteShare: 15.9, isWinner: false },
        ]
      }
    },
    intelligence: {
      mostSuccessfulParty: "BJP",
      mostSuccessfulCandidate: "Narendra Modi",
      avgTurnout: 56.8,
      classification: "BJP STRONGHOLD",
      consecutiveWins: 3,
      notes: "PM Modi's constituency. Won all 3 elections. Margin dramatically reduced in 2024, signaling opposition resurgence."
    }
  },
  "TN-02": {
    id: "TN-02",
    name: "Chennai South",
    state: "Tamil Nadu",
    stateSlug: "tamil-nadu",
    classification: "SAFE",
    years: {
      "2024": {
        winner: { name: "Thamizhachi Thangapandian", party: "DMK", votes: 498000, voteShare: 42.5 },
        runnerUp: { name: "H. Raja", party: "BJP", votes: 278000, voteShare: 23.7 },
        margin: 220000,
        marginPct: 18.8,
        turnout: 58.4,
        totalVotes: 1172000,
        candidates: [
          { name: "Thamizhachi Thangapandian", party: "DMK", votes: 498000, voteShare: 42.5, isWinner: true },
          { name: "H. Raja", party: "BJP", votes: 278000, voteShare: 23.7, isWinner: false },
          { name: "J. Chandrasekhar", party: "ADMK", votes: 245000, voteShare: 20.9, isWinner: false },
          { name: "Others", party: "NTK", votes: 151000, voteShare: 12.9, isWinner: false },
        ]
      },
      "2019": {
        winner: { name: "Thamizhachi Thangapandian", party: "DMK", votes: 521000, voteShare: 46.1 },
        runnerUp: { name: "T. Muruganantham", party: "ADMK", votes: 319000, voteShare: 28.2 },
        margin: 202000,
        marginPct: 17.9,
        turnout: 61.2,
        totalVotes: 1130000,
        candidates: [
          { name: "Thamizhachi Thangapandian", party: "DMK", votes: 521000, voteShare: 46.1, isWinner: true },
          { name: "T. Muruganantham", party: "ADMK", votes: 319000, voteShare: 28.2, isWinner: false },
          { name: "A. Gopalkrishnan", party: "BJP", votes: 173000, voteShare: 15.3, isWinner: false },
          { name: "Others", party: "IND", votes: 117000, voteShare: 10.4, isWinner: false },
        ]
      },
      "2014": {
        winner: { name: "Thamizhachi Thangapandian", party: "DMK", votes: 390000, voteShare: 38.6 },
        runnerUp: { name: "M. Kumar", party: "ADMK", votes: 355000, voteShare: 35.1 },
        margin: 35000,
        marginPct: 3.5,
        turnout: 65.8,
        totalVotes: 1011000,
        candidates: [
          { name: "Thamizhachi Thangapandian", party: "DMK", votes: 390000, voteShare: 38.6, isWinner: true },
          { name: "M. Kumar", party: "ADMK", votes: 355000, voteShare: 35.1, isWinner: false },
          { name: "P. Suresh", party: "BJP", votes: 65000, voteShare: 6.4, isWinner: false },
          { name: "Others", party: "IND", votes: 201000, voteShare: 19.9, isWinner: false },
        ]
      }
    },
    intelligence: {
      mostSuccessfulParty: "DMK",
      mostSuccessfulCandidate: "Thamizhachi Thangapandian",
      avgTurnout: 61.8,
      classification: "SAFE",
      consecutiveWins: 3,
      notes: "Consistent DMK winner. Urban south Chennai. Margin improving election after election."
    }
  }
};

// Helper to get state by slug
export const getStateData = (slug) => {
  return stateDatabase[slug] || null;
};

// Helper to get constituency by ID
export const getConstituencyData = (id) => {
  return constituencyDatabase[id] || null;
};

// Party colors map
export const partyColors = {
  "BJP": "#FF9933",
  "INC": "#19AAED",
  "DMK": "#DD0000",
  "ADMK": "#006400",
  "SP": "#228B22",
  "AITC": "#20C646",
  "PMK": "#FF6600",
  "CPI(M)": "#CC0000",
  "CPI": "#FF0040",
  "NTK": "#8B0000",
  "BSP": "#1565C0",
  "AAP": "#0096FF",
  "SHS": "#F26D21",
  "SS(UBT)": "#FF4500",
  "NCP-SP": "#6A0DAD",
  "IND": "#64748b",
  "NOTA": "#374151",
  "Others": "#64748b"
};
