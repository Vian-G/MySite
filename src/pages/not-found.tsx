import { Link } from 'wouter';
import { PaperSheet } from '@/components/ui/PaperSheet';
import { MetalDataPlate } from '@/components/ui/MetalDataPlate';
import { PhysicalButton } from '@/components/ui/PhysicalButton';
import { useSEO } from '@/hooks/use-seo';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  useSEO('404 | Vian Garg', 'Page not found.');

  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center animate-in fade-in duration-700">
      <div className="flex flex-col gap-6 items-center">
        <MetalDataPlate>SYS_ERR / 404</MetalDataPlate>
        <PaperSheet className="p-8 md:p-12 max-w-md text-center flex flex-col items-center gap-6" variant="clipped">
          <h1 className="font-serif text-3xl md:text-4xl text-foreground">File not found</h1>
          <p className="font-sans text-muted-foreground text-sm leading-relaxed">
            The requested technical document or project log could not be located in the current directory.
          </p>
          <Link href="/" className="outline-none mt-2 focus-visible:ring-2 focus-visible:ring-primary rounded-[2px]">
            <PhysicalButton asDiv variant="graphite" className="gap-2">Return to index <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" /></PhysicalButton>
          </Link>
        </PaperSheet>
      </div>
    </div>
  );
}
