<?php
/**
 * This file contains the EE_Messages_Template_ Pack abstract class.
 * @package      Event Espresso
 * @subpackage messages
 * @since           4.5.0
 */
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

/**
 * EE_Template_Packs are classes that contain all the information related to messages templates for a given "template pack".
 *
 * Child classes extending this class must have "EE_Messages_Template_Pack" as the prefix for the class name, and the sentence_case must be used in the classname.  So if the dbref is "full_width", then the full class name must be "EE_Messages_Template_Pack_Full_Width"
 *
 * @package        Event Espresso
 * @subpackage  messages
 * @since            4.5.0
 * @author          Darren Ethier
 */
abstract class  EE_Messages_Template_Pack {


	/**
	 * This defines the base_path where the templates are located.
	 *
	 * @since            4.5.0
	 *
	 * @var string
	 */
	protected $_base_path;




	/**
	 * This defines the base_url where things are found for this template pack (possibly variations).
	 *
	 * @since 4.5.0
	 *
	 * @var string
	 */
	protected $_base_url;



	/**
	 * localized label for this template pack
	 *
	 * @since            4.5.0
	 *
	 * @var string
	 */
	public $label;




	/**
	 * used to contain a description for the template pack.
	 *
	 * @since 4.5.0
	 *
	 * @var string
	 */
	public $description;




	/**
	 * How this template is referenced in the db
	 *
	 * @since 4.5.0
	 *
	 * @var string
	 */
	public $dbref;




	/**
	 * This is an array indexed by messenger and with an array of message types as values that indicate what messenger and message type this template pack supports by default.  It is possible for this to be modified by plugins via filters, but out of the box, this is what the template pack supports.
	 *
	 * @since 4.5.0
	 *
	 * @var array.
	 */
	protected $_supports = array();





	/**
	 * Holds the retrieved default templates for this template pack in a multidimensional array indexed by context and field, for a given messenger and message type.  Example format:
	 *
	 * $templates = array(
	 * 	'email' => array(
	 * 		'registration' => array(
	 * 			'admin' => array(
	 * 				'to' => 'contents',
	 * 				'from' => 'contents',
	 * 				'subject' => 'contents',
	 * 				'content' => 'contents',
	 * 				'event_list' => 'contents',
	 * 				'attendee_list' => 'contents'
	 * 			),
	 * 			'attendee' => array(
	 * 				'to' => 'contents',
	 * 				'from' => 'contents',
	 * 				'subject' => 'contents',
	 * 				'content' => 'contents',
	 * 				'event_list' => 'contents',
	 * 				'attendee_list' => 'contents',
	 * 			),
	 * 		)
	 * 	)
	 * )
	 *
	 * @since 4.5.0
	 *
	 * @var array
	 */
	protected $_templates = array();






	/**
	 * Template Packs must ALWAYS have a default variation defined.  This property allow one to override the default variation labels per messenger.
	 * example:
	 * $this->_default_variation_labels = array( 'email' =>  __('Default', 'event_espresso' ) );
	 *
	 * @var array
	 */
	protected $_default_variation_labels = array();




	/**
	 * This is an array of extra css variations for message templates indexed by messenger with the values as an array or message types the variations apply to as the key  and then values are an array with variation slugs as the key and label as the value. Note the default variation is not included in this array.  So the structure is:
	 * array(
	 * 	'email' => array(
	 * 	)
	 * )
	 *
	 * Keep in mind that this property is used both for indicating valid variations for a given message type and messenger but the variation files themselves are ONLY unique to the messenger.  So if you have a variation for the html messenger referenced by the slug "sunset_red" Then the variation file for the main type will be html_main_sunset_red.css.  All the array in this property allows you to do, is indicate that with certain message types the sunset_red variation is available but for other message types its not.  But you could NOT have a sunset_red variation file for one messenger/message_type and a different one for another messenger/message_type.  If you want different css looks then you can define a different structural layout for the template , messenger, message type combination and in the same sunset_red.css variation file just add css specific to that layout.
	 *
	 * @since 4.5.0
	 *
	 * @var array
	 */
	public $_variations = array();




