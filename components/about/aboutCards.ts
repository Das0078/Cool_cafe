import burgerCard from "@/assets/cards/burger3.png";
import coffeeCard from "@/assets/cards/coffee2.png";
import iceCreamCard from "@/assets/cards/icecream5.png";
import pastryCard from "@/assets/cards/pastry1.png";
import pizzaCard from "@/assets/cards/pizza4.png";

export const aboutCards = [
  {
    id: "sweetness",
    title: "Feel the sweetness",
    image: pastryCard,
  },
  {
    id: "coffee",
    title: "Strong as coffee",
    image: coffeeCard,
  },
  {
    id: "feelings",
    title: "We serve feelings",
    image: burgerCard,
  },
  {
    id: "happiness",
    title: "Slice of happiness",
    image: pizzaCard,
  },
  {
    id: "chill",
    title: "Take a chill pill",
    image: iceCreamCard,
  },
] as const;
