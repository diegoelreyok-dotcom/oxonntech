'use client';

import { useRef, useState, useCallback, type JSX } from 'react';
import Link from 'next/link';
import { motion, useInView, type Variants } from 'framer-motion';
import { BLOG_CATEGORY_LABELS } from '@/types';
import type { BlogPost, BlogCategory } from '@/types';
import { formatDate } from '@/lib/utils';

/* ═══════════════════════════════════════════
   Animation Variants
   ═══════════════════════════════════════════ */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.25 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: 6 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ═══════════════════════════════════════════
   Illustration: Risk Parity Waves
   Dynamic allocation waves with regime shift
   ═══════════════════════════════════════════ */

function RiskParityViz({ animate }: { animate: boolean }) {
  return (
    <svg viewBox="0 0 320 180" fill="none" className="h-full w-full">
      <defs>
        <linearGradient id="rpFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(0,229,255,0.14)" />
          <stop offset="100%" stopColor="rgba(0,229,255,0)" />
        </linearGradient>
        <filter id="rpGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Subtle grid lines */}
      {[45, 90, 135].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="320"
          y2={y}
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="0.5"
        />
      ))}

      {/* Regime shift zone — pulses in and out */}
      <motion.rect
        x="130"
        y="0"
        width="70"
        height="180"
        fill="rgba(0,229,255,0.03)"
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: [0, 1, 0] } : { opacity: 0 }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.text
        x="165"
        y="14"
        textAnchor="middle"
        fill="rgba(0,229,255,0.3)"
        fontSize="7"
        fontFamily="monospace"
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: [0, 0.5, 0] } : { opacity: 0 }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        REGIME SHIFT
      </motion.text>

      {/* Fill under primary wave */}
      <motion.path
        d="M0,120 C40,118 70,85 110,80 C150,75 155,40 195,55 C235,70 265,45 320,35 V180 H0 Z"
        fill="url(#rpFill)"
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      />

      {/* Primary wave — cyan */}
      <motion.path
        d="M0,120 C40,118 70,85 110,80 C150,75 155,40 195,55 C235,70 265,45 320,35"
        stroke="#00E5FF"
        strokeWidth="2"
        filter="url(#rpGlow)"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      />

      {/* Secondary wave — teal dashed */}
      <motion.path
        d="M0,130 C50,128 80,100 130,95 C180,90 190,65 230,72 C270,79 290,55 320,50"
        stroke="#00B8CC"
        strokeWidth="1"
        strokeDasharray="5 4"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 2, delay: 0.3, ease: 'easeOut' }}
      />

      {/* Tertiary wave — dark teal */}
      <motion.path
        d="M0,145 C40,142 80,125 120,118 C160,111 180,95 220,100 C260,105 280,82 320,70"
        stroke="#005C66"
        strokeWidth="0.8"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 2, delay: 0.6, ease: 'easeOut' }}
      />

      {/* Data points on primary wave */}
      {[
        { cx: 0, cy: 120 },
        { cx: 110, cy: 80 },
        { cx: 195, cy: 55 },
        { cx: 320, cy: 35 },
      ].map((pt, i) => (
        <motion.circle
          key={i}
          cx={pt.cx}
          cy={pt.cy}
          r="3"
          fill="#0A0A0A"
          stroke="#00E5FF"
          strokeWidth="1.5"
          initial={{ opacity: 0 }}
          animate={animate ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            delay: 1.5 + i * 0.2,
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}

      {/* Endpoint pulse */}
      <motion.circle
        cx="320"
        cy="35"
        r="3"
        fill="#00E5FF"
        filter="url(#rpGlow)"
        initial={{ opacity: 0 }}
        animate={
          animate
            ? { opacity: [0, 1, 0.3, 1] }
            : { opacity: 0 }
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Axis labels */}
      <text
        x="4"
        y="175"
        fill="rgba(255,255,255,0.15)"
        fontSize="6"
        fontFamily="monospace"
      >
        LOW RISK
      </text>
      <text
        x="258"
        y="175"
        fill="rgba(255,255,255,0.15)"
        fontSize="6"
        fontFamily="monospace"
      >
        HIGH RISK
      </text>
    </svg>
  );
}

/* ═══════════════════════════════════════════
   Illustration: Neural Network
   Animated nodes, connections & traveling pulses
   ═══════════════════════════════════════════ */

function NeuralNetViz({ animate }: { animate: boolean }) {
  const layers = [
    [
      { x: 45, y: 35 },
      { x: 45, y: 75 },
      { x: 45, y: 115 },
      { x: 45, y: 155 },
    ],
    [
      { x: 120, y: 25 },
      { x: 120, y: 60 },
      { x: 120, y: 95 },
      { x: 120, y: 130 },
      { x: 120, y: 165 },
    ],
    [
      { x: 200, y: 40 },
      { x: 200, y: 90 },
      { x: 200, y: 140 },
    ],
    [
      { x: 275, y: 65 },
      { x: 275, y: 120 },
    ],
  ];

  const connections: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let l = 0; l < layers.length - 1; l++) {
    for (const from of layers[l]) {
      for (const to of layers[l + 1]) {
        connections.push({ x1: from.x, y1: from.y, x2: to.x, y2: to.y });
      }
    }
  }

  const pulseIndices = [0, 7, 15, 24, 30, 38];

  return (
    <svg viewBox="0 0 320 180" fill="none" className="h-full w-full">
      <defs>
        <filter id="nnGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Connection lines */}
      {connections.map((c, i) => (
        <motion.line
          key={i}
          x1={c.x1}
          y1={c.y1}
          x2={c.x2}
          y2={c.y2}
          stroke="rgba(0,229,255,0.06)"
          strokeWidth="0.5"
          initial={{ opacity: 0 }}
          animate={animate ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 + i * 0.01 }}
        />
      ))}

      {/* Traveling data pulses */}
      {animate &&
        pulseIndices.map((ci, idx) => {
          const c = connections[ci % connections.length];
          return (
            <motion.circle
              key={`pulse-${idx}`}
              r="2"
              fill="#00E5FF"
              filter="url(#nnGlow)"
              animate={{
                cx: [c.x1, c.x2],
                cy: [c.y1, c.y2],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                delay: 1 + idx * 0.6,
                repeat: Infinity,
                repeatDelay: 3,
                ease: 'easeInOut',
              }}
            />
          );
        })}

      {/* Nodes */}
      {layers.flat().map((node, i) => (
        <g key={i}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="7"
            fill="#0A0A0A"
            stroke="rgba(0,229,255,0.25)"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={animate ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              delay: 0.4 + i * 0.04,
              duration: 0.5,
            }}
          />
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="3"
            fill="#00E5FF"
            initial={{ opacity: 0 }}
            animate={
              animate
                ? { opacity: [0.2, 0.8, 0.2] }
                : { opacity: 0 }
            }
            transition={{
              duration: 2.5,
              delay: 0.6 + i * 0.12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </g>
      ))}

      {/* Layer labels */}
      <motion.text
        x="45"
        y="14"
        textAnchor="middle"
        fill="rgba(255,255,255,0.2)"
        fontSize="7"
        fontFamily="monospace"
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.2 }}
      >
        INPUT
      </motion.text>
      <motion.text
        x="120"
        y="14"
        textAnchor="middle"
        fill="rgba(255,255,255,0.12)"
        fontSize="6"
        fontFamily="monospace"
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.3 }}
      >
        HIDDEN
      </motion.text>
      <motion.text
        x="275"
        y="50"
        textAnchor="middle"
        fill="rgba(0,229,255,0.4)"
        fontSize="7"
        fontFamily="monospace"
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.5 }}
      >
        OUTPUT
      </motion.text>
    </svg>
  );
}

