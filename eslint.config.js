import neostandard from 'neostandard'

export default neostandard({
  ignores: ['node_modules', 'dist'],
  filesTs: ['**/*.ts', '**/*.tsx'],
  ts: true
})
