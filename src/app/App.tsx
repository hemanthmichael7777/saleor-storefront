import React from "react";

import { useAuth } from "@saleor/sdk";
import { DefaultLoader } from "@components/atoms";
import { demoMode } from "@temp/constants";
import {
  Footer,
  MainMenu,
  MetaConsumer,
  OverlayManager,
  OverlayProvider,
} from "../components";
import ShopProvider from "../components/ShopProvider";
import "../globalStyles/scss/index.scss";
import { Routes } from "./routes";
import Notifications from "./Notifications";

const App: React.FC = () => {
  const { tokenRefreshing, tokenVerifying } = useAuth();

  if (tokenRefreshing || tokenVerifying) {
    return <DefaultLoader />;
  }

  return (
    <ShopProvider>
      <OverlayProvider>
        <MetaConsumer />
        <MainMenu demoMode={demoMode} />
        <Routes />
        <Footer />
        <OverlayManager />
        <Notifications />
      </OverlayProvider>
    </ShopProvider>
  );
};

export default App;
