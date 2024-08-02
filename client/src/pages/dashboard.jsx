import { useSelector } from "react-redux";

export default function Dashboard() {
  const user = useSelector((state) => state.auth.user);

  return <h1 style={{ color: "whitesmoke" }}>{user}</h1>;
}
