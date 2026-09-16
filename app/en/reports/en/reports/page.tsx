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
    const categoryRes = await fetch(
      `${API}/categories?slug=reports`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!categoryRes.ok) {
      return [];
    }

    const categories: WpCategory[] =
      await categoryRes.json();

    if (!categories.length) {
      return [];
    }

    const categoryId = categories[0].id;

    const postsRes = await fetch(
      `${API}/posts?categories=${categoryId}&per_page=50`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!postsRes.ok) {
      return [];
    }

    return postsRes.json();
  } catch {
    return [];
  }
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
        <a
          href="/"
          style={{
            color: "#f7d14a",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          ← Back to Home
        </a>

        <div style={{ marginTop: "70px" }}>
          <p
            style={{
              color: "#f7d14a",
              letterSpacing: "3px",
              fontWeight: 700,
              fontSize: "14px",
            }}
          >
            REPORTS
          </p>

          <h1
            style={{
              fontSize: "clamp(48px, 8vw, 90px)",
              lineHeight: 1,
              margin: "15px 0 25px",
              fontFamily: "Georgia, serif",
            }}
          >
            Reports
          </h1>

          <p
            style={{
              maxWidth: "650px",
              color: "#b9c3d8",
              fontSize: "20px",
              lineHeight: 1.7,
            }}
          >
            Published reports and journalism work by
            Asadullah Galib Al Sadi.
          </p>
        </div>

        <div
          style={{
            marginTop: "60px",
            display: "grid",
            gap: "1px",
            background: "#29416b",
          }}
        >
          {reports.length > 0 ? (
            reports.map((post, index) => (
              <article
                key={post.id}
                style={{
                  background: "#000e33",
                  padding: "30px 20px",
                }}
              >
                <div
                  style={{
                    color: "#f7d14a",
                    fontSize: "14px",
                    fontWeight: 700,
                    marginBottom: "15px",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h2
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "clamp(28px, 5vw, 48px)",
                    lineHeight: 1.15,
                    margin: "0 0 15px",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: post.title.rendered,
                  }}
                />

                <div
                  style={{
                    color: "#b9c3d8",
                    fontSize: "17px",
                    lineHeight: 1.7,
                    marginBottom: "20px",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: post.excerpt.rendered,
                  }}
                />

                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    color: "#000e33",
                    background: "#f7d14a",
                    padding: "13px 20px",
                    textDecoration: "none",
                    fontWeight: 700,
                  }}
                >
                  READ REPORT ↗
                </a>
              </article>
            ))
          ) : (
            <div
              style={{
                background: "#000e33",
                padding: "40px 20px",
                color: "#b9c3d8",
              }}
            >
              No reports found yet.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
