import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const createExpenseSchema = z.object({
    id: z.number().int().positive().min(1),
    title: z.string().min(3).max(255),
    amount: z.number().int().positive(),
})

const ExpenseSchema = createExpenseSchema.omit({id: true})

type Expense = z.infer<typeof createExpenseSchema>
const expenses: Expense[] = [
    {id: 1, title: "Groceries", amount: 100},
    {id: 2, title: "Gas", amount: 40},
    {id: 3, title: "Dinner", amount: 50},
    {id: 4, title: "Drinks", amount: 30},
    {id: 5, title: "Movies", amount: 20},
]

export const expenseRoute = new Hono()
    .get("/", c => {
        return c.json({"messages": expenses})
    })
    .post("/", zValidator("json", ExpenseSchema), async c => {
        const expense = await c.req.valid("json")
        console.log({expense})
        expenses.push({...expense, id: expenses.length + 1})
        c.status(201)
        return c.json({
            expense
        })
    })
    .get("/:id{[0-9]+}", c => {
        const id = Number.parseInt(c.req.param("id"))
        const expense = expenses.find(e => e.id === id)
        if(!expense){
            return c.notFound()
        }
        return c.json({expense})
    })
    .delete("/:id{[0-9]+}", c => {
        const id = Number.parseInt(c.req.param("id"))
        const index = expenses.findIndex(e => e.id === id)
        if(index === -1){
            return c.notFound()
        }
        expenses.splice(index, 1)[0];
        return c.json({message: "Deleted"})
    })