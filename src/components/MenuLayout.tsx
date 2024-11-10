import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
export default function MenuLayout() {
  return (
    <>
      <SideBar />
      <Outlet/>
    </>
  )
}