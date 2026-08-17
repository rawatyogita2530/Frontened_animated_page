import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

gsap.registerPlugin(ScrollTrigger);

const CODONS = [
  'ATG', 'GCT', 'AAC', 'CGT', 'TAC',
  'GGA', 'CTA', 'AGC', 'TTC', 'GCA',
  'AAT', 'CGG', 'TGA', 'CCT', 'GAT',
  'ACG', 'TTA', 'GCC', 'GTA', 'CAC'
];

const DECODE_WORDS = ['ARCHIVE', 'GENOME', 'MEMORY', 'SIGNAL', 'DATA', 'RECALL'];
const DNA_BASES = ['A', 'T', 'C', 'G'];

export function initSiteAnimations() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const cleanups = [];
  const timers = [];

  const addCleanup = (cleanup) => cleanups.push(cleanup);

  initIntro(timers, reducedMotion);
  initModal(addCleanup);
  initNavigation(addCleanup);
  initCursor(addCleanup, reducedMotion, finePointer);
  initMagneticButtons(addCleanup, reducedMotion);
  initTiltCards(addCleanup, reducedMotion, finePointer);
  initSequenceMarquee();
  initScrollAnimations(reducedMotion);
  initDecodeAnimation(timers);
  initHelix3D(addCleanup, reducedMotion, finePointer);
  initCounters();
  initMolecularStory(addCleanup, reducedMotion, finePointer);
  initSectionNavigation();

  return () => {
    timers.forEach((timer) => {
      window.clearTimeout(timer);
      window.clearInterval(timer);
    });

    cleanups.forEach((cleanup) => cleanup());
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
}

function initIntro(timers, reducedMotion) {
  const intro = document.getElementById('intro-screen');

  if (!intro) return;

  const delay = reducedMotion ? 500 : 2500;

  const timer = window.setTimeout(() => {
    intro.classList.add('is-complete');
    intro.setAttribute('aria-hidden', 'true');
  }, delay);

  timers.push(timer);
}

function initModal(addCleanup) {
  const modal = document.getElementById('detail-modal');
  const detailIndex = document.getElementById('detail-index');
  const detailLabel = document.getElementById('detail-label');
  const detailTitle = document.getElementById('detail-title');
  const detailDescription = document.getElementById('detail-description');
  const detailPoints = document.getElementById('detail-points');
  const detailIcon = document.getElementById('detail-icon');

  if (!modal) return;

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  const openModal = (item) => {
    const points = (item.dataset.detailPoints || '')
      .split('|')
      .filter(Boolean);

    const index = item.dataset.detailIndex || '01';
    const type = item.dataset.detailType || 'detail';

    detailIndex.textContent = `${index} / ${type.toUpperCase()}`;
    detailLabel.textContent = item.dataset.detailLabel || '';
    detailTitle.textContent = item.dataset.detailTitle || '';
    detailDescription.textContent = item.dataset.detailDescription || '';
    detailIcon.className = `detail-icon detail-icon-${index}`;

    detailPoints.innerHTML = points
      .map(
        (point, pointIndex) => `
          <div class="detail-point">
            <span>0${pointIndex + 1}</span>
            <strong>${point}</strong>
          </div>
        `
      )
      .join('');

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  };

  const detailItems = document.querySelectorAll('[data-detail-title]');
  const closeButtons = document.querySelectorAll('[data-modal-close]');

  detailItems.forEach((item) => {
    const handleClick = () => openModal(item);
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openModal(item);
      }
    };

    item.addEventListener('click', handleClick);
    item.addEventListener('keydown', handleKeyDown);

    addCleanup(() => {
      item.removeEventListener('click', handleClick);
      item.removeEventListener('keydown', handleKeyDown);
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener('click', closeModal);

    addCleanup(() => {
      button.removeEventListener('click', closeModal);
    });
  });

  const handleEscape = (event) => {
    if (event.key === 'Escape') closeModal();
  };

  document.addEventListener('keydown', handleEscape);

  addCleanup(() => {
    document.removeEventListener('keydown', handleEscape);
  });
}

