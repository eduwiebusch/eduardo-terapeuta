import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the therapist landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();

  assert.match(html, /<html[^>]*lang="pt-BR"/i);
  assert.match(
    html,
    /<title>Eduardo \| Terapeuta em Dependência Química<\/title>/i,
  );
  assert.match(
    html,
    /Você pode parar de usar drogas e aprender a viver uma/,
  );
  assert.match(html, /<em>vida que vale a pena ser vivida<\/em>\./);
  assert.match(html, /href="https:\/\/wa\.me\/5592991673738"/);
  assert.match(html, />Quero começar minha terapia<\/a>/);
  assert.match(html, /src="\/eduardo-terapeuta\.jpeg"/);
  assert.match(html, /De quem entende o que você está passando\./);
  assert.match(
    html,
    /Comecei a usar drogas aos 15 anos, passei por várias substâncias e perdi empresas, casamento e saúde\. Hoje estou sóbrio há 4 anos\./,
  );
  assert.match(
    html,
    /Estudo diariamente psicologia, comportamento humano e dependência química, e atendo pessoas que querem parar de usar e aprender a viver com propósito, consciência e liberdade\./,
  );
  assert.match(html, /Como funciona o meu trabalho/);
  assert.match(
    html,
    /A dependência química é um transtorno psiquiátrico complexo\./,
  );
  assert.match(
    html,
    /Por isso, não existem soluções mágicas, fórmulas prontas ou promessas de transformação imediata\./,
  );
  assert.doesNotMatch(html, /não acredito em soluções rápidas/);
  assert.match(html, /Compreender o que mantém o ciclo/);
  assert.match(html, /Desenvolver novas formas de lidar com a vida/);
  assert.match(html, /Aprender também com as recaídas/);
  assert.match(html, /Repetir, ajustar e fortalecer/);
  assert.match(
    html,
    /Analisar uma recaída não significa normalizá-la\. Significa transformar uma experiência dolorosa em informação útil para fortalecer a recuperação\./,
  );
  assert.match(
    html,
    /O objetivo não é somente parar de usar drogas\. É construir uma vida com mais consciência, propósito e liberdade — uma vida na qual a sobriedade faça sentido e valha a pena ser vivida\./,
  );
  assert.match(html, /Dependência química não é falta de força de vontade/);
  assert.match(html, /Transtorno por Uso de Substâncias/);
  assert.match(html, /A gravidade não depende apenas da quantidade/);
  assert.match(
    html,
    /dois ou três indicam grau leve; quatro ou cinco, moderado; e seis ou mais, grave\./,
  );
  assert.match(html, />2–3 critérios<\/strong>/);
  assert.match(html, />4–5 critérios<\/strong>/);
  assert.match(html, />6 ou mais<\/strong>/);
  assert.match(html, /O quadro pode mudar/);
  assert.doesNotMatch(
    html,
    /Com o cuidado adequado, a dependência química pode ser tratada/,
  );
  assert.match(html, /Sessões e acompanhamento/);
  assert.match(html, /Sessão individual/);
  assert.match(html, />R\$ 120<\/strong>/);
  assert.match(html, /Aproximadamente 50 minutos/);
  assert.match(html, /Uma sessão por semana/);
  assert.match(html, /duas sessões por semana/);
  assert.match(html, /Pacote antecipado/);
  assert.match(html, />R\$ 400<\/strong>/);
  assert.doesNotMatch(html, /R\$ 100 por sessão/);
  assert.match(html, /Quatro sessões pagas antecipadamente/);
  assert.doesNotMatch(html, /Agendar sessão|Garantir pacote/i);
  assert.match(html, /Contato disponível 24 horas/);
  assert.match(html, /ligue para o SAMU pelo 192/);
  assert.match(html, /o CVV atende gratuitamente pelo 188/);
  assert.match(html, /Você não precisa enfrentar isso sozinho\./);
  assert.match(html, />Quero iniciar minha terapia<\/a>/);
  assert.match(html, /href="https:\/\/www\.instagram\.com\/eduwiebusch\/"/);
  assert.match(html, /aria-label="Instagram de Eduardo Wiebusch"/);
  assert.match(html, /href="https:\/\/www\.tiktok\.com\/@eduwiebusch"/);
  assert.match(html, /aria-label="TikTok de Eduardo Wiebusch"/);
  assert.match(
    html,
    /Sou terapeuta com foco em dependência química\. Ajudo pessoas a entenderem por que usam, como mudar de verdade e como reconstruir uma vida com sentido\./,
  );
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);

  const layout = await readFile(
    new URL("../app/layout.tsx", import.meta.url),
    "utf8",
  );
  assert.match(layout, /from "next\/font\/local"/);
  assert.doesNotMatch(layout, /next\/font\/google/);

  await Promise.all(
    [
      "Lato-Regular.ttf",
      "Lato-Italic.ttf",
      "Lato-Bold.ttf",
      "Lato-BoldItalic.ttf",
      "Lato-Black.ttf",
    ].map((font) => access(new URL(`../app/fonts/${font}`, import.meta.url))),
  );
});
