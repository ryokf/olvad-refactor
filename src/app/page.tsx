import About from "@/components/Home/About";
import Hero from "@/components/Home/Hero";
import Order from "@/components/Home/Order";
import Reviews from "@/components/Home/Reviews";

export default function Home() {
  return (
    <>
      <Hero />
      <Order></Order>
      <About></About>
      <Reviews></Reviews>
    </>
  );
}
