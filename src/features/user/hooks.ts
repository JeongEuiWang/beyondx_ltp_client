import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ISignUpForm, signUpSchema } from "./form";

const useSignUpForm = () => {
  return useForm<ISignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
      first_name: "",
      last_name: "",
      phone: "",
    },
  });
};

export { useSignUpForm };
