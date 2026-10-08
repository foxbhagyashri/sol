import { useState, useEffect } from "react";
// Put sunlogo.png in /public/ (imported as "/sunlogo.png")
import universityLogo from "/sunlogo.png";

/* ------------------------------------------------------------------
   SETUP
   1. Put all images in /public/ (same filenames as used below).
   2. All styling is inline CSS. Add once to global CSS:
         body { margin: 0; }
         html { scroll-behavior: smooth; }
   3. In handleSubmit(), send the lead to your CRM and fire your
      Google Ads conversion event (gtag_report_conversion).
------------------------------------------------------------------- */

const RECRUITERS = [
  { name: "Rêve Pharma", src: "/intellexempire.png" },
  { name: "Yugandhar", src: "/jkb-legal.png" },
  { name: "Nova Beauty", src: "/lawyer-panel.jpeg" },
  { name: "Pantaloons", src: "/lex.png" },
  { name: "Forest Essentials", src: "/singhania.png" },
  { name: "Design Cafe", src: "/spd.jpeg" },
  { name: "The Souled Store", src: "/sui-generis.jpeg" },
  { name: "Anant Fragrance Pvt. Ltd.", src: "/times-of-india.jpeg" },
];

const CAMPUS = [
  { src: "/labimg.jpg", title: "Advanced Labs", text: "State-of-the-art laboratories for hands-on experiments and innovation." },
  { src: "/studentActivities.jpg", title: "Student Activities", text: "Cultural festivals, sports, clubs, and various student-led initiatives." },
  { src: "/securityimg.webp", title: "24×7 Security", text: "Round-the-clock surveillance with advanced monitoring systems." },
  { src: "/gym.webp", title: "Gymnasium", text: "Modern fitness center with advanced workout machines." },
  { src: "/campus-1.jpg", title: "Vibrant Campus Atmosphere", text: "Experience an energetic campus filled with learning, culture and fun." },
  { src: "/classroom-1.jpg", title: "Modern Classrooms", text: "Well-equipped digital classrooms designed for interactive learning." },
  { src: "/DSC_5062.jpg", title: "Library & Research Center", text: "A huge digital + physical library supporting academic and research needs." },
  { src: "/hostel.jpg", title: "Hostel & Accommodation", text: "Comfortable, secure hostel facilities that feel like a second home." },
];

const IMG = {
  hero: "/moot-3.jpg",
  campus: "/042__1_.jpg",
  mootHall: "/DSC_4927 (1).jpg",
  mootTrial: "/b7 (1).jpg",
  lawCampus: "/b10 (1).jpg",
  facultySession: "/IMG_20251013_124123 (1).jpg",
  mockInterview: "/IMG_20251013_124616.jpg",
};

const CONTENT = {
  brand: "Sandip University",
  phone: "+91-8956374111",
  phoneHref: "tel:+918956374111",
  heroTag: "Admissions Open 2026–27",
  heroTitle: "Preparing Tomorrow’s Legal Leaders",
  heroSub:
    "Applications Invited for SU-DAT 2027",

  para:
    "Applicable for only UG course",

  heroPoints: [
    "Practice-focused legal education",
    "Experienced faculty & legal experts",
    "Industry-aligned curriculum",
    "Moot courts & advocacy training",
  ],
  datNotice: {
    titlee: "1st Phase Examination",
    title: "",
    lastDateLabel: "Last Date to Apply",
    lastDate: "11 Feb 2027",
    examLabel: "SU-DAT Exam",
    examDate: "13 Feb 2027",
  },

  stats: [
    { value: "20+", label: "Years of Excellence" },
    { value: "150+", label: "Industry Partners" },
    { value: "20+", label: "Design Labs & Studios" },
    { value: "100%", label: "Placement Support" },
  ],
  aboutTitle: "About the School of Law",
  aboutText: [
    "Sandip University’s School of Law is one of Maharashtra’s top institutions for legal education, known for its industry-oriented curriculum designed by leading academicians and professionals. ",
    "The school focuses on developing socially responsible legal professionals with strong values of justice, fairness, and equality. Students benefit from a modern learning environment, holistic development, and diverse specialisations that help them build strong legal skills and stand out in the competitive legal field.Sandip University’s School of Law provides quality, industry-focused legal education.",
  ],
  programs: [
    { name: "B.A., LL.B.(Hons)", duration: "4 Years", blurb: "Undergraduate design degree with specialisation options." },
    { name: "B.B.A., LL.B. Honours", duration: "3 Years", blurb: "Science-based degrees in fashion, interiors and beauty." },
    { name: "LLM in Criminal Law", duration: "2 Years", blurb: "Advanced science-based programmes in fashion and beauty." },
    { name: "LL.B.Honours", duration: "2 Years", blurb: "Advanced science-based programmes in fashion and beauty." },
    { name: "LLM CORPORATE COMMERCIAL LAW", duration: "2 Years", blurb: "Advanced science-based programmes in fashion and beauty." },
    { name: "LLM in Constitutional and Administrative Law", duration: "2 Years", blurb: "Advanced science-based programmes in fashion and beauty." },

  ],
  highlights: [
    { title: "Learn by Practising", text: "Moot courts, mock trials, legal drafting and client counselling in dedicated practice labs." },
    { title: "Mentorship", text: "Small batches with faculty who guide your research, memorials and case analysis one-to-one." },
    { title: "Law Meets Business & Technology", text: "Explore corporate, cyber, IP and international law alongside the changing needs of industry." },
    { title: "Career Ready", text: "Moot competitions, legal aid clinics and live case work help you graduate with real courtroom and drafting experience." },
    { title: "Industry Exposure", text: "Workshops, guest lectures and internships with law firms, courts, corporate legal teams and NGOs." },
    { title: "Green Campus", text: "A spacious, well-connected campus with a law library built for focused study." },
  ],
  careers: [
    "Lawyer / Advocate",
    "Corporate Legal Counsel",
    "Judge / Judicial Services",
    "Public Prosecutor",
    "Legal Researcher",
    "Compliance Officer",
    "Policy Consultant",
    "Law Professor / Academic",
  ],
  steps: [
    { title: "Enquire", text: "Fill the form or call our admission desk." },
    { title: "Counselling", text: "Talk to our team about programmes and eligibility." },
    { title: "Apply", text: "Submit your application and documents." },
    { title: "Enrol", text: "Confirm your seat and start your design journey." },
  ],
  faqs: [
    { q: "What is the eligibility criteria for Sandip University's law programs?", a: "For Undergraduate (BA LLB / BBA LLB): Passed 10+2 from a recognized board with minimum 45% marks (40% for reserved category). For LLB (Hons): Graduation in any discipline is required." },
    { q: "Is any entrance exam required for admission to Sandip University's law courses?", a: "Yes. The university may conduct its own entrance exam. We also accept valid scores from CLAT, MH-CET Law, LSAT–India, or university-level entrance tests." },
    { q: "What is the duration of Sandip University's law programs?", a: "BA LLB and BBA LLB are 5-year integrated programs. LLB (Hons) is a 3-year program. LLM programs are typically 2 years in duration." },
    { q: "Are internships mandatory as part of Sandip University's law curriculum?", a: "Yes. Internships with law firms, advocates, corporate legal departments, and NGOs are compulsory as per the Bar Council of India guidelines." },
    { q: "Can I choose my specialization in Sandip University's law programs?", a: "Yes. Specializations such as Criminal Law, Corporate Law, Constitutional Law, Human Rights Law, and others are available depending on the program." },
    { q: "Is the law degree offered by Sandip University approved by the Bar Council of India (BCI)?", a: "Yes. Our law programs are recognized and approved by the Bar Council of India." },
  ],
  footerAddress: "Sandip University, Nashik, Maharashtra, India",
};

