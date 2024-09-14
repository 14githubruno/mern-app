import { useHeadTags } from "../hooks/use-head-tags";
import ErrorPageContent from "../components/error-page-content/error-page-content";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";

export default function ErrorPage() {
  // this below fires a useEffect
  useHeadTags("errorPage");

  return (
    <>
      <Header replace={true} />
      <ErrorPageContent />
      <Footer />
    </>
  );
}
