"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AuthForm({ className, ...props }: AuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    console.log(formData.get("email"))

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
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
          <Button disabled={isLoading}>Entrar</Button>
        </div>
      </form>
    </div>
  );
}
