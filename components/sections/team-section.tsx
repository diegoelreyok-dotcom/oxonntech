'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import type { TeamMember } from '@/types';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

/* Per-member crop adjustments for non-square source photos */
const CROP_POSITION: Record<string, string> = {
  cofounder: 'center 20%',
};

function TeamMemberCard({ member }: { member: TeamMember }) {
  const objectPosition = CROP_POSITION[member.id] ?? 'center center';

  return (
    <motion.div
      variants={cardVariants}
      className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-[#1F1F1F] bg-[#0A0A0A] p-6 text-center transition-all duration-500 hover:border-[rgba(0,229,255,0.15)] sm:p-8"
    >
      {/* Subtle glow behind photo on hover */}
      <div className="absolute left-1/2 top-16 h-32 w-32 -translate-x-1/2 rounded-full bg-[rgba(0,229,255,0.06)] opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />

      {/* Photo */}
      <div className="relative mb-5">
        {/* Animated ring */}
        <div className="absolute -inset-1 rounded-full border border-[rgba(0,229,255,0.1)] transition-all duration-500 group-hover:border-[rgba(0,229,255,0.3)] group-hover:shadow-[0_0_24px_rgba(0,229,255,0.08)]" />
        <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-[#1F1F1F] transition-colors duration-500 group-hover:border-[rgba(0,229,255,0.25)]">
          <Image
            src={member.image.src}
            alt={member.image.alt}
            width={member.image.width}
            height={member.image.height}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ objectPosition }}
          />
        </div>
      </div>

      {/* Name */}
      <h3 className="text-[1.0625rem] font-semibold text-white transition-colors duration-300 group-hover:text-[#00E5FF]">
        {member.name}
      </h3>

      {/* Role */}
      <p className="mt-1 text-[0.8125rem] font-medium text-[#00E5FF]">
        {member.role}
      </p>

      {/* Bio */}
      <p className="mt-3 text-[0.8125rem] leading-relaxed text-[#6B7280]">
        {member.bio}
      </p>

      {/* LinkedIn */}
      {member.linkedIn && (
        <a
          href={member.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center gap-1.5 text-[0.75rem] text-[#6B7280] transition-colors duration-300 hover:text-[#00E5FF]"
          aria-label={`${member.name} on LinkedIn`}
        >
          <Linkedin className="h-3.5 w-3.5" />
          LinkedIn
        </a>
      )}
    </motion.div>
  );
}

interface TeamSectionProps {
  members: TeamMember[];
}

export function TeamSection({ members }: TeamSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <div ref={ref}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mb-14 max-w-[600px] text-center"
      >
        <p className="mb-4 text-[12px] font-medium uppercase tracking-[3px] text-[#00E5FF] sm:text-[14px]">
          Leadership
        </p>
        <h2 className="text-[1.5rem] font-semibold tracking-tight text-white sm:text-[2rem] lg:text-[2.75rem]">
          The Team Behind OXONN
        </h2>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="mx-auto grid max-w-[1100px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {members.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </motion.div>
    </div>
  );
}
