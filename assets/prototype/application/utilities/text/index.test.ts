import { lcFirst, ucFirst } from './index';

describe('ucFirst', () => {
	test('should uppercase first letter of a string', () => {
		expect(ucFirst('test')).toBe('Test');
	});

	test(`if string is already capitalized it shouldn't change anything`, () => {
		expect(ucFirst('Test')).toBe('Test');
	});

	test(`shouldn't do anything if we pass a number as a string`, () => {
		expect(ucFirst('123')).toBe('123');
	});

	test(`shouldn't do anything if we pass null`, () => {
		expect(ucFirst(null)).toBe(undefined);
	});

	test(`shouldn't do anything if we pass undefined`, () => {
		expect(ucFirst(undefined)).toBe(undefined);
	});
});
