<?php
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package		Event Espresso
 * @author		Seth Shoultes
 * @copyright	(c)2009-2012 Event Espresso All Rights Reserved.
 * @license		http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link		http://www.eventespresso.com
 * @version		3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * EE_Tabbed_Content
 *
 * This is a helper class for displaying tabbed content
 *
 * requires that the ee-admin-page.js and jquery-ui-tabs be loaded.
 * 
 * @package		EE_Tabbed_Content
 * @subpackage	helpers/
 * @abstract
 * @author		Darren Ethier
 * @todo: This needs to be a bit more dynamic to allow for multiple tabbed instances on a page.  Right now with this we can have only one instance intiialized by the #ee-nav-tabs selector.
 *
 * ------------------------------------------------------------------------
 */



class EE_Tabbed_Content {



	/**
	 * assembles and returns the html structure for tabs
	 *
	 * @static
	 * @param  array $tabs_names   an unassociative array of names for each tab [optional] - if this isn't included then we use the indexes for $tabs_content as the tab names)
	 * @param  array $tabs_content an array of the content for each tab [required]
	 * @return string               the assembled html string containing the tabbed content for display.
	 */
	static function display($tabs_contents, $tabs_names = array() ) {

		//first check if $tabs_names is not empty then the count must match the count of $tabs_content otherwise we've got a problem houston
		if ( !empty( $tabs_names) && ( count( (array) $tabs_names) != count( (array) $tabs_content) ) ) {
			return new WP_Error('incorrect_tab_keys_values_count', __('The count for $tabs_names and $tabs_content does not match.', 'event_espresso') . espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__) );
		}
		
		//make sure we've got incoming data setup properly
		$tabs = !empty( $tabs_names ) ? (array) $tabs_names : array_keys( (array) $tabs_contents );
		$tabs_content = !empty( $tabs_names ) ? array_combine( (array) $tabs_names, (array) $tabs_content ) : $tabs_contents;

		$all_tabs = '<ul class="ee-nav-tab-wrapper nav-tab-wrapper">' . "\n";
		$all_tabs_content = '';

		foreach ( $tabs as $tab ) {
			$all_tabs .= self::tab($tab);
			$all_tabs_content .= self::tab_content($tab, $tabs_content[$tab]);
		}

		$all_tabs .= '</ul>';

		return '<div id="ee-nav-tabs">' . "\n\t" . $all_tabs . $all_tabs_content . "\n" . '</div>';
	}

	/**
	 * this simply returns a single tab given a tab name & content
	 * @param  string $name    name of tab
	 * @return string          html for tab
	 */
	static function tab($name) {
		$name = str_replace(' ', '-', $name);
		$nice_name = ucwords( preg_replace('/(-|_)/', ' ', $name) );
		$tab = '<li><a href="#ee-tab-' . $name . '">' . $nice_name . '</a></li>' . "\n\t";
		return $tab;
	}

	/**
	 * this just returns the properly formatted tab content for our tab box.
	 * @param  string $name    name of tab (used for selector)
	 * @param  string $content content of tab
	 * @return string          html for content area
	 */
	static function tab_content($name, $tab_content) {
		$name = str_replace( ' ', '-', $name);
		$content = "\t" . '<div id="ee-tab-' . $name . '">' . "\n";
		$content .= "\t" . $tab_content . "\n";
		$content .= '</div>';
		return $content;
	}

}// end EE_Tabbed_Content helper class