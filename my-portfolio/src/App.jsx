import { useState, useEffect, useRef } from "react";
import {
  Download, ArrowRight, Mail, Phone, Linkedin,
  X, ZoomIn, Pin, ChevronLeft, ChevronRight,
  FileText, Image as ImageIcon, Info
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   ██████████████████████████████████████████████████████████████
   █                                                            █
   █   OWNER CONFIGURATION — Edit everything in this block     █
   █                                                            █
   ██████████████████████████████████████████████████████████████
   ═══════════════════════════════════════════════════════════════════

   EACH PROJECT SUPPORTS THREE MEDIA FIELDS:
   ─────────────────────────────────────────────────────────────────

   1. images  ─ Array of image objects. The first one becomes the
                card thumbnail automatically.

        images: [
          { url: "/images/cad-model.png",  caption: "Siemens NX model" },
          { url: "/images/prototype.jpg",  caption: "PETG prototype"   },
        ],

   2. docs  ─ Array of downloadable file objects (PDF, code, etc.).
              label controls the badge shown on the file row.
              Supported labels: "PDF" | "PY" | "JS" | "TS" | "CPP" | "TXT" | "MD"

        docs: [
          { url: "/docs/report.pdf",  name: "Final Report.pdf",  label: "PDF" },
          { url: "/src/analysis.py",  name: "analysis.py",       label: "PY"  },
        ],

   3. codeSnippet  ─ A string of source code rendered in a styled
                     dark block with monospace syntax colours.
                     Set to null if unused.

        codeSnippet: `def read_adc(channel):\n    # HX711 read loop\n    return value`,

   ─────────────────────────────────────────────────────────────────
   HOW TO PIN A PROJECT:
     Set  pinned: true  — pinned projects appear at the top of the
     grid, still ordered chronologically among themselves.

   HOW TO SET CHRONOLOGICAL ORDER:
     Set  sortDate: new Date("YYYY-MM-DD")  — newest floats first.
   ═══════════════════════════════════════════════════════════════════ */

const CV_URL = "/Docs/CV.pdf"; // ← Replace this with your actual file path (e.g., "/CV.pdf")

const PROJECTS_RAW = [
  /* ─── PROJECT 1 ────────────────────────────────────────────────── */
  {
    id: 1,
    slug: "PROJ-001",
    pinned: true,                          // ← pin toggle
    sortDate: new Date("2026-04-01"),      // ← for chronological sort
    title: "Desktop Wind Tunnel",
    type: "Personal Project",
    period: "Apr 2026 – Ongoing",
    status: "active",
    accentKey: "blue",
    stack: ["EasyEDA", "PCB Design (Dual-layer)", "Siemens NX", "Python", "HX711 ADC", "Strain Gauge"],
    metrics: [
      { label: "Contraction Ratio", value: "4:1"    },
      { label: "ADC Resolution",    value: "24-bit" },
      { label: "PCB Layers",        value: "2"      },
    ],
    highlights: [
      "Custom aerodynamic balance using a strain-gauge load cell & 24-bit HX711 ADC to quantify drag forces on 1/64 scale model cars.",
      "Dual-layer PCB designed in EasyEDA to automate data acquisition and regulate fan speed.",
      "Overcame 180mm³ build volume constraint via a multi-part interlocking assembly with tongue-and-groove joints.",
      "Bell-mouth inlet with integrated flow straightener achieving a uniform velocity profile at a 4:1 area contraction ratio.",
    ],
    // ── ADD YOUR MEDIA BELOW ─────────────────────────────────────
    images: [
       { url: "/images/PCB.png",  caption: "Final PCB Design" },
       { url: "/images/Flow straightener.png",  caption: "Flow straightener CAD"   },
       { url: "/images/Initial Tunnel.jpg", caption: "Tunnel cad"          },
    ],
    docs: [
      // { url: "/docs/wind-tunnel-report.pdf", name: "Project Report.pdf", label: "PDF" },
      // { url: "/src/data_acquisition.py",     name: "data_acquisition.py", label: "PY" },
    ],
    codeSnippet: null,
    // codeSnippet: `# Example: HX711 read loop\ndef read_force(hx):\n    return hx.get_weight(5)`,
  },

  /* ─── PROJECT 2 ────────────────────────────────────────────────── */
  {
    id: 2,
    slug: "PROJ-002",
    pinned: true,                          // ← pin toggle
    sortDate: new Date("2025-10-01"),      // ← for chronological sort
    title: "IBP — Venturi Flow Meter",
    type: "Rolls-Royce × Loughborough",
    period: "Oct 2025 – Mar 2026",
    status: "complete",
    accentKey: "teal",
    stack: ["Siemens NX", "FDM 3D Printing (PETG + ABS)", "MATLAB", "Uncertainty Analysis", "Technical Reporting"],
    metrics: [
      { label: "Industry Partner", value: "Rolls-Royce" },
      { label: "Prototypes Built", value: "PETG + Al"   },
      { label: "Deliverable",      value: "Tol. Spec"   },
    ],
    highlights: [
      "Full CAD model of the Venturi assembly in Siemens NX, ensuring geometric accuracy across all components.",
      "Investigated flow rate uncertainty; recommended a throat diameter tolerance to minimise measurement error.",
      "FDM 3D-printed PETG and ABS prototypes to validate geometry and support iterative physical testing.",
      "Liaised directly with Rolls-Royce Submarines engineers and authored a formal technical report.",
    ],
    // ── ADD YOUR MEDIA BELOW ─────────────────────────────────────
    images: [
       { url: "/images/Venturi.png",   caption: "Aluminium venturi"  },
       { url: "/images/Venturi_Rig.png", caption: "Aluminium venturi on test rig" },
       { url: "/images/Venturi_3dprint.png",  caption: "3D Printed Venturi"  },
    ],
    docs: [
      // { url: "/docs/venturi-report.pdf", name: "IBP Final Report.pdf", label: "PDF" },
      // { url: "/src/uncertainty.m",       name: "uncertainty.m",        label: "MAT" },
    ],
    codeSnippet: null,
    // codeSnippet: `% MATLAB: throat uncertainty\ndP = sqrt((dA/A).^2 + (dV/V).^2);`,
  },

  /* ─── PROJECT 3 ────────────────────────────────────────────────── */
  {
    id: 3,
    slug: "PROJ-003",
    pinned: false,                         // ← pin toggle
    sortDate: new Date("2025-04-01"),      // ← for chronological sort
    title: "Smart Campus Bridge",
    type: "Loughborough University",
    period: "April 2025",
    status: "complete",
    accentKey: "violet",
    stack: ["Truss Analysis", "CAD Modelling", "Structural Optimisation", "Cost Analysis"],
    metrics: [
      { label: "Bridge Mass",    value: "798.7 g" },
      { label: "Load Withstood", value: "130 kg"  },
      { label: "Cohort Ranking", value: "1st"     },
    ],
    highlights: [
      "Produced the lightest bridge in the cohort at 798.7 g, exceeding structural requirements by withstanding 130 kg.",
      "Applied truss analysis to optimise the design for strength, weight, and cost — achieving the best structural efficiency score.",
      "Developed detailed CAD models to define geometry, inform material selection, and guide fabrication.",
      "Balanced competing design constraints through a cost analysis alongside structural performance metrics.",
    ],
    // ── ADD YOUR MEDIA BELOW ─────────────────────────────────────
    images: [
      { url: "/images/Bridge.jpg", caption: "Final bridge"    },
      { url: "/images/Assembly_1.png",  caption: "Bridge CAD model"     },
      // { url: "/images/bridge-fbd.png",  caption: "Free body diagram"   },
    ],
    docs: [
      // { url: "/docs/bridge-report.pdf", name: "Bridge Design Report.pdf", label: "PDF" },
    ],
    codeSnippet: null,
  },

  /* ─── PROJECT 4 ────────────────────────────────────────────────── */
  {
    id: 4,
    slug: "PROJ-004",
    pinned: false,                         // ← pin toggle
    sortDate: new Date("2026-02-01"),      // ← for chronological sort
    title: "CADMAT Competition",
    type: "Loughborough University",
    period: "Feb 2026 – Ongoing",
    status: "active",
    accentKey: "amber",
    stack: ["Siemens NX (FEA)", "NX CAM", "CNC Manufacturing", "GD&T", "Technical Reporting"],
    metrics: [
      { label: "Target Load", value: "30 kg"   },
      { label: "Material",    value: "Acrylic" },
      { label: "Manufacture", value: "CNC"     },
    ],
    highlights: [
      "Designed and FEA-validated a load-bearing acrylic bracket, optimising for maximum load capacity (30 kg) while minimising mass.",
      "Utilised Siemens NX for 3D solid modelling and FEA to identify stress concentrations before manufacture.",
      "Generated CNC toolpaths via NX CAM; performed physical tests and iterative modifications across competition rounds.",
      "Performed independent hand calculations to verify FEA results.",
    ],
    // ── ADD YOUR MEDIA BELOW ─────────────────────────────────────
    images: [
       { url: "/images/Buckling_FEA.png",     caption: "Von Mises stress plot"      },
       { url: "/images/Deflection_FEA_2.png", caption: "Machined acrylic bracket"   },
      // { url: "/images/cadmat-cam.png",     caption: "NX CAM toolpath simulation" },
    ],
    docs: [
       { url: "/Docs/Combined_OptimalNodes.m", name: "CADMAT_optimisation.mat",   label: "MAT" },
      // { url: "/docs/cadmat-slides.pdf", name: "Presentation Slides", label: "PDF" },
    ],
    codeSnippet: null,
  },
];

/* ═══════════════════════════════════════════════════════════════════
   END OF OWNER CONFIGURATION
   ═══════════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────────────
   Sorting logic: pinned first, then unpinned — each group newest→oldest
───────────────────────────────────────────────────────────────── */
function sortProjects(projects) {
  const pinned   = projects.filter(p => p.pinned)  .sort((a, b) => b.sortDate - a.sortDate);
  const unpinned = projects.filter(p => !p.pinned) .sort((a, b) => b.sortDate - a.sortDate);
  return [...pinned, ...unpinned];
}

const PROJECTS = sortProjects(PROJECTS_RAW);

/* ─────────────────────────────────────────────────────────────────
   ACCENT COLOURS
───────────────────────────────────────────────────────────────── */
const ACCENTS = {
  blue:   { hex: "#3B82F6", ring: "rgba(59,130,246,0.2)",  dim: "rgba(59,130,246,0.08)"  },
  teal:   { hex: "#2DD4BF", ring: "rgba(45,212,191,0.2)",  dim: "rgba(45,212,191,0.08)"  },
  violet: { hex: "#A78BFA", ring: "rgba(167,139,250,0.2)", dim: "rgba(167,139,250,0.08)" },
  amber:  { hex: "#FBBF24", ring: "rgba(251,191,36,0.2)",  dim: "rgba(251,191,36,0.08)"  },
};

/* ═══════════════════════════════════════════════════════════════════
   ██████████████████████████████████████████████████████████████
   █                                                            █
   █   SKILLS DATA  (mirrors src/data/skillsData.js)           █
   █                                                            █
   ██████████████████████████████████████████████████████████████
   ═══════════════════════════════════════════════════════════════════

   skillsCategories
   ─────────────────────────────────────────────────────────────────
   Each object needs:
     • id        — unique string key (used as React key)
     • category  — heading text shown on the card
     • accentKey — one of: "blue" | "teal" | "violet" | "amber"
     • skills    — array of tag strings; add as many as you like

   To add a whole new category, paste a new object into the array.
   The grid automatically reflows (currently 3-col on desktop).

   skillHighlights
   ─────────────────────────────────────────────────────────────────
   Each string renders as its own bullet point at the bottom of the
   section. Wrap any phrase in **double asterisks** to bold it.

   Example:
     "MATLAB — **ranked 8th** in the university exam."
   ═══════════════════════════════════════════════════════════════════ */

const skillsCategories = [
  {
    id: "cad",
    category: "CAD & Manufacturing",
    accentKey: "blue",
    skills: [
      "Siemens NX",
      "NX CAM",
      "GD&T",
      "DFMA",
      "FDM 3D Printing",
    ],
  },
  {
    id: "analysis",
    category: "Analysis & Simulation",
    accentKey: "teal",
    skills: [
      "FEA (Siemens NX)",
      "MATLAB",
      "Hand Calculations",
      "Uncertainty Analysis",
    ],
  },
  {
    id: "prog",
    category: "Programming & Electronics",
    accentKey: "violet",
    skills: [
      "Python",
      "Excel Modelling",
      "EasyEDA",
      "PCB Design",
      "SQLite",
    ],
  },
  // ── ADD NEW CATEGORIES BELOW ──────────────────────────────────
  // {
  //   id: "soft",
  //   category: "Professional Skills",
  //   accentKey: "amber",
  //   skills: ["Technical Writing", "Project Management", "Client Liaison"],
  // },
];

const skillHighlights = [
  "MATLAB — **ranked 8th in university exam**.",
  "LAMDA Grade 8 Public Speaking with Distinction.",
  "Experienced in through-hole soldering and hardware–software interface debugging.",
  // ── ADD NEW BULLET POINTS BELOW ───────────────────────────────
  // "Competed in Formula Student UK as part of the aerodynamics sub-team.",
];

/* ═══════════════════════════════════════════════════════════════════
   END OF SKILLS DATA
   ═══════════════════════════════════════════════════════════════════ */


/* ─────────────────────────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────────────────────────── */
function useScrollReveal(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ─────────────────────────────────────────────────────────────────
   ATOMS
───────────────────────────────────────────────────────────────── */
const MONO = { fontFamily: "'JetBrains Mono', monospace" };

function SectionLabel({ index, text }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span style={{ ...MONO, fontSize: 11 }} className="text-blue-400 tracking-widest uppercase">{String(index).padStart(2,"0")} /</span>
      <span style={{ ...MONO, fontSize: 11 }} className="text-slate-500 tracking-widest uppercase">{text}</span>
    </div>
  );
}

function StatusPip({ status }) {
  const a = status === "active";
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded border ${a ? "bg-emerald-950 text-emerald-400 border-emerald-800" : "bg-slate-800 text-slate-400 border-slate-700"}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${a ? "bg-emerald-400" : "bg-slate-500"}`} />
      {a ? "Active" : "Complete"}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────
   IMAGE PLACEHOLDER
───────────────────────────────────────────────────────────────── */
function ImagePlaceholder({ project }) {
  const accent = ACCENTS[project.accentKey];
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{ background: `radial-gradient(ellipse at 60% 40%, ${accent.ring}, transparent 70%), #0F172A` }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(${accent.hex}14 1px,transparent 1px),linear-gradient(90deg,${accent.hex}14 1px,transparent 1px)`,
        backgroundSize: "28px 28px",
      }} />
      {[["top-3 left-3","border-t border-l"],["top-3 right-3","border-t border-r"],["bottom-3 left-3","border-b border-l"],["bottom-3 right-3","border-b border-r"]].map(([pos,cls],i) => (
        <div key={i} className={`absolute w-4 h-4 ${pos} ${cls}`} style={{ borderColor:`${accent.hex}40` }} />
      ))}
      <div className="relative text-center select-none">
        <div className="w-10 h-10 rounded-full border flex items-center justify-center mx-auto mb-3" style={{ borderColor:`${accent.hex}40`, background:accent.dim }}>
          <div className="w-3 h-3 rounded-full" style={{ background:`${accent.hex}60` }} />
        </div>
        <p style={{ ...MONO, fontSize:10 }} className="text-slate-600 tracking-widest uppercase">{project.slug}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SYNTAX TOKENISER — basic keyword/string/comment highlighting
   Supports Python, MATLAB, JS/TS, C/C++