const DEGREES = [
  {
    id: "ug",
    title: "Undergraduate Programs",
    duration: "5 Years / 3 Years",
    mode: "Full-Time",
    // Fallback; each programme below overrides it
    eligibility: [
      "Passed 10+2 from any recognized board",
      "Minimum 45% aggregate marks (40% for reserved category)",
    ],
    specializations: [
      {
        key: "B.A. LLB (Hons.)",
        duration: "5 Years",
        summary:
          "B.A. LLB is an integrated program that blends liberal arts with legal studies, providing a strong foundation in law, critical thinking, and research. The course covers subjects like constitutional law, criminal law, corporate law, and international law, with hands-on training through moot courts, internships, legal drafting, and practical workshops, helping students gain both theoretical knowledge and real-world legal skills.",
        careers: [
          "Lawyer / Advocate",
          "Judge or Legal Officer in Government",
          "Corporate Legal Advisor",
          "Legal Researcher or Law Professor",
          "NGO / Policy Consultant",
        ],
        eligibility: [
          "Passed 10+2 from any recognized board",
          "Minimum 45% aggregate marks (40% for reserved category)",
        ],
      },
      {
        key: "BBA LLB (Hons.)",
        duration: "5 Years",
        summary:
          "BBA LLB is a dynamic program that merges business management with legal studies, preparing students to handle the complexities of corporate and commercial law. The curriculum covers management principles, corporate governance, finance, taxation, and contract law, along with practical exposure through internships, case studies, and moot courts, building professionals skilled in both law and business strategy.",
        careers: [
          "Corporate Lawyer / Legal Counsel",
          "Compliance or Risk Manager",
          "Business Consultant with Legal Expertise",
          "Banking & Finance Legal Advisor",
          "International Trade or IP Lawyer",
        ],
        eligibility: [
          "Passed 10+2 from any recognized board",
          "Minimum 45% aggregate marks (40% for reserved category)",
        ],
      },
      {
        key: "LLB (Hons.)",
        duration: "3 Years",
        summary:
          "LLB (Hons) is a focused program that provides an in-depth understanding of law and legal principles. The course covers constitutional law, criminal law, corporate law, intellectual property, and international law, with practical training through moot courts, legal research, and drafting exercises, equipping students with strong analytical, advocacy, and problem-solving skills essential for a professional legal career.",
        careers: [
          "Lawyer / Advocate",
          "Judge or Government Legal Officer",
          "Corporate or Contract Lawyer",
          "Legal Researcher or Professor",
          "Specialist in IP, Cyber, or International Law",
        ],
        eligibility: [
          "Graduation in any discipline from a recognized university",
          "Minimum 45% aggregate marks (40% for reserved category)",
        ],
      },
    ],
  },
  {
    id: "pg",
    title: "Postgraduate Programs",
    duration: "1 Year", // TODO: confirm PG duration, it wasn't in the content you sent
    mode: "Full-Time",
    eligibility: [
      "LLB or Integrated Law Degree from a recognized university",
      "Minimum 50% aggregate marks",
    ],
    specializations: [
      {
        key: "LLM (Criminal Law)",
        summary:
          "LLM in Criminal Law is a specialized program designed for aspiring legal professionals who want to master criminal justice and advanced criminal law. The course dives deep into criminal jurisprudence, criminology, cybercrime, forensic law, and international criminal law, with hands-on training through case studies, research, and internships. It prepares students to excel as criminal lawyers, public prosecutors, legal advisors, or criminal law researchers, combining in-depth knowledge with practical expertise.",
        careers: [
          "Criminal Lawyer / Advocate",
          "Public Prosecutor",
          "Defense Attorney",
          "Policy Analyst",
          "Legal Consultant",
          "Academic & Researcher",
        ],
      },
      {
        key: "LLM (Constitutional & Administrative Law)",
        summary:
          "LLM in Constitutional & Administrative Law is a specialized program that delves into the foundations, principles, and practices of constitutional governance and administrative law. The course covers topics like fundamental rights, constitutional interpretation, administrative justice, and public law, with practical exposure through case studies, legal research, and moot courts. It equips students to excel as constitutional lawyers, policy advisors, legal scholars, or public law consultants, combining deep legal insight with practical expertise.",
        careers: [
          "Constitutional Lawyer",
          "Advocate",
          "Government Legal Advisor",
          "Policy Consultant",
          "Public Interest Lawyer",
          "Human Rights Lawyer",
          "Academic & Researcher",
        ],
      },
      {
        key: "LLM (Corporate & Commercial Law)",
        summary:
          "LLM in Corporate & Commercial Law is a specialized program designed for aspiring legal professionals seeking expertise in business and corporate law. The course covers corporate governance, mergers & acquisitions, banking and finance law, securities law, and international trade law, with practical exposure through case studies, internships, and legal research. It prepares students for careers as corporate lawyers, legal advisors, compliance officers, or consultants in business and commercial law.",
        careers: [
          "Corporate Lawyer",
          "Legal Counsel",
          "Compliance / Risk Management Officer",
          "Contract / M&A Consultant",
          "Academic & Researcher",
        ],
      },
    ],
  },
];

