import { MetalDataPlate } from '@/components/ui/MetalDataPlate';
import { PaperSheet } from '@/components/ui/PaperSheet';
import { FolderTab } from '@/components/ui/FolderTab';
import { TechnicalFigure } from '@/components/ui/TechnicalFigure';
import { PhysicalButton } from '@/components/ui/PhysicalButton';
import { SystemsRibbonSvg } from '@/components/ui/SystemsRibbonSvg';
import { Link } from 'wouter';
import { useSEO } from '@/hooks/use-seo';

export default function Skyryder() {
  useSEO('Skyryder | Vian Garg', 'Skyryder is an original playable game project, published independently on itch.io.');

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700 pb-16">
      <FolderTab />
      
      <div className="flex flex-col gap-6 items-start -mt-4">
        <MetalDataPlate>PROJECT 04 / INTERACTIVE WORK</MetalDataPlate>
        
        <PaperSheet className="p-8 md:p-12 w-full max-w-4xl" variant="clipped">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4 leading-tight">Skyryder</h1>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mb-8">
            Skyryder is an original playable game project, published independently on itch.io.
          </p>
          <a 
            href="https://vian-g.itch.io/skyryder" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[2px]"
          >
            <PhysicalButton asDiv variant="rust" size="lg" className="w-full sm:w-auto">
              PLAY SKYRYDER ON ITCH.IO ↗
            </PhysicalButton>
          </a>
        </PaperSheet>
      </div>

      <div className="w-full max-w-4xl mb-12">
        <TechnicalFigure 
          caption="Skyryder flight mechanics / conceptual trajectory"
          label="FLIGHT TRAJECTORY / CONCEPTUAL"
          altText="Flight trajectory schematic"
          figureNumber="01"
        >
          <SystemsRibbonSvg activeState="04" />
        </TechnicalFigure>
      </div>
      
      <div className="w-full max-w-4xl flex justify-center mb-4">
        <a 
          href="https://vian-g.itch.io/skyryder" 
          target="_blank" 
          rel="noopener noreferrer"
          className="outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[2px]"
        >
          <PhysicalButton asDiv variant="metal" size="md">
            PLAY THE FULL GAME ↗
          </PhysicalButton>
        </a>
      </div>

      <div className="max-w-4xl w-full flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t border-border">
        <Link href="/projects/computer-vision" className="w-full sm:w-auto outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[2px]">
          <PhysicalButton asDiv variant="graphite" className="w-full sm:w-auto flex gap-3 text-xs" data-testid="nav-prev">
            <span className="text-muted-foreground/70">{'<-'} PREV</span>
            <span>03 / VISION</span>
          </PhysicalButton>
        </Link>
        <Link href="/projects/moon-miners" className="w-full sm:w-auto outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[2px]">
          <PhysicalButton asDiv variant="graphite" className="w-full sm:w-auto flex gap-3 text-xs" data-testid="nav-next">
            <span>01 / MOON MINERS</span>
            <span className="text-muted-foreground/70">NEXT {'->'}</span>
          </PhysicalButton>
        </Link>
      </div>
    </div>
  );
}
