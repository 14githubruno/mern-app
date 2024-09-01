import { useHeadTags } from "../hooks/use-head-tags";
import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useLoginUserMutation } from "../redux/api/users-api-slice";
import { setCredentials } from "../redux/features/auth/auth-slice";
import { useNavigate } from "react-router-dom";
import { parseFormData } from "../lib/parse-form-data";
import Form from "../components/form/form";
import toast from "react-hot-toast";

export default function Login() {
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const tokenExpirationDate = useSelector(
    (state) => state.auth.tokenExpirationDate
  );

  const [loginUser, { isLoading }] = useLoginUserMutation();

  useEffect(() => {
    if (user && tokenExpirationDate) {
      methods.reset();
      navigate("/", { replace: true });
    }
  }, [user, tokenExpirationDate, navigate, methods.reset]);

  // this below fires a useEffect
  useHeadTags("login");

  const handleUserLogin = async (data) => {
    const parsedData = parseFormData(data);
    if (parsedData === false) {
      toast.error("Data structure is not valid");
      return;
    }

    try {
      const res = await loginUser(parsedData).unwrap();
      dispatch(
        setCredentials({
          user: res.body.name,
          tokenExpirationDate: res.body.tokenExpirationDate,
        })
      );
      toast.success(res.message);
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  return (
    <section>
      <FormProvider {...methods}>
        <Form
          typeOfForm={"login user"}
          onSubmit={handleUserLogin}
          formButtonProps={{
            isLoading,
            textOnLoading: "Logging in...",
            text: "Log in",
          }}
        />
      </FormProvider>
    </section>
  );
}
