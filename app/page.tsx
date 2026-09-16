"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Camera,
  ChevronDown,
  ExternalLink,
  Menu,
  Play,
  X,
} from "lucide-react";

const LOGO =
  "https://i.ibb.co.com/4nzkgPPt/20260916-121804.jpg";

const IMAGES = [
  "https://i.ibb.co.com/6050Yk2h/FB-IMG-1789535350131.jpg",
  "https://i.ibb.co.com/LDfs2p4Q/FB-IMG-1789535332845.jpg",
  "https://i.ibb.co.com/zTN1b6nj/FB-IMG-1789535279604.jpg",
];

const WORDPRESS_API =
  "https://asadullahsadi.ct.ws/wp-json/wp/v2";

type WpPost = {
  id: number;
  date: string;
  slug: string;
  link: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
};

type WpCategory = {
  id: number;
  name: string;
  slug: string;
};

type Lang = "en" | "bn";

const copy = {
  en: {
    nav: [
      "Home",
      "About",
      "Reports",
      "Photography",
      "Multimedia",
      "Contact",
    ],

    eyebrow: "JOURNALIST · MULTIMEDIA REPORTER",

    title:
      "Reporting from the field. Telling the story.",

    intro:
      "Bangladesh-based journalist and multimedia reporter working in the Digital Department of Daily Ittefaq, covering politics, national affairs, field reporting and major events.",

    reports: "View reports",

    about: "About me",

    selected: "Selected work",

    selectedText:
      "A visual archive of reporting, field work and multimedia journalism.",

    viewAll: "Explore archive",

    aboutTitle: "About",

    aboutText:
      "I am a Bangladesh-based journalist and multimedia reporter working in the Digital Department of Daily Ittefaq in Dhaka. My work takes me across Bangladesh for assignments, field reporting and major events.",

    aboutText2:
      "I work across reporting, video, photography, mobile journalism and digital storytelling, with a focus on clear, factual and field-based coverage.",

    coverage: "Areas of coverage",

    coverageItems: [
      "Politics",
      "National affairs",
      "Field reporting",
      "Major events",
      "Multimedia journalism",
      "Public interest",
    ],

    field: "From the field",

    fieldText:
      "Reporting is often about being there. This section brings together field assignments and on-location work.",

    districts: "34 districts covered",

    photo: "Photography",

    photoText:
      "Selected photographs from reporting, assignments and everyday field work.",

    multimedia: "Multimedia",

    multimediaText:
      "Video reports, mobile journalism and digital storytelling.",

    features: "Features & special coverage",

    featuresText:
      "Long-form stories, special assignments and coverage beyond the daily headline.",

    faq: "FAQ",

    questions: [
      [
        "What do you cover?",
        "Politics, national affairs, field reporting, major events and multimedia journalism.",
      ],
      [
        "Where are you based?",
        "Dhaka, Bangladesh. Assignments may take me across the country.",
      ],
      [
        "Where can I find published work?",
        "The Reports, Features and Multimedia sections of this portfolio are being organised as a working archive.",
      ],
    ],

    contact: "Contact",

    contactText:
      "For reporting enquiries, professional collaborations, interviews or media-related communication, please get in touch.",

    footer:
      "Journalist & Multimedia Reporter · Dhaka, Bangladesh",

    menu: "Menu",

    latestReports: "Latest reports",

    noReports:
      "Published reports will appear here.",

    readReport: "Read report",
  },

  bn: {
    nav: [
      "হোম",
      "পরিচিতি",
      "রিপোর্ট",
      "ফটোগ্রাফি",
      "মাল্টিমিডিয়া",
      "যোগাযোগ",
    ],

    eyebrow: "সাংবাদিক · মাল্টিমিডিয়া রিপোর্টার",

    title:
      "মাঠ থেকে প্রতিবেদন। গল্পের গভীরে।",

    intro:
      "ঢাকায় দৈনিক ইত্তেফাকের ডিজিটাল বিভাগে কর্মরত বাংলাদেশি সাংবাদিক ও মাল্টিমিডিয়া রিপোর্টার। রাজনীতি, জাতীয় বিষয়, মাঠ প্রতিবেদন ও গুরুত্বপূর্ণ ঘটনা নিয়ে কাজ করি।",

    reports: "রিপোর্ট দেখুন",

    about: "পরিচিতি",

    selected: "নির্বাচিত কাজ",

    selectedText:
      "রিপোর্টিং, মাঠকাজ ও মাল্টিমিডিয়া সাংবাদিকতার নির্বাচিত আর্কাইভ।",

    viewAll: "আর্কাইভ দেখুন",

    aboutTitle: "আমার সম্পর্কে",

    aboutText:
      "আমি ঢাকায় দৈনিক ইত্তেফাকের ডিজিটাল বিভাগে কর্মরত একজন বাংলাদেশি সাংবাদিক ও মাল্টিমিডিয়া রিপোর্টার। অ্যাসাইনমেন্ট, মাঠ প্রতিবেদন ও গুরুত্বপূর্ণ ঘটনার কাজে দেশের বিভিন্ন স্থানে যেতে হয়।",

    aboutText2:
      "রিপোর্টিং, ভিডিও, ফটোগ্রাফি, মোবাইল জার্নালিজম ও ডিজিটাল স্টোরিটেলিং নিয়ে কাজ করি। তথ্যনির্ভর ও মাঠভিত্তিক সাংবাদিকতাকে গুরুত্ব দিই।",

    coverage: "কাজের ক্ষেত্র",

    coverageItems: [
      "রাজনীতি",
      "জাতীয় বিষয়",
      "মাঠ প্রতিবেদন",
      "গুরুত্বপূর্ণ ঘটনা",
      "মাল্টিমিডিয়া সাংবাদিকতা",
      "জনস্বার্থ",
    ],

    field: "মাঠ থেকে",

    fieldText:
      "সাংবাদিকতার একটি বড় অংশ হলো ঘটনাস্থলে থাকা। এই অংশে মাঠপর্যায়ের অ্যাসাইনমেন্ট ও কাজের আর্কাইভ থাকবে।",

    districts: "৩৪ জেলায় কাজের অভিজ্ঞতা",

    photo: "ফটোগ্রাফি",

    photoText:
      "রিপোর্টিং, অ্যাসাইনমেন্ট ও মাঠপর্যায়ের নির্বাচিত ছবি।",

    multimedia: "মাল্টিমিডিয়া",

    multimediaText:
      "ভিডিও রিপোর্ট, মোবাইল জার্নালিজম ও ডিজিটাল স্টোরিটেলিং।",

    features: "ফিচার ও বিশেষ কভারেজ",

    featuresText:
      "দীর্ঘ প্রতিবেদন, বিশেষ অ্যাসাইনমেন্ট ও দৈনন্দিন খবরের বাইরের কাজ।",

    faq: "সাধারণ প্রশ্ন",

    questions: [
      [
        "কী ধরনের বিষয় কভার করেন?",
        "রাজনীতি, জাতীয় বিষয়, মাঠ প্রতিবেদন, গুরুত্বপূর্ণ ঘটনা ও মাল্টিমিডিয়া সাংবাদিকতা।",
      ],
      [
        "কোথায় কাজ করেন?",
        "ঢাকায়। অ্যাসাইনমেন্টের প্রয়োজনে দেশের বিভিন্ন স্থানে কাজ করি।",
      ],
      [
        "প্রকাশিত কাজ কোথায় পাব?",
        "এই পোর্টফোলিওর রিপোর্ট, ফিচার ও মাল্টিমিডিয়া বিভাগে কাজগুলো ধীরে ধীরে সাজানো হচ্ছে।",
      ],
    ],

    contact: "যোগাযোগ",

    contactText:
      "রিপোর্টিং, পেশাগত সহযোগিতা, সাক্ষাৎকার বা মিডিয়া-সংক্রান্ত যোগাযোগের জন্য যোগাযোগ করতে পারেন।",

    footer:
      "সাংবাদিক ও মাল্টিমিডিয়া রিপোর্টার · ঢাকা, বাংলাদেশ",

    menu: "মেনু",

    latestReports: "সর্বশেষ রিপোর্ট",

    noReports:
      "প্রকাশিত রিপোর্ট এখানে দেখা যাবে।",

    readReport: "রিপোর্ট পড়ুন",
  },
};

