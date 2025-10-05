import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'btn-base': 'px-4 py-2 rounded-lg font-medium transition-colors duration-200',
    'btn-primary': 'btn-base bg-primary text-white hover:bg-primary-dark',
    'btn-secondary': 'btn-base bg-secondary text-white hover:bg-secondary-dark',
    'card-base': 'bg-surface rounded-xl shadow-sm p-4 border border-border/20',
  },
  theme: {
    colors: {
      primary: {
        DEFAULT: '#2563eb',
        light: '#3b82f6',
        dark: '#1d4ed8',
      },
      secondary: {
        DEFAULT: '#9333ea',
        light: '#a855f7',
        dark: '#7e22ce',
      },
      success: {
        DEFAULT: '#16a34a',
        light: '#22c55e',
        dark: '#15803d',
      },
      warning: {
        DEFAULT: '#f59e0b',
        light: '#fbbf24',
        dark: '#b45309',
      },
      error: {
        DEFAULT: '#dc2626',
        light: '#ef4444',
        dark: '#b91c1c',
      },
      surface: {
        DEFAULT: '#1f2937',
        light: '#ffffff',
        dark: '#1f2937',
      },
      background: {
        DEFAULT: '#111827',
        light: '#f9fafb',
        dark: '#111827',
      },
      border: '#e5e7eb',
      muted: '#6b7280',
      text: {
        DEFAULT: '#f9fafb',
        light: '#374151',
        inverted: '#111827',
      },
    },
  },
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'Inter:400,500,600,700',
        mono: 'JetBrains Mono:400,600',
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
