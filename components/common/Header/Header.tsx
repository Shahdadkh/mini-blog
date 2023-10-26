"use client";
import { useAppSelector } from "@/redux/store";
import MainHeader from "./MainHeader";
import PanelHeader from "./PanelHeader";

const Header = () => {
  const token = useAppSelector((state) => state.authReducer.auth.access_token);

  return (
    <>
      <div>{token !== "" ? <PanelHeader /> : <MainHeader />}</div>
    </>
  );
};

export default Header;