function initNavigation(addCleanup) {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const header = document.getElementById('site-header');
  const progress = document.getElementById('page-progress');

  if (menuToggle && mobileMenu) {
    const toggleMenu = () => mobileMenu.classList.toggle('open');

    menuToggle.addEventListener('click', toggleMenu);

    addCleanup(() => {
      menuToggle.removeEventListener('click', toggleMenu);
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      const closeMenu = () => mobileMenu.classList.remove('open');
      link.addEventListener('click', closeMenu);

      addCleanup(() => {
        link.removeEventListener('click', closeMenu);
      });
    });
  }

  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      if (progress) {
        progress.style.transform = `scaleX(${self.progress})`;
      }
    }
  });

  ScrollTrigger.create({
    start: 30,
    end: 'max',
    onUpdate: (self) => {
      header?.classList.toggle('scrolled', self.scroll() > 30);
    }
  });
}

function initCursor(addCleanup, reducedMotion, finePointer) {
  if (!finePointer || reducedMotion) return;

  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (!dot || !ring) return;

  const moveCursor = (event) => {
    gsap.to(dot, {
      x: event.clientX - 3.5,
      y: event.clientY - 3.5,
      duration: 0.08
    });

    gsap.to(ring, {
      x: event.clientX - 17,
      y: event.clientY - 17,
      duration: 0.25
    });

    dot.style.opacity = '1';
    ring.style.opacity = '0.65';
  };

  window.addEventListener('pointermove', moveCursor);

  addCleanup(() => {
    window.removeEventListener('pointermove', moveCursor);
  });

  document.querySelectorAll('a, button, .tilt-card, .tilt-card-sm').forEach((element) => {
    const enter = () => gsap.to(ring, { scale: 1.45, duration: 0.2 });
    const leave = () => gsap.to(ring, { scale: 1, duration: 0.2 });

    element.addEventListener('pointerenter', enter);
    element.addEventListener('pointerleave', leave);

    addCleanup(() => {
      element.removeEventListener('pointerenter', enter);
      element.removeEventListener('pointerleave', leave);
    });
  });
}

function initMagneticButtons(addCleanup, reducedMotion) {
  document.querySelectorAll('.magnetic').forEach((button) => {
    const move = (event) => {
      if (reducedMotion) return;

      const bounds = button.getBoundingClientRect();
      const x = (event.clientX - bounds.left - bounds.width / 2) * 0.12;
      const y = (event.clientY - bounds.top - bounds.height / 2) * 0.12;

      gsap.to(button, {
        x,
        y,
        duration: 0.25,
        ease: 'power2.out'
      });
    };

    const leave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.35,
        ease: 'elastic.out(1, .5)'
      });
    };

    button.addEventListener('pointermove', move);
    button.addEventListener('pointerleave', leave);

    addCleanup(() => {
      button.removeEventListener('pointermove', move);
      button.removeEventListener('pointerleave', leave);
    });
  });
}

function initTiltCards(addCleanup, reducedMotion, finePointer) {
  if (!finePointer || reducedMotion) return;

  document.querySelectorAll('.tilt-card, .tilt-card-sm').forEach((card) => {
    const move = (event) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      const amount = card.classList.contains('tilt-card') ? 6 : 4;

      gsap.to(card, {
        rotationY: x * amount,
        rotationX: -y * amount,
        y: card.classList.contains('tilt-card') ? 0 : -4,
        duration: 0.25,
        transformPerspective: 900,
        ease: 'power2.out'
      });
    };

    const leave = () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        y: 0,
        duration: 0.5,
        ease: 'power3.out'
      });
    };

    card.addEventListener('pointermove', move);
    card.addEventListener('pointerleave', leave);

    addCleanup(() => {
      card.removeEventListener('pointermove', move);
      card.removeEventListener('pointerleave', leave);
    });
  });
}

function initSequenceMarquee() {
  const marquee = document.getElementById('marquee');
  if (!marquee) return;

  const renderSequence = (offset) => CODONS
    .map((codon, index) => {
      const bases = codon
        .split('')
        .map((base) => `<span class="base-${base}">${base}</span>`)
        .join('');

      return `
        <span class="sequence-unit">
          <span class="index">${String(index + 1 + offset).padStart(2, '0')}</span>
          <span class="codon">${bases}</span>
        </span>
      `;
    })
    .join('');

  marquee.innerHTML = renderSequence(0) + renderSequence(CODONS.length);
}

