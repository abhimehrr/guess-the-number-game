import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav className="text-center text-lg sm:text-2xl font-bold tracking-wider">
        <div className="py-4 bg-slate-100 rounded-b-lg">
          <Link to={'/'}>Guess the Number</Link>
        </div>
      </nav>
    </header>
  );
}
