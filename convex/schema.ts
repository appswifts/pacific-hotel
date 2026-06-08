import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  rooms: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.number(),
    size: v.string(),
    capacity: v.number(),
    image: v.string(),
    features: v.array(v.string()),
    gallery: v.optional(v.array(v.string())),
    order: v.optional(v.number()),
  }),
  bookings: defineTable({
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
  }),
  sessions: defineTable({
    token: v.string(),
    email: v.string(),
    createdAt: v.number(),
  }).index("by_token", ["token"]),
  slides: defineTable({
    image: v.string(),
    title: v.string(),
    subtitle: v.string(),
    order: v.optional(v.number()),
    active: v.optional(v.boolean()),
  }),
  offers: defineTable({
    title: v.string(),
    subtitle: v.string(),
    description: v.string(),
    price: v.string(),
    image: v.string(),
    features: v.array(v.string()),
    active: v.optional(v.boolean()),
    order: v.optional(v.number()),
    validUntil: v.optional(v.string()),
  }),
});
