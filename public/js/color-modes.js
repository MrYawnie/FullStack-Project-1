/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  'use strict'

  const getStoredTheme = () => localStorage.getItem('theme')
  const setStoredTheme = theme => localStorage.setItem('theme', theme)

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme) {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const setTheme = theme => {
    if (theme === 'auto') {
      document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
    updateButtonCheckState(theme);
  }

  const updateButtonCheckState = (theme) => {
    const sunBtn = document.getElementById('light-theme');
    const moonBtn = document.getElementById('dark-theme');
    if (theme === 'dark' || document.documentElement.getAttribute('data-bs-theme') === 'dark') {
      moonBtn.checked = true;
      sunBtn.checked = false;
    } else {
      sunBtn.checked = true;
      moonBtn.checked = false;
    }
  }

  setTheme(getPreferredTheme())

  /*  const showActiveTheme = (theme, focus = false) => {
     const themeSwitcher = document.querySelector('#bd-theme')
 
     if (!themeSwitcher) {
       return
     }
 
     const themeSwitcherText = document.querySelector('#bd-theme-text')
     const activeThemeIcon = document.querySelector('.theme-icon-active use')
     const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
     const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')
 
     document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
       element.classList.remove('active')
       element.setAttribute('aria-pressed', 'false')
     })
 
     btnToActive.classList.add('active')
     btnToActive.setAttribute('aria-pressed', 'true')
     activeThemeIcon.setAttribute('href', svgOfActiveBtn)
     const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`
     themeSwitcher.setAttribute('aria-label', themeSwitcherLabel)
 
     if (focus) {
       themeSwitcher.focus()
     }
   } */

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme()
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  // Theme switch buttons (sun/moon) listeners
  document.getElementById('light-theme').addEventListener('click', () => {
    setStoredTheme('light');
    setTheme('light');
  });

  document.getElementById('dark-theme').addEventListener('click', () => {
    setStoredTheme('dark');
    setTheme('dark');
  });

  window.addEventListener('DOMContentLoaded', () => {
    updateButtonCheckState(getPreferredTheme());
  })
})();
