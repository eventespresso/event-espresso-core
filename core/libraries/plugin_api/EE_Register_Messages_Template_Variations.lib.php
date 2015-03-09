<?php
/**
 * This file contains the EE_Register_Messages_Template_Variations class that implements EEI_Plugin_API
 * @package      Event Espresso
 * @subpackage plugin api, messages
 * @since           4.5.0
 */
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

/**
 * Use this to register or deregister a new message template pack variation for the EE messages system.
 *
 * @package        Event Espresso
 * @subpackage  plugin api, messages
 * @since            4.5.0
 * @author          Darren Ethier
 */
class EE_Register_Messages_Template_Variations implements EEI_Plugin_API {

	/**
	 * Holds values for registered variations
	 *
	 * @since 4.5.0
	 *
	 * @var array
	 */
	protected static $_registry = array();




	/**
	 * Used to register new variations
	 *
	 * Variations are attached to template packs and do not typically change any structural layout but merely tweak the style of the layout.  The most commonly known variation is css.  CSS does not affect html structure just the style of existing structure.
	 *
	 * It's important to remember that when variation files are loaded, the file structure looked for is: '{$messenger}_{$messenger_variation_type}_{$variation_slug}.{$extension}'.
	 *
	 * 	- Every variation applies to specific messengers.  That's why the variation file includes the messenger name it.   This ensures that if a template pack the variation is registered with supports multiple variations that you can have the correct variation loaded.
	 * 	- EE_messengers also implicitly define variation "types" which typically are the context in which a specific variation is loaded.  For instance the email messenger has: 'inline', which is the css added inline to the email templates; 'preview', which is the same css only customized for when emails are previewed; and 'wpeditor', which is the same css only customized so that it works with the wpeditor fields for templates to give a accurate representation of the style in the wysiwyg editor.  This means that for each variation, if you want it to be accurately represented in various temlpate contexts you need to have that relevant variation file available.
	 * 	- $variation_slug  is simply the variation slug for that variation.
	 * 	- $extension = whatever the extension is for the variation used for the messenger calling it.  In MOST cases messenger variations are .css files.
	 * 	Note: if your file names are not formatted correctly then they will NOT be loaded.  The EE messages template pack system will fallback to corresponding default template pack for the given messenger or as a last resort (i.e. no default variation for the given messenger) will not load any variation (so the template pack would be unstyled)
	 *
	 * @see /core/libraries/messages/defaults/default/variations/* for example variation files for the email and html messengers.
	 *
	 * @param string $variation_ref unique reference used to describe this variation registry. If this ISN'T unique then this method will make it unique (and it becomes harder to deregister).
	 * @param array  $setup_args    {
	 *                              an array of required values for registering the variations.
	 *                              @type array $variations 	{
	 *                                    An array indexed by template_pack->dbref. and values are an array indexed by messenger name and values are an array indexed by message_type and values are an array indexed by variation_slug and value  is the localized label for the variation.  Note this api reserves the "default" variation name for the default template pack so you can't register a default variation.  Also, try to use unique variation slugs to reference your variations because this api checks if any existing varations are in place with that name.  If there are then subsequent variations for that template pack with that same name will fail to register with a persistent notice put up for the user. Required.
	 *                                   'default' => array(
	 *                                   	 'email' => array(
	 *                                   	 	'registration_approved' => array(
	 *                                    		 	my_ee_addon_blue_lagoon' => __('Blue Lagoon',
	 *                                    		 	'text_domain'),
	 *                                    	   		'my_ee_addon_red_sunset' => __('Red Sunset',
	 *                                    	   		'text_domain')
	 *                                          		)
	 *                                          	)
	 *                                    )
	 *                              }
	 *                              @type string $base_path The base path for where all your variations are found.  Although the full path to your variation files should include '/variations/' in it, do not include the 'variations/' in this. Required.
	 *                              @type string $base_url    The base url for where all your variations are found. See note above about the 'variations/' string. Required.
	 *                              }
	 * }
	 *
	 * @throws EE_Error
	 * @return void
	 */
	public static function register( $variation_ref = NULL,  $setup_args = array() ) {

		//check for required params
		if ( empty( $variation_ref ) ) {
			throw new EE_Error(
				__('In order to register variations for a EE_Message_Template_Pack, you must include a value to reference the variations being registered', 'event_espresso')
				);
		}

		if ( ! is_array( $setup_args ) || empty( $setup_args['variations'] ) || empty( $setup_args['base_path'] ) || empty( $setup_args['base_url'] ) ) {
			throw new EE_Error(
				__('In order to register variations for a EE_Message_Template_Pack, you must include an array containing the following keys: "variations", "base_path", "base_url", "extension"', 'event_espresso')
				);
		}

		//make sure we don't register twice
		if( isset( self::$_registry[ $variation_ref ] ) ){
			return;
		}

		//make sure variation ref is unique.
		if ( isset( self::$_registry[$variation_ref] ) ) {
			$variation_ref = uniqid() . '_' . $variation_ref;
		}


		//make sure this was called in the right place!
		 if ( ! did_action( 'EE_Brewing_Regular___messages_caf' ) || did_action( 'AHEE__EE_System__perform_activations_upgrades_and_migrations' )) {
			EE_Error::doing_it_wrong(
				__METHOD__,
				sprintf(
					__('Messages Templates Variations given the reference "%s" has been attempted to be registered with the EE Messages Template Pack System.  It may or may not work because it should be only called on the "EE_Brewing_Regular__messages_caf" hook.','event_espresso'),
					$variation_ref
				),
				'4.5.0'
			);
		}

		//validate/sanitize incoming args.
		$validated = array(
			'variations' => (array) $setup_args['variations'],
			'base_path' => (string) $setup_args['base_path'],
			'base_url' => (string) $setup_args['base_url']
			);


		//check that no reserved variation names are in use and also checks if there are already existing variation names for a given template pack.  The former will throw an error.  The latter will remove the conflicting variation name but still register the others and will add EE_Error notice.
		$validated = self::_verify_variations( $variation_ref, $validated );
		self::$_registry[$variation_ref] = $validated;

		add_filter( 'FHEE__EE_Messages_Template_Pack__get_variations', array( 'EE_Register_Messages_Template_Variations', 'get_variations' ), 10, 4 );
		add_filter( 'FHEE__EE_Messages_Template_Pack__get_variation', array( 'EE_Register_Messages_Template_Variations', 'get_variation' ), 10, 8 );
	}





