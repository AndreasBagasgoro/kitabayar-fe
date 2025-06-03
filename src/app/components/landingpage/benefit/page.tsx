import React from "react";
import BenefitCard from "../../benefit_card/page";
import { Clock, Star, Map } from "lucide-react";

const Benefit = () => {
  return (
    <div>
      <div className="text-center py-12 text-3xl font-bold text-gray-900">
        <h1>Why Choose us?</h1>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 py-8">
        <div>
          <BenefitCard
            icon={<Clock color="#d9291a" size={48}/>}
            title={"Fast Delivery"}
            description={
              "Get your food delivered hot and fresh in 30 minutes or less."
            }
          />
        </div>
        <div>
          <BenefitCard
            icon={<Star color="#d9291a" size={48}/>}
            title={"Quality Food"}
            description={
              "Made with the finest ingredients and prepared by expert chefs."
            }
          />
        </div>
        <div>
          <BenefitCard
            icon={<Map color="#d9291a" size={48}/>}
            title={"Wide Coverage"}
            description={"We deliver to your doorstep across the entire city."}
          />
        </div>
      </section>
    </div>
  );
};

export default Benefit;
