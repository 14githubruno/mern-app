import { useForm } from "react-hook-form";
import { useRegisterUserMutation } from "../redux/api/users-api-slice";
import { useNavigate } from "react-router-dom";
import UserFormParagraph from "../components/user-form-paragraph/user-form-paragraph";
import toast from "react-hot-toast";

export default function Register() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

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
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={handleSubmit(handleUserRegistration)}
      >
        <label htmlFor="name">
          Name<span className="label-asterisk">*</span>
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter name"
          autoComplete="off"
          {...register("name")}
        />
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
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
      <UserFormParagraph
        paragraphText="Already have an akkount?"
        linkText="Log in"
        linkHref="/login"
      />
    </section>
  );
}
