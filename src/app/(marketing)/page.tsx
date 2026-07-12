import { Download } from '@/components/sections/Download';
import { Features } from '@/components/sections/Features';
import { Hero } from '@/components/sections/Hero';
import { WaitlistForm } from '@/components/sections/WaitlistForm';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Download />
      <WaitlistForm />
    </>
  );
}
