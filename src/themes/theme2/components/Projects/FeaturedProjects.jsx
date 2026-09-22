import React from 'react';
import portfolioData from '../../../../data/portfolio.json';
import { ExternalLink, Github } from 'lucide-react';
import './Projects.css';

// Static image imports for instant pre-cached loading
import pawpertioImg from '../../../../assets/Projects/pawpertio.png';
import dhomeImg from '../../../../assets/Projects/D-Home.png';
import wittoolImg from '../../../../assets/Projects/wittool.webp';
import witcetImg from '../../../../assets/Projects/witcet.png';

const projectImages = [pawpertioImg, dhomeImg, wittoolImg, witcetImg];

export default function FeaturedProjects() {
  const { projects } = portfolioData;
  const isProjectActive = (p) => p && p.active !== false && p.status !== 'off';

  // Format Web Projects directly from portfolio.json data
  const webProjects = (projects || []).filter(isProjectActive).map((p, idx) => ({
    id: `web-${idx}`,
    type: 'Full-Stack Web',
    title: p.subtitle || p.category,
    category: p.category || 'Full-Stack App',
    subtitle: p.subtitle,
    description: p.description,
    tech: p.tech ? p.tech.split(',').map((t) => t.trim()) : [],
    live: p.live,
    github: p.github,
    img: projectImages[idx % projectImages.length] || p.img,
  }));

  return (
    <section id="projects" className="theme2-section theme2-projects-section">
      <div className="theme2-container">
        <div className="theme2-projects-card-box">
          {/* Header */}
          <div className="theme2-projects-header">
            <div>
              <span className="theme2-section-eyebrow">FEATURED PROJECTS</span>
              <h2 className="theme2-section-title">Projects</h2>
            </div>
          </div>

          {/* Grid */}
          <div className="theme2-projects-grid">
            {webProjects.map((project) => (
              <div key={project.id} className="theme2-project-card">
                <div className="theme2-project-img-wrapper">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="theme2-project-img"
                    loading="eager"
                    decoding="sync"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/600x380/f3eeff/8b5cf6?text=' + encodeURIComponent(project.category);
                    }}
                  />
                </div>

                <div className="theme2-project-body">
                  <div className="theme2-project-meta">
                    <span className="theme2-project-category">{project.category}</span>
                  </div>

                  <h3 className="theme2-project-title">{project.title}</h3>
                  <p className="theme2-project-desc">{project.description}</p>

                  <div className="theme2-project-tags">
                    {project.tech.map((tag, idx) => (
                      <span key={idx} className="theme2-project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="theme2-project-actions">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="theme2-project-btn theme2-project-btn-live"
                      >
                        <ExternalLink size={14} />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="theme2-project-btn theme2-project-btn-code"
                      >
                        <Github size={14} />
                        <span>Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
