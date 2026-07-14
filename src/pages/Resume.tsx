import { MetalDataPlate } from '@/components/ui/MetalDataPlate';
import { PaperSheet } from '@/components/ui/PaperSheet';
import { PhysicalButton } from '@/components/ui/PhysicalButton';
import { ResumeAction } from '@/components/ui/ResumeAction';
import { useSEO } from '@/hooks/use-seo';
import { ArrowUpRight, Download } from 'lucide-react';

export default function Resume() {
  useSEO('Résumé | Vian Garg', 'Download the current résumé for a concise overview of education, technical experience, and projects.');

  return (
    <div className="flex flex-col gap-12 animate-in fade-in duration-700 max-w-2xl pb-16">
      
      <div className="flex flex-col gap-6 items-start">
        <MetalDataPlate>DOCUMENT / RÉSUMÉ</MetalDataPlate>
        
        <PaperSheet className="p-8 md:p-12 w-full" variant="clipped">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">Résumé</h1>
          <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-8">
            Download the current résumé for a concise overview of education, technical experience, and projects.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 border-t border-border pt-8">
            <ResumeAction mode="view">
              {(onClick) => (
                <PhysicalButton onClick={onClick} variant="graphite" size="md" className="w-full gap-2">
                  View Résumé PDF <ArrowUpRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                </PhysicalButton>
              )}
            </ResumeAction>
            <ResumeAction mode="download">
              {(onClick) => (
                <PhysicalButton onClick={onClick} variant="metal" size="md" className="w-full gap-2">
                  Download PDF <Download className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                </PhysicalButton>
              )}
            </ResumeAction>
          </div>

          <p className="mt-6 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
            A quick human check runs before the file opens — it takes about a second.
          </p>
        </PaperSheet>
      </div>

    </div>
  );
}
