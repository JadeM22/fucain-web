// Sprite SVG con todos los íconos de la página. Se usa con <Icono id="i-musica" />.
export default function Iconos() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <symbol id="estrella" viewBox="0 0 100 100">
        <g fill="currentColor">
          <rect x="43" y="2" width="14" height="96" rx="2" transform="rotate(8 50 50)" />
          <rect x="40" y="6" width="18" height="88" rx="2" transform="rotate(66 50 50)" />
          <rect x="44" y="4" width="13" height="92" rx="2" transform="rotate(128 50 50)" />
          <rect x="46" y="14" width="10" height="72" rx="2" transform="rotate(37 50 50)" />
        </g>
      </symbol>
      <symbol id="garabato" viewBox="0 0 120 120">
        <path d="M60 60c0-5 7-5 7 1s-9 9-14 2-2-16 9-16 20 9 20 22-13 24-28 22-28-15-28-32 17-32 37-32 38 17 38 40-20 42-46 40" />
      </symbol>
      <symbol id="i-musica" viewBox="0 0 24 24">
        <path d="M9 18V5l11-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="17" cy="16" r="3" />
      </symbol>
      <symbol id="i-teatro" viewBox="0 0 24 24">
        <path d="M3 4h11v7a5.5 5.5 0 0 1-11 0z" />
        <path d="M6.5 8.5h.01M10.5 8.5h.01M6.5 12.5c1.2 1.2 3.3 1.2 4.5 0" />
        <path d="M14 8h7v6a5.5 5.5 0 0 1-8 4.8" />
        <path d="M16.5 12h.01M19 12h.01M16.5 15.5c1 -.8 2.5 -.8 3.4 0" />
      </symbol>
      <symbol id="i-danza" viewBox="0 0 24 24">
        <circle cx="14" cy="4" r="2" /><path d="M13 7l-3 5 4 3-1 6M10 12l-5-1M14 15l5 2M13 7l5 2" />
      </symbol>
      <symbol id="i-visuales" viewBox="0 0 24 24">
        <path d="M12 3a9 9 0 1 0 0 18c1.6 0 2.2-1.1 1.6-2.2s-.4-2.3 1.2-2.3H17a4 4 0 0 0 4-4c0-5-4-9.5-9-9.5z" />
        <circle cx="7.5" cy="11" r="1" /><circle cx="10" cy="7" r="1" /><circle cx="15" cy="7.5" r="1" />
      </symbol>
      <symbol id="i-literatura" viewBox="0 0 24 24">
        <path d="M3 5h7a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H3zM21 5h-7a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h7z" />
      </symbol>
      <symbol id="i-cine" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4" />
      </symbol>
      <symbol id="i-ext" viewBox="0 0 24 24">
        <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </symbol>
      <symbol id="i-flecha" viewBox="0 0 24 24">
        <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </symbol>
      <symbol id="i-izq" viewBox="0 0 24 24">
        <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </symbol>
      <symbol id="i-der" viewBox="0 0 24 24">
        <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </symbol>
      <symbol id="i-descargar" viewBox="0 0 24 24">
        <path d="M12 4v11M7 11l5 5 5-5M5 20h14" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </symbol>
      <symbol id="i-play" viewBox="0 0 24 24">
        <path d="M7 4.5l13 7.5-13 7.500z" fill="currentColor" />
      </symbol>
      <symbol id="i-pausa" viewBox="0 0 24 24">
        <path d="M6.5 4.500h4v15h-4zM13.500 4.500h4v15h-4z" fill="currentColor" />
      </symbol>
      <symbol id="i-x" viewBox="0 0 24 24">
        <path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </symbol>
      <symbol id="i-uni" viewBox="0 0 24 24">
        <path d="M2 9l10-5 10 5-10 5zM6 11.5V16c0 1.5 3 3 6 3s6-1.500 6-3v-4.500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </symbol>
      <symbol id="i-artista" viewBox="0 0 24 24">
        <path d="M12 3l2.600 5.600 6.100.7-4.500 4.200 1.200 6L12 16.500 6.600 19.500l1.200-6L3.300 9.300l6.100-.7z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </symbol>
      <symbol id="i-escena" viewBox="0 0 24 24">
        <path d="M3 20h18M5 20V8l7-5 7 5v12M9 20v-6h6v6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </symbol>
      <symbol id="i-persona" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="3.4" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M4.5 20c0-4.4 3.4-7 7.5-7s7.5 2.6 7.5 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </symbol>
      <symbol id="i-corazon" viewBox="0 0 24 24">
        <path d="M12 19.5s-7.5-4.6-7.5-10A4.5 4.5 0 0 1 9 5c1.3 0 2.5.6 3 1.7.5-1.1 1.7-1.7 3-1.7a4.5 4.5 0 0 1 4.5 4.5c0 5.4-7.5 10-7.5 10z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </symbol>
      <symbol id="i-grupo" viewBox="0 0 24 24">
        <circle cx="9" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17" cy="9" r="2.4" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M3 20c0-3.8 2.7-6.2 6-6.2s6 2.4 6 6.2M15.5 20c0-2.8 1.8-4.6 4-4.6s4 1.8 4 4.6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </symbol>
    </svg>
  );
}
