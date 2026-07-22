import { redirect } from "next/navigation";
import "../globals.css";
import { getCurrentUser } from "@/lib/service/getCurrentUser";
import NaviBar from "@/components/common/naviBar";
import SideBar from "@/components/common/sideBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = getCurrentUser();
  console.log("layout user:",user);
  if(!user) redirect("/login");

  return (
    <div className="flex h-screen bg-slate-50">
      <aside className="w-64 bg-white border-r">
        <SideBar/>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="h-16 border-b bg-white">
          <NaviBar/>
        </header>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
