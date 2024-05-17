// server/app.ts
import { Hono } from "hono";
import { logger } from "hono/logger";
import { expenseRoute } from "./routes/expenses";
import { serveStatic } from 'hono/bun'
const app = new Hono();

app.use("*", logger())

const apiRoutes = app.basePath("/api").route("/expenses", expenseRoute);

app.get('*', serveStatic({ root: './frontend/dist' }))
app.get('*', serveStatic({ path: './frontend/dist/index.html' }))

export default app;
export type ApiRoutes = typeof apiRoutes;