/**
 * External imports
 */
import ReactDOM from 'react-dom';
import { Component } from 'react';
import { EditorDates } from '@eventespresso/editor';

/**
 * Internal imports
 */

/**
 * AdminRefactor
 *
 * @constructor
 */
class AdminRefactor extends Component {
	// addDatetime = ( datetime ) => {
	// };

	// deleteDatetime = ( datetime ) => {
	// };

	render() {
		return (
			<div>
				<div id="ee-editor-dates-metabox-div" className="ee-editor-metabox">
					<EditorDates eventDates={ this.props.eventDates } />
					<div className="clear-float"></div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<AdminRefactor eventDates={ window.remEventDatesList } />,
	document.getElementById( 'ee-editor-admin-refactor' )
);
