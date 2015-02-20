<?php
/**
 * This file contains all deprecated actions, filters, and functions in EE.
 * @package      Event Espresso
 * @subpackage helpers
 * @since           4.5.0
 */
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * ee_deprecated__registration_checkout__button_text
 *
 * @param string       $submit_button_text
 * @param \EE_Checkout $checkout
 * @return string
 */
function ee_deprecated__registration_checkout__button_text( $submit_button_text, EE_Checkout $checkout ) {
	// list of old filters
	$deprecated_filters = array(
		'update_registration_details' => true,
		'process_payment' => true,
		'finalize_registration' => true,
		'and_proceed_to_payment' => true,
		'proceed_to' => true,
	);
	// loop thru and call doing_it_wrong() or remove any that aren't being used
	foreach ( $deprecated_filters as $deprecated_filter => $on ) {
		// was this filter called ?
		if ( has_action( 'FHEE__EED_Single_Page_Checkout__registration_checkout__button_text__' . $deprecated_filter )) {
			// only display doing_it_wrong() notice to Event Admins during non-AJAX requests
			if ( EE_Registry::instance()->CAP->current_user_can( 'ee_read_ee', 'hide_doing_it_wrong_for_deprecated_SPCO_filter' ) && ! defined( 'DOING_AJAX' ) ) {
				EE_Error::doing_it_wrong(
					'FHEE__EED_Single_Page_Checkout__registration_checkout__button_text__' . $deprecated_filter,
					sprintf(
						__( 'The %1$s filter is deprecated.  It *may* work as an attempt to build in backwards compatibility.  However, it is recommended to use the following new filter: %2$s"%3$s" found in "%4$s"', 'event_espresso' ),
						'FHEE__EED_Single_Page_Checkout__registration_checkout__button_text__' . $deprecated_filter,
						'<br />',
						'FHEE__EE_SPCO_Reg_Step__set_submit_button_text___submit_button_text',
						'/modules/single_page_checkout/inc/EE_SPCO_Reg_Step.class.php'
					),
					'4.6.10',
					E_USER_DEPRECATED
				);
			}
		} else {
			unset( $deprecated_filters[ $deprecated_filter ] );
		}
	}
	if ( ! empty( $deprecated_filters )) {

		if ( $checkout->current_step->slug() == 'attendee_information' && $checkout->revisit && isset( $deprecated_filters[ 'update_registration_details' ] )) {
			$submit_button_text = apply_filters( 'FHEE__EED_Single_Page_Checkout__registration_checkout__button_text__update_registration_details', $submit_button_text );
		} else if ( $checkout->current_step->slug() == 'payment_options' && $checkout->revisit && isset( $deprecated_filters[ 'process_payment' ] ) ) {
			$submit_button_text = apply_filters( 'FHEE__EED_Single_Page_Checkout__registration_checkout__button_text__process_payment', $submit_button_text );
		} else if ( $checkout->next_step instanceof EE_SPCO_Reg_Step && $checkout->next_step->slug() == 'finalize_registration' && isset( $deprecated_filters[ 'finalize_registration' ] ) ) {
			$submit_button_text = apply_filters( 'FHEE__EED_Single_Page_Checkout__registration_checkout__button_text__finalize_registration', $submit_button_text );
		}
		if ( $checkout->next_step instanceof EE_SPCO_Reg_Step ) {
			if ( $checkout->payment_required() && $checkout->next_step->slug() == 'payment_options' && isset( $deprecated_filters[ 'and_proceed_to_payment' ] ) ) {
				$submit_button_text .= apply_filters( 'FHEE__EED_Single_Page_Checkout__registration_checkout__button_text__and_proceed_to_payment', $submit_button_text );
			}
			if ( $checkout->next_step->slug() != 'finalize_registration' && ! $checkout->revisit && isset( $deprecated_filters[ 'proceed_to' ] ) ) {
				$submit_button_text = apply_filters( 'FHEE__EED_Single_Page_Checkout__registration_checkout__button_text__proceed_to', $submit_button_text ) . $checkout->next_step->name();
			}
		}

	}
	return $submit_button_text;

}
add_filter( 'FHEE__EE_SPCO_Reg_Step__set_submit_button_text___submit_button_text', 'ee_deprecated__registration_checkout__button_text', 10, 2 );




