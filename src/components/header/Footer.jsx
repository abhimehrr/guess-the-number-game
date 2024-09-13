import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="text-center py-4 bg-slate-100 rounded-t-lg tracking-wide">
      <Link to={"https://abhi.shre.in"}>Developed : Abhishek</Link>
    </footer>
  );
}
