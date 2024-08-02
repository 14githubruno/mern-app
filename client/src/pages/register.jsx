import { useForm } from "react-hook-form";
import { useRegisterUserMutation } from "../redux/api/users-api-slice";
import { useNavigate } from "react-router-dom";

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
        navigate("/login", { replace: true });
      }
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
    </section>
  );
}
