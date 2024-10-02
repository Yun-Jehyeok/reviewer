import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function BeforeLoginLayout({ children }: Props) {
    return <div>{children}</div>;
}
