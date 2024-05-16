import { Hono } from "hono";

export const expenseRoute = new Hono()
    .get("/", c => {
        return c.json({"messages": []})
    })
    .post("/", c => {
        return c.json({})
    })