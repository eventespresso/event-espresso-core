<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('NO direct script access allowed'); }

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
 * EE_Maps	
 *
 * This is a helper utility class that provides different helpers related to mapping and displaying location related data.
 *
 * @package		Event Espresso
 * @subpackage	/helpers/EE_Maps.helper.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class EE_Maps {


	/**
	 * creates a Google Map Link
	 * @param  array $atts aray of attributes required for the map link generation
	 * @return string (link to map!)
	 */
	public static function google_map_link($atts) {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		extract($atts);

		$address = "{$address}";
		$city = "{$city}";
		$state = "{$state}";
		$zip = "{$zip}";
		$country = "{$country}";
		$text = isset($text) ? "{$text}" : "";
		$type = isset($type) ? "{$type}" : "";
		$map_w = isset($map_w) ? "{$map_w}" : 400;
		$map_h = isset($map_h) ? "{$map_h}" : 400;
		$id = isset($id) ? $id : 'not_set';
		$map_image_class = isset($map_image_class) ? $map_image_class : 'ee_google_map_view';

		$gaddress = ($address != '' ? $address : '') . ($city != '' ? ',' . $city : '') . ($state != '' ? ',' . $state : '') . ($zip != '' ? ',' . $zip : '') . ($country != '' ? ',' . $country : '');

		$google_map = htmlentities2('http://maps.google.com/maps?q=' . urlencode($gaddress));

		switch ($type) {
			case 'text':
			default:
				$text = $text == '' ? __('Map and Directions', 'event_espresso') : $text;
				break;

			case 'url':
				$text = $google_map;
				break;

			case 'map':
				$google_map_link = '<a class="a_map_image_link" href="' . $google_map . '" target="_blank">' . '<img class="map_image_link" id="venue_map_' . $id . '" ' . $map_image_class . ' src="' . htmlentities2('http://maps.googleapis.com/maps/api/staticmap?center=' . urlencode($gaddress) . '&amp;zoom=14&amp;size=' . $map_w . 'x' . $map_h . '&amp;markers=color:green|label:|' . urlencode($gaddress) . '&amp;sensor=false') . '" /></a>';
				return $google_map_link;
		}

		$google_map_link = '<a href="' . $google_map . '" target="_blank">' . $text . '</a>';
		return $google_map_link;
	}
} //end clas EE_Maps