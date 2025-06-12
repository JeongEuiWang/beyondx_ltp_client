import { useSignUpForm, useSignUp, ISignUpForm } from "@/features/user";
import { RowLabelFormInput, ErrorMessage } from "@/shared/components";
import { Separator, Button } from "@/shared/ui";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const SignUpForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useSignUpForm();

  const { mutate, isPending } = useSignUp({
    onSuccess: (response) => {
      console.log(response);
      toast.success(`Welcome, ${response.first_name} ${response.last_name}`);
      navigate("/sign-in");
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
  });

  const onSubmit: SubmitHandler<ISignUpForm> = async (data) => {
    mutate({
      email: data.email,
      password: data.password,
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Deliveries Today, Pioneering Tomorrow's
        </p>
      </div>
      <div className="grid gap-6">
        <RowLabelFormInput
          label="Email"
          id="email"
          type="text"
          placeholder="Enter your email"
          {...register("email")}
          required
          autoComplete="off"
        />
        <RowLabelFormInput
          label="Password"
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register("password")}
          required
        />
        <RowLabelFormInput
          label="Confirm Password"
          id="confirm-password"
          type="password"
          placeholder="Enter your password again"
          {...register("confirm_password")}
          required
        />
        {(errors.email?.message ||
          errors.password?.message ||
          errors.confirm_password?.message) && (
          <ErrorMessage
            className="ml-30"
            errors={errors}
            fields={[
              { field: "email", label: "Email" },
              { field: "password", label: "Password" },
              { field: "confirm_password", label: "Confirm Password" },
            ]}
          />
        )}
        <Separator />
        <RowLabelFormInput
          label="First Name"
          id="first_name"
          type="text"
          placeholder="Enter your first name"
          {...register("first_name")}
          required
          autoComplete="off"
        />
        <RowLabelFormInput
          label="Last Name"
          id="last_name"
          type="text"
          placeholder="Enter your last name"
          {...register("last_name")}
          required
        />
        <RowLabelFormInput
          label="Phone"
          id="phone"
          type="text"
          placeholder="Enter your phone number(000-0000-0000)"
          {...register("phone")}
          required
        />
        {(errors.first_name?.message ||
          errors.last_name?.message ||
          errors.phone?.message) && (
          <ErrorMessage
            className="ml-30"
            errors={errors}
            fields={[
              { field: "first_name", label: "First Name" },
              { field: "last_name", label: "Last Name" },
              { field: "phone", label: "Phone" },
            ]}
          />
        )}
      </div>
      <Button disabled={isPending} type="submit" className="w-full">
        Sign Up
      </Button>
      <Separator />
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/sign-in" className="text-blue-600 hover:underline">
          Sign In
        </a>
      </div>
    </form>
  );
};

export default SignUpForm;
