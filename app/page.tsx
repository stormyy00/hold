// import Dashboard from "@/components/dashboard/dashboard";
import Landing from "@/components/landing";
import About from "@/components/about";
import Features from "@/components/features";
import { getServerAuthSession } from "@/utils/auth";
import Dashboard from "@/components/dashboard/dashboard";

export default async function Home() {
  const session = await getServerAuthSession();
  console.log("session", session);

  return (
    <Dashboard />
    // <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/20">
    //   <Landing />
    //   <About />
    //   <Features/>
    // </div>
  );
}
