import ClipLoader from "react-spinners/ClipLoader";

export default function Loader() {
  const propsToOverride = {
    display: "block",
    margin: "5rem auto 0 auto",
  };

  return (
    <ClipLoader
      cssOverride={propsToOverride}
      size={100}
      color="var(--aqua-green-color)"
      aria-label="Loading Spinner"
    />
  );
}