function stripHtml(html: string) {
  if (typeof window === "undefined") {
    return html.replace(/<[^>]*>/g, "");
  }

  const div = document.createElement("div");
  div.innerHTML = html;

  return div.textContent || div.innerText || "";
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [openFaq, setOpenFaq] =
    useState<number | null>(null);

  const [wpPosts, setWpPosts] =
    useState<WpPost[]>([]);

  const [loadingReports, setLoadingReports] =
    useState(true);

  const t = copy[lang];

  useEffect(() => {
    document.documentElement.lang =
      lang === "bn" ? "bn" : "en";

    document.body.style.overflow =
      menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [lang, menuOpen]);

  useEffect(() => {
    async function loadWordPressPosts() {
      try {
        setLoadingReports(true);

        const categoryResponse =
          await fetch(
            `${WORDPRESS_API}/categories?per_page=100`,
            {
              cache: "no-store",
            }
          );

        if (!categoryResponse.ok) {
          throw new Error(
            "Could not load WordPress categories"
          );
        }

        const categories: WpCategory[] =
          await categoryResponse.json();

        const reportsCategory =
          categories.find(
            (category) =>
              category.slug === "reports"
          );

        if (!reportsCategory) {
          setWpPosts([]);
          return;
        }

        const postsResponse =
          await fetch(
            `${WORDPRESS_API}/posts?categories=${reportsCategory.id}&per_page=6&_embed`,
            {
              cache: "no-store",
            }
          );

        if (!postsResponse.ok) {
          throw new Error(
            "Could not load WordPress posts"
          );
        }

        const posts: WpPost[] =
          await postsResponse.json();

        setWpPosts(posts);
      } catch (error) {
        console.error(
          "WordPress API error:",
          error
        );

        setWpPosts([]);
      } finally {
        setLoadingReports(false);
      }
    }

    loadWordPressPosts();
  }, []);

  const closeMenu = () =>
    setMenuOpen(false);

  return (
    <main
      className={
        lang === "bn"
          ? "site bn"
          : "site"
      }
    >

      <header className="site-header">

        <a
          className="brand"
          href="#home"
          onClick={closeMenu}
          aria-label="Asadullah Galib Al Sadi"
        >
          <img
            src={LOGO}
            alt="Asadullah Galib Al Sadi logo"
          />
        </a>

        <nav
          className="desktop-nav"
          aria-label="Primary navigation"
        >
          {t.nav.map(
            (item, index) => (
              <a
                key={item}
                href={
                  [
                    "#home",
                    "#about",
                    "#reports",
                    "#photography",
                    "#multimedia",
                    "#contact",
                  ][index]
                }
              >
                {item}
              </a>
            )
          )}
        </nav>

        <div className="header-actions">

          <div
            className="lang-switch"
            aria-label="Language switcher"
          >

            <button
              className={
                lang === "en"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setLang("en")
              }
            >
              EN
            </button>

            <span>|</span>

            <button
              className={
                lang === "bn"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setLang("bn")
              }
            >
              বাংলা
            </button>

          </div>

          <button
            className="menu-button"
            onClick={() =>
              setMenuOpen(true)
            }
            aria-label={t.menu}
            aria-expanded={menuOpen}
          >
            <Menu
              size={27}
              strokeWidth={2.2}
            />
          </button>

        </div>

      </header>

      {menuOpen && (
        <div className="menu-layer">

          <button
            className="menu-backdrop"
            aria-label="Close menu"
            onClick={closeMenu}
          />

          <aside
            className="side-menu"
            aria-label="Mobile navigation"
          >

            <div className="side-menu-top">

              <span>{t.menu}</span>

              <button
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <X size={27} />
              </button>

            </div>

            <div className="side-language">

              <button
                className={
                  lang === "en"
                    ? "selected"
                    : ""
                }
                onClick={() =>
                  setLang("en")
                }
              >
                ENGLISH
              </button>

              <button
                className={
                  lang === "bn"
                    ? "selected"
                    : ""
                }
                onClick={() =>
                  setLang("bn")
                }
              >
                বাংলা
              </button>

            </div>

            <nav className="side-nav">

              {t.nav.map(
                (item, index) => (
                  <a
                    key={item}
                    href={
                      [
                        "#home",
                        "#about",
                        "#reports",
                        "#photography",
                        "#multimedia",
                        "#contact",
                      ][index]
                    }
                    onClick={closeMenu}
                  >
                    <span>
                      0{index + 1}
                    </span>

                    {item}
                  </a>
                )
              )}

            </nav>

            <div className="side-menu-footer">

              <span>
                ASADULLAH GALIB AL SADI
              </span>

              <small>
                Journalist & Multimedia Reporter
              </small>

            </div>

          </aside>

        </div>
      )}

      <section
        id="home"
        className="hero section-pad"
      >

        <div className="hero-copy">

          <p className="eyebrow">
            {t.eyebrow}
          </p>

          <h1>
            {t.title}
          </h1>

          <p className="hero-intro">
            {t.intro}
          </p>

          <div className="hero-meta">

            <span>
              Daily Ittefaq
            </span>

            <span>
              Digital Department
            </span>

            <span>
              Dhaka, Bangladesh
            </span>

          </div>

          <div className="hero-actions">

            <a
              className="button button-primary"
              href="#reports"
            >
              {t.reports}

              <ArrowUpRight
                size={17}
              />
            </a>

            <a
              className="button button-link"
              href="#about"
            >
              {t.about}
            </a>

          </div>

        </div>

        <div className="hero-image-wrap">

          <div className="hero-image-frame">

            <img
              src={IMAGES[0]}
              alt="Field reporting"
            />

          </div>

          <div className="hero-caption">

            <span>
              01
            </span>

            <span>
              {lang === "bn"
                ? "মাঠ প্রতিবেদন"
                : "FIELD REPORTING"}
            </span>

          </div>

        </div>

      </section>

      <section
        id="reports"
        className="section section-dark"
      >

        <div className="section-pad">

          <div className="section-heading">

            <div>

              <p className="eyebrow">

                {lang === "bn"
                  ? "আর্কাইভ"
                  : "ARCHIVE"}

              </p>

              <h2>
                {t.selected}
              </h2>

            </div>

            <p>
              {t.selectedText}
            </p>

          </div>

          <div className="work-grid">

            {[
              {
                image: IMAGES[0],
                no: "01",
                label:
                  lang === "bn"
                    ? "রিপোর্ট"
                    : "REPORTS",
              },

              {
                image: IMAGES[1],
                no: "02",
                label:
                  lang === "bn"
                    ? "ফিচার"
                    : "FEATURES",
              },

              {
                image: IMAGES[2],
                no: "03",
                label:
                  lang === "bn"
                    ? "মাঠকাজ"
                    : "FIELD WORK",
              },
            ].map(
              (item) => (
                <a
                  className="work-card"
                  href="#contact"
                  key={item.no}
                >

                  <div className="work-image">

                    <img
                      src={item.image}
                      alt={item.label}
                    />

                    <span className="card-number">
                      {item.no}
                    </span>

                    <span className="card-arrow">

                      <ArrowUpRight
                        size={19}
                      />

                    </span>

                  </div>

                  <div className="work-info">

                    <span>
                      {item.label}
                    </span>

                    <ExternalLink
                      size={16}
                    />

                  </div>

                </a>
              )
            )}

          </div>

          <div className="wp-reports">

            <div className="section-heading">

              <div>

                <p className="eyebrow">

                  {lang === "bn"
                    ? "WORDPRESS CMS"
                    : "WORDPRESS CMS"}

                </p>

                <h3>
                  {t.latestReports}
                </h3>

              </div>

            </div>

            {loadingReports ? (

              <div className="wp-report-status">
                {lang === "bn"
                  ? "রিপোর্ট লোড হচ্ছে..."
                  : "Loading reports..."}
              </div>

            ) : wpPosts.length > 0 ? (

              <div className="wp-report-list">

                {wpPosts.map(
                  (post) => (
                    <article
                      className="wp-report-card"
                      key={post.id}
                    >

                      <div className="wp-report-number">
                        {String(
                          post.id
                        ).padStart(
                          2,
                          "0"
                        )}
                      </div>

                      <div className="wp-report-content">

                        <h4>
                          {stripHtml(
                            post.title
                              .rendered
                          )}
                        </h4>

                        <p>
                          {stripHtml(
                            post.excerpt
                              .rendered
                          )}
                        </p>

                        <span className="wp-report-date">
                          {new Date(
                            post.date
                          ).toLocaleDateString(
                            lang === "bn"
                              ? "bn-BD"
                              : "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>

                      </div>

                      <a
                        className="wp-report-link"
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t.readReport}

                        <ArrowUpRight
                          size={17}
                        />
                      </a>

                    </article>
                  )
                )}

              </div>

            ) : (

              <div className="wp-report-status">
                {t.noReports}
              </div>

            )}

          </div>

          <a
            className="text-link"
            href="#contact"
          >
            {t.viewAll}

            <ArrowUpRight
              size={17}
            />
          </a>

        </div>

      </section>

      <section
        id="about"
        className="section section-light"
      >

        <div className="section-pad about-grid">

          <div>

            <p className="eyebrow dark">

              {lang === "bn"
                ? "পরিচিতি"
                : "PROFILE"}

            </p>

            <h2>
              {t.aboutTitle}
            </h2>

          </div>

          <div className="about-copy">

            <p>
              {t.aboutText}
            </p>

            <p>
              {t.aboutText2}
            </p>

          </div>

        </div>

        <div className="section-pad coverage">

          <div className="coverage-head">

            <p className="eyebrow dark">

              {lang === "bn"
                ? "ফোকাস"
                : "FOCUS"}

            </p>

            <h3>
              {t.coverage}
            </h3>

          </div>

          <div className="coverage-list">

            {t.coverageItems.map(
              (item, index) => (
                <div
                  key={item}
                >

                  <span>
                    0{index + 1}
                  </span>

                  <strong>
                    {item}
                  </strong>

                </div>
              )
            )}

          </div>

        </div>

      </section>

      <section
        id="field-work"
        className="section section-blue"
      >

        <div className="section-pad field-grid">

          <div>

            <p className="eyebrow">

              {lang === "bn"
                ? "অন দ্য রোড"
                : "ON ASSIGNMENT"}

            </p>

            <h2>
              {t.field}
            </h2>

            <p>
              {t.fieldText}
            </p>

            <div className="field-stat">

              <strong>
                {lang === "bn"
                  ? "৩৪"
                  : "34"}
              </strong>

              <span>
                {t.districts}
              </span>

            </div>

          </div>

          <div className="field-photo">

            <img
              src={IMAGES[2]}
              alt="Field assignment"
            />

            <span>
              Bangladesh
            </span>

          </div>

        </div>

      </section>

      <section
        id="photography"
        className="section section-light"
      >

        <div className="section-pad">

          <div className="section-heading">

            <div>

              <p className="eyebrow dark">

                <Camera size={15} />

                VISUALS

              </p>

              <h2>
                {t.photo}
              </h2>

            </div>

            <p>
              {t.photoText}
            </p>

          </div>

          <div className="photo-grid">

            {IMAGES.map(
              (src, index) => (
                <div
                  className={`photo-item photo-${index + 1}`}
                  key={src}
                >

                  <img
                    src={src}
                    alt={`Photography ${
                      index + 1
                    }`}
                  />

                </div>
              )
            )}

          </div>

        </div>

      </section>

      <section
        id="multimedia"
        className="section section-dark"
      >

        <div className="section-pad media-grid">

          <div>

            <p className="eyebrow">

              {lang === "bn"
                ? "ভিডিও ও ডিজিটাল"
                : "VIDEO & DIGITAL"}

            </p>

            <h2>
              {t.multimedia}
            </h2>

            <p>
              {t.multimediaText}
            </p>

          </div>

          <div className="media-card">

            <img
              src={IMAGES[1]}
              alt="Multimedia journalism"
            />

            <div className="media-overlay">

              <span className="play-icon">

                <Play
                  size={19}
                  fill="currentColor"
                />

              </span>

              <span>

                {lang === "bn"
                  ? "মাল্টিমিডিয়া কাজ"
                  : "MULTIMEDIA WORK"}

              </span>

            </div>

          </div>

        </div>

      </section>

      <section
        className="section section-blue"
      >

        <div className="section-pad feature-banner">

          <div>

            <p className="eyebrow">

              {lang === "bn"
                ? "বিশেষ কভারেজ"
                : "SPECIAL COVERAGE"}

            </p>

            <h2>
              {t.features}
            </h2>

          </div>

          <p>
            {t.featuresText}
          </p>

          <a
            className="circle-arrow"
            href="#contact"
            aria-label="Contact"
          >

            <ArrowUpRight
              size={25}
            />

          </a>

        </div>

      </section>

      <section
        id="faq"
        className="section section-light"
      >

        <div className="section-pad faq-grid">

          <div>

            <p className="eyebrow dark">

              {lang === "bn"
                ? "জানুন"
                : "INFORMATION"}

            </p>

            <h2>
              {t.faq}
            </h2>

          </div>

          <div className="faq-list">

            {t.questions.map(
              (
                [question, answer],
                index
              ) => (
                <div
                  className="faq-item"
                  key={question}
                >

                  <button
                    onClick={() =>
                      setOpenFaq(
                        openFaq === index
                          ? null
                          : index
                      )
                    }
                  >

                    <span>
                      {question}
                    </span>

                    <ChevronDown
                      className={
                        openFaq === index
                          ? "rotated"
                          : ""
                      }
                      size={20}
                    />

                  </button>

                  {openFaq === index && (
                    <p>
                      {answer}
                    </p>
                  )}

                </div>
              )
            )}

          </div>

        </div>

      </section>

      <section
        id="contact"
        className="section contact-section"
      >

        <div className="section-pad contact-inner">

          <p className="eyebrow">

            {lang === "bn"
              ? "যোগাযোগ"
              : "GET IN TOUCH"}

          </p>

          <h2>
            {t.contact}
          </h2>

          <p>
            {t.contactText}
          </p>

          <div className="contact-note">

            <span>

              {lang === "bn"
                ? "ইমেইল ও সোশ্যাল লিংক যোগ করা হবে"
                : "Email and verified social links can be added here."}

            </span>

          </div>

        </div>

      </section>

      <footer className="footer">

        <div className="footer-top">

          <img
            src={LOGO}
            alt="Asadullah Galib Al Sadi"
          />

          <div>

            <strong>
              Asadullah Galib Al Sadi
            </strong>

            <span>
              {t.footer}
            </span>

          </div>

          <a
            href="#home"
            className="back-top"
          >

            TOP

            <ArrowUpRight
              size={15}
            />

          </a>

        </div>

        <div className="footer-bottom">

          <span>
            ©{" "}
            {new Date().getFullYear()}{" "}
            Asadullah Galib Al Sadi
          </span>

          <span>
            Daily Ittefaq · Digital Department
          </span>

        </div>

      </footer>

    </main>
  );
}
