import { EspressoFormProps } from './types';

export const formConfig: EspressoFormProps = {
	onSubmit: (values) => console.log(values),
	initialValues: {},
	layout: 'vertical',
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
		buttonText: 'Save Changes',
	},
	resetButton: {
		buttonText: 'Reset',
	},
	sections: [
		{
			name: 'account',
			title: 'Account',
			addSectionToFieldNames: true,
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
			],
		},
		{
			name: 'billing',
			title: 'Billing Details',
			addSectionToFieldNames: true,
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
					isRepeatable: true,
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
			addSectionToFieldNames: true,
			fields: [
				{
					name: 'skills',
					label: 'Skills',
					fieldType: 'text',
					isRepeatable: true,
				},
				{
					name: 'age',
					label: 'Age',
					fieldType: 'radio',
					options: [
						{
							label: 'Below 5',
							value: '5',
						},
						{
							label: 'Below 15',
							value: '15',
						},
						{
							label: 'Below 25',
							value: '25',
						},
						{
							label: 'Below 40',
							value: '40',
						},
						{
							label: 'Above 40',
							value: '40+',
						},
					],
				},
			],
		},
	],
	fields: [
		{
			name: 'price',
			label: 'Price',
			fieldType: 'text',
			addonAfter: '$',
			htmlType: 'number',
		},
		{
			name: 'password',
			label: 'Password',
			fieldType: 'text',
			htmlType: 'password',
			description: 'Please enter a strong password',
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
					optgroup: 'JS',
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
					],
				},
				{
					optgroup: 'PHP',
					options: [
						{
							label: 'PHP',
							value: 'php',
						},
						{
							label: 'Laravel',
							value: 'laravel',
						},
					],
				},
			],
			initialValue: ['ts', 'react'],
		},
		{
			name: 'subscribe',
			label: 'Subscribe',
			fieldType: 'switch',
			formItemProps: {
				labelCol: { span: 4 },
				wrapperCol: { span: 14 },
				labelAlign: 'left',
			},
		},
		{
			name: 'bio',
			label: 'About',
			fieldType: 'textarea',
		},
	],
};
