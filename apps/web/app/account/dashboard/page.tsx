"use client";
import Link from "next/link";
import { Button } from "@repo/ui/button";
import { LogoutButton } from "@repo/ui/auth/logout-button";
import { AuthClient } from "@repo/auth/auth-client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ButtonGroup } from "@repo/ui/button-group";
import Image from "next/image";

export default function DashboardPage() {
    const { data, isPending } = AuthClient.useSession();
    const router = useRouter();

    useEffect(() => {
        // Wait for the session to resolve before doing anything.
        if (isPending) return;

        if (data == null) {
            router.push("/account/signup");
            return;
        }
    }, [data, isPending]);

    const canPublish = !!data?.user.emailVerified;

    return (
        <main className="mx-auto max-w-4xl px-6 py-16 space-y-8 min-h-screen flex pt-28 items-center flex-col w-full gap-4">
            <div className="flex flex-col items-center justify-center gap-4 w-full">
                <h1 className="text-3xl font-bold tracking-tight">
                    Welcome back, {data?.user.name}
                </h1>
                {data?.user.image && (
                    <Image
                        alt={data?.user.name}
                        src={data?.user.image}
                        width={128}
                        height={128}
                        className="rounded-full m-4 border-2 border-blue-600 p-2"
                    />
                )}
                <p className="text-muted-foreground">{data?.user.email}</p>
                <ButtonGroup className="grid grid-cols-2 w-full">
                    <LogoutButton />
                    <Button
                        onClick={() => {
                            router.push("/account/edit");
                        }}
                    >
                        Edit
                    </Button>
                </ButtonGroup>
            </div>
        </main>
    );
}
