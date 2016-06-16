<?php

if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * EE_Messages_Validator class
 *
 * This class is the parent class for handling validation of message template fields.
 * Children classes follow a certain naming format
 * (i.e. /email/EE_Messages_Email_Payment_Validator.class.php)
 * and they simply serve the function of defining any special validation rules
 * for the context->field for that messenger/message_type combination when templates are edited.
 *
 * @abstract
 * @package		Event Espresso
 * @subpackage	includes/core/messages/validators/EE_Messages_Validator.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
abstract class EE_Messages_Validator extends EE_Base {



	/**
	 * These properties just hold the name for the Messenger and Message Type (defined by child classes).
	 * These are used for retrieving objects etc.
	 *
*@var string
	 */
	protected $_m_name;
	protected $_mt_name;



	/**
	 * This will hold any error messages from the validation process.
	 *
	 * The _errors property holds an associative array of error messages
	 * listing the field as the key and the message as the value.
	 *
	 * @var array()
	 */
	private $_errors = array();




	/**
	 * holds an array of fields being validated
	 * @var string
	 */
	protected $_fields;



	/**
	 * this will hold the incoming context
	 * @var string
	 */
	protected $_context;




	/**
	 * this holds an array of fields and the relevant validation information
	 * that the incoming fields data get validated against.
	 * This gets setup in the _set_props() method.
	 *
	 * @var array
	 */
	protected $_validators;




	/**
	 * holds the messenger object
	 * @var object
	 */
	protected $_messenger;



	/**
	 * holds the message type object
	 * @var object
	 */
	protected $_message_type;



	/**
	 * will hold any valid_shortcode modifications made by the _modify_validator() method.
	 * @var array
	 */
	protected $_valid_shortcodes_modifier;



	/**
	 * There may be times where a message type wants to include a shortcode group but exclude specific
	 * shortcodes.  If that's the case then it can set this property as an array of shortcodes to exclude and
	 * they will not be allowed.
	 * Array should be indexed by field and values are an array of specific shortcodes to exclude.
	 * @var array
	 */
	protected $_specific_shortcode_excludes = array();



	/**
	 * Runs the validator using the incoming fields array as the fields/values to check.
	 *
	 *
	 * @param array $fields The fields sent by the EEM object.
	 * @param       $context
	 * @throws \EE_Error
	 */
	public function __construct( $fields, $context ) {
		//check that _m_name and _mt_name have been set by child class otherwise we get out.
		if ( empty($this->_m_name ) || empty( $this->_mt_name) )
			throw new EE_Error(
				__(
					'EE_Messages_Validator child classes MUST set the $_m_name and $_mt_name property.  Check that the child class is doing this',
					'event_espresso'
				)
			);
		$this->_fields = $fields;
		$this->_context = $context;

		//load messenger and message_type objects and the related shortcode objects.
		$this->_load_objects();


		//modify any messenger/message_type specific validation instructions.  This is what child classes define.
		$this->_modify_validator();


		//let's set validators property
		$this->_set_validators();
	}



	/**
	 * Child classes instantiate this and use it to modify the _validator_config array property
	 * for the messenger using messengers set_validate_config() method.
	 * This is so we can specify specific validation instructions for a messenger/message_type combo
	 * that aren't handled by the defaults setup in the messenger.
	 *
	 * @abstract
	 * @access protected
	 * @return void
	 */
	abstract protected function _modify_validator();



