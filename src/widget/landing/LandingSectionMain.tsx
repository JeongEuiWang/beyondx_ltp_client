import { cn } from "@/shared/utils";
import { Button } from "@/shared/ui/button";

export default function LandingSectionMain() {
  return (
    <header className="relative text-white">
      <div className="absolute inset-0 bg-background-section-main bg-cover bg-center bg-no-repeat brightness-40" />
      <div className="relative container z-10 mx-auto px-6 py-30 md:py-32 text-center">
        <h1
          className={cn(
            "text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight mb-6"
          )}
        >
          The <span className="text-blue-500">Smartest</span>
          <br />
          Local Freight Solution
        </h1>
        <p className="text-white text-lg sm:text-md md:text-lg mb-10 max-w-2xl mx-auto">
          Intelligent, streamlined solutions for local freight. Delivering
          efficiency and transparency to empower your business.
        </p>

        <Button className="bg-blue-500 rounded-full text-white hover:bg-blue-600">
          <a href="/service" className="text-link">
            Get started
          </a>
        </Button>
      </div>
    </header>
  );
}
