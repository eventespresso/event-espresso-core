/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { __ } from '@eventespresso/i18n';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';

/**
 * AvatarImage
 *
 * @constructor
 * @param {string} avatarUrl        gravatar URL
 * @param {string} avatarClass		base CSS class to apply
 * @param {number} avatarHeight		image height (default = 32px)
 * @param {number} avatarWidth 		image width (default = 32px)
 * @param {string} avatarAltText	image alt text
 * @return {Function}  				A pure component function.
 */
export class AvatarImage extends Component {
	static propTypes = {
		avatarUrl: PropTypes.string,
		avatarClass: PropTypes.string,
		avatarHeight: PropTypes.number,
		avatarWidth: PropTypes.number,
		avatarAltText: PropTypes.string,
	};
	static defaultProps = {
		avatarUrl: '',
		avatarClass: 'contact',
		avatarHeight: 32,
		avatarWidth: 32,
		avatarAltText: __( 'contact avatar', 'event_espresso' ),
	};
	render() {
		const {
			avatarUrl,
			avatarClass,
			avatarHeight,
			avatarWidth,
			avatarAltText,
		} = this.props;

		const style = {
			height: avatarHeight,
			width: avatarWidth,
		};
		return avatarUrl ? (
			<div className={ avatarClass + '-image-wrap-div' }>
				<img
					className={ avatarClass + '-avatar-img avatar' }
					src={ avatarUrl }
					style={ style }
					alt={ avatarAltText }
				/>
			</div>
		) : (
			null
		);
	}
}
