import { useParams, Link } from 'wouter';
import { PaperSheet } from '@/components/ui/PaperSheet';
import { MetalDataPlate } from '@/components/ui/MetalDataPlate';
import { PhysicalButton } from '@/components/ui/PhysicalButton';

export default function WorkDetail() {
  const { slug } = useParams();
  
  return (
    <div className="flex flex-col gap-12 animate-in fade-in duration-700">
      
      <div className="flex items-center justify-between">
        <Link href="/work" className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm">
          {'<-'} RETURN_TO_ARCHIVE
        </Link>
        <MetalDataPlate screwPositions="none" className="bg-[#2B2D2A] text-[#F1EDE4] border-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
          FILE_REF: {slug?.toUpperCase().replace(/-/g, '_')}
        </MetalDataPlate>
      </div>

      <div className="flex flex-col gap-6">
        <h1 className="font-serif text-4xl md:text-6xl text-foreground capitalize">
          {slug?.replace(/-/g, ' ')}
        </h1>
        
        <div className="flex flex-wrap gap-6 md:gap-12 font-mono text-xs text-secondary-foreground border-y border-border py-4">
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">TIMELINE</span>
            <span>2024_Q1</span>
          </div>
          <div className="w-px h-8 bg-border hidden sm:block" />
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">ROLE</span>
            <span>LEAD_ENGINEER</span>
          </div>
          <div className="w-px h-8 bg-border hidden sm:block" />
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">DOMAIN</span>
            <span>ROBOTICS, CONTROL</span>
          </div>
        </div>
      </div>

      <PaperSheet className="min-h-[400px] flex items-center justify-center p-8 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.01)_25%,rgba(0,0,0,0.01)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.01)_75%,rgba(0,0,0,0.01)_100%)] bg-[size:20px_20px]">
        <div className="text-center flex flex-col items-center gap-6 max-w-md">
          <div className="w-16 h-16 border border-dashed border-muted-foreground/30 flex items-center justify-center rotate-45">
             <div className="w-1.5 h-1.5 bg-primary/50" />
          </div>
          
          <div className="space-y-2">
            <h3 className="font-mono text-sm text-foreground uppercase tracking-widest">Documentation Pending</h3>
            <p className="font-sans text-sm text-muted-foreground">
              Technical details, schematics, and source code analysis for this project are currently being compiled for presentation.
            </p>
          </div>
          
          <Link href="/work" tabIndex={-1}>
             <PhysicalButton variant="metal" size="sm">CLOSE_FILE</PhysicalButton>
          </Link>
        </div>
      </PaperSheet>

    </div>
  );
}
