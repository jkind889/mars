import { projectHref, projects, type Project } from "./projectData";

function ProjectArrow() {
  return <svg viewBox="0 0 16 16" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true"><path d="M3 13 13 3M3 3h10v10" /></svg>;
}

const motifs: Record<string, string> = {
  record: "       .:::::::::.       \n    .::'         '::.    \n  .:'    .:::::.    ':.  \n ::    .:'     ':.    :: \n::    ::   o   ::     ::\n ::    ':.     .:'    :: \n  ':.    ':::::'    .:'  \n    '::.         .::'    \n       ':::::::::'       ",
  court: "+-----------------------+\n|           |           |\n|---.       |       .---|\n|   |     .---.     |   |\n| o |    (  +  )    | o |\n|   |     '---'     |   |\n|---'       |       '---|\n|           |           |\n+-----------------------+",
  type: "Aa",
};

export function ProjectCover({ project }: { project: Project }) {
  return (
    <figure className={`project-cover cover-${project.cover.motif}`}>
      {project.cover.image ? (
        <img src={project.cover.image} alt={project.cover.alt ?? project.title} />
      ) : (
        <div className="cover-art" aria-hidden="true">
          <span className="cover-title">{project.title}</span>
          <pre>{motifs[project.cover.motif]}</pre>
          <span className="cover-caption">{project.cover.caption}</span>
        </div>
      )}
      <figcaption>{project.cover.image ? project.cover.alt : "typographic cover · project imagery to come"}</figcaption>
    </figure>
  );
}

type ArchiveProps = {
  selected: Project;
  onSelect: (project: Project) => void;
  layout: "list" | "grid";
  onLayout: (layout: "list" | "grid") => void;
};

export function ProjectArchive({ selected, onSelect, layout, onLayout }: ArchiveProps) {
  return (
    <>
      <div className="archive-heading">
        <h1>projects</h1>
        <div className="archive-controls">
          <span>{String(projects.length).padStart(2, "0")} projects</span>
          <div className="layout-switch" role="group" aria-label="Project layout">
            {(["list", "grid"] as const).map(value => (
              <button key={value} type="button" aria-pressed={layout === value} onClick={() => onLayout(value)}>{value}</button>
            ))}
          </div>
        </div>
      </div>
      <div className={`project-archive archive-${layout}`}>
        <ol className="project-list">
          {projects.map((project, index) => (
            <li key={project.slug}>
              <a className={`project-entry${selected.slug === project.slug ? " is-selected" : ""}`}
                href={projectHref(project.slug)}
                onMouseEnter={() => onSelect(project)} onFocus={() => onSelect(project)}>
                <ProjectCover project={project} />
                <div className="entry-content">
                  <span className="project-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <div className="entry-copy">
                    <h2>{project.title}</h2>
                    <p>{project.summary}</p>
                    <span className="project-category">{project.category}</span>
                  </div>
                  <span className="entry-arrow"><ProjectArrow /></span>
                </div>
              </a>
            </li>
          ))}
        </ol>
        {layout === "list" && <aside className="project-preview" aria-label="Project preview">
          <a href={projectHref(selected.slug)} aria-label={`Read about ${selected.title}`}>
            <ProjectCover project={selected} />
            <span className="preview-action">explore {selected.title} <ProjectArrow /></span>
          </a>
        </aside>}
      </div>
    </>
  );
}

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <article>
      <a className="back-link" href="#/projects">← all projects</a>
      <div className="project-detail">
        <div className="detail-copy">
          <h1>{project.title}</h1>
          <p className="detail-summary">{project.summary}</p>
          <p className="project-category">{project.category}</p>
          {project.links && <ul className="project-links" aria-label={`${project.title} links`}>
            {project.links.map(link => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}
          </ul>}
          <section className="detail-section" aria-labelledby="overview-heading">
            <h2 id="overview-heading">overview</h2>
            <p>{project.overview}</p>
          </section>
          {project.contribution && <section className="detail-section" aria-labelledby="contribution-heading">
            <h2 id="contribution-heading">my contribution</h2>
            <p>{project.contribution}</p>
          </section>}
          <section className="detail-section" aria-labelledby="inside-heading">
            <h2 id="inside-heading">inside the project</h2>
            <dl className="project-features">
              {project.features.map(feature => <div key={feature.title}>
                <dt>{feature.title}</dt><dd>{feature.description}</dd>
              </div>)}
            </dl>
          </section>
          {project.decisions && <section className="detail-section" aria-labelledby="decisions-heading">
            <h2 id="decisions-heading">technical decisions</h2>
            <dl className="project-features">
              {project.decisions.map(decision => <div key={decision.title}>
                <dt>{decision.title}</dt><dd>{decision.description}</dd>
              </div>)}
            </dl>
          </section>}
          {project.results && <section className="detail-section" aria-labelledby="results-heading">
            <h2 id="results-heading">engineering results</h2>
            <dl className="project-features">
              {project.results.changes.map(change => <div key={change.href}>
                <dt><a href={change.href}>{change.title}</a></dt><dd>{change.description}</dd>
              </div>)}
            </dl>
            <p>{project.results.validation}</p>
          </section>}
          <section className="detail-section" aria-labelledby="tools-heading">
            <h2 id="tools-heading">built with</h2>
            <ul className="project-tools">{project.tools.map(tool => <li key={tool}>{tool}</li>)}</ul>
          </section>
          <p className="draft-note">{project.note ?? "Project notes are a working draft. Screenshots and a fuller walkthrough are still to come."}</p>
          <a className="back-link" href="#/projects">← all projects</a>
        </div>
        <div className="detail-visual"><ProjectCover project={project} /></div>
      </div>
    </article>
  );
}
