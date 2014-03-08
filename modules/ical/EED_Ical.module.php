<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package		Event Espresso
 * @ author			Event Espresso
 * @ copyright	(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license		http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link				http://www.eventespresso.com
 * @ version		 	EE4
 *
 * ------------------------------------------------------------------------
 *
 * Event List
 *
 * @package		Event Espresso
 * @subpackage	/modules/ical/
 * @author		Brent Christensen 
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
		// first verify a proper datetime object has been received
		if ( $datetime instanceof EE_Datetime ) {
			// set whether a link or submit button is shown
			$iCal_type = apply_filters( 'FHEE__EED_Ical__generate_add_to_iCal_button__iCal_type', 'submit' );
			// generate a link to the route we registered in set_hooks()
			$URL = add_query_arg( array( 'ee' => 'download_ics_file', 'ics_id' => $datetime->ID() ), site_url() );
			// what type ?
			switch ( $iCal_type ) {
				// submit buttons appear as buttons and are very caompatible with a theme's style
				case 'submit' :
					$ical = '<form id="download-iCal-frm-' . $datetime->ID() . '" class="download-iCal-frm" action="' . $URL . '" method="post" >';
					$ical .= '<input type="submit" class="ee-ical-sbmt" value="' . esc_attr( '&#xf145;' ) . '" title="' . __( 'Add to iCal Calendar', 'event_espresso' ) . '"/>';
					$ical .= '</form>';
					break;
				// buttons are just links that have been styled to appear as buttons, but may not be blend with a theme as well as submit buttons
				case 'button' :
					$ical = '<a class="ee-ical-btn small ee-button ee-roundish" href="' . $URL . '" title="' . __( 'Add to iCal Calendar', 'event_espresso' ) . '">';
					$ical .= ' <span class="dashicons dashicons-calendar"></span>';
					$ical .= '</a>';
					break;
				// links are just links that use the calendar dashicon
				case 'icon' :
					$ical = '<a class="ee-ical-lnk" href="' . $URL . '" title="' . __( 'Add to iCal Calendar', 'event_espresso' ) . '">';
					$ical .= ' <span class="dashicons dashicons-calendar"></span>';
					$ical .= '</a>';
					break;
			}
			$html .= $ical;
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
			$datetime = EE_Registry::instance()->load_model( 'Datetime' )->get_one_by_ID( $DTT_ID );
			if ( $datetime instanceof EE_Datetime ) {
				// get related event, venues, and event categories
				$event = $datetime->event();
				// get related category Term object and it's name
				$category = $event->first_event_category();
				if ( $category instanceof EE_Term ) {
					$category = $category->name();
				}
				$location = '';
				// get first related venue and convert to CSV string
				$venue = $event->venues(array( 'limit'=>1 ));
				if ( is_array( $venue ) && ! empty( $venue )) {
					 EE_Registry::instance()->load_helper( 'Venue_View' );
					$location = espresso_venue_address( 'inline', $venue->ID(), FALSE );
				}
				// set variables, escape strings, convert timestamps to ics format, etc
				$filename = $event->slug() . '-' . $datetime->start_date( 'Y-m-d' ) . '.ics';
				$organizer = EED_Ical::_escape_ICal_data( EE_Registry::instance()->CFG->organization->name );
				$UID = EED_Ical::_escape_ICal_data( md5( $event->name() . $event->ID() . $datetime->ID() ));
				$org_email = EED_Ical::_escape_ICal_data( $datetime->ID() );
				$timestamp = date( 'Ymd\THis\Z' );
				$location = EED_Ical::_escape_ICal_data( $location );
				$summary = EED_Ical::_escape_ICal_data( wp_trim_words( $event->description() ));
				$description = EED_Ical::_escape_ICal_data( wp_strip_all_tags( $event->description() ));
				$status = EED_Ical::_escape_ICal_data( $datetime->get_active_status() );
				$categories = EED_Ical::_escape_ICal_data( $category );
				$url = EED_Ical::_escape_ICal_data( get_permalink( $event->ID() ));
				$dtt_start = EED_Ical::_escape_ICal_data( $datetime->start_date_and_time( 'Ymd\THis\Z' ));
				$dtt_end = EED_Ical::_escape_ICal_data( $datetime->end_date_and_time( 'Ymd\THis\Z' ));
				// set headers
				header( 'Content-type: text/calendar; charset=utf-8' );
				header( 'Content-Disposition: attachment; filename="' . $filename . '"' );
				header( 'Cache-Control: private, max-age=0, must-revalidate' );
				header( 'Pragma: public' );
				header( 'Content-Type: application/octet-stream' );
				header( 'Content-Type: application/force-download' );
				header( 'Cache-Control: no-cache, must-revalidate' );
				header( 'Content-Transfer-Encoding: binary' );
				header( 'Expires: Sat, 26 Jul 1997 05:00:00 GMT' ); // past date
				ini_set( 'zlib.output_compression', '0' );
				// echo the output
				echo "BEGIN:VCALENDAR" . PHP_EOL;
				echo "VERSION:2.0" . PHP_EOL;
				echo "PRODID:-//{$organizer}//NONSGML PDA Calendar Version 1.0//EN" . PHP_EOL;
				echo "CALSCALE:GREGORIAN" . PHP_EOL;
				echo "BEGIN:VEVENT" . PHP_EOL;
				echo "UID:{$UID}" . PHP_EOL;
				echo "ORGANIZER:MAILTO:{$org_email}" . PHP_EOL;
				echo "DTSTAMP:{$timestamp}" . PHP_EOL;
				echo "LOCATION:{$location}" . PHP_EOL;
				echo "SUMMARY:{$summary}" . PHP_EOL;
				echo "DESCRIPTION:{$description}" . PHP_EOL;
				echo "STATUS:{$status}" . PHP_EOL;
				echo "CATEGORIES:{$categories}" . PHP_EOL;
				echo "URL;VALUE=URI:{$url}" . PHP_EOL;
				echo "DTSTART:{$dtt_start}" . PHP_EOL;
				echo "DTEND:{$dtt_end}" . PHP_EOL;
				echo "END:VEVENT" . PHP_EOL;
				echo "END:VCALENDAR" . PHP_EOL;
			}
		}
		die();
	}



	/**
	 * 	_escape_ICal_data
	 *
	 *	@access 	private
	 *  	@param	string $string
	 *  	@return	string
	 */
	private static function _escape_ICal_data( $string = '' ) {
		return preg_replace( '/([\,;])/', '\\\$1', $string );
	}	



}
// End of file EED_Ical.module.php
// Location: /modules/ical/EED_Ical.module.php