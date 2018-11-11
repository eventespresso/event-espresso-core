/**
 * Internal imports
 */
import { NotWithPostTypeCheck } from '../index';

/**
 * External imports
 */
import renderer from 'react-test-renderer';

describe( 'NotWithPostTypeCheck Component Test', () => {
	const SubComponent = () => {
		return <div>Hello</div>;
	};
	const getTestComponent = ( postTypes ) => {
		const props = {
			postType: 'page',
			excludedPostTypeSlugs: postTypes,
		};
		return (
			<NotWithPostTypeCheck { ...props }>
				<SubComponent />
			</NotWithPostTypeCheck>
		);
	};
	const testConditions = [
		[
			'returns null if given post types exist for post type as string',
			'page',
			false,
		],
		[
			'returns null if given post types exist for post type as array',
			[ 'page', 'post' ],
			false,
		],
		[
			'returns expected children if given post type does not exist',
			'post',
			true,
		],
	];
	testConditions.forEach( ( [
		description,
		postTypes,
		expectRendered,
	] ) => {
		const rendered = renderer.create( getTestComponent( postTypes ) );
		const instance = rendered.root;
		it( description, () => {
			if ( expectRendered ) {
				expect( instance.children[ 0 ].type ).toEqual( SubComponent );
			} else {
				expect( instance.children ).toEqual( [] );
			}
		} );
	} );
} );
