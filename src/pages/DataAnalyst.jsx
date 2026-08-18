// src/pages/DataAnalyst.jsx
import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import { 
  BarChart3, PieChart, Database, FileSpreadsheet, Settings, Cpu, LineChart, 
  Table, CheckCircle2, ArrowRight, ArrowUp, ArrowDown, Briefcase, FileText, LayoutDashboard, 
  BrainCircuit, Code2, Quote, Download, ListChecks, TrendingUp, Network, Sigma,
  X, Maximize2, Clock
} from 'lucide-react';
import { supabase } from '../lib/supabase';
// import { useMobileBack } from '../hooks/useMobileBack';

// ================= CUSTOM ANIMATED COUNTER COMPONENT =================
const AnimatedCounter = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate(val) {
          setCount(Math.floor(val));
        }
      });
      return () => controls.stop();
    }
  }, [value, inView]);

  return <span ref={ref} className="text-2xl font-black text-white mb-1 group-hover:text-emerald-400 transition-colors">{count}{suffix}</span>;
};

// ================= DEFAULT LOCAL DATA BASELINES =================
const defaultQuickStats = [
  { label: "Years in Analytics", value: 1, suffix: "" },
  { label: "Dashboards Built", value: 1, suffix: "" },
  { label: "Reports Created", value: 10, suffix: "+" },
  { label: "Automation Projects", value: 3, suffix: "+" },
  { label: "Processes Improved", value: 3, suffix: "+" },
  { label: "Hours Saved", value: 8, suffix: "+" }
];

const defaultRolesData = [
  {
    id: 1,
    statusBadge: "CURRENT ROLE",
    title: "Data Analyst Intern",
    company: "S.P. Madrid",
    customImage: "/images/spm-logo.png", // Added a local fallback path
    responsibilities: [
      "Data Cleaning", "Data Validation", "Data Reconciliation", "Data Accuracy Verification",
      "Operational Reporting", "Executive Reporting", "Dashboard Preparation", 
      "Power Query", "ODBC Connectivity", "Automations", "Automation Planning", 
      "Workflow Documentation", "Cross-functional Collaboration", "Continuous Improvement", "AI-assisted Productivity"
    ],
    impact: [
      "Support business reporting", "Improve data consistency", "Reduce manual processing",
      "Assist in decision-making", "Create reusable reporting solutions", "Prepare business-ready dashboards",
      "Promote efficient workflows", "Support process optimization"
    ]
  }
];

const defaultTechnicalSkills = [
  { 
    category: "Data Analysis", 
    icon: Table, 
    skills: ["Microsoft Excel", "Power Query", "Advanced Formulas", "Dynamic Arrays", "Data Cleaning", "Data Validation", "Data Consolidation", "Lookup Functions", "Dashboard Design", "Business Reporting", "Pivot Tables", "Data Transformation (Learning)", "Power Pivot (Learning)", "INDEX-MATCH (Learning)", "Data Profiling (Learning)"] 
  },
  { 
    category: "Data Visualization", 
    icon: PieChart, 
    skills: ["Executive Reports", "Data Storytelling", "Power BI (Learning)", "Tableau (Learning)", "Looker Studio (Learning)", "KPI Dashboards (Learning)"] 
  },
  { 
    category: "Business Intelligence", 
    icon: LineChart, 
    skills: ["Report Automation", "Executive Reporting (Learning)", "Decision Support (Learning)", "Business Metrics (Learning)", "KPI Development (Learning)", "Performance Analysis (Learning)", "Trend Analysis (Learning)", "Interactive Dashboards (Learning)", "Business Insights (Learning)"] 
  },
  { 
    category: "Database", 
    icon: Database, 
    skills: ["Database Administration", "ODBC", "SQL (Learning)", "PostgreSQL (Learning)", "MySQL (Learning)", "Window Functions (Learning)", "Common Table Expressions (CTEs) (Learning)", "Views (Learning)", "Stored Procedures (Learning)", "Database Design (Learning)"] 
  },
  { 
    category: "Programming", 
    icon: Code2, 
    skills: ["Python", "Automation Scripting", "OpenPyXL", "Pandas (Learning)", "NumPy (Learning)", "Matplotlib (Learning)", "Plotly (Learning)", "JavaScript (Learning)"] 
  },
  { 
    category: "Data Engineering", 
    icon: Network, 
    skills: ["ETL / ELT (Learning)", "Data Pipelines (Learning)", "Data Integration (Learning)", "REST APIs (Learning)", "JSON (Learning)", "API Integration (Learning)", "Data Warehousing (Learning)"] 
  },
  { 
    category: "Statistics", 
    icon: Sigma, 
    skills: ["Descriptive Statistics (Learning)", "Correlation Analysis (Learning)", "Hypothesis Testing (Learning)", "Regression Analysis (Learning)", "Forecasting (Learning)", "A/B Testing (Learning)"] 
  },
  { 
    category: "Cloud", 
    icon: Cpu, 
    skills: ["Microsoft Azure (Learning)", "Google Cloud Platform (GCP) (Learning)", "Amazon Web Services (AWS) (Learning)"] 
  },
  { 
    category: "AI & Analytics", 
    icon: BrainCircuit, 
    skills: ["ChatGPT", "Claude", "Gemini", "Prompt Engineering", "AI-Assisted Data Analysis", "LLM Fundamentals (Learning)", "Retrieval-Augmented Generation (RAG) (Learning)"] 
  },
  { 
    category: "Development Tools", 
    icon: Settings, 
    skills: ["Git", "GitHub", "Visual Studio Code", "Jupyter Notebook (Learning)"] 
  }
];

const defaultToolsTechnologies = [
  { 
    category: "Office Productivity", 
    tools: [
      { name: "MS Excel", imageSrc: "/images/excel.png" },
      { name: "MS Word", imageSrc: "/images/word.png" },
      { name: "Microsoft PowerPoint", imageSrc: "/images/powerpoint.png" },
      { name: "Microsoft Outlook (Learning)", imageSrc: "/images/outlook.png" }
    ] 
  },
  { 
    category: "Business Intelligence", 
    tools: [
      { name: "Microsoft Power BI (Learning)", imageSrc: "/images/powerbi.png" },
      { name: "Tableau (Learning)", imageSrc: "/images/tableau.png" },
      { name: "Looker Studio (Learning)", imageSrc: "/images/looker.png" }
    ] 
  },
  { 
    category: "Database", 
    tools: [
      { name: "ODBC", imageSrc: "/images/odbc.png" },
      { name: "Supabase", imageSrc: "/images/supabase.png" },
      { name: "PostgreSQL", imageSrc: "/images/postgresql.png" },
      { name: "MySQL", imageSrc: "/images/mysql.png" },
      { name: "SQL Server (Learning)", imageSrc: "/images/sqlserver.png" }
    ] 
  },
  { 
    category: "Programming", 
    tools: [
      { name: "Python", imageSrc: "/images/python.png" },
      { name: "Visual Studio Code", imageSrc: "/images/vscode.png" },
      { name: "Jupyter Notebook (Learning)", imageSrc: "/images/jupyter.png" }
    ] 
  },
  { 
    category: "Data Engineering", 
    tools: [
      { name: "Apache Airflow (Learning)", imageSrc: "/images/airflow.png" },
      { name: "dbt (Learning)", imageSrc: "/images/dbt.png" },
      { name: "Apache Spark (Learning)", imageSrc: "/images/spark.png" }
    ] 
  },
  { 
    category: "Cloud", 
    tools: [
      { name: "Microsoft Azure (Learning)", imageSrc: "/images/azure.png" },
      { name: "Google Cloud Platform (Learning)", imageSrc: "/images/gcp.png" },
      { name: "Amazon Web Services (Learning)", imageSrc: "/images/aws.png" }
    ] 
  },
  { 
    category: "Data Visualization", 
    tools: [
      { name: "Plotly (Learning)", imageSrc: "/images/plotly.png" },
      { name: "Matplotlib (Learning)", imageSrc: "/images/matplotlib.png" }
    ] 
  },
  { 
    category: "AI Assistance", 
    tools: [
      { name: "ChatGPT", imageSrc: "/images/chatgpt.png" },
      { name: "Claude", imageSrc: "/images/claude.png" },
      { name: "Gemini", imageSrc: "/images/gemini.png" },
      { name: "GitHub Copilot", imageSrc: "/images/copilot.png" }
    ] 
  },
  { 
    category: "Version Control", 
    tools: [
      { name: "Git", imageSrc: "/images/git.png" },
      { name: "GitHub", imageSrc: "/images/github.png" }
    ] 
  },
  { 
    category: "API & Development", 
    tools: [
      { name: "Postman (Learning)", imageSrc: "/images/postman.png" },
      { name: "Insomnia (Learning)", imageSrc: "/images/insomnia.png" }
    ] 
  },
  { 
    category: "Project Management", 
    tools: [
      { name: "Trello", imageSrc: "/images/trello.png" },
      { name: "Notion", imageSrc: "/images/notion.png" },
      { name: "Jira (Learning)", imageSrc: "/images/jira.png" }
    ] 
  },
  { 
    category: "Automation", 
    tools: [
      { name: "Zapier (Learning)", imageSrc: "/images/zapier.png" },
      { name: "n8n (Learning)", imageSrc: "/images/n8n.png" }
    ] 
  }
];

