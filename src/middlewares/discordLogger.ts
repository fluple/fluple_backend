import { Request, Response, NextFunction } from "express";
import { sendDiscordWebhook } from "../utils/discord";

function truncate(s: string, n = 1000) {
  if (!s) return "";
  return s.length > n ? s.slice(0, n) + "..." : s;
}

export default function discordLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  const oldSend = res.send.bind(res) as (body?: any) => Response;
  let responseBody: any = undefined;

  // capture response body
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (res as any).send = function (body?: any) {
    responseBody = body;
    return oldSend(body);
  } as any;

  res.on("finish", () => {
    const duration = Date.now() - start;
    try {
      const requestBody = req.body ? JSON.stringify(req.body) : "";
      const responseText =
        typeof responseBody === "string" ? responseBody : JSON.stringify(responseBody || "");

      const msg = `Request: ${req.method} ${req.originalUrl}\nStatus: ${res.statusCode} — ${duration}ms\nRequest Body: ${truncate(requestBody)}\nResponse Body: ${truncate(responseText)}`;
      sendDiscordWebhook(msg);
    } catch (err) {
      console.error("discordLogger error:", err);
    }
  });

  next();
}
