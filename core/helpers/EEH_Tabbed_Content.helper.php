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
 * @version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * EEH_Tabbed_Content
 *
 * This is a helper class for displaying tabbed content
 *
 * requires that the ee-admin-page.js and jquery-ui-tabs be loaded.
 *
 * @package		EEH_Tabbed_Content
 * @subpackage	helpers/
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */



class EEH_Tabbed_Content {



	/**
	 * assembles and returns the html structure for tabs
	 *
	 * @static
	 * @param  array $tabs_contents an array of the content for each tab [required]
	 * @param  array $tabs_names    an unassociative array of names for each tab [optional] - if this isn't included then we use the indexes for $tabs_content as the tab names)
	 * @param bool   $small_tabs
	 * @param bool   $tabs_content
	 * @return string the assembled html string containing the tabbed content for display.
	 * @throws \EE_Error
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

		$all_tabs .= '<a class="nav-tab" rel="ee-tab-anothertab" href="#anothertab">Another Tab</a>';
		$all_tabs_content .= '<div class="nav-tab-content hidden" id="ee-tab-anothertab">This is just some sample content to show another tab<div style="clear:both"></div></div>';
		//end sample content /**/

		$all_tabs .= '</h2>';

		$tab_container_class = $small_tabs ? 'ee-nav-tabs ee-nav-tabs-small' : 'ee-nav-tabs';

		return '<div class="'. $tab_container_class . '">' . "\n\t" . $all_tabs . $all_tabs_content . "\n" . '</div>';
	}



	/**
	 * display_admin_nav_tabs
	 * this returns the properly formatted tab html for EE_Admin_Pages.
	 * We are expecting an array of tabs in the following format
	 * array(
	 *    'nav_tab_name' => array(
	 *        'url' => 'url for tab',
	 *        'link_text' => 'tab text',
	 *        'css_class' => 'tab class' //including the nav-tab-active class if its active
	 *    )
	 * )
	 *
	 * @access public
	 * @static
	 * @param array $nav_tabs tab array for nav tabs
	 * @return string
	 * @throws \EE_Error
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
	 *
	 * @param  string $name        name of tab (used for selector)
	 * @param  string $tab_content content of tab
	 * @param  bool   $active
	 * @return string html for content area
	 */
	private static function tab_content($name, $tab_content, $active = false) {
		$class = $active ? 'nav-tab-content' : 'nav-tab-content hidden';
		$name = str_replace( ' ', '-', $name);
		$content = "\t" . '<div class="'. $class . '" id="ee-tab-' . $name . '">' . "\n";
		$content .= "\t" . $tab_content . "\n";
		$content .= '<div style="clear:both"></div></div>';
		return $content;
	}



	/** HORIZONTAL TEXT LINKS **/

	/**
	 * This will take in an array of link items and spit out a formatted list of links that can be used to navigate to items.
	 * There is a corresponding js file that can be loaded to dynamically display containers with the same id as the href -ref.
	 *
	 * @param  array $item_array      formatted array of items.  Format:
	 * array(
	 * 		'label' => __('localized label displayed'),
	 * 		'class' => 'class_for_item',
	 * 		'href' => '#some_item_id', //url/bookmark for item.  If you include a bookmark the js will used this to show the container div.
	 * 		'title' => __('localized text for the title attribute of the link'),
	 * 		'slug' => 'slug_used_for_reference'
	 * )
	 * @param  string $container_class class used for main container
	 * @param  string $sep       		you can add in what is used as a separator between each link (or leave blank for none)
	 * @param string $default 			You can include a string for the item that will receive the "item_display" class for the js.
	 * @return string                  a html snippet of of all the formatted link elements.
	 */
	public static function tab_text_links( $item_array, $container_class = '', $sep = '|', $default = '' ) {
		$item_array = apply_filters( 'FHEE__EEH_Tabbed_Content__tab_text_links', $item_array, $container_class );
		if ( !is_array($item_array) || empty( $item_array ) )
			return false; //get out we don't have even the basic thing we need!


		$defaults = array(
			'label' => __('Item', 'event_espresso'),
			'class' => '',
			'href' => '',
			'title' => esc_attr__('Link for Item', 'event_espresso'),
			'slug' => 'item_slug'
		);
		$container_class = !empty($container_class) ? 'ee-text-links ' . $container_class : 'ee-text-links';
		$list = '<ul class="' . $container_class . '">';

		$ci = 1;
		foreach ( $item_array as $item ) {
			$item = wp_parse_args( $item, $defaults );
			$item['class'] = !empty($default) && $default == $item['slug'] ? 'item_display ' . $item['class'] : $item['class'];
			$list .= self::_text_link_item($item);
			if ( !empty($sep) && $ci != count($item_array) )
				$list .= self::_text_link_item($sep);
			$ci++;
		}

		$list .= '</ul>';
		return $list;
	}



	private static function _text_link_item( $item ) {
		//if this isn't an array then we're doing a separator
		if ( !is_array( $item ) ) {
			$label = $item;
			$class = 'ee-text-link-sep';
			$href = '';
			$title = '';
		} else {
			extract($item);
		}

		$class = $class != 'ee-text-link-sep'  ? 'class="ee-text-link-li ' . $class . '"' : 'class="ee-text-link-sep"';

		$content = '<li ' . $class . '>';
		$content .= !empty($href) ? '<a class="ee-text-link" href="#' . $href . '" title="' . $title . '">' : '';
		$content .= $label;
		$content .= !empty($href) ? '</a>' : '';
		$content .= '</li>';
		return $content;
	}


}// end EEH_Tabbed_Content helper class