const defaultShowcaseData = { 
  dashboards: [
    {
      id: "1785500522425",
      name: "Case Studies Pending. Real-world project data is currently being prepared and validated for showcase.",
      status: "IN PREPARATION",
      department: "",
      industry: "",
      purpose: "",
      software: "TBA",
      kpis: ["TBA"],
      impact: "TBA",
      thumbnail: "" 
    }
  ], 
  reports: [
    {
      id: "1785500528041",
      viz: "Structured Excel data tables, advanced sorting and filtering, status tracking, hierarchical account assignment, worklist monitoring, standardized import templates, and account placement tracking.",
      title: "Endorsement Process Report - Business Loan",
      tools: "Microsoft Excel, AnyDesk, System 1, System 2, CMS Import Manager, Lark, Lark Drive",
      format: "Microsoft Excel Workbook",
      impact: "Improved endorsement accuracy, reduced manual errors, maintained an updated worklist, and supported efficient account distribution.",
      source: "Endorsement emails & MS Excel Database",
      context: "Managed the Bank endorsement process by retrieving endorsed accounts from email, analyzing new endorsements accounts using advanced Excel formulas, importing updated data into System 1 and System 2, and maintaining Excel trackers and Google Drive worklists, under the supervision of a Senior Data Analyst.",
      audience: "Operations Team, Collection Supervisors, Campaign Managers",
      findings: "Identified newly endorsed, and duplicate accounts before import and worklist updates.",
      frequency: "Daily",
      objective: "Managed Bank  Endorsements, validated accounts using advanced Excel, performed system imports, and maintained worklists under the supervision of a Senior Data Analyst.",
      tools_icons: "https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1783787178293.png,https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786099338740_9y1zi.webp,https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786099792356_b6jql.png,https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786099792356_b6jql.png,https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786099792356_b6jql.png,https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786099335517_oa8lb.png,https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786099335517_oa8lb.png",
      recommendations: "Automate repetitive Excel tasks, such as formatting, account validation, and worklist preparation, to improve processing efficiency and reduce manual effort."
    },
    {
      id: "1786101489980",
      viz: "Structured data tables, Excel filters, sorting, XLOOKUP and VLOOKUP comparisons, status tracking, worklist monitoring, pullout tracking, protected worksheets, standardized upload templates.",
      title: "Amount to Update (ATU) Report - Business Loan",
      tools: "Microsoft Excel,System 1, System 2, CMS Import Manager",
      format: "Microsoft Excel Workbook",
      impact: "Improved accuracy of account updates, reduced manual reconciliation errors, maintained consistent information across multiple systems, standardized daily update processes, and supported efficient campaign operations.",
      source: "Daily email, MS Excel worklists, MS Excel Database",
      context: "Daily account updates are received through email and compared against previous worklists to identify pullouts, reactivations, and account changes. Validated updates are prepared for batch uploads and synchronized across System 1 and System 2, and shared worklists to ensure operational data remains accurate and consistent.",
      audience: "Operations Team, Collection Supervisors, Campaign Managers",
      findings: "Identified pullout and reactivated accounts, validated account status changes, detected worklist differences from previous reports, updated Amount to Update values, synchronized pushback amounts and specific statuses, and prepared validated records for system uploads.",
      frequency: "Daily",
      objective: "Monitor account updates, identify pullout and reactivation records, update account information, and synchronize changes across operational systems to maintain accurate campaign data. under the supervision of a Senior Data Analyst.",
      tools_icons: "https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1783787178293.png,https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786099792356_b6jql.png,https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786099792356_b6jql.png,https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786099792356_b6jql.png",
      recommendations: "Automate repetitive Excel tasks, such as worklist comparison, pullout identification, XLOOKUP/VLOOKUP validation, template preparation, and status synchronization, to improve processing efficiency, reduce manual effort, and minimize reconciliation errors."
    },
    {
      id: "1786105044647",
      viz: "Structured Excel data tables, filters, sorting, lookup functions (XLOOKUP/VLOOKUP), duplicate checking, data validation, and consolidated reporting tables.",
      title: "Consolidated Field Result Report",
      tools: "Microsoft Excel,Lark Drive",
      format: "Microsoft Excel Workbook",
      impact: "Improved historical data organization, enhanced record accuracy, reduced manual consolidation effort, and provided a reliable dataset for operational analysis and decision-making.",
      source: "Field Collection Records (2022–2026), Internal Operational Records",
      context: "Historical field collection data from multiple years required consolidation into a unified dataset. Records were reviewed, filtered, and validated using Excel functions to identify active accounts, match Account Names, and eliminate inconsistencies before producing a clean operational report.",
      audience: "Operations Team, Collection Supervisors, Campaign Managers",
      findings: "Consolidated historical field collection records, identified active accounts, validated Account Name assignments, detected inconsistent records, and produced a standardized dataset for operational reporting.",
      frequency: "As Needed",
      objective: "Consolidate field collection results from multiple historical datasets into a single structured report by validating account records, identifying active accounts, and organizing information for operational analysis and reporting. under the supervision of a Senior Data Analyst.",
      tools_icons: "https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1783787178293.png,https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786099335517_oa8lb.png",
      recommendations: "Automate data consolidation, lookup validation, duplicate detection, and record matching to improve processing efficiency, reduce manual effort, and maintain consistent historical reporting."
    },
    {
      id: "1786106550313",
      viz: "Structured Excel data tables, advanced filtering, sorting, XLOOKUP/VLOOKUP validation, account matching, contact validation, and standardized import templates.",
      title: "Import Contact Data from Field Result",
      tools: "Microsoft Excel,Lark Drive",
      format: "Microsoft Excel Workbook",
      impact: "Improved contact data accuracy, reduced manual data preparation, standardized contact imports, and supported more reliable operational records.",
      source: "Field ollection results, MS Excel Databases, Historical account records",
      context: "Field collection results contained large volumes of account and contact information that required filtering, validation, and consolidation before being imported into the operational system. Account numbers were used to verify active records and ensure contact information was accurately matched to the appropriate accounts.",
      audience: "Operations Team, Collection Supervisors, Campaign Managers",
      findings: "Identified active accounts, validated contact information using account numbers, filtered duplicate or inactive records, and prepared accurate contact data.",
      frequency: "As Needed",
      objective: "Prepare and validate contact information from field collection results by identifying active accounts, verifying account records, and organizing contact data for import into the operational system. under the supervision of a Senior Data Analyst.",
      tools_icons: "https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1783787178293.png,https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786099335517_oa8lb.png",
      recommendations: "Automate contact validation, account matching, duplicate detection, and import template preparation to improve processing efficiency, reduce manual effort, and ensure data consistency before system imports."
    },
    {
      id: "1786106948736",
      viz: "Structured Excel data tables, payment reconciliation tables, filtered account records, conditional formatting, comparison results, lookup-based validation, payment calculation columns, ROUNDUP validation, and status/error identification using filters.",
      title: "Payment Update - Cards",
      tools: "Microsoft Excel, ODBC, UiPath, Anydesk, Google Sheets, Lark Drive, Bank Portal.",
      format: "Microsoft Excel Workbook",
      impact: "Improved payment data accuracy, reduced manual reconciliation effort, ensured validated payment updates, and supported timely and reliable operational reporting.",
      source: "Bank Portal using UIPath and Anydesk, GoogleSheet, LarkDrive, ODBC-Connected Excel Workbook (Database)",
      context: "Payment records were extracted from the bank portal using UiPath automation through remote access and processed in Excel using SUMIF. The results were compared with the previous Excel file using comparison operators, then validated using an ODBC-connected Excel database, lookup functions, percentage calculations, ROUNDUP, and fill handle. Final payment amounts were checked, data errors were cleaned, and the report was validated before sending it to Seniors and updating Lark Drive.",
      audience: "Operations Team, Collection Supervisors, Campaign Managers",
      findings: "Extracted and reconciled bank payment records, identified payment updates and discrepancies through comparison with previous records, validated payment amounts and calculations, and identified errors requiring correction before final reporting.",
      frequency: "Weekly",
      objective: "Extract and reconcile payment records from bank-generated data to support monitoring, payment validation, and operational reporting. under the supervision of a Senior Data Analyst.",
      tools_icons: "https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1783787178293.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1783787622802.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786712912223_catha.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786099338740_9y1zi.webp, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786713502792_cyey3.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786099335517_oa8lb.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786713520204_yownp.png",
      recommendations: "Automate payment extraction, reconciliation, calculation, and validation to reduce repetitive Excel work, minimize manual errors, and improve the efficiency of daily payment reporting."
    },
    {
      id: "1786713880318",
      viz: "Structured Excel data tables, filtered account records, payment tracking columns, XLOOKUP/SUMIF results, payment-date validation, status classification, principal calculation tables, ROUNDUP comparison, and exception filtering.",
      title: "Payment Update - Personal Loan",
      tools: "Microsoft Excel, ODBC, Google Sheets, Lark Drive",
      format: "Microsoft Excel Workbook",
      impact: "Improved accuracy of Personal Loan payment monitoring, maintained updated account and payment records, strengthened validation of principal and payment amounts, and supported reliable operational reporting.",
      source: "Google Sheets, LarkDrive, Updated Payments Excel File, ODBC-Connected Excel Workbook Database",
      context: "Personal Loan accounts were updated in the Monitoring file by identifying new accounts, matching payment records using account numbers, and calculating payments using SUMIF and XLOOKUP. Weekly payment amounts and dates were validated and formatted, followed by status classification based on Due Dates and payment amounts. values were then matched from the Database and validated against the Amount and Discount Rate.",
      audience: "Operations Team, Collection Supervisors, Campaign Managers",
      findings: "Identified and updated new Personal Loan accounts, matched weekly payment amounts and dates, validated payment records against the payment database, classified accounts and identified Amount discrepancies requiring further review.",
      frequency: "Weekly",
      objective: "Update and validate Personal Loan payment records by matching account numbers with payment data, determining account status, and validating payment amounts for accurate monitoring.  under the supervision of a Senior Data Analyst.",
      tools_icons: "https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1783787178293.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1783787622802.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786713502792_cyey3.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786099335517_oa8lb.png",
      recommendations: "Automate account matching, weekly payment consolidation, payment-date validation, status classification, principal calculations, and exception identification to reduce repetitive Excel work and improve the efficiency and consistency of payment monitoring."
    },
    {
      id: "1786722712441",
      viz: "Structured Excel audit tables, filtered records, conditional formatting, lookup-based validation, comparison columns, status validation, principal calculations, ROUNDUP comparisons, date validation, and exception filtering.",
      title: "Data Quality & Compliance Audit Report – Cards & Personal Loan",
      tools: "Microsoft Excel, ODBC, Google Sheets, Lark",
      format: "Microsoft Excel Workbook & Lark Drive",
      impact: "Improved data accuracy at both the input and reporting levels, reduced recurring data errors, strengthened compliance with business rules, improved communication with collectors/agents, and supported more reliable operational monitoring and reporting.",
      source: "Google Sheet, Lark Drive, Monitoring Excel, Excel Database",
      context: "Records and collector/agent inputs were audited against established business rules. The process involved reviewing entries in Lark Drive and Google Sheets, analyzing data using advanced Excel formulas to identify potential errors, validating classifications, account status, payments, amounts, discount rates, Face Amounts, dates, and source-of-contact information. Identified errors were communicated to the concerned collector/agent through Lark and Lark Drive, with instructions to correct or update the records.",
      audience: "Operations Team, Collection Supervisors, Campaign Managers",
      findings: "Identified potential errors and inconsistencies in collector/agent inputs, classifications, account statuses, payment records, principal calculations, discount rates, Face Amounts, dates, and source-of-contact information. Advanced Excel formulas were used to analyze records and identify data requiring further verification or correction.",
      frequency: "Daily",
      objective: "Audit records and collector/agent inputs against established business rules to identify data errors, validate account information, and ensure accurate and compliant operational records. under the supervision of a Senior Data Analyst.",
      tools_icons: "https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1783787178293.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1783787622802.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786713502792_cyey3.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786099335517_oa8lb.png",
      recommendations: "Automate recurring business-rule checks and Excel-based validation to identify potential errors before submission, while maintaining direct feedback and correction procedures with collectors/agents to improve data quality at the source."
    },
    {
      id: "1786724849501",
      viz: "Structured Excel tables, filtered records, sorting, classification columns, numbering, rule-based templates, status filtering, and account-number lookup/checking.",
      title: "Certification Request Report",
      tools: "Microsoft Excel, Google Sheets, Lark",
      format: "Microsoft Excel Workbook",
      impact: "Improved organization and accuracy of certification requests, standardized request preparation across multiple rules, reduced manual sorting and classification effort, and supported timely submission of certification files.",
      source: "Google sheets, Lark Drive",
      context: "Certification request records were reviewed and prepared from the Lark Drive and Google Sheets. Records with existing Remarks or invalid Leaders Approval values were removed, then requests were classified according to Payment Type, Type of Certificate, Level, and Certification Status. Separate Excel templates were created for each certification rule, validated, numbered, and prepared for submission. The corresponding file names were then recorded in the Certification Request Drive before the completed files were sent separately to the designated recipient.",
      audience: "Operations Team, Collection Supervisors, Campaign Managers, Certification/Processing Team",
      findings: "Identified and organized certification requests according to payment types, certificate types, and applicable levels. Records were prioritized based on Certification Status, checked for required information, and assigned the appropriate request template and file name.",
      frequency: "Weekly",
      objective: "Prepare and organize BPI certification requests according to payment type, certificate type, collection level, and certification status while ensuring records meet established request rules before submission. under the supervision of a Senior Data Analyst.",
      tools_icons: "https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1783787178293.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786713502792_cyey3.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786099335517_oa8lb.png",
      recommendations: "Standardize certification request templates and automate rule-based classification, filtering, numbering, and file-name generation to reduce repetitive preparation work and minimize errors when assigning requests to the appropriate certification category."
    },
    {
      id: "1786726022755",
      viz: "Structured tracking tables, filtered account records, delivery-status fields, tracking-number records, and consolidated shipment information.",
      title: "Delivery Tracking Report",
      tools: "Microsoft Excel, Lark Drive,  PDF, Tracking Website",
      format: "Lark Sheet",
      impact: "Improved visibility of account-related deliveries, centralized shipment tracking information, reduced the need to manually search individual records, and supported timely monitoring of delivery status.",
      source: "Shipment PDF files, Microsoft Excel account records, Tracking Website, Lark Drive",
      context: "Shipment information was received through PDF files containing account tracking numbers. Tracking numbers were extracted from the documents and used to check delivery status through the LBC tracking website. Account information such as the account name was obtained from the provided Excel records, then consolidated with the information and recorded in Lark Drive for operational tracking.",
      audience: "Operations Team, Collection Supervisors, Campaign Managers",
      findings: "Consolidated tracking numbers with corresponding account information and updated delivery statuses based on tracking results, providing a centralized view of shipment progress for operational monitoring.",
      frequency: "As needed",
      objective: "Track the delivery status of shipped accounts and consolidate shipment information with account details for operational monitoring.  under the supervision of a Senior Data Analyst.",
      tools_icons: "https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1783787178293.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786099335517_oa8lb.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/untitled-1.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786727586823_0ipbw.png",
      recommendations: "Standardize the tracking template and automate the consolidation of tracking numbers, account information, and delivery-status updates where possible to reduce repetitive manual encoding and improve tracking efficiency."
    },
    {
      id: "1786727968190",
      viz: "Structured Excel data tables, filters, XLOOKUP/VLOOKUP results, account matching, campaign classification, touchpoint categorization, payment-type classification, date-based account status classification, and exception filtering.",
      title: "Payment List Personal Loan 3 Campaigns",
      tools: "Microsoft Excel, ODBC, Lark, System 1",
      format: "Microsoft Excel Workbook",
      impact: "Improved accuracy and consistency of payment records, reduced manual account-matching effort, standardized payment-list preparation across multiple Personal Loan campaigns, and provided organized payment data for operational processing and monitoring.",
      source: "Lark Base, Confirmed Data, EPA List, Database, Pullout Database, Worklists Excel, System 1, Lark Drive",
      context: "Payment records were extracted from the Monthly Confirmed Data and filtered based on the current month and applicable Personal Loan campaigns. Account numbers were matched against internal and Pullout databases using XLOOKUP to retrieve Account Codes, Placement, and other account information. Records were cleaned, standardized, classified by campaign, touchpoint, payment type, and account status, then validated against available databases and System 1 when necessary. Separate standardized payment lists were prepared for 3 Personal Loan Campaigns.",
      audience: "Operations Team, Collection Supervisors, Campaign Managers",
      findings: "Consolidated monthly payment records for 3 Personal Loan Campaigns, matched accounts with internal databases, identified Account Codes and placements, standardized campaign and touchpoint classifications, classified payment types, removed invalid or incomplete records, and categorized accounts based on endorsement dates as Fresh Endorsement, Existing Accounts, or other applicable classifications.",
      frequency: "Weekly",
      objective: "Consolidate and validate Personal Loan payment records for campaigns, match account information with internal databases, classify accounts and payment types, and prepare standardized payment lists for operational processing.  under the supervision of a Senior Data Analyst.",
      tools_icons: "https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1783787178293.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1783787622802.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786099335517_oa8lb.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786099792356_b6jql.png",
      recommendations: "Automate account matching, campaign and touchpoint standardization, payment-type classification, endorsement-date lookup, and exception filtering to reduce repetitive manual processing and improve the consistency of monthly payment-list preparation."
    },
    {
      id: "1786728858165",
      viz: "Structured Excel tables, filtered collection records, Power Query transformations, positive/negative status classification, account-level activity tracking, placement-based grouping, payment summaries, collection-result categorization, and consolidated monitoring worksheets.",
      title: "Collection Efforts Personal Loan 3 Campaigns Report",
      tools: "Microsoft Excel, ODBC, Lark, System 1, Power Query",
      format: "Microsoft Excel Workbook",
      impact: "Improved visibility of collection activities across multiple channels, standardized account-level monitoring, reduced manual consolidation effort, improved consistency of collection records, and supported campaign monitoring and operational decision-making.",
      source: "System 1, Monthly Lark Base, Field Result files, Callouts files, Skiptrace records, Excel databases, Pullout Database, and payment records.",
      context: "Collection activity data from calls, skiptracing, field visits, and payments were consolidated and matched against account records to monitor collection efforts for Personal Loan accounts. Account information was validated using database lookups, while collection results, contact dates, visitation results, payment details, and reasons for non-payment were incorporated into standardized collection templates.",
      audience: "Operations Team, Collection Supervisors, Campaign Managers",
      findings: "Consolidated collection activities across calls, skiptracing, field visits, and payments; classified accounts based on positive and negative collection results; identified contact and visitation outcomes; matched payment information to account records; categorized accounts according to 3 campaigns placement; and identified reasons for non-payment from recent collection records.",
      frequency: "Weekly",
      objective: "Consolidate and monitor collection efforts across calls, skiptracing, field visits, and payments for Personal Loan accounts under the 3 campaigns.  under the supervision of a Senior Data Analyst.",
      tools_icons: "https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1783787178293.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1783787622802.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786099335517_oa8lb.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786099792356_b6jql.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/untitled-2.png",
      recommendations: "Standardize collection-result classifications and templates, automate account matching and data consolidation, maintain updated collection records, reconcile payment and collection data, and standardize non-payment classifications for consistent and accurate monitoring."
    },
    {
      id: "1786730418597",
      viz: "Structured Excel tables, filtering, sorting, data cleaning, attendance-date updates, and record consolidation.",
      title: "Daily Attendance Personal Loan 3 Campaigns Report",
      tools: "Microsoft Excel, Lark",
      format: "Microsoft Excel Workbook",
      impact: "Maintained accurate and up-to-date attendance records, improved consistency of daily reporting, and reduced errors before submission.",
      source: "Attendance Template, Lark Drive, Lark",
      context: "An attendance template was received through Lark and updated using the latest attendance information from Lark Drive. The records were reviewed and cleaned for accuracy and consistency before the finalized attendance file was submitted back through Lark.",
      audience: "Operations Team, Collection Supervisors, Campaign Managers",
      findings: "Updated and consolidated daily attendance records for the 3 campaigns while identifying and cleaning inconsistent or incomplete entries before submission.",
      frequency: "Daily",
      objective: "Update, clean, and consolidate daily attendance records for Personal Loan 3 campaigns.  under the supervision of a Senior Data Analyst.",
      tools_icons: "https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1783787178293.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786099335517_oa8lb.png",
      recommendations: "Standardize the attendance template and automate repetitive updates and data-cleaning steps to improve accuracy and reduce manual processing."
    }
  ], 
  automations: [
    {
      id: "1785500534377",
      name: "Excel File Comparison Tool",
      problem: "Bank-returned reports contained revisions that were difficult to identify manually, while existing Excel comparison tools online were not specifically tailored to the company's specific data classifications and workflow.",
      objectives: "Develop a company-specific comparison tool that identifies structural and cell-level changes according to the organization's reporting requirements.",
      currentProcess: "Manually compare the original report with the bank-revised report and identify changes based on company-specific classifications.",
      steps: "Upload original and revised files → automatically compare data and structure → identify changes → highlight revisions → generate a detailed comparison report.",
      tech: "VS Code, Python, Streamlit, Pandas, OpenPyXL, NumPy",
      tech_icons: "https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1785515378284_tf06x.webp, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1783788360639.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786784426987_9n3yi.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786784426399_o5kj0.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786784423930_9h59f.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/numpy-logo-png_seeklogo-398690.png",
      ai: "Claude, Gemini, OpenAI Codex, GitHub Copilot",
      ai_icons: "https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1783788569385.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1783788645402.webp, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1785763616844_h4xi1.webp, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1783788774161.png",
      timeSaved: "2",
      productivity: "Faster identification and review of bank revisions.",
      githubLink: "https://github.com/JeffersonGonzales2026/Excel-File-Comparison-Tool.git",
      thumbnail: "https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786779412452_g8710.png"
    },
    {
      id: "1786783563378",
      name: "Agent Code & Name Automation",
      problem: "During manual audits, identifying the collector responsible for each error required repeatedly navigating large Lark Sheets to find the agent code, locating the corresponding agent name in another sheet, and manually preparing error notifications. This became especially time-consuming when handling a large volume of errors.",
      objectives: "Automate agent identification and error reporting by matching account numbers and agent codes, then generating a ready-to-send output.",
      currentProcess: "Review each error → scroll through multiple Lark Sheet columns → find the agent code → search another Lark Sheet for the agent name → manually format the account number, agent name, and error → send each result to the Lark group chat.",
      steps: "Upload Excel with Account Number & Agent Code + error PDF → automatically match accounts → identify agent names → generate formatted results with @Agent Name, account number, and error details → copy and paste the results directly into the Lark group chat.",
      tech: "VS Code, Python, Streamlit, Pandas, PDF Parsing, Excel, PDF Generation",
      tech_icons: "https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1785515378284_tf06x.webp, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1783788360639.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786784426987_9n3yi.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786784426399_o5kj0.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786784776183_yg99u.svg, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1783787178293.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/untitled-1.png",
      ai: "Claude, Gemini, OpenAI Codex, GitHub Copilot",
      ai_icons: "https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1783788569385.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1783788645402.webp, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1785763616844_h4xi1.webp, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1783788774161.png",
      timeSaved: "2",
      productivity: "Significantly faster error-to-agent identification and bulk reporting.",
      githubLink: "https://github.com/JeffersonGonzales2026/AgentCdNmAuto.git",
      thumbnail: "https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786783744734_yeqnc.png"
    },
    {
      id: "1786785508008",
      name: "Payment & Date Automation",
      problem: "Updating weekly payment amounts and payment dates required repetitive Excel lookups and manual processing between payment files and the monitoring tracker.",
      objectives: "Automate the matching and updating of payment amounts and dates by account number while organizing payments into weekly columns.",
      currentProcess: "Copy payment data → match account numbers → use XLOOKUP/SUMIF → update weekly payment amounts and dates → correct date formats → repeat for multiple weeks.",
      steps: "Upload payment file and tracker → select source and target columns → automatically match account numbers → organize payments by calendar week → populate payment amounts and dates → generate updated tracker.",
      tech: "VS Code, Python, Streamlit, Pandas, OpenPyXL, Microsoft Excel",
      tech_icons: "https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1785515378284_tf06x.webp, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1783788360639.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786784426987_9n3yi.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786784426399_o5kj0.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786784423930_9h59f.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1783787178293.png",
      ai: "Claude, Gemini, OpenAI Codex, GitHub Copilot",
      ai_icons: "https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1783788569385.png, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1783788645402.webp, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1785763616844_h4xi1.webp, https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1783788774161.png",
      timeSaved: "2",
      productivity: "Faster processing of weekly payment records and tracker updates.",
      githubLink: "https://github.com/JeffersonGonzales2026/PL-PYTS-DATE-AUTO.git",
      thumbnail: "https://ddiffnvaonxrxnxzirav.supabase.co/storage/v1/object/public/portfolio_media/1786785716053_uj9ev.png"
    }
  ], 
  caseStudies: [], 
  projects: [] 
};

