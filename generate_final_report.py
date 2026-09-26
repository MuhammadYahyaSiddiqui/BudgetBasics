import os
import sys
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_header_footer(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_header_footer(self, page_count):
        self.saveState()
        if self._pageNumber > 1:
            # Header
            self.setFont("Helvetica-Bold", 8)
            self.setFillColor(colors.HexColor("#1A365D"))
            self.drawString(54, 750, "APTECH - WEB INNOVATION UNLEASHED")
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor("#718096"))
            self.drawRightString(558, 750, "BudgetBasics — Software Project Documentation")
            self.setStrokeColor(colors.HexColor("#CBD5E1"))
            self.setLineWidth(0.75)
            self.line(54, 742, 558, 742)

            # Footer
            self.line(54, 45, 558, 45)
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor("#718096"))
            self.drawString(54, 32, "Confidential - Final Project Deliverable (No Source Code Included)")
            page_text = f"Page {self._pageNumber} of {page_count}"
            self.drawRightString(558, 32, page_text)
        self.restoreState()

def build_final_pdf(out_path):
    doc = SimpleDocTemplate(
        out_path,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=colors.HexColor('#0F172A'),
        spaceAfter=8
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor('#2563EB'),
        spaceAfter=14
    )

    h1_style = ParagraphStyle(
        'DocHeading1',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=colors.HexColor('#1E293B'),
        spaceBefore=12,
        spaceAfter=6,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'DocHeading2',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#2563EB'),
        spaceBefore=8,
        spaceAfter=3,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'DocBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#334155'),
        spaceAfter=5
    )

    bullet_style = ParagraphStyle(
        'DocBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor('#334155'),
        leftIndent=10,
        firstLineIndent=-6,
        spaceAfter=2.5
    )

    diagram_box = ParagraphStyle(
        'DocDiagram',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=7.5,
        leading=9.5,
        textColor=colors.HexColor('#0F172A'),
        backColor=colors.HexColor('#F8FAFC'),
        borderPadding=6,
        spaceBefore=4,
        spaceAfter=6
    )

    story = []

    # ================= COVER / METADATA =================
    story.append(Spacer(1, 10))
    story.append(Paragraph("APTECH LIMITED • WEB INNOVATION UNLEASHED", ParagraphStyle('Super', fontName='Helvetica-Bold', fontSize=9, textColor=colors.HexColor('#2563EB'), spaceAfter=4)))
    story.append(Paragraph("BudgetBasics: Final Software Project Report", title_style))
    story.append(Paragraph("Theme: NextGen BudgetBee | Complete SRS Design Specifications & Deliverables", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=2, color=colors.HexColor('#2563EB'), spaceAfter=10))

    meta_rows = [
        [Paragraph("<b>Project Name:</b> BudgetBasics", body_style), Paragraph("<b>Category:</b> Web Innovation Unleashed", body_style)],
        [Paragraph("<b>Theme:</b> NextGen BudgetBee", body_style), Paragraph("<b>Version:</b> 1.0 Final Release", body_style)],
        [Paragraph("<b>Architecture:</b> Client-Side SPA (No-Backend)", body_style), Paragraph("<b>Compliance:</b> 100% SRS Compliant (No Source Code in Doc)", body_style)]
    ]
    meta_table = Table(meta_rows, colWidths=[250, 254])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F1F5F9')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#CBD5E1')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E2E8F0')),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 10))

    # ================= SECTION 1 =================
    story.append(Paragraph("1. Problem Definition & Objectives", h1_style))
    story.append(Paragraph("College students, interns, and young professionals often manage monthly stipends, allowances, or part-time earnings without structured personal finance skills. Unconscious micro-spending, impulse purchasing, and unmonitored subscriptions lead to frequent month-end financial distress.", body_style))
    story.append(Paragraph("<b>Primary Objectives of BudgetBasics:</b>", h2_style))
    story.append(Paragraph("• Educate users on the 50-30-20 budgeting framework (Needs, Wants, and Savings).", bullet_style))
    story.append(Paragraph("• Provide real-time dynamic mathematical calculators with interactive visual charts (Chart.js).", bullet_style))
    story.append(Paragraph("• Offer a gamified 'Needs vs. Wants' decision classifier with instant rationale feedback.", bullet_style))
    story.append(Paragraph("• Facilitate session-based expense tracking (CRUD) with balance monitoring and CSV export.", bullet_style))
    story.append(Paragraph("• Deliver a smart client-side AI Chatbot ('BeeBot AI') for instant financial queries.", bullet_style))
    story.append(Paragraph("• Ensure 100% responsiveness, zero backend server dependencies, and Google Lighthouse optimization.", bullet_style))

    # ================= SECTION 2 =================
    story.append(Paragraph("2. System & User Interface Specifications", h1_style))
    story.append(Paragraph("The portal is engineered as a responsive Single Page Application (SPA) adhering strictly to Aptech SRS constraints:", body_style))

    modules_data = [
        [Paragraph("<b>Module</b>", body_style), Paragraph("<b>Key Interactive Components</b>", body_style), Paragraph("<b>Data Source</b>", body_style)],
        [Paragraph("<b>1. Basics Hub</b>", body_style), Paragraph("Educational cards, sample student monthly budget table, 3-question knowledge check quiz.", body_style), Paragraph("sample_budget.json<br/>quiz_data.json", body_style)],
        [Paragraph("<b>2. Needs vs Wants</b>", body_style), Paragraph("Interactive card-based game, live score counter, 24-Hour Rule delay matrix.", body_style), Paragraph("quiz_data.json", body_style)],
        [Paragraph("<b>3. 50-30-20 Calc</b>", body_style), Paragraph("Dynamic income input, multi-currency switcher (PKR/USD/INR/EUR/GBP), Chart.js pie chart.", body_style), Paragraph("Mathematical Formula Engine", body_style)],
        [Paragraph("<b>4. Savings Goals</b>", body_style), Paragraph("Target amount, monthly contribution, months projection, progress bar, motivation tips.", body_style), Paragraph("Client-side State", body_style)],
        [Paragraph("<b>5. Expense Planner</b>", body_style), Paragraph("CRUD table (Add, Edit, Delete), category badges, live remaining balance alerts, CSV export.", body_style), Paragraph("LocalStorage Cache", body_style)],
        [Paragraph("<b>6. Money Mistakes</b>", body_style), Paragraph("Interactive accordion cards, student scenarios, consequences, and corrective actions.", body_style), Paragraph("mistakes.json", body_style)],
        [Paragraph("<b>7. Infographics</b>", body_style), Paragraph("Topic filtering (Budgeting, Savings, Smart Spending), global search, modal lightbox.", body_style), Paragraph("infographics.json", body_style)],
        [Paragraph("<b>8. BeeBot AI</b>", body_style), Paragraph("Floating dialog, NLP keyword & token matching, quick prompt pills, educational disclaimer.", body_style), Paragraph("chatbot_kb.json", body_style)],
        [Paragraph("<b>9. Feedback & Contact</b>", body_style), Paragraph("Star rating selector, regex email validation, animated toast confirmation.", body_style), Paragraph("Client-side Validation", body_style)]
    ]
    modules_table = Table(modules_data, colWidths=[100, 290, 114])
    modules_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#1E293B')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#CBD5E1')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E2E8F0')),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#F8FAFC')])
    ]))
    story.append(modules_table)
    story.append(Spacer(1, 8))

    # ================= SECTION 3: FLOWCHARTS & DFD =================
    story.append(PageBreak())
    story.append(Paragraph("3. System Flowcharts & Data Flow Diagrams (DFD)", h1_style))
    story.append(Paragraph("<b>Figure 1: High-Level User Flowchart</b>", h2_style))

    flow_text = """[Visitor Enters BudgetBasics SPA]
       │
       ├─► [View Real-Time Ticker, Clock & Live Visitors]
       ├─► [Explore 50-30-20 Calculator] ──► [Enter Income] ──► [Render Chart.js Pie & Split]
       ├─► [Take Needs vs. Wants Quiz]   ──► [Classify Card]  ──► [Display Rationale & Score]
       ├─► [Expense Planner Tracker]      ──► [Add/Edit Item]   ──► [Update Table & Export CSV]
       ├─► [Interact with BeeBot AI]      ──► [Enter Query]    ──► [NLP Token Matcher & Reply]
       └─► [Submit Feedback / Contact]    ──► [Regex Validate] ──► [Render Toast Confirmation]"""
    story.append(Paragraph(flow_text.replace("\n", "<br/>").replace(" ", "&nbsp;"), diagram_box))

    story.append(Paragraph("<b>Figure 2: Data Flow Diagram (DFD Level 1 - Client State Flow)</b>", h2_style))
    dfd_text = """(User / Student)
       │
       ▼ [Actions / Form Inputs / Search Query]
[Client View Controller] ───► [Input Sanitizer & Regex Validator]
       │                                     │
       ├─────────────────────────────────────┼──────────────────────────────────┐
       ▼                                     ▼                                  ▼
[Math Engines]                      [Local State Cache]                [NLP Token Matcher]
• 50-30-20 Split Formula            • Active Expense Logs (CRUD)       • Scan chatbot_kb.json
• Savings Month Projection          • User Theme (Dark/Light)          • Best Intent Scoring
       │                                     │                                  │
       ▼                                     ▼                                  ▼
[Dynamic Chart & DOM]               [Table Render & CSV Generator]     [Chat Message Dialogue]"""
    story.append(Paragraph(dfd_text.replace("\n", "<br/>").replace(" ", "&nbsp;"), diagram_box))
    story.append(Spacer(1, 8))

    # ================= SECTION 4: TEST DATA =================
    story.append(Paragraph("4. Test Data Used in the Project", h1_style))
    story.append(Paragraph("All application modules are pre-populated and tested using structured JSON files located in the <code>/data</code> directory:", body_style))
    
    test_data_table = [
        [Paragraph("<b>Dataset File</b>", body_style), Paragraph("<b>Record Count / Scope</b>", body_style), Paragraph("<b>Sample Test Attributes</b>", body_style)],
        [Paragraph("<code>sample_budget.json</code>", body_style), Paragraph("3 Budget Categories (Needs, Wants, Savings)", body_style), Paragraph("Transport (6.5k), Food (7k), Subscriptions (2.5k), Savings (7k)", body_style)],
        [Paragraph("<code>mistakes.json</code>", body_style), Paragraph("6 Real-Life Case Studies", body_style), Paragraph("Impulse Buying, Latte Factor, Unused Subscriptions, Late Fees", body_style)],
        [Paragraph("<code>chatbot_kb.json</code>", body_style), Paragraph("8 Core NLP Intents + 5 Suggested Pills", body_style), Paragraph("50-30-20 rule, Needs vs Wants, Emergency Funds, Discounts", body_style)],
        [Paragraph("<code>quiz_data.json</code>", body_style), Paragraph("6 Interactive Items + 3 MCQs", body_style), Paragraph("Prescribed Textbook (Need), Designer Sneakers (Want)", body_style)],
        [Paragraph("<code>infographics.json</code>", body_style), Paragraph("5 Visual Frameworks", body_style), Paragraph("50-30-20 Split, 24-Hr Decision Matrix, 30-Day Savings Challenge", body_style)],
        [Paragraph("<code>quotes.json</code>", body_style), Paragraph("7 Curated Wisdom Quotes", body_style), Paragraph("Benjamin Franklin, Warren Buffett, Dave Ramsey", body_style)]
    ]
    td_table = Table(test_data_table, colWidths=[120, 160, 224])
    td_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#1E293B')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#CBD5E1')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E2E8F0')),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#F8FAFC')])
    ]))
    story.append(td_table)
    story.append(Spacer(1, 8))

    # ================= SECTION 5: INSTALLATION & VIDEO SCRIPT =================
    story.append(PageBreak())
    story.append(Paragraph("5. Project Installation Instructions (Mandatory)", h1_style))
    story.append(Paragraph("BudgetBasics is packaged for effortless execution across any workstation without database installation:", body_style))
    story.append(Paragraph("<b>Method 1: Local HTTP Server (Recommended for full JSON fetch):</b>", h2_style))
    story.append(Paragraph("1. Open PowerShell or Terminal in the project root directory.", bullet_style))
    story.append(Paragraph("2. Run the command: <code>python -m http.server 8000</code>", bullet_style))
    story.append(Paragraph("3. Open your browser and navigate to <code>http://localhost:8000</code>.", bullet_style))
    
    story.append(Paragraph("<b>Method 2: Visual Studio Code Live Server:</b>", h2_style))
    story.append(Paragraph("1. Open the project folder in VS Code.", bullet_style))
    story.append(Paragraph("2. Right-click <code>index.html</code> and select 'Open with Live Server'.", bullet_style))

    story.append(Paragraph("<b>Method 3: Direct Browser Launch:</b>", h2_style))
    story.append(Paragraph("1. Double click <code>index.html</code> to open immediately in Chrome, Edge, Safari, or Firefox.", bullet_style))

    story.append(Paragraph("6. Video Demonstration Script (MP4 Presentation Guide)", h1_style))
    story.append(Paragraph("To fulfill the mandatory MP4 video submission deliverable, follow this 3-minute demonstration sequence:", body_style))
    
    video_steps = [
        "<b>0:00 - 0:30: Introduction & Overview:</b> Showcase the branded hero banner, live clock, visitor counter, and dynamic financial quote ticker. Toggle Dark/Light mode.",
        "<b>0:30 - 1:00: Budgeting Basics & 50-30-20 Calculator:</b> Navigate to the 50-30-20 calculator, enter a student allowance (e.g. 40,000), demonstrate real-time Chart.js doughnut chart re-rendering, and switch currencies (PKR -> USD -> EUR).",
        "<b>1:00 - 1:30: Needs vs Wants Game & Savings Goals:</b> Play through the interactive classifier, show feedback explanations, and demonstrate the Savings Goal projection bar with student presets.",
        "<b>1:30 - 2:15: Expense Planner (CRUD) & CSV Export:</b> Add a new expense (Food: PKR 1,200), edit an existing record, demonstrate real-time remaining balance calculations, and click 'Export CSV'.",
        "<b>2:15 - 2:45: BeeBot AI Chatbot & Infographics:</b> Open BeeBot AI, click suggested prompt pills, ask custom financial questions, and show topic-filtered infographics with modal lightbox view.",
        "<b>2:45 - 3:00: Feedback, Validation & Conclusion:</b> Fill out the star rating feedback form, trigger client-side validation toast, show sitemap modal, and summarize the project."
    ]
    for step in video_steps:
        story.append(Paragraph(f"• {step}", bullet_style))

    story.append(Spacer(1, 10))
    story.append(Paragraph("7. Evaluation Compliance Checklist", h1_style))
    
    checklist = [
        [Paragraph("<b>SRS Requirement</b>", body_style), Paragraph("<b>Implementation Status</b>", body_style), Paragraph("<b>Verification Method</b>", body_style)],
        [Paragraph("Single Page Application (SPA)", body_style), Paragraph("<font color='#059669'><b>100% Implemented</b></font>", body_style), Paragraph("Fluid navigation, zero page reloads", body_style)],
        [Paragraph("No-Backend / Serverless Data", body_style), Paragraph("<font color='#059669'><b>100% Implemented</b></font>", body_style), Paragraph("JSON data files + LocalStorage CRUD", body_style)],
        [Paragraph("50-30-20 Calculator & Chart", body_style), Paragraph("<font color='#059669'><b>100% Implemented</b></font>", body_style), Paragraph("Chart.js live rendering & validation", body_style)],
        [Paragraph("Savings Goal Projection", body_style), Paragraph("<font color='#059669'><b>100% Implemented</b></font>", body_style), Paragraph("Month-by-month timeline calculation", body_style)],
        [Paragraph("Needs vs Wants Classifier", body_style), Paragraph("<font color='#059669'><b>100% Implemented</b></font>", body_style), Paragraph("Gamified decision test with score", body_style)],
        [Paragraph("Expense Planner Table (CRUD)", body_style), Paragraph("<font color='#059669'><b>100% Implemented</b></font>", body_style), Paragraph("Create, Read, Update, Delete + CSV", body_style)],
        [Paragraph("Rule-Based AI Chatbot", body_style), Paragraph("<font color='#059669'><b>100% Implemented</b></font>", body_style), Paragraph("BeeBot AI NLP pattern matching engine", body_style)],
        [Paragraph("Infographics & Topic Filter", body_style), Paragraph("<font color='#059669'><b>100% Implemented</b></font>", body_style), Paragraph("Lightbox modal & global search", body_style)],
        [Paragraph("Dark / Light Mode Toggle", body_style), Paragraph("<font color='#059669'><b>100% Implemented</b></font>", body_style), Paragraph("Persistent CSS variable theme switcher", body_style)],
        [Paragraph("Client-Side Form Validation", body_style), Paragraph("<font color='#059669'><b>100% Implemented</b></font>", body_style), Paragraph("Regex verification & toast system", body_style)]
    ]
    check_table = Table(checklist, colWidths=[150, 120, 234])
    check_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#1E293B')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#CBD5E1')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E2E8F0')),
        ('TOPPADDING', (0,0), (-1,-1), 2.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2.5),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#F8FAFC')])
    ]))
    story.append(check_table)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Final PDF built successfully: {out_path}")

if __name__ == "__main__":
    p1 = r"d:\APTECH PROJECT\BudgetBasics_Aptech_Final_Project_Report.pdf"
    p2 = r"C:\Users\Yahya -PC\Downloads\SRS_Web Innovation Unleashed\BudgetBasics_Aptech_Final_Project_Report.pdf"
    build_final_pdf(p1)
    build_final_pdf(p2)
