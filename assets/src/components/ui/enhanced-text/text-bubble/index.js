import './style.css';

const TextBubble = ( { children } ) => {
	return (
		<span className={ 'ee-text-bubble' }>
			{ children }
		</span>
	);
};
export default TextBubble;
