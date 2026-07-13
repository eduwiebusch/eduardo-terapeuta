import assert from "node:assert/strict";
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
  assert.match(
    html,
    /Sou terapeuta com foco em dependência química\. Ajudo pessoas a entenderem por que usam, como mudar de verdade e como reconstruir uma vida com sentido\./,
  );
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});
