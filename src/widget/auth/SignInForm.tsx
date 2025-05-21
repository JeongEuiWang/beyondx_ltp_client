import { toast } from "sonner";
import { SubmitHandler } from "react-hook-form";
import { Button, Input, Label, Separator } from "@/shared/ui";
import { useNavigate } from "react-router";
import { ISignInForm, useSignInForm, useSignIn } from "@/features/auth";

const SignInForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useSignInForm();

  const { mutate } = useSignIn({
    onSuccess: (response) => {
      navigate("/service");
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
  });

  const onSubmit: SubmitHandler<ISignInForm> = async (data) => {
    mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Deliveries Today, Pioneering Tomorrow's
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex justify-between w-full">
            <Label htmlFor="email">Email</Label>
            {errors.email && (
              <p className="text-xs leading-none text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>
          <Input
            id="email"
            type="text"
            placeholder="Enter your email"
            {...register("email")}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex justify-between w-full">
            <Label htmlFor="password">Password</Label>
            {errors.password && (
              <p className="text-xs leading-none text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
        </div>
        <Button type="submit" className="w-full">
          Sign In
        </Button>
        <Separator />
      </div>
      <div className="text-center text-sm">
        Don't have an account?{" "}
        <a href="/sign-up" className="text-blue-600">
          Sign Up
        </a>
      </div>
    </form>
  );
};

export default SignInForm;
