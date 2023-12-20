"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as React from "react";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AuthForm({ className, ...props }: AuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    try {
      const result = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      if (result?.error === "CredentialsSignin") {
        return toast.error("Credenciais inválidas!");
      }

      router.replace("/");
    } catch (error) {
      return toast.error(
        "Ocorreu um erro no login. Tente novamente!"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6 px-8 sm:px-0", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-8">
          <div className="grid gap-4">
            <Label className="sr-only" htmlFor="email">
              E-mail
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="e-mail"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Label className="sr-only" htmlFor="password">
              Senha
            </Label>
            <Input
              id="password"
              name="password"
              placeholder="senha"
              type="password"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading} type="submit">
            {isLoading ? <PulseLoader color="#ffffff" size={8} /> : "Entrar"}
          </Button>
        </div>
      </form>
    </div>
  );
}
