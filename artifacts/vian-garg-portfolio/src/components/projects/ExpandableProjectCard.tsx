import React from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { MetalDataPlate } from '@/components/ui/MetalDataPlate';
import { PaperSheet } from '@/components/ui/PaperSheet';
import { PhysicalButton } from '@/components/ui/PhysicalButton';
import { SystemsRibbonSvg } from '@/components/ui/SystemsRibbonSvg';
import { TornPhotoWindow } from '@/components/ui/TornPhotoWindow';

export interface ProjectCardData {
  id: string;
  title: string;
  role?: string;
  type?: string;
  summary: string;
  tools?: string;
  href: string;
  photo: string;
  /** A couple of extra images shown only once the card is expanded. */
  galleryPhotos?: string[];
  /** Short punchy stats/facts pulled from the full case study, shown only once expanded. */
  facts?: string[];
}

/** Shared layoutId for the schematic icon module — lets it visually "merge" into an expanded
 *  card (flying out of the sticky side panel) and "unmerge" back when the card collapses. */
export const ICON_MERGE_LAYOUT_ID = 'project-icon-merge';

interface ExpandableProjectCardProps {
  project: ProjectCardData;
  index: number;
  isExpanded: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onRequestExpand: () => void;
  onNavigate: () => void;
}

function isCoarsePointer() {
  return typeof window !== 'undefined' && window.matchMedia?.('(hover: none)').matches;
}

export function ExpandableProjectCard({
  project: prj,
  index: i,
  isExpanded,
  onHoverStart,
  onHoverEnd,
  onRequestExpand,
  onNavigate,
}: ExpandableProjectCardProps) {
  const handleCardClick = (e: React.MouseEvent) => {
    if (isCoarsePointer() && !isExpanded) {
      e.preventDefault();
      onRequestExpand();
      return;
    }
    e.preventDefault();
    onNavigate();
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onNavigate();
  };

  return (
    <motion.div
      layout
      id={`project-${prj.id}`}
      className="scroll-mt-32 relative"
      style={{ zIndex: isExpanded ? 30 : 1 }}
      animate={{
        marginLeft: isExpanded ? 'calc(50% - 46vw)' : '0px',
        marginRight: isExpanded ? 'calc(50% - 46vw)' : '0px',
        width: isExpanded ? '92vw' : '100%',
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 30, mass: 0.9 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      <Link
        href={prj.href}
        onClick={handleCardClick}
        className="outline-none block group focus-visible:ring-2 focus-visible:ring-primary rounded-[2px]"
      >
        <PaperSheet isInteractive className="p-6 md:p-8 flex flex-col gap-6 group-hover:border-primary/40 transition-colors h-full" variant={i % 2 === 0 ? "clipped" : "default"}>
          <div className="flex justify-between items-start">
            <MetalDataPlate title="ENTRY">{prj.id}</MetalDataPlate>
            {prj.type && (
              <div className="font-mono text-[10px] text-muted-foreground bg-secondary/50 px-2 py-1 border border-border/50 uppercase tracking-wider">
                {prj.type}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-center">
            <div className="flex-1">
              <h2 className="font-serif text-2xl text-foreground group-hover:text-primary transition-colors mb-2">{prj.title}</h2>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                {prj.summary}
              </p>
            </div>
            <motion.div layout className="hidden sm:block shrink-0">
              <TornPhotoWindow
                src={prj.photo}
                alt={`Photo reference for ${prj.title}`}
                variant={(i % 3) as 0 | 1 | 2}
                rotate={i % 2 === 0 ? -4 : 3}
                className={isExpanded ? 'w-40 h-40 md:w-48 md:h-48' : 'w-28 h-28 md:w-32 md:h-32'}
              />
            </motion.div>
          </div>

          <div className="w-full h-48 border border-border/50 bg-[#E8E6D9] overflow-hidden flex items-center justify-center p-4 lg:hidden shadow-[inset_0_1px_4px_rgba(0,0,0,0.05)]">
            <SystemsRibbonSvg activeState={prj.id as any} />
          </div>

          {(prj.role || prj.tools) && (
            <div className="flex flex-col gap-2 mt-auto border-t border-border/50 pt-4">
              {prj.role && (
                <div className="font-mono text-[10px] flex gap-2">
                  <span className="text-muted-foreground w-12 shrink-0">ROLE:</span>
                  <span className="text-secondary-foreground">{prj.role}</span>
                </div>
              )}
              {prj.tools && (
                <div className="font-mono text-[10px] flex gap-2">
                  <span className="text-muted-foreground w-12 shrink-0">TOOLS:</span>
                  <span className="text-secondary-foreground truncate" title={prj.tools}>{prj.tools}</span>
                </div>
              )}
            </div>
          )}

          <AnimatePresence initial={false}>
            {isExpanded && (prj.galleryPhotos?.length || prj.facts?.length) && (
              <motion.div
                key="expanded-detail"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.32, ease: 'easeInOut' }}
                className="overflow-hidden motion-reduce:transition-none"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 pt-6 mt-2 border-t border-border/50">
                  <div className="flex flex-col gap-5">
                    {!!prj.galleryPhotos?.length && (
                      <div className="flex gap-4 flex-wrap">
                        {prj.galleryPhotos.map((src, gi) => (
                          <TornPhotoWindow
                            key={gi}
                            src={src}
                            alt={`${prj.title} detail photo ${gi + 1}`}
                            variant={((gi + 1) % 3) as 0 | 1 | 2}
                            rotate={gi % 2 === 0 ? 3 : -3}
                            className="w-24 h-24 md:w-28 md:h-28"
                          />
                        ))}
                      </div>
                    )}
                    {!!prj.facts?.length && (
                      <ul className="flex flex-col gap-2">
                        {prj.facts.map((fact, fi) => (
                          <li key={fi} className="font-mono text-xs text-secondary-foreground flex gap-2 leading-relaxed">
                            <span className="text-primary shrink-0">◆</span>
                            <span>{fact}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <motion.div
                    layoutId={ICON_MERGE_LAYOUT_ID}
                    className="hidden lg:flex w-52 h-52 border border-border/50 bg-[#E8E6D9] p-5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.05)] items-center justify-center shrink-0"
                  >
                    <SystemsRibbonSvg activeState={prj.id as any} />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {isExpanded && (
            <p className="hidden [@media(hover:none)]:block font-mono text-[10px] text-primary uppercase tracking-wider -mb-2">
              Tap again to view the full case study
            </p>
          )}

          <div className="mt-4">
            <PhysicalButton asDiv variant="graphite" size="sm" className="w-full" onClick={handleButtonClick}>
              View case study {'->'}
            </PhysicalButton>
          </div>
        </PaperSheet>
      </Link>
    </motion.div>
  );
}
