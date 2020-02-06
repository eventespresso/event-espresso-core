import { lcFirst, ucFirst } from './index';

describe('lcFirst', () => {
	test('should lowercase first letter of a string', () => {
		expect(lcFirst('Test')).toBe('test');
	});

	test(`if first character is already lowered it shouldn't change anything`, () => {
		expect(lcFirst('test')).toBe('test');
	});

	test(`shouldn't do anything if we pass a number as a string`, () => {
		expect(lcFirst('123')).toBe('123');
	});

	test(`shouldn't do anything if we pass null`, () => {
		expect(lcFirst(null)).toBe(undefined);
	});

	test(`shouldn't do anything if we pass undefined`, () => {
		expect(lcFirst(undefined)).toBe(undefined);
	});
});

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
