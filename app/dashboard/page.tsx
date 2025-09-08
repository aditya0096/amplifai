// app/dashboard/DashboardClient.tsx
"use client";
import Dashboard from "@/components/ui/Dashboard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardClient() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return null;

  return <div>Welcome, {session.user?.name}!
    <Dashboard />
  </div>;
}