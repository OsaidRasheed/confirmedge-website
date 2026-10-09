export const company = {
  name: "Confirmedge",
  tagline: "Windows App Engineering Studio",
  email: "support@confirmedge.com",
  phone: "+44 203 769 9530",
  whatsapp: "+962 797 670 156",
  whatsappLink: "https://wa.me/962797670156",
  address: {
    street: "128 City Road",
    city: "London",
    country: "United Kingdom",
  },
  socials: {
    linkedin: "https://www.linkedin.com/company/110338836/",
    instagram: "https://www.instagram.com/confirmedge?igsh=MW11czJnMHRwaDY0OQ==",
  },
};

export const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Process", href: "#process" },
  { label: "Results", href: "#results" },
  { label: "Contact", href: "#contact" },
];

export const techStack = [
  "WinUI 3",
  ".NET 8",
  "C#",
  "WPF",
  "Windows App SDK",
  "Direct2D",
  "Rust",
  "C++",
  "TypeScript",
  "React",
  "Electron",
  "MSIX",
  "Win32",
  "Azure",
  "SQLite",
  "WebView2",
];

export interface Capability {
  icon: string;
  title: string;
  description: string;
  tags: string[];
}

export const capabilities: Capability[] = [
  {
    icon: "app-window",
    title: "Native Windows Apps",
    description:
      "Fluent Design desktop applications built with WinUI 3 and the Windows App SDK — fast, beautiful, and truly native to Windows 11.",
    tags: ["WinUI 3", "Windows App SDK", "Fluent Design"],
  },
  {
    icon: "gauge",
    title: "Performance Engineering",
    description:
      "Sub-16ms frame budgets, GPU-accelerated rendering, and memory profiles tuned until the profiler is boring.",
    tags: ["Direct2D", "Profiling", "Multithreading"],
  },
  {
    icon: "layers",
    title: "System Integration",
    description:
      "Deep OS integration — notifications, jump lists, system tray, file associations, background tasks, and Windows services.",
    tags: ["Win32", "COM", "Windows Services"],
  },
  {
    icon: "globe",
    title: "Web & Cross-Platform",
    description:
      "Modern web applications and cross-platform companions that share one codebase and one design language with your desktop app.",
    tags: ["React", "TypeScript", "Electron"],
  },
  {
    icon: "package",
    title: "Packaging & Distribution",
    description:
      "Signed MSIX installers, auto-update pipelines, Microsoft Store publishing, and enterprise deployment via Intune.",
    tags: ["MSIX", "Store", "Code Signing"],
  },
  {
    icon: "shield",
    title: "Security & Reliability",
    description:
      "Threat modeling, secure credential storage, crash telemetry, and update rollbacks — engineered in from day one.",
    tags: ["DPAPI", "Telemetry", "Code Audit"],
  },
];

export const processSteps = [
  {
    num: "01",
    cmd: "discover",
    title: "Discover",
    description:
      "We map your workflow, users, and constraints. No 40-page decks — a working prototype within the first sprint.",
  },
  {
    num: "02",
    cmd: "architect",
    title: "Architect",
    description:
      "Solution structure, data flow, threading model, and update strategy — decisions documented in code, not slide ware.",
  },
  {
    num: "03",
    cmd: "build",
    title: "Build",
    description:
      "Weekly shippable builds with CI/CD, automated tests, and pixel-reviewed UI. You watch the app grow every Friday.",
  },
  {
    num: "04",
    cmd: "ship",
    title: "Ship & Support",
    description:
      "Signed MSIX, Store submission or enterprise rollout, crash telemetry, and a partner who answers after launch day.",
  },
];

export const results = [
  {
    metric: "40%",
    title: "Streamlined Onboarding",
    outcome: "Reduced client onboarding time by 40% with a custom desktop workflow tool.",
  },
  {
    metric: "6 wks",
    title: "Secure CI/CD Pipeline",
    outcome: "Designed and deployed a secure, signed build pipeline in six weeks.",
  },
  {
    metric: "Real-time",
    title: "Unified Data Platform",
    outcome: "Unified scattered data sources into live dashboards decision-makers actually open.",
  },
];

export const confirmChartFeatures = [
  {
    title: "GPU-accelerated rendering",
    description: "Direct2D chart engine sustains 60 fps with 100k+ points on screen.",
  },
  {
    title: "Live data streaming",
    description: "Bind to files, sockets, or APIs and watch charts update in real time.",
  },
  {
    title: "One-click import",
    description: "CSV, Excel, and JSON — drag a file onto the window and it's charted.",
  },
  {
    title: "Native Windows feel",
    description: "WinUI 3 Fluent Design, dark mode, snap layouts, and touch support.",
  },
  {
    title: "Export anywhere",
    description: "PNG, SVG, PDF reports, or copy a live chart straight into PowerPoint.",
  },
  {
    title: "Scriptable",
    description: "Automate recurring reports with a built-in scripting engine.",
  },
];
