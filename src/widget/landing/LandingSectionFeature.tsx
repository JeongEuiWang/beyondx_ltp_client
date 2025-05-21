import FeatureSectionCard from "@/widget/landing/FeatureSectionCard";
import { PackageCheck, Truck, ReceiptText } from "lucide-react";

const ltpFeaturesData = [
  {
    icon: <Truck />,
    index: "Flexible",
    title: "Flexibility with Customized Transportation",
    description:
      "From Less-Than-Truckload (LTL) to Full-Truckload (FTL), we provide transportation options precisely tailored to your cargo characteristics and needs, maximizing the flexibility of your logistics planning.",
  },
  {
    icon: <PackageCheck />,
    index: "Reliable",
    title: "Enhance Business Trust with On-Time Deliveries.",
    description:
      "TP's swift and reliable delivery service ensures your valuable cargo always reaches its destination safely and accurately.",
  },
  {
    icon: <ReceiptText />,
    index: "Report",
    title: "Automated BOL & Invoice Delivery",
    description:
      "Instantly receive auto-generated Bills of Lading (BOL) and invoices based on your quotes, delivered directly to your email for seamless record-keeping.",
  },
];

export default function LandingSectionFeature() {
  return (
    <section id="features" className="py-30 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
            Simplify Your Everyday Freight Tasks.
          </h2>
          <p className="text-lg font-regular text-gray-500 max-w-lg mx-auto">
            We streamline complex freight processes, adding efficiency to your
            business.
          </p>
        </div>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {ltpFeaturesData.map((feature) => (
            <FeatureSectionCard
              key={feature.title}
              icon={feature.icon}
              index={feature.index}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
