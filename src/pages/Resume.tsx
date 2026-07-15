import { MetalDataPlate } from '@/components/ui/MetalDataPlate';
import { PaperSheet } from '@/components/ui/PaperSheet';
import { PhysicalButton } from '@/components/ui/PhysicalButton';
import { ResumeAction } from '@/components/ui/ResumeAction';
import { useSEO } from '@/hooks/use-seo';
import { ArrowUpRight, Download, ArrowRight, Mail } from 'lucide-react';
import { Link } from 'wouter';
import { EMAIL } from '@/config/contact';

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

          <div className="flex flex-col sm:flex-row gap-3 border-t border-border/50 pt-8 mt-8">
            <Link href="/projects" className="outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-[2px]">
              <PhysicalButton asDiv variant="rust" size="sm" className="gap-2">
                See my work <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
              </PhysicalButton>
            </Link>
            <a href={`mailto:${EMAIL}`} className="outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-[2px]">
              <PhysicalButton asDiv variant="metal" size="sm" className="gap-2">
                Get in touch <Mail className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
              </PhysicalButton>
            </a>
          </div>
        </PaperSheet>
      </div>

    </div>
  );
}