	/**
	 * loads all objects used by validator
	 *
	 * @access private
	 * @throws \EE_Error
	 */
	private function _load_objects() {
		//load messenger
		$messenger = ucwords( str_replace( '_', ' ', $this->_m_name ) );
		$messenger = str_replace( ' ', '_', $messenger );
		$messenger = 'EE_' . $messenger . '_messenger';

		if ( ! class_exists( $messenger ) ) {
			throw new EE_Error(
				sprintf(
					__( 'There is no messenger class for the given string (%s)', 'event_espresso' ),
					$this->_m_name
				)
			);
		}

		$this->_messenger = new $messenger();

		//load message type
		$message_type = ucwords( str_replace( '_', ' ', $this->_mt_name ) );
		$message_type = str_replace( ' ', '_', $message_type );
		$message_type = 'EE_' . $message_type . '_message_type';

		if ( !class_exists( $message_type ) ) {
			throw new EE_Error(
				sprintf(
					__( 'There is no message type class for the given string (%s)', 'event_espresso' ),
					$this->_mt_name
				)
			);
		}

		$this->_message_type = new $message_type();

	}



	/**
	 * used to set the $_validators property
	 *
	 * @access private
	 * @return void
	 */
	private function _set_validators() {
		// let's get all valid shortcodes from mt and message type
		// (messenger will have its set in the _validator_config property for the messenger)
		$mt_codes = $this->_message_type->get_valid_shortcodes();


		//get messenger validator_config
		$msgr_validator = $this->_messenger->get_validator_config();


		//we only want the valid shortcodes for the given context!
		$context = $this->_context;
		$mt_codes = $mt_codes[$context];

		// in this first loop we're just getting all shortcode group indexes from the msgr_validator
		// into a single array (so we can get the appropriate shortcode objects for the groups)
		$shortcode_groups = $mt_codes;
		$groups_per_field = array();

		foreach ( $msgr_validator as $field => $config ) {
			if ( empty($config) || !isset($config['shortcodes']) )
				continue;  //Nothing to see here.
			$groups_per_field[$field] = array_intersect( $config['shortcodes'], $mt_codes );
			$shortcode_groups = array_merge( $config[ 'shortcodes'], $shortcode_groups );
		}

		$shortcode_groups = array_unique( $shortcode_groups);

		// okay now we've got our groups.
		// Let's get the codes from the objects into an array indexed by group for easy retrieval later.
		$codes_from_objs = array();

		foreach ( $shortcode_groups as $group ) {
			$ref = ucwords( str_replace('_', ' ', $group ) );
			$ref = str_replace( ' ', '_', $ref );
			$classname = 'EE_' . $ref . '_Shortcodes';
			if ( class_exists( $classname ) ) {
				$a = new ReflectionClass( $classname );
				$obj = $a->newInstance();
				$codes_from_objs[$group] = $obj->get_shortcodes();
			}
		}


		//let's just replace the $mt shortcode group indexes with the actual shortcodes (unique)
		$final_mt_codes = array();
		foreach ( $mt_codes as $group ) {
			$final_mt_codes = array_merge( $final_mt_codes, $codes_from_objs[$group] );
		}

		$mt_codes = $final_mt_codes;


		// k now in this next loop we're going to loop through $msgr_validator again
		// and setup the _validators property from the data we've setup so far.
		foreach ( $msgr_validator as $field => $config ) {
			//if required shortcode is not in our list of codes for the given field, then we skip this field.
			$required = isset($config['required'])
				? array_intersect($config['required'], array_keys($mt_codes))
				: true;
			if ( empty($required) )
				continue;

			//If we have an override then we use it to indicate the codes we want.
			if ( isset( $this->_valid_shortcodes_modifier[$context][$field] ) ) {
				$this->_validators[ $field ][ 'shortcodes' ] = $this->_reassemble_valid_shortcodes_from_group(
					$this->_valid_shortcodes_modifier[ $context ][ $field ],
					$codes_from_objs
				);
			}

			//if we have specific shortcodes for a field then we need to use them
			else if ( isset( $groups_per_field[$field] ) ) {
				$this->_validators[ $field ][ 'shortcodes' ] = $this->_reassemble_valid_shortcodes_from_group(
					$groups_per_field[ $field ],
					$codes_from_objs
				);
			}

			//if empty config then we're assuming we're just going to use the shortcodes from the message type context
			else if ( empty( $config ) ) {
				$this->_validators[$field]['shortcodes'] = $mt_codes;
			}

			//if we have specific shortcodes then we need to use them
			else if ( isset($config['specific_shortcodes'] ) ) {
				$this->_validators[$field]['shortcodes'] = $config['specific_shortcodes'];
			}

			//otherwise the shortcodes are what is set by the messenger for that field
			else {
				foreach ( $config['shortcodes'] as $group ) {
					$this->_validators[$field]['shortcodes'] = isset($this->_validators[$field]['shortcodes'])
						? array_merge( $this->_validators[$field]['shortcodes'], $codes_from_objs[$group] )
						: $codes_from_objs[$group];
				}
			}

			//now let's just make sure that any excluded specific shortcodes are removed.
			$specific_excludes = $this->get_specific_shortcode_excludes();
			if ( isset( $specific_excludes[$field] ) ) {
				foreach( $specific_excludes[$field] as $sex ) {
					if ( isset( $this->_validators[$field]['shortcodes'][$sex] ) )
						unset( $this->_validators[$field]['shortcodes'][$sex] );
				}
			}

			//hey! don't forget to include the type if present!
			$this->_validators[$field]['type'] = isset( $config['type'] ) ? $config['type'] : NULL;
		}
	}


