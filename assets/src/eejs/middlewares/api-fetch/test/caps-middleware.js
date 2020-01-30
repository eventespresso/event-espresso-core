/**
 * Internal dependencies
 */
import {
	default as capsMiddleware,
	CONTEXT_CAPS_READ_ADMIN,
} from '../caps-middleware';

describe( 'caps context middleware tests', () => {
	const validUrl = 'https://ee.test/wp-json/ee/v4.8.36/events';
	const validPath = '/ee/v4.8.36/events';
	const invalidUrl = 'https://ee.test/wp-json/ee/events';
	const appendedUrl = validUrl + '?caps=read_admin';
	const appendedPath = validPath + '?caps=read_admin';
	[
		[
			'because method is not GET',
			{ method: 'POST', url: validUrl },
			'url',
			validUrl,
		],
		[
			'because context is already present',
			{ method: 'GET', path: validUrl + '?caps=something' },
			'path',
			validUrl + '?caps=something',
		],
		[
			'because invalid path',
			{ method: 'GET', url: invalidUrl },
			'url',
			invalidUrl,
		],
	].forEach( ( [
		descriptionPart,
		options,
		optionsType,
		expectedUrl,
	] ) => {
		it( 'should not have context appended ' + descriptionPart, () => {
			expect.hasAssertions();
			const callback = ( opts ) => {
				expect( opts[ optionsType ] ).toBe( expectedUrl );
			};
			capsMiddleware( CONTEXT_CAPS_READ_ADMIN )( options, callback );
		} );
	} );
	[
		[
			'when the options.path property is a valid full url',
			{ method: 'GET', path: validUrl },
			'path',
			appendedUrl,
		],
		[
			'when the options.url property is a valid full url',
			{ method: 'GET', url: validUrl },
			'url',
			appendedUrl,
		],
		[
			'when the options.url property is a valid url path',
			{ method: 'GET', url: validPath },
			'url',
			appendedPath,
		],
	].forEach( ( [
		descriptionPart,
		options,
		optionsType,
		expectedUrl,
	] ) => {
		it( 'should have context appended ' + descriptionPart, () => {
			expect.hasAssertions();
			const callback = ( opts ) => {
				expect( opts[ optionsType ] ).toBe( expectedUrl );
			};
			capsMiddleware( CONTEXT_CAPS_READ_ADMIN )( options, callback );
		} );
	} );
} );
