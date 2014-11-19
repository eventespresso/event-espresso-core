<?php
/**
 * This file contains all deprecated actions, filters, and functions in EE.
 * @package      Event Espresso
 * @subpackage helpers
 * @since           4.5.0
 */
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');


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
			EE_Error::doing_it_wrong( $filter_ref, __('This filter is deprecated.  It *may* work as an attempt to build in backwards compatibility.  However, it is recommended to use the new filter provided which is "FHEE__EE_Template_Pack___get_templates__templates" found in the EE_Messages_Template_Pack class.', 'event_espresso'), '4.5.0' );
		}
		$templates = apply_filters( $filter_ref, $templates, $old_class_instance );
	}

	return $templates;
}
add_filter( 'FHEE__EE_Template_Pack___get_templates__templates', 'ee_deprecated_get_templates', 10, 4 );





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
			EE_Error::doing_it_wrong( $filter_ref, __('This filter is deprecated.  It *may* work as an attempt to build in backwards compatibility.  However, it is recommended to use the new filter provided which is "FHEE__EE_Messages_Template_Pack__get_specific_template__contents" found in the EE_Messages_Template_Pack class.', 'event_espresso'), '4.5.0' );
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
		EE_Error::doing_it_wrong( $filter_ref, __('This filter is deprecated.  It is recommended to use the new filter provided which is "FHEE__EE_Messages_Template_Pack__get_variation" found in the EE_Messages_Template_Pack class.', 'event_espresso'), '4.5.0' );
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
		EE_Error::doing_it_wrong( __CLASS__, sprintf( __('The %s in this class is deprecated as of EE4.5.0.  All functionality formerly in this class is now in the EED_Messages module.', 'event_espresso'), $method_name ), '4.5.0' );
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
		EED_Messages::process_resend( $success, $req_data );
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
		EE_Error::doing_it_wrong( 'FHEE__EE_Register_CPTs__construct__CPTs', __('This filter is deprecated. It will still work for the time being.  However, it is recommended to use the new filter provided which is "FHEE__EE_Register_CPTs__get_CPTs__cpts" found in EE_Register_CPTs::get_CPTs()', 'event_espresso'), '4.5.0' );
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
		EE_Error::doing_it_wrong( 'FHEE__EE_Register_CPTs__construct__taxonomies', __('This filter is deprecated. It will still work for the time being.  However, it is recommended to use the new filter provided which is "FHEE__EE_Register_CPTs__get_taxonomies__taxonomies" found in EE_Register_CPTs::get_taxonomies()', 'event_espresso'), '4.5.0' );
	}
	return apply_filters( 'FHEE__EE_Register_CPTs__construct__taxonomies', $cts );
}
add_filter( 'FHEE__EE_Register_CPTs__get_taxonomies__taxonomies', 'ee_deprecated_get_taxonomies', 10 );
