import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import Home from "./Home.jsx";
import EilikCase from "./App.jsx";
import GenerationICaseV2 from "./GenerationICaseV2.jsx";
import RealEstateCase from "./RealEstateCase.jsx";
import UIMobileWF1 from "./UIMobileWF1.jsx";
import MakingofPortfolio from "./MakingofPortfolio.jsx";
import ContactPage from "./ContactPage.jsx";

import ExperienceBuildFull from "./components/experience-build/ExperienceBuild_FULL_INTEGRATED.jsx";
import UIShowcaseLandingPages from "./UIShowcase_LandingPages.jsx";

function Router() {
  const path = window.location.pathname
    .toLowerCase()
    .replace(/\/$/, "");

  // GENERACIÓN I
  if (
    path.includes("generacion") ||
    path.includes("generation")
  ) {
    return <GenerationICaseV2 />;
  }

  // CONTACTO
  if (path === "/contacto") {
    return <ContactPage />;
  }

  // UI MOBILE
  if (
    path === "/ui/mobile" ||
    path === "/ui-mobile"
  ) {
    return <UIMobileWF1 />;
  }

  // UI WEB
  if (
    path === "/ui/web" ||
    path === "/ui-web"
  ) {
    return <UIShowcaseLandingPages />;
  }

  // EXPERIENCE BUILD
  if (path === "/experience-build") {
    return <ExperienceBuildFull />;
  }

  // MAKING OF
  if (path === "/making-of-portfolio") {
    return <MakingofPortfolio />;
  }

  // EILIK
  if (path === "/eilik") {
    return <EilikCase />;
  }

  // BIENES RAÍCES
  if (
    path === "/bienes-raices" ||
    path === "/bienesraíces"
  ) {
    return <RealEstateCase />;
  }

  // HOME
  return <Home />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router />
  </StrictMode>
);