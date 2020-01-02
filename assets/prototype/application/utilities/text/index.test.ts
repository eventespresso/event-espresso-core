import { ucFirst } from './index';

describe.only('ucFirst', () => {
	test('should uppercase first letter of a string', () => {
		expect(ucFirst('test')).toBe('Test');
	});
});
