import React from "react";
import { Outlet } from "react-router-dom";
import PublicTopNav from "../components/PublicTopNav";




export default function PublicShopLayout() {
  return (
    <div >




       <PublicTopNav/>
        <Outlet />
  
 
    </div>
  );
}
