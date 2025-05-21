import { SignInForm } from "@/widget/auth";
import SignInImage from "@/shared/assets/images/img_sign_in.jpg";

export default function SignIn() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col p-6">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <SignInForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img src={SignInImage} alt="Image" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
