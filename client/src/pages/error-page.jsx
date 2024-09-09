import { useHeadTags } from "../hooks/use-head-tags";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";

export default function ErrorPage() {
  // this below fires a useEffect
  useHeadTags("errorPage");

  return (
    <main>
      <Header replace={true} />
      <section style={{ color: "var(--white-color)" }}>
        <header>
          <h1
            style={{
              padding: "0 4rem",
              fontSize: "2.5rem",
              textAlign: "center",
            }}
          >
            This resource doesn't exist or kan't be found
          </h1>
        </header>
      </section>
      <Footer />
    </main>
  );
}
