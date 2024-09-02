import { useHeadTags } from "../hooks/use-head-tags";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  // this below fires a useEffect
  useHeadTags("error");

  return (
    <section style={{ color: "var(--white-color)" }}>
      <header>
        <h1
          style={{
            padding: "0 1rem",
            fontSize: "2.5rem",
            textAlign: "center",
          }}
        >
          This resource does not exist or kan't be found
        </h1>
      </header>
      <Link
        style={{
          padding: "1rem 2rem",
          margin: "3rem 0 0 0",
          fontSize: "2rem",
          background: "var(--pink-blue-gradient)",
        }}
        to={"/"}
        replace
      >
        Go back home
      </Link>
    </section>
  );
}
