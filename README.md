# VoteMatrix — India Election Intelligence Platform

A full-stack election analytics dashboard covering all 543 Lok Sabha constituencies from the 2024 Indian General Elections.

![Tech Stack](https://img.shields.io/badge/React-18-blue?logo=react) ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3-green?logo=spring) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwind-css)

---

## 🗺️ Features

### Lok Sabha (2024 General Elections)
- **National Dashboard** — Alliance seat distribution with interactive donut arc chart (NDA / INDIA Bloc / Others), state-wise navigation
- **State View** — Constituency grid with alliance filter, party breakdown bar, margin analysis
- **Constituency Detail** — Full candidate face-off, vote shares, turnout stats, year timeline toggle (2024 live · 2019/2014 mock)
- **Intelligence Console** — Cross-filter all 543 constituencies by victory margin, alliance, state, and turnout

### Assembly Elections
- **India Political Map** — State governance dashboard showing which party/alliance rules each state
- **Alliance Mode** — States colored by NDA (orange), INDIA Bloc (blue), Others (grey)
- **Party Mode** — Each state colored by ruling party
- **State Assembly View** — CM banner, seat distribution donut, constituency grid

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, React Router |
| Backend | Spring Boot 3.3, Java 21, Spring Data JPA |
| Database | PostgreSQL 15 |
| Build Tool | Maven |
| Data Source | Election Commission of India (2024) |

---

## 📁 Project Structure

```
votematrix/
├── frontend/                          # React + Vite app
│   ├── public/
│   │   └── Election_Results_2024_with_states.json
│   ├── src/
│   │   ├── components/
│   │   │   └── HorseshoeChart.jsx     # Alliance/party donut arc
│   │   ├── data/
│   │   │   ├── assemblyData.js        # State govt governance data
│   │   │   ├── electionData.js        # Alliance seat counts
│   │   │   ├── historicalMockData.js  # 2019/2014 mock data
│   │   │   ├── partyConfig.js         # Party colors + alliance mapping
│   │   │   └── useElectionData.js     # Data fetching hook
│   │   └── pages/
│   │       ├── NationalView.jsx
│   │       ├── StateView.jsx
│   │       ├── ConstituencyView.jsx
│   │       ├── IntelligenceView.jsx
│   │       ├── AssemblyNationalView.jsx
│   │       ├── AssemblyStateView.jsx
│   │       └── AssemblyConstituencyView.jsx
│   └── package.json
│
└── backend/                           # Spring Boot app
    └── src/main/java/com/votematrix/backend/
        ├── config/CorsConfig.java
        ├── controller/ElectionController.java
        ├── dto/
        │   ├── CandidateDTO.java
        │   ├── ConstituencyDTO.java
        │   └── StateDTO.java
        ├── loader/DataLoader.java
        ├── model/
        │   ├── Candidate.java
        │   └── Constituency.java
        ├── repository/
        │   ├── CandidateRepository.java
        │   └── ConstituencyRepository.java
        └── service/ElectionService.java
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Java 21+
- Maven 3.9+
- PostgreSQL 15+

---

### 1. Database Setup

```bash
psql -U postgres
```

```sql
CREATE DATABASE votematrix;
CREATE USER votematrix_user WITH PASSWORD 'votematrix123';
GRANT ALL PRIVILEGES ON DATABASE votematrix TO votematrix_user;
\q
```

---

### 2. Backend Setup

```bash
cd backend
```

Update `src/main/resources/application.properties` if needed:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/votematrix
spring.datasource.username=votematrix_user
spring.datasource.password=votematrix123
```

Copy election data into backend resources:
```bash
mkdir -p src/main/resources/data
cp ../frontend/public/Election_Results_2024_with_states.json src/main/resources/data/
```

Enable data import (first run only):
```properties
app.data.load-on-startup=true
```

Run the backend:
```bash
./mvnw spring-boot:run
```

After data imports successfully, set back to false:
```properties
app.data.load-on-startup=false
```

Verify at: `http://localhost:8080/api/health`

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open: `http://localhost:5173`

> The frontend automatically detects if the Spring Boot API is running and uses it. If the API is offline, it falls back to the local JSON file — so the app works standalone too.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/states?type=LOK_SABHA` | List all state slugs |
| GET | `/api/state/{slug}?year=2024` | State summary + constituencies |
| GET | `/api/constituency/{slug}/{sno}?year=2024` | Full constituency detail |

---

## 📊 Data

- **Source:** Election Commission of India
- **Coverage:** All 543 Lok Sabha constituencies, 2024 General Elections
- **Records:** ~2,200 constituencies + ~8,800 candidates
- **Format:** JSON (extracted from official ECI PDF using pdfplumber)

---

## 🗺️ Roadmap

- [ ] 2019 and 2014 Lok Sabha real data (PDF extraction complete)
- [ ] State Assembly elections — Tamil Nadu, West Bengal, Kerala, Assam, Puducherry
- [ ] Year-over-year comparison charts
- [ ] Candidate profile pages
- [ ] Production deployment (Vercel + Railway)

---

## 📸 Screenshots

<img width="1860" height="825" alt="EID_S1" src="https://github.com/user-attachments/assets/486fbc4e-e227-40e4-9b5d-a2abdce17489" />

<img width="1893" height="775" alt="EID_S2" src="https://github.com/user-attachments/assets/eaf0c4b0-4b6b-4a30-9ace-3c2f6dc25ded" />

<img width="1868" height="816" alt="EID_S3" src="https://github.com/user-attachments/assets/7434cd18-a79c-445a-b5ae-5c1020e20d5f" />

---

## 👨‍💻 Author

Built as a full-stack portfolio project demonstrating React, Spring Boot, and PostgreSQL integration with real-world election data.

---

## 📄 License

This project is for educational and portfolio purposes. Election data sourced from the Election Commission of India.
