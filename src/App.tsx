import { AsciiOcean } from "./vendor/ascii-sharks/react";

export function App() {
  return (
    <main aria-label="ASCII fish animation">
      <AsciiOcean />
      <p className="instructions">
        <span className="motion-on">Move your pointer to stir the fish. Click or tap to splash.</span>
        <span className="motion-reduced">Still ocean — reduced motion is enabled.</span>
        <span className="credit">
          Animation by <a href="https://github.com/stackedlol/ascii-sharks">ascii-sharks</a>
          {" · "}<a href="/ascii-sharks-LICENSE.txt">MIT license</a>
        </span>
      </p>
    </main>
  );
}