	/**
	 * Template pack constructor
	 *
	 * @since 4.5.0
	 */
	public function __construct() {
		$this->_set_props();
		//make sure classname is correct
		$classname = get_class( $this );
		//make sure required props have been set

		//if label is empty then throw an error because we should have it defined by now.
		if ( ! isset( $this->label )  ) {
			throw new EE_Error( sprintf( __('The label property is not set for %s.  Please ensure that is set for the class.', 'event_espresso' ), $classname ) );
		}


		//the reference for this template pack
		if ( ! isset( $this->dbref )  ) {
			throw new EE_Error( sprintf( __('The dbref property is not set for %s.  Please ensure that is set for the class.', 'event_espresso' ), $classname ) );
		}

		//make sure dbref is safe
		$this->dbref = str_replace( '-', '_', sanitize_key( $this->dbref ) );

		$should_be = 'EE_Messages_Template_Pack_' . str_replace( ' ', '_', ucwords( str_replace( '_', ' ', $this->dbref ) ) );

		if ( $should_be !== $classname ) {
			throw new EE_Error( sprintf( __('The name of the template pack instantiated class is "%s".  It should be "%s".  Make sure that the name of the template pack class matches is prepended with "EE_Messages_Template_Pack_" and appended with a sentence case iteration of the value for your template pack\'s dbref property.', 'event_espresso' ), $classname, $should_be ) );
		}

		//if _base_path is not set then throw an error because a base path string is needed.
		if ( empty( $this->_base_path ) ) {
			throw new EE_Error( sprintf( __('The _base_path property is not set for %s.  Please ensure that is set for the class.', 'event_espresso' ), $classname ) );
		}


		//if _base_url is not set then throw an error because a  string is needed for variations.
		if ( empty( $this->_base_url ) ) {
			throw new EE_Error( sprintf( __('The _base_url property is not set for %s.  Please ensure that is set for the class.', 'event_espresso' ), $classname ) );
		}


		//if $supports is not set then throw an error because that effectively means this template_pack does not have any templates!
		if ( empty( $this->_supports ) ) {
			throw new EE_Error( sprintf( __('The supports property is not set for %s.  Please ensure that is set for the class.', 'event_espresso' ), $classname ) );
		}


	}



	/**
	 * This method should be used to define the following properties:
	 * - label
	 * - dbref
	 * - description
	 * - _base_path
	 * - _base_url
	 * - supports
	 * - variations
	 *
	 * @since 4.5.0
	 * @return void.
	 * @abstract
	 */
	abstract protected function _set_props();




	/**
	 * Wrapper for get_templates() ( @see get_templates() for documentation)
	 *
	 * @since 4.5.0
	 *
	 * @param EE_messenger    $messenger
	 * @param EE_message_type $message_type
	 *
	 * @return array
	 */
	public function get_templates( EE_messenger $messenger, EE_message_type $message_type ) {
		return isset( $this->_templates[$messenger->name][$message_type->name] ) ? $this->_templates[$messenger->name][$message_type->name] : $this->_get_templates( $messenger, $message_type );
	}




