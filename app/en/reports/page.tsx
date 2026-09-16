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
  return (div.textContent || div.innerText || "").trim();
}

export default function ReportsPage() {
  const [reports, setReports] = useState<WpPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadReports() {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(
          `${API}/posts?categories=3&per_page=50`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load reports");
        }

        const data = await response.json();

        setReports(data);
      } catch (err) {
        console.error("WordPress Reports Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadReports();
  }, []);

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-[#000e33]">
      <section className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-20">

        <a
          href="/en/"
          className="mb-10 inline-block text-sm font-semibold text-[#0f2d5f]"
        >
          ← Back to Home
        </a>

        <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-[#0f2d5f]">
          JOURNALISM ARCHIVE
        </p>

        <h1 className="mb-4 text-4xl font-bold md:text-6xl">
          Reports
        </h1>

        <p className="mb-12 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
          Published reports and journalism work by Asadullah Galib Al Sadi.
        </p>

        {loading && (
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            Loading reports...
          </div>
        )}

        {error && (
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="mb-2 text-xl font-semibold">
              Unable to load reports right now.
            </h2>

            <p className="text-gray-600">
              Please try again in a moment.
            </p>
          </div>
        )}

        {!loading && !error && reports.length === 0 && (
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            No published reports found yet.
          </div>
        )}

        {!loading && !error && reports.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {reports.map((report) => (
              <article
                key={report.id}
                className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <p className="mb-3 text-sm font-medium text-gray-500">
                  {new Date(report.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                <h2 className="mb-3 text-2xl font-bold leading-tight">
                  {cleanHtml(report.title.rendered)}
                </h2>

                <p className="mb-6 leading-7 text-gray-600">
                  {cleanHtml(report.excerpt.rendered)}
                </p>

                <a
                  href={report.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#0f2d5f]"
                >
                  Read report ↗
                </a>
              </article>
            ))}
          </div>
        )}

      </section>
    </main>
  );
}                          "inline-flex",
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
