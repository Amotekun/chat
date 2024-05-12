"use client";

import { SessionProvider } from "next-auth/react";

export interface AuthModalProps {
    children: React.ReactNode;
}

export default function AuthModal ({
    children
}: AuthModalProps) {
    return <SessionProvider>{children}</SessionProvider>;
}