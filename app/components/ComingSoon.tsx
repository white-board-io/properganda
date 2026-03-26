import Image from "next/image";

import { SectionShell } from "@/components/ui/section-shell";
import { SiteContainer } from "@/components/ui/site-container";

export default function ComingSoon() {
  return (
    <SectionShell
      spacing="none"
      variant="dark"
      className="min-h-screen px-0"
      aria-label="Coming soon"
    >
      <SiteContainer className="flex min-h-screen items-center justify-center py-10">
        <div className="flex flex-col items-center justify-center gap-8 text-center">
          <Image
            src="/images/svg/logo.svg"
            alt="Properganda"
            width={220}
            height={54}
            className="h-auto w-[180px] sm:w-[220px]"
            priority
          />

          <h1 className="mt-[12px] font-bebas-neue text-[clamp(2.8rem,8vw,4.8rem)] leading-[0.9] tracking-[0.06em] text-white">
            Coming Soon
          </h1>
        </div>
      </SiteContainer>
    </SectionShell>
  );
}
