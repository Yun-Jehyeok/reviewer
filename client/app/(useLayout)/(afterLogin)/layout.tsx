import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default async function AfterLoginLayout({ children }: Props) {
    return <div>{children}</div>;
}
