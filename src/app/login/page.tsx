"use client";

import { useState } from "react";
import { z } from "zod";
import AutoForm from "~/components/ui/auto-form";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { loginSchema } from "~/lib/schemas/login";
import { login } from "~/app/actions/login";
import { useToast } from "~/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);

    await signIn("credentials", {
     ...values,
     redirect: false,
    })
     .then((data) => {
       if (data && data?.error) {
         throw new Error("Fel lösenord eller e-post");
       }

       router.push("/admin")
     })
     .catch((err) => {
       toast({
         title: "Hoppsan, någonting gick fel...",
         description: err.message,
         variant: "destructive",
       });
     });
    setIsLoading(false);
  };

  return (
    <main className="container flex h-[calc(100vh-100px)] items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Logga in som admin</CardTitle>
          <CardDescription>
            Skriv in ditt lösenord nedan för att logga in.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <AutoForm
            onSubmit={onSubmit}
            formSchema={loginSchema}
            fieldConfig={{
              password: {
                label: "Lösenord",
                inputProps: {
                  type: "password",
                },
              },
              email: {
                label: "E-post",
                inputProps: {
                  type: "email",
                },
              },
            }}
          >
            <Button className="mt-5 w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <span>Sign in</span>
              )}
            </Button>
          </AutoForm>
        </CardContent>
      </Card>
    </main>
  );
}
