// import Image from "next/image";
import Footer from "./components/landingpage/footer/page";
import Hero from "./components/landingpage/hero/page";
import Navbar from "./components/landingpage/navbar/page";
import Benefit from "./components/landingpage/benefit/page";
import Popular from "./components/landingpage/popular/page";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <section id="Hero">
        {/* Hero */}
        <Hero /> 
        </section>
        <section id="benefit" className="py-16 px-4 md:px-12">
        {/* Benefit */}
        <Benefit/>
        </section>
        <section id="popular" className="py-8 px-4 md:px-12">
        {/* Popular */}
        <Popular />
        </section>
      </main>
      <Footer />
    </div>
  );
}

const testRestaurants = async () => {
  const res = await fetch('http://localhost:8000/restaurants/restaurants');
  const text = await res.text();
  try {
    const data = JSON.parse(text);
    console.log('Data:', data);
  } catch (error) {
    console.error('Failed to parse JSON, raw response:', text);
  }
};

testRestaurants();
