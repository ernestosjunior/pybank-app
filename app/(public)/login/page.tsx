import { AuthForm } from "@/app/(public)/login/components/auth-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PyBank | Login",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative h-[100dvh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 px-0">
        <div className="relative h-full lg-max:h-auto flex-col lg:bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 lg-max:hidden bg-zinc-900" />
          <div className="relative z-20 flex items-center text-3xl font-bold tracking-tight lg-max:text-zinc-900">
            PyBank
          </div>
        </div>
        <div className="lg:p-8 h-full lg-max:h-auto lg-max:mt-12 flex">
          <div className="mx-auto flex w-full flex-col justify-center lg-max:justify-start space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
              <p className="text-sm text-muted-foreground">
                Entre com seu e-mail e senha
              </p>
            </div>
            <AuthForm />
          </div>
        </div>
      </div>
    </>
  );
}
