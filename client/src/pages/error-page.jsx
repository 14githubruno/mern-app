import { useHeadTags } from "../hooks/use-head-tags";
import ErrorPageContent from "../components/error-page-content/error-page-content";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";

/**
 * ErrorPage page component.
 *
 * Error page to which user is redirected if tries to access a non-existing or expired resource.
 *
 * (Header and Footer are here imported, whereas in the other/real web app pages are both handled by App component)
 *
 * @returns {JSX.Element} The rendered ErrorPage page component.
 */
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
