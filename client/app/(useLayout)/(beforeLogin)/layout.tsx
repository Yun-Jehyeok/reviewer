"use client";

import { useGetUserQuery } from "@/hooks/queries/user";
import { useQueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function BeforeLoginLayout({ children }: Props) {
    const queryClient = useQueryClient();
    const { user, error, isPending } = useGetUserQuery();

    if (user) {
        redirect("/");
        return null;
    }

    return <div>{children}</div>;
}
