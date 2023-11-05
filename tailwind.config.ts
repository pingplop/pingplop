import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'

export default {
  content: ['web/**/*!(*.stories|*.spec).{ts,tsx}', 'web/index.html'],
  darkMode: ['class'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans Hebrew Variable', ...fontFamily.sans],
        mono: ['JetBrains Mono Variable', ...fontFamily.mono],
      },
      colors: {
        gray: colors.slate,
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
} satisfies Config
