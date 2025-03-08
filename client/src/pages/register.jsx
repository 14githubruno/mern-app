// components
import PageTitle from "../components/page-title/page-title";
import Form from "../components/form/form";

// react hooks
import { useEffect } from "react";

// redux
import { useSelector } from "react-redux";
import { useRegisterUserMutation } from "../redux/api/users-api-slice";

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
 * Register page component.
 *
 * This page contains the form to allow user to create a personal account.
 *
 * @returns {JSX.Element} The rendered Register page component.
 */
export default function Register() {
  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  useEffect(() => {
    if (user) {
      toast.error("You are currently logged in. To Register new user, log out");
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  // this below fires a useEffect
  useHeadTags("register");

  const handleUserRegistration = async (data) => {
    const parsedData = parseFormData(data);
    const error = checkParsingError(parsedData);
    if (error) {
      toast.error(error);
      return;
    }

    try {
      const res = await registerUser(parsedData).unwrap();
      if (res.body) {
        toast.success(res.message);
        navigate(`/verify/${res.body.token}`, { replace: true });
      }
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <section>
      <PageTitle title={"Register a new akkount"} />
      <FormProvider {...methods}>
        <Form
          typeOfForm={"register user"}
          onSubmit={handleUserRegistration}
          formButtonProps={{
            isLoading,
            textOnLoading: "Registering...",
            text: "Register",
          }}
          formParagraphArrayProps={[
            {
              paragraphText: "Already have an akkount?",
              linkText: "Log in",
              linkHref: "/login",
            },
          ]}
        />
      </FormProvider>
    </section>
  );
}
