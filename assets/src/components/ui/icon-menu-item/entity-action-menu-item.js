/**
 * External imports
 */
import { Component } from 'react';

/**
 * EntityActionMenuItem
 * just a wrapper for an IconButton and additional component
 * (most likely a modal component) so that it can be added to a menu
 */
class EntityActionMenuItem extends Component {
	render() {
		return this.props.children;
	}
}

export default EntityActionMenuItem;