	/**
	 * This just returns the validators property that contains information
	 * about the various shortcodes and their availability with each field
	 *
	 *
	 * @return array
	 */
	public function get_validators() {
		return $this->_validators;
	}



	/**
	 * This simply returns the specific shortcode_excludes property that is set.
	 *
	 * @since 4.5.0
	 *
	 * @return array
	 */
	public function get_specific_shortcode_excludes() {
		//specific validator filter
		$shortcode_excludes = apply_filters(
			'FHEE__' . get_class( $this ) . '__get_specific_shortcode_excludes;',
			$this->_specific_shortcode_excludes,
			$this->_context
		);
		//global filter
		return apply_filters(
			'FHEE__EE_Messages_Validator__get_specific_shortcode_excludes',
			$shortcode_excludes,
			$this->_context,
			$this
		);
	}



	/**
	 * This is the main method that handles validation
	 *
	 * What it does is loop through the _fields (the ones that get validated)
	 * and checks them against the shortcodes array for the field and the 'type' indicated by the
	 *
	 * @access public
	 * @return mixed (bool|array)  if errors present we return the array otherwise true
	 */
	public function validate() {
		//some defaults
		$template_fields = $this->_messenger->get_template_fields();
		//loop through the fields and check!
		foreach ( $this->_fields as $field => $value ) {
			$this->_errors[$field] = array();
			$err_msg = '';
			$field_label = '';
			//if field is not present in the _validators array then we continue
			if ( !isset( $this->_validators[$field] ) ) {
				unset( $this->_errors[$field] );
				continue;
			}

			//get the translated field label!
			//first check if it's in the main fields list
			if ( isset( $template_fields[$field] ) ) {
				if ( empty( $template_fields[$field] ) )
					$field_label = $field; //most likely the field is found in the 'extra' array.
				else
					$field_label = $template_fields[$field]['label'];
			}

			// if field label is empty OR is equal to the current field
			// then we need to loop through the 'extra' fields in the template_fields config (if present)
			if ( isset( $template_fields['extra'] ) && ( empty($field_label) ) || $field_label == $field ) {
				foreach( $template_fields['extra'] as $main_field => $secondary_field ) {
					foreach ( $secondary_field as $name => $values ) {
						if ( $name == $field ) {
							$field_label = $values['label'];
						}

						// if we've got a 'main' secondary field, let's see if that matches what field we're on
						// which means it contains the label for this field.
						if ( $name == 'main' && $main_field == $field_label )
							$field_label = $values['label'];
					}
				}
			}

			//field is present. Let's validate shortcodes first (but only if shortcodes present).
			if (
				isset( $this->_validators[ $field ][ 'shortcodes' ] )
				&& ! empty( $this->_validators[ $field ][ 'shortcodes' ] )
			) {
				$invalid_shortcodes = $this->_invalid_shortcodes( $value, $this->_validators[$field]['shortcodes'] );
				// if true then that means there is a returned error message
				// that we'll need to add to the _errors array for this field.
				if ( $invalid_shortcodes ) {
					$v_s = array_keys($this->_validators[$field]['shortcodes']);
					$err_msg = sprintf(
						__(
							'%3$sThe following shortcodes were found in the "%1$s" field that ARE not valid: %2$s%4$s',
							'event_espresso'
						),
						'<strong>' . $field_label . '</strong>',
						$invalid_shortcodes,
						'<p>',
						'</p >'
					);
					$err_msg .= sprintf(
						__( '%2$sValid shortcodes for this field are: %1$s%3$s', 'event_espresso' ),
						implode( ', ', $v_s ),
						'<strong>',
						'</strong>'
					);
				}
			}

			//if there's a "type" to be validated then let's do that too.
			if ( isset( $this->_validators[$field]['type'] ) && !empty( $this->_validators[$field]['type'] ) ) {
				switch ( $this->_validators[$field]['type'] ) {
					case 'number' :
						if ( !is_numeric($value) )
							$err_msg .= sprintf(
								__(
									'%3$sThe %1$s field is supposed to be a number. The value given (%2$s)  is not.  Please double-check and make sure the field contains a number%4$s',
									'event_espresso'
								),
								$field_label,
								$value,
								'<p>',
								'</p >'
							);
						break;
					case 'email' :
						$valid_email = $this->_validate_email($value);
						if ( !$valid_email )
							$err_msg .= htmlentities(
								sprintf(
									__(
										'The %1$s field has at least one string that is not a valid email address record.  Valid emails are in the format: "Name <email@something.com>" or "email@something.com" and multiple emails can be separated by a comma.'
									),
									$field_label

								)
							);
						break;
					default :
						break;
				}
			}

			//if $err_msg isn't empty let's setup the _errors array for this field.
			if ( !empty($err_msg ) ) {
				$this->_errors[$field]['msg'] = $err_msg;
			} else {
				unset( $this->_errors[$field] );
			}
		}

		// if we have ANY errors, then we want to make sure we return the values
		// for ALL the fields so the user doesn't have to retype them all.
		if ( !empty( $this->_errors ) ) {
			foreach ( $this->_fields as $field => $value ) {
				$this->_errors[$field]['value'] = stripslashes($value);
			}
		}

		//return any errors or just TRUE if everything validates
		return empty( $this->_errors ) ? TRUE : $this->_errors;
	}



