import neostandard from 'neostandard'

export default [
  ...neostandard(),
  {
    rules: {
      // Allow snake_case for database column names and query parameters
      camelcase: 'off', // Disable camelcase entirely for this project
      // Allow unused variables for placeholder/future implementation
      'no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^(holdingsRepo|Holding)$',
          argsIgnorePattern: '^_'
        }
      ],
      // Allow useless constructors (for placeholder and future implementation comments)
      'no-useless-constructor': 'off'
    }
  }
]
