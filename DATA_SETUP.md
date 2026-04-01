# Data Setup Guide

The main election data file (`Election_Results_2024_with_states.json`) is **not included in this repository** because it is ~35MB in size.

## How to get the data file

### Option A — Download from release assets
Check the [GitHub Releases](../../releases) page for the data file attached as a release asset.

### Option B — Extract from source PDF yourself

1. Download the official ECI PDF:  
   `33-Constituency-Wise-Detailed-Result.pdf` from the Election Commission of India website

2. Install the extraction dependencies:
```bash
pip install pdfplumber pandas openpyxl
```

3. Run the extraction script (in the `scripts/` folder):
```bash
python extract_election_data.py
```

4. This produces `Election_Results_2024_Final_Clean.xlsx`

5. Convert to JSON using the converter script:
```bash
python convert_to_json.py
```

6. Place the resulting JSON in:
   - `frontend/public/Election_Results_2024_with_states.json` (for frontend fallback)
   - `backend/src/main/resources/data/Election_Results_2024_with_states.json` (for DB import)

## After placing the data file

### Import into PostgreSQL (one time only)

In `backend/src/main/resources/application.properties`:
```properties
app.data.load-on-startup=true
```

Run the Spring Boot app:
```bash
cd backend
./mvnw spring-boot:run
```

Wait for the import to complete (you'll see log messages). Then set back to false:
```properties
app.data.load-on-startup=false
```

The database now has all 543 constituencies and ~8,800 candidates loaded.
