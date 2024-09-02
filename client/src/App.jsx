import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

export default function App() {
  return (
    <>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            borderRadius: "0",
          },
        }}
        position="bottom-right"
      />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
