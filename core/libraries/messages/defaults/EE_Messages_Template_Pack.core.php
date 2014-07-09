<?php
/**
 * This file contains the EE_Messages_Template_ Pack abstract class.
 * @package      Event Espresso
 * @subpackage messages
 * @since           %VER%
 */
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

/**
 * EE_Template_Packs are classes that contain all the information related to messages templates for a given "template pack".
 *
 * @package        Event Espresso
 * @subpackage  messages
 * @since            %VER%
 * @author          Darren Ethier
 */
abstract class  EE_Messages_Template_Pack {


	/**
	 * This defines the base_path where the templates are located.
	 *
	 * @since            %VER%
	 *
	 * @var string
	 */
	protected $_base_path;




	/**
	 * This defines the base_url where things are found for this template pack (possibly variations).
	 *
	 * @since %VER%
	 *
	 * @var string
	 */
	protected $_base_url;



	/**
	 * localized label for this template pack
	 *
	 * @since            %VER%
	 *
	 * @var string
	 */
	public $label;




	/**
	 * used to contain a description for the template pack.
	 *
	 * @since %VER%
	 *
	 * @var string
	 */
	public $description;




	/**
	 * How this template is referenced in the db
	 *
	 * @since %VER%
	 *
	 * @var string
	 */
	public $dbref;




	/**
	 * This is an array indexed by messenger and with an array of message types as values that indicate what messenger and message type this template pack supports by default.  It is possible for this to be modified by plugins via filters, but out of the box, this is what the template pack supports.
	 *
	 * @since %VER%
	 *
	 * @var array.
	 */
	protected $_supports = array();





	/**
	 * Holds the retreived default templates for this template pack in a multidimensional array indexed by context and field, for a given messenger and message type.  Example format:
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
	 * @since %VER%
	 *
	 * @var array
	 */
	protected $_templates = array();




	/**
	 * This is an array of css variations for message templates indexed by messenger with the values as an array with variation slug and label.  If EMPTY then that means that there is only one variation (default) for this template pack.  Note that there is ALWAYs a default variation (i.e. doesn't need to be included in this array).
	 *
	 * @since %VER%
	 *
	 * @var array
	 */
	public $_variations = array();




