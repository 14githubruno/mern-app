import { useGetUserProfileQuery } from "../redux/api/users-api-slice";
import Loader from "../components/loader/loader";

export default function UserProfile() {
  const { data, isLoading, isSuccess } = useGetUserProfileQuery();

  let content;

  if (isLoading) {
    content = <Loader />;
  }

  if (isSuccess) {
    content = (
      <section style={{ color: "whitesmoke" }}>
        <p>{data.body.name}</p>
        <p>{data.body.email}</p>
      </section>
    );
  }

  return content;
}
