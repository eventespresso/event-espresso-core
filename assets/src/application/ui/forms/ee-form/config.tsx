import { EspressoFormProps } from './types';

export const formConfig: EspressoFormProps = {
	onSubmit: (values) => console.log(values),
	initialValues: {},
	validate: ({ password, account }) => {
		let errors = {};
		if (!password || password.length < 8) {
			errors = {
				...errors,
				password: 'Password must be at least 8 characters long.',
			};
		}
		if (account && account.username && !/^\w{8,20}$/.test(account.username)) {
			errors = {
				...errors,
				account: {
					username: 'Invalid Username',
				},
			};
		}
		return errors;
	},
	submitButton: {
		label: 'Save Changes',
	},
	resetButton: {
		label: 'Reset',
	},
	sections: [
		{
			name: 'account',
			title: 'Account',
			namespaceFields: true,
			fields: [
				{
					name: 'full_name',
					label: 'Full Name',
					fieldType: 'text',
				},
				{
					name: 'username',
					label: 'Username',
					fieldType: 'text',
					addonBefore: '@',
				},
				{
					name: 'email',
					label: 'Email',
					fieldType: 'text',
					htmlType: 'email',
				},
				{
					name: 'phone',
					label: 'Phone',
					fieldType: 'text',
				},
				{
					name: 'password',
					label: 'Password',
					fieldType: 'text',
					htmlType: 'email',
					desc: 'Please enter a strong password',
				},
			],
		},
		{
			name: 'billing',
			title: 'Billing Details',
			namespaceFields: true,
			fields: [
				{
					name: 'name',
					label: 'Name',
					fieldType: 'text',
				},
				{
					name: 'phone',
					label: 'Phone',
					fieldType: 'group',
					conditions: [
						{
							field: 'account.phone',
							compare: 'EMPTY',
						},
						{
							field: 'account.email',
							compare: 'NOT_EMPTY',
						},
					],
					subFields: [
						{
							name: 'code',
							label: 'Country',
							fieldType: 'select',
							options: [
								{
									label: 'US/Canada',
									value: '+1',
								},
								{
									label: 'India',
									value: '+91',
								},
							],
							initialValue: '+1',
							conditions: [
								{
									field: 'billing.phone.number',
									compare: 'CONTAINS',
									value: '76',
								},
								{
									field: 'billing.phone.number',
									compare: 'NOT_MATCHES',
									value: '86',
								},
							],
						},
						{
							name: 'number',
							label: 'Number',
							fieldType: 'text',
							pattern: '[0-9]{5,12}',
						},
					],
				},
				{
					name: 'address',
					label: 'Address',
					fieldType: 'group',
					repeatable: true,
					subFields: [
						{
							name: 'street',
							label: 'Street',
							fieldType: 'text',
						},
						{
							name: 'city',
							label: 'City',
							fieldType: 'text',
						},
						{
							name: 'state',
							label: 'State/Province',
							fieldType: 'select',
							options: [],
							conditions: [
								{
									field: 'billing.address[x].country',
									compare: 'MATCHES',
									value: 'us|in',
								},
							],
						},
						{
							name: 'zip',
							label: 'Zip/Postal code',
							fieldType: 'text',
							conditions: [
								{
									field: 'billing.address[x].city',
									compare: '=',
									value: 'London',
								},
								{
									field: 'misc.skills',
									compare: 'CONTAINS',
									value: 'react',
								},
								{
									field: 'price',
									compare: '>',
									value: '100',
								},
							],
						},
						{
							name: 'country',
							label: 'Country',
							fieldType: 'select',
							options: [
								{
									label: 'United States',
									value: 'us',
								},
								{
									label: 'Canada',
									value: 'ca',
								},
								{
									label: 'India',
									value: 'in',
								},
							],
							initialValue: 'ca',
						},
					],
				},
			],
		},
		{
			name: 'misc',
			title: 'Miscellaneous',
			namespaceFields: true,
			fields: [
				{
					name: 'skills',
					label: 'Skills',
					fieldType: 'text',
					repeatable: true,
				},
			],
		},
	],
	fields: [
		{
			name: 'full_name',
			label: 'Full Name',
			fieldType: 'text',
		},
		{
			name: 'username',
			label: 'Username',
			fieldType: 'text',
			addonBefore: '@',
		},
		{
			name: 'price',
			label: 'Price',
			fieldType: 'text',
			addonAfter: '$',
			htmlType: 'number',
		},
		{
			name: 'email',
			label: 'Email',
			fieldType: 'text',
			htmlType: 'email',
		},
		{
			name: 'password',
			label: 'Password',
			fieldType: 'text',
			htmlType: 'password',
			desc: 'Please enter a strong password',
		},
		{
			name: 'country',
			label: 'Country',
			fieldType: 'select',
			options: [
				{
					label: 'United States',
					value: 'us',
				},
				{
					label: 'Canada',
					value: 'ca',
				},
				{
					label: 'India',
					value: 'in',
				},
			],
			initialValue: 'ca',
		},
		{
			name: 'address',
			label: 'Address',
			fieldType: 'group',
			subFields: [
				{
					name: 'street',
					label: 'Street',
					fieldType: 'text',
				},
				{
					name: 'city',
					label: 'City',
					fieldType: 'text',
				},
				{
					name: 'state',
					label: 'State/Province',
					fieldType: 'select',
					options: [],
				},
				{
					name: 'zip',
					label: 'Zip/Postal code',
					fieldType: 'text',
				},
				{
					name: 'country',
					label: 'Country',
					fieldType: 'select',
					options: [
						{
							label: 'United States',
							value: 'us',
						},
						{
							label: 'Canada',
							value: 'ca',
						},
						{
							label: 'India',
							value: 'in',
						},
					],
					initialValue: 'ca',
				},
			],
		},
		{
			name: 'languages',
			label: 'Languages',
			fieldType: 'multicheck',
			options: [
				{
					label: 'English',
					value: 'en',
				},
				{
					label: 'French',
					value: 'fr',
				},
				{
					label: 'Spanish',
					value: 'es',
				},
				{
					label: 'Russian',
					value: 'ru',
				},
			],
			initialValue: ['en', 'es'],
		},
		{
			name: 'skills',
			label: 'Skills',
			fieldType: 'select',
			mode: 'multiple',
			options: [
				{
					label: 'Javascript',
					value: 'js',
				},
				{
					label: 'React',
					value: 'react',
				},
				{
					label: 'GraphQL',
					value: 'gql',
				},
				{
					label: 'Typescript',
					value: 'ts',
				},
				{
					label: 'PHP',
					value: 'php',
				},
			],
			initialValue: ['ts', 'react'],
		},
		{
			name: 'subscribe',
			label: 'Subscribe',
			fieldType: 'switch',
		},
		{
			name: 'bio',
			label: 'About',
			fieldType: 'textarea',
		},
	],
};
