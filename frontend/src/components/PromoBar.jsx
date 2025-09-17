import { FaAngleDown } from 'react-icons/fa';

export function PromoBar() {
  return (
    <div className="bg-black py-2 text-white">
      <div className="mx-auto max-w-6xl px-4 flex items-center justify-between text-xs relative">
        
        {/* Centered promotional message */}
        <p className="absolute left-1/2 -translate-x-1/2 text-center">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! 
          <span className="underline font-semibold cursor-pointer"> ShopNow</span>
        </p>
        
        {/* Language selector on the right */}
        <div className="flex items-center gap-2 ml-auto">
          <span>English</span>
          <FaAngleDown className="text-xs" />
        </div>
      </div>
    </div>
  );
}
