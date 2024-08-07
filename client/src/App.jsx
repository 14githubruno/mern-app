import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import ContextForSearchbarFiltering from "./context-providers/searchbar-filter-context";

export default function App() {
  return (
    <>
      <Toaster position="bottom-right" />
      <Header />
      <main>
        <ContextForSearchbarFiltering>
          <Outlet />
        </ContextForSearchbarFiltering>
      </main>
      <Footer />
    </>
  );
}