	/**
	 * Cycles through the variations registered and makes sure there are no reserved variations being registered which throws an error.  Also checks if there is already a
	 *
	 * @since  4.5.0
	 *
	 * @param string $variation_ref the reference for the variations being registered
	 * @param array  $validated_variations The variations setup array that's being registered (and verified).
	 * @throws EE_Error
	 * @return bool
	 */
	private static function _verify_variations( $variation_ref, $validated_variations ) {
		foreach ( self::$_registry as $variation_ref => $settings ) {
			foreach ( $settings['variations'] as $template_pack => $messenger ) {
				foreach ( $messenger as $all_variations ) {
					if ( isset( $all_variations['default'] ) ) {
						throw new EE_Error(
							sprintf( __('Variations registered through the EE_Register_Messages_Template_Variations api cannot override the default variation for the default template.  Please check the code registering variations with this reference, "%s" and modify.', 'event_espresso' ), $variation_ref )
							);
					}
				}
			}
		}

		//is there already a variation registered with a given variation slug?
		foreach ( $validated_variations['variations'] as $template_pack => $messenger  ) {
			foreach ( $messenger as $message_type => $variations ) {
				foreach( $variations as $slug => $label ) {
					foreach ( self::$_registry as $registered_var => $reg_settings ) {
						if ( isset( $reg_settings['variations'][$template_pack][$messenger][$message_type][$slug] ) ) {
							unset( $validated_variations['variations'][$template_pack][$messenger][$message_type][$slug] );
							EE_Error::add_error( sprintf( __('Unable to register the %s variation for the %s template pack with the %s messenger and %s message_type because a variation with this slug was already registered for this template pack and messenger and message type by an addon using this key %s.', 'event_espresso' ), $label, $template_pack, $messenger, $message_type, $registered_var  ) );
						}
					}
				}
			}
		}
		return $validated_variations;
	}





