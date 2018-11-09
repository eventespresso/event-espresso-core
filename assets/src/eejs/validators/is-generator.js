/**
 * Tests for whether the provide value is a generator or not.
 *
 * Note: Generators are different than GeneratorFunctions!
 * This is a Generator:  function* (){}(); (an invoked GeneratorFunction)
 * this is a GeneratorFunction: function* (){}
 *
 * @param {*} object
 * @return {boolean} True if the provided value is a generator.
 */
export const isGenerator = ( object ) => {
	return (
		!! object &&
		object[ Symbol.toStringTag ] === 'Generator'
	);
};
