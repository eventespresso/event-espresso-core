/**
 * External imports
 */
import { Component } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * withEditor
 * controls toggling of the withEditorModal HOC
 * wraps the component that contains the withEditorModal
 *
 * @function
 */
const withEditor = createHigherOrderComponent(
	( OriginalComponent ) => {
		return class extends Component {
			constructor( props ) {
				super( props );
				this.state = { editorOpen: false };
			}

			/**
			 * opens and closes withEditorModal
			 *
			 * @function
			 */
			toggleEditor = () => {
				this.setState( ( prevState ) => (
					{ editorOpen: ! prevState.editorOpen }
				) );
			};

			render() {
				return (
					<OriginalComponent
						{ ...this.props }
						editorOpen={ this.state.editorOpen }
						toggleEditor={ this.toggleEditor }
					/>
				);
			}
		};
	},
	'withEditor'
);

export default withEditor;
