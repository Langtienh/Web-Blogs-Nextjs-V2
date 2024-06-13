"use client";

import Login from "@/app/_components/login";
import Signup from "@/app/_components/signup";
import { useState } from "react";

const App: React.FC = () => {
  const [pageLogin, setPageLogin] = useState(true);
  const toSignUp = () => setPageLogin(false);
  const toLogin = () => setPageLogin(true);
  return (
    <div className="relative top-0 left-0 bottom-0 right-0 h-screen">
      <div className="relative p-2 w-full max-w-[500px] mx-auto">
        {pageLogin ? <Login cb={toSignUp} /> : <Signup cb={toLogin} />}
      </div>
    </div>
  );
};

export default App;
