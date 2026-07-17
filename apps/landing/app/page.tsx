'use client';

import { AnimatedSection } from '../components/AnimatedSection';
import { Hero } from '../sections/Hero';
import { Benefits } from '../sections/Benefits';
import { CaseStudies } from '@/sections/CaseStudies';
import { Assortment } from '../sections/Assortment';
import { China } from '@/sections/China';
import { Certification } from '@/sections/Certification';
import { Experience } from '@/sections/Experience';
import { Contact } from '@/sections/Contact';

export default function Home() {
  return (
    <main>
      <AnimatedSection delay={0}>
        <Hero />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <Benefits />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <Assortment />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <China />
      </AnimatedSection>
      <AnimatedSection delay={0.15}>
        <CaseStudies />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <Certification />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <Experience />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <Contact />
      </AnimatedSection>
    </main>
  );
}