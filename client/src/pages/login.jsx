import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useLoginUserMutation } from "../redux/api/users-api-slice";
import { setCredentials } from "../redux/features/auth/auth-slice";
import { useNavigate } from "react-router-dom";

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
  const token = useSelector((state) => state.auth.token);
  const [loginUser, { isLoading }] = useLoginUserMutation();

  useEffect(() => {
    if (user && token) {
      reset();
      navigate("/", { replace: true });
    }
  }, [user, token, navigate, reset]);

  const handleUserLogin = async (data) => {
    try {
      const res = await loginUser({ ...data }).unwrap();
      console.log(res);
      dispatch(setCredentials({ user: res.body.name, token: res.body.token }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={handleSubmit(handleUserLogin)}
      >
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
    </section>
  );
}
