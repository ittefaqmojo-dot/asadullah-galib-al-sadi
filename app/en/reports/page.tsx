"use client";

import { useEffect, useState } from "react";

const API =
  "https://asadullahsadi.ct.ws/wp-json/wp/v2";

type WpPost = {
  id: number;
  date: string;
  link: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
};

function cleanHtml(html: string) {
  const div = document.createElement("div");
  div.innerHTML = html;

  return (
    div.textContent ||
    div.innerText ||
    ""
  ).trim();
}

export default function ReportsPage() {
  const [reports, setReports] =
    useState<WpPost[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);

  useEffect(() => {
    async function loadReports() {
      try {
        setLoading(true);
        setError(false);

        /*
         * প্রথমে Reports category খুঁজছি
         */

        const categoryResponse =
          await fetch(
            `${API}/categories?slug=reports`,
            {
              cache: "no-store",
            }
          );

        if (!categoryResponse.ok) {
          throw new Error(
            "Category request failed"
          );
        }

        const categories =
          await categoryResponse.json();

        if (
          !categories ||
          categories.length === 0
        ) {
          setReports([]);
          return;
        }

        const categoryId =
          categories[0].id;

        /*
         * Reports category-এর পোস্টগুলো
         */

        const postsResponse =
          await fetch(
            `${API}/posts?categories=${categoryId}&per_page=50`,
            {
              cache: "no-store",
            }
          );

        if (!postsResponse.ok) {
          throw new Error(
            "Posts request failed"
          );
        }

        const posts =
          await postsResponse.json();

        setReports(posts);
      } catch (err) {
        console.error(
          "WordPress Reports Error:",
          err
        );

        setError(true);
        setReports([]);
      } finally {
        setLoading(false);
      }
    }

    loadReports();
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#000e33",
        color: "#ffffff",
        padding:
          "40px 24px 80px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >

        {/* Back */}

        <a
          href="/"
          style={{
            display: "inline-block",
            color: "#f7d14a",
            textDecoration:
              "none",
            fontWeight: 700,
            fontSize: "16px",
            marginBottom:
              "70px",
          }}
        >
          ← Back to Home
        </a>

        {/* Header */}

        <header>

          <p
            style={{
              color: "#f7d14a",
              letterSpacing:
                "4px",
              fontWeight: 700,
              fontSize: "14px",
              margin: 0,
            }}
          >
            JOURNALISM ARCHIVE
          </p>

          <h1
            style={{
              fontFamily:
                "Georgia, serif",
              fontSize:
                "clamp(52px, 10vw, 100px)",
              lineHeight: 0.95,
              fontWeight: 400,
              margin:
                "18px 0 25px",
            }}
          >
            Reports
          </h1>

          <p
            style={{
              maxWidth: "680px",
              color: "#b9c3d8",
              fontSize: "19px",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Published reports and
            journalism work by
            Asadullah Galib Al Sadi.
          </p>

        </header>

        {/* Reports */}

        <section
          style={{
            marginTop: "65px",
          }}
        >

          {loading && (

            <div
              style={{
                borderTop:
                  "1px solid #29416b",
                borderBottom:
                  "1px solid #29416b",
                padding:
                  "45px 0",
                color:
                  "#b9c3d8",
                fontSize: "18px",
              }}
            >
              Loading reports...
            </div>

          )}

          {!loading &&
            error && (

              <div
                style={{
                  borderTop:
                    "1px solid #29416b",
                  borderBottom:
                    "1px solid #29416b",
                  padding:
                    "45px 0",
                  color:
                    "#b9c3d8",
                  fontSize: "18px",
                }}
              >
                Unable to load
                reports right now.
              </div>

            )}

          {!loading &&
            !error &&
            reports.length === 0 && (

              <div
                style={{
                  borderTop:
                    "1px solid #29416b",
                  borderBottom:
                    "1px solid #29416b",
                  padding:
                    "45px 0",
                  color:
                    "#b9c3d8",
                  fontSize: "18px",
                }}
              >
                No published reports
                found yet.
              </div>

            )}

          {!loading &&
            !error &&
            reports.length > 0 && (

              <div>

                {reports.map(
                  (
                    post,
                    index
                  ) => (

                    <article
                      key={post.id}
                      style={{
                        borderTop:
                          "1px solid #29416b",
                        padding:
                          "32px 0",
                      }}
                    >

                      <div
                        style={{
                          display:
                            "grid",
                          gridTemplateColumns:
                            "70px 1fr",
                          gap: "20px",
                        }}
                      >

                        <div
                          style={{
                            color:
                              "#f7d14a",
                            fontSize:
                              "15px",
                            fontWeight:
                              700,
                          }}
                        >
                          {String(
                            index + 1
                          ).padStart(
                            2,
                            "0"
                          )}
                        </div>

                        <div>

                          <h2
                            style={{
                              fontFamily:
                                "Georgia, serif",
                              fontSize:
                                "clamp(28px, 5vw, 48px)",
                              lineHeight:
                                1.15,
                              fontWeight:
                                400,
                              margin:
                                "0 0 15px",
                            }}
                          >
                            {cleanHtml(
                              post
                                .title
                                .rendered
                            )}
                          </h2>

                          <p
                            style={{
                              color:
                                "#b9c3d8",
                              fontSize:
                                "17px",
                              lineHeight:
                                1.7,
                              maxWidth:
                                "750px",
                              margin:
                                "0 0 18px",
                            }}
                          >
                            {cleanHtml(
                              post
                                .excerpt
                                .rendered
                            )}
                          </p>

                          <div
                            style={{
                              display:
                                "flex",
                              alignItems:
                                "center",
                              gap: "18px",
                              flexWrap:
                                "wrap",
                            }}
                          >

                            <span
                              style={{
                                color:
                                  "#7f8ca8",
                                fontSize:
                                  "14px",
                              }}
                            >
                              {new Date(
                                post.date
                              ).toLocaleDateString(
                                "en-US",
                                {
                                  year:
                                    "numeric",
                                  month:
                                    "long",
                                  day:
                                    "numeric",
                                }
                              )}
                            </span>

                            <a
                              href={
                                post.link
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display:
                                  "inline-flex",
                                alignItems:
                                  "center",
                                background:
                                  "#f7d14a",
                                color:
                                  "#000e33",
                                padding:
                                  "12px 18px",
                                textDecoration:
                                  "none",
                                fontWeight:
                                  700,
                                fontSize:
                                  "14px",
                              }}
                            >
                              Read report ↗
                            </a>

                          </div>

                        </div>

                      </div>

                    </article>

                  )
                )}

              </div>

            )}

        </section>

        {/* Footer */}

        <footer
          style={{
            marginTop:
              "70px",
            paddingTop:
              "25px",
            borderTop:
              "1px solid #29416b",
          }}
        >

          <p
            style={{
              color:
                "#7f8ca8",
              fontSize:
                "14px",
              lineHeight:
                1.7,
              margin: 0,
            }}
          >
            Asadullah Galib
            Al Sadi
            <br />
            Journalist &
            Multimedia Reporter
            <br />
            Daily Ittefaq ·
            Digital Department
          </p>

        </footer>

      </div>
    </main>
  );
}
