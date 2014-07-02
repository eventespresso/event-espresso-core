<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
 /**
 *
 * Class EE_SPCO_Reg_Step_Attendee_Information
 *
 * Description
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since 				4.5.0
 *
 */
class EE_SPCO_Reg_Step_Attendee_Information extends EE_SPCO_Reg_Step {



	/**
	 *    class constructor
	 *
	 * @access    public
	 * @param    EE_Checkout $checkout
	 * @return    \EE_SPCO_Reg_Step_Attendee_Information
	 */
	public function __construct( EE_Checkout $checkout ) {
//		echo '<br/><h5 style="color:#2EA2CC;">' . __CLASS__ . '<span style="font-weight:normal;color:#0074A2"> -> </span>' . __FUNCTION__ . '() <br/><span style="font-size:9px;font-weight:normal;color:#666">' . __FILE__ . '</span>    <b style="font-size:10px;color:#333">  ' . __LINE__ . ' </b></h5>';
		$this->_slug = 'attendee_information';
		$this->_name = __('Attendee Information', 'event_espresso');
		$this->_template = SPCO_TEMPLATES_PATH . 'attendee_information_master.template.php';
		$this->_reg_form_name = 'EE_Attendee_Information_Reg_Form';
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
	 * @return EE_Form_Section_Proper
	 */
	public function generate_reg_form() {
		$subsections = array();
		$template_args = array(
			'revisit' 			=> $this->checkout->revisit,
			'registrations' =>array(),
			'ticket_count' 	=>array()
		);
		// grab the saved registrations from the transaction
		$registrations = $this->checkout->transaction->registrations( array(), TRUE );
		if ( $registrations ) {
			foreach ( $registrations as $registration ) {
				if ( $registration instanceof EE_Registration ) {
					$subsections[ 'reg_form_' . str_replace( '-', '', $registration->reg_url_link() ) ] = $this->registrations_reg_form( $registration );
					if ( ! is_admin() ) {
						$template_args['registrations'][ $registration->reg_url_link() ] = $registration;
						$template_args['ticket_count'][ $registration->ticket()->ID() ] = isset( $template_args['ticket_count'][ $registration->ticket()->ID() ] ) ? $template_args['ticket_count'][ $registration->ticket()->ID() ] + 1 : 1;
					}
				}
			}
		}
		// if not performing registrations via the admin
		if ( ! is_admin() ) {
			// generate hidden inputs for managing the reg process
			$subsections['hidden_inputs'] = $this->reg_step_hidden_inputs();
		}
		// build array of form options
		$form_args = array(
			'name' 					=> $this->slug(),
			'html_id' 					=> $this->slug() . '-reg-step',
			'subsections' 			=> $subsections,
			'exclude' 					=> array(),
			'layout_strategy'		=> is_admin() ?
					new EE_Div_Per_Section_Layout() :
					new EE_Template_Layout( array(
							'layout_template_file' 		=> SPCO_TEMPLATES_PATH . 'attendee_information' . DS . 'attendee_information_master.template.php', // layout_template
							'begin_template_file' 		=> NULL,
							'input_template_file' 			=> NULL,
							'subsection_template_file' => NULL,
							'end_template_file' 			=> NULL,
							'template_args' 					=> $template_args
						)
					),
		);
		$this->reg_form = new EE_Form_Section_Proper( $form_args );

	}



	/**
	 * @param EE_Registration $registration
	 * @return EE_Form_Section_Proper
	 */
	public function registrations_reg_form( EE_Registration $registration ) {
		static $attendee_nmbr = 1;
		// array of params to pass to parent constructor
		$form_args = array(
			'name' 				=> $registration->reg_url_link(),
			'html_id' 				=> 'ee-registration-' . $registration->reg_url_link(),
			'html_class' 		=> 'ee-reg-form-attendee-dv',
			'subsections' 		=> array(),
			'layout_strategy' => new EE_Fieldset_Section_Layout(
				array(
					'legend_class' 	=> 'spco-attendee-lgnd smaller-text lt-grey-text',
					'legend_text' 	=> sprintf( __( 'Attendee %d', 'event_espresso' ), $attendee_nmbr )
				)
			)
		);
		// verify that registration has valid event
		if ( $registration->event() instanceof EE_Event ) {
			$query_params = array(
				array(
					'Event.EVT_ID' => $registration->event()->ID(),
					'Event_Question_Group.EQG_primary' => $registration->count() == 1 ? TRUE : FALSE
				),
				'order_by'=>array( 'QSG_order'=>'ASC' )
			);
			$question_groups = $registration->event()->question_groups( $query_params );
			if ( $question_groups ) {
				foreach ( $question_groups as $question_group ) {
					if ( $question_group instanceof EE_Question_Group ) {
						$form_args['subsections'][ 'reg_form_qstn_grp_' . $question_group->identifier() ] = $this->question_group_reg_form( $registration, $question_group );
					}
				}
			} else {
				EE_Registry::instance()->load_helper( 'Template' );
				$form_args['subsections'][ 'attendee_info_not_required_' . $registration->reg_url_link() ] = new EE_Form_Section_HTML(
					EEH_Template::locate_template(
						SPCO_TEMPLATES_PATH . 'attendee_information' . DS . 'attendee_info_not_required.template.php',
						apply_filters( 'FHEE__EE_SPCO_Reg_Step_Attendee_Information__registrations_reg_form__attendee_info_not_required_template_args', array()),
						TRUE,
						TRUE
					)
				);
				// add hidden input
				$form_args['subsections'][ 'additional_attendee_reg_info_' . $registration->reg_url_link() ] = $this->additional_attendee_reg_info_input( $registration );
			}
		}
		$attendee_nmbr++;
		return new EE_Form_Section_Proper( $form_args );
	}



	/**
	 * additional_attendee_reg_info_input
	 *
	 * @access public
	 * @param EE_Registration $registration
	 * @return    EE_Form_Input_Base
	 */
	public function additional_attendee_reg_info_input( EE_Registration $registration ){
		// generate hidden input
		return new EE_Hidden_Input(
			array(
				'layout_strategy' => new EE_Div_Per_Section_Layout(),
				'name' 				=> 'additional-attendee-reg-info-' . $registration->reg_url_link(),
				'html_name' 		=> 'ee_reg_qstn[' . $registration->reg_url_link() . '][additional_attendee_reg_info]',
				'html_id' 				=> 'additional-attendee-reg-info-' . $registration->reg_url_link(),
				'default'				=> FALSE
			)
		);
	}



	/**
	 * @param EE_Registration   $registration
	 * @param EE_Question_Group $question_group
	 * @return EE_Form_Section_Proper
	 */
	public function question_group_reg_form( EE_Registration $registration, EE_Question_Group $question_group ){
		// array of params to pass to parent constructor
		$form_args = array(
			'name' 					=> $question_group->identifier(),
			'html_id' 					=> 'ee-reg-form-qstn-grp-' . $question_group->identifier(),
			'html_class' 			=> 'ee-reg-form-qstn-grp-dv',
			'html_label_id' 		=> 'ee-reg-form-qstn-grp-' . $question_group->identifier() . '-lbl',
			'subsections' 			=> array(
				'reg_form_qstn_grp_hdr' => $this->question_group_header( $question_group )
			),
			'layout_strategy' 	=> new EE_Div_Per_Section_Layout()
		);

		$questions = $question_group->get_many_related(
			'Question',
			array(
				array(
					// where params
					'QST_deleted' => 0,
					'QST_admin_only' => is_admin() ? 1 :0
				),
				'order_by'=>array(
					'Question_Group_Question.QGQ_order' =>'ASC'
				)
			)
		);
		// filter for additional content before questions
		$form_args['subsections']['reg_form_questions_before'] = new EE_Form_Section_HTML( apply_filters( 'FHEE__EEH_Form_Fields__generate_question_groups_html__before_question_group_questions', '' ));
		// loop thru questions
		foreach ( $questions as $question ) {
			if( $question instanceof EE_Question ){
				$form_args['subsections'][ 'reg_form_question_' . $question->ID() ] = $this->reg_form_question( $registration, $question );
			}
		}
		if ( $registration->is_primary_registrant() ) {
			if ( ! is_admin() ) {
				// TODO: add admin option for toggling copy attendee info, then use that value here
				$print_copy_info = TRUE;
				// generate hidden input
				$form_args['subsections']['copy_attendee_info'] = $print_copy_info ? $this->copy_attendee_info_form() : $this->auto_copy_attendee_info();
			}
			// generate hidden input
			$form_args['subsections']['reg_form_primary_registrant'] = $this->additional_primary_registrant_inputs();
		}
		// filter for additional content after questions
		$form_args['subsections']['reg_form_questions_after'] = new EE_Form_Section_HTML( apply_filters( 'FHEE__EEH_Form_Fields__generate_question_groups_html__after_question_group_questions', '' ));
//		d( $form_args );
		return new EE_Form_Section_Proper( $form_args );
	}



	/**
	 * @access public
	 * @param EE_Question_Group $question_group
	 * @return 	EE_Form_Section_HTML
	 */
	public function question_group_header( EE_Question_Group $question_group ){
		$html = '';
		// group_name
		if ( $question_group->show_group_name() && $question_group->name() != '' ) {
			$html .=  "\n\t\t" . '<h4 class="ee-reg-form-qstn-grp-title section-title">' . $question_group->name() . '</h4>';
		}
		// group_desc
		if ( $question_group->show_group_desc() && $question_group->desc() != '' ) {
			$html .=  '<p class="ee-reg-form-qstn-grp-desc-pg small-text lt-grey-text">' . $question_group->desc() . '</p>';
		}
		return new EE_Form_Section_HTML( $html );
	}



	/**
	 * @access public
	 * @return 	EE_Form_Section_Proper
	 */
	public function copy_attendee_info_form(){

		// array of params to pass to parent constructor
		$form_args = array(
			'name' 					=> 'spco_copy_attendee_chk',
			'html_id' 					=> 'spco-copy-attendee-chk-',
			'subsections' 			=> $this->copy_attendee_info_inputs(),
			'layout_strategy' 	=> new EE_Template_Layout( array(
						'layout_template_file' 			=> SPCO_TEMPLATES_PATH . 'attendee_information' . DS . 'copy_attendee_info.template.php', // layout_template
						'begin_template_file' 			=> NULL,
						'input_template_file' 				=> NULL,
						'subsection_template_file' 	=> NULL,
						'end_template_file' 				=> NULL
					)
				)
		);
		return new EE_Form_Section_Proper( $form_args );
	}



	/**
	 * auto_copy_attendee_info
	 *
	 * @access public
	 * @return 	EE_Form_Section_Proper
	 */
	public function auto_copy_attendee_info() {
		return new EE_Form_Section_HTML(
			EEH_Template::locate_template(
				SPCO_TEMPLATES_PATH . 'attendee_information' . DS . 'auto_copy_attendee_info.template.php',
				apply_filters( 'FHEE__EE_SPCO_Reg_Step_Attendee_Information__auto_copy_attendee_info__template_args', array()),
				TRUE,
				TRUE
			)
		);
	}



	/**
	 * copy_attendee_info_inputs
	 *
	 * @access public
	 * @return 	EE_Form_Section_Proper
	 */
	public function copy_attendee_info_inputs() {
		$copy_attendee_info_inputs = array();
		$prev_ticket = NULL;
		// grab the saved registrations from the transaction
		$registrations = $this->checkout->transaction->registrations( array(), TRUE );
		foreach ( $registrations as $registration ) {
			// for all  attendees other than the primary attendee
			if ( $registration instanceof EE_Registration && ! $registration->is_primary_registrant() ) {
				// if this is a new ticket OR if this is the very first additional attendee after the primary attendee
				if ( $registration->ticket()->ID() !== $prev_ticket ) {
					$item_name = $registration->ticket()->name();
					$item_name .= $registration->ticket()->description() != '' ? ' - ' . $registration->ticket()->description() : '';
					$copy_attendee_info_inputs[ 'spco_copy_attendee_chk[' . $registration->ticket()->ID() . ']' ] = new EE_Form_Section_HTML( '<h6 class="spco-copy-attendee-event-hdr">' . $item_name . '</h6>' );
					$prev_ticket = $registration->ticket()->ID();
				} else {
					$copy_attendee_info_inputs[ 'spco_copy_attendee_chk[' . $registration->ticket()->ID() . ']' ] = new EE_Form_Section_HTML( '
			<div class="clear-float"></div>
		<hr class="spco-copy-attendee-hr" />'
					);
				}

				$copy_attendee_info_inputs[ 'spco_copy_attendee_chk[' . $registration->reg_url_link() . ']' ] = new EE_Checkbox_Multi_Input(
					array( $registration->reg_url_link() => sprintf( __('Attendee #%s', 'event_espresso'), $registration->count() )),
					array(
						'layout_strategy' 	=> new EE_Div_Per_Section_Layout(),
						'name' 					=> $registration->reg_url_link(),
						'html_name' 			=> 'spco_copy_attendee_chk[' . $registration->reg_url_link() . ']',
						'html_id' 					=> $registration->reg_url_link(),
						'html_class' 			=> 'spco-copy-attendee-chk'
					)
				);
			}
		}
		return $copy_attendee_info_inputs;
	}



	/**
	 * additional_primary_registrant_inputs
	 *
	 * @access public
	 * @return 	EE_Form_Input_Base
	 */
	public function additional_primary_registrant_inputs(){
		// generate hidden input
		return new EE_Hidden_Input(
			array(
				'layout_strategy' => new EE_Div_Per_Section_Layout(),
				'name' 				=> 'primary_registrant',
				'html_name' 		=> 'primary_registrant',
				'html_id' 				=> 'primary_registrant',
				'default'				=> TRUE
			)
		);
	}



	/**
	 * @access public
	 * @param EE_Registration $registration
	 * @param EE_Question     $question
	 * @return 	EE_Form_Input_Base
	 */
	public function reg_form_question( EE_Registration $registration, EE_Question $question ){

		// if this question was for an attendee detail, then check for that answer
		$answer_value = EEM_Answer::instance()->get_attendee_property_answer_value( $registration, $question->ID() );
		$answer = $registration->reg_url_link() || ! $answer_value ? EEM_Answer::instance()->get_one( array( array( 'QST_ID'=>$question->ID(), 'REG_ID'=>$registration->ID() ))) : NULL;
		// if NOT returning to edit an existing registration OR if this question is for an attendee property OR we still don't have an EE_Answer object
		if( ! $registration->reg_url_link() || $answer_value || ! $answer instanceof EE_Answer ) {
			// create an EE_Answer object for storing everything in
			$answer = EE_Answer::new_instance ( array(
				'QST_ID'=> $question->ID(),
				'REG_ID'=> $registration->ID()
			));
		}
		// verify instance
		if( $answer instanceof EE_Answer ){
			if ( ! empty( $answer_value )) {
				$answer->set( 'ANS_value', $answer_value );
			}
			$answer->cache( 'Question', $question );
			$answer_cache_id =$question->system_ID() != NULL ? $question->system_ID() . '-' . $registration->reg_url_link() : $question->ID() . '-' . $registration->reg_url_link();
			$registration->cache( 'Answer', $answer, $answer_cache_id );
		}
		return $this->_generate_question_input( $registration, $question, $answer );

	}



	/**
	 * @param EE_Registration $registration
	 * @param EE_Question     $question
	 * @param mixed EE_Answer|NULL      $answer
	 * @return EE_Form_Input_Base
	 */
	public function _generate_question_input( EE_Registration $registration, EE_Question $question, $answer ){
		//		d( $registration );
		//		d( $question );
		//		d( $answer );
		// array of params to pass to parent constructor.
		// possible values:
		//		html_id;
		//		html_class;
		//		html_style;
		//		name;
		//		html_name;
		//		html_label_id;
		//		html_label_class;
		//		html_label_style;
		//		html_label_text;
		//		html_label;
		//		html_help_text;
		//		html_help_class = 'description';
		//		html_help_style;
		//		raw_value;
		$identifier = $question->is_system_question() ? $question->system_ID() : $question->ID();
		$input_constructor_args = array(
			'layout_strategy' 	=> new EE_Div_Per_Section_Layout(),
			'name' 					=> $registration->reg_url_link() . '-' . $identifier,
			'html_name' 			=> 'ee_reg_qstn[' . $registration->reg_url_link() . '][' . $identifier . ']',
			'html_id' 					=> 'ee-reg-qstn-' . $registration->reg_url_link() . '-' . $identifier,
			'html_class' 			=> 'ee-reg-qstn',
			'required' 				=> $question->required(),
			'html_label_id'		=> 'ee-reg-qstn-' . $registration->reg_url_link() . '-' . $identifier,
			'html_label_class'	=> 'ee-reg-qstn-lbl',
			'html_label_text'		=> $question->display_text()
		);

		if ( $answer instanceof EE_Answer ) {
			$input_constructor_args['html_name'] = '[' . $answer->ID() . ']';
			$input_constructor_args['default'] = $answer->value();
		}

		switch ( $question->type() ) {
			// Text
			case EEM_Question::QST_type_text :
				$input_class = 'EE_Text_Input';
				break;
			// Textarea
			case EEM_Question::QST_type_textarea :
				$input_class = 'EE_Text_Area_Input';
				break;
			// Single
			case EEM_Question::QST_type_single :
				$input_class = 'EE_Checkbox_Multi_Input';
				break;
			// Dropdown
			case EEM_Question::QST_type_dropdown :
				$input_class = 'EE_Select_Input';
				break;
			// Multiple
			case EEM_Question::QST_type_multiple :
				$input_class = 'EE_Checkbox_Multi_Input';
				break;
			// Date
			case EEM_Question::QST_type_date :
				$input_class = 'EE_Text_Input';
				break;
			// fallback
			default :
				$input_class = 'EE_Text_Input';
		}
		return new $input_class( $input_constructor_args );

	}




	/**
	 * @void
	 */
	public function sfsdfsdfsdfsdfsdf() {
//		$from_admin = is_admin();
//
//		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
//		//d($this->checkout->cart);
//		EE_Registry::instance()->load_helper( 'Form_Fields' );
//		EE_Registry::instance()->load_helper( 'Template' );
//		EE_Registry::instance()->load_class( 'Question_Form_Input', array(), FALSE, FALSE, TRUE );
//
//		$event_queue = array();
//		$total_items = 0;
//		$ticket_count = array();
//		$payment_required = FALSE;
//
//		$sold_out_events = array();
//		$events_requiring_pre_approval = array();
//		$additional_event_attendees = array();
//		//		$events_that_use_coupon_codes = array();
//		//		$events_that_use_groupon_codes = array();
//
//		$template_args = array(
//			'css_class' => '',
//			'confirmation_data' => '',
//			'reg_page_discounts_dv_class' => 'hidden',
//			'additional_attendee_reg_info' => NULL,
//			'whats_in_the_cart' => '',
//			'prmy_att_input_name' => NULL
//		);
//
//		$event_queue['title'] = __('Registrations', 'event_espresso');
//		$additional_attendee_forms = FALSE;
//
//		d($this->checkout);
//
//		$registrations  =  $this->checkout->transaction->registrations( array(), TRUE );
//		// grab the saved registrations from the transaction
//		if ( $this->checkout->transaction instanceof EE_Transaction && $registrations !== NULL ) {
//
//			//d( $this->checkout->transaction );
//			$event_queue['has_items'] = TRUE;
//			$prev_event = NULL;
//
//			foreach ( $registrations as $registration ) {
//
//				if ( $registration->event()->is_sold_out() || $registration->event()->is_sold_out( TRUE )) {
//					// add event to list of events that are sold out
//					$sold_out_events[ $registration->event()->ID() ] = '<li><span class="dashicons dashicons-marker ee-icon-size-16 pink-text"></span>' . $registration->event()->name() . '</li>';
//				}
//				$payment_required  = $registration->status_ID() == EEM_Registration::status_id_pending_payment || $registration->status_ID() == EEM_Registration::status_id_approved ? TRUE : $payment_required;
//				if ( ! $payment_required ) {
//					// add event to list of events with pre-approval reg status
//					$events_requiring_pre_approval[ $registration->event()->ID() ] = '<li><span class="dashicons dashicons-marker ee-icon-size-16 orange-text"></span>' . $registration->event()->name() . '</li>';
//				}
//
//				$line_item_ID = $registration->reg_url_link();
//				$event_queue['items'][ $line_item_ID ]['ticket'] = $registration->ticket();
//				$event_queue['items'][ $line_item_ID ]['event'] = $registration->event();
//				$event_queue['items'][ $line_item_ID ]['reg_count'] = $registration->count();
//				$total_items ++;
//				$ticket_count[ $registration->ticket()->ID() ] = isset( $ticket_count[ $registration->ticket()->ID() ] ) ? $ticket_count[ $registration->ticket()->ID() ] + 1 : 1;
//
//				$question_meta = array(
//					'EVT_ID' => $registration->event()->ID(),
//					'att_nmbr' => $registration->count(),
//					'ticket_id' => $registration->ticket()->ID(),
//					'input_name' =>  '[' . $line_item_ID . ']',
//					'input_id' => $line_item_ID,
//					'input_class' => 'ee-reg-page-questions' . $template_args['css_class']
//				);
//
//				$Question_Groups = EE_Registry::instance()->load_model( 'Question_Group' )->get_all( array(
//					array(
//						'Event.EVT_ID' => $registration->event()->ID(),
//						'Event_Question_Group.EQG_primary' => $registration->count() == 1 ? TRUE : FALSE
//					),
//					'order_by'=>array( 'QSG_order'=>'ASC' )
//				));
//
//				foreach ( $Question_Groups as $QSG_ID => $Question_Group ) {
//					$where = array( 'QST_deleted' => 0 );
//					if ( ! $from_admin ) {
//						$where['QST_admin_only'] = 0;
//					}
//					$Questions = $Question_Group->get_many_related( 'Question', array( $where, 'order_by'=>array( 'Question_Group_Question.QGQ_order' =>'ASC' )));
//					foreach ( $Questions as $Question ) {
//						if( $Question instanceof EE_Question ){
//							// if this question was for an attendee detail, then check for that answer
//							$answer_value = EEM_Answer::instance()->get_attendee_property_answer_value( $registration, $Question->ID() );
//							$answer = $this->checkout->reg_url_link || ! $answer_value ? EEM_Answer::instance()->get_one( array( array( 'QST_ID'=>$Question->ID(), 'REG_ID'=>$registration->ID() ))) : NULL;
//							// if NOT returning to edit an existing registration OR if this question is for an attendee property OR we still don't have an EE_Answer object
//							if( ! $this->checkout->reg_url_link || $answer_value || ! $answer instanceof EE_Answer ) {
//								// create an EE_Answer object for storing everything in
//								$answer = EE_Answer::new_instance ( array(
//									'QST_ID'=> $Question->ID(),
//									'REG_ID'=> $registration->ID()
//								));
//							}
//							// verify instance
//							if( $answer instanceof EE_Answer ){
//								if ( ! empty( $answer_value )) {
//									$answer->set( 'ANS_value', $answer_value );
//								}
//								$question_meta['attendee'][ $Question->is_system_question() ? $Question->system_ID() : $Question->ID() ] = $answer->value();
//								$answer->cache( 'Question', $Question );
//								$answer_cache_id =$Question->system_ID() != NULL ? $Question->system_ID() . '-' . $line_item_ID : $Question->ID() . '-' . $line_item_ID;
//								//								echo '<h4>$answer_cache_id : ' . $answer_cache_id . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//								$registration->cache( 'Answer', $answer, $answer_cache_id );
//							}
//							$Question_Groups[ $QSG_ID ]->cache( 'Question', $Question );
//						}
//					}
//				}
//				//					printr( $registration, '$registration  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//
//				add_filter( 'FHEE__EEH_Form_Fields__label_html', array( 'EED_Single_Page_Checkout', 'reg_form_form_field_label_wrap' ), 10, 2 );
//				add_filter( 'FHEE__EEH_Form_Fields__input_html', array( 'EED_Single_Page_Checkout', 'reg_form_form_field_input__wrap' ), 10, 2 );
//				$attendee_questions = EEH_Form_Fields::generate_question_groups_html2( $Question_Groups, $question_meta, $from_admin, 'div' );
//
//				// show this attendee form?
//				if ( empty( $attendee_questions )) {
//					$event_queue['items'][ $line_item_ID ]['additional_attendee_reg_info'] = '
//	<input type="hidden" id="' . $line_item_ID . '-additional_attendee_reg_info" name="qstn[' . $line_item_ID . '][additional_attendee_reg_info]" value="0" />' . "\n";
//				} else {
//					$additional_attendee_forms = $registration->count() == 1 ? FALSE : TRUE;
//					$event_queue['items'][ $line_item_ID ]['additional_attendee_reg_info'] = '';
//				}
//				$event_queue['items'][ $line_item_ID ]['attendee_questions'] = $attendee_questions;
//
//
//
//				// is this the primarary registrant ?
//				if ( $registration->count() == 1 ) {
//					// grab line item from primary attendee
//					$template_args['prmy_att_input_name'] =  $line_item_ID;
//				} else {
//
//					// for all  attendees other than the primary attendee
//					$additional_event_attendees[ $registration->ticket()->ID() ][ $line_item_ID ] = array(
//						'ticket' => $registration->ticket()->name(),
//						'att_nmbr' => $registration->count(),
//						'input_id' => $line_item_ID,
//						'input_name' =>  '[' . $line_item_ID . ']'
//					);
//
//					$item_name = $registration->ticket()->name();
//					$item_name .= $registration->ticket()->description() != '' ? ' - ' . $registration->ticket()->description() : '';
//
//					// if this is a new ticket OR if this is the very first additional attendee after the primary attendee
//					if ( $registration->ticket()->ID() != $prev_event || $registration->count() == 2 ) {
//						$additional_event_attendees[ $registration->ticket()->ID() ][ $line_item_ID ]['event_hdr'] = $item_name;
//						$prev_event = $registration->ticket()->ID();
//					} else {
//						// no heading
//						$additional_event_attendees[ $registration->ticket()->ID() ][ $line_item_ID ]['event_hdr'] = FALSE;
//					}
//				}
//
//
//
//			}
//
//			if ( ! $this->checkout->reg_url_link ) {
//				EE_Registry::instance()->SSN->set_session_data( array( 'transaction' => $this->checkout->transaction ));
//			}
//			//				echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
//			//				EE_Registry::instance()->SSN->update();
//			//				d( $this->checkout->transaction );
//			//				d( $this->checkout->cart );
//
//		} else {
//			// empty
//			$event_queue['has_items'] = FALSE;
//		}
//		// sold_out_events
//		$template_args['sold_out_events'] = implode( $sold_out_events );
//		$template_args['sold_out_events_msg'] = apply_filters( 'FHEE__Single_Page_Checkout__registration_checkout__sold_out_events_msg', __('It appears that the event you were about to make a payment for has sold out since you first registered. If you have already made a partial payment towards this event, please contact the event administrator for a refund.', 'event_espresso') );
//		// events_requiring_pre_approval
//		$template_args['events_requiring_pre_approval'] = implode( $events_requiring_pre_approval );
//		$template_args['events_requiring_pre_approval_msg'] = apply_filters( 'FHEE__Single_Page_Checkout__registration_checkout__sold_out_events_msg', __('The following events do not require payment at this time and will not be billed during this transaction. Billing will only occur after the attendee has been approved by the event organizer. You will be notified when your registration has been processed. If this is a free event, then no billing will occur.', 'event_espresso') );
//
//		//  GOT COUPONS ?
//		$template_args['events_that_use_coupon_codes'] = '';
//		$template_args['use_coupon_codes'] = FALSE;
//
//		// Groupons ?
//		$template_args['events_that_use_groupon_codes'] = '';
//		$template_args['use_groupon_codes'] = FALSE;
//
//
//		$template_args['spco_reg_page_ajax_coupons_url'] = add_query_arg( array( 'ee' => 'apply_coupon' ), $this->_reg_page_base_url );
//		//		$template_args['print_copy_info'] = $additional_attendee_forms || $total_items > 2 ? TRUE : FALSE;
//		$template_args['total_items'] = $total_items;
//		$template_args['ticket_count'] = $ticket_count;
//		$template_args['print_copy_info'] = $additional_attendee_forms;
//
//		//		d($additional_event_attendees);
//		$template_args['additional_event_attendees'] = $additional_event_attendees;
//		// total monies paid to date
//		$total_payments = 0;
//		// the original total
//		$cart_total_before_tax = $this->checkout->cart->get_cart_total_before_tax();
//		// get cart total
//		$grand_total = $this->checkout->cart->get_cart_grand_total();
//		$template_args['grand_total'] = apply_filters( 'FHEE__EED_Single_Page_Checkout__registration_checkout__grand_total', $grand_total );
//		// check if monies are potentially owing
//		$template_args['payment_required'] = $cart_total_before_tax > 0 ? $payment_required : FALSE;
//		// not a free event?
//		if ( $template_args['payment_required'] ) {
//			//check for any previous payments
//			if ( $template_args['payments'] = $this->checkout->transaction->approved_payments() ) {
//				foreach ( $template_args['payments'] as $payment ) {
//					if ( $payment instanceof EE_Payment ) {
//						// increment total payments
//						$total_payments += $payment->amount();
//					}
//				}
//				$template_args['pay_date_frmt'] = get_option('date_format') . ' ' . get_option('time_format');
//			}
//		} else {
//			//unset( self::$_reg_steps['payment_options'] );
//			EE_Registry::instance()->SSN->set_session_data( array( 'billing_info' => 'no payment required' ));
//			$template_args['payments'] = array();
//		}
//
//		$template_args['sub_total'] = $cart_total_before_tax;
//		$template_args['taxes'] = $this->checkout->cart->get_taxes_line_item()->children();
//
//		// what's left to pay?
//		$amount_owing = $grand_total - $total_payments;
//		$template_args['amount_owing'] = apply_filters( 'FHEE__EED_Single_Page_Checkout__registration_checkout__amount_owing', $amount_owing );
//
//		//$template_args['grand_total'] = $template_args['amount_owing'] !== FALSE ? $amount_owing : $grand_total;
//
//		$template_args['total_items'] = $event_queue['total_items'] = $total_items;
//		//	d( $event_queue );
//		$template_args['event_queue'] = $event_queue;
//		$template_args['images_dir_url'] = EE_GLOBAL_ASSETS_URL . 'images/';
//		$template_args['reg_url_link'] = $this->checkout->reg_url_link;
//
//		$template_args['return_url'] = add_query_arg( array('ee' => 'event_queue'), $this->_reg_page_base_url );
//		$template_args['update_url'] = add_query_arg( array('ee' => 'update_event_queue'), $this->_reg_page_base_url );
//		$template_args['register_url'] = add_query_arg( array('ee' => '_register'), $this->_reg_page_base_url );
//		$template_args['event_queue_url'] = add_query_arg( array('ee' => 'event_queue'), $this->_reg_page_base_url );
//
//		$template_args['confirmation_data'] = $this->_current_step == 'registration_confirmation' ? $this->_registration_confirmation() : '';
//
//		$step_or_revisit = __('Step ', 'event_espresso');
//
//		if ( $this->_revisit && $this->_current_step == 'attendee_information' ) {
//			// Update Registration Details
//			$confirmation_btn_text = sprintf( __('Update%1$sRegistration%1$sDetails', 'event_espresso'), '&nbsp;' );
//			$confirmation_btn_text = apply_filters( 'FHEE__EED_Single_Page_Checkout__registration_checkout__button_text__update_registration_details', $confirmation_btn_text );
//			$step_or_revisit = __('Edit', 'event_espresso');
//		} else if ( $this->_revisit && $this->_current_step == 'payment_options' ) {
//			// Process Payment
//			$confirmation_btn_text = sprintf( __('Process%1$sPayment', 'event_espresso'), '&nbsp;' );
//			$confirmation_btn_text = apply_filters( 'FHEE__EED_Single_Page_Checkout__registration_checkout__button_text__process_payment', $confirmation_btn_text );
//			$step_or_revisit = '';
//		} else {
//			// Finalize Registration
//			$confirmation_btn_text = sprintf( __('Finalize%1$sRegistration', 'event_espresso'), '&nbsp;' );
//			$confirmation_btn_text = apply_filters( 'FHEE__EED_Single_Page_Checkout__registration_checkout__button_text__finalize_registration', $confirmation_btn_text );
//		}
//		// grand total less than paid but greater than zero ?
//		if ( $grand_total < $this->checkout->transaction->paid() && $grand_total > 0 && $this->_next_step == 'payment_options' ) {
//			// owing money
//			$proceed_to_payment_btn_text = sprintf(
//			// & Proceed to Payment
//				__('%1$s%2$s%1$sProceed%1$sto%1$sPayment', 'event_espresso'),
//				'&nbsp;',  // %1$s
//				'&amp;'	// %2$s
//			);
//			$confirmation_btn_text .=  apply_filters( 'FHEE__EED_Single_Page_Checkout__registration_checkout__button_text__and_proceed_to_payment', $proceed_to_payment_btn_text );
//		}
//		add_action( 'AHEE__SPCO_after_reg_step_form', array( $this, 'add_extra_finalize_registration_inputs' ), 10, 2 );
//
//		$template_args['from_admin'] = $from_admin;
//
//		//if in admin we exit at this point and display the questions template
//		if ( $from_admin ) {
//			//some custom template args
//			$template_args['step_dv_class'] = '';
//			$template_args['revisit'] =$this->_revisit;
//			return EEH_Template::display_template( $this->_templates['registration_page_attendee_information'], $template_args, TRUE );
//		}
//
//		$proceed_to_btn_text = sprintf( __('Proceed%1$sto%1$s', 'event_espresso'), '&nbsp;' );
//		$proceed_to_btn_text = apply_filters( 'FHEE__EED_Single_Page_Checkout__registration_checkout__button_text__proceed_to', $proceed_to_btn_text );
//
//		$registration_steps = '';
//		$step_nmbr = 1;
//		// set pointer to first step
//		reset( self::$_reg_steps );
//		// loop through steps
//		while ( $reg_step_details = current( self::$_reg_steps )) {
//			$reg_step = key( self::$_reg_steps );
//			//			echo '<br/><h4>$reg_step : ' . $reg_step . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//			//			echo '<h4>$this->_current_step : ' . $this->_current_step . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//			$edit_lnk_class = $this->_current_step == $reg_step ? ' hidden' : '';
//			$edit_lnk_url = add_query_arg( array( 'ee' => '_register', 'step' => $reg_step_details['display_func'] ), $this->_reg_page_base_url );
//			$step_dv_class = $this->_current_step == $reg_step ? '' : ' hidden';
//			$reg_step_form_url = add_query_arg( array( 'ee' => '_register', 'step' => $reg_step_details['process_func'] ), $this->_reg_page_base_url );
//			$next = $this->_get_next_reg_step();
//			//d( $next );
//			$next_step = $next ? $next['display_func'] : 'finalize_registration';
//			$next_step_text = $next ? $proceed_to_btn_text . $next['name'] : $confirmation_btn_text;
//
//			$step_args = array_merge(
//				$template_args,
//				array(
//					'step' => $reg_step,
//					'step_nmbr' => $this->_revisit !== FALSE ? $step_or_revisit : $step_or_revisit . $step_nmbr . ' - ',
//					'edit_lnk_class' => $edit_lnk_class,
//					'edit_lnk_url' => $edit_lnk_url,
//					'step_dv_class' => $step_dv_class,
//					'reg_step_form_url' => $reg_step_form_url,
//					'reg_step_ajax_action' => $reg_step_details['process_func'],
//					'next_step' => $next_step,
//					'next_step_text' => $next_step_text,
//					'revisit' => $this->_revisit
//				)
//			);
//
//			if ( $reg_step == 'payment_options' ) {
//				EE_Registry::instance()->load_model( 'Payment_Method' );
//				// has method_of_payment been set by no-js user?
//				if ( $this->_selected_method_of_payment = $this->_get_selected_method_of_payment() ) {
//					// get EE_Payment_Method object
//					$this->_payment_method = $this->_get_payment_method_for_selected_method_of_payment( $this->_selected_method_of_payment );
//					if ( $this->_payment_method ) {
//						$this->_get_billing_form();
//					}
//				}
//				$step_args['selected_method_of_payment'] = $this->_selected_method_of_payment;
//				$available_payment_methods = EE_Registry::instance()->LIB->EEM_Payment_Method->get_all_for_transaction($this->checkout->transaction, EEM_Payment_Method::scope_cart);
//				$available_pm = array();
//				foreach( $available_payment_methods as $pm ) {
//					//					d( $pm );
//					if ( $pm instanceof EE_Payment_Method ) {
//						$available_pm[ $pm->slug() ]['button_html'] = $pm->button_html( $pm->button_url() );
//						$pm_css_class = $pm->open_by_default() ? '' : 'hidden';
//						$available_pm[ $pm->slug() ]['divo'] = '<div id="reg-page-billing-info-' . $pm->slug() . '-dv" class="reg-page-billing-info-dv ' . $pm_css_class . '">';
//						$available_pm[ $pm->slug() ]['name'] = apply_filters(
//							'FHEE__Single_Page_Checkout__registration_checkout__selected_payment_method',
//							sprintf( __('You have selected "%s" as your method of payment', 'event_espresso' ), $pm->name() )
//						);
//						$available_pm[ $pm->slug() ]['description'] = $pm->description();
//						if ( $billing_form = $pm->type_obj()->billing_form() ) {
//							$available_pm[ $pm->slug() ]['billing_form'] = $billing_form->get_html_and_js();
//						} else {
//							$available_pm[ $pm->slug() ]['billing_form'] = '';
//						}
//						$available_pm[ $pm->slug() ]['divx'] = '</div>';
//					}
//				}
//				$step_args['available_payment_methods'] = $available_pm;
//			}
//
//			//			printr( $step_args, '$step_args  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//
//			//			d( $step_args );
//			$registration_steps .= EEH_Template::locate_template( $this->_templates[ $reg_step_details[ 'template' ] ], $step_args, TRUE, TRUE );
//			// pass step info to js
//			EE_Registry::$i18n_js_strings[ 'reg_steps' ][] = $reg_step_details['display_func'];
//			next( self::$_reg_steps );
//			$step_nmbr++;
//
//		}
//
//		EE_Registry::$i18n_js_strings[ 'reg_steps' ][] = 'finalize_registration';
//
//		$wrapper_args = array(
//			'step' => $this->_current_step,
//			'empty_cart' => $total_items < 1 ? TRUE : FALSE,
//			'reg_steps' => self::$_reg_steps,
//			'registration_steps' => $registration_steps,
//			'revisit' => $this->_revisit,
//			'empty_msg' => apply_filters( 'FHEE__Single_Page_Checkout__registration_checkout__empty_msg', __( 'You need to select at least one event before you can proceed with the registration process.', 'event_espresso' ))
//		);
//		//		d( $wrapper_args );
//		EE_Registry::instance()->REQ->add_output( EEH_Template::locate_template( $this->_templates[ 'registration_page_wrapper' ], $wrapper_args, TRUE, TRUE ));
//
//		return '';

	}



	/**
	 * @return boolean
	 */
	public function process_reg_step() {


		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		$success = TRUE;
		// empty container
		$valid_data = array();

		if ( EE_Registry::instance()->REQ->is_set( 'qstn' )) {
			$valid_data = apply_filters( 'FHEE__EE_Single_Page_Checkout__process_attendee_information__REQ', EE_Registry::instance()->REQ->get( 'qstn' ) );
			// loop through post data and sanitize all elements
			array_walk_recursive( $valid_data, array(  EE_Registry::instance()->REQ, 'sanitize_text_field_for_array_walk' ));
		}
		// if we don't have any $valid_data then something went TERRIBLY WRONG !!! AHHHHHHHH!!!!!!!
		if ( ! empty( $valid_data )) {

			if ( isset( $valid_data['custom_questions'] )) {
				if ( ! $this->checkout->reg_url_link ) {
					EE_Registry::instance()->SSN->set_session_data( array( 'custom_questions' =>$valid_data['custom_questions'] ));
				}
				unset( $valid_data['custom_questions'] );
			}

			$primary_attendee = array();
			$primary_attendee['line_item_id'] = NULL;
			if ( isset( $valid_data['primary_attendee'] )) {
				$primary_attendee['line_item_id'] =  ! empty( $valid_data['primary_attendee'] ) ? $valid_data['primary_attendee'] : FALSE;
				unset( $valid_data['primary_attendee'] );
			}

			//			printr( $valid_data, '$valid_data  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			//			printr( $this->checkout->transaction, '$this->checkout->transaction  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

			// attendee counter
			$att_nmbr = 0;
			if ( $this->_continue_reg ) {
				if ( $this->checkout->transaction instanceof EE_Transaction && $this->_continue_reg ) {
					$registrations = $this->checkout->transaction->registrations( array(), TRUE );
					if ( ! empty( $registrations )) {
						EE_Registry::instance()->load_model( 'Attendee' );
						$this->_primary_attendee_obj = NULL;
						// grab the saved registrations from the transaction
						foreach ( $registrations  as $registration ) {
							// verify EE_Registration object
							if ( $registration instanceof EE_Registration ) {
								// EITHER a) first time thru SPCO so process ALL registrations
								// OR b) primary registrant is editing info, so process ALL registrations
								// OR b) another registrant is editing info, so ONLY process their registration
								if ( ! $this->_revisit || $this->_primary_revisit || ( $this->_revisit && $this->checkout->reg_url_link == $registration->reg_url_link() )) {
									// reg_url_link / line item ID exists ?
									$line_item_id = $registration->reg_url_link();
									if ( $line_item_id ) {
										//										echo '<h5 style="color:#2EA2CC;">$line_item_id : <span style="color:#E76700">' . $line_item_id . '</span><br/><span style="font-size:9px;font-weight:normal;color:#666">' . __FILE__ . '</span>    <b style="font-size:10px;color:#333">  ' . __LINE__ . ' </b></h5>';
										// Houston, we have a registration!
										$att_nmbr++;
										// grab related answer objects
										$answers = $registration->answers();
										//										printr( $answers, '$answers  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
										$attendee_data = array();
										// do we need to copy basic info from primary attendee ?
										$copy_primary = isset( $valid_data[ $line_item_id ]['additional_attendee_reg_info'] ) && absint( $valid_data[ $line_item_id ]['additional_attendee_reg_info'] ) === 0 ? TRUE  : FALSE;
										//										echo '<h5 style="color:#2EA2CC;">$copy_primary : <span style="color:#E76700">' . $copy_primary . '</span><br/><span style="font-size:9px;font-weight:normal;color:#666">' . __FILE__ . '</span>    <b style="font-size:10px;color:#333">  ' . __LINE__ . ' </b></h5>';
										unset( $valid_data[ $line_item_id ]['additional_attendee_reg_info'] );
										if ( isset( $valid_data[ $line_item_id ] )) {
											// filter form input data for this registration
											$valid_data[ $line_item_id ] = apply_filters( 'FHEE__EE_Single_Page_Checkout__process_attendee_information__valid_data_line_item', $valid_data[ $line_item_id ] );
											//									printr( $valid_data[ $line_item_id ], '$valid_data[ $line_item_id ]  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
											// now loop through our array of valid post data && process attendee reg forms
											foreach ( $valid_data[ $line_item_id ] as $form_input => $input_value ) {
												// check for critical inputs
												if ( empty( $input_value )) {

													switch( $form_input ) {
														case 'fname' :
															EE_Error::add_error( __( 'First Name is a required value.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
															$success = FALSE;
															break;
														case 'lname' :
															EE_Error::add_error( __( 'Last Name is a required value.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
															$success = FALSE;
															break;
														case 'email' :
															EE_Error::add_error( __( 'Email Address is a required value.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
															$success = FALSE;
															break;
													}

												} elseif ( $form_input == 'email' ) {
													// clean the email address
													$valid_email = sanitize_email( $input_value );
													// check if it matches
													if ( $input_value != $valid_email ) {
														// whoops!!!
														EE_Error::add_error( __( 'Please enter a valid email address.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
														$success = FALSE;
													}
												}

												// store a bit of data about the primary attendee
												if ( $att_nmbr == 1 && $line_item_id == $primary_attendee['line_item_id'] && ! empty( $input_value )) {
													$primary_attendee[ $form_input ] = $input_value;
												} else if ( $copy_primary && isset( $primary_attendee[ $form_input ] ) && $input_value == NULL ) {
													$input_value = $primary_attendee[ $form_input ];
												}

												// $answer_cache_id is the key used to find the EE_Answer we want
												$answer_cache_id = $this->checkout->reg_url_link ? $form_input : $form_input . '-' . $line_item_id;
												$answer_is_obj = isset( $answers[ $answer_cache_id ] ) && $answers[ $answer_cache_id ] instanceof EE_Answer ? TRUE : FALSE;

												//rename a couple of form_inputs
												switch( $form_input ) {
													case 'state' :
														$form_input = 'STA_ID';
														$attendee_property = TRUE;
														break;
													case 'country' :
														$form_input = 'CNT_ISO';
														$attendee_property = TRUE;
														break;
													default :
														$attendee_property = EEM_Attendee::instance()->has_field('ATT_' . $form_input) ? TRUE : FALSE;
														$form_input = $attendee_property ? 'ATT_' . $form_input : $form_input;
												}

												//echo '<h4>$answer_cache_id : ' . $answer_cache_id . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
												//echo '<h4>attendee_property: ' . $attendee_property . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
												//echo '<h4>$answer_is_obj : ' . $answer_is_obj . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
												//echo '<h4>' . $form_input . ': ' . ( is_array( $input_value ) ? implode( ', ', $input_value ) : $input_value ) . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
												$saved = FALSE;
												// if this form input has a corresponding attendee property
												if ( $attendee_property ) {
													$attendee_data[ $form_input ] = $input_value;
													if (  $answer_is_obj ) {
														// and delete the corresponding answer since we won't be storing this data in that object
														$registration->_remove_relation_to( $answers[ $answer_cache_id ], 'Answer' );
													}
													$saved = TRUE;
												} elseif ( $answer_is_obj ) {
													// save this data to the answer object
													$answers[ $answer_cache_id ]->set_value( $input_value );
													$saved = TRUE;
												} else {
													foreach ( $answers as $answer ) {
														if ( $answer  instanceof EE_Answer && $answer->question_ID() == $answer_cache_id ) {
															$answer->set_value( $input_value );
															$saved = TRUE;
														}
													}

												}
												if ( ! $saved )  {
													EE_Error::add_error( sprintf( __( 'Unable to save registration form data for the form input: %s', 'event_espresso' ), $form_input ), __FILE__, __FUNCTION__, __LINE__ );
													$success = FALSE;
												}

											}  // end of foreach ( $valid_data[ $line_item_id ] as $form_input => $input_value )

										} /*else {
											EE_Error::add_error( sprintf( __( 'It appears that no form data, or invalid data, for attendee #%s was received while attempting to process the registration form.', 'event_espresso' ), $att_nmbr ), __FILE__, __FUNCTION__, __LINE__ );
											$success = FALSE;
										}*/
										//									printr( $attendee_data, '$attendee_data  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

										// this registration does not require additional attendee information ?
										if ( $copy_primary && $att_nmbr > 1 && $this->_primary_attendee_obj instanceof EE_Attendee ) {
											//										echo '<h1>$copy_primary && $att_nmbr > 1  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h1>';
											// add relation to new attendee
											$registration->_add_relation_to( $this->_primary_attendee_obj,
												'Attendee' );
											$registration->set_attendee_id( $this->_primary_attendee_obj->ID() );
											$registration->update_cache_after_object_save( 'Attendee', $this->_primary_attendee_obj );
											//										echo '$copy_primary attendee: '. $this->_primary_attendee_obj->ID() . '<br/>';
										} else {
											// does this attendee already exist in the db ? we're searching using a combination of first name, last name, AND email address
											$ATT_fname = isset( $attendee_data['ATT_fname'] ) && ! empty( $attendee_data['ATT_fname'] ) ? $attendee_data['ATT_fname'] : '';
											$ATT_lname = isset( $attendee_data['ATT_lname'] ) && ! empty( $attendee_data['ATT_lname'] ) ? $attendee_data['ATT_lname'] : '';
											$ATT_email = isset( $attendee_data['ATT_email'] ) && ! empty( $attendee_data['ATT_email'] ) ? $attendee_data['ATT_email'] : '';
											// but only if those have values
											if ( $ATT_fname && $ATT_lname && $ATT_email ) {
												$existing_attendee = EE_Registry::instance()->LIB->EEM_Attendee->find_existing_attendee( array(
													'ATT_fname' => $ATT_fname,
													'ATT_lname' => $ATT_lname,
													'ATT_email' => $ATT_email
												));
											} else {
												$existing_attendee = NULL;
											}
											//										printr( $existing_attendee, '$existing_attendee  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
											$existing_attendee = apply_filters( 'FHEE_EE_Single_Page_Checkout__save_registration_items__find_existing_attendee', $existing_attendee, $registration );
											// did we find an already existing record for this attendee ?
											if ( $existing_attendee instanceof EE_Attendee ) {
												//												echo '<h1>$existing_attendee instanceof EE_Attendee  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h1>';
												// update attendee data in case it has changed since last time they registered for an event
												// first remove fname, lname, and email from attendee data
												unset( $attendee_data['ATT_fname'] );
												unset( $attendee_data['ATT_lname'] );
												unset( $attendee_data['ATT_email'] );
												// now loop thru what' sleft and add to attendee CPT
												foreach ( $attendee_data as $property_name => $property_value ) {
													if ( EEM_Attendee::instance()->has_field($property_name)) {
														$existing_attendee->set( $property_name, $property_value );
													}
												}
												// better save that now
												$existing_attendee->save();
												// add relation to existing attendee
												$registration->_add_relation_to( $existing_attendee, 'Attendee' );
												$registration->set_attendee_id( $existing_attendee->ID() );
												$registration->update_cache_after_object_save( 'Attendee', $existing_attendee );

											} else {
												// ensure critical details are set for additional attendees
												if ( $att_nmbr > 1 ) {
													$critical_attendee_details = array(
														'ATT_fname',
														'ATT_lname',
														'ATT_email',
														'ATT_address',
														'ATT_address2',
														'ATT_city',
														'STA_ID',
														'CNT_ISO',
														'ATT_zip',
														'ATT_phone',
													);
													foreach ( $critical_attendee_details as $critical_attendee_detail ) {
														if ( ! isset( $attendee_data[ $critical_attendee_detail ] ) || empty( $attendee_data[ $critical_attendee_detail ] )) {
															$attendee_data[ $critical_attendee_detail ] = $this->_primary_attendee_obj->get( $critical_attendee_detail );
														}
													}

												}
												// set author to event creator
												$attendee_data['ATT_author'] = $registration->event()->wp_user();
												// create new attendee object
												$new_attendee = EE_Attendee::new_instance( $attendee_data );
												$new_attendee->save();
												//												echo '<h1>$new_attendee  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h1>';
												// add relation to new attendee
												$registration->_add_relation_to( $new_attendee, 'Attendee' );
												$registration->set_attendee_id( $new_attendee->ID() );
												$registration->update_cache_after_object_save( 'Attendee', $new_attendee );

											}

											// who's the man ?
											if ( $att_nmbr == 1 ) {
												$this->_primary_attendee_obj = $registration->get_first_related( 'Attendee' );
												//												printr( $this->_primary_attendee_obj, '$this->_primary_attendee_obj  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
											}
										}


									} else {
										EE_Error::add_error( __( 'An invalid or missing line item ID was encountered while attempting to process the registration form.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
										$success = FALSE;
										// remove malformed data
										unset( $valid_data[ $line_item_id ] );
									}

									if ( ! $registration->attendee() instanceof EE_Attendee ) {
										EE_Error::add_error( sprintf( __( 'Registration %s has an invalid or missing Attendee object.', 'event_espresso' ), $line_item_id ), __FILE__, __FUNCTION__, __LINE__ );
										$success = FALSE;
									}

									//									printr( $registration->attendee(), '$registration->attendee()  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

								} // end of if ( ! $this->_revisit || $this->_primary_revisit || ( $this->_revisit && $this->checkout->reg_url_link == $registration->reg_url_link() )) {

								// end of if ( $registration instanceof EE_Registration )
							} else {
								EE_Error::add_error( __( 'An invalid Registration object was discovered when attempting to process your registration information.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__);
								$success = FALSE;
							}

							//							printr( $registration, '$registration  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

						} // end of foreach ( $this->checkout->transaction->registrations()  as $registration )

						if ( ! $this->checkout->reg_url_link ) {
							EE_Registry::instance()->SSN->set_session_data( array( 'transaction' => $this->checkout->transaction ));
						}

					} else {
						EE_Error::add_error( __( 'Your form data could not be applied to any valid registrations.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
						$success = FALSE;
					}

				} else {
					EE_Error::add_error( __( 'A valid transaction could not be initiated for processing your registrations.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
					$success = FALSE;
				}

			}

		} else {
			EE_Error::add_error( __('No valid question responses were received.', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
			$success = FALSE;
		}

		// grab any errors
		if ( $success ) {
			EE_Error::add_success( __('Attendee information submitted successfully.', 'event_espresso' ));
		}

		//this might be called while in admin and if it is then we don't want to do our normal steps.
		if ( is_admin() && ! EE_Registry::instance()->REQ->front_ajax ) {
			return $success;
		}

		//do action in case a plugin wants to do something with the data submitted in step 1.
		//passes EE_Single_Page_Checkout, and it's posted data
		do_action( 'AHEE__EE_Single_Page_Checkout__process_attendee_information__end', $this, $valid_data );

		$this->go_to_next_step( __FUNCTION__ );
		return TRUE;

	}



	/**
	 *    update_reg_step
	 *    this is the final step after a user  revisits the site to edit their attendee information
	 *    this gets called AFTER the process_reg_step() method above
	 *
	 * @return boolean
	 */
	public function update_reg_step() {
		if ( $this->checkout->transaction instanceof EE_Transaction && $this->_continue_reg ) {
			// save everything
			if ( $this->_save_all_registration_information() ) {
				$this->_thank_you_page_url = add_query_arg( array( 'e_reg_url_link' => $this->checkout->reg_url_link ), $this->_thank_you_page_url );
				$this->_redirect_to_thank_you_page = TRUE;
			}
		}
		$this->go_to_next_step( __FUNCTION__ );
	 }


}



// End of file EE_SPCO_Reg_Step_Attendee_Information.class.php
// Location: /EE_SPCO_Reg_Step_Attendee_Information.class.php