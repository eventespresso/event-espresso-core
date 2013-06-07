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
 * espresso_events_Venues_Hooks
 * Hooks various messages logic so that it runs on indicated Events Admin Pages.
 * Commenting/docs common to all children classes is found in the EE_Admin_Hooks parent.
 * 
 *
 * @package		espresso_events_Venues_Hooks
 * @subpackage	caffeinated/admin/new/venues/espresso_events_Venues_Hooks.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class espresso_events_Venues_Hooks extends EE_Admin_Hooks {


	protected $_event;


	public function __construct( EE_Admin_Page $admin_page ) {
		parent::__construct( $admin_page );
	}


	protected function _set_hooks_properties() {
		$this->_name = 'venues';
		$this->_metaboxes = array(
			0 => array(
				'page_route' => array('edit_event', 'add_event'),
				'func' => 'venue_metabox',
				'label' => __('Venue Details', 'event_espresso'),
				'priority' => 'core',
				'context' => 'normal'
				)
		);/**/
	}


	public function venue_metabox() {
		global $org_options;
		$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso'))
		);

		require_once( 'EEM_Venue.model.php' );
		$evt_obj = $this->_adminpage_obj->get_event_obj();

		//first let's see if we have a venue already
		$venues = $evt_obj->venues();
		$venue = empty( $venues ) ? EEM_Venue::create_default_object() : NULL;
		$template_args['_venues'] = $venues;
		$template_args['_venue'] = $venue;
		$template_args['venue_selection'] = $this->_espresso_venue_selector();
		$template_args['org_options'] = $org_options;
		$template_args['enable_for_gmap'] = EE_Form_Fields::select_input('enable_for_gmap', $values, $venue->enable_for_gmap(), 'id="enable_for_gmap"');
		$template_path = empty( $venues ) ? VENUES_TEMPLATE_PATH . 'event_venues_metabox_content.template.php' : VENUES_TEMPLATE_PATH . 'event_venues_metabox_content_from_manager.template.php';
		espresso_display_template( $template_path, $template_args );
	}



	//todo the below will generate the selector for the venues and will take an incoming array of venue objects and will generate some sort of interface for selecting venues.  The thing is, we need to work out some way of listing primary venues with their children (in the case of events that might be in multiple rooms) and have a way for users to select multiple venues for their event.  Much of the query code below will DISAPPEAR.
	//
	//for now we're just returning a reminder TODO

	private function _espresso_venue_selector($venues) {
		return '<strong>TODO:<strong> See <em>' . get_class( $this ) . '</em> class ("_espresso_venue_selector method") for instructions on work needing done here';

		global $wpdb, $espresso_manager, $espresso_wp_user;

		$WHERE = " WHERE ";
		$sql = "SELECT ev.*, el.name AS locale FROM " . EVENTS_VENUE_TABLE . " ev ";
		$sql .= " LEFT JOIN " . EVENTS_LOCALE_REL_TABLE . " lr ON lr.venue_id = ev.id ";
		$sql .= " LEFT JOIN " . EVENTS_LOCALE_TABLE . " el ON el.id = lr.locale_id ";

		if (function_exists('espresso_member_data') && ( espresso_member_data('role') == 'espresso_group_admin' )) {
			if ($espresso_manager['event_manager_venue']) {
				//show only venues inside their assigned locales.
				$group = get_user_meta(espresso_member_data('id'), "espresso_group", true);
				$group = unserialize($group);
				$sql .= " $WHERE lr.locale_id IN (" . implode(",", $group) . ")";
				$sql .= " OR ev.wp_user = " . $espresso_wp_user;
				$WHERE = " AND ";
			}
		}
		$sql .= " GROUP BY ev.id ORDER by name";

		$venues = $wpdb->get_results($sql);
		$num_rows = $wpdb->num_rows;

		if ($num_rows > 0) {
			$field = '<label>' . __('Select from Venue Manager list', 'event_espresso') . '</label>';
			$field .= '<select name="venue_id[]" id="venue_id" class="chzn-select"  >\n';
			$field .= '<option value="0">' . __('Select a Venue', 'event_espresso') . '</option>';
			$div = "";
			$help_div = "";
			$i = 0;
			foreach ($venues as $venue) {

				$i++;
				$selected = $venue->id == $current_value ? 'selected="selected"' : '';
				if ($venue->locale != '') {
					$field .= '<option rel="' . $i . '" ' . $selected . ' value="' . $venue->id . '">' . stripslashes_deep($venue->name) . ' (' . stripslashes_deep($venue->locale) . ') </option>\n';
				} else if ($venue->city != '' && $venue->state != '') {
					$field .= '<option rel="' . $i . '" ' . $selected . ' value="' . $venue->id . '">' . stripslashes_deep($venue->name) . ' (' . stripslashes_deep($venue->city) . ', ' . stripslashes_deep($venue->state) . ') </option>\n';
				} else if ($venue->state != '') {
					$field .= '<option rel="' . $i . '" ' . $selected . ' value="' . $venue->id . '">' . stripslashes_deep($venue->name) . ' (' . stripslashes_deep($venue->state) . ') </option>\n';
				} else {
					$field .= '<option rel="' . $i . '" ' . $selected . ' value="' . $venue->id . '">' . stripslashes_deep($venue->name) . ' </option>\n';
				}

				$hidden = "display:none;";
				if ($selected)
					$hidden = '';
				$div .= "
	<fieldset id='eebox_" . $i . "' class='eebox' style='" . $hidden . "'>
		<ul class='address-view'>
			<li>
				<p><span>Address:</span> " . stripslashes($venue->address) . "<br/>
				<span></span> " . stripslashes($venue->address2) . "<br/>
				<span>City:</span> " . stripslashes($venue->city) . "<br/>
				<span>State:</span> " . stripslashes($venue->state) . "<br/>
				<span>Zip:</span> " . stripslashes($venue->zip) . "<br/>
				<span>Country:</span> " . stripslashes($venue->country) . "<br/>
				<span>Venue ID:</span> " . $venue->id . "<br/></p>
				This venues shortcode <b class='highlight'>[ESPRESSO_VENUE id='" . $venue->id . "']</b><br/>";
				$div .= '<a href="admin.php?page=espresso_venues&action=edit&id=' . $venue->id . '" target="_blank">' . __('Edit this venue', 'event_espresso') . '</a> | <a class="thickbox link" href="#TB_inline?height=300&width=400&inlineId=venue_info">Shortcode</a></li></ul>';
				$div .= "</fieldset>";
			}
			$field .= "</select>";
			ob_start();
			?>
			<script>
				jQuery("#venue_id").change( function(){
					var selected = jQuery("#venue_id option:selected");
					var rel = selected.attr("rel");
					jQuery(".eebox").hide();
					jQuery("#eebox_"+rel).show();
				});
			</script>
			<?php
			$js = ob_get_contents();
			ob_end_clean();
			$html = '<table><tr><td>' . $field . '</td></tr><tr><td>' . $div . '</td></tr></table>' . $js;
			return $html;
		}
	}

} //end espresso_events_Venues_Hooks class