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
 * espresso_events_Pricing_Hooks
 * Hooks various messages logic so that it runs on indicated Events Admin Pages.
 * Commenting/docs common to all children classes is found in the EE_Admin_Hooks parent.
 * 
 *
 * @package		espresso_events_Pricing_Hooks
 * @subpackage	caffeinated/admin/new/pricing/espresso_events_Pricing_Hooks.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class espresso_events_Pricing_Hooks extends EE_Admin_Hooks {

	protected function _set_hooks_properties() {
		$this->_name = 'pricing';
		//if we were going to add our own metaboxes we'd use the below.
		/*$this->_metaboxes = array(
			0 => array(
				'page_route' => 'edit_event',
				'func' => 'pricing_metabox',
				'label' => __('Event Pricing', 'event_espresso'),
				'priority' => 'core',
				'context' => 'normal'
				),

			);*/
		$this->_scripts_styles = array(
			'registers' => array(
				'ee-prices-event-editor' => array(
					'url' => PRICING_ASSETS_URL . 'event_editor_prices.js',
					'depends' => array('event_editor_js', 'ee-serialize-full-array')
					)
				),
			'enqueues' => array(
				'ee-prices-event-editor' => array( 'edit', 'create_new' )
				),
			'localize' => array(
				'ee-prices-event-editor' => array(
					'PRICE_METABOX_ITEMS' => array(
						'adding_price_error' => __('There was a problem with adding the price.  No new price was generated', 'event_espresso')
						)
					)
				)
			);

		$this->_ajax_func = array(
			'ee_price_add_new_editor_row' => 'get_new_row'
			);
	
		add_filter('FHEE_show_no_event_price_msg', array($this, 'no_price_message' ), 10 );
		add_filter('FHEE__Events_Admin_Page__pricing_metabox_show_no_price_message_error', array( $this, 'no_price_warning' ), 10 );
		add_filter('FHEE_events_pricing_meta_box_row_template', array( $this, 'new_price_row_template' ), 10 );
		add_filter('FHEE_events_pricing_meta_box_main_template', array( $this, 'new_price_main_template'), 10 );

	}




	public function edit_event_AHEE_metaboxes() {
		//if we were going to remove the default metabox we'd add this.
		//remove_meta_box( 'espresso_event_editor_pricing', $this->_adminpage_obj->get_current_screen()->id, 'normal' );
		return;
	}



	public function new_price_row_template( $template ) {
		return PRICING_TEMPLATE_PATH . 'edit_ticket_price_content_row.template.php';
	}



	public function new_price_main_template( $template ) {
		return PRICING_TEMPLATE_PATH . 'event_ticket_price_content.template.php';
	}



	public function no_price_message( $message ) {
		return sprintf( __('Please enter at lease one Event Price for this Event, or one Default Event Price to ensure that this Event displays and functions properly. Default Event Prices can be set on the %sPricing Management%s.', 'event_espresso'), '<a href="' . admin_url( 'admin.php?page=espresso_pricing' ). '">', '</a>' );
	}



	public function no_price_warning( $message ) {
		return __('There are currently no Prices set for this Event. Please see the Event Pricing section for more details.', 'event_espresso');
	}


	public function get_new_row() {
		global $org_options;
		$price_obj = $this->EE->load_model('Price')->create_default_object();
		$price_data = $this->_req_data['new_ticket_price'];

		//some things can only be set from known prices so let's get prices matching the incoming prt and event.
		$existing_prices = $this->EE->load_model('Price')->get_all(array(array( 'EVT_ID' => $price_data['EVT_ID'], 'PRT_ID' => $price_data['PRT_ID'] ), 'order_by' => array('PRC_order' => 'ASC' ) ) );

		//figure out PRC_order .. since we have this already ordered we can pop off the last price in the array.
		$last_price = array_pop($existing_prices);
		$PRC_order = is_object( $last_price ) ? $last_price->get('PRC_order') + 1 : 0;

		//get the price type object for this price
		$price_type_obj = $this->EE->load_model('Price_Type')->get_one_by_ID( $price_data['PRT_ID'] );
		
		
		//let's set the related values on the price object
		$price_obj->set( 'PRT_ID', $price_data['PRT_ID'] );
		$price_obj->set( 'EVT_ID', $price_data['EVT_ID'] );
		$price_obj->set( 'PRC_order', $PRC_order);
		$price_obj->set( 'PRC_name', $price_data['PRC_name'] );
		$price_obj->set( 'PRC_desc', $price_data['PRC_desc'] );
		$price_obj->set( 'PRC_amount', $price_data['PRC_amount'] );
		$price_obj->set( 'PRC_reg_limit', $price_data['PRC_reg_limit'] );
		$price_obj->set( 'PRC_start_date', $price_data['PRC_start_date'] );
		$price_obj->set( 'PRC_end_date', $price_data['PRC_end_date'] );
		$price_obj->set( 'PRC_is_active', isset( $price_data['PRC_is_active'] ) ? $price_data['PRC_is_active'] : 1 );


		//okay now we can set our row args

		$row_args['row'] = $this->_req_data['rownum'];
		$row_args['price'] = $price_obj;
		$row_args['disabled'] = ! $price_obj->is_active() ? ' disabled="disabled"' : '';
		$row_args['disabled_class'] = ! $price_obj->is_active() ? ' input-disabled' : '';
		$row_args['inactive'] = ! $price_obj->is_active() ? '<span class="inactive-price">'.__('inactive price - edit advanced settings to reactivate', 'event_espresso').'</span>' : FALSE;
		$row_args['is_percent'] = $price_type_obj->is_percent();
		$row_args['org_options'] = $org_options;

		$today = time();
		if ( $today < $price_obj->start() ){
			$price_date_status = '<a title="'. __('This Event Price option is not yet active', 'event_espresso') . '"><img src="'.EVENT_ESPRESSO_PLUGINFULLURL.'images/timer-pending-16x22.png" width="16" height="22" alt="'. __('This Event Price option is not yet active', 'event_espresso') . '" class="price-date-status-img"/></a>';					
		} elseif ( $today > $price_obj->start() && $today < $price_obj->end() ) {
			$price_date_status = '<a title="'. __('This Event Price option is currently active', 'event_espresso') . '"><img src="'.EVENT_ESPRESSO_PLUGINFULLURL.'images/timer-active-16x22.png" width="16" height="22" alt="'. __('This Event Price option is currently active', 'event_espresso') . '" class="price-date-status-img"/></a>';					
		} else {
			$price_date_status = '<a title="'. __('This Event Price option has expired', 'event_espresso') . '"><img src="'.EVENT_ESPRESSO_PLUGINFULLURL.'images/timer-expired-16x22.png" width="16" height="22" alt="'. __('This Event Price option has expired', 'event_espresso') . '" class="price-date-status-img"/></a>';
			$row_args['disabled'] = ' disabled="disabled"'; 
			$row_args['disabled_class'] = ' input-disabled'; 
			$row_args['inactive'] = '<span class="inactive-price">'.__('This Event Price option has expired - edit advanced settings to reactivate', 'event_espresso').'</span>';
		}

		$row_args['EVT_ID'] = $price_obj->get('EVT_ID');
		$row_args['type_label'] = $price_type_obj->name() . ' ' . $price_date_status;
		$row_args['price_amount'] = $price_type_obj->is_percent() ? number_format( $price_obj->amount(), 1 ) : number_format( $price_obj->amount(), 2 );


		$all_PRTs = $this->EE->load_model('Price_Type')->get_all();
		foreach ($all_PRTs as $type) {
			$all_price_types[] = array( 'id' => $type->ID(), 'text' => $type->name(), 'order' => $type->order() );
			if ( $type->is_global() ) {
				$global_price_types[ $type->ID() ] = $type;
			} else {
				$price_types[] = array( 'id' => $type->ID(), 'text' => $type->name(), 'order' => $type->order() );
			}						
		}


		$select_name = 'edit_ticket_price['. $this->_req_data['rownum'] .'][PRT_ID]';
		$row_args['edit_ticket_price_select'] =EE_Form_Fields::select_input( $select_name, $all_price_types, $price_obj->type(), 'id="edit-ticket-price-type-ID-'.$this->_req_data['rownum'].'" style="width:auto;"', 'edit-ticket-price-input' );
		$row_args['price_type'] = isset( $global_price_types[$price_obj->type()] ) ? $global_price_types[$price_obj->type()]->is_global() : FALSE;
		$row_args['counter'] = count( $existing_prices ) + 1; //added one because we popped off a price earlier remember?

		//k load the template and give it the row args
		$row_template = $this->new_price_row_template('');
		$template_args['data']['what'] = espresso_display_template( $row_template, $row_args, TRUE );

		$this->_set_page_object();
		$this->_page_object->set_template_args( $template_args );	
		$this->_page_object->return_json();
	}



} //end class espresso_events_Pricing_Hooks