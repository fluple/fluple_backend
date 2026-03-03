import dotenv from "dotenv";
dotenv.config();

import express from "express";
import router from "./router";
import errorHandler from "./middlewares/errorHandler";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/api", router);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
