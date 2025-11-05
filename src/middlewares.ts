import { Hono, type Context, type Next } from "hono";
import { Redis } from "@upstash/redis";

const app = new Hono();
const redis = new Redis({
  url: "REDIS_URL",
  token: "REDIS_TOKEN",
});

const cachePut = async (c: Context, next: Next) => {
  await next();

  const uuid: string = c.get("uuid");

  if (!uuid) {
    console.warn("No UUID found for this request. Skipping cache.");
    return;
  }

  const body: string = await c.res.clone().text();

  await redis.set(`cache:${uuid}`, body, { ex: 3600 });
};

const cacheGet = async (c: Context, next: Next) => {
  await next();

  const uuid: string = c.get("uuid");

  if (!uuid) {
    console.warn("No UUID found for this request. Skipping cache.");
    return;
  }

  const cached: string | null = await redis.get(uuid);
  c.set("cached", cached);
};
