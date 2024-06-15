"use client";

import Login from "@/components/home/login";
import Signup from "@/components/home/signup";
import { useState } from "react";

const App: React.FC = () => {
  const [pageLogin, setPageLogin] = useState(true);
  const toSignUp = () => setPageLogin(false);
  const toLogin = () => setPageLogin(true);
  return (
    <div className="relative top-0 left-0 bottom-0 right-0 h-screen">
      <div className="p-2 h-full flex flex-col justify-center">
        {pageLogin ? <Login cb={toSignUp} /> : <Signup cb={toLogin} />}
      </div>
    </div>
  );
};

export default App;
