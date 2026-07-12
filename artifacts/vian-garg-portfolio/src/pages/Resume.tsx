import { MetalDataPlate } from '@/components/ui/MetalDataPlate';
import { PaperSheet } from '@/components/ui/PaperSheet';
import { PhysicalButton } from '@/components/ui/PhysicalButton';
import { RESUME_PDF_URL } from '@/config/resume';
import { useSEO } from '@/hooks/use-seo';

export default function Resume() {
  useSEO('Résumé | Vian Garg', 'Download the current résumé for a concise overview of education, technical experience, and projects.');
  
  const isAvailable = Boolean(RESUME_PDF_URL);

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
            {isAvailable ? (
              <>
                <a 
                  href={RESUME_PDF_URL as string} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[2px]"
                >
                  <PhysicalButton asDiv variant="graphite" size="md" className="w-full">
                    VIEW RÉSUMÉ PDF ↗
                  </PhysicalButton>
                </a>
                <a 
                  href={RESUME_PDF_URL as string} 
                  download 
                  className="w-full sm:w-auto outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[2px]"
                >
                  <PhysicalButton asDiv variant="metal" size="md" className="w-full">
                    DOWNLOAD RÉSUMÉ PDF ↓
                  </PhysicalButton>
                </a>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-1 w-full sm:w-auto">
                  <PhysicalButton asDiv variant="graphite" size="md" className="w-full opacity-50 cursor-not-allowed" disabled>
                    VIEW RÉSUMÉ PDF ↗
                  </PhysicalButton>
                  <span className="font-mono text-[10px] text-muted-foreground text-center">PDF pending upload</span>
                </div>
                <div className="flex flex-col gap-1 w-full sm:w-auto">
                  <PhysicalButton asDiv variant="metal" size="md" className="w-full opacity-50 cursor-not-allowed" disabled>
                    DOWNLOAD RÉSUMÉ PDF ↓
                  </PhysicalButton>
                  <span className="font-mono text-[10px] text-muted-foreground text-center hidden sm:block">&nbsp;</span>
                </div>
              </>
            )}
          </div>
        </PaperSheet>
      </div>

    </div>
  );
}
