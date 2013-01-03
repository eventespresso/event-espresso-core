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
	public static function display($tabs_contents, $tabs_names = array(), $small_tabs = true, $tabs_content = TRUE ) {

		//first check if $tabs_names is not empty then the count must match the count of $tabs_content otherwise we've got a problem houston
		if ( !empty( $tabs_names) && ( count( (array) $tabs_names) != count( (array) $tabs_content) ) ) {
			throw new EE_Error( __('The count for $tabs_names and $tabs_content does not match.', 'event_espresso') );
		}
		
		//make sure we've got incoming data setup properly
		$tabs = !empty( $tabs_names ) ? (array) $tabs_names : array_keys( (array) $tabs_contents );
		$tabs_content = !empty( $tabs_names ) ? array_combine( (array) $tabs_names, (array) $tabs_content ) : $tabs_contents;

		$all_tabs = '<h2 class="nav-tab-wrapper">' . "\n";
		$all_tabs_content = '';

		$index = 0;
		foreach ( $tabs as $tab ) {
			$active = $index === 0 ? true : false;
			$all_tabs .= self::tab($tab, $active);
			$all_tabs_content .= self::tab_content($tab, $tabs_content[$tab], $active);
			$index++;
		}
		/*
		sample content for testing
		 */
		$all_tabs .= '<a class="nav-tab" rel="ee-tab-anothertab" href="#anothertab">Another Tab</a>';
		$all_tabs_content .= '<div class="nav-tab-content hidden" id="ee-tab-anothertab">This is just some sample content to show another tab</div>';
		//end sample content /**/

		$all_tabs .= '</h2>';

		$tab_container_class = $small_tabs ? 'ee-nav-tabs ee-nav-tabs-small' : 'ee-nav-tabs';

		return '<div class="'. $tab_container_class . '">' . "\n\t" . $all_tabs . $all_tabs_content . "\n" . '<div style="clear:both"></div></div>';
	}




	/**
	 * display_admin_nav_tabs
	 * this returns the properly formatted tab html for EE_Admin_Pages.
	 * We are expecting an array of tabs in the following format
	 * array(
	 * 	'nav_tab_name' => array(
	 * 		'url' => 'url for tab',
	 * 		'link_text' => 'tab text',
	 * 		'css_class' => 'tab class' //including the nav-tab-active class if its active
	 * 	)
	 * ) 
	 *
	 * @access public
	 * @static
	 * @param array $nav_tabs tab array for nav tabs
	 */
	public static function display_admin_nav_tabs($nav_tabs = array()) {
		if ( empty($nav_tabs) )
			throw new EE_Error( __('Nav Tabs cannot be generated because the tab array is missing', 'event_espresso' ) );

		$all_tabs = '<h2 class="nav-tab-wrapper">' . "\n";
		foreach ( $nav_tabs as $slug => $tab ) {
			$all_tabs .= self::tab($slug, false, $tab['link_text'], $tab['url'], $tab['css_class']);
		}
		$all_tabs .= '</h2>';
		return $all_tabs;
	}

	/**
	 * this simply returns a single tab given a tab name & content
	 * @param  string $name    name of tab
	 * @param bool $active true=tab active, false=tab not active
	 * @param bool|string $nice_name if string given then this value will be used for the tab link text.
	 * @param bool|string $url If url given then tabs will be generated linking to the url.
	 * @param bool|string $css If string given then the generated tab will include that as the class.
	 * @return string          html for tab
	 */
	private static function tab($name, $active = false, $nice_name = FALSE, $url = FALSE, $css = FALSE ) {
		$name = str_replace(' ', '-', $name);
		$class = $active ? 'nav-tab nav-tab-active' : 'nav-tab';
		$class = $css ? $class . ' ' . $css : $class;
		$nice_name = $nice_name ? $nice_name : ucwords( preg_replace('/(-|_)/', ' ', $name) );
		$url = $url ? $url : '#' . $name;
		$tab = '<a class="' . $class . '" rel="ee-tab-' . $name . '" href="' . $url . '">' . $nice_name . '</a>' . "\n\t";
		return $tab;
	}

	/**
	 * this just returns the properly formatted tab content for our tab box.
	 * @param  string $name    name of tab (used for selector)
	 * @param  string $content content of tab
	 * @return string          html for content area
	 */
	private static function tab_content($name, $tab_content, $active = false) {
		$class = $active ? 'nav-tab-content' : 'nav-tab-content hidden';
		$name = str_replace( ' ', '-', $name);
		$content = "\t" . '<div class="'. $class . '" id="ee-tab-' . $name . '">' . "\n";
		$content .= "\t" . $tab_content . "\n";
		$content .= '</div>';
		return $content;
	}



}// end EE_Tabbed_Content helper class