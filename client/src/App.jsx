import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

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
