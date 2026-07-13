export default function Home() {
  return (
    <main className="landing-page">
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="ambient-light" aria-hidden="true" />

        <div className="hero">
          <div className="hero-mark" aria-hidden="true">
            <span />
          </div>

          <h1 id="hero-title">
            Você pode parar de usar drogas e aprender a viver uma{" "}
            <em>vida que vale a pena ser vivida</em>.
          </h1>

          <p>
            Sou terapeuta com foco em dependência química. Ajudo pessoas a
            entenderem por que usam, como mudar de verdade e como reconstruir
            uma vida com sentido.
          </p>

          <a
            className="primary-cta"
            href="https://wa.me/5592991673738"
            target="_blank"
            rel="noopener noreferrer"
          >
            Quero começar minha terapia
          </a>
        </div>
      </section>

      <section className="story-section" aria-labelledby="story-title">
        <div className="story-grid">
          <figure className="story-media">
            <img
              src="/eduardo-terapeuta.jpeg"
              alt="Eduardo, terapeuta com foco em dependência química, sentado em seu escritório"
              width="1024"
              height="1280"
              loading="lazy"
            />
          </figure>

          <div className="story-content">
            <div className="story-mark" aria-hidden="true" />
            <h2 id="story-title">
              De quem entende o que você está passando.
            </h2>

            <div className="story-copy">
              <p>
                Comecei a usar drogas aos 15 anos, passei por várias substâncias
                e perdi empresas, casamento e saúde. Hoje estou sóbrio há 4
                anos.
              </p>
              <p>
                Estudo diariamente psicologia, comportamento humano e
                dependência química, e atendo pessoas que querem parar de usar e
                aprender a viver com propósito, consciência e liberdade.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
