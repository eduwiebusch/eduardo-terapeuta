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
