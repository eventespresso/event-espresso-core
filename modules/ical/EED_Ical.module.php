<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * Event List
 *
 * @package			Event Espresso
 * @subpackage	/modules/ical/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EED_Ical  extends EED_Module {

	/**
	 * 	set_hooks - for hooking into EE Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
		// create download buttons
		add_filter( 'FHEE__espresso_list_of_event_dates__datetime_html', array( 'EED_Ical', 'generate_add_to_iCal_button' ), 10, 2 );
		 // process ics download request
		EE_Config::register_route( 'download_ics_file', 'EED_Ical', 'download_ics_file' );
	}

	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
	}



	/**
	 * 	run - initial module setup
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function run( $WP ) {}




	/**
	 * 	generate_add_to_iCal_button
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function generate_add_to_iCal_button( $html, $datetime ) {
		if ( $datetime instanceof EE_Datetime ) {
			$action = add_query_arg( array( 'ee' => 'download_ics_file', 'ics_id' => $datetime->ID() ), site_url() );
			$ical = '<form id="download_iCal_" action="' . $action . '" method="post" >';
			$ical .= '<input type="submit" value="<span class="dashicons dashicons-calendar"></span>' . __( 'Download iCal', 'event_espresso' ) . '"/>';
			$ical .= '</form>';
		}
		return $html;
	}




	/**
	 * 	download_ics_file
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function download_ics_file() {
		if ( EE_Registry::instance()->REQ->is_set( 'ics_id' )) {
			$DTT_ID = EE_Registry::instance()->REQ->get( 'ics_id' );
			EE_Registry::instance()->load_model( 'Datetime' );
			if ( $datetime = EEM_Datetime::instance()->get_one_by_ID( $DTT_ID )) {
				printr( $datetime, '$datetime  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			}
		}
	}



 
	/**
	 * 	iCal
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function iCal() {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		$name = EE_Registry::instance()->REQ->get( 'event_summary' ) . ".ics";
		$output = "BEGIN:VCALENDAR\n" .
						"PRODID:-//xyz Corp//NONSGML PDA Calendar Version 1.0//EN\n" .
						"VERSION:2.0\n" .
						"BEGIN:VEVENT\n" .
						"DTSTAMP:" . EE_Registry::instance()->REQ->get( 'currentyear' ) . EE_Registry::instance()->REQ->get( 'currentmonth' ) . EE_Registry::instance()->REQ->get( 'currentday' ) . "T" . EE_Registry::instance()->REQ->get( 'currenttime' ) . "\n" .
						"UID:" . EE_Registry::instance()->REQ->get( 'attendee_id' ) . "@" . EE_Registry::instance()->REQ->get( 'event_id' ) . "\n" .
						"ORGANIZER:MAILTO:" . EE_Registry::instance()->REQ->get( 'contact' ) . "\n" .
						"DTSTART:" . EE_Registry::instance()->REQ->get( 'startyear' ) . EE_Registry::instance()->REQ->get( 'startmonth' ) . EE_Registry::instance()->REQ->get( 'startday' ) . "T" . EE_Registry::instance()->REQ->get( 'starttime' ) . "\n" .
						"DTEND:" . EE_Registry::instance()->REQ->get( 'endyear' ) . EE_Registry::instance()->REQ->get( 'endmonth' ) . EE_Registry::instance()->REQ->get( 'endday' ) . "T" . EE_Registry::instance()->REQ->get( 'endtime' ) . "\n" .
						"STATUS:CONFIRMED\n" .
						"CATEGORIES:" . EE_Registry::instance()->REQ->get( 'event_categories' ) . "\n" .
						"SUMMARY:" . EE_Registry::instance()->REQ->get( 'event_summary' ) . "\n" .
						"DESCRIPTION:" . EE_Registry::instance()->REQ->get( 'event_description' ) . "\n" .
						"END:VEVENT\n" .
						"END:VCALENDAR";
		if (ob_get_length())
			echo('Some data has already been output, can\'t send PDF file');
		header('Content-Type: application/x-download');
		if (headers_sent())
			echo('Some data has already been output, can\'t send PDF file');
		header('Content-Length: ' . strlen($output));
		header('Content-Disposition: attachment; filename="' . $name . '"');
		header('Cache-Control: private, max-age=0, must-revalidate');
		header('Pragma: public');
		header('Content-Type: application/octet-stream');
		header('Content-Type: application/force-download');
		header('Content-type: application/pdf');
		header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
		header("Content-Transfer-Encoding: binary");
		header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past
		ini_set('zlib.output_compression', '0');
		echo $output;
		die();
	}



	/**
	 * 	prepare
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function prepare( $attendee_id ) {
		global $wpdb;
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		$sql = "SELECT ea.event_id, ed.start_date, ed.end_date, ed.event_name, ed.event_desc, ea.event_time, ea.end_time FROM " . EVENTS_ATTENDEE_TABLE . " ea";
		$sql .= " JOIN " . EVENTS_DETAIL_TABLE . " ed ON ea.event_id = ed.id";
		$sql .= " WHERE ea.id = '" . $attendee_id . "'";
		$data = $wpdb->get_row($sql, OBJECT);
		$contact = EE_Registry::instance()->CFG->contact_email;
		$start_date = strtotime($data->start_date . ' ' . $data->event_time);
		$end_date = strtotime($data->end_date . ' ' . $data->end_time);
		$sql = "SELECT ec.category_name FROM " . EVENTS_CATEGORY_TABLE . " ec ";
		$sql .= "JOIN " . EVENTS_CATEGORY_REL_TABLE . " ecr ON ec.id = ecr.cat_id ";
		$sql .= "WHERE ecr.event_id = '" . $data->event_id . "'";
		$cats = $wpdb->get_col($sql);
		$categories = '';
		foreach ($cats as $cat) {
			$categories .= $cat . ',';
		}
		$categories = rtrim($categories, ',');
		$action = strpbrk($_SERVER['REQUEST_URI'], '?') ? $_SERVER['REQUEST_URI'] . "&iCal=true" : $_SERVER['REQUEST_URI'] . "?iCal=true";
		$output = "<form id='view_form' action='" . $action . "' method='post' >";
		$output .= "<input style='display:none;' name='currentyear' type='text' value='" . date('Y') . "' >";
		$output .= "<input style='display:none;' name='currentmonth' type='text' value='" . date('m') . "' >";
		$output .= "<input style='display:none;' name='currentday' type='text' value='" . date('d') . "' >";
		$output .= "<input style='display:none;' name='currenttime' type='text' value='" . date('His') . "' >";
		$output .= "<input style='display:none;' name='attendee_id' type='text' value='" . $attendee_id . "' >";
		$output .= "<input style='display:none;' name='event_id' type='text' value='" . $data->event_id . "' >";
		$output .= "<input style='display:none;' name='contact' type='text' value='" . $contact . "' >";
		$output .= "<input style='display:none;' name='startyear' type='text' value='" . date('Y', $start_date) . "' >";
		$output .= "<input style='display:none;' name='startmonth' type='text' value='" . date('m', $start_date) . "' >";
		$output .= "<input style='display:none;' name='startday' type='text' value='" . date('d', $start_date) . "' >";
		$output .= "<input style='display:none;' name='starttime' type='text' value='" . date('His', $start_date) . "' >";
		$output .= "<input style='display:none;' name='endyear' type='text' value='" . date('Y', $end_date) . "' >";
		$output .= "<input style='display:none;' name='endmonth' type='text' value='" . date('m', $end_date) . "' >";
		$output .= "<input style='display:none;' name='endday' type='text' value='" . date('d', $end_date) . "' >";
		$output .= "<input style='display:none;' name='endtime' type='text' value='" . date('His', $end_date) . "' >";
		$output .= "<input style='display:none;' name='event_categories' type='text' value='" . $categories . "' >";
		$output .= "<input style='display:none;' name='event_summary' type='text' value='" . $data->event_name . "' >";
		$output .= "<input style='display:none;' name='event_description' type='text' value='" . $data->event_desc . "' >";
		$output .= "<input id='view_button' type='submit' class='btn_event_form_submit ui-priority-primary ui-state-default ui-corner-all' value='Add to Calendar' >";
		$output .= "</form>";
		echo $output;
	}

	// Converts a unix timestamp to an ics-friendly format
	// NOTE: "Z" means that this timestamp is a UTC timestamp. If you need
	// to set a locale, remove the "\Z" and modify DTEND, DTSTAMP and DTSTART
	// with TZID properties (see RFC 5545 section 3.3.5 for info)
	//
	// Also note that we are using "H" instead of "g" because iCalendar's Time format
	// requires 24-hour time (see RFC 5545 section 3.3.12 for info).
	function dateToCal($timestamp) {
		return date('Ymd\THis\Z', $timestamp);
	}

	/**
	 * 	_escape_ICal_data
	 *
	 *	@access 	public
	 *  	@param	string $string
	 *  	@return	string
	 */
	private function _escape_ICal_data( $string ) {
		return preg_replace( '/([\,;])/', '\\\$1', $string );
	}	
	


}
// End of file EED_Ical.module.php
// Location: /modules/ical/EED_Ical.module.php