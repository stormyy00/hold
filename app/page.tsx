import About from "@/components/about";
import Footer from "@/components/footer";
import Landing from "@/components/landing";

export default async function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/20">
      <Landing />
      <About />
      <Footer />
    </div>
  );
}
