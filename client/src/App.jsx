import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../src/pages/Auth/Login";
import Landing from "../src/pages/Landing";
import Signup from "./pages/Auth/Signup";

// // define type for setcurrentPage prop
// type AuthPageProps = {
//   setcurrentPage: (page: string) => void;
// };

const App = () => {
  return (
      <div className="min-h-screen">
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/signup"
              element={<Signup />}
            />
          </Routes>
        </Router>
      </div>
  );
};

export default App;
// export default function App() {
//   return (
//     <div className="bg-green-500 text-white text-4xl font-bold p-6">
//       ✅ Tailwind v4 is working
//     </div>
//   )
// }