	/**
	 * This takes the incoming messenger and message type objects, uses them to get the set fields and contexts, then attempts to retrieve the templates matching those for this given template pack.
	 *
	 * @since 4.5.0
	 *
	 * @param EE_messenger    $messenger
	 * @param EE_message_type $message_type
	 *
	 * @return array          Returns an multi-level associative array indexed by template context and field in the format:
	 *                                array( 'context' => array( 'field' => 'value', 'another-field', 'value' ) );
	 */
	protected function _get_templates( EE_messenger $messenger, EE_message_type $message_type ) {
		$templates = array();

		/**
		 * Retrieving the default pack for later usage of default templates for template packs that
		 * are NOT the default pack ( or an extension of the default pack ).
		 * We ONLY set this variable to be the default pack IF the loaded class is NOT the default
		 * pack.  This prevents recursion in _get_specific_template().  The intention is that for
		 * template packs that are NOT default packs, we use the default template pack to provide
		 * the final fallback templates if there aren't any defined for the called template pack.
		 *
		 * @type EE_Messages_Template_Pack_Default | null $default_pack
		 */
		$default_pack = ! $this instanceof EE_Messages_Template_Pack_Default ? new EE_Messages_Template_Pack_Default() : null;

		$fields = $messenger->get_template_fields();
		$contexts = $message_type->get_contexts();


		foreach ( $contexts as $context => $details ) {
			foreach ( $fields as $field => $field_details ) {
				if ( empty( $field_details ) )
					continue;
				/**
				 * is this a field array (linked to a main field)?
				 */
				if ( $field == 'extra'  ) {
					foreach ( $field_details as $main_field => $sub_fields ) {
						foreach ( $sub_fields as $sub_field => $sub_field_details ) {
							//make sure that the template_field_ref matches what the main template field is for this template group.
							$template_field_ref = $sub_field == 'main' ? $main_field : $sub_field;
							$templates[ $context ][ $main_field ][ $sub_field ] = $this->_get_specific_template( $default_pack, $messenger, $message_type, $template_field_ref, $context );
						}
					}
				} else {
					$templates[ $context ][ $field ] = $this->_get_specific_template( $default_pack, $messenger, $message_type, $field, $context );
				}
			}
		}

		$templates = apply_filters( 'FHEE__EE_Template_Pack___get_templates__templates', $templates, $messenger, $message_type, $this );

		$this->_templates[$messenger->name][$message_type->name] = $templates;
		 return $templates;
	}


	/**
	 * Utility method for retrieving a specific template matching the given parameters
	 *
	 * @param null | EE_Messages_Template_Pack_Default $default_pack
	 * @param EE_messenger                             $messenger
	 * @param EE_message_type                          $message_type
	 * @param string                                   $field          The field reference for the specific template being looked up.
	 * @param string                                   $context      The context reference for the specific template being looked up
	 *
	 * @return string          The template contents.
	 */
	protected function _get_specific_template( $default_pack, EE_messenger $messenger, EE_message_type $message_type, $field, $context ) {

		//default templates
		$default_templates = $default_pack instanceof EE_Messages_Template_Pack_Default ? $default_pack->get_templates( $messenger, $message_type ) : array();

		//first we allow for the $_base_path to be filtered.  However, we assign this to a new variable so that we have the original base_path as a fallback.
		$filtered_base_path = apply_filters( 'FHEE__EE_Template_Pack___get_specific_template__filtered_base_path', $this->_base_path, $messenger, $message_type, $field, $context, $this );

		$master_templates = $message_type->get_master_templates();
		$master_templates_mt = isset( $master_templates[$messenger->name] ) ? $master_templates[$messenger->name] : $message_type->name;
		$full_path = $filtered_base_path . $messenger->name . '_' . $message_type->name . '_' . $field . '_' . $context . '.template.php';
		$fallback_path = $filtered_base_path . $messenger->name . '_' . $message_type->name . '_' . $field . '.template.php';
		$mt_defined_full_path = $filtered_base_path . $messenger->name . '_' . $master_templates_mt . '_' . $field . '_' . $context . '.template.php';
		$mt_defined_fallback_path = $filtered_base_path . $messenger->name . '_' . $master_templates_mt . '_' . $field . '.template.php';
		$base_defined_full_path = $this->_base_path . $messenger->name . '_' . $master_templates_mt . '_' . $field . '_' . $context . '.template.php';
		$base_defined_fallback_path = $this->_base_path . $messenger->name . '_' . $master_templates_mt . '_' . $field . '.template.php';

		/**
		 * Template checks are done hierarchically in the following order:
		 *
		 * - a match for the full messenger name, message type, context and field in the full path for the given template pack.
		 * - a match for the full messenger name, message type, field in the full path for the given template pack.
		 * - a match for the full messenger name, message type, field, context in the path grabbed for the related message type defined in the _master_templates property for the message type (i.e. all registration message types share the same template as the main registration message type).
		 * - match for the full messenger name, message type, field for the related message type defined in the _master templates property for the message type
		 * - a match for a default template matching the messenger, name, context, field (as set by the default template packs).
		 * - empty string.
		 */


		if ( is_readable( $full_path ) ) {
			$actual_path = $full_path;
		} elseif ( is_readable( $fallback_path ) ) {
			$actual_path = $fallback_path;
		} elseif ( is_readable( $mt_defined_full_path ) ) {
			$actual_path = $mt_defined_full_path;
		} elseif ( is_readable( $mt_defined_fallback_path ) ) {
			$actual_path = $mt_defined_fallback_path;
		} elseif ( is_readable( $base_defined_full_path ) ) {
			$actual_path = $base_defined_full_path;
		} elseif ( is_readable( $base_defined_fallback_path ) ) {
			$actual_path = $base_defined_fallback_path;
		} else  {
			$actual_path = '';
		}
		if ( empty( $actual_path ) ) {
			$contents = isset( $default_templates[$context][$field] ) ? $default_templates[$context][$field] : '';
		} else {
			$contents = EEH_Template::display_template( $actual_path, array(), TRUE );
		}

		return apply_filters( 'FHEE__EE_Messages_Template_Pack__get_specific_template__contents', $contents, $actual_path, $messenger, $message_type, $field, $context, $this );
	}





