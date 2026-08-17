import React, { useEffect } from 'react';
import { initSiteAnimations } from './siteAnimations';
import './styles.css';

function IntroOverlay() {
  return (
    <div className="intro-screen" id="intro-screen" aria-hidden="true">
    <div className="intro-grid"></div>
    <div className="intro-glow intro-glow-one"></div>
    <div className="intro-glow intro-glow-two"></div>
    <div className="intro-molecule" aria-hidden="true">
    <span className="intro-node node-one"></span>
    <span className="intro-node node-two"></span>
    <span className="intro-node node-three"></span>
    <span className="intro-node node-four"></span>
    <span className="intro-orbit orbit-horizontal"></span>
    <span className="intro-orbit orbit-vertical"></span>
    <span className="intro-core"></span>
    </div>
    <div className="intro-content">
    <span className="intro-kicker">MOLECULAR SYSTEMS / 01</span>
    <h2>BIOTECH <em>ANIMATED.</em></h2>
    <p>Digital information, translated into biology.</p>
    <div className="intro-progress"><span></span></div>
    </div>
    </div>
  );
}

function DetailModal() {
  return (
    <div className="detail-modal" id="detail-modal" aria-hidden="true">
    <div className="detail-backdrop" data-modal-close=""></div>
    <div className="detail-panel" role="dialog" aria-modal="true" aria-labelledby="detail-title">
    <button className="detail-close" type="button" aria-label="Close details" data-modal-close="">×</button>
    <div className="detail-index" id="detail-index">01 / CAPABILITY</div>
    <div className="detail-icon" id="detail-icon"><span></span></div>
    <span className="mini-label" id="detail-label">CAPABILITY</span>
    <h2 id="detail-title">Enterprise Archive</h2>
    <p id="detail-description"></p>
    <div className="detail-points" id="detail-points"></div>
    <div className="detail-footer"><span>CODEX BIOSCIENCES</span><span>EXPLORE / DETAIL</span></div>
    </div>
    </div>
  );
}

function GlobalChrome() {
  return (
    <>
      <div className="noise"></div>
      <div className="page-progress" id="page-progress"></div>
      <div className="cursor-dot" id="cursor-dot"></div>
      <div className="cursor-ring" id="cursor-ring"></div>
    </>
  );
}

