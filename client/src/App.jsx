import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/header/header";

export default function App() {
  return (
    <>
      <Toaster position="bottom-right" />
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
