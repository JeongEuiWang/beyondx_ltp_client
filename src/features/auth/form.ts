import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email().nonempty("이메일을 입력해주세요."),
  password: z.string().nonempty("비밀번호를 입력해주세요."),
})

type ISignInForm = z.infer<typeof signInSchema>;

export {
  signInSchema
}

export type {
  ISignInForm
}