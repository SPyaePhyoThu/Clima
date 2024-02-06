import { Outlet } from "react-router-dom";
import classes from "./css/root.module.css";
import Header from "../component/Header";
import TomorrowIo from "../ui/Tomorrow.io";
import Geoapify from "../ui/Geoapify";

function RootLayout() {
  return (
    <div className={classes.layout}>
      <Header />
      <Outlet />
      <div className={classes.footer}>
        <div className={classes.credit}>
          <p> Powered By </p> <TomorrowIo />
          <a className={classes.text} href="https://www.tomorrow.io/">
            Tomorrow.io
          </a>
          <p>& </p> <Geoapify />
          <a className={classes.text} href="https://www.geoapify.com/">
            Geoapify.
          </a>
        </div>

        <p className={classes.copyright}>
          © 2024 , Clima , All Right Reserved.
        </p>
      </div>
    </div>
  );
}

export default RootLayout;
