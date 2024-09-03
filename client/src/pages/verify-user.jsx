import { useParams, useNavigate } from "react-router-dom";
import { useVerifyUserQuery } from "../redux/api/users-api-slice";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "../components/loader/loader";

export default function VerifyUser() {
  const navigate = useNavigate();
  const params = useParams();
  const { data, isSuccess, error } = useVerifyUserQuery(params.token);

  useEffect(() => {
    if (error) {
      navigate("/", { replace: true });
      toast.error(error.data.message);
    } else if (data && isSuccess) {
      navigate("/login", { replace: true });
      toast.success(data.message);
    }
  }, [data, error, isSuccess, navigate]);

  return (
    <section>
      <Loader />
    </section>
  );
}
