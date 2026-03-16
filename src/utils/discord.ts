import https from "https";
import { URL } from "url";

export function sendDiscordWebhook(content: string): void {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return;
  try {
    const url = new URL(webhookUrl);
    const payload = JSON.stringify({ content });
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(payload),
      },
    } as const;

    const req = https.request(options, (res) => {
      res.on("data", () => {});
    });
    req.on("error", (err) => {
      console.error("Discord webhook error:", err);
    });
    req.write(payload);
    req.end();
  } catch (err) {
    console.error("Failed to send Discord webhook:", err);
  }
}
