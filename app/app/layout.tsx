import './globals.css';

export const metadata = { title: 'ERP La Papeliê', description: 'ERP da La Papeliê' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
