import React from "react";
import { IChildren } from "../interfaces/interfaces";
import ClientLayout from "../ClientLayout";
import SideNav from "@/app/components/dashboard/SideNav";

export const metadata = {
  title: "Dashboard",
};
const Layout: React.FC<IChildren> = ({ children }) => {
  return (
    <ClientLayout>
      <div className="bg-[#F7FBFA] pb-[60px] min-992:pb-[120px] dashboard-layout">
        <div className="flex dashboardContainer flex-col md:flex-row  min-1440:w-[1320px] min-1200:w-[1140px] min-992:w-[960px] min-768:w-[720px] min-576:w-[540px] min-320:w-full mx-auto">
          <SideNav />
          <div className="w-full max-h-screen overflow-scroll scrollbar-hidden min-1440:w-[76.4%] min-1024:ww-[70%] px-[20px] min-768:px-[40px] pt-[16px] min-768:pt-[32px] pb-[60px] min-768:pb-[120px] bg-auc-white-color  auc-dashboard-sidebar-shadow">
            {children}
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default Layout;
