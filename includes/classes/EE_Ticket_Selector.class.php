<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package		Event Espresso
 * @ author			Seth Shoultes
 * @ copyright	(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link				http://www.eventespresso.com
 * @ version		3.2
 *
 * ------------------------------------------------------------------------
 *
 * Ticket Selector  class
 *
 * @package		Event Espresso
 * @subpackage	includes/classes/EE_Ticket_Selector.class.php
 * @author			Brent Christensen
 * @author			Sidney Harell
 *
 * ------------------------------------------------------------------------
 */
class EE_Ticket_Selector extends EE_BASE {

	/**
	* event that ticket selector is being generated for
	*
	* @access protected
	* @var array
	*/
	protected $_event = NULL;







	/**
	* 	@Constructor
	* 	@access 		public
	* 	@param		object 			$event  
	* 	@return 		void
	*/
	public function __construct( $event = FALSE ) {
	
		if ( ! $event ) {
			global $espresso_notices;
			$espresso_notices['errors'][] = 'An Event ID was not supplied.';
			return FALSE;
		}

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
		
		$this->_PRC_MDL = EEM_Price::instance();
		$this->_PRT_MDL = EEM_Price_Type::instance();
		
		$this->_get_all_event_prices_and_modifiers( $EVT_ID );
		$this->_get_final_event_ticket_prices();
		
		return $this->_all_event_prices;

	}




	/**
	 * creates buttons for selcting number of attendees for an event
	 *
	 * @param 		int 		$event_id
	 * @return 		string	
	 */
	function espresso_ticket_selector($event) {
		
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		
		add_action( 'wp_footer', 'espresso_load_tckt_slctr_js' );

		$template_args = array();

		if (!isset($event->additional_limit) or $event->additional_limit == '') {
			$event->additional_limit = $event->reg_limit;
		}

		// make it at least 1
		$event->additional_limit = ( $event->additional_limit == 0 ) ? 1 : $event->additional_limit;

		// let's make the max amount of attendees somebody can select a little more reasonable
		if ($event->additional_limit > 16) {
			$max_atndz = 16;
		} else {
			$max_atndz = $event->additional_limit;
		}
		
		$template_args['event_id'] = $event->id;
		$template_args['event_name'] = $event->event_name;
		$template_args['require_pre_approval'] = $event->require_pre_approval;

		$template_args['max_atndz'] = $max_atndz;

		$template_args['dates'] = is_array($event->recurring_events) ? $event->recurring_events : $event->datetimes;
		$template_args['dates'] = espresso_format_date($template_args['dates']);

		$template_args['times'] = espresso_process_event_times($event->datetimes);
		$template_args['datetimes'] = espresso_process_event_datetimes($event->datetimes);
		$template_args['multiple_time_options'] = count($template_args['times']) > 1 ? TRUE : FALSE;
	//	echo printr( $template_args['times'], 'times <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span>', 'auto' );
	//	echo printr( $event->datetimes, 'event->datetimes <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span>', 'auto' );

		$template_args['prices'] = espresso_process_event_prices($event->prices, $event->currency_symbol, 'included');
		$template_args['multiple_price_options'] = count($template_args['prices']) > 1 ? TRUE : FALSE;
	//	echo printr($event->prices, 'event->prices <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span>', 'auto' );
		
		// had problems with event desc not playing nice with serialize so....
		//$all_meta = array_map('wp_strip_all_tags', $event->reg_btn['all_meta']);
		//$template_args['meta'] = serialize( $all_meta );
		//$template_args['meta'] = base64_encode(serialize($all_meta));
		$template_args['meta_keys'] = empty($event->meta_keys) ? array() : $event->meta_keys;
		array_walk_recursive( $event->meta_values, 'espresso_apply_htmlentities' );
		$template_args['meta_values'] = empty($event->meta_values) ? array() : $event->meta_values;


		$template_args['currency_symbol'] = $event->currency_symbol;
		
		$templates['ticket_selector'] =  EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/ticket_selector/ticket_selector_chart.template.php';
	//	$templates['ticket_selector'] =  EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/ticket_selector/ticket_selector_multi_selects.template.php';
	//	$templates['ticket_selector'] =  EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/ticket_selector/ticket_selector_threaded_chart.template.php';
		espresso_display_template($templates['ticket_selector'], $template_args);

	}








}






// End of file EE_Ticket_Selector.class.php
// Location: /includes/classes/EE_Ticket_Selector.class.php