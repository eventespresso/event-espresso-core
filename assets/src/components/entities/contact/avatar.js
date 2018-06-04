/**
 * External dependencies
 */
import PropTypes from 'prop-types';

const ContactAvatar = ( {
	avatarUrl,
	avatarClass,
	avatarHeight,
	avatarWidth
} ) => {
	return avatarUrl ? (
		<div className={ avatarClass + "-image-wrap-div" }>
			<img
				className={ avatarClass + "-avatar-img avatar" }
				src={ avatarUrl }
				height={ avatarHeight }
				width={ avatarWidth }
			/>
		</div>
	) : (
		null
	);
};

ContactAvatar.propTypes = {
	avatarUrl: PropTypes.string,
	avatarClass: PropTypes.string,
	avatarHeight: PropTypes.number,
	avatarWidth: PropTypes.number,
};

ContactAvatar.defaultProps = {
	avatarUrl: '',
	avatarClass: 'contact',
	avatarHeight: 32,
	avatarWidth: 32,
};

export default ContactAvatar
