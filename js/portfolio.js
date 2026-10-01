/**
 * Krishnaditya Kancharla — Portfolio Interactivity
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const mobileBtn = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('primary-nav-links');

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Rotating Specialty Readout in Hero
  const specialtyEl = document.getElementById('hero-specialty-rotator');
  if (specialtyEl) {
    const specialties = [
      'Applied AI Architecture · Strategic Enterprise Engagements',
      'Generative AI & Foundation Model Systems',
      'End-to-End Machine Learning Pipelines at Scale',
      'Hyperscale Cloud Architecture · Google Cloud & AWS',
      'MLOps, Distributed Data Engineering & Site Reliability'
    ];
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % specialties.length;
      specialtyEl.style.opacity = '0';
      setTimeout(() => {
        specialtyEl.textContent = specialties[idx];
        specialtyEl.style.opacity = '1';
      }, 180);
    }, 3600);
  }

  // 3. Experience Timeline Filter
  const expFilterBtns = document.querySelectorAll('[data-exp-filter]');
  const expCards = document.querySelectorAll('[data-exp-category]');

  expFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-exp-filter');
      expFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      expCards.forEach((card) => {
        const cats = (card.getAttribute('data-exp-category') || '').split(' ');
        if (target === 'all' || cats.includes(target)) {
          card.removeAttribute('hidden');
        } else {
          card.setAttribute('hidden', 'true');
        }
      });
    });
  });

  // 4. Skills Category Filter
  const skillFilterBtns = document.querySelectorAll('[data-skill-filter]');
  const skillCards = document.querySelectorAll('[data-skill-category]');

  skillFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-skill-filter');
      skillFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      skillCards.forEach((card) => {
        const cat = card.getAttribute('data-skill-category');
        if (target === 'all' || cat === target) {
          card.removeAttribute('hidden');
        } else {
          card.setAttribute('hidden', 'true');
        }
      });
    });
  });

  // 5. Publication Abstract Toggle
  const abstractToggleBtn = document.getElementById('toggle-pub-abstract');
  const abstractBox = document.getElementById('pub-abstract-content');

  if (abstractToggleBtn && abstractBox) {
    abstractToggleBtn.addEventListener('click', () => {
      const isHidden = abstractBox.hasAttribute('hidden');
      if (isHidden) {
        abstractBox.removeAttribute('hidden');
        abstractToggleBtn.textContent = 'Hide Abstract';
      } else {
        abstractBox.setAttribute('hidden', 'true');
        abstractToggleBtn.textContent = 'Read Abstract';
      }
    });
  }

  // 6. Bucket List Filter (on Bucket List page or section)
  const bucketFilterBtns = document.querySelectorAll('[data-bucket-filter]');
  const bucketItems = document.querySelectorAll('[data-bucket-status]');

  bucketFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const status = btn.getAttribute('data-bucket-filter');
      bucketFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      bucketItems.forEach((item) => {
        const itemStatus = item.getAttribute('data-bucket-status');
        if (status === 'all' || itemStatus === status) {
          item.removeAttribute('hidden');
        } else {
          item.setAttribute('hidden', 'true');
        }
      });
    });
  });

  // 7. Copy Email & Toast Helper
  const toastEl = document.getElementById('copy-toast');
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('visible');
    setTimeout(() => {
      toastEl.classList.remove('visible');
    }, 2600);
  }

  document.querySelectorAll('[data-copy-email]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-copy-email') || 'krishnaditya4@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Copied ${email} to clipboard`);
        });
      } else {
        showToast(`Email: ${email}`);
      }
    });
  });

  // 8. Contact Form Mailto Composer
  const contactForm = document.getElementById('portfolio-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');

      const senderName = nameInput ? nameInput.value.trim() : '';
      const senderEmail = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      const subject = encodeURIComponent(
        `Portfolio Inquiry from ${senderName || 'Website Visitor'}`
      );
      const bodyLines = [
        message,
        '',
        '---',
        `From: ${senderName || 'N/A'}`,
        `Reply-To: ${senderEmail || 'N/A'}`
      ];
      const body = encodeURIComponent(bodyLines.join('\n'));
      window.location.href = `mailto:krishnaditya4@gmail.com?subject=${subject}&body=${body}`;
      showToast('Opening your email client...');
    });
  }

  // 9. Scroll-Spy for Section Navigation Links
  const sections = document.querySelectorAll('section[id]');
  const spyLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  if (sections.length > 0 && spyLinks.length > 0) {
    const onScroll = () => {
      const scrollPos = window.scrollY + 130;
      let currentId = '';
      sections.forEach((sec) => {
        if (scrollPos >= sec.offsetTop) {
          currentId = sec.getAttribute('id') || '';
        }
      });
      spyLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === `#${currentId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
});
