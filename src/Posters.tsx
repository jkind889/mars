import { useEffect, useRef, type MouseEvent } from "react";
import { posterHref, posterSlots, type Poster } from "./posterData";

export function PosterGallery({ selected }: { selected?: Poster }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const openedFromGallery = useRef<string | null>(null);

  function open(event: MouseEvent<HTMLAnchorElement>, poster: Poster) {
    // Preserve native new-tab and modified-click behavior.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    openedFromGallery.current = poster.slug;
  }

  function close() {
    if (selected && openedFromGallery.current === selected.slug) window.history.back();
    else window.location.replace("#/posters");
  }

  useEffect(() => {
    if (!selected) return;
    const modal = dialog.current;
    if (!modal) return;
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    modal.showModal();
    return () => {
      modal.close();
      document.documentElement.style.overflow = overflow;
      document.getElementById(`poster-${selected.slug}`)?.focus({ preventScroll: true });
    };
  }, [selected]);

  return (
    <section className="poster-gallery" aria-labelledby="posters-heading">
      <div className="poster-heading">
        <h1 id="posters-heading">posters</h1>
        <a className="poster-site-link" href="https://www.goneoffmars.com/" target="_blank" rel="noopener noreferrer">visit goneoffmars.com <span aria-hidden="true">↗︎</span><span className="sr-only"> (opens in a new tab)</span></a>
      </div>
      <ul className="poster-wall" aria-label="Poster gallery">
        {posterSlots.map((poster, index) => (
          <li className={`poster-slot poster-slot--${index + 1}`} key={poster?.slug ?? "forthcoming"}>
            {poster ? (
              <a id={`poster-${poster.slug}`} className="poster-tile" href={posterHref(poster)} onClick={event => open(event, poster)} aria-label={`Preview ${poster.title}`}>
                <span className="poster-frame">
                  <img src={`/posters/${poster.slug}-thumb.webp`} alt={poster.alt} width={poster.width} height={poster.height} loading={index < 2 ? "eager" : "lazy"} decoding="async" />
                </span>
                <span className="poster-caption">{poster.title}</span>
              </a>
            ) : (
              <div className="poster-tile poster-pending" aria-label="Third horizontal poster, artwork coming soon">
                <span className="poster-frame"><span>next poster<br /><span className="poster-pending-note">coming soon</span></span></span>
              </div>
            )}
          </li>
        ))}
      </ul>
      {selected ? (
        <dialog ref={dialog} className="poster-preview-dialog" aria-labelledby="poster-preview-title"
          onCancel={event => { event.preventDefault(); close(); }}
          onClick={event => { if (event.target === event.currentTarget) close(); }}
          onKeyDown={event => {
            if (event.key !== "Tab") return;
            const controls = event.currentTarget.querySelectorAll<HTMLElement>("button, a[href]");
            const first = controls[0];
            const last = controls[controls.length - 1];
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
          }}>
          <div className="poster-preview-content">
            <div className="poster-preview-heading">
              <h2 id="poster-preview-title">{selected.title}</h2>
              <button type="button" onClick={close} autoFocus aria-label="Close poster preview">close ×</button>
            </div>
            <img className="poster-full-image" src={`/posters/${selected.slug}.webp`} alt={selected.alt} width={selected.width} height={selected.height} />
            <a className="poster-product-link" href={selected.productUrl} target="_blank" rel="noopener noreferrer">view on goneoffmars.com <span aria-hidden="true">↗︎</span><span className="sr-only"> (opens in a new tab)</span></a>
          </div>
        </dialog>
      ) : null}
    </section>
  );
}
