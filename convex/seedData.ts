import { mutation } from "./_generated/server";

export const seed = mutation({
  handler: async (ctx) => {
    const existing = await ctx.db.query("rooms").first();
    if (existing) throw new Error("Already seeded");

    const rooms = await Promise.all([
      ctx.db.insert("rooms", {
        name: "Kigali View Suite",
        description: "Wake up to breathtaking panoramic views of Kigali's rolling hills from your private balcony. This spacious suite features a king-sized bed, marble bathroom with soaking tub, and floor-to-ceiling windows overlooking the city.",
        price: 450,
        size: "45 m\u00b2",
        capacity: 2,
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
        features: ["King Bed", "City View Balcony", "Marble Bathroom", "Smart TV", "Mini Bar", "Wi-Fi"],
      }),
      ctx.db.insert("rooms", {
        name: "Executive Suite",
        description: "Perched on the top floor, our penthouse offers 360-degree views of Kigali, a private lounge, and the finest furnishings. The epitome of luxury living with personalized concierge service.",
        price: 680,
        size: "65 m\u00b2",
        capacity: 4,
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
        features: ["Separate Living Area", "City Views", "Butler Service", "Jacuzzi", "Home Theater", "Wine Bar"],
      }),
      ctx.db.insert("rooms", {
        name: "Deluxe King Room",
        description: "Perfect for business travelers visiting Kigali, this room offers sophisticated comfort with a premium king-sized bed, modern work desk, and sleek bathroom with walk-in rain shower.",
        price: 320,
        size: "35 m\u00b2",
        capacity: 2,
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
        features: ["King Bed", "Work Desk", "Rain Shower", "Smart TV", "Coffee Machine", "Wi-Fi"],
      }),
      ctx.db.insert("rooms", {
        name: "Presidential Penthouse",
        description: "The pinnacle of luxury in Kigali. Our Presidential Penthouse features a private rooftop terrace with panoramic city views, a dedicated butler, and the most exclusive amenities in the city.",
        price: 2500,
        size: "200 m\u00b2",
        capacity: 4,
        image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
        features: ["Rooftop Terrace", "Panoramic Views", "Private Concierge", "Jacuzzi", "Home Theater", "Wine Cellar"],
      }),
      ctx.db.insert("rooms", {
        name: "Family Suite",
        description: "Designed for families visiting Kigali, this suite features two connecting bedrooms, a living area, and kid-friendly amenities. Plenty of space for everyone to relax.",
        price: 650,
        size: "75 m\u00b2",
        capacity: 4,
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
        features: ["Two Bedrooms", "Living Area", "Kid-Friendly", "Kitchenette", "Balcony", "Wi-Fi"],
      }),
      ctx.db.insert("rooms", {
        name: "Superior Twin Room",
        description: "Ideal for colleagues or friends traveling together. Two comfortable single beds, a shared living area, and all the modern amenities needed for a productive stay in Kigali.",
        price: 280,
        size: "35 m\u00b2",
        capacity: 2,
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
        features: ["Twin Beds", "Work Desk", "Rain Shower", "Smart TV", "Mini Bar", "Wi-Fi"],
      }),
    ]);

    const offers = await Promise.all([
      ctx.db.insert("offers", {
        title: "Weekend Getaway",
        subtitle: "Kigali Escape",
        description: "Escape to Kigali for the weekend. Includes champagne on arrival, full breakfast daily, and a guided city tour of Kigali's top attractions including the Genocide Memorial and local markets.",
        price: "$499",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbe6ef?w=800&q=80",
        features: ["Champagne on Arrival", "Daily Breakfast", "City Tour", "Late Check-out"],
      }),
      ctx.db.insert("offers", {
        title: "Family Adventure",
        subtitle: "Family Package",
        description: "Create unforgettable memories in Kigali with your family. Includes connecting rooms, daily breakfast, airport transfers, and access to our kids' club and pool.",
        price: "$999",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        features: ["Connecting Rooms", "Daily Breakfast", "Airport Transfer", "Kids' Club", "Pool Access"],
      }),
      ctx.db.insert("offers", {
        title: "Wellness Retreat",
        subtitle: "Spa & Wellness",
        description: "Rejuvenate your mind, body, and soul with our comprehensive wellness package. Includes daily yoga with a view of Kigali's hills, spa treatments, and healthy cuisine.",
        price: "$1,299",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
        features: ["Daily Yoga", "Spa Treatments", "Healthy Meals", "Fitness Classes", "Pool Access"],
      }),
    ]);

    return { rooms: rooms.length, offers: offers.length };
  },
});
