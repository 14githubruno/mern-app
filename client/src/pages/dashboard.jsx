import { useSelector } from "react-redux";
import { useGetAllTvseriesQuery } from "../redux/api/tvseries-api-slice";

export default function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  const { data, isSuccess } = useGetAllTvseriesQuery();

  let paragraph;
  if (isSuccess) {
    paragraph = data.body ? JSON.stringify(data) : data.message;
  }

  return (
    <section>
      <h1 style={{ color: "whitesmoke" }}>{user}</h1>
      <p style={{ color: "whitesmoke" }}>{paragraph}</p>
    </section>
  );
}
