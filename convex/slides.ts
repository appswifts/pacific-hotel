import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("slides").collect();
  },
});

export const create = mutation({
  args: {
    image: v.string(),
    title: v.string(),
    subtitle: v.string(),
    order: v.optional(v.number()),
    active: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("slides", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("slides"),
    image: v.optional(v.string()),
    title: v.optional(v.string()),
    subtitle: v.optional(v.string()),
    order: v.optional(v.number()),
    active: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id("slides") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
