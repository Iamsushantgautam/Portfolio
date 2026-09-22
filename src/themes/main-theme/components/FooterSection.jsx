import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaLinkedinIn, FaGithub, FaInstagram } from 'react-icons/fa'
import { SiFiverr } from 'react-icons/si'
import { Copy, CheckCircle2 } from 'lucide-react'
import sushantCV from '../../../assets/SushantCV.pdf'
import '../styles/FooterSection.css'
import portfolioData from '../../../data/portfolio.json'

function FooterSection() {
  const [copied, setCopied] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const containerRef = useRef(null)

  const { personalInfo, fiverr } = portfolioData || {}

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Giant background text scroll
  const xMove = useTransform(scrollYProgress, [0, 1], [-100, 200])

  const handleCopy = () => {
    navigator.clipboard.writeText(personalInfo?.email || 'iamsushantgautam@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Live time update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      setCurrentTime(timeStr)
    }
    updateTime()
    const interval = setInterval(updateTime, 60000) // update every minute
    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="footer-section" ref={containerRef}>
      {/* Giant Background Text Animation */}
      <div className="footer-bg-text-container">
        <motion.span className="footer-bg-text" style={{ x: xMove }}>
          SUSHANT GAUTAM // PORTFOLIO 2026 // MADE WITH LOVE // OPEN TO PROJECTS //
        </motion.span>
      </div>

      <div className="footer-container">

        {/* Social Banner / Brand */}
        <motion.div
          className="social-banner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="brand-text">
            <span className="brand-code">CODE</span><br />
            <span className="brand-maverick">MAVERICK</span>
          </div>

          <div className="social-icons-group">
            {/* LinkedIn */}
            {personalInfo?.linkedin && (
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="social-circle circle-linkedin">
                <FaLinkedinIn />
              </a>
            )}

            {/* Github */}
            {personalInfo?.github && (
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="social-circle circle-github">
                <FaGithub />
              </a>
            )}

            {/* Instagram */}
            {personalInfo?.instagram && (
              <a href={personalInfo.instagram} target="_blank" rel="noreferrer" className="social-circle circle-instagram">
                <FaInstagram />
              </a>
            )}

            {/* Fiverr */}
            {fiverr?.link && (
              <a href={fiverr.link} target="_blank" rel="noreferrer" className="social-circle circle-fiverr">
                <SiFiverr />
              </a>
            )}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          className="contact-area"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <span className="contact-eyebrow">Looking for a new talent?</span>

          <div className="contact-email-wrapper">
            <span className="contact-email">{personalInfo?.email || 'iamsushantgautam@gmail.com'}</span>
            <button className="copy-btn" onClick={handleCopy} aria-label="Copy Email">
              {copied ? <CheckCircle2 color="#4ade80" size={24} /> : <Copy size={24} />}
            </button>
          </div>

          <div className="contact-links" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {personalInfo?.linkedin && (
              <>
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                <span>•</span>
              </>
            )}
            <a href={sushantCV} download="Sushant_CV.pdf">Download CV</a>
            <span>•</span> <a href="/shopifystore">Shopify Store</a>
            <span>•</span> <a href="/portfolios">Portfolios Showcase</a>
          </div>
        </motion.div>

        {/* Footer Bottom Info Grid */}
        <motion.div
          className="footer-bottom-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1 }}
        >
          {/* Left */}
          <div className="footer-bottom-col">
            <span className="f-label">Availability</span>
            <span className="f-value">Currently available for full-time</span>
          </div>

          {/* Center */}
          <div className="footer-bottom-col f-col-center">
            <span className="f-label">© 2026, Sushant Gautam</span>
            <span className="f-value">All Rights Reserved</span>
          </div>

          {/* Right */}
          <div className="footer-bottom-col f-col-right">
            <span className="f-label">Uttar Pradesh, Lucknow</span>
            <span className="f-value">Current Time: {currentTime}</span>
          </div>
        </motion.div>

      </div>
    </footer>
  )
}

export default FooterSection
