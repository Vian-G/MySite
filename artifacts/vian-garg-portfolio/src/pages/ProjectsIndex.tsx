import { useState } from 'react';
import { MetalDataPlate } from '@/components/ui/MetalDataPlate';
import { FolderTab } from '@/components/ui/FolderTab';
import { SystemsRibbonSvg } from '@/components/ui/SystemsRibbonSvg';
import { useSEO } from '@/hooks/use-seo';
import { useActiveSection } from '@/hooks/use-active-section';
import { usePageTransition } from '@/components/layout/PageTransitionOverlay';
import { AnimatePresence, motion } from 'framer-motion';
import { ExpandableProjectCard, ICON_MERGE_LAYOUT_ID, type ProjectCardData } from '@/components/projects/ExpandableProjectCard';
import { projects } from '@/config/projects';

const projectCards: ProjectCardData[] = projects.map((project) => ({
  id: project.id,
  title: project.title,
  role: project.type ? undefined : project.role,
  type: project.type,
  summary: project.summary ?? `${project.problem} ${project.result}`,
  tools: project.tools ?? project.stack.join(', '),
  href: project.href,
  photo: project.photo,
  galleryPhotos: project.galleryPhotos,
  facts: project.facts,
}));

export default function ProjectsIndex() {
  useSEO('Engineering Work | Vian Garg', 'Projects spanning rover systems, industrial automation, perception workflows, and interactive development.');

  const projectIds = projectCards.map((p) => `project-${p.id}`);
  const activeProjectId = useActiveSection(projectIds, 0.4);
  const { navigateWithFlash } = usePageTransition();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700 pb-16">
      <FolderTab />
      
      <div className="flex flex-col gap-6 items-start -mt-4">
        <MetalDataPlate>PROJECT ARCHIVE / 06 ENTRIES</MetalDataPlate>
        <div className="flex flex-col gap-4 max-w-2xl">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground">Engineering work</h1>
          <p className="font-sans text-lg text-muted-foreground">
            Projects spanning rover systems, industrial automation, perception workflows, and interactive development.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-4 relative">
        <div className="lg:col-span-8 flex flex-col gap-12">
          {projectCards.map((prj, i) => (
            <ExpandableProjectCard
              key={prj.id}
              project={prj}
              index={i}
              isExpanded={expandedId === prj.id}
              onHoverStart={() => setExpandedId(prj.id)}
              onHoverEnd={() => setExpandedId((id) => (id === prj.id ? null : id))}
              onRequestExpand={() => setExpandedId(prj.id)}
              onNavigate={() => navigateWithFlash(prj.href)}
            />
          ))}
        </div>
        
        <div className="hidden lg:block lg:col-span-4 relative">
          <div className="sticky top-24 w-full aspect-square border border-border/50 bg-[#E8E6D9] p-6 shadow-[inset_0_1px_4px_rgba(0,0,0,0.05)] overflow-hidden">
            <AnimatePresence initial={false}>
              {!expandedId && (
                <motion.div
                  key="sticky-icon"
                  layoutId={ICON_MERGE_LAYOUT_ID}
                  className="w-full h-full"
                  exit={{ opacity: 0 }}
                >
                  <SystemsRibbonSvg activeState={(activeProjectId || '01') as any} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
