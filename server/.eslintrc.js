module.exports = {
	extends: ['airbnb-base', 'plugin:prettier/recommended'],
	plugins: ['prettier'],
	rules: {
		'prettier/prettier': ['error', { endOfLine: 'auto' }],
		'no-underscore-dangle': [
			'error',
			{
				allow: ['_id'],
			},
		],
		'no-console': 'off',
		'consistent-return': 'off',
	},
}