function SiteHeader() {
  return (
    <header id="site-header">
    <div className="container nav-shell">
    <nav>
    <a href="#hero" className="logo" aria-label="Codex Biosciences home">
    <span className="logo-mark"><i></i><i></i><i></i><i></i><b></b></span>
    <span>CODEX</span><small>BIOSCIENCES</small>
    </a>
    <div className="nav-links">
    <a href="#about">About</a>
    <a href="#technology">Technology</a>
    <a href="#capabilities">Capabilities</a>
    <a href="#impact">Impact</a>
    </div>
    <a href="#final" className="nav-pill magnetic">Start a conversation <span>↗</span></a>
    <button className="menu-toggle" aria-label="Open navigation"><span></span><span></span></button>
    <div className="mobile-menu" id="mobile-menu"><a href="#about">About</a><a href="#technology">Technology</a><a href="#capabilities">Capabilities</a><a href="#impact">Impact</a><a href="#final">Start a conversation ↗</a></div>
    </nav>
    </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="hero section-dark" id="hero">
    <div className="hero-grid-bg"></div>
    <div className="hero-glow hero-glow-a"></div>
    <div className="hero-glow hero-glow-b"></div>
    <div className="container hero-container">
    <div className="hero-topline reveal-fast"><span>01 / MOLECULAR ARCHIVE</span><span>PRECISION • MEMORY • TIME</span></div>
    <div className="hero-grid">
    <div className="hero-copy">
    <div className="eyebrow"><span className="dot"></span>MOLECULAR DATA STORAGE</div>
    <h1>Write the future<br />in <em>DNA.</em></h1>
    <p className="lede">Codex Biosciences explores molecular data storage — translating digital information into synthetic DNA through an engineered pipeline built for density, durability, and long-term memory.</p>
    <div className="hero-actions">
    <a href="#final" className="btn btn-primary magnetic">Request Access <span>↗</span></a>
    <a href="#technology" className="text-link magnetic">Explore the platform <span>→</span></a>
    </div>
    <div className="hero-metrics">
    <div><strong>10,000+</strong><span>years of archival potential</span></div>
    <div><strong>215 PB</strong><span>theoretical density / gram</span></div>
    <div><strong>4 bases</strong><span>one molecular alphabet</span></div>
    </div>
    </div>
    <div className="hero-explore-layer" aria-label="Interactive molecular explorer">
    <div className="explore-orbit explore-orbit-one"></div>
    <div className="explore-orbit explore-orbit-two"></div>
    <div className="explore-crosshair"></div>
    <button className="molecule-hotspot hotspot-one" type="button" data-detail-type="molecular" data-detail-index="01" data-detail-label="MOLECULAR NODE" data-detail-title="Information Layer" data-detail-description="A visual representation of how digital information can be mapped into a molecular sequence." data-detail-points="Binary-to-base mapping|Redundant sequence design|Molecular verification" aria-label="Open information layer details">
    <span></span><b>01</b>
    </button>
    <button className="molecule-hotspot hotspot-two" type="button" data-detail-type="molecular" data-detail-index="02" data-detail-label="MOLECULAR NODE" data-detail-title="Synthesis Layer" data-detail-description="The encoded sequence becomes a physical molecular object through a controlled synthesis workflow." data-detail-points="Sequence preparation|Chemical synthesis|Quality verification" aria-label="Open synthesis layer details">
    <span></span><b>02</b>
    </button>
    <button className="molecule-hotspot hotspot-three" type="button" data-detail-type="molecular" data-detail-index="03" data-detail-label="MOLECULAR NODE" data-detail-title="Archive Layer" data-detail-description="The molecular record is preserved as a long-term archive object, ready for verified retrieval." data-detail-points="Inert encapsulation|Cold storage|Chain of custody" aria-label="Open archive layer details">
    <span></span><b>03</b>
    </button>
    <div className="explore-hud">
    <span className="explore-hud-label">INTERACTIVE MOLECULAR MAP</span>
    <span className="explore-hud-status"><i></i> LIVE / DRAG / CLICK</span>
    </div>
    </div>
    <div className="hero-visual">
    <div className="visual-orbit orbit-1"></div>
    <div className="visual-orbit orbit-2"></div>
    <div className="helix3d-wrap" id="helix3d-wrap">
    <div className="helix-label label-top">LIVE MOLECULAR MODEL <span></span></div>
    <canvas id="helix3d" />
    <div className="helix-corner corner-a">A / T</div>
    <div className="helix-corner corner-b">C / G</div>
    </div>
    <div className="drag-hint"><span className="drag-hint-icon">◎</span><span>Move to explore</span><span className="hint-sep">•</span><span>Drag to rotate</span></div>
    <div className="floating-readout readout-a"><span>STRAND</span><strong>5′ → 3′</strong><i></i></div>
    <div className="floating-readout readout-b"><span>STATUS</span><strong><b></b> SYNTHETIC</strong></div>
    </div>
    </div>
    <div className="sequence-strip" aria-label="Illustrative DNA sequence readout">
    <div className="sequence-label"><span className="signal-dot"></span>ILLUSTRATIVE SEQUENCE <b>5′ → 3′</b></div>
    <div className="sequence-window"><div className="sequence-track" id="marquee"></div></div>
    </div>
    <div className="hero-scroll"><span>Scroll to discover</span><i></i></div>
    </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="section-light about-section">
    <div className="section-watermark">BIOLOGY</div>
    <div className="container">
    <div className="section-kicker reveal"><span>02</span><i></i><b>THE ARCHIVE PROBLEM</b></div>
    <div className="about-intro">
    <h2 className="reveal">The world runs out of<br /><em>places to put its data.</em></h2>
    <div className="about-copy reveal">
    <p>Humanity now generates more data every two days than it did from the dawn of writing through 2003. Magnetic tape — still the backbone of long-term archives — degrades within a decade and must be re-copied every few years just to survive.</p>
    <p><strong>DNA doesn't have that problem.</strong> It's the same molecule that has preserved genetic information in fossils for tens of thousands of years, and it packs information at a density no engineered medium has matched.</p>
    <p>Codex builds the encoding, synthesis, and retrieval systems that make DNA a practical, enterprise-ready storage tier — not a lab curiosity.</p>
    </div>
    </div>
    <div className="density-layout">
    <div className="density-copy reveal">
    <span className="mini-label">DENSITY / LOG SCALE</span>
    <h3>More memory.<br /><em>Less material.</em></h3>
    <p>Three storage media. One extraordinary difference in physical scale.</p>
    <div className="density-legend"><span><i className="legend-dot tape"></i> legacy</span><span><i className="legend-dot ssd"></i> current</span><span><i className="legend-dot dna"></i> molecular</span></div>
    </div>
    <div className="density-viz reveal">
    <div className="density-row"><div className="density-label"><span>Magnetic Tape (LTO-9)</span><strong>~0.6 GB / mm³</strong></div><div className="density-bar-track"><div className="density-bar-fill fill-tape" data-width="6"></div></div></div>
    <div className="density-row"><div className="density-label"><span>Solid-State (NAND)</span><strong>~600 GB / mm³</strong></div><div className="density-bar-track"><div className="density-bar-fill fill-ssd" data-width="28"></div></div></div>
    <div className="density-row"><div className="density-label"><span>Synthetic DNA</span><strong>~215,000,000 GB / mm³</strong></div><div className="density-bar-track"><div className="density-bar-fill fill-dna" data-width="100"></div></div></div>
    <div className="density-note">Theoretical density, log-scaled for display · illustrative modeling</div>
    </div>
    </div>
    </div>
    </section>
  );
}

