import Dashboard from "@/components/dashboard/dashboard";
import { getServerAuthSession } from "@/utils/auth";

export default async function Home() {
  const session = await getServerAuthSession();
  console.log("session", session);
  return <Dashboard />;
}
