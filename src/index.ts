import dotenv from "dotenv";
dotenv.config();

import express from "express";
import router from "./router";
import errorHandler from "./middlewares/errorHandler";
import discordLogger from "./middlewares/discordLogger";
import { sendDiscordWebhook } from "./utils/discord";

const app = express();
app.use(express.json());
app.use(discordLogger);

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/api", router);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  sendDiscordWebhook(`Server started on port ${PORT}`);
});

export default app;
