import { useForm, FormProvider } from "react-hook-form";
import { useRegisterUserMutation } from "../redux/api/users-api-slice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Form from "../components/form/form";
import UserFormParagraph from "../components/user-form-paragraph/user-form-paragraph";
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

  const handleUserRegistration = async (data) => {
    try {
      const res = await registerUser({ ...data }).unwrap();
      if (res?.body.name) {
        toast.success(res.message);
        navigate("/login", { replace: true });
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
      <UserFormParagraph
        paragraphText="Already have an akkount?"
        linkText="Log in"
        linkHref="/login"
      />
    </section>
  );
}
