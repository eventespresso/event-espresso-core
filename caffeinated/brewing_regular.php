<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * the purpose of this file is to simply contain any action/filter hook callbacks etc for specific aspects of EE related to caffeinated (regular) use.  Before putting any code in here, First be certain that it isn't better to define and use the hook in a specific caffeinated/whatever class or file.
 */
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright			(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link				http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_Brewing_Regular class.  Just a wrapper to help namespace activity for the functionliaty of this file.
 *
 * @package		Event Espresso
 * @subpackage	/caffeinated/brewing_regular.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Brewing_Regular extends EE_Base {

	public function __construct() {
		// defined some new constants related to caffeinated folder
		if ( defined( 'EE_CAFF_PATH' )) {
			define('EE_CAF_URL', EE_PLUGIN_DIR_URL . 'caffeinated/' );
			define('EE_CAF_CORE', EE_CAFF_PATH . 'core' . DS);
			define('EE_CAF_LIBRARIES', EE_CAF_CORE . 'libraries' . DS);
			// activation
			add_action( 'AHEE__EEH_Activation__initialize_db_content', array( $this, 'initialize_caf_db_content' ));
			// load caff init
			add_action( 'AHEE__EE_System__set_hooks_for_core', array( $this, 'caffeinated_init' ));
			// make it so the PDF receipt doesn't show our shameless plug
			add_filter( 'FHEE_Invoice__send_invoice__shameless_plug', '__return_false' );
			// add caffeinated modules
			add_filter( 'FHEE__EE_Config__register_modules__modules_to_register', array( $this, 'caffeinated_modules_to_register' ));
			// load caff scripts
			add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_caffeinated_scripts'), 10 );
			// caffeinated constructed
			do_action( 'AHEE__EE_Brewing_Regular__construct__complete' );
		}
	}



	/**
	 * Upon brand-new activation, if this is a new activation of CAF, we want to add
	 * some global prices that will show off EE4's capabilities. However, if they're upgrading
	 * from 3.1, or simply 4.1 decaf, we assume they don't want us to suddenly introduce these extra prices.
	 * This action should only be called when EE 4.1.0P is initially activated.
	 * Right now the only CAF content are these global prices. If there's more in teh future, then
	 * we should probably create a caf file to contain it all instead just a function like this.
	 * Right now, we ASSUME the only price types in the system are default ones
	 * @global type $wpdb
	 */
	function initialize_caf_db_content(){
//		echo "initialize caf db content!";
		global $wpdb;

		$price_type_table = $wpdb->prefix."esp_price_type";
		$price_table = $wpdb->prefix."esp_price";

		if ($wpdb->get_var("SHOW TABLES LIKE '$price_type_table'") == $price_type_table) {

			$SQL = 'SELECT COUNT(PRT_ID) FROM ' . $price_type_table . ' WHERE PBT_ID=4';//include trashed price types
			$tax_price_type_count = $wpdb->get_var( $SQL );

			if ( $tax_price_type_count <= 1) {
				$result = $wpdb->insert($price_type_table,
						array(
							'PRT_name'=>  __("Regional Tax", "event_espresso"),
							'PBT_ID'=>4,
							'PRT_is_percent'=>true,
							'PRT_order'=>60,
							'PRT_deleted'=>false
						),
						array(
							'%s',//PRT_name
							'%d',//PBT_id
							'%d',//PRT_is_percent
							'%d',//PRT_order
							'%d',//PRT_deleted
						));
				//federal tax
				$result = $wpdb->insert($price_type_table,
						array(
							'PRT_name'=>  __("Federal Tax", "event_espresso"),
							'PBT_ID'=>4,
							'PRT_is_percent'=>true,
							'PRT_order'=>70,
							'PRT_deleted'=>false
						),
						array(
							'%s',//PRT_name
							'%d',//PBT_id
							'%d',//PRT_is_percent
							'%d',//PRT_order
							'%d',//PRT_deleted
						));
				if( $result){
					$wpdb->insert($price_table,
							array(
								'PRT_ID'=>$wpdb->insert_id,
								'PRC_amount'=>15.00,
								'PRC_name'=>  __("Sales Tax", "event_espresso"),
								'PRC_desc'=>  '',
								'PRC_is_default'=>true,
								'PRC_overrides'=>NULL,
								'PRC_deleted'=>false,
								'PRC_order'=>50,
								'PRC_parent'=>null
							),
							array(
								'%d',//PRT_id
								'%f',//PRC_amount
								'%s',//PRC_name
								'%s',//PRC_desc
								'%d',//PRC_is_default
								'%d',//PRC_overrides
								'%d',//PRC_deleted
								'%d',//PRC_order
								'%d',//PRC_parent
							));
				}


			}
		}


	}


	/**
	 * 	caffeinated_modules_to_register
	 *
	 * 	@access public
	 *  	@param array $modules_to_register
	 *  	@return array
	 */
	public function caffeinated_modules_to_register( $modules_to_register = array() ){
		if ( is_readable( EE_CAFF_PATH . 'modules' )) {
			$caffeinated_modules_to_register = glob( EE_CAFF_PATH . 'modules' . DS . '*', GLOB_ONLYDIR );
			if ( is_array( $caffeinated_modules_to_register ) && ! empty( $caffeinated_modules_to_register )) {
				$modules_to_register = array_merge( $modules_to_register, $caffeinated_modules_to_register );
			}
		}
		return $modules_to_register;
	}



	public function caffeinated_init(){
		// EE_Register_CPTs hooks
		add_filter('FHEE__EE_Register_CPTs__construct__taxonomies', array( $this, 'filter_taxonomies' ), 10 );
		add_filter('FHEE__EE_Register_CPTs__construct__CPTs', array( $this, 'filter_cpts' ), 10 );
		add_filter('FHEE__EE_Admin__get_extra_nav_menu_pages_items', array( $this, 'nav_metabox_items' ), 10 );
		$this->_messages_caf();
		// caffeinated_init__complete hook
		do_action( 'AHEE__EE_Brewing_Regular__caffeinated_init__complete' );
	}



	public function enqueue_caffeinated_scripts(){
		// sound of crickets...
	}


	/**
	 * callbacks below here
	 */

	public function filter_taxonomies( $taxonomy_array ) {
		$taxonomy_array['espresso_venue_categories']['args']['show_in_nav_menus'] = TRUE;
		return $taxonomy_array;
	}



	public function filter_cpts( $cpt_array ) {
		$cpt_array['espresso_venues']['args']['show_in_nav_menus'] = TRUE;
		return $cpt_array;
	}


	public function nav_metabox_items( $menuitems ) {
		$menuitems[] = array(
			'title' => __('Venue List', 'event_espresso'),
			'url' => get_post_type_archive_link( 'espresso_venues' ),
			'description' => __('Archive page for all venues.', 'event_espresso')
			);
		return $menuitems;
	}




	/******************************
	 * EE_Messages_Caf functionality
	 *******************************
	 */

	private function _messages_caf() {
		add_filter('FHEE__EE_Messages_Init__autoload_messages__dir_ref', array( $this, 'messages_autoload_paths'), 10 );
		add_filter('FHEE__EE_Email_messenger__get_validator_config', array( $this, 'email_messenger_validator_config'), 10, 2 );
		add_filter('FHEE__EE_Email_messenger__get_template_fields', array( $this, 'email_messenger_template_fields'), 10, 2 );
		add_filter('FHEE__EE_Email_messenger__get_default_field_content', array( $this, 'email_default_field_content'), 10, 2 );
		add_filter('FHEE__EE_Message_Template_Defaults___create_new_templates___templates', array( $this, 'message_types_default_field_content'), 10, 4 );
		add_filter('FHEE__EE_Messages_Base__get_valid_shortcodes', array( $this, 'message_types_valid_shortcodes'), 10, 2 );

		//shortcode parsers
		add_filter('FHEE__EE_Attendee_Shortcodes__shortcodes', array( $this, 'additional_attendee_shortcodes'), 10, 2 );
		add_filter('FHEE__EE_Attendee_Shortcodes__parser_after', array( $this, 'additional_attendee_parser'), 10, 5 );
		add_filter('FHEE__EE_Recipient_List_Shortcodes__shortcodes', array( $this, 'additional_recipient_details_shortcodes'), 10, 2 );
		add_filter('FHEE__EE_Recipient_List_Shortcodes__parser_after', array( $this, 'additional_recipient_details_parser'), 10, 5 );
		add_filter('FHEE__EE_Primary_Registration_List_Shortcodes__shortcodes', array( $this, 'additional_primary_registration_details_shortcodes'), 10, 2 );
		add_filter('FHEE__EE_Primary_Registration_List_Shortcodes__parser_after', array( $this, 'additional_primary_registration_details_parser'), 10, 5 );

		/**
		 * @since 4.2
		 */
		add_filter( 'FHEE__EE_Datetime_Shortcodes__shortcodes', array( $this, 'additional_datetime_shortcodes'), 10, 2 );
		add_filter( 'FHEE__EE_Datetime_Shortcodes__parser_after', array( $this, 'additional_datetime_parser'), 10, 5 );
	}


	/**
	 * This just allows us to add additional paths to the autoloader (EE_Messages_Init::autoload_messages()) for the messages system.
	 * @param  array  $dir_ref original array of paths
	 * @return array           appended paths
	 */
	public function messages_autoload_paths( $dir_ref ) {
		$dir_ref[EE_CAF_LIBRARIES . 'shortcodes/'] = 'lib';
		return $dir_ref;
	}



	public function email_messenger_validator_config( $validator_config, EE_Email_messenger $messenger ) {
		$validator_config['attendee_list'] = array(
				'shortcodes' => array('attendee', 'event_list', 'ticket_list', 'question_list'),
				'required' => array('[ATTENDEE_LIST]')
				);
		$validator_config['question_list'] = array(
				'shortcodes' => array('question'),
				'required' => array('[QUESTION_LIST]')
				);
		return $validator_config;
	}




	public function email_messenger_template_fields( $template_fields, EE_Email_messenger $messenger ) {
		$template_fields['extra']['content']['question_list'] = array(
						'input' => 'textarea',
						'label' => '[QUESTION_LIST]',
						'type' => 'string',
						'required' => TRUE,
						'validation' => TRUE,
						'format' => '%s',
						'css_class' => 'large-text',
						'rows' => '5',
						'shortcodes_required' => array('[QUESTION_LIST]')
					);
		return $template_fields;
	}



	public function email_default_field_content( $default_field_content, EE_Email_messenger $messenger ) {
		$default_field_content['content']['question_list'] = __('This contains the formatting for each question and answer in a list of questions and answers for a registrant', 'evnt_espresso');
		return $default_field_content;
	}



	public function message_types_default_field_content( $default_field_content, $evt_id, $is_global,  EE_Message_Template_Defaults $msg ) {

		switch ( get_class( $msg ) ) {

			case 'EE_Messages_Email_Registration_Defaults' :
			case 'EE_Messages_Resend_Registration_Defaults' :
				$contexts = $msg->get_contexts();
				foreach ( $contexts as $context => $details ) {
					$default_field_content[$context]['content']['question_list'] = file_get_contents( EE_CAF_LIBRARIES . 'messages/message_type/assets/defaults/registration-message-type-question-list.template.php', TRUE );
					$default_field_content[$context]['content']['attendee_list'] = file_get_contents( EE_CAF_LIBRARIES . 'messages/message_type/assets/defaults/registration-message-type-attendee-list.template.php', TRUE );
				}
				$default_field_content['attendee']['content']['event_list'] = file_get_contents( EE_CAF_LIBRARIES . 'messages/message_type/assets/defaults/attendee/registration-message-type-attendee-event-list.template.php', TRUE );
				$default_field_content['admin']['content']['attendee_list'] = file_get_contents( EE_CAF_LIBRARIES . 'messages/message_type/assets/defaults/admin/registration-message-type-admin-attendee-list.template.php', TRUE );
				$default_field_content['attendee']['content']['attendee_list'] = '';
				break;

			default :
				return $default_field_content;
				break;
		}

		return $default_field_content;

	}



	public function message_types_valid_shortcodes( $valid_shortcodes, EE_Messages_Base $msg ) {
		if ( $msg instanceof EE_message_type ) {
			$contexts = array_keys($msg->get_contexts());
				foreach ( $contexts as $context ) {
					$valid_shortcodes[$context][] = 'question_list';
					$valid_shortcodes[$context][] = 'question';
				}
		}

		return $valid_shortcodes;
	}




	public function additional_attendee_shortcodes( $shortcodes, $shortcode_parser ) {
		$shortcodes['[ANSWER_*]'] = __('This is a special dynamic shortcode. Right after the "*", add the exact text of a existing question, and if there is an answer for that question for this registrant, that will take the place of this shortcode.', 'event_espresso');
		return $shortcodes;
	}



	public function additional_attendee_parser( $parsed, $shortcode, $data, $extra_data, $shortcode_parser ) {

		if ( strpos( $shortcode, '[ANSWER_*' ) === FALSE || !isset( $extra_data['data']->questions) || !isset( $extra_data['data']->registrations) )
			return $parsed;

		//let's get the question from the code.
		$shortcode = str_replace('[ANSWER_*', '', $shortcode);
		$shortcode = str_replace(']', '', $shortcode);

		//now let's figure out which question has this text.
		foreach ( $extra_data['data']->questions as $ansid => $question ) {
			if ( $question->get('QST_display_text') == $shortcode && isset($extra_data['data']->registrations[$data->ID()]['ans_objs'][$ansid]) )
				return $extra_data['data']->registrations[$data->ID()]['ans_objs'][$ansid]->get_pretty('ANS_value', 'no_wpautop');
		}

		//nothing!
		return $parsed;
	}




	/**
	 * Callback for additional shortcodes filter for adding additional datetime shortcodes.
	 *
	 * @since  4.2
	 * @param  array  					$shortcodes       	array of shortcodes and
	 *                                       				descriptions
	 * @param  EE_Datetime_Shortcodes 	$shortcode_parser 	EE_Shortcodes object
	 * @return array                   						array of shortcodes and
	 *                                             			descriptions
	 */
	public function additional_datetime_shortcodes( $shortcodes, $shortcode_parser ) {
		$shortcodes['[DTT_NAME]'] = __('This will be parsed to the Title given for a Datetime', 'event_espresso');
		$shortcodes['[DTT_DESCRIPTION]'] = __('This will be parsed to the description for a Datetime', 'event_espresso');
		$shortcodes['[DTT_NAME_OR_DATES]'] = __('When parsed, if the Datetime has a name, it is used, otherwise a formatted string including the start date and end date will be used.', 'event_espresso');
		return $shortcodes;
	}



	/**
	 * Callback for additional shortcodes parser filter used for adding parser for new
	 * Datetime shortcodes
	 *
	 * @since  4.2
	 * @param  string $parsed           The finished parsed string for the given shortcode.
	 * @param  string $shortcode        The shortcode being parsed.
	 * @param  object $data             The incoming data object for the Shortcode Parser.
	 * @param  object $extra_data       The incoming extra date object for the Shortcode
	 *                                  Parser.
	 * @param  EE_Datetime_Shortcodes $shortcode_parser
	 * @return string                   The new parsed string.
	 */
	public function additional_datetime_parser( $parsed, $shortcode, $data, $extra_data, $shortcode_parser ) {

		if ( ! $data instanceof EE_Datetime ) {
			return ''; //get out because we can only parse with the datetime object.
		}

		switch ( $shortcode ) {
			case '[DTT_NAME]' :
				return $data->name();
				break;
			case '[DTT_DESCRIPTION]' :
				return $data->description();
				break;
			case '[DTT_NAME_OR_DATES]' :
				return $data->get_dtt_display_name( TRUE );
				break;
			default :
				return $parsed;
				break;
		}
	}





	public function additional_recipient_details_shortcodes( $shortcodes, $shortcode_parser ) {
		$shortcodes['[RECIPIENT_QUESTION_LIST]'] = __('This is used to indicate where you want the list of questions and answers to show for the person receiving the message.', 'event_espresso');
		return $shortcodes;
	}


	public function additional_recipient_details_parser( $parsed, $shortcode, $data, $extra_data, $shortcode_parser ) {

		if ( array($data) && ! isset( $data['data'] ) )
			return $parsed;

		$recipient = $data['data'] instanceof EE_Messages_Addressee ? $data['data'] : NULL;
		$recipient = ! $recipient instanceof EE_Messages_Addressee && array($extra_data) && isset( $extra_data['data'] ) && $extra_data['data'] instanceof EE_Messages_Addressee ? $extra_data['data'] : $recipient;

		if ( ! $recipient instanceof EE_Messages_Addressee )
			return $parsed;

		$send_data = ! $data['data'] instanceof EE_Messages_Addressee ? $extra_data : $data;

		switch ( $shortcode ) {
			case '[RECIPIENT_QUESTION_LIST]' :
				if ( ! $recipient->reg_obj instanceof EE_Registration || ! $recipient->att_obj instanceof EE_Attendee )
					return '';

				$registration = $recipient->reg_obj;
				$attendee = $recipient->att_obj;
				$template = is_array($data['template'] ) && isset($data['template']['question_list']) ? $data['template']['question_list'] : $extra_data['template']['question_list'];
				$valid_shortcodes = array('question');
				$shortcode_helper = $shortcode_parser->get_shortcode_helper();
				$answers = !empty($recipient->registrations[$registration->ID()]['ans_objs']) ? $recipient->registrations[$registration->ID()]['ans_objs'] : array();
				$question_list = '';
				foreach ( $answers as $answer ) {
					$question_list .= $shortcode_helper->parse_question_list_template( $template, $answer, $valid_shortcodes, $send_data);
				}
				return $question_list;
				break;

			default :
				return $parsed;
				break;
		}
	}


	public function additional_primary_registration_details_shortcodes( $shortcodes, $shortcode_parser ) {
		$shortcodes['[PRIMARY_REGISTRANT_QUESTION_LIST]'] = __('This is used to indicate the questions and answers for the primary_registrant. It should be placed in the "[attendee_list]" field', 'event_espresso');
		return $shortcodes;
	}


	public function additional_primary_registration_details_parser( $parsed, $shortcode, $data, $extra_data, $shortcode_parser ) {
		if ( array($data) && ! isset( $data['data'] ) )
			return $parsed;

		$recipient = $data['data'] instanceof EE_Messages_Addressee ? $data['data'] : NULL;
		$recipient = ! $recipient instanceof EE_Messages_Addressee && array($extra_data) && isset( $extra_data['data'] ) && $extra_data['data'] instanceof EE_Messages_Addressee ? $extra_data['data'] : $recipient;

		if ( ! $recipient instanceof EE_Messages_Addressee )
			return $parsed;

		$send_data = ! $data['data'] instanceof EE_Messages_Addressee ? $extra_data : $data;

		switch ( $shortcode ) {
			case '[RECIPIENT_QUESTION_LIST]' :
				if ( ! $recipient->primary_att_obj instanceof EE_Attendee || ! $recipient->primary_reg_obj instanceof EE_Registration )
					return '';
				$attendee = $recipient->primary_att_obj;
				$registration = $recipient->primary_reg_obj;
				$template = is_array($data['template'] ) && isset($data['template']['question_list']) ? $data['template']['question_list'] : $extra_data['template']['question_list'];
				$valid_shortcodes = array('question');
				$shortcode_helper = $shortcode_parser->get_shortcode_helper();
				$answers = $recipient->registrations[$registration->ID()]['ans_objs'];
				$question_list = '';
				foreach ( $answers as $answer ) {
					$question_list .= $shortcode_helper->parse_question_list_template( $template, $answer, $valid_shortcodes, $send_data);
				}
				return $question_list;
				break;

			default :
				return $parsed;
				break;
		}
	}


}
$brewing = new EE_Brewing_Regular();