/**
 * ee_deprecated_finalize_transaction
 *
 * @param \EE_Checkout $checkout
 * @param boolean $status_updates
 */
function ee_deprecated_finalize_transaction( EE_Checkout $checkout, $status_updates ) {
	$action_ref = NULL;
	$action_ref = has_action( 'AHEE__EE_Transaction__finalize__new_transaction' ) ? 'AHEE__EE_Transaction__finalize__new_transaction' : $action_ref;
	$action_ref = has_action( 'AHEE__EE_Transaction__finalize__all_transaction' ) ? 'AHEE__EE_Transaction__finalize__all_transaction' : $action_ref;
	if ( $action_ref ) {

		EE_Error::doing_it_wrong(
			$action_ref,
			sprintf(
				__( 'This action is deprecated.  It *may* work as an attempt to build in backwards compatibility.  However, it is recommended to use one of the following new actions: %1$s"%3$s" found in "%2$s" %1$s"%4$s" found in "%2$s" %1$s"%5$s" found in "%2$s" %1$s"%6$s" found in "%2$s"', 'event_espresso' ),
				'<br />',
				'/core/business/EE_Transaction_Processor.class.php',
				'AHEE__EE_Transaction_Processor__finalize',
				'AHEE__EE_Transaction_Processor__manually_update_registration_statuses',
				'AHEE__EE_Transaction_Processor__toggle_registration_statuses_for_default_approved_events',
				'AHEE__EE_Transaction_Processor__toggle_registration_statuses_if_no_monies_owing'
			),
			'4.6.0',
			E_USER_DEPRECATED
		);
		switch ( $action_ref ) {
			case 'AHEE__EE_Transaction__finalize__new_transaction' :
				do_action( 'AHEE__EE_Transaction__finalize__new_transaction', $checkout->transaction, $checkout->admin_request );
				break;
			case 'AHEE__EE_Transaction__finalize__all_transaction' :
				do_action( 'AHEE__EE_Transaction__finalize__new_transaction', $checkout->transaction, array( 'new_reg' => ! $checkout->revisit, 'to_approved' => $status_updates ), $checkout->admin_request );
				break;
		}
	}
}
add_action( 'AHEE__EE_SPCO_Reg_Step_Finalize_Registration__process_reg_step__completed', 'ee_deprecated_finalize_transaction', 10, 2 );
/**
 * ee_deprecated_finalize_registration
 *
 * @param EE_Registration $registration
 */
function ee_deprecated_finalize_registration( EE_Registration $registration ) {
	$action_ref = has_action( 'AHEE__EE_Registration__finalize__update_and_new_reg' ) ? 'AHEE__EE_Registration__finalize__update_and_new_reg' : NULL;
	if ( $action_ref ) {
		EE_Error::doing_it_wrong(
			$action_ref,
			sprintf(
				__( 'This action is deprecated.  It *may* work as an attempt to build in backwards compatibility.  However, it is recommended to use the following new action: %1$s"%3$s" found in "%2$s"', 'event_espresso' ),
				'<br />',
				'/core/business/EE_Registration_Processor.class.php',
				'AHEE__EE_Registration_Processor__trigger_registration_status_changed_hook'
			),
			'4.6.0',
			E_USER_DEPRECATED
		);
		do_action( 'AHEE__EE_Registration__finalize__update_and_new_reg', $registration, ( is_admin() && ! ( defined( 'DOING_AJAX' ) && DOING_AJAX )));
	}
}
add_action( 'AHEE__EE_Registration_Processor__trigger_registration_update_notifications', 'ee_deprecated_finalize_registration', 10, 1 );




/** Messages System deprecated things **/


/**
 * wrapper for deprecated FHEE__*___create_new_templates__templates filter.  Note depending on how this was used, it may or may not degrade gracefully for clients using the existing filter because the old Default classes are NOT present anymore.
 *
 * @deprecated 4.5.0
 * @deprecated Use FHEE__EE_Template_Pack___get_templates__templates filter instead.
 *
 * @param array                            $templates      array of generated templates
 * @param EE_messenger              $messenger
 * @param EE_message_type         $message_type
 * @param EE_Messages_Template_Pack $template_pack
 *
 * @return array
 */
