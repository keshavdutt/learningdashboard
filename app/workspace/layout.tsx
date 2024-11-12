// app/workspace/layout.tsx (Workspace Layout)
import HomeHeader from '@/components/Homeheader/HomeHeader';
import { ReactNode } from 'react';

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <div >
      <main >{children}</main>
    </div>
  );
}
