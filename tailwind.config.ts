import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      'xs': '420px',
      'sm': '640px',
      'md': '810px',
      'lg': '1024px',
      'xl': '1199px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        // ── Framer Design Tokens from DESIGN.md ────────────────────────
        canvas:          '#090909', // Dominant artboard background
        'surface-1':     '#141414', // Primary card surface & secondary button
        'surface-2':     '#1c1c1c', // Featured card surface & active tabs
        hairline:        '#262626', // 1px borders
        'hairline-soft': '#1a1a1a', // Soft rule lines
        primary:         '#ffffff', // Pure white (primary CTA & display type)
        'on-primary':    '#000000', // Black text on white pill
        'accent-blue':   '#0099ff', // Single chromatic accent for links & focus
        ink:             '#ffffff', // Headline type
        'ink-muted':     '#999999', // Secondary type (gray)
        
        // ── Atmosphere Spotlights (Scattered showcase tiles) ──────────
        'spotlight-magenta': '#d44df0',
        'spotlight-violet':  '#6a4cf5',
        'spotlight-orange':  '#ff7a3d',
        'spotlight-coral':   '#ff5577',
        
        // ── Semantic ──────────────────────────────────────────────────
        'semantic-success':  '#22c55e',
      },

      fontFamily: {
        display: [
          '"GT Walsheim Medium"',
          '"Mona Sans"',
          '"Inter Variable"',
          '"Inter"',
          '-apple-system',
          'system-ui',
          'sans-serif',
        ],
        sans: [
          '"Inter Variable"',
          '"Inter"',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          '"SF Mono"',
          'ui-monospace',
          'monospace',
        ],
      },

      fontSize: {
        // Framer type scale from DESIGN.md
        'display-xxl': ['110px', { lineHeight: '0.85', letterSpacing: '-5.5px', fontWeight: '500' }],
        'display-xl':  ['85px',  { lineHeight: '0.95', letterSpacing: '-4.25px', fontWeight: '500' }],
        'display-lg':  ['62px',  { lineHeight: '1.00', letterSpacing: '-3.1px', fontWeight: '500' }],
        'display-md':  ['32px',  { lineHeight: '1.13', letterSpacing: '-1.0px', fontWeight: '500' }],
        'headline':    ['22px',  { lineHeight: '1.20', letterSpacing: '-0.8px', fontWeight: '700' }],
        'subhead':     ['24px',  { lineHeight: '1.30', letterSpacing: '-0.01px', fontWeight: '400' }],
        'body-lg':     ['18px',  { lineHeight: '1.30', letterSpacing: '-0.18px', fontWeight: '400' }],
        'body':        ['15px',  { lineHeight: '1.30', letterSpacing: '-0.15px', fontWeight: '400' }],
        'body-sm':     ['14px',  { lineHeight: '1.40', letterSpacing: '-0.14px', fontWeight: '500' }],
        'caption':     ['13px',  { lineHeight: '1.20', letterSpacing: '-0.13px', fontWeight: '500' }],
        'micro':       ['12px',  { lineHeight: '1.20', letterSpacing: '-0.12px', fontWeight: '400' }],
        'btn':         ['14px',  { lineHeight: '1.00', letterSpacing: '-0.14px', fontWeight: '500' }],
      },

      spacing: {
        // Framer 5px-based scale
        'hair':    '1px',
        'xxs':     '4px',
        'xs':      '8px',
        'sm':      '12px',
        'md':      '15px',
        'lg':      '20px',
        'xl':      '30px',
        'xxl':     '40px',
        'section': '96px',
      },

      borderRadius: {
        // Framer radius scale
        'xs':   '4px',
        'sm':   '6px',
        'md':   '10px',
        'lg':   '15px',
        'xl':   '20px',
        'xxl':  '30px',
        'pill': '100px',
        'full': '9999px',
      },

      boxShadow: {
        // Framer elevation levels
        'charcoal':   '0 1px 0 rgba(255, 255, 255, 0.05)',
        'light-edge': 'inset 0 0.5px 0 rgba(255, 255, 255, 0.12), 0 10px 30px rgba(0, 0, 0, 0.35)',
        'focus-ring': '0 0 0 1px rgba(0, 153, 255, 0.25), 0 0 0 4px rgba(0, 153, 255, 0.1)',
      },

      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
