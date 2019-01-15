/**
 * External imports
 */
import { Component } from 'react';

/**
 * SidebarMenuItem
 * just a wrapper for an IconButton and additional component
 * (most likely a modal component) so that it can be added to a sidebar menu
 */
export class SidebarMenuItem extends Component {
	render() {
		return this.props.children;
	}
}
