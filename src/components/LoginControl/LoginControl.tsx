import { useState } from "react";
import Greeting from "./Greeting";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

export default function LogingControl() {
  const [isLogin, setIslogin] = useState(false);
  function handleLogin() {
    setIslogin(true);
  }
  function handleLogout() {
    setIslogin(false);
  }

  return (
    <div>
      <Greeting isLogin={isLogin} />
      {isLogin ? (
        <LogoutButton onLogout={handleLogout} />
      ) : (
        <LoginButton onLogin={handleLogin} />
      )}
    </div>
  );
}