	/**
	 * Return filtered _supports property.
	 *
	 * @since 4.5.0
	 *
	 * @return array
	 */
	public function get_supports() {
		$supports = apply_filters( 'FHEE__' . get_class( $this ) . '__get_supports', $this->_supports );
		return apply_filters( 'FHEE__EE_Messages_Template_Pack__get_supports', $supports, $this );
	}




	/**
	 * This simply returns the $_default_variation_labels property value.
	 *
	 * @since 4.5.0
	 *
	 * @param string $messenger if the messenger slug is returned then the default label for the specific messenger is retrieved.  If it doesn't exist then the __('Default', 'event_espresso') is returned.  If NO value is provided then whatever is set on the _default_variation_labels property is returned.
	 *
	 * @return array|string
	 */
	public function get_default_variation_labels( $messenger = '' ) {
		$label = empty( $messenger ) ? $this->_default_variation_labels : array();
		$label = empty( $label ) && ! empty( $this->_default_variation_labels[$messenger] ) ? $this->_default_variation_labels[$messenger] : __('Default', 'event_espresso');

		return apply_filters( 'FHEE__EE_Messages_Template_Pack__get_default_variation_labels', $label, $this->_default_variation_labels, $messenger );
	}





	/**
	 * This simply returns the _variations property.
	 *
	 * @since 4.5.0
	 *
	 * @param string $messenger if included then css variations matching the messenger are returned.  Otherwise, just the default variation is included.  If both message type AND messenger are empty then all variations are returned.
	 * @param string $message_type if included then css variations matching the message_type are returned (must have $messenger set).  Otherwise the array of variations per message type are returned.  If message_type is provided but NOT the messenger, then just all variations for all messengers are returned.
	 * @return array
	 */
	public function get_variations( $messenger = '', $message_type = '' ) {
		$messenger_variations = ! empty( $messenger ) && isset( $this->_variations[$messenger] ) ? $this->_variations[$messenger] : array();

		//message_type provided? IF so, then we've requested a specific set of variations, so we need to make sure we set it as empty if that's not present.
		$variations = !empty( $messenger ) && !empty( $message_type ) && isset( $messenger_variations[$message_type] ) ? $messenger_variations[$message_type] : array();

		//now let's account for the possibility we just want all the variations for a messenger (which is indicated by providing the messenger but not the message type).
		$variations = empty( $variations ) && !empty( $messenger ) && empty( $message_type ) ? $messenger_variations : $variations;

		//filter per template pack and globally.
		$variations = apply_filters( 'FHEE__' . get_class( $this ) . '__get_variations', $variations, $messenger, $message_type );
		$variations = apply_filters( 'FHEE__EE_Messages_Template_Pack__get_variations', $variations, $messenger, $message_type, $this );

		//prepend the _default_variation, but ONLY if we're returning the fully validated array.
		if ( !empty( $messenger ) && !empty( $message_type ) && ! empty( $variations ) ) {
			$variations = array( 'default' => $this->get_default_variation_labels( $messenger ) ) + $variations;
		}

		return empty( $variations ) ? array( 'default' => $this->get_default_variation_labels('dft') ): $variations;
	}




