/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Roboto', 'system-ui', '-apple-system', 'sans-serif'],
        sans: ['Roboto', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        // Legacy palette (kept for backward compatibility)
        primary: {
          50: '#fff9ed',
          100: '#fdefd0',
          200: '#fbdb9e',
          300: '#f9c56b',
          400: '#f7b138',
          500: '#fca311',
          600: '#d68a00',
          700: '#9a6400',
          800: '#5c3d00',
          900: '#2e1e00',
        },
        prussian: {
          50: '#e8eaf0',
          100: '#c5cad9',
          200: '#9ea7bf',
          300: '#7783a5',
          400: '#4c5d82',
          500: '#14213d',
          600: '#101a30',
          700: '#0c1424',
          800: '#080e18',
          900: '#04070c',
        },
        dark: '#000000',
        alabaster: '#e5e5e5',

        // Material You (MD3) — Auto-switches light/dark via CSS custom properties
        md: {
          background: 'var(--md-background)',
          'on-background': 'var(--md-on-background)',
          primary: 'var(--md-primary)',
          'on-primary': 'var(--md-on-primary)',
          'primary-container': 'var(--md-primary-container)',
          'on-primary-container': 'var(--md-on-primary-container)',
          'secondary-container': 'var(--md-secondary-container)',
          'on-secondary-container': 'var(--md-on-secondary-container)',
          tertiary: 'var(--md-tertiary)',
          'on-tertiary': 'var(--md-on-tertiary)',
          'tertiary-container': 'var(--md-tertiary-container)',
          'on-tertiary-container': 'var(--md-on-tertiary-container)',
          'surface-container': 'var(--md-surface-container)',
          'surface-container-low': 'var(--md-surface-container-low)',
          'surface-dim': 'var(--md-surface-dim)',
          outline: 'var(--md-outline)',
          'on-surface-variant': 'var(--md-on-surface-variant)',
          'error': 'var(--md-error)',
          'on-error': 'var(--md-on-error)',
        },
      },
      // Keep MD3 static fallback colors accessible when CSS vars aren't needed
      mdStatic: {
        light: { background: '#FFFBFE', 'on-background': '#1C1B1F', primary: '#6750A4', 'on-primary': '#FFFFFF', 'primary-container': '#EADDFF', 'on-primary-container': '#21005D', 'secondary-container': '#E8DEF8', 'on-secondary-container': '#1D192B', tertiary: '#7D5260', 'on-tertiary': '#FFFFFF', 'tertiary-container': '#FFD8E4', 'on-tertiary-container': '#31111D', 'surface-container': '#F3EDF7', 'surface-container-low': '#E7E0EC', 'surface-dim': '#DED8E1', outline: '#79747E', 'on-surface-variant': '#49454F', error: '#B3261E', 'on-error': '#FFFFFF' },
        dark: { background: '#1C1B1F', 'on-background': '#E6E1E5', primary: '#D0BCFF', 'on-primary': '#381E72', 'primary-container': '#4F378B', 'on-primary-container': '#EADDFF', 'secondary-container': '#4A4458', 'on-secondary-container': '#E8DEF8', tertiary: '#EFB8C8', 'on-tertiary': '#492532', 'tertiary-container': '#633B48', 'on-tertiary-container': '#FFD8E4', 'surface-container': '#2B2930', 'surface-container-low': '#211F26', 'surface-dim': '#141218', outline: '#938F99', 'on-surface-variant': '#CAC4D0', error: '#F2B8B5', 'on-error': '#601410' },
      },
      borderRadius: {
        'md-xs': '8px',
        'md-sm': '12px',
        'md-md': '16px',
        'md-lg': '24px',
        'md-xl': '28px',
        'md-xxl': '32px',
        'md-3xl': '48px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shake': 'shake 0.5s ease-in-out',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient': 'gradient 8s ease infinite',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        // MD3 entrance
        'md-fade-in': 'mdFadeIn 0.3s cubic-bezier(0.2, 0, 0, 1)',
        'md-fade-up': 'mdFadeUp 0.4s cubic-bezier(0.2, 0, 0, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(252, 163, 17, 0.4), 0 0 20px rgba(252, 163, 17, 0.2)' },
          '100%': { boxShadow: '0 0 10px rgba(252, 163, 17, 0.7), 0 0 40px rgba(252, 163, 17, 0.4)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        // MD3 entrance
        mdFadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        mdFadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(252, 163, 17, 0.25)',
        'glow-lg': '0 0 40px rgba(252, 163, 17, 0.35)',
        'glow-primary': '0 0 20px rgba(252, 163, 17, 0.45)',
        'inner-glow': 'inset 0 0 20px rgba(252, 163, 17, 0.08)',
        // MD3 elevation shadows
        'md-sm': '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
        'md-md': '0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04)',
        'md-lg': '0 10px 25px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.04)',
        'md-xl': '0 20px 40px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.05)',
      },
      transitionTimingFunction: {
        'bounce-in-out': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'md-ease': 'cubic-bezier(0.2, 0, 0, 1)',
      },
    },
  },
  plugins: [],
}
