
import React from "react";

interface FeatureCardProps {
  label: string;
}

const FeatureCard = ({ label }: FeatureCardProps) => {
  return (
    <div className="flex items-start mb-4">
      <div className="bg-gradient-to-r from-[#17ffd3] to-[#23e3ee] rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="text-blue-100">{label}</span>
    </div>
  );
};

export default FeatureCard;
