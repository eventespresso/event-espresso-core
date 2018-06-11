/**
 * External dependencies
 */
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import { AvatarImage } from '../avatar';

describe( 'AvatarImage()', () => {
	it( 'with no avatarUrl provided should return nothing', () => {
		const wrapper = shallow( <AvatarImage /> );
		expect( wrapper.html() ).toBeNull();
	} );
	it( 'with only avatarUrl provided should have default options', () => {
		const avatarUrl = 'www.example.com';
		const wrapper = shallow(
			<AvatarImage avatarUrl={ avatarUrl } />
		);
		const avatarImage = wrapper.find( 'img' );
		expect( avatarImage.props().src ).toEqual( avatarUrl );
		expect( avatarImage.props().className ).toEqual(
			'contact-avatar-img avatar'
		);
		expect( avatarImage.props().height ).toEqual( 32 );
		expect( avatarImage.props().width ).toEqual( 32 );
		expect( avatarImage.props().alt ).toEqual( 'user avatar' );
	} );
	it( 'with all props provided should not have default options', () => {
		const avatarUrl = 'www.example.com';
		const avatarClass = 'test';
		const avatarHeight = 64;
		const avatarWidth = 64;
		const avatarAltText = 'this is some alt text';
		const wrapper = shallow(
			<AvatarImage
				avatarUrl={ avatarUrl }
				avatarClass={ avatarClass }
				avatarHeight={ avatarHeight }
				avatarWidth={ avatarWidth }
				avatarAltText={ avatarAltText }
			/>
		);
		const avatarImage = wrapper.find( 'img' );
		expect( avatarImage.props().src ).toEqual( avatarUrl );
		expect( avatarImage.props().className ).toEqual(
			avatarClass + '-avatar-img avatar'
		);
		expect( avatarImage.props().height ).toEqual( avatarHeight );
		expect( avatarImage.props().width ).toEqual( avatarWidth );
		expect( avatarImage.props().alt ).toEqual( avatarAltText );
	} );
} );

