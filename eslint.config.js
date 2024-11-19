import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import eslintConfigPrettier from 'eslint-config-prettier'
import prettier from 'eslint-plugin-prettier'

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintConfigPrettier,
  {
    plugins: { prettier: prettier },
    settings: {
      react: {
        version: 'detect', // Detecta automáticamente la versión de React
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // Desactiva la regla
      quotes: ['error', 'single'],
      semi: ['warn', 'never'],
      'prettier/prettier': ['warn', { endOfLine: 'auto' }],
    },
  },
  {
    ignores: ['node_modules', 'dist', 'build', 'bun.lockb'],
  },
]
