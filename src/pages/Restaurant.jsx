import { PageHero } from "../sections/PageHero";
import { FlowerPattern } from "../components/Patterns";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";

const menuItems = [
  { name: "Grilled Tilapia", description: "Fresh Lake Kivu tilapia marinated in ginger, garlic, and lime, served with plantains and sautéed vegetables", price: "$22", category: "Main" },
  { name: "Rwandan Beef Brochettes", description: "Tender skewered beef with traditional Akabanga pepper sauce, grilled tomatoes, and ugali", price: "$18", category: "Main" },
  { name: "Isombe & Groundnut Stew", description: "Cassava leaves cooked in rich peanut sauce, served with steamed rice or irish potatoes", price: "$15", category: "Main" },
  { name: "Nyama Choma Platter", description: "Mixed grilled meats — goat, beef, and chicken — with kachumbari salad and chili sauce", price: "$28", category: "Main" },
  { name: "Sambaza Fry", description: "Crispy Lake Kivu sardines with lemon herb dressing and cassava chips", price: "$14", category: "Starter" },
  { name: "Rolex Roll", description: "Ugandan-style egg and vegetable chapati roll with avocado", price: "$10", category: "Starter" },
  { name: "African Samosa Trio", description: "Beef, chicken, and vegetable samosas with tamarind dipping sauce", price: "$9", category: "Starter" },
  { name: "Miso Glazed Salmon", description: "Atlantic salmon with roasted seasonal vegetables and jasmine rice", price: "$26", category: "Main" },
  { name: "Chicken Piri Piri", description: "Grilled peri-peri half chicken with herb fries and coleslaw", price: "$20", category: "Main" },
  { name: "Tropical Fruit Platter", description: "Fresh mango, pineapple, papaya, and passion fruit with honey lime drizzle", price: "$10", category: "Dessert" },
  { name: "Mandazi & Chai", description: "East African fried dough with spiced masala chai and mango jam", price: "$8", category: "Dessert" },
  { name: "Chocolate & Coffee Fondant", description: "Warm Rwandan coffee-infused chocolate cake with vanilla ice cream", price: "$12", category: "Dessert" },
];

const categories = [...new Set(menuItems.map((m) => m.category))];

export default function Restaurant() {
  return (
    <>
      <PageHero page="restaurant" title="Restaurant & Dining" subtitle="A journey through Rwandan flavours and international cuisine" />

      <section className="py-24 bg-gradient-to-b from-bg-secondary to-white relative">
        <FlowerPattern opacity={0.06} />
        <div className="mx-auto max-w-container px-4 md:px-8 relative z-10">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-black md:text-4xl">Palm Terrace Restaurant</h2>
            <p className="mt-4 text-lg text-black/70">Open daily &middot; 6:30 AM &ndash; 10:30 PM</p>
            <p className="mt-2 text-lg text-black/70">Breakfast 6:30&ndash;10:30 &middot; Lunch 12:00&ndash;14:30 &middot; Dinner 18:00&ndash;22:00</p>
          </div>

          {categories.map((cat) => (
            <div key={cat} className="mb-16 last:mb-0">
              <h3 className="font-display text-2xl font-bold text-black mb-8 border-b-2 border-black/10 pb-2">{cat}s</h3>
              <div className="grid gap-6 md:grid-cols-2">
                {menuItems.filter((m) => m.category === cat).map((item, i) => (
                  <div key={i} className="border-0 shadow-[0_0_0_1.5px_rgba(0,0,0,0.7),0_0_6px_rgba(0,0,0,0.12)] p-6">
                    <div className="flex items-start justify-between">
                      <h4 className="text-lg font-bold text-black">{item.name}</h4>
                      <span className="text-lg font-bold text-black">{item.price}</span>
                    </div>
                    <p className="mt-2 text-base text-black/70">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="mx-auto max-w-2xl mt-16 text-center border-0 shadow-[0_0_0_1.5px_rgba(0,0,0,0.7),0_0_6px_rgba(0,0,0,0.12)] p-8">
            <h3 className="font-display text-2xl font-bold text-black">Private Dining & Events</h3>
            <p className="mt-3 text-lg text-black/70">Host your special occasion in our elegant private dining room, accommodating up to 30 guests. Our culinary team customizes menus to your preferences.</p>
            <Link to="/contact">
              <Button variant="default" size="lg" className="mt-6 bg-gradient-to-r from-brand-700 to-brand-500 text-white hover:from-brand-800 hover:to-brand-600">
                Reserve a Table &rarr;
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
