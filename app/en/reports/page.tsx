
import Link from "next/link";

const API =
  "https://asadullahsadi.ct.ws/wp-json/wp/v2";

type WpCategory = {
  id: number;
  name: string;
  slug: string;
};

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

async function getReports(): Promise<WpPost[]> {
  try {
    const categoryResponse = await fetch(
      `${API}/categories?slug=reports`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!categoryResponse.ok) {
      return [];
    }

    const categories: WpCategory[] =
      await categoryResponse.json();

    if (!categories.length) {
      return [];
    }

    const categoryId = categories[0].id;

    const postsResponse = await fetch(
      `${API}/posts?categories=${categoryId}&per_page=50`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!postsResponse.ok) {
      return [];
    }

    return await postsResponse.json();
  } catch {
    return [];
  }
}

function cleanHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#038;/g, "&")
    .trim();
}

export default async function ReportsPage() {
  const reports = await getReports();

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#000e33",
        color: "#ffffff",
        padding: "40px 24px 80px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >

        {/* Back to Home */}

        <Link
          href="/"
          style={{
            display: "inline-block",
            color: "#f7d14a",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "15px",
            marginBottom: "70px",
          }}
        >
          ← Back to Home
        </Link>

        {/* Page Header */}

        <header>

          <p
            style={{
              color: "#f7d14a",
              letterSpacing: "3px",
              fontWeight: 700,
              fontSize: "14px",
              margin: 0,
            }}
          >
            JOURNALISM ARCHIVE
          </p>

          <h1
            style={{
              fontFamily: "Georgia, serif",
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
            Published reports and journalism work
            by Asadullah Galib Al Sadi.
          </p>

        </header>

        {/* Reports */}

        <section
          style={{
            marginTop: "65px",
          }}
        >

          {reports.length > 0 ? (

            <div
              style={{
                display: "grid",
                gap: "2px",
              }}
            >

              {reports.map(
                (post, index) => (

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
                        display: "grid",
                        gridTemplateColumns:
                          "70px 1fr",
                        gap: "20px",
                      }}
                    >

                      {/* Number */}

                      <div
                        style={{
                          color: "#f7d14a",
                          fontSize: "15px",
                          fontWeight: 700,
                        }}
                      >
                        {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </div>

                      {/* Content */}

                      <div>

                        <h2
                          style={{
                            fontFamily:
                              "Georgia, serif",
                            fontSize:
                              "clamp(28px, 5vw, 48px)",
                            lineHeight: 1.15,
                            fontWeight: 400,
                            margin:
                              "0 0 15px",
                          }}
                        >
                          {cleanHtml(
                            post.title
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
                            post.excerpt
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
                              gap: "8px",
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

          ) : (

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

        </section>

        {/* Footer */}

        <div
          style={{
            marginTop: "70px",
            paddingTop: "25px",
            borderTop:
              "1px solid #29416b",
          }}
        >

          <p
            style={{
              color: "#7f8ca8",
              fontSize: "14px",
              margin: 0,
            }}
          >
            Asadullah Galib Al Sadi
            <br />
            Journalist & Multimedia Reporter
            <br />
            Daily Ittefaq · Digital Department
          </p>

        </div>

      </div>
    </main>
  );
}
