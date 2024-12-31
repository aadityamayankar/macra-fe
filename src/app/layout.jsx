export const metadata = {
  icons: { icon: '/logo.svg' },
};

import ClientLayout from './layout.client';

export default function ServerLayout({ children }) {
  return <ClientLayout>{children}</ClientLayout>;
}