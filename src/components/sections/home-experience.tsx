"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import CountUp from "react-countup";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import type { Mesh } from "three";
import {
  ArrowRight,
  ChevronUp,
  Download,
  ExternalLink,
  Github,
  Mail,
  Menu,
  Languages,
  Play,
  Send,
  X
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getSiteContent, type Locale } from "@/data/content";
import { cn } from "@/lib/utils";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  content: ReturnType<typeof getSiteContent>;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within HomeExperience");
  }

  return context;
}

function SmoothRuntime() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.9
    });

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 42, filter: "blur(14px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 82%"
            }
          }
        );
      });
    });

    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(tick);
    };
  }, []);

  return null;
}

function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 32, stiffness: 260 });
  const springY = useSpring(cursorY, { damping: 32, stiffness: 260 });

  useEffect(() => {
    const move = (event: MouseEvent) => {
      setVisible(true);
      cursorX.set(event.clientX - 16);
      cursorY.set(event.clientY - 16);
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };
    const hide = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", hide);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", hide);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      aria-hidden
      className={cn("pointer-events-none fixed left-0 top-0 z-[80] hidden size-8 rounded-full border border-cyan-200/60 mix-blend-screen md:block", !visible && "opacity-0")}
      style={{ x: springX, y: springY }}
    />
  );
}

function NeuralOrb() {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.elapsedTime * 0.12;
    meshRef.current.rotation.y = clock.elapsedTime * 0.18;
  });

  return (
    <group>
      <ambientLight intensity={1.3} />
      <pointLight color="#00E5FF" intensity={12} position={[2, 2, 4]} />
      <pointLight color="#00FFA3" intensity={5} position={[-3, -2, 2]} />
      <Sphere args={[1.12, 96, 96]} ref={meshRef}>
        <MeshDistortMaterial
          color="#00E5FF"
          distort={0.38}
          emissive="#0094FF"
          emissiveIntensity={0.6}
          metalness={0.7}
          roughness={0.18}
          speed={1.4}
          transparent
          opacity={0.42}
          wireframe
        />
      </Sphere>
    </group>
  );
}

