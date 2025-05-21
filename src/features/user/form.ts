import { z } from "zod";

const signUpSchema = z
  .object({
    password: z.string().nonempty("Please enter your password"),
    confirm_password: z.string(),
    email: z
      .string()
      .nonempty("Please enter your email")
      .email("Please enter a valid email"),
    first_name: z.string().nonempty("Please enter your first name"),
    last_name: z.string().nonempty("Please enter your last name"),
    phone: z
      .string()
      .nonempty("Please enter your phone number")
      .regex(
        /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-[0-9]{3,4}-[0-9]{4}$/,
        "Please enter a valid phone number"
      ),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "The password does not match",
  });

type ISignUpForm = z.infer<typeof signUpSchema>;

export { signUpSchema };

export type { ISignUpForm };
