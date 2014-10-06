<?php

if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link				http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * EEH_MSG_Template
 * Utility class containing a variety of helpers related to message templates.
 *
 * @package		Event Espresso
 * @subpackage	includes/core
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EEH_MSG_Template {


	private static function _set_autoloader() {
		EE_Registry::instance()->load_lib( 'Messages_Init' );
		EE_Messages_Init::set_autoloaders();
	}



	/**
	 * generate_new_templates
	 * This will handle the messenger, message_type selection when "adding a new custom template" for an event and will automatically create the defaults for the event.  The user would then be redirected to edit the default context for the event.
	 *
	 * @access protected
	 * @param  string  $messenger the messenger we are generating templates for
	 * @param array $message_types array of message types that the templates are generated for.
	 * @param int $GRP_ID If a non global template is being generated then it is expected we'll have a GRP_ID to use as the base for the new generated template.
	 * @param bool $global true indicates generating templates on messenger activation. false requires evt_id for event specific template generation.
	 * @return array|error_object array of data required for the redirect to the correct edit page or error object if encountering problems.
	 */
	public static function generate_new_templates($messenger, $message_types, $GRP_ID = 0,  $global = FALSE) {

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

		self::_set_autoloader();


		$MSG = new EE_messages();

		foreach ( $message_types as $message_type ) {
			//if global then let's attempt to get the GRP_ID for this combo IF GRP_ID is empty.
			if ( $global && empty( $GRP_ID ) ) {
				$GRP_ID = EEM_Message_Template_Group::instance()->get_one( array( array( 'MTP_messenger' => $messenger, 'MTP_message_type' => $message_type, 'MTP_is_global' => TRUE ) ) );
				$GRP_ID = $GRP_ID instanceof EE_Message_Template_Group ? $GRP_ID->ID() : 0;
			}
			//if this is global template generation. First let's determine if we already HAVE global templates for this messenger and message_type combination.  If we do then NO generation!!
			if ( $global && self::already_generated($messenger, $message_type, $GRP_ID  ) ) {
				$templates = TRUE;
				continue; //get out we've already got generated templates for this.
			}

			$new_message_template_group = $MSG->create_new_templates($messenger, $message_type, $GRP_ID, $global);

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
	 * @param  int $GRP_ID        GRP ID ( if a custom template) (if not provided then we're just doing global template check)
	 * @return bool                true = generated, false = hasn't been generated.
	 */
	public static function already_generated( $messenger, $message_type, $GRP_ID = 0 ) {
		self::_set_autoloader();
		$MTP = EEM_Message_Template::instance();

		//what method we use depends on whether we have an GRP_ID or not
		$count = empty( $GRP_ID ) ? EEM_Message_Template::instance()->count( array( array( 'Message_Template_Group.MTP_messenger' => $messenger, 'Message_Template_Group.MTP_message_type' => $message_type, 'Message_Template_Group.MTP_is_global' => TRUE ) ) ) :  $MTP->count( array( array( 'GRP_ID' => $GRP_ID ) ) );

		self::update_to_active( $messenger, $message_type );

		return ( $count > 0 ) ? TRUE : FALSE;
	}




	/**
	 * Updates all message templates matching the incoming messenger and message type to active status.
	 *
	 * @param  string $messenger    	Messenger slug
	 * @param  string $message_type  Message type slug
	 * @static
	 * @return  int 						count of updated records.
	 */
	public static function update_to_active( $messenger, $message_type ) {
		return EEM_Message_Template_Group::instance()->update( array('MTP_is_active' => 1), array(array('MTP_messenger' => $messenger, 'MTP_message_type' => $message_type )) );
	}



	/**
	 * Updates all message template groups matching the incoming arguments to inactive status.
	 *
	 * @param string $messenger      The messenger slug. If empty then all templates matching the message type are marked inactive.  Otherwise only templates matching the messenger and message type.
	 * @param string $message_type The message type slug.  If empty then all templates matching the messenger are marked inactive. Otherwise only templates matching the messenger and message type.
	 *
	 * @return int  count of updated records.
	 */
	public static function update_to_inactive( $messenger = '', $message_type = '' ) {
		if ( empty( $messenger ) && empty( $message_type ) )
			return 0;
		if ( ! empty( $messenger ) ) {
			$query_args[0]['MTP_messenger'] = $messenger;
		}

		if ( ! empty( $message_type ) ) {
			$query_args[0]['MTP_message_type'] = $message_type;
		}
		return EEM_Message_Template_Group::instance()->update( array( 'MTP_is_active' => FALSE ), $query_args );
	}




	/**
	 * The purpose of this function is to return all installed message objects (messengers and message type regardless of whether they are ACTIVE or not)
	 * @return array array consisting of installed messenger objects and installed message type objects.
	 */
	public static function get_installed_message_objects($type = 'all') {
		self::_set_autoloader();
		//get all installed messengers and message_types
		$EE_MSG = new EE_messages();
		$installed_message_objects = $EE_MSG->get_installed($type);
		return $installed_message_objects;
	}




	/**
	 * This will return an array of shortcodes => labels from the
	 * messenger and message_type objects associated with this
	 * template.
	 *
	 * @since 4.3.0
	 *
	 * @param string $message_type
	 * @param string $messenger
	 * @param array $fields what fields we're returning valid
	 *                      	  shortcodes for.  If empty then we assume
	 *                      	  all fields are to be returned. Optional.
	 * @param string $context what context we're going to return
	 *                        	      shortcodes for. Optional.
	 * @param bool  $merged If TRUE then we don't return shortcodes
	 *                      	     indexed by field but instead an array of
	 *                      	     the unique shortcodes for all the given (
	 *                      	     or all) fields. Optional.
	 * @return mixed (array|bool) an array of shortcodes in the format
	 *                            	           array( '[shortcode] => 'label') OR
	 *                            	           FALSE if no shortcodes found.
	 */
	public static function get_shortcodes( $message_type, $messenger, $fields = array(), $context = 'admin', $merged = FALSE ) {
		$valid_shortcodes = array();
		$messenger_name = str_replace( ' ', '_', ucwords( str_replace( '_', ' ', $messenger ) ) );
		$mt_name = str_replace( ' ', '_', ucwords( str_replace( '_', ' ', $message_type ) ) );

		//convert slug to object
		$messenger = self::messenger_obj( $messenger );

		//validate class for getting our list of shortcodes
		$classname = 'EE_Messages_' . $messenger_name . '_' . $mt_name . '_Validator';
		if ( !class_exists( $classname ) ) {
			$msg[] = __( 'The Validator class was unable to load', 'event_espresso');
			$msg[] = sprintf( __('The class name compiled was %s. Please check and make sure the spelling and case is correct for the class name and that there is an autoloader in place for this class', 'event_espresso'), $classname );
			throw new EE_Error( implode( '||', $msg ) );
		}

		$a = new ReflectionClass( $classname );
		$_VLD = $a->newInstance( array(), $context );
		$valid_shortcodes = $_VLD->get_validators();

		//let's make sure we're only getting the shortcode part of the validators
		$shortcodes = $fields = array();
		foreach( $valid_shortcodes as $field => $validators ) {
			$shortcodes[$field] = $validators['shortcodes'];
			$fields[] = $field;
		}
		$valid_shortcodes = $shortcodes;

		//if not all fields let's make sure we ONLY include the shortcodes for the specified fields.
		if ( !empty( $fields ) ) {
			$specified_shortcodes = array();
			foreach ( $fields as $field ) {
				if ( isset( $valid_shortcodes[$field] ) )
					$specified_shortcodes[$field] = $valid_shortcodes[$field];
			}
			$valid_shortcodes = $specified_shortcodes;
		}


		//if not merged then let's replace the fields with the localized fields
		if ( !$merged ) {
			//let's get all the fields for the set messenger so that we can get the localized label and use that in the returned array.
			$field_settings = $messenger->get_template_fields();
			$localized = array();
			foreach ( $valid_shortcodes as $field => $shortcodes ) {
				//get localized field label
				if ( isset( $field_settings[$field] ) ) {
					//possible that this is used as a main field.
					if ( empty( $field_settings[$field] ) ) {
						if ( isset( $field_settings['extra'][$field] ) ) {
							$_field = $field_settings['extra'][$field]['main']['label'];
						} else {
							$_field = $field;
						}
					} else {
						$_field = $field_settings[$field]['label'];
					}
				} else if ( isset( $field_settings['extra'] ) ) {
					//loop through extra "main fields" and see if any of their children have our field
					foreach ( $field_settings['extra'] as $main_field => $fields ) {
						if ( isset( $fields[$field] ) )
							$_field = $fields[$field]['label'];
						else
							$_field = $field;
					}
				} else {
					$_field = $field;
				}
				$localized[$_field] = $shortcodes;
			}
			$valid_shortcodes = $localized;
		}


		//if $merged then let's merge all the shortcodes into one list NOT indexed by field.
		if ( $merged ) {
			$merged_codes = array();
			foreach ( $valid_shortcodes as $field => $shortcode ) {
				foreach ( $shortcode as $code => $label ) {
					if ( isset( $merged_codes[$code] ) )
						continue;
					else
						$merged_codes[$code] = $label;
				}
			}
			$valid_shortcodes = $merged_codes;
		}

		return $valid_shortcodes;
	}




	/**
	 * Get Messenger object.
	 *
	 * @since 4.3.0
	 *
	 * @param string $messenger messenger slug for the messenger object we want to retrieve.
	 * @return EE_messenger
	 */
	public static function messenger_obj( $messenger ) {
		$ref = ucwords( str_replace( '_', ' ', $messenger ) );
		$ref = str_replace( ' ', '_', $ref );
		$classname = 'EE_' . $ref . '_messenger';

		if ( !class_exists($classname) ) {
			$msg[] = __('Messenger class loading fail.', 'event_espresso');
			$msg[] = sprintf( __('The class name checked was "%s". Please check the spelling and case of this reference and make sure it matches the appropriate messenger file name (minus the extension) in the "/core/messages/messenger/" directory', 'event_espresso'), $classname );
			throw new EE_Error( implode( '||', $msg ) );
		}

		//made it here so let's instantiate the object and return it.
		$a = new ReflectionClass($classname);
		return $a->newInstance();
	}



	/**
	 * get Message type object
	 *
	 * @since 4.3.0
	 *
	 * @param string  $message_type  the slug for the message type object to retrieve
	 * @return EE_message_type
	 */
	public static function message_type_obj( $message_type ) {
		$ref = ucwords( str_replace( '_', ' ', $message_type ) );
		$ref = str_replace( ' ', '_', $ref );
		$classname = 'EE_' . $ref . '_message_type';

		if ( !class_exists($classname) ) {
			$msg[] = __('Message Type class loading fail.', 'event_espresso');
			$msg[] = sprintf( __('The class name checked was "%s". Please check the spelling and case of this reference and make sure it matches the appropriate message type file name (minus the extension) in the "/core/messages/message_type/" directory', 'event_espresso'), $classname );
			throw new EE_Error( implode( '||', $msg ) );
		}

		//made it here so let's instantiate the object and return it.
		$a = new ReflectionClass($classname);
		return $a->newInstance();
	}





	/**
	 * Given a message_type slug, will return whether that message type is active in the system or not.
	 *
	 * @since    4.3.0
	 * @param  string   $message_type message type to check for.
	 * @return boolean
	 */
	public static function is_mt_active( $message_type ) {
		self::_set_autoloader();
		$MSG = EE_Registry::instance()->load_lib('messages');
		$active_mts = $MSG->get_active_message_types();
		return in_array( $message_type, $active_mts );
	}



	/**
	 * Given a messenger slug, will return whether that messenger is active in the system or not.
	 *
	 * @since    4.3.0
	 *
	 * @param  string  $messenger slug for messenger to check.
	 * @return boolean
	 */
	public static function is_messenger_active( $messenger ) {
		self::_set_autoloader();
		$MSG = EE_Registry::instance()->load_lib('messages');
		$active_messengers = $MSG->get_active_messengers();
		$active_messengers = array_keys( $active_messengers );
		return in_array( $messenger, $active_messengers );
	}




	/**
	 * Used to return active messengers array stored in the wp options table.
	 * If no value is present in the option then an empty array is returned.
	 *
	 * @since 4.3.1
	 *
	 * @return array
	 */
	public static function get_active_messengers_in_db() {
		return apply_filters( 'FHEE__EEH_MSG_Template__get_active_messengers_in_db', get_option( 'ee_active_messengers', array() ) );
	}




	/**
	 * Used to update the active messengers array stored in the wp options table.
	 *
	 * @since 4.3.1
	 *
	 * @param array $data_to_save Incoming data to save.
	 *
	 * @return bool FALSE if not updated, TRUE if updated.
	 */
	public static function update_active_messengers_in_db( $data_to_save ) {
		return update_option( 'ee_active_messengers', $data_to_save );
	}

}
