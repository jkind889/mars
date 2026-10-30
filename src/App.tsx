import { useLayoutEffect, useRef, useState } from "react";
import { AsciiOcean } from "./vendor/ascii-sharks/react";
import { ThemeControl } from "./ThemeControl";
import { ProjectArchive, ProjectDetail } from "./Projects";
import { projects } from "./projectData";
import { useRoute } from "./useRoute";
import { PosterGallery } from "./Posters";
import { posters } from "./posterData";

export function App() {
  const [paused, setPaused] = useState(false);
  const hash = useRoute();
  const home = hash === "" || hash === "#introduction" || hash === "#contacts-heading";
  const archive = hash === "#/projects";
  const project = projects.find(item => hash === `#/projects/${item.slug}`);
  const poster = posters.find(item => hash === `#/posters/${item.slug}`);
  const posterGallery = hash === "#/posters" || Boolean(poster);
  const [selected, setSelected] = useState(project ?? projects[0]);
  const [layout, setLayout] = useState<"list" | "grid">("list");

  const previousHash = useRef(hash);

  useLayoutEffect(() => {
    document.title = home ? "Mars — Jova’ Kind" : `${project?.title ?? poster?.title ?? (archive ? "Projects" : posterGallery ? "Posters" : "Page not found")} — Mars`;
    const changed = previousHash.current !== hash;
    const withinGallery = posterGallery && (previousHash.current === "#/posters" || posters.some(item => previousHash.current === `#/posters/${item.slug}`));
    previousHash.current = hash;
    // The dialog owns focus; opening/closing a preview retains gallery scroll.
    if (withinGallery) return;
    if (!changed && hash !== "#contacts-heading") return;
    const target = document.getElementById(hash === "#contacts-heading" ? "contacts-heading" : "main-content");
    target?.focus({ preventScroll: true });
    if (hash === "#contacts-heading") target?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [hash, home, archive, project, poster, posterGallery]);

  return (
    <div className={`portfolio${home ? "" : " portfolio--projects"}`}>
      <AsciiOcean paused={paused} />
      <header className="site-header">
      <a className="skip-link" href="#main-content" onClick={(event) => {
        event.preventDefault();
        document.getElementById("main-content")?.focus();
      }}>skip to content</a>
        <a className="wordmark" href="#introduction" aria-label="Mars introduction">mars</a>
        <nav aria-label="Main navigation">
          <ul>
            <li><a href="#/projects" aria-current={!home && (archive || project) ? "page" : undefined}>projects</a></li>
            <li><a href="#/posters" aria-current={posterGallery ? "page" : undefined}>posters</a></li>
          </ul>
        </nav>
        <div className="header-controls">
          <button className="motion-toggle" type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>
            {paused ? "resume animation" : "pause animation"}
          </button>
          <span className="motion-status">reduced motion · still ocean</span>
          <ThemeControl />
        </div>
      </header>

      <main id="main-content" className={home ? "home-page" : "projects-page"} tabIndex={-1}>
        {home ? <>
        <section className="identity" aria-labelledby="name">
          <h1 id="name">Hello, I'm Jova' Kind.</h1>
          <p className="introduction-copy">
            CS major at Howard University, expected 2028. I am an incoming SWE intern
            at DFA (Dimensional Fund Advisors). Here's my portfolio!
          </p>
        </section>
        <section className="contacts" id="contacts-heading" aria-label="Contacts" tabIndex={-1}>
          <ul className="social-links">
            <li><a href="https://github.com/jkind889">github</a></li>
            <li>
              <span aria-hidden="true">/</span>
              <a href="https://www.linkedin.com/in/jova-kind-2a7996340/">linkedin</a>
            </li>
            <li>
              <span aria-hidden="true">/</span>
              <a href="/jova-kind-resume.pdf" target="_blank" rel="noopener noreferrer">
                resume<span className="sr-only"> (PDF, opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </section>
        </> : archive ? (
          <ProjectArchive selected={selected} onSelect={setSelected} layout={layout} onLayout={setLayout} />
        ) : project ? (
          <ProjectDetail project={project} />
        ) : posterGallery ? (
          <PosterGallery selected={poster} />
        ) : (
          <section className="not-found"><h1>page not found</h1><p>This page isn’t in the archive.</p><a href="#/projects">← all projects</a></section>
        )}
      </main>

      <footer className="site-footer">
        <span className="credit">
          <a href="https://github.com/stackedlol/ascii-sharks">ascii-sharks</a>
          {" · "}<a href="/ascii-sharks-LICENSE.txt">MIT</a>
        </span>
      </footer>
    </div>
  );
}