function initScrollAnimations(reducedMotion) {
  document.querySelectorAll('.reveal').forEach((element) => {
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 88%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  document.querySelectorAll('.reveal-fast').forEach((element) => {
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: 'power2.out',
      delay: 0.1
    });
  });

  document.querySelectorAll('.cap-card').forEach((card, index) => {
    gsap.fromTo(
      card,
      { y: 35, opacity: 0.72 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none restart'
        }
      }
    );
  });

  const impactVisual = document.querySelector('.impact-visual');

  if (impactVisual && !reducedMotion) {
    gsap.to(impactVisual, {
      y: -18,
      rotation: 2,
      ease: 'none',
      scrollTrigger: {
        trigger: '#impact',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2
      }
    });
  }

  document.querySelectorAll('.density-bar-fill').forEach((bar, index) => {
    const row = bar.closest('.density-row');
    if (!row) return;

    const width = `${bar.dataset.width}%`;
    bar.style.width = width;

    if (reducedMotion) {
      row.classList.add('is-revealed');
      return;
    }

    gsap.fromTo(
      bar,
      { width: '0%' },
      {
        width,
        duration: 1.25,
        delay: index * 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: row,
          start: 'top 84%',
          toggleActions: 'play none none restart'
        },
        onStart: () => row.classList.add('is-revealed')
      }
    );
  });

  const pipeline = document.querySelector('.pipeline-wrap');
  const pipelineFill = document.getElementById('pipeline-fill');

  if (pipeline && pipelineFill) {
    gsap.fromTo(
      pipelineFill,
      { width: '0%' },
      {
        width: '100%',
        duration: 2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: pipeline,
          start: 'top 78%',
          toggleActions: 'play none none restart'
        }
      }
    );
  }

  document.querySelectorAll('.pipeline-step').forEach((step, index) => {
    ScrollTrigger.create({
      trigger: step,
      start: 'top 75%',
      end: 'bottom 25%',
      onEnter: () => step.classList.add('is-active'),
      onEnterBack: () => step.classList.add('is-active'),
      onLeave: () => step.classList.remove('is-active'),
      onLeaveBack: () => step.classList.remove('is-active')
    });

    gsap.fromTo(
      step,
      { opacity: 1, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: step,
          start: 'top 85%',
          toggleActions: 'play none none restart'
        }
      }
    );
  });

  document.querySelectorAll('.pipeline-step').forEach((step) => {
    const activate = () => {
      document.querySelectorAll('.pipeline-step').forEach((item) => item.classList.remove('is-active'));
      step.classList.add('is-active');
    };

    step.addEventListener('mouseenter', activate);
    step.addEventListener('focus', activate);
    step.addEventListener('click', activate);
  });

  gsap.from('.hero h1', {
    opacity: 0,
    y: 40,
    duration: 1.15,
    delay: 0.25,
    ease: 'power4.out'
  });

  gsap.from('.hero .lede', {
    opacity: 0,
    y: 22,
    duration: 0.8,
    delay: 0.48
  });

  gsap.from('.hero-actions', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.62
  });

  gsap.from('.hero-metrics', {
    opacity: 0,
    y: 18,
    duration: 0.8,
    delay: 0.76
  });

  gsap.from('.hero-visual', {
    opacity: 0,
    scale: 0.94,
    duration: 1.25,
    delay: 0.2,
    ease: 'power3.out'
  });

  gsap.from('.sequence-strip', {
    opacity: 0,
    y: 15,
    duration: 0.7,
    delay: 0.9
  });
}

function initDecodeAnimation(timers) {
  const sequence = document.getElementById('decode-seq');
  const binary = document.getElementById('decode-bin');
  const output = document.getElementById('decode-out');

  if (!sequence || !binary || !output) return;

  let cycle = 0;

  const runCycle = () => {
    const word = DECODE_WORDS[cycle % DECODE_WORDS.length];
    cycle += 1;

    const sequenceValue = Array.from({ length: 22 }, () => {
      return DNA_BASES[Math.floor(Math.random() * DNA_BASES.length)];
    }).join('');

    const binaryValue = Array.from({ length: 32 }, () => {
      return Math.round(Math.random());
    }).join('');

    sequence.innerHTML = sequenceValue
      .split('')
      .map((base) => `<span class="base-${base}">${base}</span>`)
      .join('');

    binary.textContent = binaryValue;
    output.textContent = '';

    let index = 0;

    const typeTimer = window.setInterval(() => {
      index += 1;
      output.textContent = word.slice(0, index);

      if (index >= word.length) {
        window.clearInterval(typeTimer);
      }
    }, 55);

    timers.push(typeTimer);
  };

  runCycle();
  const interval = window.setInterval(runCycle, 4200);
  timers.push(interval);
}

