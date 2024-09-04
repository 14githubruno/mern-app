import { useHeadTags } from "../hooks/use-head-tags";
import { useForm, FormProvider } from "react-hook-form";
import { useRegisterUserMutation } from "../redux/api/users-api-slice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { parseFormData, checkParsingError } from "../lib/parse-form-data";
import Form from "../components/form/form";
import toast from "react-hot-toast";

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
    if (user !== null) {
      toast.error("You are currently logged in. To Register new user, log out");
      navigate("/", { replace: true });
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
      toast.error(err?.data?.message);
    }
  };

  return (
    <section>
      <FormProvider {...methods}>
        <Form
          typeOfForm={"register user"}
          onSubmit={handleUserRegistration}
          formButtonProps={{
            isLoading,
            textOnLoading: "Registering...",
            text: "Register",
          }}
        />
      </FormProvider>
    </section>
  );
}
