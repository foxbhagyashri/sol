import { useEffect, useState } from "react";

/* ------------------------------------------------------------------
   SETUP
   1. Unzip law-images.zip and copy the  law  folder into your project's
      /public folder, so files live at  public/law/hero.jpg  etc.
   2. Fill in CONFIG below (phone number, lead endpoint, Google Ads
      conversion). Search this file for "VERIFY" to find every line of
      copy that must be checked against sol.sandipuniversity.edu.in.
   3. Add your Google Ads global site tag (gtag.js) to index.html.
------------------------------------------------------------------- */

const CONFIG = {
    phone: "+91-XXXXXXXXXX", // REPLACE
    phoneHref: "tel:+91XXXXXXXXXX", // REPLACE
    session: "2026–27", // VERIFY
    // POST endpoint that receives the lead as JSON (CRM, Zapier, Google
    // Apps Script, your own API). Leave empty to only log to the console.
    leadEndpoint: "",
    // Google Ads conversion, e.g. "AW-1234567890/AbCdEfGhIj"
    googleAdsSendTo: "",
};

const IMG = {
    hero: "/hero.jpg", // mock trial in the moot court, students watching
    about: "/about.jpg", // faculty and students under the School of Law sign
    baLlb: "/ba-llb.jpg", // campus building
    bbaLlb: "/bba-llb.jpg", // campus building with flowering trees
    llm: "/llm.jpg", // campus building with hills behind
    moot1: "/moot-1.jpg", // moot court, front view
    moot2: "/moot-2.jpg", // moot court, counsel tables and gallery
    moot3: "/moot-3.jpg", // moot court, angled view
    moot4: "/moot-4.jpg", // mock trial in progress
    faculty: "/faculty.jpg", // faculty group at the School of Law sign
    students: "/students.jpg", // students group photo
    session1: "/session-1.jpg", // classroom session
    session2: "/session-2.jpg", // classroom session, angled
};

const PROGRAMMES = [
    {
        name: "BA LL.B.",
        level: "Integrated · 5 years", // VERIFY
        img: IMG.baLlb,
        alt: "Academic building on the Sandip University campus with a lawn in front",
        blurb:
            "An integrated degree that pairs arts and social science subjects with core legal study. Suited to litigation, the judiciary, civil services and public policy.", // VERIFY
        eligibility: "10+2 from a recognised board", // VERIFY
    },
    {
        name: "BBA LL.B.",
        level: "Integrated · 5 years", // VERIFY
        img: IMG.bbaLlb,
        alt: "Sandip University academic block seen through flowering trees",
        blurb:
            "Business management studied alongside law. Suited to corporate practice, compliance, contracts and commercial advisory work.", // VERIFY
        eligibility: "10+2 from a recognised board", // VERIFY
    },
    {
        name: "LL.M. (Business Law)", // VERIFY exact name
        level: "Postgraduate", // VERIFY duration
        img: IMG.llm,
        alt: "School of Law building with the hills of Nashik in the background",
        blurb:
            "Advanced study of business and commercial law for graduates moving into corporate counsel roles, consultancy, research or teaching.", // VERIFY
        eligibility: "LL.B. from a recognised university", // VERIFY
    },
];

const TRUST = [
    { big: "BCI", small: "Approved by the Bar Council of India" },
    { big: "Moot court", small: "Purpose-built hall on campus" },
    { big: "3", small: "Law programmes to choose from" },
    { big: "Nashik", small: "Campus on Trimbak Road" },
];

const WHY = [
    {
        title: "Approved by the Bar Council of India",
        text: "The School of Law is approved by the Bar Council of India, the regulator of legal education in the country.",
    },
    {
        title: "A moot court hall of its own",
        text: "Bench, bar, witness box and public gallery. Students argue in a proper courtroom, not a converted classroom.",
    },
    {
        title: "Faculty who mentor",
        text: "Teachers guide students through research, drafting and advocacy, and stay involved from the first year to the last.", // VERIFY
    },
    {
        title: "Law in the community",
        text: "Faculty-led awareness sessions on subjects such as cyber safety and online gaming put classroom law to public use.", // VERIFY
    },
    {
        title: "Practice built into the syllabus",
        text: "Mock trials, client counselling and drafting exercises sit inside the curriculum, alongside the statute books.", // VERIFY
    },
    {
        title: "A campus made for study",
        text: "Spacious academic blocks, open lawns and the Nashik hills as a backdrop, away from city noise.",
    },
];