function ee_deprecated_get_templates( $templates, EE_messenger $messenger, EE_message_type $message_type, EE_Messages_Template_Pack $template_pack ) {
	$old_default_classnames = array(
		'EE_Messages_Email_Cancelled_Registration_Defaults',
		'EE_Messages_Email_Declined_Registration_Defaults',
		'EE_Messages_Email_Not_Approved_Registration_Defaults',
		'EE_Messages_Email_Payment_Declined_Defaults',
		'EE_Messages_Email_Payment_Defaults',
		'EE_Messages_Email_Payment_Reminder_Defaults',
		'EE_Messages_Email_Pending_Approval_Defaults',
		'EE_Messages_Email_Registration_Defaults',
		'EE_Messages_Email_Newsletter_Defaults',
		'EE_Message_Template_Defaults'
		);

	$old_class_instance = new stdClass();

	foreach ( $old_default_classnames as $classname ) {
		$filter_ref = 'FHEE__' . $classname . '___create_new_templates___templates';
		if ( has_filter( $filter_ref ) ) {
			EE_Error::doing_it_wrong( $filter_ref, __('This filter is deprecated.  It *may* work as an attempt to build in backwards compatibility.  However, it is recommended to use the new filter provided which is "FHEE__EE_Template_Pack___get_templates__templates" found in the EE_Messages_Template_Pack class.', 'event_espresso'), '4.5.0', E_USER_DEPRECATED );
		}
		$templates = apply_filters( $filter_ref, $templates, $old_class_instance );
	}

	return $templates;
}
add_filter( 'FHEE__EE_Template_Pack___get_templates__templates', 'ee_deprecated_get_templates', 10, 4 );

/**
 * Called after EED_Module::set_hooks() and EED_Module::set_admin_hooks() was called.
 * Checks if any deprecated hooks were hooked-into and provide doing_it_wrong messages appropriately.
 */
function ee_deprecated_hooks(){
	/**
	 * @var $hooks array where keys are hook names, and their values are array{
	 *			@type string $version  when deprecated
	 *			@type string $alternative  saying what to use instead
	 *			@type boolean $still_works  whether or not the hook still works
	 *		}
	 */
	$hooks = array(
		'AHEE__EE_System___do_setup_validations' => array(
			'version' => '4.6.0',
			'alternative' => __( 'Instead use "AHEE__EEH_Activation__validate_messages_system" which is called after validating messages (done on every new install, upgrade, reactivation, and downgrade)', 'event_espresso' ),
			'still_works' => FALSE
		)
	);
	foreach( $hooks as $name => $deprecation_info ){
		if( has_action( $name ) ){
			EE_Error::doing_it_wrong(
				$name,
				sprintf(
					__('This filter is deprecated. %1$s%2$s','event_espresso'),
					$deprecation_info[ 'still_works' ] ?  __('It *may* work as an attempt to build in backwards compatibility.', 'event_espresso') : __( 'It has been completely removed.', 'event_espresso' ),
					isset( $deprecation_info[ 'alternative' ] ) ? $deprecation_info[ 'alternative' ] : __( 'Please read the current EE4 documentation further or contact Support.', 'event_espresso' )
				),
				isset( $deprecation_info[ 'version' ] ) ? $deprecation_info[ 'version' ] : __( 'recently', 'event_espresso' ),
				E_USER_DEPRECATED
			);
		}
	}
}
add_action( 'AHEE__EE_System__set_hooks_for_shortcodes_modules_and_addons', 'ee_deprecated_hooks' );






/**
 * wrapper for the now deprecated FHEE__*__get_default_field_content filter.  Note depending on how this was used, it may or may not degrade gracefully for clients using the  filter format that is "FHEE__EE_Messages_Base__get_default_field_content" as that format might have had either a EE_messenger or EE_message_type object as a param.  The backward_compat implementation assumed EE_message_type.
 *
 * @deprecated 4.5.0
 * @deprecated Use FHEE__EE_Messages_Template_Pack__get_specific_template__contents filter instead.
 *
 * @param string                    $contents        The template contents being used.
 * @param string                    $actual_path   The actual path for the template contents.
 * @param EE_messenger              $messenger
 * @param EE_message_type           $message_type
 * @param string                    $field         The field the contents are for.
 * @param string                    $context       The context the contents are for.
 * @param EE_Messages_Template_Pack $template_pack
 *
 * @return string                    The default contents for the messenger, message type, context and field.
 */
