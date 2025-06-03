import React from 'react';

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ 
  icon, 
  title, 
  description, 
  className = '' 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center hover:shadow-md transition-shadow duration-200 ${className}`}>
      {/* Icon Container */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
          {icon}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default BenefitCard;