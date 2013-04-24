<?php

if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link				http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * Utility class containing a variety of helpers related to message templates.
 *
 * @package		Event Espresso
 * @subpackage	includes/core
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_MSG_Template {



	/**
	 * generate_new_templates
	 * This will handle the messenger, message_type selection when "adding a new custom template" for an event and will automatically create the defaults for the event.  The user would then be redirected to edit the default context for the event.
	 *
	 * @access protected
	 * @param  string  $messenger the messenger we are generating templates for
	 * @param array $message_types array of message types that the templates are generated for.
	 * @param int $evt_id If templates are event specific then we are also including the event_id
	 * @param bool $global true indicates generating templates on messenger activation. false requires evt_id for event specific template generation.
	 * @return array|error_object array of data required for the redirect to the correct edit page or error object if encountering problems.
	 */
	public static function generate_new_templates($messenger, $message_types, $evt_id = NULL, $global = FALSE) {

		//make sure message_type is an array.
		$message_types = (array) $message_types;
		$templates = array();
		$success = TRUE;

		if ( empty($messenger) ) {
			throw new EE_Error( __('We need a messenger to generate templates!', 'event_espresso') );
		}

		//if we STILL have empty $message_types then we need to generate an error message b/c we NEED message types to do the template files.
		if ( empty($message_types) ) {
			throw new EE_Error( __('We need at least one message type to generate templates!', 'event_espresso') );
		}

		$MSG = new EE_messages();

		foreach ( $message_types as $message_type ) {
			//first let's determine if we already HAVE global templates for this messenger and message_type combination.  If we do then NO generation!!
			if ( self::already_generated($messenger, $message_type, $evt_id ) ) {
				$templates = TRUE;
				continue; //get out we've already got generated templates for this.
			}
			$new_message_template_group = $MSG->create_new_templates($messenger, $message_type, $evt_id, $global);
			if ( !$new_message_template_group ) {
				$success = FALSE;
				continue;
			}
			if ( $templates === TRUE ) $templates = array();
			$templates[] = $new_message_template_group;
		}
		
		return ($success) ? $templates : $success;
	}


	/**
	 * The purpose of this method is to determine if there are already generated templates in the database for the given variables.
	 * @param  string $messenger     messenger
	 * @param  string $message_type message type
	 * @param  int $evt_id        Event ID ( if an event specific template)
	 * @return bool                true = generated, false = hasn't been generated.
	 */
	public static function already_generated( $messenger, $message_type, $evt_id = NULL ) {
		$MTP = EEM_Message_Template::instance();

		//what method we use depends on whether we have an evt_id or not
		$count = !empty( $evt_id) ? $MTP->get_event_message_templates_by_m_and_mt_and_evt( $messenger, $message_type, $evt_id, 'GRP_ID', 'ASC', NULL, TRUE, FALSE ) : $MTP->get_global_message_template_by_m_and_mt( $messenger, $message_type, 'GRP_ID', 'ASC', NULL, TRUE, 'all');

		//if the count is greater than 0 then we need to update the templates so they are active.
		if ( $count > 0 ) {
			$MTP->update( array('MTP_is_active' => 1), array('MTP_messenger' => $messenger, 'MTP_message_type' => $message_type ) );
		}

		return ( $count > 0 ) ? TRUE : FALSE;
	}




	/**
	 * The purpose of this function is to return all installed message objects (messengers and message type regardless of whether they are ACTIVE or not)
	 * @return array array consisting of installed messenger objects and installed message type objects.
	 */
	public static function get_installed_message_objects($type = 'all') {
		//get all installed messengers and message_types
		$EE_MSG = new EE_messages();
		$installed_message_objects = $EE_MSG->get_installed($type);
		return $installed_message_objects;
	}

}