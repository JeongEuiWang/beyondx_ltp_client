export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">
              Beyondx Logistics
            </h4>
            <p className="text-sm">Deliveries Today, Pioneering Tomorrow's</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">
              Contact Info
            </h4>
            <ul className="space-y-2 text-sm">
              <li>Email: contact@ltp.example.com</li>
              <li>Phone: +82-2-1234-5678</li>
              <li>Address: 123 Teheran-ro, Gangnam-gu, Seoul</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Beyondx Logistics. All rights
            reserved.
          </p>
          <div className="mt-2">
            <a href="/privacy" className="hover:text-white mx-2">
              Privacy Policy
            </a>
            <span className="text-gray-500">|</span>
            <a href="/terms" className="hover:text-white mx-2">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
