<?php
/**
 * This file contains the Caffeinated Messages class that handles plugging in all the caffeinated messages functionality.
 * @package      Event Espresso
 * @subpackage plugin api, messages
 * @since           4.3.2
 */
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

/**
 * Used to initialize all EE messages caffeianted functionality.
 *
 * @package        Event Espresso
 * @subpackage  messages
 * @since            4.3.2
 * @author          Darren Ethier
 */
class EE_Caf_Messages  {


	/**
	 * constructor.
	 */
	public function __construct() {
		$this->_caf_hooks();
	}


	/**
	 * Contains all the hooks filters for setting up caffeinated messages functionality.
	 *
	 * @since 4.3.2
	 *
	 * @return void
	 */
	private function _caf_hooks() {
		add_filter('FHEE__EED_Messages___set_messages_paths___MSG_PATHS', array( $this, 'messages_autoload_paths'), 5 );
		add_filter('FHEE__EE_Email_messenger__get_validator_config', array( $this, 'email_messenger_validator_config'), 5, 2 );
		add_filter('FHEE__EE_Email_messenger__get_template_fields', array( $this, 'email_messenger_template_fields'), 5, 2 );
		add_filter('FHEE__EE_Messages_Template_Pack__get_specific_template__contents', array( $this, 'new_default_templates'), 5, 7 );
		add_filter('FHEE__EE_Messages_Base__get_valid_shortcodes', array( $this, 'message_types_valid_shortcodes'), 5, 2 );

		//shortcode parsers
		add_filter('FHEE__EE_Attendee_Shortcodes__shortcodes', array( $this, 'additional_attendee_shortcodes'), 5, 2 );
		add_filter('FHEE__EE_Attendee_Shortcodes__parser_after', array( $this, 'additional_attendee_parser'), 5, 5 );
		add_filter('FHEE__EE_Recipient_List_Shortcodes__shortcodes', array( $this, 'additional_recipient_details_shortcodes'), 5, 2 );
		add_filter('FHEE__EE_Recipient_List_Shortcodes__parser_after', array( $this, 'additional_recipient_details_parser'), 5, 5 );
		add_filter('FHEE__EE_Primary_Registration_List_Shortcodes__shortcodes', array( $this, 'additional_primary_registration_details_shortcodes'), 5, 2 );
		add_filter('FHEE__EE_Primary_Registration_List_Shortcodes__parser_after', array( $this, 'additional_primary_registration_details_parser'), 5, 5 );

		/**
		 * @since 4.2.0
		 */
		add_filter( 'FHEE__EE_Datetime_Shortcodes__shortcodes', array( $this, 'additional_datetime_shortcodes'), 10, 2 );
		add_filter( 'FHEE__EE_Datetime_Shortcodes__parser_after', array( $this, 'additional_datetime_parser'), 10, 5 );

		/**
		 * @since 4.3.0
		 */
		//eat our own dogfood!
		add_action('EE_Brewing_Regular___messages_caf', array( $this, 'register_caf_message_types' ) );
		add_action('EE_Brewing_Regular___messages_caf', array( $this, 'register_caf_shortcodes' ) );
		do_action('EE_Brewing_Regular___messages_caf');
	}



