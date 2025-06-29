import { motion } from 'framer-motion';

export function BackgroundElements() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-primary-50/30 to-accent-50/20 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900" />
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0">
        {/* Main Grid */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(20, 184, 166, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(20, 184, 166, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '60px 60px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
        />
        
        {/* Secondary Grid - Smaller */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(16, 185, 129, 0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '-20px -20px'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
        />
        
        {/* Accent Grid - Diagonal */}
        <motion.div
          className="absolute inset-0 opacity-40 dark:opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(52, 211, 153, 0.06) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(52, 211, 153, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '40px 0px', '0px 40px', '40px 40px'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Grid Intersection Dots */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => {
          const row = Math.floor(i / 4);
          const col = i % 4;
          const x = 20 + col * 25;
          const y = 20 + row * 30;
          
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                background: 'linear-gradient(45deg, rgba(20, 184, 166, 0.6), rgba(16, 185, 129, 0.4))',
              }}
              animate={{
                scale: [0.5, 1.2, 0.5],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          );
        })}
      </div>

      {/* Flowing Grid Lines */}
      <div className="absolute inset-0">
        {/* Horizontal flowing lines */}
        <motion.div
          className="absolute top-1/4 left-0 w-full h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(20, 184, 166, 0.6), transparent)',
          }}
          animate={{
            scaleX: [0, 1, 0],
            x: ['-100%', '0%', '100%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-2/3 left-0 w-full h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.6), transparent)',
          }}
          animate={{
            scaleX: [0, 1, 0],
            x: ['100%', '0%', '-100%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Vertical flowing lines */}
        <motion.div
          className="absolute top-0 left-1/3 w-px h-full"
          style={{
            background: 'linear-gradient(180deg, transparent, rgba(52, 211, 153, 0.6), transparent)',
          }}
          animate={{
            scaleY: [0, 1, 0],
            y: ['-100%', '0%', '100%'],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <motion.div
          className="absolute top-0 right-1/4 w-px h-full"
          style={{
            background: 'linear-gradient(180deg, transparent, rgba(245, 158, 11, 0.6), transparent)',
          }}
          animate={{
            scaleY: [0, 1, 0],
            y: ['100%', '0%', '-100%'],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>

      {/* Grid Pulse Effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(20, 184, 166, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(52, 211, 153, 0.06) 0%, transparent 60%)
          `,
        }}
        animate={{
          opacity: [0.4, 0.8, 0.4],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full opacity-20 dark:opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.4) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full opacity-20 dark:opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)',
          filter: 'blur(15px)',
        }}
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -20, 0],
          scale: [0.8, 1.1, 0.9, 0.8],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </div>
  );
}