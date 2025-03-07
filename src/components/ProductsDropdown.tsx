
import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductsDropdownProps {
  className?: string;
}

const ProductsDropdown = ({ className }: ProductsDropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const toggleDropdown = () => setIsOpen(!isOpen);
  
  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.products-dropdown')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn("relative products-dropdown", className)}>
      <button 
        onClick={toggleDropdown}
        className="hover:text-[#17ffd3] transition-colors font-medium flex items-center gap-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-gradient-to-r from-[#17ffd3] to-[#23e3ee] after:transition-all"
      >
        Products <ChevronDown className="h-4 w-4" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50 overflow-hidden">
          <div className="py-1">
            <a 
              href="#" 
              className="block px-4 py-2 text-sm text-custom-dark hover:bg-gradient-to-r hover:from-[#17ffd3]/10 hover:to-[#23e3ee]/10 transition-colors"
            >
              M&A Tool
            </a>
            <a 
              href="#" 
              className="block px-4 py-2 text-sm text-custom-dark hover:bg-gradient-to-r hover:from-[#17ffd3]/10 hover:to-[#23e3ee]/10 transition-colors"
            >
              Nexus Pay
            </a>
            <a 
              href="#" 
              className="block px-4 py-2 text-sm text-custom-dark hover:bg-gradient-to-r hover:from-[#17ffd3]/10 hover:to-[#23e3ee]/10 transition-colors"
            >
              KYC Check
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsDropdown;
