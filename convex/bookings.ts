import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("bookings").collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    roomId: v.id("rooms"),
    roomName: v.string(),
    checkIn: v.string(),
    checkOut: v.string(),
    guests: v.number(),
    total: v.number(),
    addons: v.optional(v.string()),
    requests: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("bookings", args);
  },
});
