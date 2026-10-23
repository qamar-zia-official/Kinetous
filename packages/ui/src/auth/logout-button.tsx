"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthClient } from "@repo/auth/auth-client";
import { Button } from "../button";

export function LogoutButton({
    className,
    redirectTo = "/",
}: {
    className?: string;
    redirectTo?: string;
}) {
    const router = useRouter();
    const [pending, setPending] = useState(false);

    async function handleLogout() {
        setPending(true);
        await AuthClient.signOut();
        router.push(redirectTo);
        router.refresh();
    }

    return (
        <Button
            variant="outline"
            className={className}
            disabled={pending}
            onClick={handleLogout}
        >
            {pending ? "Signing out…" : "Log out"}
        </Button>
    );
}