export default function DataAnalyst() {
  const [activeTab, setActiveTab] = useState('dashboards');
  const containerRef = useRef(null);

  const [stats, setStats] = useState(defaultQuickStats);
  const [roles, setRoles] = useState(defaultRolesData);
  const [techSkills, setTechSkills] = useState(defaultTechnicalSkills);
  const [showcase, setShowcase] = useState(defaultShowcaseData);
  const [ecosystem, setEcosystem] = useState(defaultToolsTechnologies);
  const [pageResume, setPageResume] = useState({
  title: "Data Analyst Resume",
  file_url: "/resume/Data_Analyst_Resume.pdf",
  pdf_url: "/resume/Data_Analyst_Resume.pdf"
});

  // NEW STATES FOR REPORT MODALS
  const [previewReport, setPreviewReport] = useState(null); // Katamtamang Preview Modal
  const [fullReport, setFullReport] = useState(null); // Whole View Modal

  // NEW STATES FOR AUTOMATION MODALS
  const [previewAutomation, setPreviewAutomation] = useState(null);
  const [fullAutomation, setFullAutomation] = useState(null);

  // ================= DYNAMIC CATEGORIZATION LOGIC =================
  const groupResponsibilities = (resps) => {
    const groups = {
      "Data Processing & Integrity": [],
      "Reporting & Dashboards": [],
      "Technical & Automation": [],
      "Strategy & Collaboration": []
    };

    resps.forEach(r => {
      const lower = r.toLowerCase();
      if (lower.includes('clean') || lower.includes('valid') || lower.includes('reconcil') || lower.includes('accur')) {
        groups["Data Processing & Integrity"].push(r);
      } else if (lower.includes('report') || lower.includes('dashboard')) {
        groups["Reporting & Dashboards"].push(r);
      } else if (lower.includes('query') || lower.includes('odbc') || lower.includes('automat')) {
        // Removed the 'ai' trigger so it correctly routes to Strategy
        groups["Technical & Automation"].push(r);
      } else {
        groups["Strategy & Collaboration"].push(r);
      }
    });

    return Object.entries(groups).filter(([_, items]) => items.length > 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from('data_analyst').select('*').eq('id', 1).single();
        if (error && error.code !== 'PGRST116') throw error;

        if (data) {
          if (Array.isArray(data.performance_counters) && data.performance_counters.length > 0) setStats(data.performance_counters);
          
          if (Array.isArray(data.experience_roles) && data.experience_roles.length > 0) {
            const formattedRoles = data.experience_roles.map(r => {
              let imgUrl = null;
              if (r.logo_url) imgUrl = r.logo_url;
              else if (r.image_url) imgUrl = r.image_url;
              else if (r.image) imgUrl = r.image;
              else if (r.logo) imgUrl = r.logo;
              else if (r.company_logo) imgUrl = r.company_logo;
              if (!imgUrl) {
                for (const key in r) {
                  if (typeof r[key] === 'string' && (r[key].startsWith('http') || r[key].includes('supabase.co'))) {
                    imgUrl = r[key]; break;
                  }
                }
              }
              return {
                ...r,
                customImage: imgUrl,
                responsibilities: typeof r.responsibilities === 'string' ? r.responsibilities.split(',').map(s => s.trim()).filter(Boolean) : (Array.isArray(r.responsibilities) ? r.responsibilities : []),
                impact: typeof r.impact === 'string' ? r.impact.split(',').map(s => s.trim()).filter(Boolean) : (Array.isArray(r.impact) ? r.impact : [])
              };
            });
            setRoles(formattedRoles);
          }
          
          if (Array.isArray(data.technical_competencies) && data.technical_competencies.length > 0) {
            const formattedSkills = data.technical_competencies.map((c, index) => {
              const defaultIcon = defaultTechnicalSkills[index]?.icon || FileText;
              return {
                ...c, icon: defaultIcon,
                skills: typeof c.skills === 'string' ? c.skills.split(',').map(s => s.trim()).filter(Boolean) : (Array.isArray(c.skills) ? c.skills : [])
              }
            });
            setTechSkills(formattedSkills);
          }
          
          if (Array.isArray(data.software_ecosystem) && data.software_ecosystem.length > 0) {
            const formattedEcosystem = data.software_ecosystem.map(cat => {
              let parsedTools = [];
              if (Array.isArray(cat.tools)) parsedTools = cat.tools;
              else if (typeof cat.tools === 'string') parsedTools = cat.tools.split(',').map(t => ({ name: t.trim() }));

              return {
                ...cat,
                tools: parsedTools.map(tool => {
                  let imgUrl = null;
                  if (typeof tool === 'object' && tool !== null) {
                    if (tool.logo_url) imgUrl = tool.logo_url; else if (tool.image_url) imgUrl = tool.image_url;
                    else if (tool.image) imgUrl = tool.image; else if (tool.logo) imgUrl = tool.logo;
                    else if (tool.icon_url) imgUrl = tool.icon_url; else if (typeof tool.icon === 'string' && tool.icon.includes('http')) imgUrl = tool.icon;
                    if (!imgUrl) {
                      for (const key in tool) {
                        if (typeof tool[key] === 'string' && (tool[key].startsWith('http') || tool[key].includes('supabase.co'))) {
                          imgUrl = tool[key]; break;
                        }
                      }
                    }
                  }
                  if (!imgUrl && tool.imageSrc) imgUrl = tool.imageSrc;
                  return { ...(typeof tool === 'object' ? tool : { name: tool }), customImage: imgUrl };
                })
              };
            });
            setEcosystem(formattedEcosystem);
          }

          const formattedDashboards = Array.isArray(data.portfolio_dashboards) ? data.portfolio_dashboards.map(d => ({
            ...d, kpis: typeof d.kpis === 'string' ? d.kpis.split(',').map(s => s.trim()).filter(Boolean) : (Array.isArray(d.kpis) ? d.kpis : [])
          })) : [];

          setShowcase({
            dashboards: formattedDashboards.length > 0 ? formattedDashboards : defaultShowcaseData.dashboards,
            reports: Array.isArray(data.portfolio_reports) && data.portfolio_reports.length > 0 ? data.portfolio_reports : defaultShowcaseData.reports,
            automations: Array.isArray(data.portfolio_automations) && data.portfolio_automations.length > 0 ? data.portfolio_automations : defaultShowcaseData.automations,
            caseStudies: Array.isArray(data.portfolio_case_studies) && data.portfolio_case_studies.length > 0 ? data.portfolio_case_studies : defaultShowcaseData.caseStudies,
            projects: Array.isArray(data.portfolio_projects) && data.portfolio_projects.length > 0 ? data.portfolio_projects : defaultShowcaseData.projects,
          });
        }
        
        const { data: allResumes, error: resumeError } = await supabase.from('portfolio_resumes').select('*');
        if (allResumes && !resumeError && allResumes.length > 0) {
          const analystResume = allResumes.find(res => res.title.toLowerCase().includes('data') || res.title.toLowerCase().includes('analyst')) || allResumes[0]; 
          setPageResume(analystResume);
        }
        
      } catch (err) {
        console.error('Error fetching Data Analyst CMS data:', err.message);
      }
    };
    fetchData();
  }, []);

  const scrollToSection = (id) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Helper function to map tool strings to actual image paths dynamically
  const getToolIcon = (toolName) => {
    const lowerName = toolName.toLowerCase();
    
    // First, check dynamic ecosystem state from Supabase
    for (const cat of ecosystem) {
      for (const t of cat.tools) {
        if (lowerName.includes(t.name.toLowerCase())) {
          return t.customImage || t.imageSrc;
        }
      }
    }
    
    // Fallbacks corresponding to your Admin Dashboard structure
    if (lowerName.includes('excel')) return '/images/excel.png';
    if (lowerName.includes('power query')) return '/images/powerquery.png';
    if (lowerName.includes('power bi') || lowerName.includes('powerbi')) return '/images/powerbi.png';
    if (lowerName.includes('sql')) return '/images/sql.png';
    if (lowerName.includes('python')) return '/images/python.png';
    if (lowerName.includes('word')) return '/images/word.png';
    if (lowerName.includes('powerpoint')) return '/images/powerpoint.png';
    if (lowerName.includes('odbc')) return '/images/odbc.png';
    if (lowerName.includes('supabase')) return '/images/supabase.png';
    if (lowerName.includes('postgres')) return '/images/postgresql.png';
    if (lowerName.includes('javascript')) return '/images/javascript.png';
    if (lowerName.includes('react')) return '/images/react.png';
    if (lowerName.includes('chatgpt')) return '/images/chatgpt.png';
    if (lowerName.includes('claude')) return '/images/claude.png';
    if (lowerName.includes('gemini')) return '/images/gemini.png';
    if (lowerName.includes('copilot')) return '/images/copilot.png';
    
    return null; // Triggers fallback Neon Icon
  };

  const EmptyState = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full py-16 flex flex-col items-center justify-center text-slate-500 font-mono text-sm border border-dashed border-slate-700 bg-slate-900/30 rounded-2xl col-span-full">
      <Database size={32} className="mb-4 opacity-40 text-emerald-500" />
      <p className="text-center px-4 max-w-md">Case Studies Pending. Real-world project data is currently being prepared and validated for showcase.</p>
    </motion.div>
  );

  return (
    <div ref={containerRef} className="flex flex-col min-h-screen bg-[#020617] text-slate-200 overflow-x-hidden relative selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Backgrounds */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-lime-600/10 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative pt-35 md:pt-65 pb-20 md:pb-30 px-6 min-h-[85vh] flex flex-col items-center justify-center z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-5xl mx-auto text-center">
          
          <h1 className="text-[38px] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-8">
            Transforming Data <br className="md:hidden" />
            <span className="hidden md:inline">into </span>
            <span className="md:hidden">into </span>
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-300">
              <span className="md:hidden">Business <br /> Decisions.</span>
              <span className="hidden md:inline">Business Decisions.</span>
            </span>
          </h1>

          <div className="text-base md:text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto space-y-4 mb-10">
            <p><strong>Data tells stories.</strong> I help organizations uncover those stories by transforming raw information into actionable insights through reporting, dashboards, automation, and analytical thinking.</p>
            <p>As a Data Analyst Intern, I continuously learn how data can improve operations, increase efficiency, and support strategic business decisions.</p>
          </div>

          {/* ADDED: Button directing to Analytics Portfolio */}
          <div className="flex justify-center mb-12">
            <button 
              onClick={() => scrollToSection('analytics-portfolio')}
              className="px-8 py-3.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:-translate-y-1 flex items-center gap-2 cursor-pointer relative z-20"
            >
              <LayoutDashboard size={18} />
              View Analytics Portfolio
              <ArrowDown size={16} className="ml-1" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-24 md:mt-0">
            {stats.map((stat, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.2 + (idx * 0.1) }}
                className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm flex flex-col items-center justify-center hover:border-emerald-500/50 transition-colors group">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <span className="text-[10px] text-slate-400 uppercase tracking-wider text-center">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ================= 2. PROFESSIONAL SUMMARY & ROLE (CATEGORIZED GROUPS) ================= */}
      <section className="py-20 px-6 relative z-10 border-t border-slate-800/50 bg-slate-900/20">
        <div className="max-w-7xl mx-auto">
            
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-16 space-y-6">
            <h3 className="text-2xl md:text-4xl font-black text-white">Professional Summary</h3>
            <div className="w-16 h-1 bg-emerald-500 rounded-full mx-auto" />
            <div className="text-slate-300 space-y-5 text-sm md:text-[15px] leading-relaxed tracking-wide text-left mt-8">
              <p>Jefferson Gonzales is currently a Data Analyst Intern at S.P. Madrid, where he applies analytical thinking to support business operations.</p>
              <p>His responsibilities include collecting, organizing, cleaning, validating, and analyzing operational data before transforming it into reports and dashboards that help stakeholders make informed decisions.</p>
              <p>Throughout his internship, he has developed a proactive mindset, communicating clearly and collaborating effectively while remaining proactive rather than reactive. He triple-checks data and reports for accuracy and ensures that information is reliable before presenting it. He never hesitates to ask questions when unsure, continues to listen, learn, and improve, and stays focused and detail-oriented. He also understands the importance of the manual process before automating it and uses technology to solve problems while maintaining accuracy and efficiency.</p>
              <p>Beyond reporting, he is actively exploring workflow automation, business intelligence, and AI-assisted analytics to reduce repetitive work and improve organizational efficiency.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-full flex justify-center mt-12">
            {roles.map((role) => (
              <motion.div key={role.id} whileHover={{ scale: 1.01, borderColor: 'rgba(16, 185, 129, 0.4)' }} transition={{ duration: 0.3 }}
                className="w-full max-w-4xl p-6 md:p-10 rounded-3xl bg-[#0f172a] border border-slate-800 shadow-2xl relative overflow-hidden group transition-colors">
                
                <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/5 transition-colors duration-500 rounded-3xl z-0"/>
                
                <div className="relative z-10">
                  
                  {/* ALIGNED HEADER: Logo side-by-side on mobile and PC */}
                  <div className="flex flex-row items-center mb-8 gap-4 md:gap-5">
                    <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center p-2 shadow-lg group-hover:border-emerald-500/30 transition-colors">
                      {role.customImage ? ( 
                        <img 
                          src={role.customImage} 
                          alt={role.company} 
                          className="w-full h-full object-contain rounded-xl"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/images/spm-logo.png"; // Fallback offline logo
                          }} 
                        /> 
                      ) : ( 
                        <Briefcase size={32} className="text-emerald-500/50" /> 
                      )}
                    </div>
                    <div>
                      <div className="mb-1 md:mb-2">
                        <span className="px-2 md:px-3 py-1 rounded-full bg-emerald-400 text-slate-950 text-[10px] md:text-[11px] font-black uppercase tracking-wider shadow-[0_0_10px_rgba(52,211,153,0.4)]">
                          {role.statusBadge}
                        </span>
                      </div>
                      <h4 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight">{role.title}</h4>
                      <p className="text-sm md:text-base text-lime-400 font-semibold">{role.company}</p>
                    </div>
                  </div>

                  <div className="mb-10">
                    <h5 className="text-[11px] text-slate-500 uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                      <ListChecks size={14} className="text-emerald-500" />
                      Core Responsibilities
                    </h5>
                    
                    {/* CATEGORIZED GROUPING */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {groupResponsibilities(role.responsibilities).map(([groupName, items], idx) => (
                        <div key={idx} className="bg-slate-800/20 p-5 rounded-2xl border border-slate-700/50 hover:bg-slate-800/40 transition-colors">
                          <h6 className="text-emerald-400 text-[10px] uppercase tracking-widest font-bold mb-3 border-b border-slate-700 pb-2">{groupName}</h6>
                          <ul className="space-y-2">
                            {items.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-slate-500 text-xs mt-0.5">▹</span>
                                <span className="text-xs md:text-sm text-slate-300 leading-tight">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  <h5 className="text-[11px] text-slate-500 uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                    <TrendingUp size={14} className="text-emerald-500" />
                    Professional Impact
                  </h5>
                  <div className="bg-slate-800/30 p-5 md:p-6 rounded-2xl border border-slate-700/50">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                      {role.impact.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                          <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" /> 
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= 3. TECHNICAL COMPETENCIES (MASONRY LAYOUT) ================= */}
      <section className="py-20 px-6 relative z-10 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-2xl md:text-4xl font-black text-white mb-4">Technical Competencies</h3>
            <div className="w-16 h-1 bg-emerald-500 rounded-full mx-auto" />
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {techSkills.map((section, index) => {
              const IconComponent = section.icon || FileText;
              return (
                <motion.div key={index} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: index * 0.05 }}
                  className="break-inside-avoid p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-emerald-500/50 transition-colors group mb-6 inline-block w-full">
                  
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2 group-hover:text-emerald-400 transition-colors">
                    <IconComponent size={20} className="text-emerald-400 shrink-0" />
                    {section.category}
                  </h4>
                  
                  <ul className="space-y-2">
                    {section.skills.map((skill, i) => (
                      <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 shrink-0 mt-1.5" />
                        <span className={skill.includes('Learning') || skill.includes('Future') ? 'italic text-slate-500' : 'text-slate-300'}>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= ANALYTICS PORTFOLIO (WITH ID FOR SCROLLING) ================= */}
      <section id="analytics-portfolio" className="py-20 px-6 relative z-10 border-t border-slate-800/50 bg-slate-900/20 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-4xl font-black text-white mb-4">Analytics Portfolio</h3>
            <div className="w-16 h-1 bg-emerald-500 rounded-full mx-auto mb-6" />
            {/* Tinanggal ang word na 'case studies' sa text */}
            <p className="text-slate-400 max-w-2xl mx-auto text-sm">A structured showcase of interactive dashboards, detailed reporting, and workflow automations.</p>
          </div>

          {/* BAGONG MODERN TABS LAYOUT (Kasya sa mobile, iisang linya) */}
          <div className="flex justify-center mb-12 px-2">
            <div className="inline-flex bg-slate-900/60 p-1.5 rounded-full border border-slate-800 max-w-full overflow-x-auto hide-scrollbar">
              {['dashboards', 'reports', 'automations'].map((tab) => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all capitalize whitespace-nowrap shrink-0 ${
                    activeTab === tab 
                    ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeTab === 'dashboards' && (
                <motion.div key="dashboards" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {showcase.dashboards?.length > 0 ? showcase.dashboards.map(item => (
                    <div key={item.id} className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden flex flex-col group hover:border-emerald-500/50 transition-colors">
                      <div className="h-48 bg-slate-800 relative flex items-center justify-center overflow-hidden">
                         {item.thumbnail ? (
                           <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                         ) : (
                           <LayoutDashboard size={40} className="text-slate-700 group-hover:text-emerald-500/20 transition-colors" />
                         )}
                         <div className="absolute top-4 right-4 px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] uppercase font-bold rounded">{item.status}</div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        
                        {/* SMART FORMATTING FOR DEPARTMENT & INDUSTRY */}
                        <span className="text-xs text-emerald-400 font-bold mb-1">
                          {item.department || item.industry 
                            ? [item.department, item.industry].filter(Boolean).join(' • ') 
                            : '•'}
                        </span>
                        
                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">{item.name}</h4>
                        {item.purpose && <p className="text-sm text-slate-400 mb-4">{item.purpose}</p>}
                        
                        <div className="grid grid-cols-2 gap-4 mb-4 text-xs mt-auto">
                          <div><span className="text-slate-500 block">Software:</span><span className="text-slate-300">{item.software}</span></div>
                          <div><span className="text-slate-500 block">KPIs Tracked:</span><span className="text-slate-300">{item.kpis.join(", ")}</span></div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
                          <span className="text-xs text-lime-400 font-semibold">Impact: {item.impact}</span>
                          <button className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1">View Details <ArrowRight size={14} /></button>
                        </div>
                      </div>
                    </div>
                  )) : <EmptyState />}
                </motion.div>
              )}

              {/* ================= REPORTS (EXCEL/APP ICON GRID VIEW) ================= */}
              {activeTab === 'reports' && (
                <motion.div key="reports" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full relative">
                  <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-5xl mx-auto">
                    {showcase.reports?.length > 0 ? showcase.reports.map((item, idx) => (
                      <motion.div 
                        key={item.id || idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPreviewReport(item)}
                        className="w-24 sm:w-28 md:w-32 flex flex-col items-center gap-3 cursor-pointer group"
                      >
                        {/* THE EXCEL FOLDER ICON */}
                        <div className="w-full aspect-square bg-slate-900 border border-slate-700 rounded-3xl flex flex-col items-center justify-center group-hover:border-[#39ff14]/50 group-hover:bg-[#39ff14]/5 transition-all shadow-[0_0_15px_rgba(0,0,0,0.3)] group-hover:shadow-[0_0_20px_rgba(57,255,20,0.2)] relative overflow-hidden">
                          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-40 group-hover:via-[#39ff14]" />
                          <FileSpreadsheet size={38} className="text-emerald-500 group-hover:text-[#39ff14] transition-colors mb-1" />
                          <span className="absolute top-2 right-2 text-[8px] font-black text-slate-500 uppercase tracking-widest group-hover:text-[#39ff14] transition-colors">XLSX</span>
                        </div>
                        {/* REPORT TITLE */}
                        <span className="text-xs md:text-sm font-semibold text-slate-300 text-center leading-tight group-hover:text-emerald-300 transition-colors line-clamp-3 px-1 w-full break-words">
                          {item.title || item.report_title}
                        </span>
                      </motion.div>
                    )) : <EmptyState />}
                  </div>
                </motion.div>
              )}

              {activeTab === 'automations' && (
                <motion.div key="automations" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full relative">
                  <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-5xl mx-auto">
                    {showcase.automations?.length > 0 ? showcase.automations.map((item, idx) => (
                      <motion.div 
                        key={item.id || idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFullAutomation(item)}
                        className="w-32 sm:w-36 md:w-40 flex flex-col items-center gap-3 cursor-pointer group"
                      >
                        <div className="w-full aspect-square bg-slate-900 border border-slate-700 rounded-3xl flex flex-col items-center justify-center group-hover:border-[#39ff14]/50 group-hover:bg-[#39ff14]/5 transition-all shadow-[0_0_15px_rgba(0,0,0,0.3)] group-hover:shadow-[0_0_20px_rgba(57,255,20,0.2)] relative overflow-hidden p-2">
                          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-40 group-hover:via-[#39ff14]" />
                          
                          {/* DYNAMIC THUMBNAIL / GIF */}
                          {item.thumbnail ? (
                            <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover rounded-2xl" />
                          ) : (
                            <Cpu size={40} className="text-emerald-500 group-hover:text-[#39ff14] transition-colors" />
                          )}
                        </div>
                        <span className="text-xs md:text-sm font-semibold text-slate-300 text-center leading-tight group-hover:text-emerald-300 transition-colors line-clamp-3 px-1 w-full break-words">
                          {item.name}
                        </span>
                      </motion.div>
                    )) : <EmptyState />}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ================= SOFTWARE ECOSYSTEM (3-COLUMN PC GRID) ================= */}
      <section className="py-20 px-6 relative z-10 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Software Ecosystem</h3>
            <div className="w-12 h-1 bg-emerald-500 rounded-full mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {ecosystem.map((cat, idx) => (
              <div key={idx} className="relative flex flex-col items-center">
                <h4 className="text-[11px] text-emerald-400 font-bold uppercase tracking-widest mb-6 text-center border-b border-slate-800/60 pb-3 w-full max-w-[200px]">
                  {cat.category}
                </h4>
                <div className="flex flex-wrap justify-center gap-4">
                  {cat.tools.map((tool, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="flex flex-col items-center gap-3 w-20 sm:w-24 group"
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center border border-slate-800 bg-slate-900/50 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2 overflow-hidden hover:border-emerald-500/40 relative">
                        <img 
                          src={tool.customImage} 
                          alt={tool.name} 
                          className="w-8 h-8 sm:w-10 sm:h-10 object-contain opacity-70 group-hover:opacity-100 transition-opacity absolute inset-0 m-auto z-10" 
                          onError={(e) => { 
                              e.target.style.display = 'none'; 
                              e.target.nextSibling.style.display = 'block'; 
                          }}
                        />
                        <Settings size={20} className="text-slate-600 hidden absolute inset-0 m-auto z-0" />
                      </div>
                      <span className="text-[10px] text-center font-semibold text-slate-400 group-hover:text-emerald-300 transition-colors leading-tight">
                        {tool.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FUTURE ANALYTICS ROADMAP (WRITTEN FORMAT) ================= */}
      <section className="py-20 px-6 relative z-10 border-t border-slate-800/50 bg-slate-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-10">
            <h3 className="text-2xl font-black text-white mb-4 flex items-center justify-center gap-3">
              <ArrowRight className="text-lime-500" /> Future Analytics Roadmap
            </h3>
            <div className="w-12 h-[1px] bg-zinc-800 mx-auto mt-2" />
          </div>
          
          <div className="space-y-6 text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto font-medium text-left md:text-center">
            <p>
              My continuous learning journey is focused on evolving from operational reporting to advanced analytics and robust data engineering. Currently, I am deepening my foundational knowledge in <span className="text-emerald-400 font-bold">SQL</span> (including CTEs and Window Functions) and <span className="text-emerald-400 font-bold">Python</span> (utilizing libraries like Pandas and NumPy) for complex data manipulation. To elevate my business intelligence capabilities, I am actively exploring <span className="text-emerald-400 font-bold">Power BI</span> and <span className="text-emerald-400 font-bold">Tableau</span> to build dynamic, executive-ready dashboards.
            </p>
            <p>
              Looking further ahead, my roadmap bridges the gap between analytics and engineering. I aim to master modern data pipelines by learning <span className="text-emerald-400 font-bold">ETL/ELT workflows</span>, <span className="text-emerald-400 font-bold">REST APIs</span>, and tools like <span className="text-emerald-400 font-bold">dbt</span> and <span className="text-emerald-400 font-bold">Apache Airflow</span>, eventually scaling these solutions on cloud platforms like <span className="text-emerald-400 font-bold">Azure</span> or <span className="text-emerald-400 font-bold">AWS</span>. 
            </p>
            <p>
              Ultimately, I plan to integrate <span className="text-emerald-400 font-bold">Applied Statistics</span> and <span className="text-emerald-400 font-bold">AI-Assisted Analytics</span>—such as LLM fundamentals and Retrieval-Augmented Generation (RAG)—into my workflow. This will empower me to not just report on past performance, but to forecast future trends and engineer highly scalable, intelligent data solutions.
            </p>
          </div>
        </div>
      </section>

      {/* ================= ANALYTICS PHILOSOPHY ================= */}
      <section className="py-24 px-6 relative z-10 border-t border-slate-800/50 text-center">
        <div className="max-w-4xl mx-auto">
           <Quote size={40} className="text-emerald-500/30 mx-auto mb-6" />
           <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Data Should Drive <span className="text-emerald-400">Better Decisions.</span></h2>
           <div className="text-base md:text-lg text-slate-400 leading-relaxed space-y-4">
             <p>Every number represents an opportunity to improve a business.</p>
             <p>My goal as a Data Analyst is not simply to produce reports, but to transform information into meaningful insights that support better planning, smarter operations, and measurable business improvements.</p>
             <p>I believe effective analytics requires more than technical skills—it requires curiosity, critical thinking, communication, and a deep understanding of business objectives.</p>
             <p>By combining analytical methods with creative presentation and modern technology, I strive to make complex information accessible, actionable, and valuable for decision-makers.</p>
           </div>
        </div>
      </section>

      {/* ================= PAGE RESUME DOWNLOAD ================= */}
      <section className="w-full px-6 pt-10 pb-6 z-10 relative flex justify-center border-t border-slate-800/50 bg-slate-900/20">
        <motion.a
          href={pageResume?.file_url || pageResume?.pdf_url || "/resume/Data_Analyst_Resume.pdf"}
          download="Jefferson_Gonzales_Data_Analyst_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-4 px-8 py-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-slate-900 border border-emerald-500/30 hover:border-emerald-500 transition-all group backdrop-blur-md cursor-pointer relative z-20 shadow-[0_0_20px_rgba(16,185,129,0.1)] hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]"
        >
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
            <Download size={20} />
          </div>
          <div className="text-left">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-semibold mb-0.5">Download Professional Resume</span>
            <span className="text-sm md:text-base font-bold text-white group-hover:text-emerald-400 transition-colors block">
              {pageResume?.title || 'Data Analyst Resume'}
            </span>
          </div>
        </motion.a>
      </section>

      {/* ================= TRANSITION TO THE NEXT JOURNEY ================= */}
      <section className="w-full relative border-t border-slate-800 mt-16 pt-32 pb-24 px-6 overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-indigo-950/80 to-purple-950/90 -z-10" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-cyan-500/10 blur-[120px] -z-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-20">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-6">
              <Code2 size={14} /> The Next Chapter
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6">
              Convergence of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Data & Code.</span>
            </h2>
            <p className="text-base md:text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Every stage of my career builds upon the previous one. The transition from a creative professional to a data-driven analyst reflects my evolution from crafting visual stories to uncovering the insights that drive them.
              <br/><br/>
              The next chapter introduces my journey into AI-Assisted Full-Stack Development, where creativity, analytics, automation, and software engineering converge into one unified vision.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button onClick={() => window.location.href = '/ai-developer'}
                className="px-8 py-4 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] flex items-center gap-2 cursor-pointer relative z-20">
                Continue as AI Developer <ArrowRight size={16} />
              </button>
              
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-8 py-4 rounded-xl bg-slate-800/50 border border-slate-600 hover:bg-slate-700 text-white font-bold text-sm transition-colors flex items-center gap-2 backdrop-blur-md cursor-pointer relative z-20">
                <ArrowUp size={16} /> Back to Top 
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= 1. KATAMTAMANG PREVIEW MODAL ================= */}
      <AnimatePresence>
        {previewReport && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020617]/90 backdrop-blur-sm p-4 md:p-6"
            onClick={() => setPreviewReport(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-[0_0_50px_rgba(16,185,129,0.15)] hide-scrollbar flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* CLOSE BUTTON */}
              <button 
                onClick={() => setPreviewReport(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-rose-500 transition-colors z-10"
              >
                <X size={18} />
              </button>

              <div className="pr-10 sm:pr-12 mb-8 border-b border-slate-800 pb-6 flex flex-row justify-between items-start gap-4 mt-2">
                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight break-words">{previewReport.title || previewReport.report_title}</h3>
                
                {/* FREQUENCY SA TOP RIGHT (FIXED FOR MOBILE & PC) */}
                {previewReport.frequency && (
                  <div className="shrink-0 flex flex-col items-end">
                    {/* Tinanggal na natin yung span na may word na "Frequency" dito */}
                    <span className="inline-block px-3 py-1 bg-[#39ff14]/10 border border-[#39ff14]/30 text-[#39ff14] text-[10px] font-black uppercase tracking-wider rounded shadow-[0_0_15px_rgba(57,255,20,0.2)] whitespace-nowrap mt-1.5">
                      {previewReport.frequency}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-8 mb-10 flex-grow">
                {/* Objective - Label Neon */}
                <div>
                  <span className="text-[10px] text-[#39ff14] uppercase tracking-widest font-black block mb-2 drop-shadow-[0_0_8px_rgba(57,255,20,0.6)]">Objective</span>
                  <p className="text-slate-200 font-medium leading-relaxed text-sm md:text-base">
                    {previewReport.objective || 'No objective provided.'}
                  </p>
                </div>

                {/* Impact */}
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-2">Business Impact</span>
                  <div className="p-4 md:p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                    <p className="text-emerald-100 text-sm leading-relaxed">
                      {previewReport.impact || previewReport.findings || previewReport.finding || 'Improved operational workflows and enhanced reporting accuracy.'}
                    </p>
                  </div>
                </div>

                {/* Tools with Real Logo Support & Neon Fallback */}
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-3">Tools & Systems Used</span>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {(() => {
                      // Hahatiin natin ang mga tool names at ang mga icon URLs
                      const toolsArray = (previewReport.tools || previewReport.software || 'Microsoft Excel').split(',');
                      const iconsArray = previewReport.tools_icons ? previewReport.tools_icons.split(',') : [];

                      return toolsArray.map((tool, idx) => {
                        const cleanToolName = tool.trim();
                        // Kung may inilagay kang link sa CMS, yun ang gagamitin. Kung wala, gagamitin ang auto-detect.
                        const iconUrl = (iconsArray[idx] && iconsArray[idx].trim()) ? iconsArray[idx].trim() : getToolIcon(cleanToolName);
                        
                        return (
                          <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg shadow-sm">
                            {iconUrl ? (
                              <img 
                                src={iconUrl} 
                                alt={cleanToolName} 
                                className="w-4 h-4 object-contain"
                                onError={(e) => { 
                                  e.target.style.display = 'none'; 
                                  e.target.nextSibling.style.display = 'block'; 
                                }} 
                              />
                            ) : null}
                            <Settings size={14} className={`text-[#39ff14] ${iconUrl ? 'hidden' : 'block'}`} />
                            <span className="text-xs font-semibold text-slate-300">{cleanToolName}</span>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              </div>

              {/* ACTION BUTTON TO OPEN FULL VIEW */}
              <button 
                onClick={() => {
                  setFullReport(previewReport);
                  setPreviewReport(null);
                }}
                className="w-full mt-auto py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] active:scale-95"
              >
                <Maximize2 size={16} /> View Full Report Details
              </button>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= 2. WHOLE VIEW / FULL REPORT MODAL ================= */}
      <AnimatePresence>
        {fullReport && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-[#020617]/95 backdrop-blur-md p-4 md:p-6"
            onClick={() => setFullReport(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 md:p-10 w-full max-w-5xl h-[90vh] overflow-y-auto relative shadow-[0_0_80px_rgba(16,185,129,0.15)] hide-scrollbar flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* CLOSE BUTTON */}
              <button 
                onClick={() => setFullReport(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-rose-500 transition-colors z-10 sticky-close"
              >
                <X size={20} />
              </button>

              <div className="mb-8 border-b border-slate-800 pb-6 pr-12 flex items-start gap-4">
                <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center shrink-0 text-emerald-400">
                  <FileSpreadsheet size={28} />
                </div>
                <div>
                  <span className="text-[10px] text-emerald-500 uppercase tracking-widest font-black block mb-1">Full Report Overview</span>
                  <h3 className="text-2xl md:text-4xl font-black text-white leading-tight">{fullReport.title || fullReport.report_title}</h3>
                </div>
              </div>

              {/* FULL CMS DATA GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 flex-grow mt-6">
                
                {/* LEFT COLUMN */}
                <div className="flex flex-col gap-6">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-2">Context & Background</span>
                    <p className="text-slate-200 text-sm leading-relaxed">{fullReport.context || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#39ff14] uppercase tracking-widest font-black block mb-2 drop-shadow-[0_0_5px_rgba(57,255,20,0.5)]">Objective</span>
                    <div className="p-4 sm:p-5 rounded-xl bg-[#39ff14]/5 border border-[#39ff14]/20">
                      <p className="text-slate-200 text-sm leading-relaxed">{fullReport.objective || 'N/A'}</p>
                    </div>
                  </div>
                  
                  {/* METRICS GRID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                    <div className="p-5 bg-slate-800/40 rounded-xl border border-slate-700/50 flex flex-col justify-center items-center text-center">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-2">Audience</span>
                      <p className="text-[#39ff14] font-bold text-sm leading-relaxed">{fullReport.audience || 'N/A'}</p>
                    </div>
                    <div className="p-5 bg-slate-800/40 rounded-xl border border-slate-700/50 text-center flex flex-col justify-center">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-2">Format</span>
                      <p className="text-[#39ff14] font-bold text-sm leading-relaxed">{fullReport.format || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="flex flex-col gap-6">
                  <div className="space-y-4">
                     <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2">Business Impact & Findings</h5>
                     <div className="p-4 sm:p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10">
                        <span className="text-emerald-400 font-bold block mb-2 uppercase text-[10px]">Findings:</span>
                        <span className="text-emerald-100 text-sm leading-relaxed">{fullReport.findings || 'N/A'}</span>
                     </div>
                     <div className="p-4 sm:p-5 rounded-xl border border-rose-500/20 bg-rose-500/5">
                        <span className="text-rose-400 font-bold block mb-2 uppercase text-[10px]">Impact:</span>
                        <span className="text-slate-300 text-sm leading-relaxed">{fullReport.impact || 'N/A'}</span>
                     </div>
                  </div>

                  {/* TECH USED */}
                  <div className="pt-4 border-t border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-3">Tech & Tools Used</span>
                    <div className="flex flex-wrap gap-2">
                      {(() => {
                        const toolsArray = (fullReport.tools || fullReport.software || '').split(',').filter(Boolean);
                        const iconsArray = fullReport.tools_icons ? fullReport.tools_icons.split(',') : [];
                        return toolsArray.map((tool, idx) => {
                          const cleanToolName = tool.trim();
                          const iconUrl = (iconsArray[idx] && iconsArray[idx].trim()) ? iconsArray[idx].trim() : getToolIcon(cleanToolName);
                          return (
                            <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg shadow-sm">
                              {iconUrl && <img src={iconUrl} alt={cleanToolName} className="w-4 h-4 object-contain" onError={(e) => e.target.style.display = 'none'} />}
                              {!iconUrl && <Settings size={14} className="text-cyan-400" />}
                              <span className="text-xs font-semibold text-slate-300">{cleanToolName}</span>
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </div>

                  {/* RECOMMENDATIONS */}
                  {fullReport.recommendations && (
                    <div className="pt-4 border-t border-slate-800">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-2">Recommendations</span>
                      <p className="text-slate-300 text-sm leading-relaxed italic border-l-2 border-emerald-500 pl-3">
                        {fullReport.recommendations}
                      </p>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= 4. AUTOMATION FULL VIEW MODAL ================= */}
      <AnimatePresence>
        {fullAutomation && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-[#020617]/95 backdrop-blur-md p-4 md:p-6"
            onClick={() => setFullAutomation(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 md:p-10 w-full max-w-5xl h-[90vh] overflow-y-auto relative shadow-[0_0_80px_rgba(16,185,129,0.15)] hide-scrollbar flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setFullAutomation(null)} className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-rose-500 transition-colors z-10 sticky-close">
                <X size={20} />
              </button>

              <div className="mb-8 border-b border-slate-800 pb-6 pr-12 flex items-start gap-4">
                <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center shrink-0 text-emerald-400">
                  <Cpu size={28} />
                </div>
                <div>
                  <span className="text-[10px] text-emerald-500 uppercase tracking-widest font-black block mb-1">Deep Architecture View</span>
                  <h3 className="text-2xl md:text-4xl font-black text-white leading-tight">{fullAutomation.name}</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 flex-grow">
                {/* LEFT COLUMN */}
                <div className="space-y-8">
                  <div>
                    <span className="text-xs text-slate-500 uppercase tracking-widest font-bold block mb-2">Core Problem</span>
                    <p className="text-slate-200 text-sm leading-relaxed">{fullAutomation.problem || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-xs text-[#39ff14] uppercase tracking-widest font-black block mb-2 drop-shadow-[0_0_5px_rgba(57,255,20,0.5)]">Objectives</span>
                    <div className="p-4 rounded-xl bg-[#39ff14]/5 border border-[#39ff14]/20">
                      <p className="text-slate-200 text-sm leading-relaxed">{fullAutomation.objectives || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 flex flex-col justify-center items-center text-center">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-4">Time Saved</span>
                      
                      <div className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-[#050f08] border-2 border-slate-800 rounded-xl shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
                        <Clock size={20} className="text-[#39ff14] animate-pulse" />
                        
                        <span 
                          className="text-4xl text-[#39ff14] drop-shadow-[0_0_8px_rgba(57,255,20,0.8)] mt-1"
                          style={{ fontFamily: "'DSEG7 Classic', monospace" }}
                        >
                          {fullAutomation.timeSaved ? fullAutomation.timeSaved.replace(/[A-Za-z]/g, '').trim() : "0"}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 text-center flex flex-col justify-center">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-1">Productivity Boost</span>
                      <p className="text-emerald-300 font-bold text-sm">{fullAutomation.productivity || 'N/A'}</p>
                    </div>
                  </div>
                  {/* GitHub View Only Link */}
                  {fullAutomation.githubLink && (
                    <div className="pt-4">
                      <span className="text-xs text-slate-500 uppercase tracking-widest font-bold block mb-2">Repository</span>
                      <a href={fullAutomation.githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-5 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-200 text-sm font-bold transition-all hover:-translate-y-0.5">
                        <Code2 size={20} />
                        View Source Code (Protected)
                        <ArrowRight size={14} className="ml-1 opacity-50" />
                      </a>
                      <p className="text-[10px] text-slate-500 mt-2 font-mono">Note: Repository security measures are active to prevent direct downloads.</p>
                    </div>
                  )}
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-8">
                  <div className="space-y-4">
                     <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">Workflow Transformation</h5>
                     <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5">
                        <span className="text-rose-400 font-bold block mb-2 uppercase text-[10px]">Before (Manual):</span>
                        <span className="text-slate-300 text-sm leading-relaxed">{fullAutomation.currentProcess}</span>
                     </div>
                     <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10">
                        <span className="text-emerald-400 font-bold block mb-2 uppercase text-[10px]">After (Automated):</span>
                        <span className="text-emerald-100 text-sm leading-relaxed">{fullAutomation.steps}</span>
                     </div>
                  </div>

                  {/* IBALIK NATIN ANG TECH USED AT AI USED DITO */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-3">Tech Used</span>
                      <div className="flex flex-wrap gap-2 md:gap-3">
                        {(() => {
                          const toolsArray = (fullAutomation.tech || '').split(',').filter(Boolean);
                          const iconsArray = fullAutomation.tech_icons ? fullAutomation.tech_icons.split(',') : [];
                          return toolsArray.map((tool, idx) => {
                            const cleanToolName = tool.trim();
                            const iconUrl = (iconsArray[idx] && iconsArray[idx].trim()) ? iconsArray[idx].trim() : getToolIcon(cleanToolName);
                            return (
                              <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg shadow-sm">
                                {iconUrl && <img src={iconUrl} alt={cleanToolName} className="w-4 h-4 object-contain" onError={(e) => e.target.style.display = 'none'} />}
                                {!iconUrl && <Settings size={14} className="text-cyan-400" />}
                                <span className="text-xs font-semibold text-slate-300">{cleanToolName}</span>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-3">AI Used</span>
                      <div className="flex flex-wrap gap-2 md:gap-3">
                        {(() => {
                          const aiArray = (fullAutomation.ai || '').split(',').filter(Boolean);
                          const iconsArray = fullAutomation.ai_icons ? fullAutomation.ai_icons.split(',') : [];
                          return aiArray.map((aiTool, idx) => {
                            const cleanAIName = aiTool.trim();
                            const iconUrl = (iconsArray[idx] && iconsArray[idx].trim()) ? iconsArray[idx].trim() : getToolIcon(cleanAIName);
                            return (
                              <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg shadow-sm">
                                {iconUrl && <img src={iconUrl} alt={cleanAIName} className="w-4 h-4 object-contain" onError={(e) => e.target.style.display = 'none'} />}
                                {!iconUrl && <BrainCircuit size={14} className="text-purple-400" />}
                                <span className="text-xs font-semibold text-slate-300">{cleanAIName}</span>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= 4. AUTOMATION FULL VIEW MODAL ================= */}
      <AnimatePresence>
         {/* ... (madaming code dito sa loob ng modal) ... */}
      </AnimatePresence>

      {/* IDAGDAG MO ITO DITO PARA SA DIGITAL FONT */}
      <style>{`
        @font-face {
          font-family: 'DigitalClock';
          src: url('https://cdn.jsdelivr.net/npm/dseg@0.46.0/fonts/dseg7/dseg7-classic/DSEG7Classic-Bold.woff2') format('woff2');
        }
      `}</style>

    </div>
  );
}