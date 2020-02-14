import diff from '../../diff';

describe('diff.calendarDays', () => {
	it('returns the number of calendar days between the given dates', () => {
		const result = diff(
			'calendarDays',
			new Date(2012, 6 /* Jul */, 2, 18, 0),
			new Date(2011, 6 /* Jul */, 2, 6, 0)
		);
		expect(result).toBe(366);
	});

	it('returns a negative number if the time value of the first date is smaller', () => {
		const result = diff(
			'calendarDays',
			new Date(2011, 6 /* Jul */, 2, 6, 0),
			new Date(2012, 6 /* Jul */, 2, 18, 0)
		);
		expect(result).toBe(-366);
	});

	it('accepts timestamps', () => {
		const result = diff(
			'calendarDays',
			new Date(2014, 8 /* Sep */, 5, 18, 0).getTime(),
			new Date(2014, 8 /* Sep */, 4, 6, 0).getTime()
		);
		expect(result).toBe(1);
	});

	describe('edge cases', () => {
		it('the difference is less than a day, but the given dates are in different calendar days', () => {
			const result = diff(
				'calendarDays',
				new Date(2014, 8 /* Sep */, 5, 0, 0),
				new Date(2014, 8 /* Sep */, 4, 23, 59)
			);
			expect(result).toBe(1);
		});

		it('the same for the swapped dates', () => {
			const result = diff(
				'calendarDays',
				new Date(2014, 8 /* Sep */, 4, 23, 59),
				new Date(2014, 8 /* Sep */, 5, 0, 0)
			);
			expect(result).toBe(-1);
		});

		it('the time values of the given the given dates are the same', () => {
			const result = diff(
				'calendarDays',
				new Date(2014, 8 /* Sep */, 6, 0, 0),
				new Date(2014, 8 /* Sep */, 5, 0, 0)
			);
			expect(result).toBe(1);
		});

		it('the given the given dates are the same', () => {
			const result = diff(
				'calendarDays',
				new Date(2014, 8 /* Sep */, 5, 0, 0),
				new Date(2014, 8 /* Sep */, 5, 0, 0)
			);
			expect(result).toBe(0);
		});

		it('does not return -0 when the given dates are the same', () => {
			function isNegativeZero(x: number): boolean {
				return x === 0 && 1 / x < 0;
			}

			const result = diff(
				'calendarDays',
				new Date(2014, 8 /* Sep */, 5, 0, 0),
				new Date(2014, 8 /* Sep */, 5, 0, 0)
			);

			const resultIsNegative = isNegativeZero(result);
			expect(resultIsNegative).toBe(false);
		});
	});

	it('returns NaN if the first date is `Invalid Date`', () => {
		const result = diff('calendarDays', new Date(NaN), new Date(2017, 0 /* Jan */, 1));
		expect(isNaN(Number(result))).toBe(true);
	});

	it('returns NaN if the second date is `Invalid Date`', () => {
		const result = diff('calendarDays', new Date(2017, 0 /* Jan */, 1), new Date(NaN));
		expect(isNaN(Number(result))).toBe(true);
	});

	it('returns NaN if the both dates are `Invalid Date`', () => {
		const result = diff('calendarDays', new Date(NaN), new Date(NaN));
		expect(isNaN(Number(result))).toBe(true);
	});
});
