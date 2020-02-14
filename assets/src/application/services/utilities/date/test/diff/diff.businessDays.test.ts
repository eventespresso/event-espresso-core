import diff from '../../diff';

describe('diff.businessDays', () => {
	it('returns the number of business days between the given dates, excluding weekends', () => {
		const result = diff('businessDays', new Date(2014, 6 /* Jul */, 18), new Date(2014, 0 /* Jan */, 10));
		expect(result).toBe(135);
	});

	it('can handle long ranges', () => {
		if (typeof this.timeout === 'function') {
			this.timeout(500 /* 500 ms test timeout */);
		}
		const result = diff('businessDays', new Date(15000, 0 /* Jan */, 1), new Date(2014, 0 /* Jan */, 1));
		expect(result).toBe(3387885);
	});

	it('the same except given first date falls on a weekend', () => {
		const result = diff('businessDays', new Date(2019, 6 /* Jul */, 20), new Date(2019, 6 /* Jul */, 18));
		expect(result).toBe(2);
	});

	it('the same except given second date falls on a weekend', () => {
		const result = diff('businessDays', new Date(2019, 6 /* Jul */, 23), new Date(2019, 6 /* Jul */, 20));
		expect(result).toBe(1);
	});

	it('the same except both given dates fall on a weekend', () => {
		const result = diff('businessDays', new Date(2019, 6 /* Jul */, 28), new Date(2019, 6 /* Jul */, 20));
		expect(result).toBe(5);
	});

	it('returns a negative number if the time value of the first date is smaller', () => {
		const result = diff('businessDays', new Date(2014, 0 /* Jan */, 10), new Date(2014, 6 /* Jul */, 20));
		expect(result).toBe(-135);
	});

	it('accepts timestamps', () => {
		const result = diff('businessDays', new Date(2014, 6, 18).getTime(), new Date(2014, 0, 10).getTime());
		expect(result).toBe(135);
	});

	describe('edge cases', () => {
		it('the difference is less than a day, but the given dates are in different calendar days', () => {
			const result = diff(
				'businessDays',
				new Date(2014, 8 /* Sep */, 5, 0, 0),
				new Date(2014, 8 /* Sep */, 4, 23, 59)
			);
			expect(result).toBe(1);
		});

		it('the same for the swapped dates', () => {
			const result = diff(
				'businessDays',
				new Date(2014, 8 /* Sep */, 4, 23, 59),
				new Date(2014, 8 /* Sep */, 5, 0, 0)
			);
			expect(result).toBe(-1);
		});

		it('the time values of the given dates are the same', () => {
			const result = diff(
				'businessDays',
				new Date(2014, 8 /* Sep */, 5, 0, 0),
				new Date(2014, 8 /* Sep */, 4, 0, 0)
			);
			expect(result).toBe(1);
		});

		it('the given dates are the same', () => {
			const result = diff(
				'businessDays',
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
				'businessDays',
				new Date(2014, 8 /* Sep */, 5, 0, 0),
				new Date(2014, 8 /* Sep */, 5, 0, 0)
			);

			const resultIsNegative = isNegativeZero(result);
			expect(resultIsNegative).toBe(false);
		});

		it('returns NaN if the first date is `Invalid Date`', () => {
			const result = diff('businessDays', new Date(NaN), new Date(2017, 0 /* Jan */, 1));
			expect(isNaN(Number(result))).toBe(true);
		});

		it('returns NaN if the second date is `Invalid Date`', () => {
			const result = diff('businessDays', new Date(2017, 0 /* Jan */, 1), new Date(NaN));
			expect(isNaN(Number(result))).toBe(true);
		});

		it('returns NaN if the both dates are `Invalid Date`', () => {
			const result = diff('businessDays', new Date(NaN), new Date(NaN));
			expect(isNaN(Number(result))).toBe(true);
		});
	});
});