/* ----------------------------- theme ----------------------------- */

const C = {
  blue950: "#172554",
  blue900: "#1e3a8a",
  blue800: "#1e40af",
  blue700: "#1d4ed8",
  blue200: "#bfdbfe",
  blue100: "#dbeafe",
  orange700: "#c2410c",
  orange600: "#ea580c",
  orange500: "#f97316",
  orange400: "#fb923c",
  orange200: "#fed7aa",
  orange100: "#ffedd5",
  slate900: "#0f172a",
  slate700: "#334155",
  slate600: "#475569",
  slate500: "#64748b",
  slate400: "#94a3b8",
  slate300: "#cbd5e1",
  slate200: "#e2e8f0",
  slate50: "#f8fafc",
  white: "#ffffff",
};

const FONT =
  "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

/* ----------------------------- helpers ----------------------------- */

function useWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return w;
}

function useBp() {
  const w = useWidth();
  return { sm: w >= 640, md: w >= 768, lg: w >= 1024 };
}

const goToForm = () =>
  document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" });

const NAV = [
  { label: "Home", id: "home" },
  { label: "About Us", id: "about" },
  { label: "Courses", id: "courses" },
  { label: "Recruiters", id: "recruiters" },
  { label: "Campus Life", id: "campus-life" },
  { label: "Why Choose Us", id: "why-us" },
  { label: "Contact Us", id: "enquire" },
];

