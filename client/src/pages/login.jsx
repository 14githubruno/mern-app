import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useLoginUserMutation } from "../redux/api/users-api-slice";
import { setCredentials } from "../redux/features/auth/auth-slice";
import { useNavigate } from "react-router-dom";
import UserFormParagraph from "../components/user-form-paragraph/user-form-paragraph";
import toast from "react-hot-toast";

export default function Login() {
  const { register, handleSubmit, reset } = useForm({
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
      reset();
      navigate("/", { replace: true });
    }
  }, [user, tokenExpirationDate, navigate, reset]);

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
      <form onSubmit={handleSubmit(handleUserLogin)}>
        <label htmlFor="email">
          Email<span className="label-asterisk">*</span>
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter email"
          autoComplete="off"
          {...register("email")}
        />
        <label htmlFor="password">
          Password<span className="label-asterisk">*</span>
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          autoComplete="off"
          {...register("password")}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log in"}
        </button>
      </form>
      <UserFormParagraph
        paragraphText="Don't have an akkount?"
        linkText="Register one"
        linkHref="/register"
      />
    </section>
  );
}
