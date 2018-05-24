/**
 * External dependencies
 */
import PropTypes from 'prop-types';


const ContactAvatar = ( { avatar } ) => {
	const baseClass = avatar.baseClass;
	const divClass = baseClass + "-div";
	const imgClass = baseClass + "-avatar-img avatar";
	return (
		<div className={ divClass }>
			<img
				className={ imgClass }
				src={ avatar.url }
				height={ avatar.height }
				width={ avatar.width }
			/>
		</div>
	);
};

ContactAvatar.propTypes = {
	avatar: PropTypes.shape({
		url: PropTypes.string.required,
		baseClass: PropTypes.string,
		height: PropTypes.number,
		width: PropTypes.number,
	})
};

ContactAvatar.defaultProps = {
	avatar: {
		url: '',
		baseClass: '',
		height: 32,
		width: 32,
	},
};

export default ContactAvatar
