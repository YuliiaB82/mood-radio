import React, { useState } from "react";
import { Login } from "./components/login";
import { MainScreen } from "./components/main-screen";
import Cookies from "js-cookie";
import "./App.css";

export default function App() {
  const [token] = useState(Cookies.get("token"));
  return <>{token ? <MainScreen token={token} /> : <Login />}</>;
}
