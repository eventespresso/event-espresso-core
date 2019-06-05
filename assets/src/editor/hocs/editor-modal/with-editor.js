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
 * @param {string} closeEditorNotice 	message displayed if user attempts
 * 										to close modal when changes are not
 * 										yet saved. To override the appearance
 * 										of the closeEditorNotice, simply pass
 * 										an empty string for this prop
 */
const withEditor = createHigherOrderComponent(
	( OriginalComponent ) => {
		return class extends Component {
			constructor( props ) {
				super( props );
				const closeEditorNotice = props.closeEditorNotice !== undefined ?
					props.closeEditorNotice :
					sprintf(
						__(
							'Are you sure you want to close the Editor?%sAll unsaved changes will be lost!',
							'event_espresso'
						),
						'\n\n'
					);
				this.state = {
					editorOpen: false,
					changesSaved: true,
					closeEditorNotice,
				};
			}

			/**
			 * will mark that changes have been saved which allows the modal to
			 * be closed without triggering the display of the closeEditorNotice
			 *
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