	/**
	 * This just allows us to add additional paths to the autoloader (EED_Messages::autoload_messages()) for the messages system.
	 * @param  array  $dir_ref original array of paths
	 * @return array           appended paths
	 */
	public function messages_autoload_paths( $dir_ref ) {
		$dir_ref[] = EE_CAF_LIBRARIES . 'shortcodes/';
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



	public function new_default_templates( $contents, $actual_path, EE_messenger $messenger, EE_message_type $message_type, $field, $context, EE_Messages_Template_Pack $template_pack  ) {

		//we're only modifying templates for the default template pack
		if ( ! $template_pack instanceof EE_Messages_Template_Pack_Default ) {
			return $contents;
		}

		//the template file name we're replacing contents for.
		$template_file_prefix = $field . '_' . $context;
		$msg_prefix = $messenger->name . '_' . $message_type->name . '_' ;

		$base_path = EE_CAF_LIBRARIES . 'messages/defaults/default/';

		if ( $messenger->name == 'email' && $message_type->name == 'registration' ) {

			switch ( $template_file_prefix ) {

				case 'question_list_admin' :
				case 'question_list_attendee' :
				case 'question_list_primary_attendee' :
					$path = $base_path . $msg_prefix . 'question_list.template.php';
					$contents = EEH_Template::display_template( $path, array(), true );
					break;

				case 'attendee_list_primary_attendee' :
					$path = $base_path . $msg_prefix . 'attendee_list.template.php';
					$contents = EEH_Template::display_template( $path, array(), true );
					break;

				case 'attendee_list_admin' :
					$path = $base_path . $msg_prefix . 'attendee_list_admin.template.php';
					$contents = EEH_Template::display_template( $path,
						array(), true );
					break;

				case 'attendee_list_attendee' :
					$contents = '';
					break;

				case 'event_list_attendee' :
					$path = $base_path . $msg_prefix . 'event_list_attendee.template.php';
					$contents = EEH_Template::display_template( $path, array(), true );
					break;
			}
		} elseif ( $messenger->name == 'email' && $message_type->name == 'newsletter' ) {
			switch( $template_file_prefix ) {

				case 'content_attendee' :
					$path = $base_path . $msg_prefix . 'content.template.php';
					$contents = EEH_Template::display_template( $path, array(), true );
					break;

				case 'newsletter_content_attendee' :
					$path = $base_path . $msg_prefix . 'newsletter_content.template.php';
					$contents = EEH_Template::display_template( $path, array(), true );
					break;

				case 'newsletter_subject_attendee' :
					$path = $base_path . $msg_prefix . 'subject.template.php';
					$contents = EEH_Template::display_template( $path, array(), true );
					break;
			}
		}

		return $contents;

	}



	public function message_types_valid_shortcodes( $valid_shortcodes, EE_Messages_Base $msg ) {
		//make sure question_list and question are ONLY added for the core message types.  Any other message types will have to explicitly set question_list as a valid shortcode.
		$include_with = array(
			'registration',
			'cancelled_registration',
			'declined_registration',
			'not_approved_registration',
			'payment_declined',
			'payment',
			'payment_reminder',
			'pending_approval'
			);
		if ( $msg instanceof EE_message_type && in_array( $msg->name, $include_with )) {
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



	/**
	 * Takes care of registering the  message types that are only available in caffeinated EE.
	 *
	 * @since   4.3.2
	 *
	 * @return  void
	 */
	public function register_caf_message_types() {
		//register newsletter message type
		$setup_args = array(
			'mtfilename' => 'EE_Newsletter_message_type.class.php',
			'autoloadpaths' => array(
				EE_CAF_LIBRARIES . 'messages/message_type/newsletter/'
				),
			'messengers_to_activate_with' => array( 'email' ),
			'messengers_to_validate_with' => array( 'email' )
			);
		EE_Register_Message_Type::register( 'newsletter', $setup_args );

		//register payment reminder message type
		$setup_args = array(
			'mtfilename' => 'EE_Payment_Reminder_message_type.class.php',
			'autoloadpaths' => array( EE_CAF_LIBRARIES . 'messages/message_type/payment_reminder/' ),
			'messengers_to_activate_with' => array( 'email' ),
			'messengers_to_validate_with' => array( 'email' )
			);
		EE_Register_Message_Type::register( 'payment_reminder', $setup_args );

		//register payment declined message type
		$setup_args = array(
			'mtfilename' => 'EE_Payment_Declined_message_type.class.php',
			'autoloadpaths' => array( EE_CAF_LIBRARIES . 'messages/message_type/payment_declined/' ),
			'messengers_to_activate_with' => array( 'email' ),
			'messengers_to_validate_with' => array( 'email' )
			);
		EE_Register_Message_Type::register( 'payment_declined', $setup_args );

		//register registration declined message type
		$setup_args = array(
			'mtfilename' => 'EE_Declined_Registration_message_type.class.php',
			'autoloadpaths' => array( EE_CAF_LIBRARIES . 'messages/message_type/declined_registration/' ),
			'messengers_to_activate_with' => array( 'email' ),
			'messengers_to_validate_with' => array( 'email' )
			);
		EE_Register_Message_Type::register( 'declined_registration', $setup_args );

		//register registration cancelled message type
		$setup_args = array(
			'mtfilename' => 'EE_Cancelled_Registration_message_type.class.php',
			'autoloadpaths' => array( EE_CAF_LIBRARIES . 'messages/message_type/cancelled_registration/' ),
			'messengers_to_activate_with' => array( 'email' ),
			'messengers_to_validate_with' => array( 'email' )
			);
		EE_Register_Message_Type::register( 'cancelled_registration', $setup_args );
	}




	/**
	 * Takes care of registering the  shortcode libraries implemented with caffeinated EE and set up related items.
	 *
	 * @since   4.3.2
	 *
	 * @return void
	 */
	public function register_caf_shortcodes() {
		$setup_args = array(
			'autoloadpaths' => array(
				EE_CAF_LIBRARIES . 'shortcodes/'
				),
			'msgr_validator_callback' => array( 'EE_Newsletter_Shortcodes', 'messenger_validator_config' ),
			'msgr_template_fields_callback' => array( 'EE_Newsletter_Shortcodes', 'messenger_template_fields' ),
			'list_type_shortcodes' => array( '[NEWSLETTER_CONTENT]' )
			);
		EE_Register_Messages_Shortcode_Library::register( 'newsletter', $setup_args );
	}
}
