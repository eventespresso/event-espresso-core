<?php
/**
 * get categories
 *
 * @param 		string		$cat_identifier
 * @param 		string 		$css_class
 * @return 		array
 */
function espresso_event_list_get_category($cat_identifier = FALSE) {

	global $wpdb, $org_options;
	// error logging
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

	$category = FALSE;
//	echo '<h1>$cat_identifier : ' . $cat_identifier . '</h1>'; die();

	if ($cat_identifier) {

		$SQL = 'SELECT * FROM ' . EVENTS_CATEGORY_TABLE . ' WHERE category_identifier = %s';
		if ($categories = $wpdb->get_results($wpdb->prepare($SQL, $cat_identifier))) {
			$category = $categories[0];
		}
//		echo '<h1>$categories</h1>';
//		echo pre_arr($category);
	}

	return $category;
}

/**
 * get_venues
 *
 * @return 		array 		on success
 * @return 		FALSE 		on fail
 */
function espresso_event_list_get_venues() {

	global $wpdb;

	$SQL = 'SELECT * FROM ' . EVENTS_VENUE_TABLE . ' ORDER BY name, id ASC';
	$venues = $wpdb->get_results($SQL, OBJECT_K);
	return $venues;
}



