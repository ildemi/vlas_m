# UX/UI Design Brief - VLAS Project
**Version:** 2.1 (Enhanced Definition)  
**Target Audience:** Web Designers / Frontend Developers  
**Objective:** To design the interface for a professional aviation safety tool used for auditing and analyzing Air Traffic Control (ATC) voice communications.

---

## 1. Product Vision & Evolution
VLAS is evolving from a simple transcription tool into a comprehensive **Safety & Quality Assurance Platform** for Air Navigation Service Providers (ANSPs). 

The core mission is to analyze voice radio communications between Controllers (ATCOs) and Pilots to ensure compliance with international safety regulations (ICAO). It detects errors such as incorrect phraseology, read-back errors, or language misuse.

**Major Shift in Data Organization:**
*   **Deprecated:** The previous concept of "Transcription Groups" (folders of audios) is removed.
*   **New Concept:** The system treats every upload as a **"Transcription Record"** or **"Event"**, which is indexed by metadata.
*   **Mandatory Tagging:** Every record must be tagged with:
    1.  **Airport / Sector** (Where the event happened).
    2.  **User/Owner ID** (Who is responsible/uploaded it).
    3.  **Date/Time**.

---

## 2. User Personas & Roles
The interface must adapt dynamically based on who is logged in. Use these three profiles to guide the design:

### A. The Controller (ATCO) - "The Self-Improver"
*   **Goal:** Auto-diagnosis and professional improvement.
*   **Context:** logs in after a shift to review their own performance.
*   **Needs:**
    *   **Privacy:** Only sees *their* own records.
    *   **Constructive Feedback:** The UI should feel educational, not punitive. It helps them "polish" their phraseology.
    *   **Simple Dashboard:** "My Last Shifts", "My Compliance Score".

### B. The Supervisor - "The Auditor"
*   **Goal:** Safety audit, incident review, and team standardization.
*   **Context:** Reviews performance across a specific sector or airport.
*   **Needs:**
    *   **Broader Access:** Can view records from multiple ATCOs within their assigned airport(s).
    *   **Search & Filter:** Advanced filtering capabilities (e.g., "Show me all audios from *LECU Airport* last week with *Read-back Errors*").
    *   **Flagging:** Ability to verify flagged incidents.

### C. The ANSP Safety Manager - "The Strategic Overseer"
*   **Goal:** Global quality control and systemic risk analysis.
*   **Context:** Looks for trends across the entire organization (multiple airports).
*   **Needs:**
    *   **High-Level Analytics:** Global dashboards (Heatmaps of errors, Compliance trends over months).
    *   **Drill-down:** Ability to go from a global stat down to a specific audio recording.

---

## 3. Core Interface Components

### A. The Dashboard (The Landing Page)
This visualizes the entry point based on the role.
*   **ATCO View:** A personal feed of uploaded sessions. Cards showing date, airport, and safety score.
*   **Supervisor/Manager View:** An "Inbox" or data table view.
    *   **Columns:** Status, Date, Airport, ATCO ID (anonymized if needed), Safety Score, # of Critical Errors.
    *   **Filters Panel:** Critical requirement. Filter by Airport, Date Range, Safety Level.

### B. The Upload Modal (Ingestion)
Streamlined process to input data.
*   **Drag & Drop Area.**
*   **Metadata Selector:** A prominent dropdown to select the **Airport/Sector** (Mandatory).
*   **Context:** The system auto-assigns the User ID.

### C. The Analysis Workbench (The Editor)
The core workspace where the audio and text meet.
*   **Chat-Style Layout:** visually distinct bubbles for **ATCO** vs **PILOT**.
*   **Audio Sync:** Clicking a text bubble plays that specific audio segment.
*   **Correction Tools:**
    *   The user must be able to edit the text if the AI transcription is wrong.
    *   Role Switcher: A quick toggle (e.g., "Change Speaker to Pilot") if the AI misidentified the speaker.
    *   Drag & Drop bubbles to fix chronological ordering errors.

### D. The Audit Results (The "Safety Layer")
Once validated, the UI overlays the safety findings on the transcript.
*   **Visual Error Indicators:** Use intuitive cues (underlines, icons in margins) to mark errors.
    *   *Red:* Critical Safety Risk (e.g., Read-back error).
    *   *Orange:* Non-standard Phraseology.
    *   *Blue:* Language deviation (English/Spanish mix).
*   **The "Why" Bubble:** Hovering over an error must display a clear explanation of the violated rule (Educational aspect).
*   **Scorecard:** A summary panel showing the compliance grade (e.g., "98% Compliance - Excellent").

---

## 4. Look & Feel Guidelines
*   **Tone:** Professional, Trustworthy, Industrial, Aviation-Safety.
*   **Visuals:** Clean lines, high readability (SANS Serif fonts).
*   **Colors:**
    *   Use a "Safety Palette": Greens for compliance, distinct Ambers/Reds for alerts.
    *   Dark Mode option is highly recommended (control towers and radar rooms are often dark).
*   **Responsiveness:** Primarily Desktop/Tablet (Office environment).

---
**Note to Designer:** The removal of "Groups" simplifies the hierarchy. Think of this as a specialized email client or bug tracker: A list of items (Records) that you filter, open, analyze, and close.