function MolecularStorySection() {
  return (
    <section className="molecular-story section-dark" id="molecular-story">
    <div className="story-grid"></div>
    <div className="story-pulse"></div>
    <div className="container story-container">
    <div className="section-kicker section-kicker-dark reveal"><span>02A</span><i></i><b>INSIDE THE MOLECULE</b></div>
    <div className="story-stage">
    <div className="story-copy">
    <span className="mini-label">SCROLL-DRIVEN BIOLOGY</span>
    <h2>Follow the signal.<br /><em>Watch information become matter.</em></h2>
    <p id="story-caption">A digital record begins as a sequence of bits. Scroll to move through the molecular transformation.</p>
    </div>
    <div className="story-visual" aria-hidden="true">
    <div className="story-ring ring-a"></div>
    <div className="story-ring ring-b"></div>
    <div className="story-ring ring-c"></div>
    <div className="story-core"><span></span><span></span><span></span></div>
    <div className="story-particle particle-a"></div>
    <div className="story-particle particle-b"></div>
    <div className="story-particle particle-c"></div>
    <div className="story-particle particle-d"></div>
    <div className="story-stage-label">01 / DIGITAL SIGNAL</div>
    </div>
    </div>
    <div className="story-steps" role="list">
    <button className="story-step is-active" type="button" data-story="0" data-caption="A digital record begins as a sequence of bits — precise, repeatable and ready to be translated.">
    <span>01</span><strong>Signal</strong><i></i>
    </button>
    <button className="story-step" type="button" data-story="1" data-caption="The signal is mapped into four molecular bases, creating a compact biological alphabet.">
    <span>02</span><strong>Encode</strong><i></i>
    </button>
    <button className="story-step" type="button" data-story="2" data-caption="The sequence becomes a physical strand — information now exists as matter.">
    <span>03</span><strong>Synthesize</strong><i></i>
    </button>
    <button className="story-step" type="button" data-story="3" data-caption="The molecular record enters long-term storage, ready to be verified and retrieved.">
    <span>04</span><strong>Archive</strong><i></i>
    </button>
    </div>
    </div>
    </section>
  );
}

