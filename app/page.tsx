import Navbar from '@/components/navbar';
import Table from '@/components/table';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-start">
      <Navbar />
      <Table />
    </main>
  );
}
