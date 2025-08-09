import React from "react";
import { Outlet } from "react-router-dom";
import PublicTopNav from "../components/PublicTopNav";
import PublicBottomNav from "../components/Publicbuttomnav";




export default function PublicShopLayout() {
  return (
    <div >




       <PublicTopNav/>
        <Outlet />
       <PublicBottomNav/>
 
    </div>
  );
}
