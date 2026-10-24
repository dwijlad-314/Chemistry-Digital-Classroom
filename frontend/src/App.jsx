import VirtualLab from "./VirtualLab";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [lessons, setLessons] = useState([]);
  const [status, setStatus] = useState("Connecting...");
  const [search, setSearch] = useState("");
  const [showLab, setShowLab] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/lessons")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load lessons");
        }
        return response.json();
      })
      .then((data) => {
        setLessons(data.lessons);
        setStatus("Connected to Python backend");
      })
      .catch(() => {
        setStatus("Backend connection failed");
      });
  }, []);

  const filteredLessons = lessons.filter((lesson) =>
    lesson.title.toLowerCase().includes(search.toLowerCase())
  );

  if (showLab) {
  return (
    <div>
      <button onClick={() => setShowLab(false)}>
        ← Back to Dashboard
      </button>
      <VirtualLab />
    </div>
  );
}

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#home">
          <span className="brand-icon">⚗</span>
          <span>Chem<span className="brand-light">Space</span></span>
        </a>

        <p className="nav-heading">LEARNING SPACE</p>
        <nav className="navigation">
          <a className="nav-link active" href="#home">⌂ <span>Dashboard</span></a>
          <a className="nav-link" href="#lessons">▤ <span>My Lessons</span></a>
          <a className="nav-link" href="#explore">⚛ <span>Explore Chemistry</span></a>
          <a className="nav-link" href="#progress">◷ <span>My Progress</span></a>
          <a
  className="nav-link"
  href="#virtual-lab"
  onClick={(event) => {
    event.preventDefault();
    setShowLab(true);
  }}
>
  🧪 <span>Virtual Lab</span>
</a>
        </nav>

        <div className="sidebar-note">
          <span className="note-icon">💡</span>
          <h3>Curiosity starts here</h3>
          <p>Every great discovery begins with a question.</p>
        </div>

        <div className="sidebar-footer">Digital Chemistry Classroom</div>
      </aside>

      <main className="main-content" id="home">
        <header className="topbar">
          <div>
            <p className="eyebrow">YOUR LEARNING SPACE</p>
            <h2>Student Dashboard</h2>
          </div>
          <div className="connection">
            <span className={status === "Connected to Python backend" ? "status-dot online" : "status-dot"}></span>
            <span>{status}</span>
          </div>
        </header>

        <section className="hero">
          <div className="hero-copy">
            <span className="hero-tag">WELCOME, EXPLORER</span>
            <h1>Discover the world<br />of chemistry.</h1>
            <p>Understand the tiny building blocks that make up our universe. Your next discovery starts here.</p>
            <a className="primary-button" href="#lessons">Explore my lessons <span>→</span></a>
          </div>
          <div className="atom-art" aria-label="Decorative atom illustration">
            <div className="orbit orbit-one"></div>
            <div className="orbit orbit-two"></div>
            <div className="orbit orbit-three"></div>
            <div className="nucleus"></div>
            <span className="electron electron-one"></span>
            <span className="electron electron-two"></span>
            <span className="electron electron-three"></span>
          </div>
          <span className="hero-decoration decoration-one">H₂O</span>
          <span className="hero-decoration decoration-two">NaCl</span>
        </section>

        <section className="stats-grid" id="progress">
          <article className="stat-card">
            <div className="stat-icon purple">▤</div>
            <div><p>Available lessons</p><h3>{lessons.length}</h3></div>
          </article>
          <article className="stat-card">
            <div className="stat-icon green">⚛</div>
            <div><p>Learning topics</p><h3>{lessons.length}</h3></div>
          </article>
          <article className="stat-card">
            <div className="stat-icon orange">✦</div>
            <div><p>Your next goal</p><h3>Start learning</h3></div>
          </article>
        </section>

        <section className="lessons-section" id="lessons">
          <div className="section-heading">
            <div>
              <p className="eyebrow">BUILD YOUR KNOWLEDGE</p>
              <h2>Continue exploring</h2>
            </div>
            <span className="lesson-count">{lessons.length} lessons</span>
          </div>

          <input
            className="lesson-search"
            type="search"
            placeholder="Search chemistry lessons..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search chemistry lessons"
          />

          {status === "Backend connection failed" ? (
            <p className="message">Cannot load lessons. Check that your FastAPI server is running.</p>
          ) : filteredLessons.length === 0 ? (
            <p className="message">
              {lessons.length === 0 ? "Loading your lessons..." : "No lessons match your search."}
            </p>
          ) : (
            <div className="lesson-grid">
              {filteredLessons.map((lesson, index) => (
                <article className="lesson-card" key={lesson.id}>
                  <div className={`lesson-art art-${index % 3}`}>
                    <span>{["⚛", "▦", "◈"][index % 3]}</span>
                    <small>TOPIC 0{index + 1}</small>
                  </div>
                  <div className="lesson-details">
                    <p className="lesson-category">CHEMISTRY FUNDAMENTALS</p>
                    <h3>{lesson.title}</h3>
                    <p className="lesson-description">
                      Build your understanding of {lesson.title.toLowerCase()}.
                    </p>
                    <button
                      className="lesson-button"
                      onClick={() => alert(`"${lesson.title}" lesson content is coming soon!`)}
                    >
                      View lesson <span>→</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="explore-banner" id="explore">
          <div>
            <p className="eyebrow">COMING UP</p>
            <h2>Science is better when you explore.</h2>
            <p>Interactive models and chemistry activities will be added here next.</p>
          </div>
          <span className="banner-symbol">🧪</span>
        </section>

        <footer className="page-footer">
          Made for curious minds · Digital Chemistry Classroom
        </footer>
      </main>
    </div>
  );
}

export default App;