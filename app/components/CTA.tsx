"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { SectionShell } from "@/components/ui/section-shell";
import { SiteContainer } from "@/components/ui/site-container";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const SERVICES = [
  { value: "branding", label: "Branding" },
  { value: "marketing", label: "Marketing" },
  { value: "design", label: "Design" },
];

export default function CTA() {
  const [selectedService, setSelectedService] = useState("");

  const selectedServiceLabel = SERVICES.find(
    (service) => service.value === selectedService,
  )?.label;

  return (
    <SectionShell
      id="contact"
      variant="light"
      spacing="none"
      className="relative min-h-screen overflow-hidden font-inter"
      aria-label="Get in touch"
    >
      <div className="absolute inset-0 flex flex-col pointer-events-none">
        <div className="ui-surface-soft h-1/2" />
        <div className="ui-surface-accent h-1/2" />
      </div>

      <SiteContainer className="relative flex min-h-screen items-center justify-center py-20">
        <Card
          variant="raised"
          className="cta-card w-full overflow-hidden px-8 py-10 md:p-16 lg:min-h-[798px] lg:px-[100px] lg:py-20"
        >
          <div className="flex h-full flex-col gap-12 lg:flex-row lg:justify-between">
            <div className="cta-content flex w-full flex-col lg:max-w-[385px]">
              <SectionEyebrow className="mb-8">Contact</SectionEyebrow>

              <h2 className="ui-type-heading-xl mb-10 max-w-[300px] text-brand-black">
                Let&apos;s
                <br />
                get started!
              </h2>

              <div className="mb-12 max-w-[385px] space-y-3">
                <p className="ui-type-body-lg font-bold text-brand-black">
                  Need to make a mark?
                </p>
                <p className="ui-type-body-lg font-normal text-brand-black">
                  Our team delivers impressive results
                  <br />
                  and expert execution. Visionary
                  <br />
                  or overwhelmed, we&apos;re here to help!
                  <br />
                  Expect a response within 24 hours.
                </p>
              </div>

              <div className="mt-auto space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex size-10 items-center justify-center">
                    <Image
                      src="/images/svg/mail.svg"
                      alt="Mail"
                      width={40}
                      height={20}
                    />
                  </div>
                  <a href="mailto:ping@properganda.in" className="ui-contact-link">
                    ping@properganda.in
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex size-10 items-center justify-center">
                    <Image
                      src="/images/svg/phone.svg"
                      alt="Phone"
                      width={30}
                      height={30}
                    />
                  </div>
                  <span className="ui-type-body-lg font-semibold text-brand-black">
                    00000 00000
                  </span>
                </div>
              </div>
            </div>

            <form className="flex h-full w-full flex-1 flex-col gap-8 lg:max-w-[797px]">
              <div className="grid grid-cols-1 gap-x-14 gap-y-6 md:grid-cols-2">
                <div className="cta-form-item flex flex-col gap-2">
                  <label htmlFor="name" className="ui-form-label">
                    Name<span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    placeholder="Enter your Name"
                    className="w-full"
                    required
                  />
                </div>

                <div className="cta-form-item flex flex-col gap-2">
                  <label htmlFor="email" className="ui-form-label">
                    Email<span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Enter your email ID"
                    className="w-full"
                    required
                  />
                </div>

                <div className="cta-form-item flex flex-col gap-2">
                  <label htmlFor="mobile" className="ui-form-label">
                    Mobile<span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="tel"
                    id="mobile"
                    placeholder="Enter your Mobile number"
                    className="w-full"
                    required
                  />
                </div>

                <div className="cta-form-item flex flex-col gap-2">
                  <label htmlFor="service" className="ui-form-label">
                    Service <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          className="ui-field ui-input ui-field-trigger w-full bg-white"
                        >
                          <span
                            className={cn(
                              selectedService
                                ? "text-brand-black"
                                : "text-brand-gray-dark/50",
                            )}
                          >
                            {selectedServiceLabel ?? "Select your Service"}
                          </span>
                          <ChevronDown className="size-6 text-brand-black opacity-80" />
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        style={{ width: "var(--radix-dropdown-menu-trigger-width)" }}
                      >
                        {SERVICES.map((service) => (
                          <DropdownMenuItem
                            key={service.value}
                            onClick={() => setSelectedService(service.value)}
                          >
                            {service.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <input type="hidden" name="service" value={selectedService} required />
                  </div>
                </div>
              </div>

              <div className="cta-form-item flex flex-col gap-2">
                <label htmlFor="message" className="ui-form-label">
                  How can we help?<span className="text-red-500">*</span>
                </label>
                <Textarea id="message" className="w-full resize-none" required />
              </div>

              <div className="cta-form-item">
                <Button
                  type="submit"
                  variant="accent"
                  className="group mt-4 h-[62px] w-[342px] rounded-[20px] font-inter text-[16px] font-semibold leading-none tracking-[0.02em] opacity-100"
                >
                  Request For Free Consultation
                  <svg
                    className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </SiteContainer>
    </SectionShell>
  );
}
