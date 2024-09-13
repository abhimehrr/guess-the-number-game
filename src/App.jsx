import { Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />}/>
        <Route path="/auth" element={<Auth />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Route>

      <Route path="*" element="404, Error: Invalid URL!!!" />
    </Routes>
  );
}

export default App;
