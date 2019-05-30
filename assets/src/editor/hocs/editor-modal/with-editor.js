/**
 * External imports
 */
import { Component } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';
import { __, sprintf } from '@eventespresso/i18n';

const { confirm } = window;

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
				this.state = {
					editorOpen: false,
					changesSaved: true,
					closeEditorNotice: props.closeEditorNotice ||
						sprintf(
							__(
								'Are you sure you want to close the Editor?%sAll unsaved changes will be lost!',
								'event_espresso'
							),
							'\n\n'
						),
				};
			}

			/**
			 * @function
			 * @param {boolean} changesSaved
			 */
			changesSaved = ( changesSaved = false ) => {
				this.setState( { changesSaved } );
			};

			/**
			 * opens and closes withEditorModal
			 *
			 * @function
			 */
			toggleEditor = () => {
				this.setState( ( prevState ) => {
					if (
						this.state.closeEditorNotice !== '' &&
						prevState.editorOpen && ! prevState.changesSaved
					) {
						return (
							{
								editorOpen: ! confirm(
									this.state.closeEditorNotice
								),
							}
						);
					}
					return (
						{ editorOpen: ! prevState.editorOpen }
					);
				} );
			};

			render() {
				return (
					<OriginalComponent
						{ ...this.props }
						editorOpen={ this.state.editorOpen }
						toggleEditor={ this.toggleEditor }
						changesSaved={ this.changesSaved }
					/>
				);
			}
		};
	},
	'withEditor'
);

export default withEditor;
