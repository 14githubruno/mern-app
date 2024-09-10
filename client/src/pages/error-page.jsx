import { useHeadTags } from "../hooks/use-head-tags";
import ErrorPageContent from "../components/error-page-content/error-page-content";

export default function ErrorPage() {
  // this below fires a useEffect
  useHeadTags("errorPage");

  return <ErrorPageContent />;
}
