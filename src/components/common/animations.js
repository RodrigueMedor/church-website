import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { Box, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';

// ─── FadeIn: Simple fade-in with optional delay ─────────────────────────────
export const FadeIn = ({ children, delay = 0, duration = 0.6, direction = 'up', distance = 30, ...props }) => {
  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionMap[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// ─── SlideUp: Slide up with fade ────────────────────────────────────────────
export const SlideUp = ({ children, delay = 0, distance = 50, ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: distance }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    {...props}
  >
    {children}
  </motion.div>
);

// ─── ScaleIn: Scale up with fade ────────────────────────────────────────────
export const ScaleIn = ({ children, delay = 0, scale = 0.9, ...props }) => (
  <motion.div
    initial={{ opacity: 0, scale }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    {...props}
  >
    {children}
  </motion.div>
);

// ─── StaggerContainer: Parent for staggered children ────────────────────────
export const StaggerContainer = ({ children, stagger = 0.1, delay = 0, ...props }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-60px' }}
    variants={{
      visible: {
        transition: {
          staggerChildren: stagger,
          delayChildren: delay,
        },
      },
    }}
    {...props}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, ...props }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
      },
    }}
    {...props}
  >
    {children}
  </motion.div>
);

// ─── Parallax: Scroll-based parallax transform ──────────────────────────────
export const Parallax = ({ children, speed = 0.3, ...props }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);

  return (
    <motion.div ref={ref} style={{ y }} {...props}>
      {children}
    </motion.div>
  );
};

// ─── Counter: Animated number counter ───────────────────────────────────────
export const Counter = ({ end, duration = 2, suffix = '', prefix = '', decimals = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const count = useMotionValue(0);
  const rounded = useSpring(count, { duration: duration * 1000 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      count.set(end);
    }
  }, [isInView, end, count]);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(Number(latest.toFixed(decimals)));
    });
    return unsubscribe;
  }, [rounded, decimals]);

  return (
    <span ref={ref}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
};

// ─── PageTransition: Route transition wrapper ───────────────────────────────
export const PageTransition = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// ─── RevealOnScroll: Generic scroll-triggered reveal ────────────────────────
export const RevealOnScroll = ({ children, threshold = 0.15, ...props }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <Box
      ref={ref}
      sx={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

// ─── HoverCard: Card with hover lift + scale ────────────────────────────────
export const HoverCard = ({ children, lift = -8, scale = 1.02, ...props }) => (
  <motion.div
    whileHover={{ y: lift, scale }}
    whileTap={{ scale: 0.98 }}
    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    {...props}
  >
    {children}
  </motion.div>
);

// ─── TextReveal: Character-by-character text reveal ─────────────────────────
export const TextReveal = ({ text, delay = 0, ...props }) => {
  const words = text.split(' ');
  return (
    <motion.span {...props}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: delay + i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ display: 'inline-block', marginRight: '0.3em' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

// ─── SectionLabel: Animated small label above headings ──────────────────────
export const SectionLabel = ({ children, delay = 0, ...props }) => {
  const theme = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Box
        component="span"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
          px: 2.5,
          py: 0.75,
          borderRadius: 10,
          bgcolor: 'rgba(15, 76, 129, 0.06)',
          color: 'primary.main',
          fontWeight: 600,
          fontSize: '0.8rem',
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          mb: 2,
          ...props.sx,
        }}
        {...props}
      >
        {children}
      </Box>
    </motion.div>
  );
};

// ─── MagneticButton: Button with magnetic hover effect ──────────────────────
export const MagneticButton = ({ children, ...props }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        {children}
      </motion.div>
    </motion.div>
  );
};

// ─── GlowEffect: Glow ring on hover ────────────────────────────────────────
export const GlowEffect = ({ children, color = 'rgba(15, 76, 129, 0.3)', ...props }) => (
  <motion.div
    whileHover={{ boxShadow: `0 0 30px ${color}, 0 0 60px ${color}` }}
    transition={{ duration: 0.4 }}
    style={{ borderRadius: 20 }}
    {...props}
  >
    {children}
  </motion.div>
);