const STEPS = [
    { t: "Enquire", d: "Send the form or call the admissions desk." },
    { t: "Counselling", d: "A counsellor calls to explain programmes, eligibility and fees." }, // VERIFY
    { t: "Apply", d: "Submit your application and academic documents." },
    { t: "Confirm your seat", d: "Complete the formalities and begin your law degree." },
];

const FAQS = [
    {
        q: "Is the School of Law approved by the Bar Council of India?",
        a: "Yes. The School of Law displays Bar Council of India approval on its entrance signage. Ask our counsellor for the approval details for your chosen programme.", // VERIFY
    },
    {
        q: "Who can apply for BA LL.B. and BBA LL.B.?",
        a: "Students who have completed 10+2 from a recognised board. Minimum marks and any entrance requirement are confirmed by the admissions team.", // VERIFY
    },
    {
        q: "Who can apply for the LL.M.?",
        a: "Graduates holding an LL.B. degree from a recognised university. Our counsellor will confirm the current criteria.", // VERIFY
    },
    {
        q: "What are the fees, and is a scholarship available?",
        a: "Fees differ by programme. A counsellor will share the current fee structure and any scholarship options when they call you.", // VERIFY
    },
    {
        q: "Can I visit the campus and the moot court hall?",
        a: "Yes. Request a callback and the admissions team will arrange a campus visit at a time that suits you.",
    },
];

const TRACKING_KEYS = [
    "gclid",
    "gbraid",
    "wbraid",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
];

function readTracking() {
    if (typeof window === "undefined") return {};
    const q = new URLSearchParams(window.location.search);
    const out = {};
    TRACKING_KEYS.forEach((k) => {
        if (q.get(k)) out[k] = q.get(k);
    });
    return out;
}

function goToForm() {
    document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth", block: "center" });
}

/* ------------------------------ form ------------------------------ */

function EnquiryForm({ idPrefix, programme, setProgramme, id }) {
    const [data, setData] = useState({ name: "", phone: "", email: "", city: "" });
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const [sent, setSent] = useState(false);

    const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setBusy(true);
        setError("");
        const payload = {
            ...data,
            programme,
            page: typeof window !== "undefined" ? window.location.href : "",
            submittedAt: new Date().toISOString(),
            ...readTracking(),
        };
        try {
            if (CONFIG.leadEndpoint) {
                const res = await fetch(CONFIG.leadEndpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
                if (!res.ok) throw new Error("Request failed");
            } else {
                console.log("Lead (no leadEndpoint set):", payload);
            }
            if (typeof window !== "undefined" && typeof window.gtag === "function" && CONFIG.googleAdsSendTo) {
                window.gtag("event", "conversion", { send_to: CONFIG.googleAdsSendTo });
            }
            setSent(true);
        } catch (err) {
            setError("Something went wrong. Please try again or call us on " + CONFIG.phone + ".");
        } finally {
            setBusy(false);
        }
    };

    if (sent) {
        return (
            <div className="form done" id={id}>
                <div className="tick" aria-hidden="true">✓</div>
                <h3>Thank you, {data.name.split(" ")[0] || "and welcome"}.</h3>
                <p className="sub">
                    An admissions counsellor will call you on {data.phone} shortly to discuss
                    the {programme || "law programmes"} at the School of Law.
                </p>
            </div>
        );
    }

    return (
        <form className="form" id={id} onSubmit={handleSubmit}>
            <h3>Request a callback</h3>
            <p className="sub">Admissions {CONFIG.session}. A counsellor will call you within one working day.</p>

            <div className="field">
                <label htmlFor={idPrefix + "-name"}>Full name</label>
                <input id={idPrefix + "-name"} name="name" autoComplete="name" required value={data.name} onChange={onChange} />
            </div>

            <div className="row">
                <div className="field">
                    <label htmlFor={idPrefix + "-phone"}>Mobile number</label>
                    <input
                        id={idPrefix + "-phone"}
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        required
                        pattern="[0-9+ \-]{10,15}"
                        title="Enter a 10 to 15 digit mobile number"
                        value={data.phone}
                        onChange={onChange}
                    />
                </div>
                <div className="field">
                    <label htmlFor={idPrefix + "-city"}>City</label>
                    <input id={idPrefix + "-city"} name="city" autoComplete="address-level2" value={data.city} onChange={onChange} />
                </div>
            </div>

            <div className="field">
                <label htmlFor={idPrefix + "-email"}>Email</label>
                <input id={idPrefix + "-email"} name="email" type="email" autoComplete="email" required value={data.email} onChange={onChange} />
            </div>

            <div className="field">
                <label htmlFor={idPrefix + "-prog"}>Programme of interest</label>
                <select id={idPrefix + "-prog"} required value={programme} onChange={(e) => setProgramme(e.target.value)}>
                    <option value="">Select a programme</option>
                    {PROGRAMMES.map((p) => (
                        <option key={p.name} value={p.name}>
                            {p.name}
                        </option>
                    ))}
                </select>
            </div>

            {error && <p className="err" role="alert">{error}</p>}

            <button type="submit" disabled={busy}>
                {busy ? "Sending…" : "Request a callback"}
            </button>
            <p className="fine">
                By submitting, you agree to be contacted by Sandip University about admissions by call, SMS or email.
            </p>
        </form>
    );
}

