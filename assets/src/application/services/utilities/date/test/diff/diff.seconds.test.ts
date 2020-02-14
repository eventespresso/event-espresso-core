import diff from '../../diff';

describe('diff.seconds', () => {
	it('returns the number of seconds between the given dates', () => {
		const result = diff(
			'seconds',
			new Date(2014, 6 /* Jul */, 2, 12, 30, 20),
			new Date(2014, 6 /* Jul */, 2, 12, 30, 6)
		);
		expect(result).toBe(14);
	});

	it('returns a negative number if the time value of the first date is smaller', () => {
		const result = diff(
			'seconds',
			new Date(2014, 6 /* Jul */, 2, 12, 30, 6),
			new Date(2014, 6 /* Jul */, 2, 12, 30, 20)
		);
		expect(result).toBe(-14);
	});

	it('accepts timestamps', () => {
		const result = diff(
			'seconds',
			new Date(2014, 8 /* Sep */, 5, 18, 30, 45).getTime(),
			new Date(2014, 8 /* Sep */, 5, 18, 30, 15).getTime()
		);
		expect(result).toBe(30);
	});

	describe('edge cases', () => {
		it('the difference is less than a second, but the given dates are in different calendar seconds', () => {
			const result = diff(
				'seconds',
				new Date(2014, 8 /* Sep */, 5, 12, 30, 12),
				new Date(2014, 8 /* Sep */, 5, 12, 30, 11, 999)
			);
			expect(result).toBe(0);
		});

		it('the same for the swapped dates', () => {
			const result = diff(
				'seconds',
				new Date(2014, 8 /* Sep */, 5, 12, 30, 11, 999),
				new Date(2014, 8 /* Sep */, 5, 12, 30, 12)
			);
			expect(result === 0).toBe(true);
		});

		it('the difference is an integral number of seconds', () => {
			const result = diff(
				'seconds',
				new Date(2014, 8 /* Sep */, 5, 12, 30, 25),
				new Date(2014, 8 /* Sep */, 5, 12, 30, 15)
			);
			expect(result).toBe(10);
		});

		it('the given dates are the same', () => {
			const result = diff('seconds', new Date(2014, 8 /* Sep */, 5, 0, 0), new Date(2014, 8 /* Sep */, 5, 0, 0));
			expect(result).toBe(0);
		});

		it('does not return -0 when the given dates are the same', () => {
			function isNegativeZero(x: number): boolean {
				return x === 0 && 1 / x < 0;
			}

			const result = diff('seconds', new Date(2014, 8 /* Sep */, 5, 0, 0), new Date(2014, 8 /* Sep */, 5, 0, 0));

			const resultIsNegative = isNegativeZero(result);
			expect(resultIsNegative).toBe(false);
		});
	});

	it('returns NaN if the first date is `Invalid Date`', () => {
		const result = diff('seconds', new Date(NaN), new Date(2017, 0 /* Jan */, 1));
		expect(isNaN(Number(result))).toBe(true);
	});

	it('returns NaN if the second date is `Invalid Date`', () => {
		const result = diff('seconds', new Date(2017, 0 /* Jan */, 1), new Date(NaN));
		expect(isNaN(Number(result))).toBe(true);
	});

	it('returns NaN if the both dates are `Invalid Date`', () => {
		const result = diff('seconds', new Date(NaN), new Date(NaN));
		expect(isNaN(Number(result))).toBe(true);
	});
});
