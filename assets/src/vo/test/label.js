import Label from '../label';

describe( 'Label Value Object', () => {
	describe( 'when it is constructed', () => {
		const testInstance = new Label( 'singular', 'plural' );
		it( 'throws a TypeError if invalid arguments passed in', () => {
			const testDelayedInstance = ( singularLabel, pluralLabel ) => {
				return () => new Label( singularLabel, pluralLabel );
			};
			expect( testDelayedInstance( 20, 'something' ) ).toThrow( TypeError );
			expect( testDelayedInstance( 'something', 20 ) ).toThrow( TypeError );
		} );
		it( 'disallows changing of properties after construct', () => {
			expect( testInstance.singular ).toBe( 'singular' );
			expect( () => testInstance.singular = 'testChange' ).toThrow();
			expect( testInstance.singular ).toBe( 'singular' );
			expect( () => testInstance.plural = 'testChange' ).toThrow();
			expect( testInstance.plural ).toBe( 'plural' );
		} );
		describe( 'setSingular()', () => {
			it( 'returns a new Label instance and original is unchanged',
				() => {
					const newInstance = testInstance.setSingular( 'singularA' );
					expect( newInstance ).not.toBe( testInstance );
					expect( newInstance.singular ).toBe( 'singularA' );
					expect( testInstance.singular ).toBe( 'singular' );
				} );
		} );
		describe( 'setPlural()', () => {
			it( 'returns a new Label instance and original is unchanged',
				() => {
					const newInstance = testInstance.setPlural( 'pluralA' );
					expect( newInstance ).not.toBe( testInstance );
					expect( newInstance.plural ).toBe( 'pluralA' );
					expect( testInstance.plural ).toBe( 'plural' );
				} );
		} );
		describe( 'asSentenceCase()', () => {
			let newInstance = {};
			const testCases = [
				[ 'multiple word', 'Multiple Word' ],
				[ 'dashed-label', 'Dashed Label' ],
				[ 'wIerd Camel case', 'Wierd Camel Case' ],
			];
			it( 'returns the singular label in Sentence Case', () => {
				testCases.forEach( ( testCase ) => {
					newInstance = testInstance.setSingular( testCase[ 0 ] );
					expect( newInstance.asSentenceCase() ).toBe( testCase[ 1 ] );
				} );
			} );
			it( 'returns the plural label in Sentence Case', () => {
				testCases.forEach( ( testCase ) => {
					newInstance = testInstance.setPlural( testCase[ 0 ] );
					expect( newInstance.asSentenceCase( false ) )
						.toBe( testCase[ 1 ] );
				} );
			} );
		} );
		describe( 'asLowerCase()', () => {
			let newInstance = {};
			const testCases = [
				[ 'Multiple Words', 'multiple words' ],
				[ 'DASHED-LABEL', 'dashed-label' ],
				[ 'wIerd Camel case', 'wierd camel case' ],
			];
			it( 'returns the singular label in Lower Case', () => {
				testCases.forEach( ( testCase ) => {
					newInstance = testInstance.setSingular( testCase[ 0 ] );
					expect( newInstance.asLowerCase() ).toBe( testCase[ 1 ] );
				} );
			} );
			it( 'returns the plural label in Lower Case', () => {
				testCases.forEach( ( testCase ) => {
					newInstance = testInstance.setPlural( testCase[ 0 ] );
					expect( newInstance.asLowerCase( false ) )
						.toBe( testCase[ 1 ] );
				} );
			} );
		} );
		describe( 'asUpperCase()', () => {
			let newInstance = {};
			const testCases = [
				[ 'Multiple Words', 'MULTIPLE WORDS' ],
				[ 'dashed-label', 'DASHED-LABEL' ],
				[ 'wIerd Camel case', 'WIERD CAMEL CASE' ],
			];
			it( 'returns the singular label in Upper Case', () => {
				testCases.forEach( ( testCase ) => {
					newInstance = testInstance.setSingular( testCase[ 0 ] );
					expect( newInstance.asUpperCase() ).toBe( testCase[ 1 ] );
				} );
			} );
			it( 'returns the plural label in Upper Case', () => {
				testCases.forEach( ( testCase ) => {
					newInstance = testInstance.setPlural( testCase[ 0 ] );
					expect( newInstance.asUpperCase( false ) )
						.toBe( testCase[ 1 ] );
				} );
			} );
		} );
		describe( 'asFormatted()', () => {
			it( 'throws a warning when invalid format type argument' +
				' provided.', () => {
				testInstance.asFormatted( true, 'invalid' );
				expect( console ).toHaveErroredWith( 'Warning: Format type must' +
					' be one of Label.FORMAT_SENTENCE_CASE,' +
					' Label.FORMAT_UPPERCASE, or Label.FORMAT_LOWERCASE' );
			} );
			it( 'converts as expected for the provided format type', () => {
				expect(
					testInstance.asFormatted( true, Label.FORMAT_SENTENCE_CASE )
				).toBe( 'Singular' );
				expect(
					testInstance.asFormatted( false, Label.FORMAT_SENTENCE_CASE )
				).toBe( 'Plural' );
				expect(
					testInstance.asFormatted( true, Label.FORMAT_LOWERCASE )
				).toBe( 'singular' );
				expect(
					testInstance.asFormatted( false, Label.FORMAT_LOWERCASE )
				).toBe( 'plural' );
				expect(
					testInstance.asFormatted( true, Label.FORMAT_UPPERCASE )
				).toBe( 'SINGULAR' );
				expect(
					testInstance.asFormatted( false, Label.FORMAT_UPPERCASE )
				).toBe( 'PLURAL' );
			} );
		} );
	} );
	describe( 'Label.assertString()', () => {
		it( 'throws a TypeError if the provided value is not a' +
			' string', () => {
			expect( () => Label.assertString( 20 ) ).toThrow( TypeError );
		} );
	} );
	describe( 'Label.fromSameSingleAndPlural()', () => {
		it( 'creates a new Label instance with the same value for singular' +
			' and plural strings for the provided value', () => {
			const newInstance = Label.fromSameSingleAndPlural( 'same' );
			expect( newInstance.singular ).toBe( newInstance.plural );
		} );
	} );
} );