function TechnologySection() {
  return (
    <section id="technology" className="section-deep technology-section">
    <div className="tech-bg-lines"></div>
    <div className="container">
    <div className="section-kicker section-kicker-dark reveal"><span>03</span><i></i><b>TECHNOLOGY & RESEARCH</b></div>
    <div className="tech-head-row">
    <div className="section-head reveal">
    <span className="mini-label">THE CODEX PIPELINE</span>
    <h2>From digital signal<br />to <em>living chemistry.</em></h2>
    <p>Every file that enters the Codex platform moves through the same four stages — encode, synthesize, store, retrieve.</p>
    </div>
    <div className="decode-card tilt-card reveal">
    <div className="decode-label"><span><i className="live-dot"></i>LIVE TRANSCODE</span><span id="decode-clock">5′ → 3′</span></div>
    <div className="decode-row"><span className="tag">strand</span><span id="decode-seq"></span></div>
    <div className="decode-row"><span className="tag">binary</span><span id="decode-bin"></span></div>
    <div className="decode-row"><span className="tag">output</span><span id="decode-out"></span></div>
    <div className="decode-footer"><span>CHECKSUM</span><b>VERIFIED</b></div>
    </div>
    </div>
    <div className="pipeline-wrap reveal">
    <div className="pipeline-line"><span id="pipeline-fill"></span></div>
    <div className="pipeline-steps">
    <article className="pipeline-step active-step" tabIndex="0" role="button" data-detail-type="pipeline" data-detail-index="01" data-detail-label="ENCODE / ATG · START" data-detail-title="Encode" data-detail-description="A digital file is translated into a resilient nucleotide sequence before synthesis begins." data-detail-points="Binary-to-base mapping|Redundancy for error correction|Checksum generation"><div className="step-index">01</div><span className="codon">ATG · START</span><h3>Encode</h3><p>A proprietary codec maps your binary file onto a nucleotide sequence, with built-in redundancy so no single error can corrupt the record.</p></article>
    <article className="pipeline-step" tabIndex="0" role="button" data-detail-type="pipeline" data-detail-index="02" data-detail-label="SYNTHESIZE / ELONGATION" data-detail-title="Synthesize" data-detail-description="The encoded sequence is prepared as physical DNA strands using a controlled synthesis workflow." data-detail-points="Sequence preparation|Chemical synthesis|Molecular verification"><div className="step-index">02</div><span className="codon">ELONGATION</span><h3>Synthesize</h3><p>The sequence is chemically synthesized into physical strands of DNA — your file, now a molecule.</p></article>
    <article className="pipeline-step" tabIndex="0" role="button" data-detail-type="pipeline" data-detail-index="03" data-detail-label="STORE / MOLECULAR VAULT" data-detail-title="Store" data-detail-description="DNA strands are protected in stable, controlled storage environments designed for long-term preservation." data-detail-points="Inert encapsulation|Controlled storage|Redundant custody"><div className="step-index">03</div><span className="codon">ELONGATION</span><h3>Store</h3><p>Strands are encapsulated in inert silica and held in climate-controlled vaults, stable at room temperature for millennia.</p></article>
    <article className="pipeline-step" tabIndex="0" role="button" data-detail-type="pipeline" data-detail-index="04" data-detail-label="RETRIEVE / TAA · STOP" data-detail-title="Retrieve" data-detail-description="Stored strands are sequenced and decoded back into the original digital record with verification." data-detail-points="Sequencing|Error correction|Checksum verification"><div className="step-index">04</div><span className="codon">TAA · STOP</span><h3>Retrieve</h3><p>On request, strands are sequenced and decoded back to the original file — verified bit-for-bit against the original checksum.</p></article>
    </div>
    </div>
    <div className="research-marquee" aria-hidden="true"><div>MOLECULAR MEMORY <span>•</span> ERROR CORRECTION <span>•</span> SYNTHETIC BIOLOGY <span>•</span> LONG-TERM ARCHIVE <span>•</span> MOLECULAR MEMORY <span>•</span></div></div>
    </div>
    </section>
  );
}