/* ------------------------------ page ------------------------------ */

export default function SchoolOfLaw() {
    const [programme, setProgramme] = useState("");
    const [openFaq, setOpenFaq] = useState(0);

    useEffect(() => {
        document.title = "School of Law, Sandip University Nashik | BA LL.B., BBA LL.B., LL.M. Admissions";
    }, []);

    const choose = (name) => {
        setProgramme(name);
        goToForm();
    };

    return (
        <div className="sol">
            <Styles />

            <header className="bar">
                <div className="wrap bar-in">
                    <div className="brand">
                        <span className="b1">Sandip University</span>
                        <span className="b2">School of Law</span>
                    </div>
                    <div className="bar-right">
                        <a className="bar-phone" href={CONFIG.phoneHref}>
                            {CONFIG.phone}
                        </a>
                        <button className="btn btn-red small" onClick={goToForm}>
                            Apply now
                        </button>
                    </div>
                </div>
            </header>

            <section className="hero">
                <img
                    className="hero-img"
                    src={IMG.hero}
                    alt="Law students conducting a mock trial in the moot court hall while classmates watch from the gallery"
                />
                <div className="hero-shade" />
                <div className="wrap hero-in">
                    <div className="hero-copy">
                        <span className="badge">
                            <i /> Admissions open {CONFIG.session}
                        </span>
                        <h1>Study law where the courtroom is part of the campus.</h1>
                        <p className="lede">
                            BCI-approved integrated and postgraduate law programmes at Sandip University, Nashik, taught
                            through mock trials, moot courts and faculty who mentor you at every stage.
                        </p>
                        <ul className="ticks">
                            <li>Approved by the Bar Council of India</li>
                            <li>Dedicated moot court hall</li>
                            <li>BA LL.B., BBA LL.B. and LL.M.</li>
                            <li>Campus on Trimbak Road, Nashik</li>
                        </ul>
                        <div className="hero-cta">
                            <a className="btn btn-ghost" href={CONFIG.phoneHref}>
                                Call {CONFIG.phone}
                            </a>
                        </div>
                    </div>
                    <EnquiryForm id="enquire" idPrefix="top" programme={programme} setProgramme={setProgramme} />
                </div>
            </section>

            <div className="trust">
                <div className="wrap trust-in">
                    {TRUST.map((t) => (
                        <div key={t.big}>
                            <b>{t.big}</b>
                            <span>{t.small}</span>
                        </div>
                    ))}
                </div>
            </div>

            <section className="about">
                <div className="wrap about-grid">
                    <figure>
                        <img
                            src={IMG.about}
                            alt="Faculty and students of the School of Law standing together in front of the school's entrance"
                            loading="lazy"
                        />
                    </figure>
                    <div>
                        <p className="kicker">About the school</p>
                        <h2>A law school that trains you to stand up and argue.</h2>
                        <p>
                            The School of Law at Sandip University prepares students for practice at the Bar, for corporate
                            legal teams, for the judiciary and for public service. The school is approved by the Bar Council
                            of India and sits on the university's campus on Trimbak Road, Nashik.
                        </p>
                        <p>
                            Teaching moves between the classroom and the courtroom. Students read the law, then draft it,
                            argue it and defend it in front of faculty and peers.
                        </p>
                        <button className="btn btn-dark" onClick={goToForm}>
                            Talk to a counsellor
                        </button>
                    </div>
                </div>
            </section>

            <section className="progs">
                <div className="wrap">
                    <div className="head">
                        <p className="kicker">Programmes</p>
                        <h2>Choose your route into the legal profession</h2>
                    </div>
                    <div className="prog-grid">
                        {PROGRAMMES.map((p) => (
                            <article className="prog" key={p.name}>
                                <img src={p.img} alt={p.alt} loading="lazy" />
                                <div className="prog-body">
                                    <span className="chip">{p.level}</span>
                                    <h3>{p.name}</h3>
                                    <p>{p.blurb}</p>
                                    <p className="elig">
                                        <b>Eligibility:</b> {p.eligibility}
                                    </p>
                                    <button className="btn btn-red" onClick={() => choose(p.name)}>
                                        Enquire about {p.name}
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="moot">
                <div className="wrap">
                    <div className="head light">
                        <p className="kicker">The moot court hall</p>
                        <h2>A real courtroom is part of the curriculum.</h2>
                        <p>
                            The school has its own moot court hall, with a bench, counsel tables, a witness box and a public
                            gallery. Students argue mock trials and appeals here, and practise the craft of advocacy long
                            before their first day in court.
                        </p>
                    </div>
                    <div className="moot-grid">
                        <figure className="m1">
                            <img src={IMG.moot1} alt="Moot court hall seen from the gallery, with the bench and counsel tables in front" loading="lazy" />
                            <figcaption>The bench and counsel tables, seen from the gallery</figcaption>
                        </figure>
                        <figure className="m4">
                            <img src={IMG.moot4} alt="Students arguing a mock trial in the moot court" loading="lazy" />
                            <figcaption>A mock trial in progress</figcaption>
                        </figure>
                        <figure className="m3">
                            <img src={IMG.moot3} alt="Angled view of the moot court bench, witness box and counsel tables" loading="lazy" />
                            <figcaption>Bench, counsel tables and witness box</figcaption>
                        </figure>
                        <figure className="m2">
                            <img src={IMG.moot2} alt="Moot court hall with counsel tables and public gallery seating" loading="lazy" />
                            <figcaption>Counsel tables and public gallery</figcaption>
                        </figure>
                    </div>
                </div>
            </section>

            <section className="why">
                <div className="wrap">
                    <div className="head">
                        <p className="kicker">Why the School of Law</p>
                        <h2>Six reasons students choose Sandip</h2>
                    </div>
                    <ol className="why-list">
                        {WHY.map((w, i) => (
                            <li key={w.title}>
                                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                                <div>
                                    <h3>{w.title}</h3>
                                    <p>{w.text}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className="faculty">
                <div className="wrap fac-grid">
                    <div>
                        <p className="kicker">Faculty</p>
                        <h2>Teachers who stay in the room with you.</h2>
                        <p>
                            The School of Law's faculty teach, mentor and judge your mock trials. Small studio-style
                            sessions mean questions get answered, drafts get marked properly, and arguments get challenged.
                        </p>
                        <button className="btn btn-red" onClick={goToForm}>
                            Speak to admissions
                        </button>
                    </div>
                    <figure>
                        <img
                            src={IMG.faculty}
                            alt="Faculty members of the School of Law standing in a row beside the school's signboard and the Constitution of India wall display"
                            loading="lazy"
                        />
                    </figure>
                </div>
            </section>

            <section className="life">
                <div className="wrap">
                    <div className="head">
                        <p className="kicker">Life at the school</p>
                        <h2>Sessions, seminars and a community of future lawyers</h2>
                    </div>
                    <div className="life-grid">
                        <figure className="l1">
                            <img src={IMG.students} alt="Group photograph of law students in formal black and white in front of the School of Law building" loading="lazy" />
                        </figure>
                        <figure className="l2">
                            <img src={IMG.session1} alt="Faculty addressing seated law students in a classroom, with a chalkboard behind them" loading="lazy" />
                        </figure>
                        <figure className="l3">
                            <img src={IMG.session2} alt="Faculty speaking to law students across a table, with cyber safety posters on the wall" loading="lazy" />
                        </figure>
                    </div>
                </div>
            </section>

            <section className="steps">
                <div className="wrap">
                    <div className="head">
                        <p className="kicker">Admissions {CONFIG.session}</p>
                        <h2>Four steps to your seat</h2>
                    </div>
                    <ol className="step-list">
                        {STEPS.map((s, i) => (
                            <li key={s.t}>
                                <span className="sn">{i + 1}</span>
                                <h3>{s.t}</h3>
                                <p>{s.d}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className="faq">
                <div className="wrap faq-wrap">
                    <div className="head">
                        <p className="kicker">Questions</p>
                        <h2>Before you apply</h2>
                    </div>
                    <div className="faq-list">
                        {FAQS.map((f, i) => (
                            <div className="faq-item" key={f.q}>
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                                    aria-expanded={openFaq === i}
                                >
                                    <span>{f.q}</span>
                                    <em aria-hidden="true">{openFaq === i ? "−" : "+"}</em>
                                </button>
                                {openFaq === i && <p>{f.a}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="final">
                <div className="wrap final-grid">
                    <div>
                        <p className="kicker light">Apply now</p>
                        <h2>Your first day in court can start here.</h2>
                        <p>
                            Seats in each programme are limited. Leave your details and an admissions counsellor will call you
                            with the eligibility, fee and campus-visit details.
                        </p>
                        <a className="btn btn-ghost" href={CONFIG.phoneHref}>
                            Or call {CONFIG.phone}
                        </a>
                    </div>
                    <EnquiryForm id="enquire-bottom" idPrefix="bottom" programme={programme} setProgramme={setProgramme} />
                </div>
            </section>

            <footer>
                <div className="wrap foot">
                    <div>
                        <div className="f1">Sandip University</div>
                        <div className="f2">School of Law</div>
                        <p>
                            At Post Mahiravani, Trimbak Road,
                            <br />
                            Tal. &amp; Dist. Nashik – 422213, Maharashtra
                        </p>
                    </div>
                    <div>
                        <a href={CONFIG.phoneHref}>{CONFIG.phone}</a>
                        <p className="legal">
                            © {new Date().getFullYear()} Sandip University. Programme details, eligibility and fees are
                            subject to change; confirm with the admissions office.
                        </p>
                    </div>
                </div>
            </footer>

            <div className="mbar">
                <a className="btn btn-ghost-dark" href={CONFIG.phoneHref}>
                    Call now
                </a>
                <button className="btn btn-red" onClick={goToForm}>
                    Apply now
                </button>
            </div>
        </div>
    );
}

/* ------------------------------ styles ------------------------------ */

function Styles() {
    return (
        <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@400;500;600;700&display=swap');

      .sol{
        --red:#A3172B; --red-d:#7F1121; --ink:#1B1F2A; --ink-2:#12151D;
        --paper:#F7F3EC; --paper-2:#EEE7DA; --brass:#C49A3A; --muted:#565C69;
        --line:rgba(27,31,42,.15);
        background:var(--paper); color:var(--ink);
        font-family:'Source Sans 3',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;
        font-size:17px; line-height:1.6; -webkit-font-smoothing:antialiased;
      }
      .sol *{box-sizing:border-box;}
      .sol img{display:block;max-width:100%;}
      .sol h1,.sol h2,.sol h3{font-family:'Libre Baskerville',Georgia,serif;font-weight:700;margin:0;letter-spacing:-.005em;}
      .sol p{margin:0;}
      .sol ol,.sol ul{margin:0;padding:0;list-style:none;}
      .sol figure{margin:0;}
      .sol .wrap{width:100%;max-width:1160px;margin:0 auto;padding:0 28px;}
      @media(max-width:640px){.sol .wrap{padding:0 18px;}}
      .sol section{padding:88px 0;}
      @media(max-width:640px){.sol section{padding:60px 0;}}
      .sol :focus-visible{outline:3px solid var(--brass);outline-offset:2px;}

      .sol .kicker{font-size:13px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--red);margin-bottom:14px;}
      .sol .kicker.light{color:#E9C46A;}
      .sol .head{max-width:680px;margin-bottom:48px;}
      .sol .head h2{font-size:clamp(1.8rem,3.6vw,2.6rem);line-height:1.18;}
      .sol .head p:not(.kicker){margin-top:16px;color:var(--muted);font-size:18px;}
      .sol .head.light h2{color:#fff;}
      .sol .head.light p:not(.kicker){color:#C9CCD6;}

      .sol .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:2px solid transparent;border-radius:3px;padding:14px 24px;font:700 15.5px/1.2 'Source Sans 3',sans-serif;text-decoration:none;cursor:pointer;transition:background .15s,color .15s,border-color .15s;}
      .sol .btn.small{padding:10px 18px;font-size:14.5px;}
      .sol .btn-red{background:var(--red);color:#fff;}
      .sol .btn-red:hover{background:var(--red-d);}
      .sol .btn-dark{background:var(--ink);color:#fff;margin-top:26px;}
      .sol .btn-dark:hover{background:#000;}
      .sol .btn-ghost{border-color:rgba(255,255,255,.55);color:#fff;background:transparent;}
      .sol .btn-ghost:hover{background:rgba(255,255,255,.12);}
      .sol .btn-ghost-dark{border-color:var(--ink);color:var(--ink);background:#fff;}

      /* top bar */
      .sol .bar{position:sticky;top:0;z-index:50;background:rgba(247,243,236,.96);backdrop-filter:blur(8px);border-bottom:1px solid var(--line);}
      .sol .bar-in{display:flex;align-items:center;justify-content:space-between;gap:16px;height:66px;}
      .sol .brand{display:flex;flex-direction:column;line-height:1.1;}
      .sol .b1{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--red);}
      .sol .b2{font-family:'Libre Baskerville',serif;font-weight:700;font-size:20px;}
      .sol .bar-right{display:flex;align-items:center;gap:18px;}
      .sol .bar-phone{font-weight:700;text-decoration:none;color:var(--ink);}
      @media(max-width:560px){.sol .bar-phone{display:none;}}

      /* hero */
      .sol .hero{position:relative;padding:0;overflow:hidden;background:var(--ink-2);color:#fff;}
      .sol .hero-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:35% 50%;}
      .sol .hero-shade{position:absolute;inset:0;background:linear-gradient(100deg,rgba(18,21,29,.94) 0%,rgba(18,21,29,.82) 42%,rgba(18,21,29,.45) 100%);}
      .sol .hero-in{position:relative;display:grid;grid-template-columns:1fr;gap:40px;align-items:center;padding-top:56px;padding-bottom:64px;}
      @media(min-width:980px){.sol .hero-in{grid-template-columns:1.15fr .85fr;gap:64px;padding-top:72px;padding-bottom:80px;}}
      .sol .badge{display:inline-flex;align-items:center;gap:9px;font-size:13px;font-weight:600;letter-spacing:.04em;padding:7px 14px;border:1px solid rgba(255,255,255,.35);border-radius:99px;background:rgba(255,255,255,.08);}
      .sol .badge i{width:7px;height:7px;border-radius:50%;background:var(--brass);display:inline-block;}
      .sol .hero h1{font-size:clamp(2.2rem,5vw,3.9rem);line-height:1.08;margin:22px 0 0;color:#fff;}
      .sol .lede{margin-top:20px;max-width:34em;font-size:19px;color:#DCDFE7;line-height:1.6;}
      .sol .ticks{margin-top:26px;display:grid;grid-template-columns:1fr;gap:10px 28px;font-weight:600;}
      @media(min-width:600px){.sol .ticks{grid-template-columns:1fr 1fr;}}
      .sol .ticks li{position:relative;padding-left:28px;}
      .sol .ticks li::before{content:"";position:absolute;left:0;top:.5em;width:14px;height:8px;border-left:2.5px solid var(--brass);border-bottom:2.5px solid var(--brass);transform:rotate(-45deg) translateY(-2px);}
      .sol .hero-cta{margin-top:30px;}

      /* form */
      .sol .form{background:#fff;color:var(--ink);border-radius:4px;padding:30px;box-shadow:0 26px 60px rgba(0,0,0,.35);border-top:5px solid var(--red);scroll-margin-top:90px;}
      .sol .form h3{font-size:24px;}
      .sol .form .sub{margin:8px 0 20px;font-size:15px;color:var(--muted);line-height:1.5;}
      .sol .field{margin-bottom:14px;}
      .sol .row{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
      @media(max-width:440px){.sol .row{grid-template-columns:1fr;gap:0;}}
      .sol .form label{display:block;font-size:13.5px;font-weight:700;margin-bottom:5px;}
      .sol .form input,.sol .form select{width:100%;min-height:48px;font:inherit;font-size:16px;color:var(--ink);background:#fff;border:1.5px solid #B9BCC5;border-radius:3px;padding:10px 12px;}
      .sol .form input:focus,.sol .form select:focus{outline:3px solid rgba(163,23,43,.35);border-color:var(--red);}
      .sol .form button[type=submit]{width:100%;margin-top:6px;min-height:52px;border:0;border-radius:3px;background:var(--red);color:#fff;font:700 16px 'Source Sans 3',sans-serif;cursor:pointer;}
      .sol .form button[type=submit]:hover{background:var(--red-d);}
      .sol .form button[disabled]{opacity:.7;cursor:progress;}
      .sol .form .fine{margin-top:12px;font-size:12.5px;color:var(--muted);line-height:1.5;}
      .sol .form .err{margin:0 0 12px;padding:10px 12px;background:#FBE9EC;color:#7F1121;border-radius:3px;font-size:14.5px;}
      .sol .form.done{text-align:center;padding:44px 30px;}
      .sol .tick{width:56px;height:56px;margin:0 auto 16px;border-radius:50%;background:var(--red);color:#fff;font-size:26px;display:flex;align-items:center;justify-content:center;}

      /* trust */
      .sol .trust{background:var(--ink);color:#fff;}
      .sol .trust-in{display:grid;grid-template-columns:repeat(2,1fr);}
      @media(min-width:820px){.sol .trust-in{grid-template-columns:repeat(4,1fr);}}
      .sol .trust-in div{padding:24px 20px;border-left:1px solid rgba(255,255,255,.14);}
      .sol .trust-in div:nth-child(odd){border-left:0;}
      @media(min-width:820px){.sol .trust-in div:nth-child(odd){border-left:1px solid rgba(255,255,255,.14);}.sol .trust-in div:first-child{border-left:0;}}
      .sol .trust-in b{display:block;font-family:'Libre Baskerville',serif;font-size:24px;color:#E9C46A;}
      .sol .trust-in span{font-size:14.5px;color:#C9CCD6;line-height:1.4;display:block;margin-top:2px;}

      /* about */
      .sol .about-grid{display:grid;gap:44px;align-items:center;}
      @media(min-width:900px){.sol .about-grid{grid-template-columns:1.05fr .95fr;gap:64px;}}
      .sol .about-grid img{width:100%;height:auto;border-radius:3px;box-shadow:0 18px 44px rgba(27,31,42,.2);}
      .sol .about h2{font-size:clamp(1.7rem,3.2vw,2.35rem);line-height:1.2;margin-bottom:18px;}
      .sol .about p:not(.kicker){color:var(--muted);margin-bottom:14px;font-size:18px;}

      /* programmes */
      .sol .progs{background:var(--paper-2);}
      .sol .prog-grid{display:grid;gap:26px;}
      @media(min-width:900px){.sol .prog-grid{grid-template-columns:repeat(3,1fr);}}
      .sol .prog{background:#fff;border:1px solid var(--line);border-radius:3px;overflow:hidden;display:flex;flex-direction:column;}
      .sol .prog img{width:100%;aspect-ratio:16/10;object-fit:cover;}
      .sol .prog-body{padding:24px;display:flex;flex-direction:column;flex:1;}
      .sol .chip{align-self:flex-start;font-size:12.5px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--red);border:1px solid var(--red);border-radius:99px;padding:4px 12px;}
      .sol .prog h3{font-size:24px;margin:14px 0 10px;}
      .sol .prog p{color:var(--muted);font-size:16.5px;}
      .sol .prog .elig{margin-top:12px;font-size:15px;color:var(--ink);}
      .sol .prog .btn{margin-top:auto;}
      .sol .prog .elig{margin-bottom:22px;}

      /* moot */
      .sol .moot{background:var(--ink-2);color:#fff;}
      .sol .moot .kicker{color:#E9C46A;}
      .sol .moot-grid{display:grid;grid-template-columns:1fr;gap:16px;}
      @media(min-width:820px){.sol .moot-grid{grid-template-columns:repeat(12,1fr);grid-auto-rows:330px;}
        .sol .m1{grid-column:span 8;}.sol .m4{grid-column:span 4;}.sol .m3{grid-column:span 4;}.sol .m2{grid-column:span 8;}}
      .sol .moot-grid figure{position:relative;overflow:hidden;border-radius:3px;min-height:220px;background:#000;}
      .sol .moot-grid img{width:100%;height:100%;object-fit:cover;transition:transform .6s ease;}
      .sol .moot-grid figure:hover img{transform:scale(1.03);}
      .sol .moot-grid figcaption{position:absolute;left:0;right:0;bottom:0;padding:34px 16px 14px;font-size:14.5px;font-weight:600;background:linear-gradient(0deg,rgba(0,0,0,.75),transparent);}

      /* why */
      .sol .why-list{display:grid;gap:0 56px;}
      @media(min-width:860px){.sol .why-list{grid-template-columns:1fr 1fr;}}
      .sol .why-list li{display:flex;gap:22px;padding:28px 0;border-top:1px solid var(--line);}
      .sol .num{font-family:'Libre Baskerville',serif;font-size:30px;font-weight:700;color:var(--brass);line-height:1;min-width:46px;}
      .sol .why-list h3{font-size:19px;margin-bottom:6px;line-height:1.3;}
      .sol .why-list p{color:var(--muted);font-size:16.5px;}

      /* faculty */
      .sol .faculty{background:var(--red-d);color:#fff;}
      .sol .fac-grid{display:grid;gap:44px;align-items:center;}
      @media(min-width:900px){.sol .fac-grid{grid-template-columns:.8fr 1.2fr;gap:64px;}}
      .sol .faculty h2{font-size:clamp(1.7rem,3.2vw,2.4rem);line-height:1.2;margin-bottom:18px;}
      .sol .faculty p:not(.kicker){color:#F0D7DB;font-size:18px;margin-bottom:28px;}
      .sol .faculty .kicker{color:#E9C46A;}
      .sol .faculty img{width:100%;height:auto;border-radius:3px;border:5px solid rgba(255,255,255,.9);}

      /* life */
      .sol .life-grid{display:grid;gap:16px;}
      @media(min-width:820px){.sol .life-grid{grid-template-columns:1.4fr 1fr;grid-template-rows:280px 280px;}
        .sol .l1{grid-row:span 2;}}
      .sol .life-grid figure{overflow:hidden;border-radius:3px;min-height:220px;}
      .sol .life-grid img{width:100%;height:100%;object-fit:cover;}
      .sol .l2 img{object-position:50% 55%;}
      .sol .l3 img{object-position:40% 40%;}

      /* steps */
      .sol .steps{background:var(--paper-2);}
      .sol .step-list{display:grid;gap:30px;}
      @media(min-width:760px){.sol .step-list{grid-template-columns:repeat(4,1fr);gap:26px;}}
      .sol .step-list li{border-top:3px solid var(--red);padding-top:18px;}
      .sol .sn{font-family:'Libre Baskerville',serif;font-size:34px;font-weight:700;color:var(--red);line-height:1;display:block;margin-bottom:12px;}
      .sol .step-list h3{font-size:19px;margin-bottom:6px;}
      .sol .step-list p{color:var(--muted);font-size:16.5px;}

      /* faq */
      .sol .faq-wrap{max-width:820px;}
      .sol .faq-item{border-top:1px solid var(--line);}
      .sol .faq-item:last-child{border-bottom:1px solid var(--line);}
      .sol .faq-item button{width:100%;display:flex;justify-content:space-between;align-items:center;gap:18px;text-align:left;background:none;border:0;padding:20px 0;font:700 18px/1.35 'Source Sans 3',sans-serif;color:var(--ink);cursor:pointer;}
      .sol .faq-item em{font-style:normal;font-size:26px;color:var(--red);flex:none;}
      .sol .faq-item p{padding:0 40px 22px 0;color:var(--muted);font-size:17px;}

      /* final */
      .sol .final{background:var(--ink-2);color:#fff;}
      .sol .final-grid{display:grid;gap:44px;align-items:center;}
      @media(min-width:900px){.sol .final-grid{grid-template-columns:1fr .85fr;gap:72px;}}
      .sol .final h2{font-size:clamp(1.9rem,3.8vw,2.8rem);line-height:1.15;margin-bottom:18px;}
      .sol .final p:not(.kicker){color:#C9CCD6;font-size:18px;margin-bottom:26px;max-width:32em;}
      .sol .final .form .sub{color:var(--muted);font-size:15px;margin:8px 0 20px;max-width:none;}
      .sol .final .form .fine{color:var(--muted);font-size:12.5px;margin:12px 0 0;max-width:none;}
      .sol .final .form .err{color:#7F1121;font-size:14.5px;margin:0 0 12px;max-width:none;}

      /* footer */
      .sol footer{background:#0B0D12;color:#A9AEBB;padding:48px 0 40px;font-size:15px;}
      .sol .foot{display:grid;gap:28px;}
      @media(min-width:760px){.sol .foot{grid-template-columns:1fr 1fr;}}
      .sol .f1{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#E9C46A;font-weight:700;}
      .sol .f2{font-family:'Libre Baskerville',serif;font-size:22px;color:#fff;margin-bottom:10px;}
      .sol footer a{color:#fff;font-weight:700;text-decoration:none;font-size:18px;}
      .sol .legal{margin-top:12px;font-size:13px;line-height:1.55;}

      /* sticky mobile bar */
      .sol .mbar{display:none;}
      @media(max-width:760px){
        .sol .mbar{display:grid;grid-template-columns:1fr 1fr;gap:10px;position:fixed;left:0;right:0;bottom:0;z-index:60;padding:10px 14px;background:var(--paper);border-top:1px solid var(--line);}
        .sol .mbar .btn{padding:13px 10px;}
        .sol footer{padding-bottom:96px;}
      }
      @media(prefers-reduced-motion:reduce){.sol *{transition:none!important;}}
    `}</style>
    );
}