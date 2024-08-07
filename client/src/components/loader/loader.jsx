import ClipLoader from "react-spinners/ClipLoader";

export default function Loader() {
  const propsToOverride = {
    display: "block",
    margin: "5rem auto 0 auto",
    borderColor: "var(--aqua-green-color)",
  };

  return (
    <ClipLoader
      cssOverride={propsToOverride}
      size={100}
      aria-label="Loading Spinner"
    />
  );
}
