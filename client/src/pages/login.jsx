import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useLoginUserMutation } from "../redux/api/users-api-slice";
import { setCredentials } from "../redux/features/auth/auth-slice";
import { useNavigate } from "react-router-dom";
import InputPassword from "../components/input-password/input-password";
import UserFormParagraph from "../components/user-form-paragraph/user-form-paragraph";
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

  const handleUserLogin = async (data) => {
    try {
      const res = await loginUser({ ...data }).unwrap();
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
        <form onSubmit={methods.handleSubmit(handleUserLogin)}>
          <label htmlFor="email">
            Email<span className="label-asterisk">*</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            autoComplete="off"
            {...methods.register("email")}
          />
          <InputPassword placeholder={"Enter password"} />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </FormProvider>
      <UserFormParagraph
        paragraphText="Don't have an akkount?"
        linkText="Register one"
        linkHref="/register"
      />
    </section>
  );
}
