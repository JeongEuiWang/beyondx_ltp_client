import {
  LandingSectionFeature,
  Header,
  LandingSectionMain,
  LandingSectionAbout,
  Footer,
} from "@/widget/landing";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header />
      <LandingSectionMain />
      <LandingSectionAbout />
      <LandingSectionFeature />
      <Footer />
    </div>
  );
}
