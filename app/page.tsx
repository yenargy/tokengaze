import Navbar from '@/components/navbar';
import PageHeader from '@/components/page-header';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-start">
      <Navbar />
      <PageHeader />
    </main>
  );
}
