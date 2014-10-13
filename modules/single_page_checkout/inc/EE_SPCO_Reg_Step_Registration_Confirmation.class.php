<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
 /**
 *
 * Class EE_SPCO_Reg_Step_Registration_Confirmation
 *
 * Description
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since 				4.5.0
 *
 */
class EE_SPCO_Reg_Step_Registration_Confirmation extends EE_SPCO_Reg_Step {

	/**
	 *    class constructor
	 *
	 * @access    public
	 * @param    EE_Checkout $checkout
	 * @return 	\EE_SPCO_Reg_Step_Registration_Confirmation
	 */
	public function __construct( EE_Checkout $checkout ) {
		$this->_slug = 'registration_confirmation';
		$this->_name = __('Registration Confirmation', 'event_espresso');
		$this->_template = SPCO_TEMPLATES_PATH . 'registration_page_confirmation.template.php';
		$this->checkout = $checkout;
	}



	public function translate_js_strings() {

	}

	public function enqueue_styles_and_scripts() {

	}



	/**
	 * @return boolean
	 */
	public function initialize_reg_step() {

	}



	/**
	 * @return string
	 */
	public function generate_reg_form() {


		EE_Registry::instance()->REQ->add_output(
			'<br/><h5 style="color:#2EA2CC;">' . __CLASS__ . '<span style="font-weight:normal;color:#0074A2"> -> </span>' . __FUNCTION__ . '() <br/><span style="font-size:9px;font-weight:normal;color:#666">' . __FILE__ . '</span>    <b style="font-size:10px;color:#333">  ' . __LINE__ . ' </b></h5>'
		);
		$from_admin = is_admin();

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		//d($this->checkout->cart);
		EE_Registry::instance()->load_helper( 'Form_Fields' );
		EE_Registry::instance()->load_helper( 'Template' );
		EE_Registry::instance()->load_class( 'Question_Form_Input', array(), FALSE, FALSE, TRUE );

		$event_queue = array();
		$total_items = 0;
		$ticket_count = array();
		$payment_required = FALSE;

		$sold_out_events = array();
		$events_requiring_pre_approval = array();
		$additional_event_attendees = array();
		//		$events_that_use_coupon_codes = array();
		//		$events_that_use_groupon_codes = array();

		$template_args = array(
			'css_class' => '',
			'confirmation_data' => '',
			'reg_page_discounts_dv_class' => 'hidden',
			'additional_attendee_reg_info' => NULL,
			'whats_in_the_cart' => '',
			'prmy_att_input_name' => NULL
		);

		$event_queue['title'] = __('Registrations', 'event_espresso');
		$additional_attendee_forms = FALSE;

		d($this->checkout);

		$registrations  =  $this->checkout->transaction->registrations( array(), TRUE );
		// grab the saved registrations from the transaction
		if ( $this->checkout->transaction instanceof EE_Transaction && $registrations !== NULL ) {

			//d( $this->checkout->transaction );
			$event_queue['has_items'] = TRUE;
			$prev_event = NULL;

			foreach ( $registrations as $registration ) {

				if ( $registration->event()->is_sold_out() || $registration->event()->is_sold_out( TRUE )) {
					// add event to list of events that are sold out
					$sold_out_events[ $registration->event()->ID() ] = '<li><span class="dashicons dashicons-marker ee-icon-size-16 pink-text"></span>' . $registration->event()->name() . '</li>';
				}
				$payment_required  = $registration->status_ID() == EEM_Registration::status_id_pending_payment || $registration->status_ID() == EEM_Registration::status_id_approved ? TRUE : $payment_required;
				if ( ! $payment_required ) {
					// add event to list of events with pre-approval reg status
					$events_requiring_pre_approval[ $registration->event()->ID() ] = '<li><span class="dashicons dashicons-marker ee-icon-size-16 orange-text"></span>' . $registration->event()->name() . '</li>';
				}

				$line_item_ID = $registration->reg_url_link();
				$event_queue['items'][ $line_item_ID ]['ticket'] = $registration->ticket();
				$event_queue['items'][ $line_item_ID ]['event'] = $registration->event();
				$event_queue['items'][ $line_item_ID ]['reg_count'] = $registration->count();
				$total_items ++;
				$ticket_count[ $registration->ticket()->ID() ] = isset( $ticket_count[ $registration->ticket()->ID() ] ) ? $ticket_count[ $registration->ticket()->ID() ] + 1 : 1;

				$question_meta = array(
					'EVT_ID' => $registration->event()->ID(),
					'att_nmbr' => $registration->count(),
					'ticket_id' => $registration->ticket()->ID(),
					'input_name' =>  '[' . $line_item_ID . ']',
					'input_id' => $line_item_ID,
					'input_class' => 'ee-reg-page-questions' . $template_args['css_class']
				);

				$Question_Groups = EE_Registry::instance()->load_model( 'Question_Group' )->get_all( array(
					array(
						'Event.EVT_ID' => $registration->event()->ID(),
						'Event_Question_Group.EQG_primary' => $registration->count() == 1 ? TRUE : FALSE
					),
					'order_by'=>array( 'QSG_order'=>'ASC' )
				));

				foreach ( $Question_Groups as $QSG_ID => $Question_Group ) {
					$where = array( 'QST_deleted' => 0 );
					if ( ! $from_admin ) {
						$where['QST_admin_only'] = 0;
					}
					$Questions = $Question_Group->get_many_related( 'Question', array( $where, 'order_by'=>array( 'Question_Group_Question.QGQ_order' =>'ASC' )));
					foreach ( $Questions as $Question ) {
						if( $Question instanceof EE_Question ){
							// if this question was for an attendee detail, then check for that answer
							$answer_value = EEM_Answer::instance()->get_attendee_property_answer_value( $registration, $Question->ID() );
							$answer = $this->checkout->reg_url_link || ! $answer_value ? EEM_Answer::instance()->get_one( array( array( 'QST_ID'=>$Question->ID(), 'REG_ID'=>$registration->ID() ))) : NULL;
							// if NOT returning to edit an existing registration OR if this question is for an attendee property OR we still don't have an EE_Answer object
							if( ! $this->checkout->reg_url_link || $answer_value || ! $answer instanceof EE_Answer ) {
								// create an EE_Answer object for storing everything in
								$answer = EE_Answer::new_instance ( array(
									'QST_ID'=> $Question->ID(),
									'REG_ID'=> $registration->ID()
								));
							}
							// verify instance
							if( $answer instanceof EE_Answer ){
								if ( ! empty( $answer_value )) {
									$answer->set( 'ANS_value', $answer_value );
								}
								$question_meta['attendee'][ $Question->is_system_question() ? $Question->system_ID() : $Question->ID() ] = $answer->value();
								$answer->cache( 'Question', $Question );
								$answer_cache_id =$Question->system_ID() != NULL ? $Question->system_ID() . '-' . $line_item_ID : $Question->ID() . '-' . $line_item_ID;
								//								echo '<h4>$answer_cache_id : ' . $answer_cache_id . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
								$registration->cache( 'Answer', $answer, $answer_cache_id );
							}
							$Question_Groups[ $QSG_ID ]->cache( 'Question', $Question );
						}
					}
				}
				//					printr( $registration, '$registration  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

				add_filter( 'FHEE__EEH_Form_Fields__label_html', array( 'EED_Single_Page_Checkout', 'reg_form_form_field_label_wrap' ), 10, 2 );
				add_filter( 'FHEE__EEH_Form_Fields__input_html', array( 'EED_Single_Page_Checkout', 'reg_form_form_field_input__wrap' ), 10, 2 );
				$attendee_questions = EEH_Form_Fields::generate_question_groups_html2( $Question_Groups, $question_meta, $from_admin, 'div' );

				// show this attendee form?
				if ( empty( $attendee_questions )) {
					$event_queue['items'][ $line_item_ID ]['additional_attendee_reg_info'] = '
	<input type="hidden" id="' . $line_item_ID . '-additional_attendee_reg_info" name="qstn[' . $line_item_ID . '][additional_attendee_reg_info]" value="0" />' . "\n";
				} else {
					$additional_attendee_forms = $registration->count() == 1 ? FALSE : TRUE;
					$event_queue['items'][ $line_item_ID ]['additional_attendee_reg_info'] = '';
				}
				$event_queue['items'][ $line_item_ID ]['attendee_questions'] = $attendee_questions;



				// is this the primarary registrant ?
				if ( $registration->count() == 1 ) {
					// grab line item from primary attendee
					$template_args['prmy_att_input_name'] =  $line_item_ID;
				} else {

					// for all  attendees other than the primary attendee
					$additional_event_attendees[ $registration->ticket()->ID() ][ $line_item_ID ] = array(
						'ticket' => $registration->ticket()->name(),
						'att_nmbr' => $registration->count(),
						'input_id' => $line_item_ID,
						'input_name' =>  '[' . $line_item_ID . ']'
					);

					$item_name = $registration->ticket()->name();
					$item_name .= $registration->ticket()->description() != '' ? ' - ' . $registration->ticket()->description() : '';

					// if this is a new ticket OR if this is the very first additional attendee after the primary attendee
					if ( $registration->ticket()->ID() != $prev_event || $registration->count() == 2 ) {
						$additional_event_attendees[ $registration->ticket()->ID() ][ $line_item_ID ]['event_hdr'] = $item_name;
						$prev_event = $registration->ticket()->ID();
					} else {
						// no heading
						$additional_event_attendees[ $registration->ticket()->ID() ][ $line_item_ID ]['event_hdr'] = FALSE;
					}
				}



			}

			if ( ! $this->checkout->reg_url_link ) {
				EE_Registry::instance()->SSN->set_session_data( array( 'transaction' => $this->checkout->transaction ));
			}
			//				echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
			//				EE_Registry::instance()->SSN->update();
			//				d( $this->checkout->transaction );
			//				d( $this->checkout->cart );

		} else {
			// empty
			$event_queue['has_items'] = FALSE;
		}
		// sold_out_events
		$template_args['sold_out_events'] = implode( $sold_out_events );
		$template_args['sold_out_events_msg'] = apply_filters( 'FHEE__Single_Page_Checkout__registration_checkout__sold_out_events_msg', __('It appears that the event you were about to make a payment for has sold out since you first registered. If you have already made a partial payment towards this event, please contact the event administrator for a refund.', 'event_espresso') );
		// events_requiring_pre_approval
		$template_args['events_requiring_pre_approval'] = implode( $events_requiring_pre_approval );
		$template_args['events_requiring_pre_approval_msg'] = apply_filters( 'FHEE__Single_Page_Checkout__registration_checkout__sold_out_events_msg', __('The following events do not require payment at this time and will not be billed during this transaction. Billing will only occur after the attendee has been approved by the event organizer. You will be notified when your registration has been processed. If this is a free event, then no billing will occur.', 'event_espresso') );

		//  GOT COUPONS ?
		$template_args['events_that_use_coupon_codes'] = '';
		$template_args['use_coupon_codes'] = FALSE;

		// Groupons ?
		$template_args['events_that_use_groupon_codes'] = '';
		$template_args['use_groupon_codes'] = FALSE;


		$template_args['spco_reg_page_ajax_coupons_url'] = add_query_arg( array( 'ee' => 'apply_coupon' ), $this->_reg_page_base_url );
		//		$template_args['print_copy_info'] = $additional_attendee_forms || $total_items > 2 ? TRUE : FALSE;
		$template_args['total_items'] = $total_items;
		$template_args['ticket_count'] = $ticket_count;
		$template_args['print_copy_info'] = $additional_attendee_forms;

		//		d($additional_event_attendees);
		$template_args['additional_event_attendees'] = $additional_event_attendees;
		// total monies paid to date
		$total_payments = 0;
		// the original total
		$cart_total_before_tax = $this->checkout->cart->get_cart_total_before_tax();
		// get cart total
		$grand_total = $this->checkout->cart->get_cart_grand_total();
		$template_args['grand_total'] = apply_filters( 'FHEE__EED_Single_Page_Checkout__registration_checkout__grand_total', $grand_total );
		// check if monies are potentially owing
		$template_args['payment_required'] = $cart_total_before_tax > 0 ? $payment_required : FALSE;
		// not a free event?
		if ( $template_args['payment_required'] ) {
			//check for any previous payments
			if ( $template_args['payments'] = $this->checkout->transaction->approved_payments() ) {
				foreach ( $template_args['payments'] as $payment ) {
					if ( $payment instanceof EE_Payment ) {
						// increment total payments
						$total_payments += $payment->amount();
					}
				}
				$template_args['pay_date_frmt'] = get_option('date_format') . ' ' . get_option('time_format');
			}
		} else {
			//unset( self::$_reg_steps['payment_options'] );
			EE_Registry::instance()->SSN->set_session_data( array( 'billing_info' => 'no payment required' ));
			$template_args['payments'] = array();
		}

		$template_args['sub_total'] = $cart_total_before_tax;
		$template_args['taxes'] = $this->checkout->cart->get_taxes_line_item()->children();

		// what's left to pay?
		$amount_owing = $grand_total - $total_payments;
		$template_args['amount_owing'] = apply_filters( 'FHEE__EED_Single_Page_Checkout__registration_checkout__amount_owing', $amount_owing );

		//$template_args['grand_total'] = $template_args['amount_owing'] !== FALSE ? $amount_owing : $grand_total;

		$template_args['total_items'] = $event_queue['total_items'] = $total_items;
		//	d( $event_queue );
		$template_args['event_queue'] = $event_queue;
		$template_args['images_dir_url'] = EE_GLOBAL_ASSETS_URL . 'images/';
		$template_args['reg_url_link'] = $this->checkout->reg_url_link;

		$template_args['return_url'] = add_query_arg( array('ee' => 'event_queue'), $this->_reg_page_base_url );
		$template_args['update_url'] = add_query_arg( array('ee' => 'update_event_queue'), $this->_reg_page_base_url );
		$template_args['register_url'] = add_query_arg( array('ee' => '_register'), $this->_reg_page_base_url );
		$template_args['event_queue_url'] = add_query_arg( array('ee' => 'event_queue'), $this->_reg_page_base_url );

		$template_args['confirmation_data'] = $this->_current_step == 'registration_confirmation' ? $this->_registration_confirmation() : '';

		$step_or_revisit = __('Step ', 'event_espresso');

		if ( $this->_revisit && $this->_current_step == 'attendee_information' ) {
			// Update Registration Details
			$confirmation_btn_text = sprintf( __('Update%1$sRegistration%1$sDetails', 'event_espresso'), '&nbsp;' );
			$confirmation_btn_text = apply_filters( 'FHEE__EED_Single_Page_Checkout__registration_checkout__button_text__update_registration_details', $confirmation_btn_text );
			$step_or_revisit = __('Edit', 'event_espresso');
		} else if ( $this->_revisit && $this->_current_step == 'payment_options' ) {
			// Process Payment
			$confirmation_btn_text = sprintf( __('Process%1$sPayment', 'event_espresso'), '&nbsp;' );
			$confirmation_btn_text = apply_filters( 'FHEE__EED_Single_Page_Checkout__registration_checkout__button_text__process_payment', $confirmation_btn_text );
			$step_or_revisit = '';
		} else {
			// Finalize Registration
			$confirmation_btn_text = sprintf( __('Finalize%1$sRegistration', 'event_espresso'), '&nbsp;' );
			$confirmation_btn_text = apply_filters( 'FHEE__EED_Single_Page_Checkout__registration_checkout__button_text__finalize_registration', $confirmation_btn_text );
		}
		// grand total less than paid but greater than zero ?
		if ( $grand_total < $this->checkout->transaction->paid() && $grand_total > 0 && $this->_next_step == 'payment_options' ) {
			// owing money
			$proceed_to_payment_btn_text = sprintf(
			// & Proceed to Payment
				__('%1$s%2$s%1$sProceed%1$sto%1$sPayment', 'event_espresso'),
				'&nbsp;',  // %1$s
				'&amp;'	// %2$s
			);
			$confirmation_btn_text .=  apply_filters( 'FHEE__EED_Single_Page_Checkout__registration_checkout__button_text__and_proceed_to_payment', $proceed_to_payment_btn_text );
		}
		add_action( 'AHEE__SPCO_after_reg_step_form', array( $this, 'add_extra_finalize_registration_inputs' ), 10, 2 );

		$template_args['from_admin'] = $from_admin;

		//if in admin we exit at this point and display the questions template
		if ( $from_admin ) {
			//some custom template args
			$template_args['step_dv_class'] = '';
			$template_args['revisit'] =$this->_revisit;
			return EEH_Template::display_template( $this->_templates['registration_page_attendee_information'], $template_args, TRUE );
		}

		$proceed_to_btn_text = sprintf( __('Proceed%1$sto%1$s', 'event_espresso'), '&nbsp;' );
		$proceed_to_btn_text = apply_filters( 'FHEE__EED_Single_Page_Checkout__registration_checkout__button_text__proceed_to', $proceed_to_btn_text );

		$registration_steps = '';
		$step_nmbr = 1;
		// set pointer to first step
		reset( self::$_reg_steps );
		// loop through steps
		while ( $reg_step_details = current( self::$_reg_steps )) {
			$reg_step = key( self::$_reg_steps );
			//			echo '<br/><h4>$reg_step : ' . $reg_step . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
			//			echo '<h4>$this->_current_step : ' . $this->_current_step . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
			$edit_lnk_class = $this->_current_step == $reg_step ? ' hidden' : '';
			$edit_lnk_url = add_query_arg( array( 'ee' => '_register', 'step' => $reg_step_details['display_func'] ), $this->_reg_page_base_url );
			$step_dv_class = $this->_current_step == $reg_step ? '' : ' hidden';
			$reg_step_form_url = add_query_arg( array( 'ee' => '_register', 'step' => $reg_step_details['process_func'] ), $this->_reg_page_base_url );
			$next = $this->_get_next_reg_step();
			//d( $next );
			$next_step = $next ? $next['display_func'] : 'finalize_registration';
			$next_step_text = $next ? $proceed_to_btn_text . $next['name'] : $confirmation_btn_text;

			$step_args = array_merge(
				$template_args,
				array(
					'step' => $reg_step,
					'step_nmbr' => $this->_revisit !== FALSE ? $step_or_revisit : $step_or_revisit . $step_nmbr . ' - ',
					'edit_lnk_class' => $edit_lnk_class,
					'edit_lnk_url' => $edit_lnk_url,
					'step_dv_class' => $step_dv_class,
					'reg_step_form_url' => $reg_step_form_url,
					'reg_step_ajax_action' => $reg_step_details['process_func'],
					'next_step' => $next_step,
					'next_step_text' => $next_step_text,
					'revisit' => $this->_revisit
				)
			);

			if ( $reg_step == 'payment_options' ) {
				EE_Registry::instance()->load_model( 'Payment_Method' );
				// has method_of_payment been set by no-js user?
				if ( $this->_selected_method_of_payment = $this->_get_selected_method_of_payment() ) {
					// get EE_Payment_Method object
					$this->_payment_method = $this->_get_payment_method_for_selected_method_of_payment( $this->_selected_method_of_payment );
					if ( $this->_payment_method ) {
						$this->_get_billing_form();
					}
				}
				$step_args['selected_method_of_payment'] = $this->_selected_method_of_payment;
				$available_payment_methods = EE_Registry::instance()->LIB->EEM_Payment_Method->get_all_for_transaction($this->checkout->transaction, EEM_Payment_Method::scope_cart);
				$available_pm = array();
				foreach( $available_payment_methods as $pm ) {
					//					d( $pm );
					if ( $pm instanceof EE_Payment_Method ) {
						$available_pm[ $pm->slug() ]['button_html'] = $pm->button_html( $pm->button_url() );
						$pm_css_class = $pm->open_by_default() ? '' : 'hidden';
						$available_pm[ $pm->slug() ]['divo'] = '<div id="reg-page-billing-info-' . $pm->slug() . '-dv" class="reg-page-billing-info-dv ' . $pm_css_class . '">';
						$available_pm[ $pm->slug() ]['name'] = apply_filters(
							'FHEE__Single_Page_Checkout__registration_checkout__selected_payment_method',
							sprintf( __('You have selected "%s" as your method of payment', 'event_espresso' ), $pm->name() )
						);
						$available_pm[ $pm->slug() ]['description'] = $pm->description();
						if ( $billing_form = $pm->type_obj()->billing_form() ) {
							$available_pm[ $pm->slug() ]['billing_form'] = $billing_form->get_html_and_js();
						} else {
							$available_pm[ $pm->slug() ]['billing_form'] = '';
						}
						$available_pm[ $pm->slug() ]['divx'] = '</div>';
					}
				}
				$step_args['available_payment_methods'] = $available_pm;
			}

			//			printr( $step_args, '$step_args  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

			//			d( $step_args );
			$registration_steps .= EEH_Template::locate_template( $this->_templates[ $reg_step_details[ 'template' ] ], $step_args, TRUE, TRUE );
			// pass step info to js
			EE_Registry::$i18n_js_strings[ 'reg_steps' ][] = $reg_step_details['display_func'];
			next( self::$_reg_steps );
			$step_nmbr++;

		}

		EE_Registry::$i18n_js_strings[ 'reg_steps' ][] = 'finalize_registration';

		$wrapper_args = array(
			'step' => $this->_current_step,
			'empty_cart' => $total_items < 1 ? TRUE : FALSE,
			'reg_steps' => self::$_reg_steps,
			'registration_steps' => $registration_steps,
			'revisit' => $this->_revisit,
			'empty_msg' => apply_filters( 'FHEE__Single_Page_Checkout__registration_checkout__empty_msg', __( 'You need to select at least one event before you can proceed with the registration process.', 'event_espresso' ))
		);
		//		d( $wrapper_args );
		EE_Registry::instance()->REQ->add_output( EEH_Template::locate_template( $this->_templates[ 'registration_page_wrapper' ], $wrapper_args, TRUE, TRUE ));

		return '';


	}



	/**
	 * @return boolean
	 */
	public function process_reg_step() {

	}



	/**
	 * @return boolean
	 */
	public function update_reg_step() {

	 }


}



// End of file EE_SPCO_Reg_Step_Registration_Confirmation.class.php
// Location: /EE_SPCO_Reg_Step_Registration_Confirmation.class.php