'use client';

import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronRight, Menu, X } from "lucide-react";

const logo =
  "https://i.ibb.co.com/4nzkgPPt/20260916-121804.jpg";

const images = [
  "https://i.ibb.co.com/6050Yk2h/FB-IMG-1789535350131.jpg",
  "https://i.ibb.co.com/LDfs2p4Q/FB-IMG-1789535332845.jpg",
  "https://i.ibb.co.com/zTN1b6nj/FB-IMG-1789535279604.jpg",
];

const menuItems = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Reports", "#reports"],
  ["Features", "#features"],
  ["Photography", "#photography"],
  ["Videos", "#videos"],
  ["Field Work", "#field-work"],
  ["FAQ", "#faq"],
  ["Contact", "#contact"],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const go = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 10);
  };

  return (
    <main id="home">
      <header className="site-header">
        <button
          className="brand"
          aria-label="Go to homepage"
          onClick={() => go("#home")}
        >
          <img src={logo} alt="Asadullah Galib Al Sadi logo" />
        </button>

        <button
          className="menu-button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={31} strokeWidth={1.8} />
        </button>
      </header>

      {menuOpen && (
        <div className="menu-layer" role="dialog" aria-modal="true">
          <div className="menu-top">
            <img src={logo} alt="" />
            <button
              className="close-button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <X size={34} strokeWidth={1.7} />
            </button>
          </div>

          <nav className="menu-nav">
            <div className="language-switch">
              <button className="active" type="button">EN</button>
              <button type="button">বাংলা</button>
            </div>

            {menuItems.map(([label, href]) => (
              <button
                key={href}
                className="menu-link"
                onClick={() => go(href)}
              >
                <span>{label}</span>
                <ArrowUpRight size={21} strokeWidth={1.7} />
              </button>
            ))}
          </nav>
        </div>
      )}

      <section className="hero section">
        <div className="hero-copy">
          <p className="eyebrow">JOURNALIST &amp; MULTIMEDIA REPORTER</p>
          <h1>
            Hello, I&apos;m
            <br />
            Asadullah
            <br />
            Galib Al Sadi.
          </h1>
          <p className="intro">
            Bangladesh-based journalist and multimedia reporter covering
            politics, national affairs, field reporting and major events
            across the country.
          </p>

          <div className="hero-actions">
            <button className="button primary" onClick={() => go("#reports")}>
              VIEW REPORTS <ArrowUpRight size={19} />
            </button>
            <button className="button secondary" onClick={() => go("#about")}>
              ABOUT ME <ArrowUpRight size={19} />
            </button>
          </div>

          <div className="meta-row">
            <span><strong>Daily Ittefaq</strong>, Digital Department</span>
            <span>Dhaka, Bangladesh</span>
          </div>
        </div>

        <div className="hero-image-wrap">
          <img
            src={images[0]}
            alt="Asadullah Galib Al Sadi"
            className="hero-image"
          />
        </div>
      </section>

      <section className="statement section">
        <p className="section-kicker">01 / PROFILE</p>
        <h2>
          Reporting from the field,
          <br />
          beyond the daily headline.
        </h2>
      </section>

      <section id="about" className="about section">
        <div className="section-heading">
          <p className="section-kicker">02 / ABOUT</p>
          <h2>About me</h2>
        </div>
        <div className="about-grid">
          <p className="lead">
            I&apos;m a Bangladesh-based journalist and multimedia reporter
            working in the Digital Department of Daily Ittefaq.
          </p>
          <div className="body-copy">
            <p>
              My work combines reporting, field interviews, photography and
              digital video to document news and events as they unfold.
            </p>
            <p>
              I travel across Bangladesh for assignments and work across
              multiple formats, from breaking news and field reports to
              features and visual stories.
            </p>
          </div>
        </div>
      </section>

      <section id="reports" className="work section">
        <div className="section-heading split">
          <div>
            <p className="section-kicker">03 / WORK</p>
            <h2>Selected work</h2>
          </div>
          <button className="text-link" onClick={() => go("#contact")}>
            View archive <ArrowUpRight size={19} />
          </button>
        </div>

        <div className="work-grid">
          <article className="work-card large">
            <img src={images[1]} alt="Published reporting archive" />
            <div className="card-copy">
              <p className="card-label">REPORTS</p>
              <h3>Multimedia news reporting</h3>
              <p>Published work and field reporting archive.</p>
            </div>
          </article>

          <article id="features" className="work-card">
            <img src={images[2]} alt="Feature and field work archive" />
            <div className="card-copy">
              <p className="card-label">FEATURES</p>
              <h3>Stories from the field</h3>
              <p>Features, special coverage and on-location reporting.</p>
            </div>
          </article>

          <article id="photography" className="work-card">
            <img src={images[0]} alt="Photography archive" />
            <div className="card-copy">
              <p className="card-label">PHOTOGRAPHY</p>
              <h3>Visual journalism</h3>
              <p>Photography and visual documentation from assignments.</p>
            </div>
          </article>

          <article id="videos" className="work-card">
            <div className="video-placeholder">
              <span>▶</span>
            </div>
            <div className="card-copy">
              <p className="card-label">VIDEOS</p>
              <h3>Multimedia &amp; video</h3>
              <p>Video reporting, interviews and digital newsroom work.</p>
            </div>
          </article>
        </div>
      </section>

      <section id="field-work" className="field section">
        <div>
          <p className="section-kicker">04 / FIELD WORK</p>
          <h2>On assignment</h2>
        </div>
        <div className="field-list">
          {["Politics", "National affairs", "Major events", "Field reporting"].map(
            (item, index) => (
              <button key={item} className="field-item">
                <span>0{index + 1}</span>
                <strong>{item}</strong>
                <ChevronRight size={22} />
              </button>
            )
          )}
        </div>
      </section>

      <section id="faq" className="faq section">
        <p className="section-kicker">05 / FAQ</p>
        <h2>Frequently asked</h2>
        <details>
          <summary>What do you cover?</summary>
          <p>Politics, national affairs, field reporting and major events.</p>
        </details>
        <details>
          <summary>Where are you based?</summary>
          <p>Dhaka, Bangladesh.</p>
        </details>
        <details>
          <summary>Where can I find your published work?</summary>
          <p>The reports and multimedia archive will be added here.</p>
        </details>
      </section>

      <section id="contact" className="contact section">
        <p className="section-kicker">06 / CONTACT</p>
        <h2>Let&apos;s talk.</h2>
        <p>
          For reporting, media enquiries, professional collaborations or
          interview requests, please get in touch.
        </p>
        <div className="contact-line">
          <span>Journalist &amp; Multimedia Reporter</span>
          <span>Daily Ittefaq, Digital Department</span>
        </div>
      </section>

      <footer className="footer">
        <img src={logo} alt="Asadullah Galib Al Sadi" />
        <p>© {new Date().getFullYear()} Asadullah Galib Al Sadi</p>
        <button onClick={() => go("#home")}>Back to top ↑</button>
      </footer>
    </main>
  );
}
