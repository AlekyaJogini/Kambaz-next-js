import { ReactNode } from 'react';

// Option 1: Using async/await (recommended)
export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ cid: string }>;
}) {
  const { cid } = await params;
  
  return (
    <div>
      {/* You can use cid here if needed */}
      {children}
    </div>
  );
}