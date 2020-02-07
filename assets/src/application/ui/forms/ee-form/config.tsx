import { EspressoFormProps } from './types';

export const formConfig: EspressoFormProps = {
	onSubmit: (values) => console.log(values),
	initialValues: {},
	// validate: () => {},
	submitLabel: 'Save Changes',
	sections: [
		{
			id: 'account',
			title: 'Account',
			fields: [
				{
					id: 'full_name',
					label: 'Full Name',
					fieldType: 'text',
				},
				{
					id: 'username',
					label: 'Username',
					fieldType: 'text',
					before: '@',
				},
				{
					id: 'email',
					label: 'Email',
					fieldType: 'email',
				},
				{
					id: 'password',
					label: 'Password',
					fieldType: 'password',
					desc: 'Please enter a strong password',
				},
			],
		},
		{
			id: 'billing_details',
			title: 'Billing Details',
			fields: [
				{
					id: 'name',
					label: 'Name',
					fieldType: 'text',
				},
				{
					id: 'phone',
					label: 'Phone',
					fieldType: 'group',
					subFields: [
						{
							id: 'code',
							label: '',
							fieldType: 'select',
							options: [
								{
									label: 'United States',
									value: '+1',
								},
								{
									label: 'Canada',
									value: '+1',
								},
								{
									label: 'India',
									value: '+91',
								},
							],
							defaultValue: '+1',
						},
						{
							id: 'number',
							label: 'Number',
							fieldType: 'number',
						},
					],
				},
				{
					id: 'address',
					label: 'Address',
					fieldType: 'group',
					subFields: [
						{
							id: 'street',
							label: 'Street',
							fieldType: 'text',
						},
						{
							id: 'city',
							label: 'City',
							fieldType: 'text',
						},
						{
							id: 'state',
							label: 'State/Province',
							fieldType: 'select',
							options: [],
						},
						{
							id: 'zip',
							label: 'Zip/Postal code',
							fieldType: 'text',
						},
						{
							id: 'country',
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
							defaultValue: 'ca',
						},
					],
				},
			],
		},
		{
			id: 'misc',
			title: 'Miscellaneous',
			fields: [
				{
					id: 'skills',
					label: 'Skills',
					fieldType: 'text',
					repeatable: true,
				},
			],
		},
	],
	fields: [
		{
			id: 'full_name',
			label: 'Full Name',
			fieldType: 'text',
		},
		{
			id: 'username',
			label: 'Username',
			fieldType: 'text',
			addonBefore: '@',
		},
		{
			id: 'price',
			label: 'Price',
			fieldType: 'text',
			addonAfter: '$',
			htmlType: 'number',
		},
		{
			id: 'email',
			label: 'Email',
			fieldType: 'text',
			htmlType: 'email',
		},
		{
			id: 'phone',
			label: 'Phone',
			fieldType: 'text',
		},
		{
			id: 'password',
			label: 'Password',
			fieldType: 'text',
			htmlType: 'password',
			desc: 'Please enter a strong password',
		},
		{
			id: 'bio',
			label: 'About',
			fieldType: 'textarea',
		},
	],
};
