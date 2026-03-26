import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { SectionShell } from "@/components/ui/section-shell";
import { SiteContainer } from "@/components/ui/site-container";
import { cn } from "@/lib/utils";

const FOCUS_AREAS = [
  "Purpose-first brand strategy",
  "Campaign stories with more bite",
  "A homepage worth the wait",
];

const BUILD_SIGNALS = [
  {
    title: "Narrative",
    copy: "Tightening the message so every section lands with more conviction.",
  },
  {
    title: "Motion",
    copy: "Polishing transitions and moments of surprise without losing clarity.",
  },
  {
    title: "Launch",
    copy: "Holding the curtain until the full experience feels properly finished.",
  },
];

export default function ComingSoon() {
  return (
    <SectionShell
      spacing="none"
      variant="dark"
      className="relative isolate min-h-screen overflow-hidden"
      aria-label="Coming soon"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(circle at 18% 18%, rgba(0, 224, 74, 0.18), transparent 28%), radial-gradient(circle at 80% 20%, rgba(248, 102, 36, 0.18), transparent 24%), radial-gradient(circle at 50% 100%, rgba(255, 204, 0, 0.12), transparent 35%)",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent 88%)",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute left-[6%] top-24 h-40 w-40 rounded-full border border-white/10 bg-white/5 blur-sm"
        style={{ animation: "float-soft 12s ease-in-out infinite" }}
      />
      <div
        aria-hidden="true"
        className="absolute right-[10%] top-[18%] h-64 w-64 rounded-full border border-brand-green/20 bg-brand-green/10 blur-3xl"
        style={{ animation: "float-soft 16s ease-in-out infinite 1.8s" }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-16 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full border border-white/10"
        style={{ animation: "spin-slow 20s linear infinite" }}
      />

      <SiteContainer className="relative flex min-h-screen flex-col py-6 sm:py-8">
        <header className="flex flex-col gap-4 rounded-full border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-4">
            <Image
              src="/images/svg/logo.svg"
              alt="Properganda"
              width={140}
              height={32}
              className="h-auto w-[140px]"
              priority
            />
            <span className="hidden h-6 w-px bg-white/10 sm:block" />
            <p className="text-sm text-white/70">
              The full marketing experience is in its finishing pass.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-green/30 bg-brand-green/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-brand-green">
            <Sparkles className="size-3.5" />
            Coming Soon
          </div>
        </header>

        <div className="flex flex-1 items-center py-14 sm:py-16 lg:py-20">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)] lg:gap-12">
            <div className="max-w-3xl">
              <span className="ui-caption text-brand-green">
                Creativity with a conscience
              </span>

              <h1 className="mt-5 font-bebas-neue text-[clamp(4.5rem,13vw,9.5rem)] leading-[0.9] tracking-[0.02em] text-white">
                We&apos;re tuning
                <span className="block text-brand-green">the stage.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75 sm:text-xl">
                Properganda&apos;s full site is getting a sharper story, cleaner motion,
                and a launch-ready finish. For now, the lights are on, the intent is
                clear, and the new experience is almost ready to step forward.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {FOCUS_AREAS.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/80 backdrop-blur-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="mailto:ping@properganda.in"
                  className={cn(buttonVariants({ variant: "accent", size: "lg" }), "group")}
                >
                  Start a conversation
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>

                <Link
                  href="/commandments"
                  className={buttonVariants({ variant: "neutral", size: "lg" })}
                >
                  Read the commandments
                </Link>
              </div>

              <p className="mt-6 text-sm text-white/45">
                Need something in the meantime? We&apos;re still reachable at{" "}
                <a
                  href="mailto:ping@properganda.in"
                  className="text-white underline decoration-brand-green/60 underline-offset-4 transition-colors hover:text-brand-green"
                >
                  ping@properganda.in
                </a>
                .
              </p>
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-[2rem] border border-white/10"
                style={{ animation: "float-soft 14s ease-in-out infinite 0.6s" }}
              />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="ui-caption text-brand-green">Signal Board</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">
                      Build mode, but very much alive.
                    </h2>
                  </div>

                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-medium text-white/70">
                    <span className="h-2 w-2 rounded-full bg-brand-green shadow-[0_0_14px_rgba(0,224,74,0.8)]" />
                    Live
                  </span>
                </div>

                <div className="mt-6 grid gap-4">
                  {BUILD_SIGNALS.map((signal, index) => (
                    <article
                      key={signal.title}
                      className="rounded-[1.5rem] border border-white/10 bg-black/35 p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm uppercase tracking-[0.22em] text-white/40">
                            0{index + 1}
                          </p>
                          <h3 className="mt-2 text-xl font-semibold text-white">
                            {signal.title}
                          </h3>
                        </div>

                        <div className="mt-1 h-3 w-3 rounded-full bg-brand-green/80" />
                      </div>

                      <p className="mt-3 text-sm leading-7 text-white/65">
                        {signal.copy}
                      </p>
                    </article>
                  ))}
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-brand-green/20 bg-brand-green/10 p-5">
                    <p className="ui-caption text-white/60">Response Time</p>
                    <p className="mt-3 text-3xl font-semibold text-white">Within 24 hours</p>
                    <p className="mt-2 text-sm leading-7 text-white/65">
                      If you want to talk brand, campaigns, or launch planning, we&apos;re
                      still taking conversations.
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-5">
                    <p className="ui-caption text-white/60">While You Wait</p>
                    <p className="mt-3 text-3xl font-semibold text-white">
                      Explore the ethos
                    </p>
                    <p className="mt-2 text-sm leading-7 text-white/65">
                      The commandment page is still up if you want a feel for the voice
                      behind the rebuild.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SiteContainer>
    </SectionShell>
  );
}