function ee_deprecated_get_default_field_content( $contents, $actual_path, EE_messenger $messenger, EE_message_type $message_type, $field, $context, EE_Messages_Template_Pack $template_pack ) {

	$classnames_to_try = array(
		get_class( $messenger ) => $messenger,
		get_class( $message_type ) => $message_type,
		'EE_Messages_Base' => $message_type
		);

	foreach ( $classnames_to_try as $classname => $obj ) {
		$filter_ref = 'FHEE__' . $classname . '__get_default_field_content';
		if ( has_filter( $filter_ref ) ) {
			EE_Error::doing_it_wrong( $filter_ref, __('This filter is deprecated.  It *may* work as an attempt to build in backwards compatibility.  However, it is recommended to use the new filter provided which is "FHEE__EE_Messages_Template_Pack__get_specific_template__contents" found in the EE_Messages_Template_Pack class.', 'event_espresso'), '4.5.0', E_USER_DEPRECATED );
		}
		$contents = apply_filters( $filter_ref, $contents, $obj );
	}

	return $contents;
}
add_filter( 'FHEE__EE_Messages_Template_Pack__get_specific_template__contents', 'ee_deprecated_get_default_field_content', 10, 7 );





/**
 * wrapper for the now deprecated *__get_inline_css_template__css_url and path filters.
 * Filters deprecated are:
 * 	- FHEE__EE_Email_Messenger__get_inline_css_template__css_url
 * 	- FHEE__EE_Email_Messenger__get_inline_css_template__css_path
 * 	- FHEE__EE_Html_messenger__get_inline_css_template__css_url
 * 	- FHEE__EE_Html_messenger__get_inline_css_template__css_path
 *
 * @deprecated 4.5.0
 * @deprecated Use the new FHEE__EE_Messages_Template_Pack__get_variation filter instead.
 *
 * @param string                    $variation_path The current css path.
 * @param string                    $messenger      EE_messenger slug.
 * @param string                    $messenger      EE_message_type slug
 * @param string                    $type                The type of css file being returned (wpeditor, default etc.)
 * @param string                    $variation         Introduced by the new template pack system. The variation slug.
 * @param string                    $file_extension Defaults to css.  The file extension for the file being retrieved.
 * @param bool                      $url            Whether this is a directory path or url path.
 * @param EE_Messages_Template_Pack $template_pack
 *
 * @return string                    The path to the file being used.
 */
function ee_deprecated_get_inline_css_template_filters( $variation_path, $messenger, $message_type, $type, $variation, $file_extension, $url,  EE_Messages_Template_Pack $template_pack ) {

	if ( $messenger == 'email' ) {
		$filter_ref = $url ? 'FHEE__EE_Email_Messenger__get_inline_css_template__css_url' : 'FHEE__EE_Email_Messenger__get_inline_css_template__css_path';
	} elseif ( $messenger == 'html' ) {
		$filter_ref = $url ? 'FHEE__EE_Html_messenger__get_inline_css_template__css_url' : 'FHEE__EE_Html_messenger__get_inline_css_template__css_path';
	} else {
		return $variation_path;
	}

	if ( has_filter( $filter_ref ) ) {
		EE_Error::doing_it_wrong( $filter_ref, __('This filter is deprecated.  It is recommended to use the new filter provided which is "FHEE__EE_Messages_Template_Pack__get_variation" found in the EE_Messages_Template_Pack class.', 'event_espresso'), '4.5.0', E_USER_DEPRECATED );
	}

	return apply_filters( $filter_ref, $variation_path, $url, $type );
}
add_filter( 'FHEE__EE_Messages_Template_Pack__get_variation', 'ee_deprecated_get_inline_css_template_filters', 10, 8 );




/**
 * EE_Messages_Init
 * This was the old controller for the Messages system which has now been moved into a proper EED Module
 *
 * @deprecated 4.5.0
 * @deprecated Use the new EED_Messages module
 *
 */
class EE_Messages_Init extends EE_Base {

	public function __construct() {
		self::doing_it_wrong_call( __METHOD__ );
	}

	/**
	 * @param $method_name
	 */
	public static function doing_it_wrong_call( $method_name ) {
		EE_Error::doing_it_wrong( __CLASS__, sprintf( __('The %s in this class is deprecated as of EE4.5.0.  All functionality formerly in this class is now in the EED_Messages module.', 'event_espresso'), $method_name ), '4.5.0', E_USER_DEPRECATED );
	}

