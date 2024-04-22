import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';

export default function Navbar() {
  return (
    <div className='flex justify-between w-full px-12 py-4 backdrop-blur-xl border-b border-b-white/10'>
      <Image
        className=""
        src="/logo.svg"
        alt="Logo"
        width={120}
        height={37}
        priority
      />
      <ConnectButton />
    </div>
  );
}