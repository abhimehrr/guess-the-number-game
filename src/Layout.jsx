import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/header/Footer";
import { useEffect } from "react";

export const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth", {
        replace: true,
      });
      return
    }
  }, []);

  return (
    <div className="container mx-auto">
      <Header />
      <main className="py-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