function initHelix3D(addCleanup, reducedMotion, finePointer) {
  const wrapper = document.getElementById('helix3d-wrap');
  const canvas = document.getElementById('helix3d');

  if (!wrapper || !canvas) return;

  let renderer;

  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
  } catch {
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 13);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.05);
  keyLight.position.set(4, 7, 8);
  scene.add(keyLight);

  const greenLight = new THREE.PointLight(0x73ff9a, 2.4, 22);
  greenLight.position.set(-5, 2, 5);
  scene.add(greenLight);

  const violetLight = new THREE.PointLight(0xa57cff, 1.8, 20);
  violetLight.position.set(5, -4, -4);
  scene.add(violetLight);

  const group = new THREE.Group();
  scene.add(group);

  const colors = {
    A: 0x73ff9a,
    T: 0xff6b7d,
    C: 0x5ac8ff,
    G: 0xcaa8ff
  };

  const pairs = [
    ['A', 'T'],
    ['C', 'G'],
    ['G', 'C'],
    ['T', 'A']
  ];

  const rungs = 34;
  const turns = 2.6;
  const radius = 2.1;
  const spacing = 0.34;
  const totalHeight = rungs * spacing;

  const sphereGeometry = new THREE.SphereGeometry(0.13, 14, 14);
  const rungGeometry = new THREE.CylinderGeometry(0.035, 0.035, 1, 6);
  const materials = {};
  const rungMaterials = {};

  const materialFor = (color) => {
    if (!materials[color]) {
      materials[color] = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.22,
        metalness: 0.28
      });
    }

    return materials[color];
  };

  const rungMaterialFor = (color) => {
    if (!rungMaterials[color]) {
      rungMaterials[color] = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.52
      });
    }

    return rungMaterials[color];
  };

  for (let index = 0; index < rungs; index += 1) {
    const progress = index / rungs;
    const angle = progress * Math.PI * 2 * turns;
    const y = index * spacing - totalHeight / 2;
    const pair = pairs[index % pairs.length];

    const first = new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );

    const second = new THREE.Vector3(
      Math.cos(angle + Math.PI) * radius,
      y,
      Math.sin(angle + Math.PI) * radius
    );

    const firstSphere = new THREE.Mesh(
      sphereGeometry,
      materialFor(colors[pair[0]])
    );

    const secondSphere = new THREE.Mesh(
      sphereGeometry,
      materialFor(colors[pair[1]])
    );

    firstSphere.position.copy(first);
    secondSphere.position.copy(second);

    const rung = new THREE.Mesh(
      rungGeometry,
      rungMaterialFor(colors[pair[0]])
    );

    const midpoint = new THREE.Vector3()
      .addVectors(first, second)
      .multiplyScalar(0.5);

    rung.position.copy(midpoint);
    rung.scale.set(1, first.distanceTo(second), 1);
    rung.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3().subVectors(second, first).normalize()
    );

    group.add(firstSphere, secondSphere, rung);
  }

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.rotateSpeed = 0.45;
  controls.autoRotate = !reducedMotion;
  controls.autoRotateSpeed = 0.55;

  let targetX = 0;
  let targetY = 0;
  let rotationX = 0;
  let rotationY = 0;
  let scrollVelocity = 0;
  let lastScroll = window.scrollY;

  const pointerMove = (event) => {
    const bounds = wrapper.getBoundingClientRect();

    targetY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.55;
    targetX = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.35;
  };

  const pointerLeave = () => {
    targetX = 0;
    targetY = 0;
  };

  const handleScroll = () => {
    const currentScroll = window.scrollY;
    scrollVelocity += (currentScroll - lastScroll) * 0.003;
    lastScroll = currentScroll;
  };

  if (finePointer && !reducedMotion) {
    wrapper.addEventListener('pointermove', pointerMove);
    wrapper.addEventListener('pointerleave', pointerLeave);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
    onUpdate: (self) => {
      const progress = self.progress;
      const scale = 1 + Math.sin(progress * Math.PI) * 0.12;

      group.scale.setScalar(scale);
      camera.position.z = 13 - progress * 2.2;

      const visual = document.querySelector('.hero-visual');
      const explorer = document.querySelector('.hero-explore-layer');

      if (visual) {
        visual.style.transform = `translateY(${progress * -24}px)`;
      }

      if (explorer) {
        explorer.style.transform = `translateY(${progress * -42}px) scale(${1 + progress * 0.06})`;
      }
    }
  });

  const resize = () => {
    const width = wrapper.clientWidth;
    const height = wrapper.clientHeight;

    if (!width || !height) return;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  };

  resize();
  window.addEventListener('resize', resize);

  let frameId;

  const animate = (time) => {
    frameId = window.requestAnimationFrame(animate);

    if (!reducedMotion) {
      rotationX += (targetX - rotationX) * 0.05;
      rotationY += (targetY - rotationY) * 0.05;
      scrollVelocity *= 0.93;

      group.rotation.x = rotationX + scrollVelocity * 0.13;
      group.rotation.y = rotationY + scrollVelocity * 0.35 + time * 0.00006;
      group.rotation.z = Math.sin(time * 0.0003) * 0.025;
    }

    controls.update();
    renderer.render(scene, camera);
  };

  animate(0);

  addCleanup(() => {
    window.cancelAnimationFrame(frameId);
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', resize);

    if (finePointer && !reducedMotion) {
      wrapper.removeEventListener('pointermove', pointerMove);
      wrapper.removeEventListener('pointerleave', pointerLeave);
    }

    controls.dispose();
    renderer.dispose();
  });
}

