export default function Home() {
  return (
    <main className="landing-page">
      <div className="ambient-light" aria-hidden="true" />

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-mark" aria-hidden="true">
          <span />
        </div>

        <h1 id="hero-title">
          Você pode parar de usar drogas e aprender a viver uma{" "}
          <em>vida que vale a pena ser vivida</em>.
        </h1>

        <p>
          Sou terapeuta com foco em dependência química. Ajudo pessoas a
          entenderem por que usam, como mudar de verdade e como reconstruir uma
          vida com sentido.
        </p>

        <a
          className="primary-cta"
          href="https://wa.me/5592991673738"
          target="_blank"
          rel="noopener noreferrer"
        >
          Quero começar minha terapia
        </a>
      </section>
    </main>
  );
}