/* ═══════════════════════════════════════════
   Illustration: Infrastructure Network
   Hub-and-spoke topology with data flow
   ═══════════════════════════════════════════ */

function InfraViz({ animate }: { animate: boolean }) {
  const hub = { x: 160, y: 90 };
  const nodes = [
    { x: 55, y: 38, label: 'RISK' },
    { x: 265, y: 38, label: 'EXEC' },
    { x: 35, y: 130, label: 'DATA' },
    { x: 285, y: 130, label: 'API' },
    { x: 100, y: 165, label: 'LOG' },
    { x: 220, y: 165, label: 'MON' },
  ];

  return (
    <svg viewBox="0 0 320 180" fill="none" className="h-full w-full">
      <defs>
        <filter id="ifGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="hubAmbient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,229,255,0.1)" />
          <stop offset="100%" stopColor="rgba(0,229,255,0)" />
        </radialGradient>
      </defs>

      {/* Hub ambient glow */}
      <motion.circle
        cx={hub.x}
        cy={hub.y}
        r="45"
        fill="url(#hubAmbient)"
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      />

      {/* Connection lines */}
      {nodes.map((node, i) => (
        <motion.line
          key={`conn-${i}`}
          x1={hub.x}
          y1={hub.y}
          x2={node.x}
          y2={node.y}
          stroke="rgba(0,229,255,0.12)"
          strokeWidth="1"
          strokeDasharray="4 3"
          initial={{ pathLength: 0 }}
          animate={animate ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.7, delay: 0.6 + i * 0.08 }}
        />
      ))}

      {/* Animated data packets */}
      {animate &&
        nodes.map((node, i) => (
          <motion.circle
            key={`pkt-${i}`}
            r="2"
            fill="#00E5FF"
            filter="url(#ifGlow)"
            animate={{
              cx: [hub.x, node.x, hub.x],
              cy: [hub.y, node.y, hub.y],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2.2,
              delay: 1.5 + i * 0.45,
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: 'easeInOut',
            }}
          />
        ))}

      {/* Central hub node */}
      <motion.circle
        cx={hub.x}
        cy={hub.y}
        r="18"
        fill="#0A0A0A"
        stroke="#00E5FF"
        strokeWidth="1.5"
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />

      {/* Hub pulse ring */}
      <motion.circle
        cx={hub.x}
        cy={hub.y}
        r="28"
        fill="none"
        stroke="rgba(0,229,255,0.12)"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: [0, 0.4, 0] } : { opacity: 0 }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      <motion.text
        x={hub.x}
        y={hub.y + 3.5}
        textAnchor="middle"
        fill="#00E5FF"
        fontSize="9"
        fontWeight="bold"
        fontFamily="monospace"
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.5 }}
      >
        HUB
      </motion.text>

      {/* Satellite nodes */}
      {nodes.map((node, i) => (
        <motion.g
          key={`sat-${i}`}
          initial={{ opacity: 0 }}
          animate={animate ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.9 + i * 0.08, duration: 0.4 }}
        >
          <circle
            cx={node.x}
            cy={node.y}
            r="12"
            fill="#0A0A0A"
            stroke="rgba(0,229,255,0.2)"
            strokeWidth="1"
          />
          <text
            x={node.x}
            y={node.y + 3}
            textAnchor="middle"
            fill="rgba(0,229,255,0.6)"
            fontSize="6.5"
            fontFamily="monospace"
          >
            {node.label}
          </text>
        </motion.g>
      ))}

      {/* Latency label */}
      <motion.text
        x="160"
        y="12"
        textAnchor="middle"
        fill="rgba(0,229,255,0.35)"
        fontSize="7.5"
        fontFamily="monospace"
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2 }}
      >
        {'<'}1ms LATENCY
      </motion.text>
    </svg>
  );
}