	/**
	 * Template pack constructor
	 *
	 * @since %VER%
	 */
	public function __construct() {
		$this->_set_props();

		//make sure required props have been set

		//if label is empty then throw an error because we should have it defined by now.
		if ( ! isset( $this->label )  ) {
			throw new EE_Error( sprintf( __('The label property is not set for %s.  Please ensure that is set for the class.', 'event_espresso' ), get_class( $this ) ) );
		}


		//the reference for this template pack
		if ( ! isset( $this->dbref )  ) {
			throw new EE_Error( sprintf( __('The dbref property is not set for %s.  Please ensure that is set for the class.', 'event_espresso' ), get_class( $this ) ) );
		}

		//if _base_path is not set then throw an error because a base path string is needed.
		if ( empty( $this->_base_path ) ) {
			throw new EE_Error( sprintf( __('The _base_path property is not set for %s.  Please ensure that is set for the class.', 'event_espresso' ), get_class( $this ) ) );
		}


		//if _base_url is not set then throw an error because a  string is needed for variations.
		if ( empty( $this->_base_url ) ) {
			throw new EE_Error( sprintf( __('The _base_url property is not set for %s.  Please ensure that is set for the class.', 'event_espresso' ), get_class( $this ) ) );
		}


		//if $supports is not set then throw an error because that effectively means this template_pack does not have any templates!
		if ( empty( $this->_supports ) ) {
			throw new EE_Error( sprintf( __('The supports property is not set for %s.  Please ensure that is set for the class.', 'event_espresso' ), get_class( $this ) ) );
		}

		//load template helper
		EE_Registry::instance()->load_helper( 'Template' );

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
	 * @since %VER%
	 * @return void.
	 * @abstract
	 */
	abstract protected function _set_props();




	/**
	 * Wrapper for get_templates() ( @see get_templates() for documentation)
	 *
	 * @since %VER%
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
	 * This takes the incoming messenger and message type objects, uses them to get the set fields and contexts, then attempts to retreive the templates matching those for this given template pack.
	 *
	 * @since %VER%
	 *
	 * @param EE_messenger      $messenger
	 * @param EE_message_type $message_type
	 *
	 * @return array          Returns an multi-level associative array indexed by template context and field in the format:
	 *                                array( 'context' => array( 'field' => 'value', 'another-field', 'value' ) );
	 */
	protected function _get_templates( EE_Messenger $messenger, EE_message_type $message_type ) {
		$templates = array();

		//first we allow for the $_base_path to be filtered.  However, we assign this to a new variable so that we have the original base_path as a fallback.
		$filtered_base_path = apply_filters( 'FHEE__EE_Template_Pack__get_templates__filtered_base_path', $this->_base_path, $this );

		//we get all the templates for the DEFAULT template pack to have fallbacks in case this template pack does not have templates for this messenger and message type.
		$default_pack = get_class( $this ) !== 'EE_Messages_Template_Pack_Default' ? new EE_Messages_Template_Pack_Default() : null;
		$default_templates = $default_pack instanceof EE_Messages_Template_Pack_Default ? $default_pack->get_templates() : array();

		$fields = $messenger->get_template_fields();
		$contexts = $this->message_type->get_contexts();


		foreach ( $contexts as $context => $details ) {
			foreach ( $fields as $field => $field_details ) {
				if ( empty( $field_details ) )
					continue;
				/**
				 * is this a field array (linked to a main field)?
				 */
				if ( $field == 'extra'  ) {
					foreach ( $field_details as $mainfield => $subfields ) {
						foreach ( $subfields as $subfield => $subfield_details ) {
							//make sure that the template_field_ref matches what the main template field is for this template group.
							$template_field_ref = $subfield == 'main' ? $mainfield : $subfield;
							$templates[$context][$mainfield][$subfield] = $this->_get_specific_template( $default_pack, $messenger, $message_type, $template_field_ref, $context );
						}
					}
				} else {
					$templates[$context][$field] = $this->_get_specific_template( $default_pack, $messenger, $message_type, $field, $context );
				}
			}
		}
		$this->_templates[$messenger->name][$message_type->name] = $templates;
		return $templates;
	}


	/**
	 * Utility method for retrieving a specific template matching the given parameters
	 *
	 * @param mixed (null|EE_Messages_Template_Pack_Default)          $default_pack either the default template pack or null
	 * @param EE_messenger    $messenger
	 * @param EE_message_type $message_type
	 * @param string          $field          The field reference for the specific template being looked up.
	 * @param string          $context      The context reference for the specific template being looked up
	 *
	 * @return string          The template contents.
	 */
	protected function _get_specific_template( $default_pack, EE_messenger $messenger, EE_message_type $message_type, $field, $context ) {
		$master_templates = $this->message_type->get_master_templates();
		$master_templates_mt = isset( $master_templates[$messenger->name] ) ? $master_templates[$messenger->name] : $message_type->name();
		$full_path = $this->_base_path . $messenger->name . '_' . $message_type->name . '_' . $field . '_' . $context . '.template.php';
		$fallback_path = $this->_base_path . $messenger->name . '_' . $message_type->name . '_' . $field . '.template.php';
		$mt_defined_full_path = $this->_base_path . $messenger->name . '_' . $master_templates_mt . '_' . $field . '_' . $context . '.template.php';
		$mt_defined_fallback_path = $this->_base_path . $messenger->name . '_' . $master_templates_mt . '_' . $field . '.template.php';

		/**
		 * Template checks are done heirarchically in the following order:
		 *
		 * - a match for the full messenger name, message type, context and field in the full path for the given template pack.
		 * - a match for the full messenger name, message type, field in the full path for the given template pack.
		 * - a match for the full messenger name, message type, field, context in the path grabbed for the related message type defined in the _master_templates property for the message type (i.e. all registration message types share the same template as the main registration message type).
		 * - match for the full messenger name, message type, field for the related message type.
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
	 * @since %VER%
	 *
	 * @return array
	 */
	public function get_supports() {
		$supports = apply_filters( 'FHEE__' . get_class( $this ) . '__get_supports', $this->_supports );
		return apply_filters( 'FHEE__EE_Messages_Template_Pack__get_supports', $this->_supports, $this );
	}





	/**
	 * This simply returns the _variations property.
	 *
	 * @since %VER%
	 *
	 * @param string $messenger if included then css variations matching the messenger are returned.  Otherwise, all variations for all messengers are returned.
	 * @return array
	 */
	public function get_variations( $messenger = '' ) {
		$variations = ! empty( $messenger ) && isset( $this->_variations[$messenger] ) ? $this->_variations[$messenger] : $this->_variations;
		//filter per template pack and globally.
		$variations = apply_filters( 'FHEE__' . get_class( $this ) . '__get_variations', empty( $variations ) ? array( 'default' => __('Default', 'event_espresso' ) ) : $variations );
		return apply_filters( 'FHEE__EE_Messages_Template_Pack__get_variations', $variations, $this );
	}




	/**
	 * This is typically called by EE_messenger objects to get the specific css variation defined for the messenger and type (i.e. inline, wpeditor, preview etc.)
	 *
	 * @since %VER%
	 *
	 * @param string $messenger messenger slug
	 * @param string $type           variation type (i.e. inline, base, wpeditor, preview etc. //this varies per messenger).
	 * @param string $variation    this should match one of the defined variations in the _variations property on this class.
	 * @param string $file_extension  What type of file the variation file is (defaults to css)
	 * @param bool   $url          if true then return the url otherwise path.
	 *
	 * @return string The variation path or url (typically css reference)
	 */
	public function get_variation( $messenger, $type, $variation, $url = true, $file_extension = 'css' ) {
		$base = $url ? $this->_base_url : $this->_base_path;
		$default_pack = get_class( $this ) !== 'EE_Messages_Template_Pack_Default' ? new EE_Messages_Template_Pack_Default() : null;

		$path_string = 'variations/' . $messenger . '_' . $type . '_' . $variation . '.css';

		//first see if the file exists.
		if ( is_readable( $this->_base_path . $path_string ) ) {
			$variation_path = $base . $path_string;
		} else {
			$variation_path = $default_pack instanceof EE_Messages_Template_Pack_Default ? $default_pack->get_variation( $messenger, $type, $variation, $file_extension, $url ) : '';
		}

		//filter result
		$variation_path = apply_filters( 'FHEE__' . get_class( $this ) . '__get_variation', $variation_path, $messenger, $type, $variation, $file_extension, $url );
		return apply_filters( 'FHEE__EE_Messages_Template_Pack__get_variation', $variation_path, $messenger, $type, $variation, $file_extension, $url, $this );
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
