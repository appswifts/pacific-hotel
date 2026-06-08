import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("rooms").collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    price: v.number(),
    size: v.string(),
    capacity: v.number(),
    image: v.string(),
    features: v.array(v.string()),
    gallery: v.optional(v.array(v.string())),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("rooms", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("rooms"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    price: v.optional(v.number()),
    size: v.optional(v.string()),
    capacity: v.optional(v.number()),
    image: v.optional(v.string()),
    features: v.optional(v.array(v.string())),
    gallery: v.optional(v.array(v.string())),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id("rooms") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
