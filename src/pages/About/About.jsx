import Header from "../../components/Header/Header";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";

// src/pages/About/About.jsx
const TEAM = [
  { id: 1, name: "Fatema Alzaki", role: "State Lead – Watchlist & Global State", img: "https://i.pravatar.cc/200?img=5",  bio: "Owns app-wide state, persistence, and data flow." },
  { id: 2, name: "Member 2",       role: "PM / GitHub Manager",                img: "https://i.pravatar.cc/200?img=8",  bio: "Coordinates repo, releases, merges, and planning." },
  { id: 3, name: "Member 3",       role: "UI Lead",                             img: "https://i.pravatar.cc/200?img=12", bio: "Design system, responsive layout, accessibility." },
  { id: 4, name: "Member 4",       role: "Layout Lead",                         img: "https://i.pravatar.cc/200?img=21", bio: "Nav, footer, 404, overall page structure." },
  { id: 5, name: "Member 5",       role: "Page Dev A",                          img: "https://i.pravatar.cc/200?img=32", bio: "Implements Search and supporting UI." },
  { id: 6, name: "Member 6",       role: "QA / API / Docs",                     img: "https://i.pravatar.cc/200?img=44", bio: "Testing, README, API helpers, bug fixes." },
];

export default function About() {
  return (
    <main className="container" style={{ padding: "1.5rem 1rem" }}>
      <h1>About the Team</h1>
      <p className="muted" style={{ marginBottom: 16 }}>
        We’re building a fast, clean Movie Explorer with React + Vite and OMDb.
      </p>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        {TEAM.map(m => (
          <article
            key={m.id}
            style={{
              border: "1px solid #1f2937",
              borderRadius: 12,
              overflow: "hidden",
              background: "var(--panel, #0b1324)",
            }}
          >
            <img
              src={m.img}
              alt={m.name}
              style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }}
            />
            <div style={{ padding: "0.75rem 1rem" }}>
              <h3 style={{ margin: 0 }}>{m.name}</h3>
              <p className="muted" style={{ margin: "4px 0 8px" }}>{m.role}</p>
              <p style={{ margin: 0 }}>{m.bio}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
