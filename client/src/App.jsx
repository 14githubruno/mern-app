// components
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

// react-router-dom components
import { Outlet } from "react-router-dom";

// other pkgs
import { Toaster } from "react-hot-toast";

/**
 * App root component.
 *
 * It renders/wraps all the content (pages) of the web app, through the Outlet component.
 * Also, for each page, renders the Header and Footer components.
 *
 * (Header and Footer of the ErrorPage are handled directly by the latter,
 * since the ErrorPage will be used if url path hit by the user does not match
 * any existing path)
 *
 * (Here also the Toaster configuration, to allow toasting messages across the app)
 *
 * @returns {JSX.Element} The rendered App root component.
 */
export default function App() {
  return (
    <>
      <Toaster
        toastOptions={{
          className: "",
          duration: 4000,
          style: {
            borderRadius: "0",
            fontSize: "1.2rem",
          },
        }}
        position="bottom-center"
      />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
