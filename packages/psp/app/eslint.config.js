import antfu from '@antfu/eslint-config'
import vueI18n from '@intlify/eslint-plugin-vue-i18n'

export default antfu({
  plugins: {
    'vue-i18n': vueI18n,
  },
  settings: {
    'vue-i18n': {
      localeDir: './src/locales/**/*.json',
      messageSyntaxVersion: '^11.0.0',
    },
  },
  rules: {
    'no-console': 'warn',
    'style/brace-style': ['warn', '1tbs'],
    'vue-i18n/no-missing-keys': 'warn',
    'vue-i18n/no-unused-keys': 'warn',
    'vue-i18n/no-dynamic-keys': 'warn',
  },
})

// export default [
//   eslint.configs.recommended,
//   ...pluginVue.configs['flat/recommended'],
//   ...vueI18n.configs.recommended,
//   {
//     rules: {
//       '@intlify/vue-i18n/no-missing-keys': 'warn',
//       '@intlify/vue-i18n/no-dynamic-keys': 'warn',
//       '@intlify/vue-i18n/no-unused-keys': 'warn',
//     },
//     settings: {
//       'vue-i18n': {
//         localeDir: './src/locales/**/*.json',
//         messageSyntaxVersion: '^11.0.0',
//       },
//     },
//   },
// ]
