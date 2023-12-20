import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAPIClient } from "@/lib/api";
import React, { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";

export function DialogAction({
  variant,
  setTransition,
}: {
  variant: "debit" | "credit";
  setTransition: Dispatch<SetStateAction<boolean>>;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);

  function handleChange(value: number) {
    if (isNaN(value)) return;

    setValue(value);
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoading(true);

    const valueToSend = variant == "credit" ? value : -value;

    try {
      const fetcher = await getAPIClient();

      const { status } = await fetcher.post("/transactions", {
        value: valueToSend,
        account_id: 1,
      });

      if (status === 201) {
        toast("Transação efetuada com sucesso!");
        setTransition((prev) => !prev);
        return;
      }

      return toast(
        "Erro ao concluir a transação. Tente novamente em instantes."
      );
    } catch (error) {
      toast("Erro ao concluir a transação. Tente novamente em instantes.");
    } finally {
      setOpen(false);
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link">
          {variant === "credit" ? "Depósito" : "Saque"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {variant === "credit" ? "Depositar" : "Sacar"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Valor
            </Label>
            <Input
              id="value"
              name="value"
              defaultValue={0}
              value={value}
              onChange={(e) => handleChange(Number(e.target.value))}
              type="tel"
              min={0}
              className="col-span-3"
              autoComplete="off"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <PulseLoader color="#ffffff" size={8} />
            ) : variant === "credit" ? (
              "Depositar"
            ) : (
              "Sacar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
