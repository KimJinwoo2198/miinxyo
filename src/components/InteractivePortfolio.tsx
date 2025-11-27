"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import {
  ArrowUpRight,
  Award,
  Briefcase,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import type {
  AboutData,
  ExperienceData,
  PortfolioProject,
  ContactData,
} from "@/lib/markdown";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────────────────── */

interface InteractivePortfolioProps {
  about: AboutData;
  experience: ExperienceData;
  portfolio: PortfolioProject[];
  contact: ContactData;
}

/* ─────────────────────────────────────────────────────────────────────────────
   COLOR MAP
───────────────────────────────────────────────────────────────────────────── */

const colorMap: Record<string, string> = {
  emerald: "from-emerald-500/30 to-teal-500/20",
  violet: "from-violet-500/30 to-purple-500/20",
  amber: "from-amber-500/30 to-orange-500/20",
  teal: "from-teal-500/30 to-cyan-500/20",
  rose: "from-rose-500/30 to-pink-500/20",
  sky: "from-sky-500/30 to-blue-500/20",
  blue: "from-blue-500/30 to-indigo-500/20",
  indigo: "from-indigo-500/30 to-sky-500/20",
  lime: "from-lime-400/30 to-emerald-500/20",
  cyan: "from-cyan-400/30 to-sky-500/20",
  fuchsia: "from-fuchsia-500/30 to-rose-500/20",
  slate: "from-slate-500/30 to-slate-900/40",
  zinc: "from-zinc-400/30 to-slate-700/30",
};

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export function InteractivePortfolio({
  about,
  experience,
  portfolio,
  contact,
}: InteractivePortfolioProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* ── HERO INTRO ANIMATION ── */
      if (heroRef.current) {
        const masterTl = gsap.timeline({ delay: 0.2 });

        // 1. Flower icon
        masterTl.fromTo(
          "[data-hero-flower]",
          { scale: 0, rotate: -90 },
          { scale: 1, rotate: 0, duration: 0.8, ease: "back.out(1.4)" }
        );

        // 2. "Design" letters
        const designLetters = heroRef.current.querySelectorAll(
          "[data-hero-design] [data-letter]"
        );
        masterTl.fromTo(
          designLetters,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.05,
            ease: "power4.out",
          },
          "-=0.3"
        );

        // 3. "anything" letters
        const anythingLetters = heroRef.current.querySelectorAll(
          "[data-hero-anything] [data-letter]"
        );
        masterTl.fromTo(
          anythingLetters,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.04,
            ease: "power4.out",
          },
          "-=0.6"
        );

        // 4. Blobs
        masterTl.fromTo(
          "[data-hero-blob]",
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "back.out(2)",
          },
          "-=0.5"
        );

        // 5. Tagline
        masterTl.fromTo(
          "[data-hero-tagline]",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.2"
        );

        // 6. CTA
        masterTl.fromTo(
          "[data-hero-cta]",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        );

        // Continuous animations
        gsap.to("[data-hero-flower]", {
          rotate: 360,
          duration: 30,
          repeat: -1,
          ease: "none",
        });

        gsap.to("[data-hero-blob]", {
          y: "random(-10, 10)",
          x: "random(-8, 8)",
          duration: "random(3, 4)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: { each: 0.5, from: "random" },
        });

        // "i" letter flip
        const iLetter = heroRef.current.querySelector("[data-letter-i]");
        if (iLetter) {
          gsap.to(iLetter, {
            rotateX: 540,
            duration: 1,
            ease: "power2.inOut",
            repeat: -1,
            repeatDelay: 2.5,
            yoyo: true,
          });
        }
      }

      /* ── SCROLL ANIMATIONS ── */
      ScrollTrigger.batch("[data-scroll-line]", {
        start: "top 80%",
        once: true,
        interval: 0.2,
        batchMax: 2,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
          }),
      });

      ScrollTrigger.batch("[data-fade-up]", {
        start: "top 85%",
        once: true,
        interval: 0.15,
        batchMax: 4,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.08,
          }),
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative isolate overflow-hidden bg-[#0e100f] text-zinc-50"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        <div className="absolute left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-orange-500/15 blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-purple-500/15 blur-[200px]" />
      </div>

      <main className="relative z-10 flex flex-col gap-32 pb-32">
        {/* ─────────────────────────────────────────────────────────────────────
           HERO SECTION
        ───────────────────────────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative min-h-screen px-6 pt-20 sm:px-12 lg:px-24"
        >
          <div className="mx-auto flex min-h-[85vh] max-w-6xl flex-col items-center justify-center">
            {/* Main typography */}
            <div className="relative w-full">
              {/* Decorative flower */}
              <div
                data-hero-flower
                className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
                style={{ transform: "translate(-50%, -50%) scale(0)" }}
              >
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                  className="sm:h-24 sm:w-24"
                >
                  <path
                    d="M40 0C40 22.0914 22.0914 40 0 40C22.0914 40 40 57.9086 40 80C40 57.9086 57.9086 40 80 40C57.9086 40 40 22.0914 40 0Z"
                    className="fill-orange-400"
                  />
                  <path
                    d="M40 10C40 26.5685 26.5685 40 10 40C26.5685 40 40 53.4315 40 70C40 53.4315 53.4315 40 70 40C53.4315 40 40 26.5685 40 10Z"
                    className="fill-purple-400/80"
                  />
                </svg>
              </div>

              {/* "Design" */}
              <div
                data-hero-design
                className="relative inline-block py-2 text-[clamp(5rem,18vw,15rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-[#f5f0e8]"
              >
                <div
                  data-hero-blob
                  className="absolute -right-2 -top-2 -z-10 h-7 w-7 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 sm:-right-4 sm:top-0 sm:h-10 sm:w-10"
                  style={{ opacity: 0 }}
                />
                <span className="inline-block" style={{ perspective: "1000px" }}>
                  {["D", "e", "s", "i", "g", "n"].map((char, i) => (
                    <span
                      key={`design-${i}`}
                      data-letter
                      data-letter-i={char === "i" ? "true" : undefined}
                      className="inline-block origin-center will-change-transform"
                      style={{
                        opacity: 0,
                        transformStyle: char === "i" ? "preserve-3d" : undefined,
                        display: "inline-block",
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              </div>

              <br />

              {/* "anything" */}
              <div className="text-right">
                <div
                  data-hero-anything
                  className="relative inline-block py-2 text-[clamp(5rem,18vw,15rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-[#f5f0e8]"
                >
                  <div
                    data-hero-blob
                    className="absolute right-[28%] top-[15%] -z-10 h-12 w-12 rounded-full bg-gradient-to-br from-fuchsia-400 via-purple-400 to-violet-500 sm:h-16 sm:w-16"
                    style={{ opacity: 0 }}
                  />
                  <div
                    data-hero-blob
                    className="absolute bottom-[15%] right-[18%] -z-10 h-6 w-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 sm:h-8 sm:w-8"
                    style={{ opacity: 0 }}
                  />
                  <span className="inline-block">
                    {"anything".split("").map((char, i) => (
                      <span
                        key={`anything-${i}`}
                        data-letter
                        className="inline-block will-change-transform"
                        style={{ opacity: 0 }}
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                </div>
              </div>
            </div>

            {/* Tagline */}
            <div
              data-hero-tagline
              className="mt-14 max-w-lg text-center sm:mt-16"
              style={{ opacity: 0, transform: "translateY(30px)" }}
            >
              <p className="text-base leading-relaxed text-[#f5f0e8]/70 sm:text-lg">
                <span className="font-medium text-[#f5f0e8]">{about.name}</span>{" "}
                – {about.bio.slice(0, 100)}
              </p>
            </div>

            {/* CTA Button */}
            <a
              href="#contact"
              data-hero-cta
              className="group mt-10 inline-flex items-center gap-3 rounded-full border border-[#4ade80]/50 px-7 py-3.5 text-sm font-medium text-[#f5f0e8] transition-all duration-300 hover:border-[#4ade80] hover:bg-[#4ade80]/10 sm:mt-12"
              style={{ opacity: 0, transform: "translateY(20px)" }}
            >
              Let&apos;s connect
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────────
           ABOUT SECTION
        ───────────────────────────────────────────────────────────────────── */}
        <section className="px-6 sm:px-12 lg:px-24" id="about">
          <div className="mx-auto max-w-5xl">
            {/* Section header */}
            <div className="mb-16 flex flex-col gap-4">
              <p className="text-sm uppercase tracking-[0.5em] text-white/50">
                About
              </p>
              <h2
                data-scroll-line
                className="text-4xl font-light text-white sm:text-5xl lg:text-6xl"
                style={{ opacity: 0, transform: "translateY(60px)" }}
              >
                꿈꾸는 디자이너
              </h2>
            </div>

            {/* Profile card */}
            <div
              data-fade-up
              className="mb-12 rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-8 backdrop-blur-xl sm:p-10"
              style={{ opacity: 0, transform: "translateY(40px)" }}
            >
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
                {/* Avatar placeholder */}
                <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-purple-500">
                  <span className="text-5xl font-bold text-white">
                    {about.name.charAt(0)}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-3xl font-medium text-white">
                      {about.name}
                    </h3>
                    <p className="mt-1 text-lg text-white/60">{about.title}</p>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-white/70">
                    <span className="inline-flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      {about.university}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {about.year}
                    </span>
                  </div>

                  <p className="text-base leading-relaxed text-white/80">
                    {about.bio}
                  </p>
                </div>
              </div>
            </div>

            {/* Philosophy */}
            <div className="grid gap-6 sm:grid-cols-3">
              {about.philosophy.map((item, idx) => (
                <article
                  key={idx}
                  data-fade-up
                  className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur"
                  style={{ opacity: 0, transform: "translateY(40px)" }}
                >
                  <Sparkles className="mb-4 h-5 w-5 text-orange-400" />
                  <h4 className="text-lg font-medium text-white">{item.title}</h4>
                  <p className="mt-2 text-sm text-white/60">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────────
           EXPERIENCE SECTION
        ───────────────────────────────────────────────────────────────────── */}
        <section className="px-6 sm:px-12 lg:px-24" id="experience">
          <div className="mx-auto max-w-5xl">
            {/* Section header */}
            <div className="mb-16 flex flex-col gap-4">
              <p className="text-sm uppercase tracking-[0.5em] text-white/50">
                Experience
              </p>
              <h2
                data-scroll-line
                className="text-4xl font-light text-white sm:text-5xl"
                style={{ opacity: 0, transform: "translateY(60px)" }}
              >
                경험과 성장
              </h2>
            </div>

            <div className="grid gap-12 lg:grid-cols-2">
              {/* Internships */}
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-emerald-400" />
                  <h3 className="text-xl font-medium text-white">인턴 및 활동</h3>
                </div>
                <div className="space-y-4">
                  {experience.internships.map((item, idx) => (
                    <article
                      key={idx}
                      data-fade-up
                      className="rounded-[20px] border border-white/10 bg-white/[0.03] p-5"
                      style={{ opacity: 0, transform: "translateY(40px)" }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h4 className="font-medium text-white">{item.title}</h4>
                        <span className="shrink-0 text-xs text-white/50">
                          {item.period}
                        </span>
                      </div>
                      <ul className="mt-3 space-y-1">
                        {item.details.map((detail, i) => (
                          <li
                            key={i}
                            className="text-sm text-white/60 before:mr-2 before:content-['·']"
                          >
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>

              {/* Awards */}
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <Award className="h-5 w-5 text-amber-400" />
                  <h3 className="text-xl font-medium text-white">수상 경력</h3>
                </div>
                <div className="space-y-4">
                  {experience.awards.map((item, idx) => (
                    <article
                      key={idx}
                      data-fade-up
                      className="rounded-[20px] border border-white/10 bg-white/[0.03] p-5"
                      style={{ opacity: 0, transform: "translateY(40px)" }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h4 className="font-medium text-white">{item.title}</h4>
                        <span className="shrink-0 text-xs text-white/50">
                          {item.period}
                        </span>
                      </div>
                      <ul className="mt-3 space-y-1">
                        {item.details.map((detail, i) => (
                          <li
                            key={i}
                            className="text-sm text-white/60 before:mr-2 before:content-['·']"
                          >
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="mt-12">
              <div className="mb-6 flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-violet-400" />
                <h3 className="text-xl font-medium text-white">자격 및 교육</h3>
              </div>
              <div
                data-fade-up
                className="flex flex-wrap gap-3"
                style={{ opacity: 0, transform: "translateY(40px)" }}
              >
                {experience.certifications.map((cert, idx) => (
                  <span
                    key={idx}
                    className="rounded-full border border-white/20 bg-white/[0.05] px-4 py-2 text-sm text-white/80"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────────
           PORTFOLIO SECTION
        ───────────────────────────────────────────────────────────────────── */}
        <section className="px-6 sm:px-12 lg:px-24" id="portfolio">
          <div className="mx-auto max-w-6xl">
            {/* Section header */}
            <div className="mb-16 flex flex-col gap-4">
              <p className="text-sm uppercase tracking-[0.5em] text-white/50">
                Portfolio
              </p>
              <h2
                data-scroll-line
                className="text-4xl font-light text-white sm:text-5xl"
                style={{ opacity: 0, transform: "translateY(60px)" }}
              >
                프로젝트
              </h2>
            </div>

            {/* Project grid */}
            <div className="grid gap-8 md:grid-cols-2">
              {portfolio.map((project, idx) => (
                <article
                  key={idx}
                  data-fade-up
                  className={`group relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br ${
                    colorMap[project.color] || colorMap.emerald
                  } p-8 backdrop-blur transition-all duration-500 hover:border-white/20 hover:shadow-2xl`}
                  style={{ opacity: 0, transform: "translateY(40px)" }}
                >
                  {/* Year badge */}
                  <div className="absolute right-6 top-6 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs text-white/70">
                    {project.year}
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <p className="text-xs uppercase tracking-[0.4em] text-white/50">
                      {project.category}
                    </p>
                    <h3 className="text-2xl font-medium text-white sm:text-3xl">
                      {project.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/70">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Link */}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
                      >
                        View project
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────────
           CONTACT SECTION
        ───────────────────────────────────────────────────────────────────── */}
        <section className="px-6 sm:px-12 lg:px-24" id="contact">
          <div className="mx-auto max-w-5xl rounded-[40px] border border-white/10 bg-gradient-to-br from-white/10 via-transparent to-black/40 p-10 backdrop-blur-xl">
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-sm uppercase tracking-[0.5em] text-white/70">
                  Contact
                </p>
                <h2 className="mt-4 text-3xl font-light text-white sm:text-4xl">
                  함께 성장해요
                </h2>
              </div>

              <p className="max-w-2xl text-white/70">{contact.message}</p>

              {/* Contact info */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
                <a
                  href={`mailto:${contact.email}`}
                  className="group inline-flex items-center gap-3 rounded-full border border-white/30 bg-white px-6 py-3 font-medium text-black transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <Mail className="h-4 w-4 text-black" />
                  <span className="text-black">{contact.email}</span>
                  <ArrowUpRight className="h-4 w-4 text-black transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>

              {/* Social links */}
              <div className="flex flex-wrap gap-3">
                {contact.social.map((item) => (
                  <a
                    key={item.platform}
                    href={`https://${item.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/70 transition-colors hover:border-white/40 hover:text-white"
                  >
                    {item.platform}
                  </a>
                ))}
              </div>

              {/* Availability */}
              <p className="text-xs uppercase tracking-[0.4em] text-emerald-400">
                ✦ {contact.availability}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
