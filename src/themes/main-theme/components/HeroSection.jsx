import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { SiMongodb, SiExpress, SiReact, SiNodedotjs, SiShopify, SiCanva, SiLaravel } from 'react-icons/si'
import meNoBg from '../../../assets/me3.svg'
import '../styles/HeroSection.css'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.2, ease: 'easeOut' },
  },
}

const HeartIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.path
      d="M16 28s-14-8.5-14-17A8 8 0 0116 6.7 8 8 0 0130 11c0 8.5-14 17-14 17z"
      stroke="var(--accent)"
      strokeWidth="2.5"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    />
  </svg>
)

function HeroSection() {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  })

  const yText = useTransform(scrollYProgress, [0, 1], [0, 100])
  const yImg = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const pathLength = useScroll({
    target: targetRef,
    offset: ["start 0.8", "end 0.2"]
  }).scrollYProgress

  return (
    <motion.section
      ref={targetRef}
      className="hero-wrapper"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ opacity }}
    >
      {/* Giant Background Text (SOLID - BEHIND IMAGE) */}
      <motion.div className="hero-bg-text-container" style={{ y: yText }}>
        <motion.h1 variants={fadeUp} className="huge-title">
          <span className="desktop-name">SUSHANT</span>
          <span className="mobile-name">SUSHANT<br />KUMAR<br />GAUTAM</span>
        </motion.h1>
      </motion.div>

      {/* Giant Outline Text (IN FRONT OF IMAGE - PARALLAX STROKE) */}
      <motion.div
        className="hero-bg-text-container outline-layer"
        style={{
          y: yText,
          x: useTransform(scrollYProgress, [0, -1], [0, 100]),
          opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0]) // Always visible at start, fades out as we scroll deep
        }}
      >
        <motion.h1 variants={fadeUp} className="huge-title outline-only  ">
          <span className="desktop-name">SUSHANT</span>
          <span className="mobile-name">SUSHANT<br />KUMAR<br />GAUTAM</span>
        </motion.h1>
      </motion.div>

      {/* Decorative Heart Icons */}
      <motion.div variants={fadeIn}>
        <HeartIcon className="abs-icon icon-1" />
      </motion.div>
      <motion.div variants={fadeIn}>
        <HeartIcon className="abs-icon icon-2" />
      </motion.div>

      {/* Developer Image (MIDDLE LAYER) */}
      <motion.div
        className="hero-image-layer"
        variants={fadeIn}
        style={{ y: yImg, x: "-50%" }}
      >
        <img
          src={meNoBg}
          alt="Shopify Developer"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
            WebkitUserDrag: 'none'
          }}
        />
      </motion.div>


      {/* Professional Intro Text */}
      <motion.div
        className="hero-intro-text"
        variants={fadeIn}
      >
        <p className="intro-greeting">Full-Stack Developer</p>
        <div className="intro-chips">
          <span className="intro-chip chip-laravel">Laravel</span>
          <span className="intro-chip chip-react">MERN</span>
          <span className="intro-chip chip-shopify">Shopify</span>
        </div>
        {/* <p className="intro-title">Computer Science &amp; Engineering Student</p> */}
      </motion.div>

      {/* Floating Quote in Script Font */}
      <motion.div
        className="foreground-quote script-font"
        variants={fadeIn}
      >
        Code is not just what you build,<br />it&apos;s how it makes you feel.
      </motion.div>

      {/* Year Range Pill – Right */}
      {/* <motion.div className="pill-button pill-right" variants={fadeUp}>
        2021 – 2025
      </motion.div> */}

      {/* Floating Tech Icons */}
      <motion.div className="tech-icon floating-react" variants={fadeIn} style={{ '--rot': '12deg' }}>
        <SiReact color="#61DAFB" />
      </motion.div>
      <motion.div className="tech-icon floating-node" variants={fadeIn} style={{ '--rot': '-8deg' }}>
        <SiNodedotjs color="#339933" />
      </motion.div>
      <motion.div className="tech-icon floating-mongo" variants={fadeIn} style={{ '--rot': '5deg' }}>
        <SiMongodb color="#47A248" />
      </motion.div>
      <motion.div className="tech-icon floating-express" variants={fadeIn} style={{ '--rot': '-12deg' }}>
        <SiExpress color="#000000" />
      </motion.div>
      <motion.div className="tech-icon floating-shopify" variants={fadeIn} style={{ '--rot': '15deg' }}>
        <SiShopify color="#95BF47" />
      </motion.div>
      <motion.div className="tech-icon floating-canva" variants={fadeIn} style={{ '--rot': '-18deg' }}>
        <SiCanva color="#00C4CC" />
      </motion.div>
      <motion.div className="tech-icon floating-laravel" variants={fadeIn} style={{ '--rot': '10deg' }}>
        <SiLaravel color="#FF2D20" />
      </motion.div>


      {/* Bottom Info Bar */}
      <motion.div className="bottom-bar" variants={fadeUp}>
        <span>SUSHANT GAUTAM</span>
        <span>@web developer</span>
        <span>+91-6393958548</span>
        <span>iamsushantgautam@gmail.com</span>
      </motion.div>
    </motion.section>
  )
}

export default HeroSection
