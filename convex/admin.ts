import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@pacifichotel.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (args.email !== adminEmail || args.password !== adminPassword) {
      throw new Error("Invalid email or password");
    }

    const token = Array.from({ length: 32 }, () =>
      Math.random().toString(36)[2]
    ).join("");
    await ctx.db.insert("sessions", {
      token,
      email: args.email,
      createdAt: Date.now(),
    });

    return { token, email: args.email };
  },
});

export const verifySession = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();
    if (!session) return null;
    return { email: session.email };
  },
});

export const listBookings = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();
    if (!session) throw new Error("Unauthorized");
    return await ctx.db.query("bookings").collect();
  },
});
