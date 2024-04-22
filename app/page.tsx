import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <div className='flex justify-between'>
        <ConnectButton />
      </div>
      <div className="flex flex-col items-center space-y-4">
        <h1 className='text-5xl text-center font-normal'>Search and discover <br/> your crypto tokens</h1>
        <p className='text-xl opacity-30 font-light'>Connect your wallet to get started</p>
      </div>
    </main>
  );
}
