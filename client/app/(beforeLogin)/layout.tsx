import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default async function BeforeLoginLayout({ children }: Props) {
  return <div>{children}</div>;
}