function initCounters() {
  document.querySelectorAll('.counter').forEach((counter) => {
    const target = Number(counter.dataset.target);
    const suffix = counter.dataset.suffix || '';

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      onEnter: () => {
        const value = { current: 0 };

        gsap.to(value, {
          current: target,
          duration: 1.7,
          ease: 'power2.out',
          onUpdate: () => {
            counter.textContent = `${Math.round(value.current).toLocaleString()}${suffix}`;
          }
        });
      },
      onLeaveBack: () => {
        counter.textContent = '0';
      }
    });
  });
}

function initMolecularStory(addCleanup, reducedMotion, finePointer) {
  const story = document.getElementById('molecular-story');
  const storyVisual = document.querySelector('.story-visual');
  const storyCore = document.querySelector('.story-core');
  const storyLabel = document.querySelector('.story-stage-label');
  const storyCaption = document.getElementById('story-caption');
  const storySteps = [...document.querySelectorAll('.story-step')];

  if (!story || !storyVisual) return;

  if (!reducedMotion) {
    gsap.to(storyVisual, {
      yPercent: -12,
      rotation: 5,
      ease: 'none',
      scrollTrigger: {
        trigger: story,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2
      }
    });

    gsap.to('.story-ring.ring-a', {
      rotation: 360,
      ease: 'none',
      scrollTrigger: {
        trigger: story,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });

    gsap.to('.story-ring.ring-b', {
      rotation: -360,
      ease: 'none',
      scrollTrigger: {
        trigger: story,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.4
      }
    });

    gsap.to('.story-particle', {
      y: -90,
      stagger: 0.15,
      ease: 'none',
      scrollTrigger: {
        trigger: story,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.6
      }
    });
  }

  storySteps.forEach((step, index) => {
    const activate = () => {
      storySteps.forEach((item) => item.classList.remove('is-active'));
      step.classList.add('is-active');

      if (storyCaption) {
        storyCaption.textContent = step.dataset.caption || '';
      }

      if (storyLabel) {
        const labels = [
          '01 / DIGITAL SIGNAL',
          '02 / MOLECULAR CODE',
          '03 / PHYSICAL STRAND',
          '04 / ARCHIVE OBJECT'
        ];

        storyLabel.textContent = labels[index];
      }

      if (storyCore && !reducedMotion) {
        gsap.fromTo(
          storyCore,
          { scale: 0.7, opacity: 0.5 },
          {
            scale: 1.25,
            opacity: 1,
            duration: 0.55,
            ease: 'back.out(2)',
            yoyo: true,
            repeat: 1
          }
        );
      }
    };

    step.addEventListener('click', activate);
    step.addEventListener('focus', activate);

    addCleanup(() => {
      step.removeEventListener('click', activate);
      step.removeEventListener('focus', activate);
    });
  });

  if (finePointer && !reducedMotion) {
    const move = (event) => {
      const bounds = storyVisual.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      gsap.to(storyVisual, {
        rotationY: x * 10,
        rotationX: -y * 10,
        duration: 0.45,
        ease: 'power3.out'
      });
    };

    const leave = () => {
      gsap.to(storyVisual, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    };

    storyVisual.addEventListener('pointermove', move);
    storyVisual.addEventListener('pointerleave', leave);

    addCleanup(() => {
      storyVisual.removeEventListener('pointermove', move);
      storyVisual.removeEventListener('pointerleave', leave);
    });
  }
}

function initSectionNavigation() {
  document.querySelectorAll('main section[id]').forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 45%',
      end: 'bottom 45%',
      onEnter: () => activateSection(section.id),
      onEnterBack: () => activateSection(section.id)
    });
  });
}

function activateSection(id) {
  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
  });
}
