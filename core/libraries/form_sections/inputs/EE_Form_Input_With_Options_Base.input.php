<?php if (!defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE_Form_Input_With_Options_Base
 *
 * For form inputs which are meant to only have a limit set of options that can be used
 * (like for checkboxes or select dropdowns, etc; as opposed to more open-ended text boxes etc)
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson, Brent Christensen
 */
class EE_Form_Input_With_Options_Base extends EE_Form_Input_Base{

	/**
	 * array of available options to choose as an answer
	 * @var array
	 */
	protected $_options = array();


	/**
	 * whether to display an question option description as part of the input label
	 * @var boolean
	 */
	protected $_use_desc_in_label = TRUE;

	/**
	 * strlen() result for the longest input value (what gets displayed in the label)
	 * this is used to apply a css class to the input label
	 * @var int
	 */
	protected $_label_size = 0;

	/**
	 * whether to enforce the label size value passed in the constructor
	 * @var boolean
	 */
	protected $_enforce_label_size = FALSE;

	/**
	 * whether to allow multiple selections (ie, the value of this input should be an array)
	 * or not (ie, the value should be a simple int, string, etc)
	 * @var boolean
	 */
	protected $_multiple_selections = FALSE;



	/**
	 * @param array $answer_options
	 * @param array $input_settings
	 */
	public function __construct( $answer_options = array(), $input_settings = array() ) {
		if ( isset( $input_settings['label_size'] )) {
			$this->_set_label_size( $input_settings['label_size'] );
			if ( isset( $input_settings['enforce_label_size'] ) && $input_settings['enforce_label_size'] ) {
				$this->_enforce_label_size = TRUE;
			}
		}
		$this->set_select_options( $answer_options );
		parent::__construct( $input_settings );
	}



	/**
	 * Sets the allowed options for this input. Also has the side-effect of
	 * updating the normalization strategy to match the keys provided in the array
	 * @param array $answer_options
	 * @return void  just has the side-effect of setting the options for this input
	 */
	public function set_select_options( $answer_options = array() ){
		$answer_options = is_array( $answer_options ) ? $answer_options : array( $answer_options );
		//get the first item in the select options and check it's type
		if ( reset( $answer_options ) instanceof EE_Question_Option ) {
			$this->_options = $this->_process_question_options( $answer_options );
		} else {
			$this->_options = $this->_flatten_select_options( $answer_options );
		}
		//d( $this->_options );
		$select_option_keys = array_keys( $this->_options );
		// grab key from first element of values
		$first_key = reset( $select_option_keys );
		// attempt to determine data type for values in order to set normalization type
		if ( count( $this->_options ) == 2 && in_array( TRUE, $select_option_keys ) && in_array( FALSE, $select_option_keys )){
			// values appear to be boolean, like TRUE, FALSE, 1, 0
			$normalization = new EE_Boolean_Normalization();
		} elseif ( is_int( $first_key )){
			$normalization = new EE_Int_Normalization();
		} else {
			$normalization = new EE_Text_Normalization();
		}
		// does input type have multiple options ?
		if ( $this->_multiple_selections ) {
			$this->_set_normalization_strategy( new EE_Many_Valued_Normalization( $normalization ));
		} else {
			$this->_set_normalization_strategy( $normalization );
		}
	}



	/**
	 * @return array
	 */
	public function options(){
		return $this->_options;
	}



	/**
	 * Returns an array which is guaranteed to not be multidimensional
	 * @return array
	 */
	public function flat_options(){
		return $this->_flatten_select_options($this->options());
	}



	/**
	 * Makes sure $arr is a flat array, not a multidimensional one
	 * @param array $arr
	 * @return array
	 */
	protected function _flatten_select_options( $arr ){
		$flat_array = array();
		EE_Registry::instance()->load_helper('Array');
		if ( EEH_Array::is_multi_dimensional_array( $arr )) {
			foreach( $arr as $sub_array ){
				foreach( $sub_array as $key => $value ) {
					$flat_array[ $key ] = $value;
					$this->_set_label_size( $value );
				}
			}
		} else {
			foreach( $arr as $key => $value ) {
				$flat_array[ $key ] = $value;
				$this->_set_label_size( $value );
			}
		}
		return $flat_array;
	}



	/**
	 * @param EE_Question_Option[] $question_options_array
	 * @return array
	 */
	protected function _process_question_options( $question_options_array = array() ) {
		$flat_array = array();
		foreach( $question_options_array as $question_option ) {
			if ( $question_option instanceof EE_Question_Option ) {
				$value = $this->_use_desc_in_label ? $question_option->value() . '<span class="ee-question-option-desc"> - ' . $question_option->desc() . '</span>' : $question_option->value();
				$flat_array[ $question_option->value() ] = $value;
				// calculate the strlen of the label, note that "123456" is just used as a spacer and does not appear in any output
				$this->_use_desc_in_label ? $this->_set_label_size( $question_option->value() . '123456' . $question_option->desc() ) : $this->_set_label_size( $value );
			} elseif ( is_array( $question_option )) {
				$non_question_option = $this->_flatten_select_options( $question_option );
				$flat_array = $flat_array + $non_question_option;
			}
		}
		return $flat_array;
	}



	/**
	 *    _set_label_size_class
	 * @param int|string $value
	 * @return void
	 */
	private function _set_label_size( $value = '' ){
		// did the input settings specifically say to NOT set the label size dynamically ?
		if ( ! $this->_enforce_label_size ) {
			// determine length of option value
			$val_size = is_int( $value ) ? $value : strlen( $value );
			// use new value if bigger than existing
			$this->_label_size = $val_size > $this->_label_size ? $val_size : $this->_label_size;
		}
	}



	/**
	 * 	get_label_size_class
	 * @return string
	 */
	function get_label_size_class(){
		// use maximum option value length to determine label size
		switch( $this->_label_size ){
			case $this->_label_size < 3 :
				$size =  ' nano-lbl';
				break;
			case $this->_label_size < 6 :
				$size =  ' micro-lbl';
				break;
			case $this->_label_size < 12 :
				$size =  ' tiny-lbl';
				break;
			case $this->_label_size < 25 :
				$size =  ' small-lbl';
				break;
			case $this->_label_size < 50 :
				$size =  ' medium-lbl';
				break;
			case $this->_label_size >= 100 :
				$size =  ' big-lbl';
				break;
			default:
				$size =  ' medium-lbl';
				break;
		}
		return $size;
	}



}
// End of file EE_Form_Input_With_Options_Base.input.php