	/**
	 * Reassembles and returns an array of valid shortcodes
	 * given the array of groups and array of shortcodes indexed by group.
	 *
	 * @param  array $groups          array of shortcode groups that we want shortcodes for
	 * @param  array $codes_from_objs All the codes available.
	 * @return array                   an array of actual shortcodes (that will be used for validation).
	 */
	private function _reassemble_valid_shortcodes_from_group( $groups, $codes_from_objs ) {
		$shortcodes = array();
		foreach ( $groups as $group ) {
			$shortcodes = array_merge( $shortcodes, $codes_from_objs[$group] );
		}
		return $shortcodes;
	}



	/**
	 * Validates a string against a list of accepted shortcodes
	 *
	 * This function takes in an array of shortcodes
	 * and makes sure that the given string ONLY contains shortcodes in that array.
	 *
	 * @param  string $value            string to evaluate
	 * @param  array  $valid_shortcodes array of shortcodes that are acceptable.
	 * @return mixed (bool|string)  return either a list of invalid shortcodes OR false if the shortcodes validate.
	 */
	protected function _invalid_shortcodes($value, $valid_shortcodes) {
		//first we need to go through the string and get the shortcodes in the string
		preg_match_all( '/(\[.+?\])/', $value, $matches );
		$incoming_shortcodes = (array) $matches[0];

		//get a diff of the shortcodes in the string vs the valid shortcodes
		$diff = array_diff( $incoming_shortcodes, array_keys($valid_shortcodes) );

		//we need to account for custom codes so let's loop through the diff and remove any of those type of codes
		foreach ( $diff as $ind => $code ) {
			if ( preg_match('/(\[[A-Za-z0-9\_]+_\*)/', $code ) ) {
				//strip the shortcode so we just have the BASE string (i.e. [ANSWER_*] )
				$dynamic_sc = preg_replace('/(_\*+.+)/', '_*]', $code);
				//does this exist in the $valid_shortcodes?  If so then unset.
				if ( isset( $valid_shortcodes[$dynamic_sc] ) ) {
					unset( $diff[$ind] );
				}
			}
		}

		if ( empty( $diff ) ) return FALSE; //there is no diff, we have no invalid shortcodes, so return

		//made it here? then let's assemble the error message
		$invalid_shortcodes = implode( '</strong>,<strong>', $diff );
		$invalid_shortcodes = '<strong>' . $invalid_shortcodes . '</strong>';
		return $invalid_shortcodes;
	}




