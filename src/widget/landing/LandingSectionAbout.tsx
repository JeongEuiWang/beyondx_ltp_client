import AboutImage from "@/shared/assets/images/img_landing_about.jpg";

export default function LandingSectionAbout() {
  return (
    <section id="about" className="w-full py-30 ">
      <div className="container mx-auto px-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <p className="text-2xl sm:text-3xl font-semibold mb-6">
              About BeyondX Logistics
            </p>
            <p className="text-mid text-gray-500 mb-4 font-regular leading-relaxed whitespace-pre-wrap">
              {
                "BeyondX Logistics was born from a vision to redefine logistics, injecting innovation into every step. "
              }
              {
                "As a trusted partner, we're committed to empowering businesses, connecting markets, and driving growth.\n\n"
              }
              {
                "Our customer-centric approach tailors solutions to your unique needs, ensuring efficiency and cost-effectiveness. "
              }
              {
                "With a global reach and a local touch, BeyondX is your key to sustainable logistics success."
              }
            </p>
          </div>
          <div className="w-full md:w-1/2 h-100">
            <img
              className="w-full h-full object-cover rounded-md"
              src={AboutImage}
              alt="About BeyondX Logistics"
              // style={{ objectFit: "cover", borderRadius: "10px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
