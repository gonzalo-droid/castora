// Capturas de revisión en móvil (iPhone 13) y escritorio (1280 px).
// Uso: node .claude/skills/castora-ux-ui/scripts/capturas.js [rutas...] [--base http://localhost:3100] [--out dir]
// Toma una captura por pantallazo bajando de a poco, para que las animaciones de entrada alcancen a mostrarse,
// e informa si hay scroll horizontal o errores de JavaScript.
const { chromium, devices } = require("playwright");
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const opt = (name, def) => {
  const i = args.indexOf(name);
  return i >= 0 ? args.splice(i, 2)[1] : def;
};
const base = opt("--base", "http://localhost:3100");
const out = opt("--out", path.join(process.env.TMPDIR || "/tmp", "castora-capturas"));
const routes = args.length ? args : ["/", "/productos/zapatero-melina", "/nosotros", "/contacto"];

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const configs = [
    { name: "movil", ctx: { ...devices["iPhone 13"], deviceScaleFactor: 1 } },
    { name: "escritorio", ctx: { viewport: { width: 1280, height: 900 } } },
  ];
  for (const { name, ctx } of configs) {
    const context = await browser.newContext(ctx);
    for (const route of routes) {
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(base + route, { waitUntil: "networkidle" });
      const { h, vh, overflow } = await page.evaluate(() => ({
        h: document.documentElement.scrollHeight,
        vh: innerHeight,
        overflow: document.documentElement.scrollWidth - innerWidth,
      }));
      const slug = route.replace(/\W+/g, "-").replace(/^-|-$/g, "") || "inicio";
      let i = 0;
      for (let y = 0; y < h; y += Math.round(vh * 0.85)) {
        await page.evaluate((y) => scrollTo(0, y), y);
        await page.waitForTimeout(900);
        await page.screenshot({ path: path.join(out, `${name}-${slug}-${String(i++).padStart(2, "0")}.png`) });
      }
      console.log(
        `${name} ${route}: ${i} capturas` +
          (overflow > 0 ? ` · ⚠ scroll horizontal de ${overflow}px` : " · sin scroll horizontal") +
          (errors.length ? ` · ⚠ errores JS: ${errors.join(" | ")}` : ""),
      );
      await page.close();
    }
    await context.close();
  }
  await browser.close();
  console.log(`Capturas en ${out}`);
})();
