import type { Plugin } from "vite";

interface InlineUmamiOptions {
  hostUrl: string;
  websiteId: string;
  scriptName?: string;
}

export function inlineUmamiPlugin(options: InlineUmamiOptions): Plugin {
  const { hostUrl, websiteId, scriptName = "script.js" } = options;

  return {
    name: "inline-umami",
    apply: "build",
    async transformIndexHtml() {
      try {
        const res = await fetch(`${hostUrl}/${scriptName}`, {
          headers: { "User-Agent": "vite-build" },
        });
        if (!res.ok) throw new Error(`Umami fetch failed: ${res.status}`);
        const script = await res.text();
        return [
          {
            tag: "script",
            attrs: {
              defer: true,
              "data-website-id": websiteId,
              "data-host-url": hostUrl,
            },
            children: script,
            injectTo: "head" as const,
          },
        ];
      } catch (e) {
        console.error("[umami] build-time fetch failed:", e);
        return [];
      }
    },
  };
}