	/**
	 * Callback for the FHEE__EE_Messages_Template_Pack__get_variation filter to ensure registered variations are used.
	 *
	 * @since 4.5.0
	 *
	 * @param string                    $variation_path The path generated for the current variation
	 * @param string                    $messenger      The messenger the variation is for
	 * @param string                    $message_type  EE_message_type->name
	 * @param string                    $type           The type of variation being requested
	 * @param string                    $variation      The slug for the variation being requested
	 * @param string                    $file_extension What the file extension is for the variation
	 * @param bool                      $url            Whether url or path is being returned.
	 * @param EE_Messages_Template_Pack $template_pack
	 *
	 * @return string                    The path to the requested variation.
	 */
	public static function get_variation( $variation_path, $messenger, $message_type, $type, $variation, $file_extension, $url, EE_Messages_Template_Pack $template_pack ) {

		//so let's loop through our registered variations and then pull any details matching the request.
		foreach ( self::$_registry as $registry_slug => $registry_settings ) {
			$base = $url ? $registry_settings['base_url'] : $registry_settings['base_path'];
			$file_string = $messenger . '_' . $type. '_' . $variation . $file_extension;
			//see if this file exists
			if ( is_readable( $registry_settings['base_path'] . $file_string ) ) {
				return $base . $file_string;
			}
		}

		//no match
		return $variation_path;
	}





	/**
	 * callback for the FHEE__EE_Messages_Template_Pack__get_variations filter.
	 *
	 *
	 * @since 4.5.0
	 *
	 * @param array                   $variations    The original contents for the template pack variations property.  @see $_variation property definition in EE_Messages_Template_Pack
	 * @param string $messenger The messenger requesting the variations.
	 * @param EE_Messages_Template_Pack $template_pack
	 *
	 * @return array                   new variations array (or existing one if nothing registered)
	 */
	public static function get_variations( $variations, $messenger,  $message_type, EE_Messages_Template_Pack $template_pack ) {
		//first let's check if we even have registered variations and get out early.
		if ( empty( self::$_registry ) ) {
			return $variations;
		}

		//do we have any new variations for the given messenger, $message_type, and template packs
		foreach ( self::$_registry as $registry_slug => $registry_settings ) {
			//allow for different conditions.
			if ( empty( $messenger) ) {
				$variations =  array_merge( $registry_settings['variations'], $variations );
			} else if ( ! empty( $messenger ) && empty( $message_type ) && ! empty( $registry_settings['variations'][$template_pack->dbref][$messenger] ) ) {
				$variations =  array_merge( $registry_settings['variations'][$template_pack->dbref][$messenger], $variations );
			} else if ( ! empty( $messenger ) && ! empty( $message_type ) && ! empty( $registry_settings['variations'][$template_pack->dbref][$messenger][$message_type] ) ) {
				$variations = array_merge( $registry_settings['variations'][$template_pack->dbref][$messenger][$message_type], $variations );
			}
		}
		return $variations;
	}





	/**
	 * This deregisters a variation set that was previously registered with the given slug.
	 *
	 * @since 4.5.0
	 *
	 * @param string $variation_ref The name for the variation set that was previously registered.
	 *
	 * @return void
	 */
	public static function deregister( $variation_ref = NULL ) {
		if ( !empty( self::$_registry[$variation_ref] ) ) {
    			unset( self::$_registry[$variation_ref] );
    		}
	}

}