const goTo = (id) => {
  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

function Container({ children, style }) {
  const { sm } = useBp();
  return (
    <div
      style={{
        boxSizing: "border-box",
        width: "100%",
        maxWidth: 1152,
        margin: "0 auto",
        padding: sm ? "0 24px" : "0 16px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ eyebrow, title, center = true, light = false }) {
  const { sm } = useBp();
  return (
    <div style={{ textAlign: center ? "center" : "left" }}>
      {eyebrow && (
        <p
          style={{
            margin: 0,
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: light ? C.orange400 : C.orange600,
          }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        style={{
          margin: "8px 0 0",
          fontSize: sm ? 36 : 30,
          fontWeight: 700,
          lineHeight: 1.2,
          color: light ? C.white : C.slate900,
        }}
      >
        {title}
      </h2>
    </div>
  );
}

function Btn({ href, onClick, style, hoverStyle, children, type }) {
  const [hover, setHover] = useState(false);
  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      type={href ? undefined : type || "button"}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-block",
        cursor: "pointer",
        textDecoration: "none",
        border: "none",
        fontFamily: "inherit",
        transition: "background-color .2s, transform .2s",
        ...style,
        ...(hover ? hoverStyle : {}),
      }}
    >
      {children}
    </Tag>
  );
}

function HoverCard({ style, children }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        transition: "transform .2s, box-shadow .2s",
        transform: hover ? "translateY(-4px)" : "none",
        boxShadow: hover ? "0 10px 25px rgba(15,23,42,.12)" : "0 1px 2px rgba(15,23,42,.06)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Field({ as = "input", style, ...props }) {
  const [focus, setFocus] = useState(false);
  const Tag = as;
  return (
    <Tag
      {...props}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={{
        boxSizing: "border-box",
        width: "100%",
        padding: "11px 12px",
        fontSize: 14,
        fontFamily: "inherit",
        color: C.slate900,
        background: C.white,
        borderRadius: 8,
        outline: "none",
        border: `1px solid ${focus ? C.orange600 : C.slate300}`,
        boxShadow: focus ? `0 0 0 3px ${C.orange200}` : "none",
        ...style,
      }}
    />
  );
}

/* ----------------------------- lead form ----------------------------- */

function LeadForm() {
  const { sm } = useBp();
  const [data, setData] = useState({ name: "", phone: "", email: "", program: "", city: "" });
  const [sent, setSent] = useState(false);

  const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: POST `data` to your CRM / backend
    // TODO: fire Google Ads conversion, e.g. gtag_report_conversion();
    console.log("Lead:", data);
    setSent(true);
  };

  const card = {
    boxSizing: "border-box",
    background: C.white,
    borderRadius: 16,
    padding: sm ? 32 : 24,
    boxShadow: "0 25px 50px rgba(0,0,0,.3)",
  };

  if (sent) {
    return (
      <div style={{ ...card, textAlign: "center", padding: 32 }}>
        <div
          style={{
            width: 56,
            height: 56,
            margin: "0 auto 16px",
            borderRadius: "50%",
            background: "#dcfce7",
            color: "#16a34a",
            fontSize: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✓
        </div>
        <h3 style={{ margin: 0, fontSize: 20, color: C.slate900 }}>Thank you!</h3>
        <p style={{ margin: "8px 0 0", fontSize: 14, color: C.slate600 }}>
          Our admission counsellor will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={card}>
      <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: C.slate900 }}>
        Apply / Get a Free Callback
      </h3>
      <p style={{ margin: "4px 0 0", fontSize: 14, color: C.slate500 }}>Takes less than a minute.</p>
      <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
        <Field name="name" placeholder="Full name" required value={data.name} onChange={onChange} />
        <Field name="phone" type="tel" placeholder="Mobile number" required pattern="[0-9+\- ]{10,15}" value={data.phone} onChange={onChange} />
        <Field name="email" type="email" placeholder="Email address" required value={data.email} onChange={onChange} />
        <Field name="city" placeholder="City" value={data.city} onChange={onChange} />
        <Field as="select" name="program" required value={data.program} onChange={onChange}>
          <option value="">Select programme</option>
          {CONTENT.programs.map((p) => (
            <option key={p.name} value={p.name}>
              {p.name}
            </option>
          ))}
        </Field>
      </div>
      <Btn
        type="submit"
        style={{
          width: "100%",
          marginTop: 20,
          padding: "14px 16px",
          borderRadius: 8,
          background: "rgb(216 10 18)",
          color: C.white,
          fontSize: 16,
          fontWeight: 600,
        }}
        hoverStyle={{ background: C.orange700 }}
      >
        Submit Enquiry
      </Btn>
      <p style={{ margin: "12px 0 0", textAlign: "center", fontSize: 12, color: C.slate400 }}>
        By submitting, you agree to be contacted by Sandip University.
      </p>
    </form>
  );
}

/* ----------------------------- sections ----------------------------- */

function Header() {
  const { sm, lg } = useBp();
  const w = useWidth();
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (id) => {
    setMenuOpen(false);
    goTo(id);
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "rgba(255,255,255,.95)",
        backdropFilter: "blur(8px)",
        borderBottom: `1px solid ${C.slate200}`,
      }}
    >
      <Container style={{ display: "flex", height: 64, alignItems: "center", justifyContent: "space-between", gap: 16, maxWidth: 1180 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <img
            src={universityLogo}
            alt={CONTENT.brand}
            style={{ height: 56, width: "auto", objectFit: "contain", display: "block" }}
          />
        </div>

        {lg && (
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {NAV.map((n) => (
              <Btn
                key={n.id}
                onClick={() => go(n.id)}
                style={{ padding: "8px 10px", background: "none", color: C.slate700, fontSize: 14, fontWeight: 600, borderRadius: 6 }}
                hoverStyle={{ color: C.orange600 }}
              >
                {n.label}
              </Btn>
            ))}
          </nav>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>

          {sm && (
            <Btn
              onClick={goToForm}
              style={{ padding: "8px 20px", borderRadius: 999, background: "rgb(216 10 18)", color: C.white, fontSize: 14, fontWeight: 600 }}
              hoverStyle={{ background: "#000" }}
            >
              Apply Now
            </Btn>
          )}
          {!lg && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              style={{ background: "none", border: `1px solid ${C.slate300}`, borderRadius: 8, width: 40, height: 40, fontSize: 20, cursor: "pointer", color: C.slate700 }}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          )}
        </div>
      </Container>

      {!lg && menuOpen && (
        <nav style={{ background: C.white, borderTop: `1px solid ${C.slate200}`, padding: "8px 16px 16px", display: "flex", flexDirection: "column" }}>
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              style={{ textAlign: "left", padding: "12px 4px", background: "none", border: "none", borderBottom: `1px solid ${C.slate200}`, fontFamily: "inherit", fontSize: 15, fontWeight: 600, color: C.slate700, cursor: "pointer" }}
            >
              {n.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

function Hero() {
  const { sm, lg } = useBp();
  return (
    <section id="home" style={{ position: "relative", overflow: "hidden", background: C.blue950 }}>
      <img
        src={IMG.hero}
        alt="Design student draping fabric on a mannequin in the studio"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to right, ${C.blue950}, rgba(23,37,84,.8), transparent)`,
        }}
      />
      <Container
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: lg ? "1fr 1fr" : "1fr",
          alignItems: "center",
          gap: 40,
          paddingTop: lg ? 80 : 56,
          paddingBottom: lg ? 80 : 56,
        }}
      >
        <div style={{ color: C.white }}>
          <span
            style={{
              display: "inline-block",
              padding: "4px 16px",
              borderRadius: 999,
              background: "rgb(216 10 18)",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {CONTENT.heroTag}
          </span>
          <h1 style={{ margin: "20px 0 0", fontSize: sm ? 48 : 36, fontWeight: 700, lineHeight: 1.15 }}>
            {CONTENT.heroTitle}
          </h1>
          <h5 style={{ margin: "16px 0 0", maxWidth: 576, fontSize: 18, lineHeight: 1.6, color: "#fff" }}>
            {CONTENT.heroSub}
          </h5>
          <p style={{ margin: "16px 0 0", maxWidth: 576, fontSize: 15, lineHeight: 1.6, color: C.blue100 }}>
            {CONTENT.para}
          </p>
          <div
            style={{
              marginTop: 24,
              maxWidth: 576,
              padding: "16px 20px",
              borderRadius: 12,
              background: "rgba(255,255,255,.1)",
              border: "1px solid rgba(255,255,255,.25)",
              borderLeft: "4px solid rgb(216 10 18)",
              backdropFilter: "blur(4px)",
            }}
          >
            <div style={{ fontSize: sm ? 20 : 17, fontWeight: 600, lineHeight: 1.3, marginBottom: 5 }}>
              {CONTENT.datNotice.titlee}
            </div>
            <div style={{ fontSize: sm ? 17 : 17, fontWeight: 700, lineHeight: 1.3 }}>
              {CONTENT.datNotice.title}
            </div>

            <div
              style={{
                marginTop: 12,
                display: "flex",
                flexDirection: sm ? "row" : "column",
                alignItems: sm ? "center" : "flex-start",
                gap: sm ? 20 : 10,
              }}
            >
              <div>
                <div style={{ fontSize: 14, textTransform: "uppercase", letterSpacing: "0.08em", color: "red", fontWeight: 700, marginBottom: 4 }}>
                  {CONTENT.datNotice.lastDateLabel}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{CONTENT.datNotice.lastDate}</div>
              </div>

              <div
                aria-hidden="true"
                style={{
                  width: sm ? 1 : "100%",
                  height: sm ? 36 : 1,
                  background: "rgba(255,255,255,.35)",
                }}
              />

              <div>
                <div style={{ fontSize: 14, textTransform: "uppercase", letterSpacing: "0.08em", color: "red", fontWeight: 700, marginBottom: 4 }}>
                  {CONTENT.datNotice.examLabel}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{CONTENT.datNotice.examDate}</div>
              </div>
            </div>
          </div>
          <ul
            style={{
              listStyle: "none",
              margin: "24px 0 0",
              padding: 0,
              display: "grid",
              gridTemplateColumns: sm ? "1fr 1fr" : "1fr",
              gap: 8,
            }}
          >
            {CONTENT.heroPoints.map((p) => (
              <li key={p} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 500 }}>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "rgb(216 10 18)",
                    fontSize: 12,
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div id="enquire" style={{ scrollMarginTop: 96 }}>
          <LeadForm />
        </div>
      </Container>
    </section>
  );
}

function Stats() {
  const { md } = useBp();
  return (
    <section style={{ background: "rgb(216 10 18)" }}>
      <Container
        style={{
          display: "grid",
          gridTemplateColumns: md ? "repeat(4, 1fr)" : "repeat(2, 1fr)",
          gap: 24,
          padding: "32px 24px",
          textAlign: "center",
          color: C.white,
        }}
      >
        {CONTENT.stats.map((s) => (
          <div key={s.label}>
            <p style={{ margin: 0, fontSize: 30, fontWeight: 800 }}>{s.value}</p>
            <p style={{ margin: "4px 0 0", fontSize: 14, color: C.orange100 }}>{s.label}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}

function About() {
  const { sm, lg } = useBp();
  return (
    <section id="about" style={{ padding: sm ? "80px 0" : "64px 0", scrollMarginTop: 64 }}>
      <Container style={{ display: "grid", gridTemplateColumns: lg ? "1fr 1fr" : "1fr", alignItems: "center", gap: 40 }}>
        <div>
          <SectionTitle eyebrow="Who we are" title={CONTENT.aboutTitle} center={false} />
          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 16, color: C.slate600, lineHeight: 1.7 }}>
            {CONTENT.aboutText.map((t) => (
              <p key={t} style={{ margin: 0 }}>{t}</p>
            ))}
          </div>
          <Btn
            onClick={goToForm}
            style={{ marginTop: 24, padding: "12px 24px", borderRadius: 999, background: "rgb(216 10 18)", color: C.white, fontSize: 14, fontWeight: 600 }}
            hoverStyle={{ background: "#000" }}
          >
            Talk to a Counsellor
          </Btn>
        </div>
        <img
          src={IMG.campus}
          alt="Sandip University campus"
          loading="lazy"
          style={{
            width: "100%",
            height: lg ? 380 : 240,
            objectFit: "cover",
            borderRadius: 16,
            boxShadow: "0 20px 40px rgba(15,23,42,.2)",
          }}
        />
      </Container>
    </section>
  );
}

/* ----------------------------- programmes ----------------------------- */

function DegreePanel({ degree }) {
  const { sm, md } = useBp();
  const [tab, setTab] = useState(0);
  const spec = degree.specializations[tab];

  return (
    <div
      style={{
        boxSizing: "border-box",
        background: C.white,
        border: `1px solid ${C.slate200}`,
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(15,23,42,.08)",
      }}
    >
      <div style={{ background: "rgb(216 10 18)", color: C.white, padding: sm ? "28px 32px" : "24px 20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <span style={{ padding: "4px 12px", borderRadius: 999, background: "#000", fontSize: 12, fontWeight: 600 }}>
            {degree.duration}
          </span>
          <span style={{ padding: "4px 12px", borderRadius: 999, background: "rgba(255,255,255,.15)", fontSize: 12, fontWeight: 600 }}>
            {degree.mode}
          </span>
        </div>
        <h3 style={{ margin: "12px 0 0", fontSize: sm ? 30 : 24, fontWeight: 800 }}>{degree.title}</h3>
        <p style={{ margin: "16px 0 8px", fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff" }}>
          Choose Specialization
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {degree.specializations.map((s, i) => (
            <button
              key={s.key}
              onClick={() => setTab(i)}
              aria-pressed={tab === i}
              style={{
                padding: "10px 18px",
                borderRadius: 999,
                border: `1px solid ${tab === i ? C.orange600 : "rgba(255,255,255,.4)"}`,
                background: tab === i ? "#000" : "transparent",
                color: C.white,
                fontFamily: "inherit",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                transition: "background-color .2s, border-color .2s",
              }}
            >
              {s.key}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: md ? "1.2fr 1fr" : "1fr",
          gap: md ? 40 : 28,
          padding: sm ? "32px" : "24px 20px",
        }}
      >
        <div>
          <h4 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: C.slate900 }}>{spec.key} — Summary</h4>
          <p style={{ margin: "12px 0 0", fontSize: 15, lineHeight: 1.7, color: C.slate600 }}>{spec.summary}</p>

          <h4 style={{ margin: "28px 0 0", fontSize: 18, fontWeight: 700, color: C.slate900 }}>Eligibility</h4>
          <ul style={{ margin: "12px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
            {degree.eligibility.map((e) => (
              <li key={e} style={{ display: "flex", gap: 10, fontSize: 15, lineHeight: 1.5, color: C.slate700 }}>
                <span style={{ color: C.orange600, fontWeight: 700 }}>✓</span>
                {e}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ boxSizing: "border-box", background: C.slate50, border: `1px solid ${C.slate200}`, borderRadius: 16, padding: 24, alignSelf: "start" }}>
          <h4 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: C.slate900 }}>Career Opportunities</h4>
          <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {spec.careers.map((c) => (
              <span
                key={c}
                style={{ padding: "8px 14px", borderRadius: 999, background: C.white, border: `1px solid ${C.blue200}`, color: C.blue900, fontSize: 14, fontWeight: 600 }}
              >
                {c}
              </span>
            ))}
          </div>
          <Btn
            onClick={goToForm}
            style={{ marginTop: 24, padding: "12px 24px", borderRadius: 999, background: "rgb(216 10 18)", color: C.white, fontSize: 14, fontWeight: 600 }}
            hoverStyle={{ background: "#000" }}
          >
            Enquire for {spec.key} →
          </Btn>
        </div>
      </div>
    </div>
  );
}
const TABS = [
  { id: "ug", label: "Undergraduate", title: "Undergraduate Programs", hash: "#ug-courses" },
  { id: "pg", label: "Postgraduate", title: "Postgraduate Programs", hash: "#pg-courses" },
];

function Programs() {
  const { sm, md } = useBp();
  const [active, setActive] = useState(0);
  const tab = TABS[active];
  const degree = DEGREES.find((d) => d.id === tab.id);
  const others = CONTENT.programs.filter((p) => !DEGREES.some((d) => d.title === p.name));

  // Keep old nav links (#bsc-courses, #msc-courses) working: they switch the tab
  useEffect(() => {
    const syncFromHash = () => {
      const i = TABS.findIndex((t) => t.hash === window.location.hash);
      if (i !== -1) setActive(i);
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  return (
    <section id="courses" style={{ background: C.slate50, padding: sm ? "80px 0" : "64px 0", scrollMarginTop: 64 }}>
      {/* anchors so existing links to these ids still scroll here */}
      <span id="bsc-courses" style={{ display: "block", scrollMarginTop: 64 }} />
      <span id="msc-courses" style={{ display: "block", scrollMarginTop: 64 }} />

      <Container>
        <SectionTitle eyebrow="Programmes" title={tab.title} />
        {tab.desc && (
          <p style={{ margin: "12px auto 0", maxWidth: 576, textAlign: "center", color: C.slate600, lineHeight: 1.6 }}>
            {tab.desc}
          </p>
        )}

        {/* Filter tabs: flat, one row, underline on active */}
        <div
          role="tablist"
          style={{
            display: "flex",
            flexWrap: "nowrap",
            marginTop: 40,
            marginBottom: 24,
            borderBottom: `2px solid ${C.slate200}`,
          }}
        >
          {TABS.map((t, i) => {
            const isActive = active === i;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(i)}
                style={{
                  flex: 1,
                  minWidth: 0,
                  whiteSpace: "nowrap",
                  padding: sm ? "16px 12px" : "12px 6px",
                  background: "transparent",
                  border: "none",
                  borderBottom: `3px solid ${isActive ? C.orange600 : "transparent"}`,
                  marginBottom: -2,
                  color: isActive ? "rgb(216 10 18)" : C.slate600,
                  fontFamily: "inherit",
                  fontSize: sm ? 17 : 15,
                  fontWeight: isActive ? 800 : 600,
                  cursor: "pointer",
                  transition: "color .2s, border-color .2s",
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* key resets the specialization tab when the degree changes */}
        <DegreePanel key={degree.id} degree={degree} />

        {/* extra programmes only under B.Des, as before */}
        {tab.id === "bdes" && others.length > 0 && (
          <div
            style={{
              marginTop: 32,
              display: "grid",
              gridTemplateColumns: md ? `repeat(${others.length}, 1fr)` : "1fr",
              gap: 24,
            }}
          >
            {others.map((p) => (
              <HoverCard
                key={p.name}
                style={{ boxSizing: "border-box", background: C.white, border: `1px solid ${C.slate200}`, borderRadius: 16, padding: 24 }}
              >
                <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: 999, background: C.orange100, color: C.orange700, fontSize: 12, fontWeight: 600 }}>
                  {p.duration}
                </span>
                <h3 style={{ margin: "16px 0 0", fontSize: 24, fontWeight: 700, color: C.slate900 }}>{p.name}</h3>
                <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.6, color: C.slate600 }}>{p.blurb}</p>
                <Btn
                  onClick={goToForm}
                  style={{ marginTop: 20, padding: 0, background: "none", color: C.orange600, fontSize: 14, fontWeight: 600 }}
                  hoverStyle={{ color: C.orange700 }}
                >
                  Enquire now →
                </Btn>
              </HoverCard>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

function Highlights() {
  const { sm, lg } = useBp();
  return (
    <section id="why-us" style={{ padding: sm ? "80px 0" : "64px 0", scrollMarginTop: 64 }}>
      <Container>
        <SectionTitle eyebrow="Why choose us" title="What Makes Our School Different" />
        <div
          style={{
            marginTop: 40,
            display: "grid",
            gridTemplateColumns: lg ? "repeat(3, 1fr)" : sm ? "repeat(2, 1fr)" : "1fr",
            gap: 24,
          }}
        >
          {CONTENT.highlights.map((h, i) => (
            <div key={h.title} style={{ boxSizing: "border-box", border: `1px solid ${C.slate200}`, borderRadius: 16, padding: 24 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: "rgb(216 10 18)",
                  color: C.white,
                  fontWeight: 700,
                }}
              >
                {i + 1}
              </div>
              <h3 style={{ margin: "16px 0 0", fontSize: 18, fontWeight: 700, color: C.slate900 }}>{h.title}</h3>
              <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.6, color: C.slate600 }}>{h.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ----------------------------- campus life ----------------------------- */

function CarouselArrow({ dir, onClick, top }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      aria-label={dir === "left" ? "Previous" : "Next"}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "absolute",
        top,
        [dir]: 4,
        transform: "translateY(-50%)",
        zIndex: 2,
        width: 44,
        height: 44,
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        fontSize: 22,
        lineHeight: 1,
        color: hover ? C.white : C.slate900,
        background: hover ? C.orange600 : "rgba(255,255,255,.92)",
        boxShadow: "0 4px 12px rgba(15,23,42,.25)",
        transition: "background-color .2s, color .2s",
      }}
    >
      {dir === "left" ? "‹" : "›"}
    </button>
  );
}

function CampusCard({ item, imgH }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        boxSizing: "border-box",
        height: "100%",
        overflow: "hidden",
        background: C.white,
        borderRadius: 20,
        boxShadow: hover ? "0 14px 30px rgba(15,23,42,.18)" : "0 4px 14px rgba(15,23,42,.10)",
        transition: "box-shadow .3s",
      }}
    >
      <div style={{ overflow: "hidden", height: imgH, background: `linear-gradient(135deg, ${C.blue900}, ${C.orange600})` }}>
        <img
          src={item.src}
          alt={item.title}
          loading="lazy"
          onError={(e) => (e.currentTarget.style.display = "none")}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform .5s",
            transform: hover ? "scale(1.06)" : "scale(1)",
          }}
        />
      </div>
      <div style={{ padding: "20px 24px 24px" }}>
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: C.slate900 }}>{item.title}</h3>
        <p style={{ margin: "8px 0 0", fontSize: 15, lineHeight: 1.6, color: C.slate600 }}>{item.text}</p>
      </div>
    </div>
  );
}

function CampusLife() {
  const { sm, md } = useBp();
  const perView = md ? 2 : 1;
  const pages = Math.ceil(CAMPUS.length / perView);
  const imgH = md ? 300 : sm ? 260 : 210;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const page = Math.min(index, pages - 1);

  const next = () => setIndex((page + 1) % pages);
  const prev = () => setIndex((page - 1 + pages) % pages);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (Math.min(i, pages - 1) + 1) % pages), 5000);
    return () => clearInterval(t);
  }, [paused, pages]);

  return (
    <section
      id="campus-life"
      style={{
        padding: sm ? "80px 0" : "64px 0",
        scrollMarginTop: 64,
        background: `linear-gradient(to bottom, ${C.orange100}, ${C.white} 35%, ${C.slate50})`,
      }}
    >
      <Container>
        <SectionTitle eyebrow="Life at Sandip" title="Campus Life" />
        <p style={{ margin: "12px auto 0", maxWidth: 576, textAlign: "center", color: C.slate600, lineHeight: 1.6 }}>
          Learning, creativity, fitness and community — everything you need for a complete university experience.
        </p>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{ position: "relative", marginTop: 40 }}
        >
          <CarouselArrow dir="left" onClick={prev} top={imgH / 2 + 8} />
          <CarouselArrow dir="right" onClick={next} top={imgH / 2 + 8} />

          <div style={{ overflow: "hidden", margin: "0 -12px", padding: "8px 0 24px" }}>
            <div
              style={{
                display: "flex",
                transform: `translateX(-${page * 100}%)`,
                transition: "transform .6s ease",
              }}
            >
              {CAMPUS.map((item) => (
                <div
                  key={item.title}
                  style={{ boxSizing: "border-box", flex: `0 0 ${100 / perView}%`, padding: "0 12px" }}
                >
                  <CampusCard item={item} imgH={imgH} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === page ? 28 : 10,
                height: 10,
                borderRadius: 999,
                border: "none",
                padding: 0,
                cursor: "pointer",
                background: i === page ? C.orange600 : C.slate300,
                transition: "width .3s, background-color .3s",
              }}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Showcase() {
  const { sm, md } = useBp();
  const items = [
    {
      src: IMG.mootHall,
      alt: "Students presenting arguments in the moot court hall while classmates watch",
      title: "Moot Court Practice",
      text: "Argue before a bench in a full courtroom setting, with peers and faculty watching and giving feedback.",
      featured: true,
    },
    {
      src: IMG.mootTrial,
      alt: "Student advocate addressing the judge during a mock trial",
      title: "Mock Trials & Advocacy",
      text: "Build courtroom confidence through hands-on practice in pleadings, examination and oral advocacy.",
    },
    {
      src: IMG.lawCampus,
      alt: "Law students discussing case material outside the School of Law building",
      title: "Life at the School of Law",
      text: "Case discussions and peer learning on a campus designed for focused study.",
    },
    {
      src: IMG.facultySession,
      alt: "Faculty members interacting with law students in a classroom session",
      title: "Faculty Interaction",
      text: "Small-group sessions on legal awareness, current issues and career guidance.",
    },
    {
      src: IMG.mockInterview,
      alt: "Law students attending a mock interview with a faculty panel",
      title: "Mock Interviews & Viva",
      text: "Panel rounds that prepare you for internships, placements and judicial service interviews.",
    },
  ];

  return (
    <section style={{ padding: sm ? "80px 0" : "64px 0" }}>
      <Container>
        <SectionTitle eyebrow="Student showcase" title="Learning in Action at the School of Law" />
        <div
          style={{
            marginTop: 40,
            display: "grid",
            gridTemplateColumns: md ? "repeat(3, 1fr)" : "1fr",
            gap: 24,
          }}
        >
          {items.map((it) => (
            <article
              key={it.title}
              style={{
                gridColumn: md && it.featured ? "span 2" : "auto",
                overflow: "hidden",
                background: C.white,
                border: `1px solid ${C.slate200}`,
                borderRadius: 16,
                boxShadow: "0 1px 2px rgba(15,23,42,.06)",
              }}
            >
              <img
                src={it.src}
                alt={it.alt}
                loading="lazy"
                style={{
                  display: "block",
                  width: "100%",
                  height: md && it.featured ? 360 : 288,
                  objectFit: "cover",
                }}
              />
              <div style={{ padding: 20 }}>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: C.slate900 }}>{it.title}</h3>
                <p style={{ margin: "4px 0 0", fontSize: 14, lineHeight: 1.6, color: C.slate600 }}>{it.text}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Careers() {
  const { sm } = useBp();
  return (
    <section style={{ background: C.slate50, padding: sm ? "80px 0" : "64px 0" }}>
      <Container>
        <SectionTitle eyebrow="Careers" title="Where a Design Degree Can Take You" />
        <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
          {CONTENT.careers.map((c) => (
            <span
              key={c}
              style={{ padding: "8px 20px", borderRadius: 999, background: C.white, border: `1px solid ${C.blue200}`, color: C.blue900, fontSize: 14, fontWeight: 600 }}
            >
              {c}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Process() {
  const { sm, lg } = useBp();
  return (
    <section style={{ padding: sm ? "80px 0" : "64px 0" }}>
      <Container>
        <SectionTitle eyebrow="Admission process" title="4 Simple Steps to Get Started" />
        <div
          style={{
            marginTop: 40,
            display: "grid",
            gridTemplateColumns: lg ? "repeat(4, 1fr)" : sm ? "repeat(2, 1fr)" : "1fr",
            gap: 24,
          }}
        >
          {CONTENT.steps.map((s, i) => (
            <div key={s.title} style={{ textAlign: "center" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 56,
                  height: 56,
                  margin: "0 auto",
                  borderRadius: "50%",
                  background: "rgb(216 10 18)",
                  color: C.white,
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
                {i + 1}
              </div>
              <h3 style={{ margin: "16px 0 0", fontSize: 18, fontWeight: 700, color: C.slate900 }}>{s.title}</h3>
              <p style={{ margin: "4px 0 0", fontSize: 14, color: C.slate600 }}>{s.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Recruiters() {
  const { sm, md } = useBp();
  return (
    <section
      id="recruiters"
      style={{ background: C.blue950, padding: sm ? "80px 0" : "64px 0", scrollMarginTop: 64 }}
    >
      <Container>
        <SectionTitle eyebrow="Placements" title="Our Recruiters" light />
        <p style={{ margin: "12px auto 0", maxWidth: 576, textAlign: "center", color: C.blue200, lineHeight: 1.6 }}>
          Leading fashion, lifestyle, beauty and design brands hire and mentor our students.
        </p>

        <div
          style={{
            marginTop: 40,
            display: "grid",
            gridTemplateColumns: md ? "repeat(4, 1fr)" : "repeat(2, 1fr)",
            gap: sm ? 20 : 12,
          }}
        >
          {RECRUITERS.map((r) => (
            <HoverCard
              key={r.name}
              style={{
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: sm ? 140 : 110,
                padding: 16,
                background: C.white,
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <img
                src={r.src}
                alt={r.name}
                loading="lazy"
                style={{ display: "block", maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
              />
            </HoverCard>
          ))}
        </div>

        <div style={{ marginTop: 40, textAlign: "center" }}>
          <Btn
            onClick={goToForm}
            style={{ padding: "12px 32px", borderRadius: 999, background: C.orange600, color: C.white, fontSize: 14, fontWeight: 600 }}
            hoverStyle={{ background: C.orange700 }}
          >
            Start Your Journey
          </Btn>
        </div>
      </Container>
    </section>
  );
}

function FAQ() {
  const { sm } = useBp();
  const [open, setOpen] = useState(0);
  return (
    <section style={{ background: C.slate50, padding: sm ? "80px 0" : "64px 0" }}>
      <Container style={{ maxWidth: 768 }}>
        <SectionTitle eyebrow="FAQ" title="Frequently Asked Questions" />
        <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12 }}>
          {CONTENT.faqs.map((f, i) => (
            <div key={f.q} style={{ background: C.white, border: `1px solid ${C.slate200}`, borderRadius: 12 }}>
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "inherit",
                  fontSize: 16,
                  fontWeight: 600,
                  color: C.slate900,
                }}
              >
                {f.q}
                <span style={{ marginLeft: 16, fontSize: 20, color: C.orange600 }}>{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <p style={{ margin: 0, padding: "0 20px 16px", fontSize: 14, lineHeight: 1.6, color: C.slate600 }}>{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FinalCTA() {
  const { sm } = useBp();
  return (
    <section style={{ background: "rgb(216 10 18)", padding: "64px 0", textAlign: "center", color: C.white }}>
      <Container>
        <h2 style={{ margin: 0, fontSize: sm ? 36 : 30, fontWeight: 700 }}>Ready to Start Your Law Journey?</h2>
        <p style={{ margin: "12px auto 0", maxWidth: 576, color: C.blue100 }}>
          Limited seats. Talk to our admission team today.
        </p>
        <div
          style={{
            marginTop: 24,
            display: "flex",
            flexDirection: sm ? "row" : "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <Btn
            onClick={goToForm}
            style={{ padding: "12px 32px", borderRadius: 999, background: "#000", color: C.white, fontWeight: 600 }}
            hoverStyle={{ background: C.orange700 }}
          >
            Apply Now
          </Btn>
          <Btn
            href={CONTENT.phoneHref}
            style={{ padding: "12px 32px", borderRadius: 999, border: "1px solid rgba(255,255,255,.7)", background: "transparent", color: C.white, fontWeight: 600 }}
            hoverStyle={{ background: "rgba(255,255,255,.1)" }}
          >
            📞 Call {CONTENT.phone}
          </Btn>
        </div>
      </Container>
    </section>
  );
}

function Footer() {
  const { md } = useBp();
  return (
    <footer style={{ padding: md ? "15px 0" : "32px 0 96px", textAlign: "center", fontSize: 14, color: C.slate700 }}>
      <Container>
        <img
          src={universityLogo}
          alt={CONTENT.brand}
          style={{ height: 48, width: "auto", objectFit: "contain", display: "block", margin: "0 auto" }}
        />
        <p style={{ margin: "12px 0 0" }}>{CONTENT.footerAddress}</p>
        <p style={{ margin: "12px 0 0", fontSize: 12 }}>
          © {new Date().getFullYear()} {CONTENT.brand}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

function StickyMobileBar() {
  const { md } = useBp();
  if (md) return null;
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        display: "flex",
        background: C.white,
        borderTop: `1px solid ${C.slate200}`,
      }}
    >
      <a
        href={CONTENT.phoneHref}
        style={{ flex: 1, padding: "12px 0", textAlign: "center", fontSize: 14, fontWeight: 600, color: C.blue900, textDecoration: "none" }}
      >
        📞 Call Now
      </a>
      <button
        onClick={goToForm}
        style={{ flex: 1, padding: "12px 0", border: "none", background: C.orange600, color: C.white, fontSize: 14, fontWeight: 600, fontFamily: "inherit", cursor: "pointer" }}
      >
        Apply Now
      </button>
    </div>
  );
}

/* ----------------------------- page ----------------------------- */

export default function SchoolOfDesignLanding() {
  return (
    <div style={{ fontFamily: FONT, color: C.slate700, WebkitFontSmoothing: "antialiased" }}>
      <Header />
      <Hero />
      <Stats />
      <About />
      <Programs />
      <Careers />
      {/* <BscPrograms />
      <MscPrograms /> */}
      <Highlights />
      <CampusLife />
      <Showcase />

      <Process />
      <Recruiters />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyMobileBar />
    </div>
  );
}