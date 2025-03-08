// components
import PageTitle from "../components/page-title/page-title";
import PrivacyPageContent from "../components/privacy-page-content/privacy-page-content";

// lib
import { useHeadTags } from "../hooks/use-head-tags";

/**
 * Info page component.
 *
 * In this page info about sata usage.
 *
 * @returns {JSX.Element} The rendered Info page component.
 */
export default function PrivacyNotice() {
  // this below fires a useEffect
  useHeadTags("privacyNotice");

  return (
    <section>
      <PageTitle title={"Privacy notice"} pageHasForm={false} />
      <PrivacyPageContent />
    </section>
  );
}