	/**
	 * Validates an incoming string and makes sure we have valid emails in the string.
	 * @param  string $value incoming value to validate
	 * @return bool        true if the string validates, false if it doesn't
	 */
	protected function _validate_email( $value ) {
		$validate = TRUE;
		$or_val = $value;

		// empty strings will validate because this is how a message template
		// for a particular context can be "turned off" (if there is no email then no message)
		if ( empty( $value ) )
			return $validate;

		// first determine if there ARE any shortcodes.
		// If there are shortcodes and then later we find that there were no other valid emails
		// but the field isn't empty...
		// that means we've got extra commas that were left after stripping out shortcodes so probably still valid.
		$has_shortcodes = preg_match('/(\[.+?\])/', $value);

		//first we need to strip out all the shortcodes!
		$value = preg_replace('/(\[.+?\])/', '', $value);

		// if original value is not empty and new value is, then we've parsed out a shortcode
		// and we now have an empty string which DOES validate.
		// We also validate complete empty field for email because
		// its possible that this message is being "turned off" for a particular context


		if ( !empty($or_val) && empty($value) )
			return $validate;

		//trim any commas from beginning and end of string ( after whitespace trimmed );
		$value = trim( trim($value), ',' );


		//next we need to split up the string if its comma delimited.
		$emails = explode(',', $value);
		$empty = FALSE; //used to indicate that there is an empty comma.
		//now let's loop through the emails and do our checks
		foreach ( $emails as $email ) {
			if ( empty($email) ) {
				$empty = TRUE;
				continue;
			}

			//trim whitespace
			$email = trim($email);
			//either its of type "bob@whatever.com", or its of type "fname lname <few@few.few>"
			if(is_email($email)){
				continue;
			}else{
				$matches = array();
				$validate = preg_match( '/(.*)<(.+)>/', $email, $matches ) ? TRUE : FALSE;
				if( $validate && is_email($matches[2])){
					continue;
				}else{
					return false;
				}
			}
		}

		$validate = $empty && !$has_shortcodes ? FALSE : $validate;

		return $validate;

	}




	/**
	 * Magic getter
	 * Using this to provide back compat with add-ons referencing deprecated properties.
	 * @param string $property  Property being requested
	 * @throws Exception
	 * @return mixed
	 */
	public function __get( $property ) {
		$expected_properties_map = array(
			/**
			 * @deprecated 4.9.0
			 */
			'_MSGR' => '_messenger',
			/**
			 * @deprecated 4.9.0
			 */
			'_MSGTYP' => '_message_type'
		);

		if ( isset( $expected_properties_map[ $property ] ) ) {
			return $this->{$expected_properties_map[ $property ]};
		}

		throw new Exception(
			sprintf(
				__( 'The property %1$s being requested on %2$s does not exist', 'event_espresso' ),
				$property,
				get_class( $this )
			)
		);
	}

}
