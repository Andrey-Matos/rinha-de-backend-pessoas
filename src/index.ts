import { serve } from "@hono/node-server";
import { Hono } from "hono";
import type { Variables } from "./types/context.js";

const app = new Hono<{ Variables: Variables }>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
