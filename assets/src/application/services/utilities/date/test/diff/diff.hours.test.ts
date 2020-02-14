import diff from '../../diff';

describe('diff.hours', () => {
	it('returns the number of hours between the given dates', () => {
		const result = diff('hours', new Date(2014, 6 /* Jul */, 2, 20, 0), new Date(2014, 6 /* Jul */, 2, 6, 0));
		expect(result).toBe(14);
	});

	it('returns a negative number if the time value of the first date is smaller', () => {
		const result = diff('hours', new Date(2014, 6 /* Jul */, 2, 6, 0), new Date(2014, 6 /* Jul */, 2, 20, 0));
		expect(result).toBe(-14);
	});

	it('accepts timestamps', () => {
		const result = diff(
			'hours',
			new Date(2014, 8 /* Sep */, 5, 18, 0).getTime(),
			new Date(2014, 8 /* Sep */, 5, 6, 0).getTime()
		);
		expect(result).toBe(12);
	});

	describe('edge cases', () => {
		it('the difference is less than an hour, but the given dates are in different calendar hours', () => {
			const result = diff('hours', new Date(2014, 8 /* Sep */, 5, 12), new Date(2014, 8 /* Sep */, 5, 11, 59));
			expect(result).toBe(0);
		});

		it('the same for the swapped dates', () => {
			const result = diff('hours', new Date(2014, 8 /* Sep */, 5, 11, 59), new Date(2014, 8 /* Sep */, 5, 12));
			expect(result === 0).toBe(true);
		});

		it('the difference is an integral number of hours', () => {
			const result = diff('hours', new Date(2014, 8 /* Sep */, 5, 13, 0), new Date(2014, 8 /* Sep */, 5, 12, 0));
			expect(result).toBe(1);
		});

		it('the given dates are the same', () => {
			const result = diff('hours', new Date(2014, 8 /* Sep */, 5, 0, 0), new Date(2014, 8 /* Sep */, 5, 0, 0));
			expect(result).toBe(0);
		});

		it('does not return -0 when the given dates are the same', () => {
			function isNegativeZero(x: number): boolean {
				return x === 0 && 1 / x < 0;
			}

			const result = diff('hours', new Date(2014, 8 /* Sep */, 5, 0, 0), new Date(2014, 8 /* Sep */, 5, 0, 0));

			const resultIsNegative = isNegativeZero(result);
			expect(resultIsNegative).toBe(false);
		});
	});

	it('returns NaN if the first date is `Invalid Date`', () => {
		const result = diff('hours', new Date(NaN), new Date(2017, 0 /* Jan */, 1));
		expect(isNaN(Number(result))).toBe(true);
	});

	it('returns NaN if the second date is `Invalid Date`', () => {
		const result = diff('hours', new Date(2017, 0 /* Jan */, 1), new Date(NaN));
		expect(isNaN(Number(result))).toBe(true);
	});

	it('returns NaN if the both dates are `Invalid Date`', () => {
		const result = diff('hours', new Date(NaN), new Date(NaN));
		expect(isNaN(Number(result))).toBe(true);
	});
});