	/**
	 * This is typically called by EE_messenger objects to get the specific css variation defined for the messenger, message_type and type (i.e. inline, wpeditor, preview etc.)
	 *
	 * @since 4.5.0
	 *
	 * @param string $messenger messenger slug
	 * @param string $message_type message_type slug
	 * @param string $type           variation type (i.e. inline, base, wpeditor, preview etc. //this varies per messenger).
	 * @param string $variation    this should match one of the defined variations in the _variations property on this class.
	 * @param string $file_extension  What type of file the variation file is (defaults to css)
	 * @param bool   $url          if true then return the url otherwise path.
	 * @param bool   $skip_filters This should not be set directly, its used internally to skip filters when the default template pack is called internally as the fallback.
	 *
	 * @return string The variation path or url (typically css reference)
	 */
	public function get_variation( $messenger, $message_type, $type, $variation, $url = true, $file_extension = '.css', $skip_filters = FALSE ) {

		$base = $url ? $this->_base_url : $this->_base_path;
		$base_path = $this->_base_path;

		if ( ! $skip_filters ) {
			$base =  apply_filters( 'FHEE__EE_Messages_Template_Pack__get_variation__base_path_or_url', $base, $messenger, $message_type, $type, $variation, $url, $file_extension, $this );
			$base_path = apply_filters( 'FHEE__EE_Messages_Template_Pack__get_variation__base_path', $base_path, $messenger, $message_type, $type, $variation, FALSE, $file_extension, $this );
		}

		$default_pack = get_class( $this ) != 'EE_Messages_Template_Pack_Default' ? new EE_Messages_Template_Pack_Default() : $this;

		//possible variation paths considering whether message type is present or not in the file name.
		$path_string = 'variations/' . $messenger . '_' . $message_type . '_'  . $type . '_' . $variation . $file_extension;
		$default_path_string = 'variations/' . $messenger . '_' . $type . '_' . $variation . $file_extension;

		//first see if fully validated file exists.
		if ( is_readable( $base_path . $path_string ) ) {
			$variation_path = $base . $path_string;
		//otherwise see if default exists.
		} elseif ( is_readable( $base_path . $default_path_string ) ) {
			$variation_path = $base . $default_path_string;
		} else {
			$variation_path = $default_pack instanceof EE_Messages_Template_Pack_Default ? $default_pack->get_default_variation( $messenger, $message_type, $type, $url, $file_extension ) : '';
		}

		if ( $skip_filters ) {
			return $variation_path;
		}

		//filter result
		$variation_path = apply_filters( 'FHEE__' . get_class( $this ) . '__get_variation', $variation_path, $messenger, $message_type, $type, $variation, $file_extension, $url );
		return apply_filters( 'FHEE__EE_Messages_Template_Pack__get_variation', $variation_path, $messenger, $message_type, $type, $variation, $file_extension, $url, $this );
	}





	/**
	 * This method is used to return the wrapper template for the given template pack.  If the given template pack does not include any wrapper templates then the default is used.
	 *
	 * @param string $messenger What messenger the wrapper is for.
	 * @param string $type           What type of wrapper is being returned ( for messengers that may have more than one wrapper )
	 *
	 * @return string returns the path for the requested wrapper template.
	 */
	public function get_wrapper( $messenger, $type = 'main' ) {
		$default_pack = get_class( $this ) !== 'EE_Messages_Template_Pack_Default' ? new EE_Messages_Template_Pack_Default() : NULL;

		$path_string = $this->_base_path . $messenger . '_' . $type . '_wrapper.template.php';

		if ( is_readable( $path_string ) ) {
			$template = $path_string;
		} else {
			$template = $default_pack instanceof EE_Messages_Template_Pack_Default ? $default_pack->get_wrapper( $messenger, $type ) : '';
		}

		//filter
		$template = apply_filters( 'FHEE__' . get_class( $this ) . '__get_wrapper', $template, $messenger, $type );
		return apply_filters( 'FHEE__EE_Messages_Template_Pack__get_wrapper', $template, $messenger, $type, $this );
	}
}