/* ═══════════════════════════════════════════
   Slug → Illustration mapper
   ═══════════════════════════════════════════ */

const ILLUSTRATION_MAP: Record<
  string,
  (props: { animate: boolean }) => JSX.Element
> = {
  'adaptive-risk-parity-volatile-regimes': RiskParityViz,
  'volatility-regime-detection-ml': NeuralNetViz,
  'real-time-hedging-infrastructure': InfraViz,
};

function SlugIllustration({
  slug,
  animate,
}: {
  slug: string;
  animate: boolean;
}) {
  const Component = ILLUSTRATION_MAP[slug] ?? RiskParityViz;
  return <Component animate={animate} />;
}

/* ═══════════════════════════════════════════
   3D Insight Card
   Mouse-following perspective tilt
   ═══════════════════════════════════════════ */

function InsightCard3D({
  post,
  isInView,
}: {
  post: BlogPost;
  isInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      style={{ perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Link
          href={`/insights/${post.slug}`}
          className="group block overflow-hidden rounded-2xl border border-[#1F1F1F] bg-[#0A0A0A] transition-colors duration-500 hover:border-[rgba(0,229,255,0.2)]"
        >
          {/* Animated illustration */}
          <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#001a1d] via-[#0A0A0A] to-[#0d1117]">
            {/* Dot matrix background */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  'radial-gradient(circle, #00E5FF 0.5px, transparent 0.5px)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* SVG illustration */}
            <div className="relative h-full w-full p-4">
              <SlugIllustration slug={post.slug} animate={isInView} />
            </div>

            {/* Bottom fade into card body */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0A0A0A] to-transparent" />

            {/* Hover shimmer overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[rgba(0,229,255,0.02)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>

          {/* Content */}
          <div
            className="relative flex flex-col p-6 lg:p-7"
            style={{ transform: 'translateZ(20px)' }}
          >
            {/* Category badge */}
            <span className="mb-3 inline-block w-fit rounded-full bg-[rgba(0,229,255,0.08)] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-[#00E5FF]">
              {BLOG_CATEGORY_LABELS[post.category]}
            </span>

            {/* Title */}
            <h3 className="text-[1.0625rem] font-semibold leading-snug text-white transition-colors duration-200 group-hover:text-[#00E5FF]">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="mt-3 line-clamp-2 text-[0.875rem] leading-relaxed text-[#6B7280]">
              {post.excerpt}
            </p>

            {/* Meta */}
            <div className="mt-5 flex items-center gap-2 text-[12px] text-[#9CA3AF]">
              <time dateTime={post.publishDate}>
                {formatDate(post.publishDate)}
              </time>
              <span aria-hidden="true" className="text-[#2A2A2A]">
                |
              </span>
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Insights Section (export)
   ═══════════════════════════════════════════ */

interface InsightsSectionProps {
  posts: BlogPost[];
  showHeader?: boolean;
  className?: string;
}

export function InsightsSection({
  posts,
  showHeader = true,
  className,
}: InsightsSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section className={className ?? 'py-16 sm:py-20 lg:py-[120px]'}>
      <div
        ref={ref}
        className="mx-auto w-full max-w-[1200px] px-6 md:px-12 lg:px-16"
      >
        {/* Section header */}
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mb-10 max-w-[800px] text-center sm:mb-16"
          >
            <p className="mb-4 text-[12px] font-medium uppercase tracking-[3px] text-[#00E5FF] sm:text-[14px]">
              Insights
            </p>
            <h2 className="mb-4 text-[1.5rem] font-semibold tracking-tight text-white sm:text-[2rem] lg:text-[3rem]">
              Latest Research & Analysis
            </h2>
            <p className="mx-auto max-w-xl text-[0.9375rem] leading-relaxed text-[#9CA3AF] sm:text-[1.125rem]">
              Perspectives from our quantitative research team.
            </p>
          </motion.div>
        )}

        {/* Cards grid with stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {posts.map((post) => (
            <InsightCard3D key={post.id} post={post} isInView={isInView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
