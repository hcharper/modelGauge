'use client';

import { motion } from 'framer-motion';
import { Fuel } from 'lucide-react';

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-3 sm:py-6"
    >
      <div className="flex items-center justify-center gap-3 mb-2">
        <Fuel className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400" />
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
          AI Meter
        </h1>
      </div>
      <p className="text-sm text-neutral-400">
        How fast does $100 drain across AI models?{' '}
        <span className="text-neutral-500">Built for OpenClaw</span>
      </p>
    </motion.header>
  );
}