function SectionHeader({
  eyebrow,
  title,
  copy
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16" data-reveal>
      <Badge>{eyebrow}</Badge>
      <h2 className="mt-5 font-heading text-4xl font-semibold leading-tight text-white md:text-6xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-slate-400 md:text-lg">{copy}</p>
    </div>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const { locale, setLocale, content } = useLanguage();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 160], [0, -88]);
  const background = useTransform(scrollY, [0, 100], ["rgba(5,8,22,0.38)", "rgba(5,8,22,0.78)"]);

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 backdrop-blur-2xl"
      style={{ y, background }}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a className="flex items-center gap-3" href="#top" aria-label="Go to top">
          <span className="grid size-9 place-items-center rounded-full border border-cyan-300/40 bg-cyan-300/10 text-sm font-bold text-cyan-100 shadow-[0_0_24px_rgba(0,229,255,0.2)]">
            DP
          </span>
          <span className="hidden font-heading text-sm font-semibold text-white sm:block">AI Data Systems</span>
        </a>
        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 md:flex">
          {content.nav.map((item) => (
            <a
              className="rounded-full px-4 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <Button
            size="sm"
            variant="secondary"
            type="button"
            aria-label="Toggle language"
            onClick={() => setLocale(locale === "en" ? "es" : "en")}
          >
            <Languages /> {locale === "en" ? content.languageToggle.spanish : content.languageToggle.english}
          </Button>
          <Button asChild size="sm" className="inline-flex">
            <a href="#contact">
              {content.hero.actions.contact} <ArrowRight />
            </a>
          </Button>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <Button
            size="sm"
            variant="secondary"
            type="button"
            aria-label="Toggle language"
            onClick={() => setLocale(locale === "en" ? "es" : "en")}
          >
            <Languages /> {locale === "en" ? content.languageToggle.spanish : content.languageToggle.english}
          </Button>
          <button
            aria-label="Toggle navigation"
            className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>
      {open ? (
        <div className="border-t border-white/10 bg-[#050816]/95 px-4 py-5 md:hidden">
          <div className="grid gap-2">
            {content.nav.map((item) => (
              <a
                className="rounded-2xl px-4 py-3 text-sm text-slate-200 transition hover:bg-white/[0.06]"
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </motion.header>
  );
}

function Hero() {
  const { content } = useLanguage();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-80, 80], [7, -7]);
  const rotateY = useTransform(x, [-80, 80], [-7, 7]);

  const floating = useMemo(
    () =>
      content.stackBadges.map((label, index) => ({
        label,
        top: `${8 + ((index * 17) % 78)}%`,
        left: index % 2 === 0 ? `${-2 + (index % 4) * 5}%` : `${70 + (index % 3) * 7}%`,
        delay: index * 0.18
      })),
    [content.stackBadges]
  );

  return (
    <section id="top" className="relative min-h-screen overflow-hidden pb-16 pt-28 md:pb-24 md:pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,229,255,0.18),transparent_26%),radial-gradient(circle_at_78%_18%,rgba(0,255,163,0.12),transparent_24%),linear-gradient(180deg,rgba(5,8,22,0),#050816_88%)]" />
      <div className="absolute inset-0 grid-mask opacity-70" />
      <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10"
        >
          <Badge className="mb-7">{content.hero.badge}</Badge>
          <h1 className="max-w-5xl font-heading text-5xl font-semibold leading-[1.02] text-white md:text-7xl xl:text-8xl">
            {content.hero.title[0]}
            <span className="block text-gradient">{content.hero.title[1]}</span>
            <span className="block text-slate-300">{content.hero.title[2]}</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
            {content.hero.description}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="#projects">
                {content.hero.actions.projects} <ArrowRight />
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href={encodeURI(content.contact.cvHref)} download>
                <Download /> {content.hero.actions.resume}
              </a>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <a href="#contact">
                <Mail /> {content.hero.actions.contact}
              </a>
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {content.heroStats.map((stat, index) => (
              <motion.div
                className="metric-tile"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.08, duration: 0.6 }}
                key={stat.label}
              >
                <div className="font-mono text-2xl font-semibold text-white md:text-3xl">
                  <CountUp end={stat.value} enableScrollSpy scrollSpyOnce suffix={stat.suffix} duration={2.4} />
                </div>
                <p className="mt-1 text-xs text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative z-10 mx-auto aspect-square w-full max-w-[560px]"
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            x.set(event.clientX - rect.left - rect.width / 2);
            y.set(event.clientY - rect.top - rect.height / 2);
          }}
          onMouseLeave={() => {
            x.set(0);
            y.set(0);
          }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-0 rounded-full border border-cyan-300/20 bg-cyan-300/5 blur-2xl" />
          <div className="absolute inset-[6%] overflow-hidden rounded-full border border-white/15 bg-white/[0.04] shadow-[0_0_80px_rgba(0,148,255,0.35)]">
            <Image
              alt="Futuristic AI laboratory data core"
              className="h-full w-full object-cover"
              fill
              priority
              sizes="(max-width: 768px) 92vw, 560px"
              src="/images/ai-lab-core.png"
            />
          </div>
          <div className="absolute inset-[18%] opacity-60">
            <Canvas
              camera={{ position: [0, 0, 3.2], fov: 45 }}
              gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
            >
              <NeuralOrb />
            </Canvas>
          </div>
          {floating.map((item) => (
            <motion.div
              className="floating-badge"
              style={{ top: item.top, left: item.left }}
              animate={{ y: [0, -14, 0], opacity: [0.72, 1, 0.72] }}
              transition={{ duration: 4.2, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
              key={item.label}
            >
              {item.label}
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-xs text-slate-500 md:flex">
        <span className="h-px w-12 bg-white/20" />
        {content.hero.scrollHint}
        <span className="h-px w-12 bg-white/20" />
      </div>
    </section>
  );
}

function AboutTimeline() {
  const { content } = useLanguage();
  return (
    <section id="about" className="section-shell">
      <SectionHeader
        eyebrow={content.sections.about.eyebrow}
        title={content.sections.about.title}
        copy={content.sections.about.copy}
      />
      <div className="mx-auto max-w-5xl">
        {content.timeline.map((item, index) => (
          <div className="timeline-row" data-reveal key={`${item.year}-${index}`}>
            <div className="timeline-marker">
              <span>{index + 1}</span>
            </div>
            <div>
              <p className="font-mono text-sm text-cyan-200">{item.year}</p>
              <h3 className="mt-2 font-heading text-2xl font-semibold text-white">{item.title}</h3>
            </div>
            <p className="text-sm leading-7 text-slate-400 md:text-base">{item.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TechnologyStack() {
  const { content } = useLanguage();
  return (
    <section id="stack" className="section-shell">
      <SectionHeader
        eyebrow={content.sections.stack.eyebrow}
        title={content.sections.stack.title}
        copy={content.sections.stack.copy}
      />
      <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {content.technologies.map((group) => {
          const Icon = group.icon;
          return (
            <article className="glass-panel group p-6" data-reveal key={group.category}>
              <div className="flex items-center justify-between">
                <div className="grid size-11 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-200 ring-1 ring-cyan-300/20">
                  <Icon className="size-5" />
                </div>
                <Badge variant="muted">{group.items.length} tools</Badge>
              </div>
              <h3 className="mt-6 font-heading text-2xl font-semibold text-white">{group.category}</h3>
              <div className="mt-6 space-y-4">
                {group.items.map(([name, level, description]) => (
                  <div className="tech-row" key={name}>
                    <div>
                      <p className="font-medium text-white">{name}</p>
                      <p className="mt-1 text-xs text-slate-500">{description}</p>
                    </div>
                    <span className="font-mono text-xs text-cyan-200">{level}</span>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function FeaturedProjects() {
  const { locale, content } = useLanguage();
  return (
    <section id="projects" className="section-shell overflow-hidden">
      <SectionHeader
        eyebrow={content.sections.projects.eyebrow}
        title={content.sections.projects.title}
        copy={content.sections.projects.copy}
      />
      <div className="mx-auto flex max-w-7xl gap-5 overflow-x-auto px-4 pb-5 sm:px-6 lg:px-8">
        {content.projects.map((project, index) => {
          const Icon = project.icon;
          return (
            <article className="project-slide" data-reveal key={project.name}>
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div>
                  <Badge variant={index === 0 ? "success" : "default"}>{project.domain}</Badge>
                  <h3 className="mt-6 max-w-2xl font-heading text-4xl font-semibold leading-tight text-white md:text-6xl">
                    {project.name}
                  </h3>
                </div>
                <div className="metric-orb">
                  <Icon className="size-8" />
                  <span>{project.metric}</span>
                </div>
              </div>
              <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {[
                  ["Problem", project.problem],
                  ["Dataset", project.dataset],
                  ["Methodology", project.methodology],
                  ["Business Impact", project.impact]
                ].map(([label, copy]) => (
                  <div className="story-block" key={label}>
                    <p className="font-mono text-xs uppercase text-cyan-200">{label}</p>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap items-center justify-between gap-5">
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <Badge variant="muted" key={item}>
                      {item}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="sm" variant="secondary">
                    <a href={project.github} target="_blank" rel="noreferrer">
                      <Github /> GitHub
                    </a>
                  </Button>
                  <Button asChild size="sm">
                    <a href={project.github} target="_blank" rel="noreferrer">
                      <ExternalLink /> {locale === "es" ? "Ver código" : "View Code"}
                    </a>
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Journey() {
  const { content } = useLanguage();
  return (
    <section id="journey" className="section-shell">
      <SectionHeader
        eyebrow={content.sections.journey.eyebrow}
        title={content.sections.journey.title}
        copy={content.sections.journey.copy}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="journey-rail">
          {content.journey.map(([step, copy]: [string, string], index) => (
            <div className="journey-node" data-reveal key={step}>
              <span className="font-mono text-xs text-cyan-200">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-heading text-xl font-semibold text-white">{step}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CertificationsAndYoutube() {
  const { content } = useLanguage();
  return (
    <section className="section-shell">
      <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:px-8">
        <div className="glass-panel p-6 md:p-8" data-reveal>
          <Badge>{content.sections.certifications.eyebrow}</Badge>
          <h2 className="mt-5 font-heading text-3xl font-semibold text-white md:text-5xl">{content.sections.certifications.title}</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {content.certifications.map(([issuer, title], index) => (
              <div className="flip-badge" key={`${issuer}-${index}`}>
                <p className="font-heading text-xl font-semibold text-white">{issuer}</p>
                <p className="mt-2 text-sm text-slate-400">{title}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-panel p-6 md:p-8" data-reveal>
          <div className="flex items-center justify-between gap-4">
            <Badge>{content.sections.youtube.eyebrow}</Badge>
            <Play className="size-5 text-cyan-200" />
          </div>
          <h3 className="mt-5 font-heading text-3xl font-semibold text-white">{content.sections.youtube.title}</h3>
          <div className="mt-7 grid gap-3 md:grid-cols-5">
            {content.videos.map(([category, title]) => (
              <div className="video-tile" key={category}>
                <p className="font-mono text-xs text-cyan-200">{category}</p>
                <h3 className="mt-10 text-sm font-semibold leading-6 text-white">{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { content } = useLanguage();
  return (
    <section id="contact" className="section-shell pb-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <form className="glass-panel p-6 md:p-8" data-reveal>
          <Badge>{content.hero.actions.contact}</Badge>
          <h3 className="mt-5 font-heading text-3xl font-semibold text-white">{content.contact.title}</h3>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <label className="field-label">
              <span>{content.contact.fields.name}</span>
              <input placeholder={content.contact.placeholders.name} />
            </label>
            <label className="field-label">
              <span>{content.contact.fields.email}</span>
              <input placeholder={content.contact.placeholders.email} type="email" />
            </label>
            <label className="field-label">
              <span>{content.contact.fields.phone}</span>
              <input placeholder={content.contact.placeholders.phone} type="tel" />
            </label>
            <label className="field-label sm:col-span-2">
              <span>{content.contact.messageLabel}</span>
              <textarea placeholder={content.contact.messagePlaceholder} rows={5} />
            </label>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild variant="secondary">
              <a href={encodeURI(content.contact.cvHref)} download>
                <Download /> {content.contact.downloadCv}
              </a>
            </Button>
            <Button type="button">
              <Send /> {content.contact.send}
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <a className="social-link" href={content.contact.links.linkedin.href} target="_blank" rel="noreferrer">
              {content.contact.links.linkedin.label}
            </a>
            <a className="social-link" href={content.contact.links.github.href} target="_blank" rel="noreferrer">
              {content.contact.links.github.label}
            </a>
            <a className="social-link" href={content.contact.links.youtube.href} target="_blank" rel="noreferrer">
              {content.contact.links.youtube.label}
            </a>
            <a className="social-link" href={content.contact.links.instagram.href} target="_blank" rel="noreferrer">
              {content.contact.links.instagram.label}
            </a>
          </div>
          <div className="map-surface mt-8">
            <span>{content.contact.remote}</span>
            <span>{content.contact.location}</span>
          </div>
        </form>
      </div>
    </section>
  );
}

function ProgressAndBackToTop() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 26 });

  return (
    <>
      <motion.div className="fixed left-0 top-0 z-[70] h-0.5 origin-left bg-cyan-300" style={{ scaleX }} />
      <a
        aria-label="Back to top"
        className="fixed bottom-5 right-5 z-40 grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-cyan-100 shadow-[0_0_30px_rgba(0,229,255,0.16)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-cyan-300 hover:text-slate-950"
        href="#top"
      >
        <ChevronUp className="size-5" />
      </a>
    </>
  );
}

export function HomeExperience() {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const storedLocale = window.localStorage.getItem("portfolio-locale");
    const preferredLocale =
      storedLocale === "es" || storedLocale === "en"
        ? storedLocale
        : window.navigator.language.toLowerCase().startsWith("es")
          ? "es"
          : "en";

    setLocale(preferredLocale);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("portfolio-locale", locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const content = useMemo(() => getSiteContent(locale), [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, content }}>
      <main className="relative min-h-screen overflow-hidden bg-[#050816] text-slate-100 selection:bg-cyan-300 selection:text-slate-950">
        <SmoothRuntime />
        <CustomCursor />
        <ProgressAndBackToTop />
        <Navigation />
        <div className="pointer-glow" />
        <Hero />
        <AboutTimeline />
        <TechnologyStack />
        <FeaturedProjects />
        <Journey />
        <CertificationsAndYoutube />
        <ContactSection />
        <footer className="border-t border-white/10 px-4 py-8 text-center text-xs text-slate-500">
          {content.footerText}
        </footer>
      </main>
    </LanguageContext.Provider>
  );
}