───────────────────────────────────────────────────────────────── */
function tokeniseLine(line) {
  // Comment lines — whole line grey-green
  if (/^\s*(#|\/\/|%|\/\*)/.test(line))
    return <span style={{ color:"#6A9955" }}>{line}</span>;

  const tokens = [];
  let rest = line;

  const KEYWORDS = /\b(def|return|import|from|class|if|else|elif|for|while|in|not|and|or|True|False|None|function|const|let|var|export|default|void|int|float|double|char|bool|struct|template|namespace|using|include|end|function|for|while|if|else|switch|case|break|continue|try|catch|finally|new|this|self|lambda|yield|async|await|pass|raise|with|as|del|global|local)\b/g;
  const STRINGS  = /(["'`])(?:(?!\1)[^\\]|\\.)*\1/g;
  const NUMBERS  = /\b(\d+\.?\d*)\b/g;
  const FUNCALL  = /\b([a-zA-Z_]\w*)\s*(?=\()/g;

  // Simple regex-walk tokeniser
  const segments = [];
  const allMatches = [];

  const addMatches = (regex, type) => {
    let m;
    const re = new RegExp(regex.source, regex.flags);
    while ((m = re.exec(rest)) !== null)
      allMatches.push({ start:m.index, end:m.index+m[0].length, text:m[0], type });
  };

  addMatches(STRINGS,  "string");
  addMatches(KEYWORDS, "keyword");
  addMatches(NUMBERS,  "number");
  addMatches(FUNCALL,  "funcall");

  // Sort, deduplicate overlapping
  allMatches.sort((a,b) => a.start - b.start);
  let cursor = 0;
  const unique = [];
  for (const m of allMatches) {
    if (m.start >= cursor) { unique.push(m); cursor = m.end; }
  }

  cursor = 0;
  for (const { start, end, text, type } of unique) {
    if (start > cursor) tokens.push(<span key={cursor} style={{ color:"#CBD5E1" }}>{rest.slice(cursor, start)}</span>);
    const color = type==="string"?"#CE9178":type==="keyword"?"#569CD6":type==="number"?"#B5CEA8":"#DCDCAA";
    tokens.push(<span key={start} style={{ color }}>{text}</span>);
    cursor = end;
  }
  if (cursor < rest.length) tokens.push(<span key={cursor} style={{ color:"#CBD5E1" }}>{rest.slice(cursor)}</span>);

  return tokens.length ? tokens : <span style={{ color:"#CBD5E1" }}>{line || "\u00A0"}</span>;
}


const LABEL_COLORS = {
  PDF: { text: "#F87171", border: "rgba(248,113,113,0.3)", bg: "rgba(248,113,113,0.07)" },
  PY:  { text: "#60A5FA", border: "rgba(96,165,250,0.3)",  bg: "rgba(96,165,250,0.07)"  },
  JS:  { text: "#FBBF24", border: "rgba(251,191,36,0.3)",  bg: "rgba(251,191,36,0.07)"  },
  TS:  { text: "#60A5FA", border: "rgba(96,165,250,0.3)",  bg: "rgba(96,165,250,0.07)"  },
  CPP: { text: "#A78BFA", border: "rgba(167,139,250,0.3)", bg: "rgba(167,139,250,0.07)" },
  MAT: { text: "#2DD4BF", border: "rgba(45,212,191,0.3)",  bg: "rgba(45,212,191,0.07)"  },
  MD:  { text: "#94A3B8", border: "rgba(148,163,184,0.3)", bg: "rgba(148,163,184,0.07)" },
  TXT: { text: "#94A3B8", border: "rgba(148,163,184,0.3)", bg: "rgba(148,163,184,0.07)" },
  DOC: { text: "#94A3B8", border: "rgba(148,163,184,0.3)", bg: "rgba(148,163,184,0.07)" },
};

/* ─────────────────────────────────────────────────────────────────
   PROJECT MODAL — dynamic media: images · docs · code snippet
───────────────────────────────────────────────────────────────── */
function ProjectModal({ project, onClose }) {
  const accent      = ACCENTS[project.accentKey];
  const images      = project.images      || [];
  const docs        = project.docs        || [];
  const codeSnippet = project.codeSnippet || null;

  const hasMedia = images.length > 0 || docs.length > 0 || codeSnippet;

  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") { lightbox !== null ? setLightbox(null) : onClose(); }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [lightbox, onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 sm:px-6 md:px-8 pt-16 sm:pt-24 md:pt-32 pb-10"
      style={{ background:"rgba(0,0,0,0.82)", backdropFilter:"blur(10px)" }}
    >
      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div onClick={() => setLightbox(null)} className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex:600, background:"rgba(0,0,0,0.96)", cursor:"zoom-out" }}>
          <img
            src={images[lightbox].url}
            alt={images[lightbox].caption || ""}
            className="max-w-[90vw] max-h-[85vh] rounded-xl object-contain shadow-2xl"
          />
          {images[lightbox].caption && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 border border-white/10 text-slate-300 text-xs px-4 py-2 rounded-full backdrop-blur-sm whitespace-nowrap">
              {images[lightbox].caption}
            </div>
          )}
          <button onClick={() => setLightbox(null)}
            className="fixed top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
            <X size={15} />
          </button>
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + images.length) % images.length); }}
                className="fixed left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % images.length); }}
                className="fixed right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                <ChevronRight size={18} />
              </button>
              <div style={MONO} className="fixed bottom-4 left-1/2 -translate-x-1/2 text-slate-500 text-xs">
                {lightbox + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      )}

      {/* ── Modal card ── */}
      <div
        className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl mb-8"
        style={{ animation:"modalIn 0.22s ease", borderTop:`3px solid ${accent.hex}` }}
      >
        {/* ── Header (unchanged) ── */}
        <div className="relative px-7 pt-7 pb-6 border-b border-slate-800">
          <button onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
            <X size={15} />
          </button>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span style={{ ...MONO, fontSize:11, color:accent.hex }} className="tracking-widest uppercase">{project.slug}</span>
            <StatusPip status={project.status} />
            {project.pinned && (
              <span className="inline-flex items-center gap-1 bg-blue-950 border border-blue-800 text-blue-300 text-xs px-2 py-1 rounded">
                <Pin size={10} /> Pinned
              </span>
            )}
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">{project.title}</h2>
          <p className="text-sm text-slate-400">{project.type} &nbsp;·&nbsp; {project.period}</p>
          <div className="flex flex-wrap gap-3 mt-5">
            {project.metrics.map((m,i) => (
              <div key={i} className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5">
                <div className="text-lg font-bold leading-none" style={{ color:accent.hex }}>{m.value}</div>
                <div style={{ ...MONO, fontSize:10 }} className="text-slate-500 mt-1 tracking-wide uppercase">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Body ── */}
        <div className="px-7 py-6 flex flex-col gap-7">

          {/* Highlights (unchanged) */}
          <div>
            <p style={{ ...MONO, fontSize:10 }} className="text-slate-500 tracking-widest uppercase mb-4">Key Achievements</p>
            <ul className="flex flex-col gap-3">
              {project.highlights.map((h,i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0" style={{ background:accent.hex }} />
                  <span className="text-sm text-slate-300 leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack (unchanged) */}
          <div>
            <p style={{ ...MONO, fontSize:10 }} className="text-slate-500 tracking-widest uppercase mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tag,i) => (
                <span key={i} className="bg-slate-800 border border-slate-700 text-slate-300 text-xs px-2.5 py-1 rounded">{tag}</span>
              ))}
            </div>
          </div>

          {/* ── MEDIA SECTION ────────────────────────────────────────── */}

          {/* 1. IMAGE GALLERY */}
          {images.length > 0 && (
            <div>
              <p style={{ ...MONO, fontSize:10 }} className="text-slate-500 tracking-widest uppercase mb-3">
                Gallery
                <span className="text-slate-700 ml-2">({images.length})</span>
              </p>
              {images.length === 1 ? (
                /* Single image — full width */
                <div
                  onClick={() => setLightbox(0)}
                  className="relative rounded-xl overflow-hidden border border-slate-700 hover:border-slate-500 cursor-zoom-in group transition-colors"
                >
                  <img
                    src={images[0].url}
                    alt={images[0].caption || project.title}
                    className="w-full object-cover rounded-xl"
                    style={{ maxHeight: 380 }}
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                    <ZoomIn size={28} className="text-white drop-shadow" />
                  </div>
                  {images[0].caption && (
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/75 to-transparent px-4 py-3 rounded-b-xl">
                      <p style={{ ...MONO, fontSize:11 }} className="text-slate-300">{images[0].caption}</p>
                    </div>
                  )}
                </div>
              ) : (
                /* Multiple images — responsive grid */
                <div className={`grid gap-3 ${images.length === 2 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3"}`}>
                  {images.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setLightbox(i)}
                      className="relative rounded-lg overflow-hidden border border-slate-700 hover:border-slate-500 aspect-video group cursor-zoom-in transition-colors"
                    >
                      <img
                        src={img.url}
                        alt={img.caption || project.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ZoomIn size={20} className="text-white" />
                      </div>
                      {img.caption && (
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1.5">
                          <p style={{ ...MONO, fontSize:9 }} className="text-slate-300 truncate">{img.caption}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 2. DOCUMENTS / FILES */}
          {docs.length > 0 && (
            <div>
              <p style={{ ...MONO, fontSize:10 }} className="text-slate-500 tracking-widest uppercase mb-3">
                Files
                <span className="text-slate-700 ml-2">({docs.length})</span>
              </p>
              <div className="flex flex-col gap-2">
                {docs.map((doc, i) => {
                  const lc = LABEL_COLORS[doc.label] || LABEL_COLORS.DOC;
                  return (
                    <a
                      key={i}
                      href={doc.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-3 bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-slate-600 rounded-lg px-4 py-3 transition-all no-underline"
                      style={{ textDecoration: "none" }}
                    >
                      {/* Label badge */}
                      <span
                        className="w-10 h-9 rounded-md flex items-center justify-center text-xs font-bold shrink-0 border"
                        style={{ color: lc.text, borderColor: lc.border, background: lc.bg, ...MONO }}
                      >
                        {doc.label || "DOC"}
                      </span>
                      {/* File name */}
                      <span className="text-sm text-slate-300 group-hover:text-white transition-colors flex-1 truncate">
                        {doc.name}
                      </span>
                      {/* Download icon */}
                      <Download size={13} className="text-slate-600 group-hover:text-slate-400 shrink-0 transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. CODE SNIPPET */}
          {codeSnippet && (
            <div>
              <p style={{ ...MONO, fontSize:10 }} className="text-slate-500 tracking-widest uppercase mb-3">Code</p>
              <div className="rounded-xl overflow-hidden border border-slate-700">
                {/* Fake window chrome */}
                <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 border-b border-slate-700">
                  {["#FF5F57","#FEBC2E","#28C840"].map((c, i) => (
                    <span key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                  ))}
                  <span style={{ ...MONO, fontSize:10 }} className="text-slate-600 ml-2">snippet</span>
                </div>
                {/* Code block */}
                <pre
                  className="overflow-x-auto p-5 text-xs leading-relaxed"
                  style={{
                    background: "#020617",
                    margin: 0,
                    ...MONO,
                    tabSize: 2,
                  }}
                >
                  <code>
                    {/* Tokenise by line and highlight basic patterns */}
                    {codeSnippet.split("\n").map((line, li) => (
                      <div key={li} className="flex">
                        {/* Line number */}
                        <span
                          className="select-none mr-5 text-right shrink-0"
                          style={{ color:"#334155", minWidth:"1.6rem" }}
                        >
                          {li + 1}
                        </span>
                        {/* Tokenised line */}
                        <span style={{ color:"#CBD5E1" }}>
                          {tokeniseLine(line)}
                        </span>
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
          )}

          {/* 4. FALLBACK — shown only when all three media fields are empty */}
          {!hasMedia && (
            <div className="border border-dashed border-slate-700 rounded-xl px-6 py-10 flex flex-col items-center gap-3 text-center">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                <Info size={18} className="text-slate-600" />
              </div>
              <p className="text-sm font-medium text-slate-500">No media added yet</p>
              <p style={{ ...MONO, fontSize:10 }} className="text-slate-600 max-w-xs leading-relaxed">
                CAD renders, prototype photos, code snippets, and supporting documents will appear here once added.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PROJECT CARD
───────────────────────────────────────────────────────────────── */
function ProjectCard({ project, onClick, orderLabel }) {
  const accent    = ACCENTS[project.accentKey];
  const images    = project.images || [];
  const docs      = project.docs   || [];
  const thumb     = images[0] || null;
  const imgCount  = images.length;
  const docCount  = docs.length;
  const hasCode   = !!project.codeSnippet;

  return (
    <div
      onClick={onClick}
      className="group bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-xl overflow-hidden cursor-pointer flex flex-col transition-all duration-200 hover:-translate-y-1"
      style={{ boxShadow:"0 2px 8px rgba(0,0,0,0.35)" }}
    >
      {/* ── Image zone ── */}
      <div className="aspect-video relative overflow-hidden bg-slate-900">
        {thumb ? (
          <img src={thumb.url} alt={project.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <ImagePlaceholder project={project} />
        )}

        {/* Hover CTA */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white text-sm font-semibold bg-white/15 border border-white/20 rounded-full px-5 py-2 backdrop-blur-sm">
            View Details →
          </span>
        </div>

        {/* Badges — top row */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {project.pinned && (
            <span className="inline-flex items-center gap-1 bg-slate-950/80 border border-blue-800/60 text-blue-300 backdrop-blur-sm text-xs px-2 py-1 rounded">
              <Pin size={9} /> Pinned
            </span>
          )}
          <span style={{ ...MONO, fontSize:9 }} className="bg-slate-950/80 border border-slate-700/60 text-slate-500 backdrop-blur-sm px-2 py-1 rounded">
            {orderLabel}
          </span>
        </div>

        {/* Status — top right */}
        <div className="absolute top-3 right-3">
          <StatusPip status={project.status} />
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 md:p-6">
        <div className="mb-3">
          <span className="bg-slate-700 text-slate-400 text-xs px-2 py-1 rounded inline-block mb-2">{project.type}</span>
          <h3 className="text-base font-bold text-white leading-tight">{project.title}</h3>
          <p style={{ ...MONO, fontSize:11 }} className="text-slate-500 mt-1">{project.period}</p>
        </div>

        {/* Metrics strip */}
        <div className="grid rounded-lg overflow-hidden border border-slate-700 mb-4"
          style={{ gridTemplateColumns:`repeat(${project.metrics.length},1fr)` }}>
          {project.metrics.map((m,i) => (
            <div key={i} className={`px-3 py-2.5 text-center bg-slate-900 ${i < project.metrics.length-1 ? "border-r border-slate-700" : ""}`}>
              <div className="text-sm font-bold leading-none" style={{ color:accent.hex }}>{m.value}</div>
              <div style={{ ...MONO, fontSize:9 }} className="text-slate-500 mt-1.5 tracking-wide uppercase leading-tight">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Highlights */}
        <ul className="flex flex-col gap-2 mb-4 flex-1">
          {project.highlights.slice(0,3).map((h,i) => (
            <li key={i} className="flex gap-2.5 items-start">
              <span className="mt-[7px] w-1 h-1 rounded-full shrink-0" style={{ background:accent.hex }} />
              <span className="text-xs text-slate-400 leading-relaxed">{h}</span>
            </li>
          ))}
          {project.highlights.length > 3 && (
            <li style={{ ...MONO, fontSize:10 }} className="pl-3.5 text-slate-600">
              +{project.highlights.length - 3} more — open to read
            </li>
          )}
        </ul>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-700">
          <div className="flex flex-wrap gap-1.5 flex-1 overflow-hidden">
            {project.stack.slice(0,2).map((tag,i) => (
              <span key={i} className="bg-slate-700 text-slate-400 text-xs px-2 py-1 rounded">{tag}</span>
            ))}
            {project.stack.length > 2 && (
              <span className="text-slate-600 text-xs py-1">+{project.stack.length-2}</span>
            )}
          </div>
          {/* Media count hint */}
          <div style={MONO} className="text-xs text-slate-600 shrink-0 flex items-center gap-2">
            {imgCount > 0 && <span className="flex items-center gap-1"><ImageIcon size={10} />{imgCount}</span>}
            {docCount > 0 && <span className="flex items-center gap-1"><FileText size={10} />{docCount}</span>}
            {hasCode   && <span className="flex items-center gap-1" style={{ color:"#6A9955" }}>{"{ }"}</span>}
            {imgCount === 0 && docCount === 0 && !hasCode && <span className="text-slate-700">No media</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   NAV
───────────────────────────────────────────────────────────────── */
function Nav({ scrolled, scrollTo }) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-slate-950/95 border-b border-slate-800 backdrop-blur-xl" : ""}`}>
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-14 flex items-center justify-between">
        <button onClick={() => scrollTo("hero")} className="font-bold text-sm text-white tracking-wide">
          AV<span className="text-blue-500">.</span>
        </button>
        <div className="flex items-center gap-6">
          {["skills","projects","contact"].map(id => (
            <button key={id} onClick={() => scrollTo(id)} style={{ ...MONO, fontSize:12 }}
              className="text-slate-400 hover:text-white transition-colors tracking-wide capitalize">
              {id}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────────── */
function Hero({ scrollTo }) {
  return (
    <section id="hero" className="relative bg-slate-950 min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
        backgroundSize:"40px 40px",
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background:"radial-gradient(ellipse 80% 60% at 50% 60%,transparent 40%,#020617 100%)" }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-12 sm:py-16 md:py-20 lg:py-24 w-full">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-full px-3.5 py-1.5 mb-8" style={{ animation:"fadeUp 0.5s 0.1s ease both" }}>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span style={{ ...MONO, fontSize:11 }} className="text-slate-400 tracking-widest uppercase">Open to Placement Opportunities</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-none mb-4" style={{ animation:"fadeUp 0.5s 0.2s ease both" }}>
            Ajitesh Vardhan
          </h1>
          <p className="text-lg text-slate-400 font-medium mb-8" style={{ animation:"fadeUp 0.5s 0.3s ease both" }}>
            Mechanical Engineering Undergraduate &nbsp;·&nbsp; Loughborough University
          </p>

          <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-5 mb-10" style={{ animation:"fadeUp 0.5s 0.35s ease both" }}>
            <p className="text-slate-300 text-sm leading-relaxed">
              A driven mechanical engineering undergraduate with hands-on experience across the full product design cycle — from initial concept and CAD modelling through to physical prototyping, testing, and iteration. Currently undertaking industry-based work with{" "}
              <span className="text-white font-medium">Rolls-Royce Submarines</span>. Proficient in{" "}
              <span className="text-white font-medium">Siemens NX</span>, FEA, NX CAM, and MATLAB, with additional skills in electronics design and Python. Seeking a{" "}
              <span className="text-white font-medium">12-month industrial placement</span> in product design and development starting 2026.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3" style={{ animation:"fadeUp 0.5s 0.45s ease both" }}>
            <a href={CV_URL} download
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
              <Download size={15} /> Download CV
            </a>
            <button onClick={() => scrollTo("projects")}
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-all">
              View Projects <ArrowRight size={14} />
            </button>
            <a href="https://linkedin.com/in/ajiteshvardhan" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-all">
              <Linkedin size={14} /> LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 md:right-10" style={{ ...MONO, fontSize:10 }}>
        <span className="text-slate-700 tracking-wider">53.7714° N, 1.2054° W</span>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PROJECTS
───────────────────────────────────────────────────────────────── */
function Projects() {
  const [headRef, visible] = useScrollReveal(0.05);
  const [openId, setOpenId] = useState(null);
  const openProject = PROJECTS.find(p => p.id === openId);

  const pinnedProjects   = PROJECTS.filter(p => p.pinned);
  const unpinnedProjects = PROJECTS.filter(p => !p.pinned);

  return (
    <>
      {openProject && (
        <ProjectModal project={openProject} onClose={() => setOpenId(null)} />
      )}

      <section id="projects" className="bg-slate-900 py-12 sm:py-16 md:py-24 lg:py-32 flex justify-center">
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10">

          <div ref={headRef} className={`mb-12 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <SectionLabel index={2} text="Projects" />
            <h2 className="text-3xl font-bold text-white">Projects</h2>
            <div className="w-10 h-0.5 bg-blue-600 mt-4 mb-4" />
            <p className="text-slate-400 text-sm max-w-lg leading-relaxed">
              Sorted chronologically, newest first. Pinned projects appear at the top. Click any card to view full details and media.
            </p>
          </div>

          {/* ── Pinned group ── */}
          {pinnedProjects.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-5">
                <Pin size={12} className="text-blue-400" />
                <span style={{ ...MONO, fontSize:11 }} className="text-blue-400 tracking-widest uppercase">Pinned</span>
                <div className="flex-1 h-px bg-slate-800 ml-2" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pinnedProjects.map((project, i) => (
                  <div key={project.id}
                    className={`transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                    style={{ transitionDelay:`${0.08 + i * 0.07}s` }}>
                    <ProjectCard
                      project={project}
                      onClick={() => setOpenId(project.id)}
                      orderLabel={`#${i + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── All projects group ── */}
          {unpinnedProjects.length > 0 && (
            <div>
              {pinnedProjects.length > 0 && (
                <div className="flex items-center gap-2 mb-5">
                  <span style={{ ...MONO, fontSize:11 }} className="text-slate-500 tracking-widest uppercase">All Projects</span>
                  <div className="flex-1 h-px bg-slate-800 ml-2" />
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {unpinnedProjects.map((project, i) => (
                  <div key={project.id}
                    className={`transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                    style={{ transitionDelay:`${0.08 + (pinnedProjects.length + i) * 0.07}s` }}>
                    <ProjectCard
                      project={project}
                      onClick={() => setOpenId(project.id)}
                      orderLabel={`#${pinnedProjects.length + i + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SKILLS — renders from skillsCategories + skillHighlights data
───────────────────────────────────────────────────────────────── */

/**
 * Renders a highlight string, converting **bold** markers into
 * <span> elements with font-medium + text-slate-200 styling.
 * All other Tailwind classes on the parent are left untouched.
 */
function HighlightText({ text }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1
          ? <span key={i} className="text-slate-200 font-medium">{part}</span>
          : part
      )}
    </>
  );
}

function Skills() {
  const [ref, visible] = useScrollReveal();
  return (
    <section id="skills" className="bg-slate-950 py-12 sm:py-16 md:py-24 lg:py-32 flex justify-center">
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10">

        {/* Section header */}
        <div
          ref={ref}
          className={`mb-12 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <SectionLabel index={1} text="Skills" />
          <h2 className="text-3xl font-bold text-white">Technical Proficiency</h2>
          <div className="w-10 h-0.5 bg-blue-600 mt-4" />
        </div>

        {/* Category cards grid — maps over skillsCategories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {skillsCategories.map((cat, i) => {
            const accent = ACCENTS[cat.accentKey];
            return (
              <div
                key={cat.id}
                className={`bg-slate-800 border border-slate-700 rounded-xl p-5 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${0.1 + i * 0.1}s`, borderTop: `2px solid ${accent.hex}` }}
              >
                <h3 className="text-sm font-semibold text-white mb-4">{cat.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, j) => (
                    <span
                      key={j}
                      className="bg-slate-700 border border-slate-600 text-slate-300 text-xs px-2.5 py-1 rounded hover:border-slate-500 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight bullets — maps over skillHighlights */}
        <div
          className={`mt-5 bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 flex flex-col gap-2.5 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: `${0.1 + skillsCategories.length * 0.1}s` }}
        >
          {skillHighlights.map((text, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-2" />
              <p className="text-sm text-slate-400 leading-relaxed">
                <HighlightText text={text} />
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   CONTACT / FOOTER
───────────────────────────────────────────────────────────────── */
function Contact() {
  const [ref, visible] = useScrollReveal(0.1);
  const LINKS = [
    { icon:<Mail size={17} />,     label:"Email",    value:"Ajitesh.vardhan@gmail.com",       href:"mailto:Ajitesh.vardhan@gmail.com" },
    { icon:<Phone size={17} />,    label:"Phone",    value:"07401 825553",                   href:"tel:07401825553" },
    { icon:<Linkedin size={17} />, label:"LinkedIn", value:"linkedin.com/in/ajiteshvardhan", href:"https://linkedin.com/in/ajiteshvardhan" },
  ];
  return (
    <section id="contact" className="bg-slate-950 border-t border-slate-800 py-12 sm:py-16 md:py-24 lg:py-32 flex justify-center">
      <div ref={ref} className="max-w-6xl w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div className={`mb-12 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <SectionLabel index={3} text="Contact" />
          <h2 className="text-3xl font-bold text-white">Let's Connect</h2>
          <div className="w-10 h-0.5 bg-blue-600 mt-4 mb-4" />
          <p className="text-slate-400 text-sm max-w-md leading-relaxed">
            Actively seeking a 12-month industrial placement in product design and development beginning mid-2026.
          </p>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay:"0.1s" }}>
          {LINKS.map((l,i) => (
            <a key={i} href={l.href} target={l.href.startsWith("http")?"_blank":undefined} rel="noreferrer"
              className="group flex items-start gap-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-xl p-5 transition-all no-underline">
              <div className="text-blue-400 shrink-0 mt-0.5 group-hover:text-blue-300 transition-colors">{l.icon}</div>
              <div>
                <div style={{ ...MONO, fontSize:10 }} className="text-slate-500 tracking-widest uppercase mb-1">{l.label}</div>
                <div className="text-sm text-slate-300 group-hover:text-white transition-colors break-all">{l.value}</div>
              </div>
            </a>
          ))}
        </div>
        <div className={`flex justify-center mb-14 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay:"0.2s" }}>
          <a href={CV_URL} download
            className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-7 py-3 rounded-lg transition-colors">
            <Download size={15} /> Download CV
          </a>
        </div>
        <div className={`border-t border-slate-800 pt-8 flex flex-wrap justify-between gap-4 transition-all duration-500 ${visible ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay:"0.3s" }}>
          <span className="text-sm font-bold text-slate-600">AV<span className="text-blue-600">.</span></span>
          <span style={{ ...MONO, fontSize:11 }} className="text-slate-600">BEng Mechanical Engineering · Loughborough University · 2024–2028</span>
          <span style={{ ...MONO, fontSize:11 }} className="text-slate-700">Loughborough, England</span>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   ROOT
───────────────────────────────────────────────────────────────── */
export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  return (
    <>
      
      <div className="w-full flex flex-col items-stretch" style={{ fontFamily:"'Inter',system-ui,-apple-system,sans-serif" }}>
        <Nav scrolled={scrolled} scrollTo={scrollTo} />
        <Hero scrollTo={scrollTo} />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </>
  );
}