import { useEffect, useState } from "react";
import { cn } from "@/shared/utils";
import { ArrowRight } from "lucide-react";
export default function Header() {
  const [isScrolledOver, setIsScrolledOver] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolledOver(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={cn(
        "bg-transparent fixed top-0 z-50 w-full transition-background-color duration-300",
        isScrolledOver && "bg-white shadow-sm"
      )}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div>Logo</div>
        </div>
        <div className="flex space-x-6 items-center font-medium text-sm">
          <a href="#about" className={cn("text-white", isScrolledOver && "text-slate-900")}>
            About
          </a>
          <a href="#features" className={cn("text-white", isScrolledOver && "text-slate-900")}>
            Features
          </a>
          <a href="#contact" className={cn("text-white", isScrolledOver && "text-slate-900")}>
            Contact 
          </a>
        </div>
        <div className="flex items-center gap-1 cursor-pointer">
          <a
            href="/service"
            className={cn(
              "text-sm text-white",
              isScrolledOver && "text-slate-900"
            )}
          >
            Get Started
          </a>
          <ArrowRight
            className={cn(
              "w-4 h-4 text-white",
              isScrolledOver && "text-slate-900"
            )}
          />
        </div>
      </div>
    </nav>
  );
}
