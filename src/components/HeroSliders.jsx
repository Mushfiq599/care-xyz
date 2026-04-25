"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    id: 1,
    tag: "Trusted Care Platform",
    title: "Care for Every Family Member",
    highlight: "with Love & Trust",
    description: "Book verified caretakers for your children, elderly parents, or sick family members — easily, safely, and affordably across Bangladesh.",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1600&q=80",
    cta: { label: "Explore Services", href: "/services" },
    ctaSecondary: { label: "Get Started Free", href: "/register" },
  },
  {
    id: 2,
    tag: "Baby Care Services",
    title: "Your Child Deserves",
    highlight: "The Best Care",
    description: "Our certified babysitters provide a safe, nurturing environment for your little ones. Professional, loving, and always trusted.",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1600&q=80",
    cta: { label: "Book Baby Care", href: "/service/baby-care" },
    ctaSecondary: { label: "Learn More", href: "/about" },
  },
  {
    id: 3,
    tag: "Elderly Care Services",
    title: "Your Parents Deserve",
    highlight: "Comfort & Dignity",
    description: "Compassionate caregivers for your elderly loved ones — at home, on their terms. Because they cared for you, now let us care for them.",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=1600&q=80",
    cta: { label: "Book Elderly Care", href: "/service/elderly-care" },
    ctaSecondary: { label: "Learn More", href: "/about" },
  },
  {
    id: 4,
    tag: "Professional Home Care",
    title: "Healthcare at Your",
    highlight: "Doorstep, 24/7",
    description: "From home nursing to physiotherapy — our trained professionals bring quality healthcare to your home across all 8 divisions of Bangladesh.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1600&q=80",
    cta: { label: "View All Services", href: "/services" },
    ctaSecondary: { label: "Contact Us", href: "/about" },
  },
];

export default function HeroSliders() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Auto play
  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const goTo = (index) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 300);
  };

  const goToNext = () => goTo((current + 1) % slides.length);
  const goToPrev = () => goTo((current - 1 + slides.length) % slides.length);

  const slide = slides[current];

  return (
    <section className="relative w-full h-[92vh] overflow-hidden">

      {/* Background Images */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={s.image}
            alt={s.title}
            fill
            className="object-cover"
            priority={i === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />
        </div>
      ))}

      {/* Decorative blobs */}
      <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-primary opacity-10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-32 w-48 h-48 rounded-full bg-accent opacity-10 blur-3xl pointer-events-none" />

      {/* Slide Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
        <div
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(20px)" : "translateY(0)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}
          className="max-w-2xl"
        >
          {/* Tag */}
          <span className="inline-block bg-primary/30 border border-primary/50 text-green-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            {slide.tag}
          </span>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-3">
            {slide.title} <br />
            <span className="text-primary">{slide.highlight}</span>
          </h1>

          {/* Description */}
          <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-xl">
            {slide.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 flex-wrap">
            <Link
              href={slide.cta.href}
              className="px-7 py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-900/50 text-sm"
            >
              {slide.cta.label} →
            </Link>
            <Link
              href={slide.ctaSecondary.href}
              className="px-7 py-3.5 border-2 border-white/60 text-white font-bold rounded-xl hover:bg-white/10 transition text-sm"
            >
              {slide.ctaSecondary.label}
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-6 mt-10 flex-wrap">
            {[
              { value: "1,200+", label: "Families" },
              { value: "300+", label: "Caretakers" },
              { value: "98%", label: "Satisfaction" },
            ].map((stat, i) => (
              <div key={i} className="text-white">
                <p className="text-2xl font-extrabold text-primary">{stat.value}</p>
                <p className="text-xs text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Prev / Next Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-primary/80 border border-white/20 rounded-full flex items-center justify-center text-white transition backdrop-blur-sm z-10"
      >
        ‹
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-primary/80 border border-white/20 rounded-full flex items-center justify-center text-white transition backdrop-blur-sm z-10"
      >
        ›
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-8 h-3 bg-primary"
                : "w-3 h-3 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-8 right-6 text-white/50 text-sm font-medium z-10">
        {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((current + 1) / slides.length) * 100}%` }}
        />
      </div>
    </section>
  );
}