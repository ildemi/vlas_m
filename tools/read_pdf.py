
import sys
import subprocess
import importlib.util
import os

pdf_path = "c:\\Users\\esdei\\sa3i_vlas\\research_papers\\Adapting_ASR_ATC_27fec2025.pdf"

def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

if importlib.util.find_spec("pypdf") is None:
    print("Installing pypdf...")
    try:
        install("pypdf")
    except Exception as e:
        print(f"Failed to install pypdf: {e}")

try:
    from pypdf import PdfReader
    reader = PdfReader(pdf_path)
    full_text = ""
    for page in reader.pages:
        full_text += page.extract_text() + "\n"
    
    with open("paper_analysis_result.txt", "w", encoding="utf-8") as f:
        f.write(f"Total characters: {len(full_text)}\n")
        f.write("--- CONTENT START ---\n")
        f.write(full_text[:4000] + "\n")
        
        # Search for specific queries
        queries = ["WER", "Word Error Rate", "< 1%", "1%", "0."]
        f.write("\n--- RELEVANT SECTIONS ---\n")
        lines = full_text.split('\n')
        for i, line in enumerate(lines):
            for q in queries:
                if q.lower() in line.lower():
                    f.write(f"Line {i}: {line}\n")
                    # Context
                    start = max(0, i-2)
                    end = min(len(lines), i+3)
                    for j in range(start, end):
                         if j != i: f.write(f"  > {lines[j]}\n")
                    f.write("-" * 20 + "\n")
                    break
                
except Exception as e:
    print(f"Error reading PDF: {e}")
