import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Account } from "@/lib/types/account.type";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { format } from "date-fns";
import React from "react";

export function Transactions({
  transactions,
}: {
  transactions: Account["transactions"];
}) {
  return (
    <div className="space-y-8">
      {React.Children.toArray(
        transactions?.map(({ value, created_at }) => {
          const isCredit = value > 0;
          return (
            <div className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>{isCredit ? "D" : "S"}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {isCredit ? "Depósito" : "Saque"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(created_at), "dd/MM/yyyy")}
                </p>
              </div>
              <div className="ml-auto font-medium">
                {numberToCurrency(value)}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
