"use client";

import Router from "next/router";
import { useEffect, useState } from "react";

const LoadingBar: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };

    const end = () => setLoading(false);

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return loading ? (
    <div className="loading-bar" style={{ backgroundColor: "#00BCD4" }} />
  ) : null;
};

export default LoadingBar;