	/**
	 * @deprecated 4.5.0
	 */
	public static function set_autoloaders() {
		self::doing_it_wrong_call( __METHOD__ );
		EED_Messages::set_autoloaders();
	}

	/**
	 * @deprecated 4.5.0
	 */
	public function payment_reminder( $transaction ) {
		self::doing_it_wrong_call( __METHOD__ );
		EED_Messages::payment_reminder( $transaction );
	}

	/**
	 * @deprecated 4.5.0
	 */
	public function payment( $transaction, $payment ) {
		self::doing_it_wrong_call( __METHOD__ );
		EED_Messages::payment( $transaction, $payment );
	}

	/**
	 * @deprecated 4.5.0
	 */
	public function cancelled_registration( $transaction ) {
		self::doing_it_wrong_call( __METHOD__ );
		EED_Messages::cancelled_registration( $transaction );
	}

	/**
	 * @deprecated 4.5.0
	 */
	public function maybe_registration( $transaction, $reg_msg, $from_admin ) {
		self::doing_it_wrong_call( __METHOD__ );
		EED_Messages::maybe_registration( $transaction, $reg_msg, $from_admin );
	}

	/**
	 * @deprecated 4.5.0
	 */
	public function process_resend( $success, $req_data ) {
		self::doing_it_wrong_call( __METHOD__ );
		EED_Messages::process_resend( $req_data );
	}

	/**
	 * @deprecated 4.5.0
	 */
	public function process_admin_payment( $success, $payment ) {
		self::doing_it_wrong_call( __METHOD__ );
		EED_Messages::process_admin_payment( $success, $payment );
	}

	/**
	 * @deprecated 4.5.0
	 */
	public function send_newsletter_message( $contacts, $grp_id ) {
		self::doing_it_wrong_call( __METHOD__ );
		EED_Messages::send_newsletter_message( $contacts, $grp_id );
	}


} //end deprecated EE_Messages_Init


/**
 * Deprecated EE_Register_CPTs filters
 */

/**
 * wrapper for deprecated 'FHEE__EE_Register_CPTs__construct__CPTs' filter.
 *
 * @deprecated 4.5.0
 * @deprecated Use FHEE__EE_Register_CPTs__get_CPTs__cpts filter instead
 *
 * @param array $cpts The cpts being filtered
 *
 * @return array additional cpts.
 */
function ee_deprecated_get_cpts( $cpts ) {
	if ( has_filter( 'FHEE__EE_Register_CPTs__construct__CPTs' ) ) {
		EE_Error::doing_it_wrong( 'FHEE__EE_Register_CPTs__construct__CPTs', __('This filter is deprecated. It will still work for the time being.  However, it is recommended to use the new filter provided which is "FHEE__EE_Register_CPTs__get_CPTs__cpts" found in EE_Register_CPTs::get_CPTs()', 'event_espresso'), '4.5.0', E_USER_DEPRECATED );
	}
	return apply_filters( 'FHEE__EE_Register_CPTs__construct__CPTs', $cpts );
}
add_filter( 'FHEE__EE_Register_CPTs__get_CPTs__cpts', 'ee_deprecated_get_cpts', 10 );



/**
 * wrapper for deprecated 'FHEE__EE_Register_CPTs__construct__taxonomies' filter.
 *
 * @deprecated 4.5.0
 * @deprecated Use FHEE__EE_Register_CPTs__get_taxonomies__taxonomies filter instead
 *
 * @param array $cts The custom taxonomies being filtered
 *
 * @return array additional custom taxonomies.
 */
function ee_deprecated_get_taxonomies( $cts ) {
	if ( has_filter( 'FHEE__EE_Register_CPTs__construct__taxonomies' ) ) {
		EE_Error::doing_it_wrong( 'FHEE__EE_Register_CPTs__construct__taxonomies', __('This filter is deprecated. It will still work for the time being.  However, it is recommended to use the new filter provided which is "FHEE__EE_Register_CPTs__get_taxonomies__taxonomies" found in EE_Register_CPTs::get_taxonomies()', 'event_espresso'), '4.5.0', E_USER_DEPRECATED );
	}
	return apply_filters( 'FHEE__EE_Register_CPTs__construct__taxonomies', $cts );
}
add_filter( 'FHEE__EE_Register_CPTs__get_taxonomies__taxonomies', 'ee_deprecated_get_taxonomies', 10 );
