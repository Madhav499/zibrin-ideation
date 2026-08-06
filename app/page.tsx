"use client";

import React, { useState } from "react";
import StartupLoader from "@/features/loader/loader";
import Navbar from "@/components/navbar";
import SpatialWorldContainer from "@/components/spatial-world-container";
import PersistentContactDrawer from "@/components/persistent-contact-drawer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <StartupLoader onComplete={() => setLoaded(true)} />}

      <div className={loaded ? "opacity-100 transition-opacity duration-700" : "opacity-0 pointer-events-none"}>
        <Navbar />
        <main className="relative z-10 w-full h-screen overflow-hidden">
          <SpatialWorldContainer />
        </main>
        <PersistentContactDrawer />
      </div>
    </>
  );
}
