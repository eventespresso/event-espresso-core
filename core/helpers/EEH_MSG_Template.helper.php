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


	/**
	 * Holds a collection of EE_Message_Template_Pack objects.
	 * @type EE_Messages_Template_Pack_Collection
	 */
	protected static $_template_pack_collection;




	private static function _set_autoloader() {
		EED_Messages::set_autoloaders();
	}


	/**
	 * generate_new_templates
	 * This will handle the messenger, message_type selection when "adding a new custom template" for an event and will automatically create the defaults for the event.  The user would then be redirected to edit the default context for the event.
	 *
	 * @access protected
	 * @param  string $messenger     the messenger we are generating templates for
	 * @param array   $message_types array of message types that the templates are generated for.
	 * @param int     $GRP_ID        If a non global template is being generated then it is expected we'll have a GRP_ID to use as the base for the new generated template.
	 * @param bool    $global        true indicates generating templates on messenger activation. false requires GRP_ID for event specific template generation.
	 * @throws \EE_Error
	 * @return array  @see EEH_MSG_Template::_create_new_templates for the return value of each element in the array for templates
	 *                that are generated.  If this is an empty array then it means no templates were generated which usually
	 *                means there was an error.  Anything in the array with an empty value for `MTP_context` means that it
	 *                was not a new generated template but just reactivated (which only happens for global templates that
	 *                already exist in the database.
	 */
	public static function generate_new_templates( $messenger, $message_types, $GRP_ID = 0, $global = false ) {
		//make sure message_type is an array.
		$message_types = (array) $message_types;
		$templates = array();

		if ( empty( $messenger ) ) {
			throw new EE_Error( __('We need a messenger to generate templates!', 'event_espresso') );
		}

		//if we STILL have empty $message_types then we need to generate an error message b/c we NEED message types to do the template files.
		if ( empty( $message_types ) ) {
			throw new EE_Error( __('We need at least one message type to generate templates!', 'event_espresso') );
		}

		EEH_MSG_Template::_set_autoloader();
		foreach ( $message_types as $message_type ) {
			//if global then let's attempt to get the GRP_ID for this combo IF GRP_ID is empty.
			if ( $global && empty( $GRP_ID ) ) {
				$GRP_ID = EEM_Message_Template_Group::instance()->get_one(
					array(
						array(
							'MTP_messenger'    => $messenger,
							'MTP_message_type' => $message_type,
							'MTP_is_global'    => true,
						),
					)
				);
				$GRP_ID = $GRP_ID instanceof EE_Message_Template_Group ? $GRP_ID->ID() : 0;
			}
			// if this is global template generation.
			// First let's determine if we already HAVE global templates for this messenger and message_type combination.
			//  If we do then NO generation!!
			if ( $global && EEH_MSG_Template::already_generated( $messenger, $message_type, $GRP_ID ) ) {
				$templates[] = array(
					'GRP_ID' => $GRP_ID,
					'MTP_context' => '',
				);
				//we already have generated templates for this so let's go to the next message type.
				continue;
			}
			$new_message_template_group = EEH_MSG_Template::create_new_templates( $messenger, $message_type, $GRP_ID, $global );

			if ( ! $new_message_template_group ) {
				continue;
			}
			$templates[] = $new_message_template_group;
		}

		return $templates;
	}


	/**
	 * The purpose of this method is to determine if there are already generated templates in the database for the given variables.
	 * @param  string $messenger     messenger
	 * @param  string $message_type message type
	 * @param  int $GRP_ID        GRP ID ( if a custom template) (if not provided then we're just doing global template check)
	 * @return bool                true = generated, false = hasn't been generated.
	 */
	public static function already_generated( $messenger, $message_type, $GRP_ID = 0 ) {
		EEH_MSG_Template::_set_autoloader();
		//what method we use depends on whether we have an GRP_ID or not
		$count = empty( $GRP_ID )
			? EEM_Message_Template::instance()->count(
				array(
					array(
						'Message_Template_Group.MTP_messenger' 	  => $messenger,
						'Message_Template_Group.MTP_message_type' => $message_type,
						'Message_Template_Group.MTP_is_global'    => true
					)
				)
			)
			: EEM_Message_Template::instance()->count( array( array( 'GRP_ID' => $GRP_ID ) ) );

		return $count > 0;
	}




	/**
	 * Updates all message templates matching the incoming messengers and message types to active status.
	 *
	 * @static
	 * @param  array  $messenger_names     Messenger slug
	 * @param  array  $message_type_names  Message type slug
	 * @return  int 						count of updated records.
	 */
	public static function update_to_active( $messenger_names, $message_type_names ) {
		$messenger_names = is_array( $messenger_names ) ? $messenger_names : array( $messenger_names );
		$message_type_names = is_array( $message_type_names ) ? $message_type_names : array( $message_type_names );
		return EEM_Message_Template_Group::instance()->update(
			array( 'MTP_is_active' => 1 ),
			array(
				array(
					'MTP_messenger' 	=> array( 'IN', $messenger_names ),
					'MTP_message_type'  => array( 'IN', $message_type_names )
				)
			)
		);
	}



	/**
	 * Updates all message template groups matching the incoming arguments to inactive status.
	 *
	 * @static
	 * @param array $messenger_names 	The messenger slugs.
	 *                          	If empty then all templates matching the message types are marked inactive.
	 *                          	Otherwise only templates matching the messengers and message types.
	 * @param array $message_type_names 	The message type slugs.
	 *                              If empty then all templates matching the messengers are marked inactive.
	 * 								Otherwise only templates matching the messengers and message types.
	 *
	 * @return int  count of updated records.
	 */
	public static function update_to_inactive( $messenger_names = array(), $message_type_names = array() ) {
		return EEM_Message_Template_Group::instance()->deactivate_message_template_groups_for(
			$messenger_names,
			$message_type_names
		);
	}


	/**
	 * The purpose of this function is to return all installed message objects
	 * (messengers and message type regardless of whether they are ACTIVE or not)
	 *
	 * @deprecated 4.9.0
	 * @static
	 * @param string $type
	 * @return array array consisting of installed messenger objects and installed message type objects.
	 */
	public static function get_installed_message_objects( $type = 'all' ) {
		self::_set_autoloader();
		$message_resource_manager = EE_Registry::instance()->load_lib( 'Message_Resource_Manager' );
		return array(
			'messenger' => $message_resource_manager->installed_messengers(),
			'message_type' => $message_resource_manager->installed_message_types()
		);
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
	 * @param array  $fields 	What fields we're returning valid shortcodes for.
	 *                          If empty then we assume all fields are to be returned. Optional.
	 * @param string $context 	What context we're going to return shortcodes for. Optional.
	 * @param bool $merged 		If TRUE then we don't return shortcodes indexed by field,
	 *                          but instead an array of the unique shortcodes for all the given ( or all) fields.
	 *                          Optional.
	 * @throws \EE_Error
	 * @return mixed (array|bool) an array of shortcodes in the format
	 * 												array( '[shortcode] => 'label')
	 *												OR
	 * 												FALSE if no shortcodes found.
	 */
	public static function get_shortcodes(
		$message_type,
		$messenger,
		$fields = array(),
		$context = 'admin',
		$merged = false
	) {
		$messenger_name = str_replace( ' ', '_', ucwords( str_replace( '_', ' ', $messenger ) ) );
		$mt_name = str_replace( ' ', '_', ucwords( str_replace( '_', ' ', $message_type ) ) );
		/** @var EE_Message_Resource_Manager $message_resource_manager */
		$message_resource_manager = EE_Registry::instance()->load_lib( 'Message_Resource_Manager' );
		//convert slug to object
		$messenger = $message_resource_manager->get_messenger( $messenger );

		//if messenger isn't a EE_messenger resource then bail.
		if ( ! $messenger instanceof EE_messenger ) {
			return array();
		}

		//validate class for getting our list of shortcodes
		$classname = 'EE_Messages_' . $messenger_name . '_' . $mt_name . '_Validator';
		if ( ! class_exists( $classname ) ) {
			$msg[] = __( 'The Validator class was unable to load', 'event_espresso' );
			$msg[] = sprintf(
				__( 'The class name compiled was %s. Please check and make sure the spelling and case is correct for the class name and that there is an autoloader in place for this class', 'event_espresso' ),
				$classname
			);
			throw new EE_Error( implode( '||', $msg ) );
		}

		/** @type EE_Messages_Validator $_VLD */
		$_VLD = new $classname( array(), $context );
		$valid_shortcodes = $_VLD->get_validators();

		//let's make sure we're only getting the shortcode part of the validators
		$shortcodes = array();
		foreach ( $valid_shortcodes as $field => $validators ) {
			$shortcodes[ $field ] = $validators['shortcodes'];
		}
		$valid_shortcodes = $shortcodes;

		//if not all fields let's make sure we ONLY include the shortcodes for the specified fields.
		if ( ! empty( $fields ) ) {
			$specified_shortcodes = array();
			foreach ( $fields as $field ) {
				if ( isset( $valid_shortcodes[ $field ] ) ) {
					$specified_shortcodes[ $field ] = $valid_shortcodes[ $field ];
				}
			}
			$valid_shortcodes = $specified_shortcodes;
		}

		//if not merged then let's replace the fields with the localized fields
		if ( ! $merged ) {
			//let's get all the fields for the set messenger so that we can get the localized label and use that in the returned array.
			$field_settings = $messenger->get_template_fields();
			$localized = array();
			foreach ( $valid_shortcodes as $field => $shortcodes ) {
				//get localized field label
				if ( isset( $field_settings[ $field ] ) ) {
					//possible that this is used as a main field.
					if ( empty( $field_settings[ $field ] ) ) {
						if ( isset( $field_settings['extra'][ $field ] ) ) {
							$_field = $field_settings['extra'][ $field ]['main']['label'];
						} else {
							$_field = $field;
						}
					} else {
						$_field = $field_settings[ $field ]['label'];
					}
				} else if ( isset( $field_settings['extra'] ) ) {
					//loop through extra "main fields" and see if any of their children have our field
					foreach ( $field_settings['extra'] as $main_field => $fields ) {
						if ( isset( $fields[ $field ] ) ) {
							$_field = $fields[ $field ]['label'];
						} else {
							$_field = $field;
						}
					}
				} else {
					$_field = $field;
				}
				if ( isset( $_field ) ) {
					$localized[ $_field ] = $shortcodes;
				}
			}
			$valid_shortcodes = $localized;
		}

		//if $merged then let's merge all the shortcodes into one list NOT indexed by field.
		if ( $merged ) {
			$merged_codes = array();
			foreach ( $valid_shortcodes as $field => $shortcode ) {
				foreach ( $shortcode as $code => $label ) {
					if ( isset( $merged_codes[ $code ] ) ) {
						continue;
					} else {
						$merged_codes[ $code ] = $label;
					}
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
	 * @deprecated 4.9.0
	 * @param string $messenger messenger slug for the messenger object we want to retrieve.
	 * @throws \EE_Error
	 * @return EE_messenger
	 */
	public static function messenger_obj( $messenger ) {
		/** @type EE_Message_Resource_Manager $Message_Resource_Manager */
		$Message_Resource_Manager = EE_Registry::instance()->load_lib( 'Message_Resource_Manager' );
		return $Message_Resource_Manager->get_messenger( $messenger );
	}


	/**
	 * get Message type object
	 *
	 * @since 4.3.0
	 * @deprecated 4.9.0
	 * @param string $message_type the slug for the message type object to retrieve
	 * @throws \EE_Error
	 * @return EE_message_type
	 */
	public static function message_type_obj( $message_type ) {
		/** @type EE_Message_Resource_Manager $Message_Resource_Manager */
		$Message_Resource_Manager = EE_Registry::instance()->load_lib( 'Message_Resource_Manager' );
		return $Message_Resource_Manager->get_message_type( $message_type );
	}





	/**
	 * Given a message_type slug, will return whether that message type is active in the system or not.
	 *
	 * @since    4.3.0
	 * @param  string   $message_type message type to check for.
	 * @return boolean
	 */
	public static function is_mt_active( $message_type ) {
		/** @type EE_Message_Resource_Manager $Message_Resource_Manager */
		$Message_Resource_Manager = EE_Registry::instance()->load_lib( 'Message_Resource_Manager' );
		$active_mts = $Message_Resource_Manager->list_of_active_message_types();
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
		/** @type EE_Message_Resource_Manager $Message_Resource_Manager */
		$Message_Resource_Manager = EE_Registry::instance()->load_lib( 'Message_Resource_Manager' );
		$active_messenger = $Message_Resource_Manager->get_active_messenger( $messenger );
		return $active_messenger instanceof EE_messenger ? true : false;
	}



	/**
	 * Used to return active messengers array stored in the wp options table.
	 * If no value is present in the option then an empty array is returned.
	 *
	 * @deprecated 4.9
	 * @since 4.3.1
	 *
	 * @return array
	 */
	public static function get_active_messengers_in_db() {
		EE_Error::doing_it_wrong(
			__METHOD__,
			__( 'Please use EE_Message_Resource_Manager::get_active_messengers_option() instead.', 'event_espresso' ),
			'4.9.0'
		);
		/** @var EE_Message_Resource_Manager $Message_Resource_Manager */
		$Message_Resource_Manager = EE_Registry::instance()->load_lib( 'Message_Resource_Manager' );
		return $Message_Resource_Manager->get_active_messengers_option();
	}




	/**
	 * Used to update the active messengers array stored in the wp options table.
	 *
	 * @since 4.3.1
	 * @deprecated 4.9.0
	 *
	 * @param array $data_to_save Incoming data to save.
	 *
	 * @return bool FALSE if not updated, TRUE if updated.
	 */
	public static function update_active_messengers_in_db( $data_to_save ) {
		EE_Error::doing_it_wrong(
			__METHOD__,
			__( 'Please use EE_Message_Resource_Manager::update_active_messengers_option() instead.', 'event_espresso' ),
			'4.9.0'
		);
		/** @var EE_Message_Resource_Manager $Message_Resource_Manager */
		$Message_Resource_Manager = EE_Registry::instance()->load_lib( 'Message_Resource_Manager' );
		return $Message_Resource_Manager->update_active_messengers_option( $data_to_save );
	}


	/**
	 * This does some validation of incoming params, determines what type of url is being prepped and returns the
	 * appropriate url trigger
	 *
	 * @param EE_message_type $message_type
	 * @param EE_Message $message
	 * @param EE_Registration | null $registration  The registration object must be included if this
	 *                                              is going to be a registration trigger url.
	 * @param string $sending_messenger             The (optional) sending messenger for the url.
	 *
	 * @return string
	 * @throws EE_Error
	 */
	public static function get_url_trigger(
		EE_message_type $message_type,
		EE_Message $message,
		$registration = null,
		$sending_messenger = ''
	) {
		//first determine if the url can be to the EE_Message object.
		if ( ! $message_type->always_generate() ) {
			return EEH_MSG_Template::generate_browser_trigger( $message );
		}

		//if $registration object is not valid then exit early because there's nothing that can be generated.
		if ( ! $registration instanceof EE_Registration ) {
			throw new EE_Error(
				__( 'Incoming value for registration is not a valid EE_Registration object.', 'event_espresso' )
			);
		}

		//validate given context
		$contexts = $message_type->get_contexts();
		if ( $message->context() !== '' && ! isset( $contexts[$message->context()] ) ) {
			throw new EE_Error(
				sprintf(
					__( 'The context %s is not a valid context for %s.', 'event_espresso' ),
					$message->context(),
					get_class( $message_type )
				)
			);
		}

		//valid sending messenger but only if sending messenger set.  Otherwise generating messenger is used.
		if ( ! empty( $sending_messenger ) ) {
			$with_messengers = $message_type->with_messengers();
			if ( ! isset( $with_messengers[$message->messenger()] )
			     || ! in_array( $sending_messenger, $with_messengers[$message->messenger()] ) ) {
				throw new EE_Error(
					sprintf(
						__(
							'The given sending messenger string (%1$s) does not match a valid sending messenger with the %2$s.  If this is incorrect, make sure that the message type has defined this messenger as a sending messenger in its $_with_messengers array.',
							'event_espresso'
						),
						$sending_messenger,
						get_class( $message_type )
					)
				);
			}
		} else {
			$sending_messenger = $message->messenger();
		}
		return EEH_MSG_Template::generate_url_trigger(
			$sending_messenger,
			$message->messenger(),
			$message->context(),
			$message->message_type(),
			$registration,
			$message->GRP_ID()
		);
	}


	/**
	 * This returns the url for triggering a in browser view of a specific EE_Message object.
	 * @param EE_Message $message
	 * @return string.
	 */
	public static function generate_browser_trigger( EE_Message $message ) {
		$query_args = array(
			'ee' => 'msg_browser_trigger',
			'token' => $message->MSG_token()
		);
		return apply_filters(
			'FHEE__EEH_MSG_Template__generate_browser_trigger',
			add_query_arg( $query_args, site_url() ),
			$message
		);
	}






	/**
	 * This returns the url for triggering an in browser view of the error saved on the incoming message object.
	 * @param EE_Message $message
	 * @return string
	 */
	public static function generate_error_display_trigger( EE_Message $message ) {
		return apply_filters(
			'FHEE__EEH_MSG_Template__generate_error_display_trigger',
			add_query_arg(
				array(
					'ee' => 'msg_browser_error_trigger',
					'token' => $message->MSG_token()
				),
				site_url()
			),
			$message
		);
	}






	/**
	 * This generates a url trigger for the msg_url_trigger route using the given arguments
	 *
	 * @param string          $sending_messenger    The sending messenger slug.
	 * @param string          $generating_messenger The generating messenger slug.
	 * @param string          $context              The context for the template.
	 * @param string          $message_type         The message type slug
	 * @param EE_Registration $registration
	 * @param integer          $message_template_group id 	The EE_Message_Template_Group ID for the template.
	 * @param integer          $data_id 	The id to the EE_Base_Class for getting the data used by the trigger.
	 * @return string          The generated url.
	 */
	public static function generate_url_trigger(
		$sending_messenger,
		$generating_messenger,
		$context,
		$message_type,
		EE_Registration $registration,
		$message_template_group,
		$data_id = 0
	) {
		$query_args = array(
			'ee' => 'msg_url_trigger',
			'snd_msgr' => $sending_messenger,
			'gen_msgr' => $generating_messenger,
			'message_type' => $message_type,
			'context' => $context,
			'token' => $registration->reg_url_link(),
			'GRP_ID' => $message_template_group,
			'id' => $data_id
			);
		$url = add_query_arg( $query_args, get_home_url() );

		//made it here so now we can just get the url and filter it.  Filtered globally and by message type.
		$url = apply_filters(
			'FHEE__EEH_MSG_Template__generate_url_trigger',
			$url,
			$sending_messenger,
			$generating_messenger,
			$context,
			$message_type,
			$registration,
			$message_template_group,
			$data_id
		);
		return $url;
	}




	/**
	 * Return the specific css for the action icon given.
	 *
	 * @since 4.9.0
	 *
	 * @param string $type  What action to return.
	 * @return string
	 */
	public static function get_message_action_icon( $type ) {
		$action_icons = self::get_message_action_icons();
		return isset( $action_icons[ $type ] ) ? $action_icons[ $type ] : '';
	}


	/**
	 * This is used for retrieving the css classes used for the icons representing message actions.
	 *
	 * @since 4.9.0
	 *
	 * @return array
	 */
	public static function get_message_action_icons() {
		return apply_filters( 'FHEE__EEH_MSG_Template__message_action_icons',
			array(
				'view' => array(
					'label' => __( 'View Message', 'event_espresso' ),
					'css_class' => 'dashicons dashicons-welcome-view-site',
				),
				'error' => array(
					'label' => __( 'View Error Message', 'event_espresso' ),
					'css_class' => 'dashicons dashicons-info',
				),
				'see_notifications_for' => array(
					'label' => __( 'View Related Messages', 'event_espresso' ),
					'css_class' => 'dashicons dashicons-megaphone',
				),
				'generate_now' => array(
					'label' => __( 'Generate the message now.', 'event_espresso' ),
					'css_class' => 'dashicons dashicons-admin-tools',
				),
				'send_now' => array(
					'label' => __( 'Send Immediately', 'event_espresso' ),
					'css_class' => 'dashicons dashicons-controls-forward',
				),
				'queue_for_resending' => array(
					'label' => __( 'Queue for Resending', 'event_espresso' ),
					'css_class' => 'dashicons dashicons-controls-repeat',
				),
				'view_transaction' => array(
					'label' => __( 'View related Transaction', 'event_espresso' ),
					'css_class' => 'dashicons dashicons-cart',
				)
			)
		);
	}


	/**
	 * This returns the url for a given action related to EE_Message.
	 *
	 * @since 4.9.0
	 *
	 * @param string $type  What type of action to return the url for.
	 * @param EE_Message $message   Required for generating the correct url for some types.
	 * @param array  $query_params   Any additional query params to be included with the generated url.
	 *
	 * @return string
	 */
	public static function get_message_action_url( $type, EE_Message $message = null, $query_params = array() ) {
		$action_urls = self::get_message_action_urls( $message, $query_params );
		return isset( $action_urls[ $type ] )  ? $action_urls[ $type ] : '';
	}



	/**
	 * This returns all the current urls for EE_Message actions.
	 *
	 * @since 4.9.0
	 *
	 * @param  EE_Message   $message    The EE_Message object required to generate correct urls for some types.
	 * @param  array    $query_params   Any additional query_params to be included with the generated url.
	 *
	 * @return array
	 */
	public static function get_message_action_urls( EE_Message $message = null, $query_params = array() ) {
		EE_Registry::instance()->load_helper( 'URL' );
		//if $message is not an instance of EE_Message then let's just do a dummy.
		$message = empty( $message ) ? EE_Message_Factory::create() : $message;
		$action_urls =  apply_filters(
			'FHEE__EEH_MSG_Template__get_message_action_url',
			array(
				'view' => EEH_MSG_Template::generate_browser_trigger( $message ),
				'error' => EEH_MSG_Template::generate_error_display_trigger( $message ),
				'see_notifications_for' => EEH_URL::add_query_args_and_nonce(
					array_merge(
						array(
							'page' => 'espresso_messages',
							'action' => 'default',
							'filterby' => 1,
						),
						$query_params
					),
					admin_url( 'admin.php' )
				),
				'generate_now' => EEH_URL::add_query_args_and_nonce(
					array(
						'page' => 'espresso_messages',
						'action' => 'generate_now',
						'MSG_ID' => $message->ID()
					),
					admin_url( 'admin.php' )
				),
				'send_now' => EEH_URL::add_query_args_and_nonce(
					array(
						'page' => 'espresso_messages',
						'action' => 'send_now',
						'MSG_ID' => $message->ID()
					),
					admin_url( 'admin.php' )
				),
				'queue_for_resending' => EEH_URL::add_query_args_and_nonce(
					array(
						'page' => 'espresso_messages',
						'action' => 'queue_for_resending',
						'MSG_ID' => $message->ID()
					),
					admin_url( 'admin.php' )
				),
			)
		);
		if (
			$message->TXN_ID() > 0
			&& EE_Registry::instance()->CAP->current_user_can(
				'ee_read_transaction',
				'espresso_transactions_default',
				$message->TXN_ID()
			)
		) {
			$action_urls['view_transaction'] = EEH_URL::add_query_args_and_nonce(
				array(
					'page' => 'espresso_transactions',
					'action' => 'view_transaction',
					'TXN_ID' => $message->TXN_ID()
				),
				admin_url( 'admin.php' )
			);
		} else {
			$action_urls['view_transaction'] = '';
		}
		return $action_urls;
	}


	/**
	 * This returns a generated link html including the icon used for the action link for EE_Message actions.
	 *
	 * @since 4.9.0
	 *
	 * @param string $type What type of action the link is for (if invalid type is passed in then an
	 *                     empty string is returned)
	 * @param EE_Message|null $message  The EE_Message object (required for some actions to generate correctly)
	 * @param array           $query_params Any extra query params to include in the generated link.
	 *
	 * @return string
	 */
	public static function get_message_action_link( $type, EE_Message $message = null, $query_params = array() ) {
		$url = EEH_MSG_Template::get_message_action_url( $type, $message, $query_params );
		$icon_css = EEH_MSG_Template::get_message_action_icon( $type );
		$title = isset( $icon_css['label'] ) ? 'title="' . $icon_css['label'] . '"' : '';

		if ( empty( $url ) || empty( $icon_css ) || ! isset( $icon_css['css_class'] ) ) {
			return '';
		}

		$icon_css['css_class'] .= esc_attr(
			apply_filters(
				'FHEE__EEH_MSG_Template__get_message_action_link__icon_css_class',
				' js-ee-message-action-link ee-message-action-link-' . $type,
				$type,
				$message,
				$query_params
			)
		);

		return '<a href="' . $url . '"' . $title . '><span class="' . esc_attr( $icon_css['css_class'] ) . '"></span></a>';

	}





	/**
	 * This returns an array with keys as reg statuses and values as the corresponding message type slug (filtered).
	 *
	 * @since 4.9.0
	 * @return array
	 */
	public static function reg_status_to_message_type_array() {
		return (array) apply_filters(
			'FHEE__EEH_MSG_Template__reg_status_to_message_type_array',
			array(
				EEM_Registration::status_id_approved => 'registration',
				EEM_Registration::status_id_pending_payment => 'pending_approval',
				EEM_Registration::status_id_not_approved => 'not_approved_registration',
				EEM_Registration::status_id_cancelled => 'cancelled_registration',
				EEM_Registration::status_id_declined => 'declined_registration'
			)
		);
	}




	/**
	 * This returns the corresponding registration message type slug to the given reg status. If there isn't a
	 * match, then returns an empty string.
	 *
	 * @since 4.9.0
	 * @param $reg_status
	 * @return string
	 */
	public static function convert_reg_status_to_message_type( $reg_status ) {
		$reg_status_array = self::reg_status_to_message_type_array();
		return isset( $reg_status_array[$reg_status] ) ? $reg_status_array[$reg_status] : '';
	}


	/**
	 * This returns an array with keys as payment stati and values as the corresponding message type slug (filtered).
	 *
	 * @since 4.9.0
	 * @return array
	 */
	public static function payment_status_to_message_type_array() {
		return (array) apply_filters(
			'FHEE__EEH_MSG_Template__payment_status_to_message_type_array',
			array(
				EEM_Payment::status_id_approved => 'payment',
				EEM_Payment::status_id_pending => 'payment_pending',
				EEM_Payment::status_id_cancelled => 'payment_cancelled',
				EEM_Payment::status_id_declined => 'payment_declined',
				EEM_Payment::status_id_failed => 'payment_failed'
			)
		);
	}




	/**
	 * This returns the corresponding payment message type slug to the given payment status. If there isn't a match then
	 * an empty string is returned
	 *
	 * @since 4.9.0
	 * @param $payment_status
	 * @return string
	 */
	public static function convert_payment_status_to_message_type( $payment_status ) {
		$payment_status_array = self::payment_status_to_message_type_array();
		return isset( $payment_status_array[$payment_status] ) ? $payment_status_array[$payment_status] : '';
	}


	/**
	 * This is used to retrieve the template pack for the given name.
	 *
	 * @param string $template_pack_name  should match the set `dbref` property value on the EE_Messages_Template_Pack.
	 *
	 * @return EE_Messages_Template_Pack
	 */
	public static function get_template_pack( $template_pack_name ) {
		if ( ! self::$_template_pack_collection instanceof EE_Object_Collection ) {
			self::$_template_pack_collection = new EE_Messages_Template_Pack_Collection();
		}

		//first see if in collection already
		$template_pack = self::$_template_pack_collection->get_by_name( $template_pack_name );

		if ( $template_pack instanceof EE_Messages_Template_Pack ) {
			return $template_pack;
		}

		//nope...let's get it.
		//not set yet so let's attempt to get it.
		$pack_class_name = 'EE_Messages_Template_Pack_' . str_replace(
				' ',
				'_',
				ucwords(
					str_replace( '_', ' ', $template_pack_name )
				)
			);
		if ( ! class_exists( $pack_class_name ) && $template_pack_name !== 'default' ) {
			return self::get_template_pack( 'default' );
		} else {
			$template_pack = new $pack_class_name;
			self::$_template_pack_collection->add( $template_pack );
			return $template_pack;
		}
	}




	/**
	 * Globs template packs installed in core and returns the template pack collection with all installed template packs
	 * in it.
	 *
	 * @since 4.9.0
	 *
	 * @return EE_Messages_Template_Pack_Collection
	 */
	public static function get_template_pack_collection() {
		$new_collection = false;
		if ( ! self::$_template_pack_collection instanceof EE_Messages_Template_Pack_Collection ) {
			self::$_template_pack_collection = new EE_Messages_Template_Pack_Collection();
			$new_collection = true;
		}

		//glob the defaults directory for messages
		$templates = glob( EE_LIBRARIES . 'messages/defaults/*', GLOB_ONLYDIR );
		foreach( $templates as $template_path ) {
			//grab folder name
			$template = basename( $template_path );

			if ( ! $new_collection ) {
				//already have it?
				if ( self::$_template_pack_collection->get_by_name( $template ) instanceof EE_Messages_Template_Pack ) {
					continue;
				}
			}

			//setup classname.
			$template_pack_class_name = 'EE_Messages_Template_Pack_' . str_replace(
					' ',
					'_',
					ucwords(
						str_replace(
							'_',
							' ',
							$template
						)
					)
				);
			if ( ! class_exists( $template_pack_class_name ) ) {
				continue;
			}
			self::$_template_pack_collection->add( new $template_pack_class_name );
		}

		/**
		 * Filter for plugins to add in any additional template packs
		 * Note the filter name here is for backward compat, this used to be found in EED_Messages.
		 */
		$additional_template_packs = apply_filters( 'FHEE__EED_Messages__get_template_packs__template_packs', array() );
		foreach ( (array) $additional_template_packs as $template_pack ) {
			if ( ! self::$_template_pack_collection->contains($template_pack ) ) {
				self::$_template_pack_collection->add( $template_pack );
			}
		}
		return self::$_template_pack_collection;
	}



	/**
	 * This is a wrapper for the protected _create_new_templates function
	 *
	 * @param string $messenger_name
	 * @param string $message_type_name message type that the templates are being created for
	 * @param int    $GRP_ID
	 * @param bool   $global
	 * @return array
	 * @throws \EE_Error
	 */
	public static function create_new_templates( $messenger_name, $message_type_name, $GRP_ID = 0, $global = false ) {
		/** @type EE_Message_Resource_Manager $Message_Resource_Manager */
		$Message_Resource_Manager = EE_Registry::instance()->load_lib( 'Message_Resource_Manager' );
		$messenger = $Message_Resource_Manager->valid_messenger( $messenger_name );
		$message_type = $Message_Resource_Manager->valid_message_type( $message_type_name );
		if ( ! EEH_MSG_Template::message_type_has_active_templates_for_messenger( $messenger, $message_type, $global ) ) {
			return array();
		}
		//whew made it this far!  Okay, let's go ahead and create the templates then
		return EEH_MSG_Template::_create_new_templates( $messenger, $message_type, $GRP_ID, $global );
	}



	/**
	 * @param \EE_messenger    $messenger
	 * @param \EE_message_type $message_type
	 * @param                  $GRP_ID
	 * @param                  $global
	 * @return array|mixed
	 */
	protected static function _create_new_templates( EE_messenger $messenger, EE_message_type $message_type, $GRP_ID, $global ) {
		//if we're creating a custom template then we don't need to use the defaults class
		if ( ! $global ) {
			return EEH_MSG_Template::_create_custom_template_group( $messenger, $message_type, $GRP_ID );
		}
		/** @type EE_Messages_Template_Defaults $Message_Template_Defaults */
		$Message_Template_Defaults = EE_Registry::factory(
			'EE_Messages_Template_Defaults',
			array( $messenger, $message_type, $GRP_ID )
		);
		//generate templates
		$success = $Message_Template_Defaults->create_new_templates();

		//if creating the template failed.  Then we should deactivate the related message_type for the messenger because
		//its not active if it doesn't have a template.  Note this is only happening for GLOBAL template creation
		//attempts.
		if ( ! $success ) {
			/** @var EE_Message_Resource_Manager $message_resource_manager */
			$message_resource_manager = EE_Registry::instance()->load_lib( 'Message_Resource_Manager' );
			$message_resource_manager->deactivate_message_type_for_messenger( $message_type->name, $messenger->name );
		}

		/**
		 * $success is in an array in the following format
		 * array(
		 *    'GRP_ID' => $new_grp_id,
		 *    'MTP_context' => $first_context_in_new_templates,
		 * )
		 */
		return $success;
	}



	/**
	 * This creates a custom template using the incoming GRP_ID
	 *
	 * @param \EE_messenger    $messenger
	 * @param \EE_message_type $message_type
	 * @param  int             $GRP_ID 		GRP_ID for the template_group being used as the base
	 * @return  array $success 				This will be an array in the format:
	 *                                      array(
	 * 											'GRP_ID' => $new_grp_id,
	 * 											'MTP_context' => $first_context_in_created_template
	 * 										)
	 * @access private
	 */
	private static function _create_custom_template_group( EE_messenger $messenger, EE_message_type $message_type, $GRP_ID ) {
		//defaults
		$success = array( 'GRP_ID' => null, 'MTP_context' => '' );
		//get the template group to use as a template from the db.  If $GRP_ID is empty then we'll assume the base will be the global template matching the messenger and message type.
		$Message_Template_Group = empty( $GRP_ID )
			? EEM_Message_Template_Group::instance()->get_one(
				array(
					array(
						'MTP_messenger'    => $messenger->name,
						'MTP_message_type' => $message_type->name,
						'MTP_is_global'    => true
					)
				)
			)
			: EEM_Message_Template_Group::instance()->get_one_by_ID( $GRP_ID );
		//if we don't have a mtg at this point then we need to bail.
		if ( ! $Message_Template_Group instanceof EE_Message_Template_Group ) {
			EE_Error::add_error(
				sprintf(
					__(
						'Something went wrong with generating the custom template from this group id: %s.  This usually happens when there is no matching message template group in the db.',
						'event_espresso'
					),
					$GRP_ID
				),
				__FILE__,
				__FUNCTION__,
				__LINE__
			);
			return $success;
		}
		//let's get all the related message_template objects for this group.
		$message_templates = $Message_Template_Group->message_templates();
		//now we have what we need to setup the new template
		$new_mtg = clone $Message_Template_Group;
		$new_mtg->set( 'GRP_ID', 0 );
		$new_mtg->set( 'MTP_is_global', false );
		$template_name = defined( 'DOING_AJAX' ) && ! empty( $_POST[ 'templateName' ] )
			? $_POST[ 'templateName' ]
			: __(
				'New Custom Template',
				'event_espresso'
			);
		$template_description = defined( "DOING_AJAX" ) && ! empty( $_POST[ 'templateDescription' ] )
			? $_POST[ 'templateDescription' ]
			: sprintf(
				__(
					'This is a custom template that was created for the %s messenger and %s message type.',
					'event_espresso'
				),
				$new_mtg->messenger_obj()->label[ 'singular' ],
				$new_mtg->message_type_obj()->label[ 'singular' ]
			);
		$new_mtg->set( 'MTP_name', $template_name );
		$new_mtg->set( 'MTP_description', $template_description );
		//remove ALL relations on this template group so they don't get saved!
		$new_mtg->_remove_relations( 'Message_Template' );
		$new_mtg->save();
		$success[ 'GRP_ID' ] = $new_mtg->ID();
		$success[ 'template_name' ] = $template_name;
		//add new message templates and add relation to.
		foreach ( $message_templates as $message_template ) {
			if ( ! $message_template instanceof EE_Message_Template ) {
				continue;
			}
			$new_message_template = clone $message_template;
			$new_message_template->set( 'MTP_ID', 0 );
			$new_message_template->set( 'GRP_ID', $new_mtg->ID() ); //relation
			$new_message_template->save();
			if ( empty( $success[ 'MTP_context' ] ) ) {
				$success[ 'MTP_context' ] = $new_message_template->get( 'MTP_context' );
			}
		}
		return $success;
	}



	/**
	 * message_type_has_active_templates_for_messenger
	 *
	 * @param \EE_messenger    $messenger
	 * @param \EE_message_type $message_type
	 * @param bool             $global
	 * @return bool
	 */
	public static function message_type_has_active_templates_for_messenger(
		EE_messenger $messenger,
		EE_message_type $message_type,
		$global = false
	) {
		//is given message_type valid for given messenger (if this is not a global save)
		if ( $global ) {
			return true;
		}
		$active_templates = EEM_Message_Template_Group::instance()->count(
			array(
				array(
					'MTP_is_active'    => true,
					'MTP_messenger'    => $messenger->name,
					'MTP_message_type' => $message_type->name
				)
			)
		);
		if ( $active_templates > 0 ) {
			return true;
		}
		EE_Error::add_error(
			sprintf(
				__(
					'The %1$s message type is not registered with the %2$s messenger. Please visit the Messenger activation page to assign this message type first if you want to use it.',
					'event_espresso'
				),
				$message_type->name,
				$messenger->name
			),
			__FILE__,
			__FUNCTION__,
			__LINE__
		);
		return false;
	}



	/**
	 * get_fields
	 * This takes a given messenger and message type and returns all the template fields indexed by context (and with field type).
	 *
	 * @param  string $messenger_name    name of EE_messenger
	 * @param  string $message_type_name name of EE_message_type
	 * @return array
	 */
	public static function get_fields( $messenger_name, $message_type_name ) {
		$template_fields = array();
		/** @type EE_Message_Resource_Manager $Message_Resource_Manager */
		$Message_Resource_Manager = EE_Registry::instance()->load_lib( 'Message_Resource_Manager' );
		$messenger = $Message_Resource_Manager->valid_messenger( $messenger_name );
		$message_type = $Message_Resource_Manager->valid_message_type( $message_type_name );
		if ( ! EEH_MSG_Template::message_type_has_active_templates_for_messenger( $messenger, $message_type ) ) {
			return array();
		}
		//okay now let's assemble an array with the messenger template fields added to the message_type contexts.
		foreach ( $message_type->get_contexts() as $context => $details ) {
			foreach ( $messenger->get_template_fields() as $field => $value ) {
				$template_fields[ $context ][ $field ] = $value;
			}
		}
		if ( empty( $template_fields ) ) {
			EE_Error::add_error(
				__( 'Something went wrong and we couldn\'t get any templates assembled', 'event_espresso' ),
				__FILE__,
				__FUNCTION__,
				__LINE__
			);
			return array();
		}
		return $template_fields;
	}

}
