// components
import Form from "../components/form/form";

// react lib
import { useEffect } from "react";

// redux lib
import { useSelector, useDispatch } from "react-redux";
import { useLoginUserMutation } from "../redux/api/users-api-slice";
import { setCredentials } from "../redux/features/auth/auth-slice";

// react-router-dom lib
import { useNavigate } from "react-router-dom";

// react-hook-form lib
import { useForm, FormProvider } from "react-hook-form";

// lib
import { useHeadTags } from "../hooks/use-head-tags";
import { parseFormData, checkParsingError } from "../lib/parse-form-data";

// pkgs
import toast from "react-hot-toast";

/**
 * Login page component.
 *
 * This page contains the form to log in user in the web app.
 *
 * @returns {JSX.Element} The rendered Login page component.
 */
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
  const tokenExpDate = useSelector((state) => state.auth.tokenExpDate);

  const [loginUser, { isLoading }] = useLoginUserMutation();

  useEffect(() => {
    if (user && tokenExpDate) {
      methods.reset();
      navigate("/", { replace: true });
    }
  }, [user, tokenExpDate, navigate, methods.reset]);

  // this below fires a useEffect
  useHeadTags("login");

  const handleUserLogin = async (data) => {
    const parsedData = parseFormData(data);
    const error = checkParsingError(parsedData);
    if (error) {
      toast.error(error);
      return;
    }

    try {
      const res = await loginUser(parsedData).unwrap();
      dispatch(
        setCredentials({
          user: res.body.name,
          tokenExpDate: res.body.tokenExpDate,
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
          formParagraphArrayProps={[
            {
              paragraphText: "Don't have an akkount?",
              linkText: "Register one",
              linkHref: "/register",
            },
            {
              paragraphText: "Forgot your password?",
              linkText: "Rekover it",
              linkHref: "/forgot-password",
            },
          ]}
        />
      </FormProvider>
    </section>
  );
}
