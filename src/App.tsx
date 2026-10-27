import { useState } from "react";
import { AsciiOcean } from "./vendor/ascii-sharks/react";

export function App() {
  const [paused, setPaused] = useState(false);

  return (
    <div className="portfolio">
      <AsciiOcean paused={paused} />
      <a className="skip-link" href="#introduction">skip to introduction</a>
      <header className="site-header">
        <nav aria-label="Planned portfolio pages">
          <ul>
            {["projects", "posters", "about"].map((page) => (
              <li key={page}>
                <button type="button" disabled title={`${page} page is not built yet`}>
                  {page}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="introduction" tabIndex={-1}>
        <section className="identity" aria-labelledby="name">
          <h1 id="name">Jova’ Kind</h1>
          <p className="introduction-copy">
            I’m a computer science student at Howard University, building full-stack
            projects and exploring web development, data, and design.
          </p>
        </section>
        <section className="contacts" aria-labelledby="contacts-heading">
          <h2 id="contacts-heading">contacts</h2>
          <ul className="social-links">
            <li><a href="https://github.com/jkind889">GitHub</a></li>
            <li><span>LinkedIn <span className="link-pending">(link pending)</span></span></li>
          </ul>
        </section>
      </main>

      <footer className="site-footer">
        <button className="motion-toggle" type="button" onClick={() => setPaused((value) => !value)}>
          {paused ? "resume animation" : "pause animation"}
        </button>
        <span className="motion-status">reduced motion · still ocean</span>
        <span className="credit">
          <a href="https://github.com/stackedlol/ascii-sharks">ascii-sharks</a>
          {" · "}<a href="/ascii-sharks-LICENSE.txt">MIT</a>
        </span>
      </footer>
    </div>
  );
}
