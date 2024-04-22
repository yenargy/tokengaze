import Navbar from '@/components/navbar';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-start">
      <Navbar />
      <div className="flex flex-col items-center space-y-4 p-24">
        <h1 className='text-5xl text-center font-extralight'>Search and discover <br/> your crypto tokens</h1>
        <p className='text-xl opacity-30 font-light'>Connect your wallet to get started</p>
      </div>
    </main>
  );
}