function CapabilitiesSection() {
  return (
    <section id="capabilities" className="section-light capabilities-section">
    <div className="container">
    <div className="section-kicker reveal"><span>04</span><i></i><b>CAPABILITIES</b></div>
    <div className="section-head split-head reveal"><div><span className="mini-label">WHERE IT FITS</span><h2>Built for archives<br />that <em>can't be wrong.</em></h2></div><p>From single research datasets to institutional cold storage, the platform scales to what you're protecting.</p></div>
    <div className="cap-grid">
    <article className="cap-card tilt-card-sm reveal" tabIndex="0" role="button" data-detail-type="capability" data-detail-index="01" data-detail-label="ENTERPRISE ARCHIVE" data-detail-title="Enterprise Archive" data-detail-description="Bulk ingestion pipelines for regulated industries that need decades-long, audit-ready retention." data-detail-points="Long-term dataset ingestion|Redundant archival workflows|Audit-ready chain of custody"><div className="cap-top"><span>01</span><i className="cap-icon icon-archive"></i></div><div className="cap-chip"></div><h3>Enterprise Archive</h3><p>Bulk ingestion pipelines for regulated industries that need decades-long, audit-ready retention.</p><span className="cap-open">Explore use case <b>↗</b></span></article>
    <article className="cap-card tilt-card-sm reveal" tabIndex="0" role="button" data-detail-type="capability" data-detail-index="02" data-detail-label="RESEARCH PARTNERSHIPS" data-detail-title="Research Partnerships" data-detail-description="Joint work with genomics and materials labs pushing synthesis speed and density further." data-detail-points="Experimental storage workflows|Synthesis research|Density optimization"><div className="cap-top"><span>02</span><i className="cap-icon icon-research"></i></div><div className="cap-chip"></div><h3>Research Partnerships</h3><p>Joint work with genomics and materials labs pushing synthesis speed and density further.</p><span className="cap-open">Explore use case <b>↗</b></span></article>
    <article className="cap-card tilt-card-sm reveal" tabIndex="0" role="button" data-detail-type="capability" data-detail-index="03" data-detail-label="SECURE VAULT CUSTODY" data-detail-title="Secure Vault Custody" data-detail-description="Physically isolated, redundant cold-storage facilities with chain-of-custody on every strand." data-detail-points="Isolated storage environments|Redundant physical custody|Strand-level traceability"><div className="cap-top"><span>03</span><i className="cap-icon icon-vault"></i></div><div className="cap-chip"></div><h3>Secure Vault Custody</h3><p>Physically isolated, redundant cold-storage facilities with chain-of-custody on every strand.</p><span className="cap-open">Explore use case <b>↗</b></span></article>
    <article className="cap-card tilt-card-sm reveal" tabIndex="0" role="button" data-detail-type="capability" data-detail-index="04" data-detail-label="DEVELOPER API" data-detail-title="Developer API" data-detail-description="Programmatic encode, submit, and retrieve endpoints for teams building on top of the archive." data-detail-points="Programmatic encode endpoints|Archive submission workflows|Verified retrieval"><div className="cap-top"><span>04</span><i className="cap-icon icon-api"></i></div><div className="cap-chip"></div><h3>Developer API</h3><p>Programmatic encode, submit, and retrieve endpoints for teams building on top of the archive.</p><span className="cap-open">Explore use case <b>↗</b></span></article>
    </div>
    </div>
    </section>
  );
}

