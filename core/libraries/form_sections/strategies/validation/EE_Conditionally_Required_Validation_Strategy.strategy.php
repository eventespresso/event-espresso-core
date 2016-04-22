<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Conditionally_Required_Validation_Strategy
 * For having inputs' requirement depend on the value of another input in the form
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Mike Nelson
 * @since 				4.6
 *
 */
class EE_Conditionally_Required_Validation_Strategy extends EE_Validation_Strategy_Base{

	/**
	 * Array describing conditions necessary to make the input required.
	 * This is used to derive a jquery dependency expression (see http://jqueryvalidation.org/required-method)
	 * or jquery callback; and server-side logic to determine if the field is necessary.
	 * @var array
	 */
	protected $requirement_conditions;



	/**
	 * @param string $validation_error_message
	 * @param array $requirement_conditions
	 */
	public function __construct( $validation_error_message = null, $requirement_conditions = array() ) {
		if( ! $validation_error_message ){
			$validation_error_message = __("This field is required.", "event_espresso");
		}
		$this->set_requirement_conditions( $requirement_conditions );
		parent::__construct( $validation_error_message );
	}



	/**
	 * just checks the field isn't blank, provided the requirement conditions
	 * indicate this input is still required
	 *
	 * @param $normalized_value
	 * @return bool
	 * @throws \EE_Error
	 * @throws \EE_Validation_Error
	 */
	public function validate($normalized_value) {
		if(
			(
				$normalized_value === ''
				|| $normalized_value === null
				|| $normalized_value === array()
			)
			&& $this->_input_is_required_server_side()
		) {
			throw new EE_Validation_Error( $this->get_validation_error_message(), 'required');
		}else{
			return true;
		}
	}



	/**
	 * @return array
	 * @throws \EE_Error
	 */
	public function get_jquery_validation_rule_array(){
		return array(
			'required'=> $this->_get_jquery_requirement_value(),
			'messages' => array(
				'required' => $this->get_validation_error_message()
			)
		);
	}

	/**
	 * Sets the "required conditions". This should be an array, its top-level key
	 * is the name of a field, its value is an array. This 2nd level array has two items:
	 * the first is the operator (for now only '=' is accepted), and teh 2nd argument is the
	 * the value the field should be in order to make the field required.
	 * Eg array( 'payment_type' => array( '=', 'credit_card' ).
	 *
	 * @param array $requirement_conditions
	 */
	public function set_requirement_conditions( $requirement_conditions ) {
		$this->requirement_conditions = (array) $requirement_conditions;
	}

	/**
	 * Gets the array that describes when the related input should be required.
	 * see set_requirement_conditions for a description of how it should be formatted
	 * @return array
	 */
	public function get_requirement_conditions() {
		return $this->requirement_conditions;
	}



	/**
	 * gets jQuery dependency expression used for client-side validation
	 * Its possible this could also return a javascript callback used for determining
	 * if the input is required or not. That is not yet implemented, however.
	 *
	 * @return string see http://jqueryvalidation.org/required-method for format
	 * @throws \EE_Error
	 */
	protected function _get_jquery_requirement_value() {
		$requirement_value = '';
		$conditions = $this->get_requirement_conditions();
		if( ! is_array( $conditions ) ){
			EE_Error::throw_exception_if_debugging(
				sprintf(
					__( 'Input requirement conditions must be an array. You provided %1$s', 'event_espresso' ),
					$this->_input->name()
				),
				__FILE__,
				__FUNCTION__,
				__LINE__
			);
			return true;
		}
		if( count( $conditions ) > 1 ) {
			EE_Error::throw_exception_if_debugging(
				sprintf(
					__( 'Required Validation Strategy does not yet support multiple conditions. You should add it! The related input is %1$s', 'event_espresso' ),
					$this->_input->name()
				),
				__FILE__,
				__FUNCTION__,
				__LINE__
			);
		}
		foreach( $conditions as $input_path => $op_and_value ) {
			$input = $this->_input->find_section_from_path( $input_path );
			if( ! $input instanceof EE_Form_Input_Base ) {
				EE_Error::throw_exception_if_debugging(
					sprintf(
						__( 'Error encountered while setting requirement condition for input %1$s. The path %2$s does not correspond to a valid input'),
						$this->_input->name(),
						$input_path
					),
					__FILE__,
					__FUNCTION__,
					__LINE__
				);
				return false;
			}
			list( $op, $value ) = $this->_validate_op_and_value( $op_and_value );
			//ok now the jquery dependency expression depends on the input's display strategy.
			if( ! $input->get_display_strategy() instanceof EE_Select_Display_Strategy ) {
				EE_Error::throw_exception_if_debugging(
					sprintf(
						__( 'Required Validation Strategy can only depend on another input which uses the EE_Select_Display_Strategy, but you specified a field "%1$s" that uses display strategy "%2$s". If you need others, please add support for it! The related input is %3$s', 'event_espresso' ),
						$input->name(),
						get_class( $input->get_display_strategy() ),
						$this->_input->name()
					),
					__FILE__,
					__FUNCTION__,
					__LINE__
				);
			}
			$requirement_value = $input->html_id( true ) . ' option[value="' . $value . '"]:selected';
		}
		return $requirement_value;
	}



	/**
	 * Returns whether or not this input is required based on the _requirement_conditions
	 * (not whether or not the input passes validation. That's for the validate method
	 * to decide)
	 *
	 * @return boolean
	 * @throws \EE_Error
	 */
	protected function _input_is_required_server_side() {
		$meets_all_requirements = true;
		$conditions = $this->get_requirement_conditions();
		foreach( $conditions as $input_path => $op_and_value ) {
			$input = $this->_input->find_section_from_path( $input_path );
			if( ! $input instanceof EE_Form_Input_Base ) {
				EE_Error::throw_exception_if_debugging(
					sprintf(
						__( 'Error encountered while setting requirement condition for input %1$s. The path %2$s does not correspond to a valid input'),
						$this->_input->name(),
						$input_path
					),
					__FILE__,
					__FUNCTION__,
					__LINE__
				);
				return false;
			}
			list( $op, $value ) = $this->_validate_op_and_value( $op_and_value );
			switch( $op ) {
				case '=':
				default:
					$meets_all_requirements = $input->normalized_value() === $value;
			}
			if( ! $meets_all_requirements ) {
				break;
			}
		}
		return $meets_all_requirements;
	}



	/**
	 * Verifies this is an array with keys 0 and 1, where key 0 is a usable
	 * operator (initially just '=') and key 1 is something that can be cast to a string
	 *
	 * @param array $op_and_value
	 * @return array
	 * @throws \EE_Error
	 */
	protected function _validate_op_and_value( $op_and_value ) {
		if( ! isset( $op_and_value[ 0 ], $op_and_value[ 1 ] ) ) {
				EE_Error::throw_exception_if_debugging(
					sprintf(
						__( 'Required Validation Strategy conditions array\'s value must be an array with two elements: an operator, and a value. It didn\'t. The related input is %1$s', 'event_espresso' ),
						$this->_input->name()
					),
					__FILE__,
					__FUNCTION__,
					__LINE__
				);
			}
			$operator = $op_and_value[ 0 ];
			$value = (string) $op_and_value[ 1 ];
			if( $operator !== '=' ) {
				EE_Error::throw_exception_if_debugging(
					sprintf(
						__( 'Required Validation Strategy conditions can currently only use the equals operator. If you need others, please add support for it! The related input is %1$s', 'event_espresso' ),
						$this->_input->name()
					),
					__FILE__,
					__FUNCTION__,
					__LINE__
				);
			}
			return array( $operator, $value );

	}
}
