import { Button } from "@/shared/ui/button";
import { Link } from "react-router";

export default function Header() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <p>BeyondX</p>
        </div>
        <div className="flex space-x-6 items-center font-medium text-sm">
          <a href="#contact" className="hover:text-blue-600">
            Contact us
          </a>
          <Button className="bg-slate-900 rounded-lg text-white hover:bg-slate-800">
            <Link to="/service">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