function ImpactSection() {
  return (
    <section id="impact" className="section-dark impact-section">
    <div className="impact-radial"></div>
    <div className="container">
    <div className="section-kicker section-kicker-dark reveal"><span>05</span><i></i><b>STATISTICS & IMPACT</b></div>
    <div className="impact-head reveal">
    <div className="impact-visual" aria-hidden="true">
    <div className="orbit orbit-a"></div><div className="orbit orbit-b"></div><div className="orbit orbit-c"></div>
    <div className="molecule-core"><span></span><span></span><span></span><span></span><i></i></div>
    <div className="impact-signal signal-one">BASE PAIR / A·T</div>
    <div className="impact-signal signal-two">DENSITY / 215 PB</div>
    </div>
    <div className="impact-copy">
    <span className="mini-label">THE MOLECULAR ADVANTAGE</span>
    <h2>Small molecule.<br /><em>Massive horizon.</em></h2>
    <p>Illustrative benchmarks for the medium itself — showing why biology is an intriguing direction for long-term storage.</p>
    </div>
    </div>
    <div className="stats-grid">
    <article className="stat reveal" style={{"--accent": "#73ff9a"}}><div className="stat-top"><span>01</span><i></i></div><div className="stat-num"><span className="counter" data-target="215" data-suffix=" PB">0</span></div><div className="stat-label">Theoretical density, per gram of DNA</div></article>
    <article className="stat reveal" style={{"--accent": "#5ac8ff"}}><div className="stat-top"><span>02</span><i></i></div><div className="stat-num"><span className="counter" data-target="10000" data-suffix="+ yrs">0</span></div><div className="stat-label">Potential stability in cold, dark storage</div></article>
    <article className="stat reveal" style={{"--accent": "#caa8ff"}}><div className="stat-top"><span>03</span><i></i></div><div className="stat-num"><span className="counter" data-target="1000" data-suffix="×">0</span></div><div className="stat-label">Illustrative energy advantage at archive scale</div></article>
    <article className="stat reveal" style={{"--accent": "#ff6b7d"}}><div className="stat-top"><span>04</span><i></i></div><div className="stat-num"><span className="counter" data-target="0" data-suffix="">0</span></div><div className="stat-label">Refresh cycles in the idealized archival model</div></article>
    </div>
    <div className="impact-note reveal"><span>NOTE</span><p>Figures are illustrative/theoretical and are included to communicate the storage concept, not as verified product performance claims.</p></div>
    </div>
    </section>
  );
}

function FinalSection() {
  return (
    <section id="final" className="final-cta section-light">
    <div className="final-dna-art"><div className="final-dna-line"></div><div className="final-dna-line line-2"></div></div>
    <div className="container final-container">
    <div className="section-kicker reveal"><span>06</span><i></i><b>GET STARTED</b></div>
    <div className="final-layout">
    <div className="reveal"><span className="mini-label">THE NEXT STORAGE LAYER</span><h2>Ready to write<br />the next chapter<br />of your <em>data?</em></h2></div>
    <div className="final-copy reveal"><p>Talk to our team about archiving your first dataset, or explore the developer API in a sandbox environment.</p><div className="final-actions"><a href="#" className="btn btn-dark magnetic">Talk to our team <span>↗</span></a><a href="#" className="text-link dark-link magnetic">Read the API docs <span>→</span></a></div></div>
    </div>
    </div>
    </section>
  );
}

function MainContent() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <MolecularStorySection />
      <TechnologySection />
      <CapabilitiesSection />
      <ImpactSection />
      <FinalSection />
    </main>
  );
}

function SiteFooter() {
  return (
    <footer className="footer-dark">
    <div className="container">
    <div className="footer-main"><a href="#hero" className="logo"><span className="logo-mark"><i></i><i></i><i></i><i></i><b></b></span><span>CODEX</span><small>BIOSCIENCES</small></a><div className="footer-tag">MOLECULAR MEMORY<br />FOR THE LONG FUTURE.</div></div>
    <div className="footer-bottom"><div>© 2026 Codex Biosciences. A fictional company built for a frontend design exercise.</div><div><a href="#about">About</a><a href="#technology">Technology</a><a href="#final">Contact</a></div></div>
    </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    return initSiteAnimations();
  }, []);

  return (
    <>
      <IntroOverlay />
      <DetailModal />
      <GlobalChrome />
      <SiteHeader />
      <MainContent />
      <SiteFooter />
    </>
  );
}