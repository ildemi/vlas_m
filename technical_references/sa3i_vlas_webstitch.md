VLAS 2.1: Functional Design Brief for Web Prototyping (Updated)

1.0 Introduction: Product Vision and Strategic Context VLAS 2.1 is a comprehensive Safety & Quality Assurance Platform for Air Navigation Service Providers (ANSPs), specifically designed to analyze critical voice communications between Air Traffic Controllers (ATCOs) and Pilots exclusively within the control tower environment. Its core mission is to automatically transcribe and audit these communications to ensure compliance with international safety regulations and proactively identify potential risks.

The fundamental data model treats every audio file uploaded as a self-contained "Transcription Record" or "Event." Each Transcription Record must be associated with the following three mandatory metadata tags upon creation:

Airport / Sector: The specific location where the communication took place.
User/Owner ID: The identifier for the user responsible for the record (now referred to as ATCO ID in relevant contexts).
Date/Time: The timestamp of the communication event.
The platform is optimized primarily for Desktop and Tablet displays and uses a Dark Mode UI as recommended to reduce eye strain.

2.0 User Personas and Role-Based Experience VLAS 2.1 employs a role-based architecture, dynamically adapting the UI, data access, and functionality for three distinct professional personas:

2.2.1 The Controller (ATCO) - "The Self-Improver"

Goal: To review personal performance for self-diagnosis and professional development.
Needs: Privacy (access to only their own records), Educational Focus (supportive UI for phraseology refinement).
2.2.2 The Supervisor - "The Auditor"

Goal: To conduct safety audits, review specific incidents, and ensure phraseology standardization.
Needs: Broader Data Access (multiple ATCOs within jurisdiction), Advanced Search & Filtering, Incident Flagging, and the ability to Start a new Transcription.
2.2.3 The ANSP Safety Manager - "The Strategic Overseer"

Goal: To perform global quality control, analyze systemic risks, and identify safety trends.
Needs: High-Level Analytics (dashboards), Drill-Down Capability.
3.0 Core Application Flow: The User Journey The primary user journey consists of:

Authentication: Secure, role-based access.
Dashboard Navigation: Reviewing existing records and initiating new work.
Audio Submission: Uploading new audio files with mandatory metadata.
Analysis & Correction: Interacting with AI-generated transcription in the main workbench.
Audit Review & Export: Assessing AI-generated safety reports and generating PDF reports.
4.0 Detailed Component Specifications (Updated)

4.1.1 Authentication Module

Login (Sign In): Corporate Email, Password. Actions: "Log In," "Forgot your password?", "Sign Up."
Registration (Sign Up): Full Name, Email, ATC License (Optional), Password, Confirm Password. Required Role Selector (Controller or Supervisor). Admin approval required.
4.1.2 The Dashboard (Role-Based Landing Page)

ATCO View: Personal feed of visual "cards," each displaying date, airport/sector, and safety score. "Start a new Transcription" action.
Supervisor Dashboard: Data-centric "inbox" or data table with sortable columns: Status, Date, Airport, ATCO ID, Safety Score. Includes a Filters Panel (Airport, Date Range, Safety Level) and the ability to Start a new Transcription.
4.1.3 Audio Submission (Upload Modal)

Primary Interaction: Drag & Drop Area for multi-file uploads.
Feedback: Clear progress bars.
Mandatory Metadata: Dropdown for Airport (prompt: "Select Airport (ej. LECU)..."). User ID automatically assigned as ATCO ID. The term "Data Ingestion" has been replaced with "Audio Submission."
4.1.6 Settings Pages (New)

VLAS 2.1 ATCO Settings: Allows ATCOs to manage personal information (including changing profile image), notification preferences, and privacy settings related to their records.
VLAS 2.1 Supervisor Settings: Provides Supervisors with administrative options such as managing user accounts within their jurisdiction, setting audit parameters, and system-wide notification preferences.
5.0 Global Design System & Look-and-Feel (Emphasized and Refined) The aesthetic must communicate Professional, Trustworthy, Industrial, and Aviation-Safety. Clarity, precision, and high-readability are paramount.

Typography: Clean, high-readability SANS Serif fonts.
Color Palette: Strict "Safety Palette." Greens for success, compliance, and primary action buttons/icons. Distinct Ambers/Yellows for warnings, and Reds for critical alerts. Base UI colors are neutral and non-distracting.
UI Mode: Dark Mode is mandatory across the entire application.
Backgrounds & Shadows: Dark, professional backgrounds with clear, subtle window shadows to establish hierarchy.
Responsiveness: Optimized primarily for Desktop and Tablet displays.