/**
 * Faith & Justice Associates and Consultants
 * Core JavaScript: Navigation, Language persistence, WhatsApp integration & Form handling
 */

(function () {
  'use strict';

  // 1. Dynamic Footer Year
  const yearEls = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearEls.forEach(el => {
    el.textContent = currentYear;
  });

  // 2. Mobile Navigation Toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      mainNav.classList.toggle('mobile-hidden');
      mainNav.classList.toggle('show');
    });

    // Close menu when clicking outside on mobile
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !mainNav.contains(e.target)) {
        if (mainNav.classList.contains('show')) {
          mainNav.classList.remove('show');
          mainNav.classList.add('mobile-hidden');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }

  // 3. Language Toggle (English / தமிழ்) with LocalStorage persistence
  const LANG_KEY = 'faith_justice_preferred_lang';
  const langToggle = document.getElementById('langToggle');

  function setLanguage(lang) {
    const isTamil = (lang === 'ta');
    document.querySelectorAll('.lang-en').forEach(el => {
      el.style.display = isTamil ? 'none' : '';
    });
    document.querySelectorAll('.lang-ta').forEach(el => {
      el.style.display = isTamil ? 'block' : 'none';
    });

    // Update buttons
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
      btn.textContent = isTamil ? 'English' : 'தமிழ்';
      btn.setAttribute('aria-label', isTamil ? 'Switch to English' : 'Switch to Tamil');
    });

    try {
      localStorage.setItem(LANG_KEY, isTamil ? 'ta' : 'en');
    } catch (e) {
      // LocalStorage not available or restricted
    }
  }

  // Initialize language from saved preference
  let currentLang = 'en';
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'ta') {
      currentLang = 'ta';
    }
  } catch (e) {}

  setLanguage(currentLang);

  if (langToggle) {
    langToggle.addEventListener('click', function (e) {
      e.preventDefault();
      currentLang = (currentLang === 'en') ? 'ta' : 'en';
      setLanguage(currentLang);
    });
  }

  // 4. WhatsApp Quick Contact Form Helper
  window.sendViaWhatsApp = function () {
    const nameEl = document.getElementById('name');
    const phoneEl = document.getElementById('phone');
    const emailEl = document.getElementById('email');
    const serviceEl = document.getElementById('service');
    const msgEl = document.getElementById('message');

    const name = nameEl ? nameEl.value.trim() : '';
    const phone = phoneEl ? phoneEl.value.trim() : '';
    const email = emailEl ? emailEl.value.trim() : '';
    const service = serviceEl ? serviceEl.value : 'General Inquiry';
    const message = msgEl ? msgEl.value.trim() : '';

    let text = `Hello Faith & Justice Associates and Consultants,\n\n`;
    text += `*Consultation Request:*\n`;
    if (name) text += `• Name: ${name}\n`;
    if (phone) text += `• Phone: ${phone}\n`;
    if (email) text += `• Email: ${email}\n`;
    if (service) text += `• Service: ${service}\n`;
    if (message) text += `• Details: ${message}\n`;

    const whatsappUrl = `https://wa.me/919444977327?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // 5. Contact Form Submission (Simulated + Feedback)
  window.handleFormSubmit = function (e) {
    e.preventDefault();
    const statusEl = document.getElementById('formStatus');
    if (!statusEl) return false;

    statusEl.innerHTML = '<span style="color:var(--accent);">Submitting your consultation request...</span>';

    setTimeout(() => {
      statusEl.innerHTML = `
        <div class="form-success">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          Thank you! Advocate Pushpa .T & team will contact you shortly at 9444977327 / email.
        </div>
      `;
      e.target.reset();
    }, 800);

    return false;
  };
})();
