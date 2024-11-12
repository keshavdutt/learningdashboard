import HomeHeader from '@/components/Homeheader/HomeHeader';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div >
      <main >{children}</main>
    </div>
  );
}
