<?php if (!defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 *
 * Class EE_Form_Input_Base
 *
 * For representing a single form input. Extends EE_Form_Section_Base because
 * it is a part of a form and shares a surprisingly large amount of functionality
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Mike Nelson
 * @since 				$VID:$
 *
 */
abstract class EE_Form_Input_Base extends EE_Form_Section_Validatable{

	/**
	 * the input's name attribute
	 * @var string
	 */
	protected $_html_name;
	/**
	 * id for the html label tag
	 * @var string
	 */
	protected $_html_label_id;
	/**
	 * class for teh html label tag
	 * @var string
	 */
	protected $_html_label_class;
	/**
	 * style for teh html label tag
	 * @var string
	 */
	protected $_html_label_style;
	/**
	 * text to be placed in the html label
	 * @var string
	 */
	protected $_html_label_text;
	/**
	 * the full html label. If used, all other html_label_* properties are invalid
	 * @var string
	 */
	protected $_html_label;
	/**
	 * HTML to use for help text (normally placed below form input), in a span which normally
	 * has a class of 'description'
	 * @var string
	 */
	protected $_html_help_text;
	/**
	 * CSS classes for displaying the help span
	 * @var string
	 */
	protected $_html_help_class = 'description';
	/**
	 * CSS to put in the style attribute on the help span
	 * @var string
	 */
	protected $_html_help_style;

	/**
	 * Stores whether or not this input's response is required.
	 * Because certain styling elements may also want to know that this
	 * input is required etc.
	 * @var boolean
	 */
	protected $_required;

	/**
	 * css class added to required inputs
	 * @var string
	 */
	protected $_required_css_class = 'ee-required';

	/**
	 * css styles applied to button type inputs
	 * @var string
	 */
	protected $_button_css_attributes;

	/**
	 * The raw data submitted for this, like in the $_POST super global.
	 * Generally unsafe for usage in client code
	 * @var mixed string or array
	 */
	protected $_raw_value;

	/**
	 * Value normalized according to the input's normalization strategy.
	 * The normalization strategy dictates whether this is a string, int, float,
	 * boolean, or array of any of those.
	 * @var mixed
	 */
	protected $_normalized_value;

	/**
	 * Strategy used for displaying this field.
	 * Child classes must use _get_display_strategy to access it.
	 * @var EE_Display_Strategy_Base
	 */
	private $_display_strategy;

	/**
	 * Gets all the validation strategies used on this field
	 * @var EE_Validation_Strategy_Base[]
	 */
	private $_validation_strategies;

	/**
	 * The normalization strategy for this field
	 * @var EE_Normalization_Strategy_Base
	 */
	private $_normalization_strategy;

	/**
	 * Strategy for removing sensitive data after we're done with the form input
	 * @var EE_Sensitive_Data_Removal_Base
	 */
	protected $_sensitive_data_removal_strategy;



	/**
	 * @param array $input_args {
	 *		@type string $html_name the html name for the input
	 *		@type string $html_label_id the id attribute to give to the html label tag
	 *		@type string $html_label_class the class attribute to give to the html label tag
	 *		@type string $html_label_style the style attribute to give ot teh label tag
	 *		@type string $html_label_text the text to put in the label tag
	 *		@type string $html_label the full html label. If used, all other html_label_* args are invalid
	 *		@type string $html_help_text text to put in help element
	 *		@type string $html_help_style style attribute to give to teh help element
	 *		@type string $html_help_class class attribute to give to the help element
	 *		@type string $default default value NORMALIZED (eg, if providing the default for a Yes_No_Input, you should provide TRUE or FALSE, not '1' or '0')
	 *		@type EE_Display_Strategy_Base $display strategy
	 *		@type EE_Normalization_Strategy_Base $normalization_strategy
	 *		@type EE_Validation_Strategy_Base[] $validation_strategies
	 * }
	 */
	public function __construct( $input_args = array() ){
		// the following properties must be cast as arrays
		$set_as_array = array(
			'display_strategy',
			'normalization_strategy',
			'sensitive_data_removal_strategy',
			'validation_strategies'
		);
		// loop thru incoming options
		foreach( $input_args as $key => $value ) {
			// add underscore to $key to match property names
			$_key = '_' . $key;
			if ( property_exists( $this, $_key )) {
				// first check if this property needs to be set as an array
				if ( isset( $set_as_array[ $key ] )) {
					// ensure value is an array
					$value = is_array( $value ) ? $value : array( $value );
					// and merge with existing values
					$this->$_key = array_merge( $this->$_key, $value );
				} else {
					$this->$_key = $value;
				}
			}
		}
		// ensure that "required" is set correctly
		switch( $this->_required ) {
			case 1 :
			case 'true' :
			case 'TRUE' :
			case TRUE :
				$this->set_required( TRUE );
				break;
			default :
				$this->set_required( FALSE );
		}

		$this->_html_name_specified = isset( $input_args['html_name'] ) ? TRUE : FALSE;

		$this->_display_strategy->_construct_finalize($this);

		if ( $this->_validation_strategies ){
			foreach( $this->_validation_strategies as $validation_strategy ){
				$validation_strategy->_construct_finalize($this);
			}
		}

		if( ! $this->_normalization_strategy){
			$this->_normalization_strategy = new EE_Text_Normalization();
		}
		$this->_normalization_strategy->_construct_finalize($this);

		//at least we can use the normalization strategy to populate the default
		if( isset( $input_args[ 'default' ] ) ) {
			$this->set_default( $input_args[ 'default' ] );
		}

		if( ! $this->_sensitive_data_removal_strategy){
			$this->_sensitive_data_removal_strategy = new EE_No_Sensitive_Data_Removal();
		}
		$this->_sensitive_data_removal_strategy->_construct_finalize($this);
		parent::__construct( $input_args );
	}

	/**
	 * Sets the html_name to its default value, if none was specified in teh constructor.
	 * Calculation involves using the name and the parent's html_name
	 */
	protected function _set_default_html_name_if_empty(){
		if( ! $this->_html_name){
			if( $this->_parent_section && $this->_parent_section instanceof EE_Form_Section_Proper){
				$this->_html_name = $this->_parent_section->html_name_prefix() . "[{$this->name()}]";
			}else{
				$this->_html_name = $this->name();
			}
		}
	}



	/**
	 * @param $parent_form_section
	 * @param $name
	 */
	function _construct_finalize($parent_form_section, $name) {
		parent::_construct_finalize($parent_form_section, $name);
		$this->_set_default_html_name_if_empty();
		if( ! $this->_html_label ){
			if( ! $this->_html_label_text){
				$this->_html_label_text = ucwords( str_replace("_"," ",$name));
			}
		}
	}

	 /**
	  * Returns the strategy for displaying this form input. If none is set, throws an exception.
	  * @return EE_Display_Strategy_Base
	  * @throws EE_Error
	  */
	protected function _get_display_strategy(){
		if( ! $this->_display_strategy || ! $this->_display_strategy instanceof EE_Display_Strategy_Base){
			throw new EE_Error(sprintf(__("Cannot get display strategy for form input with name %s and id %s, because it has not been set in the constructor", "event_espresso"),$this->html_name(),$this->html_id()));
		}else{
			return $this->_display_strategy;
		}
	}
	/**
	 * Sets the display strategy.
	 * @param EE_Display_Strategy_Base $strategy
	 */
	protected function _set_display_strategy(EE_Display_Strategy_Base $strategy){
		$this->_display_strategy = $strategy;
	}

	/**
	 * Sets the sanitization strategy
	 * @param EE_Normalization_Strategy_Base $strategy
	 */
	protected function _set_normalization_strategy(EE_Normalization_Strategy_Base $strategy){
		$this->_normalization_strategy = $strategy;
	}

	/**
	 * Gets sensitive_data_removal_strategy
	 * @return EE_Sensitive_Data_Removal_Base
	 */
	public function get_sensitive_data_removal_strategy() {
		return $this->_sensitive_data_removal_strategy;
	}

	/**
	 * Sets sensitive_data_removal_strategy
	 * @param EE_Sensitive_Data_Removal_Base $sensitive_data_removal_strategy
	 * @return boolean
	 */
	public function set_sensitive_data_removal_strategy($sensitive_data_removal_strategy) {
		$this->_sensitive_data_removal_strategy = $sensitive_data_removal_strategy;
	}


	/**
	 * Gets the display strategy for this input
	 * @return EE_Display_Strategy_Base
	 */
	public function get_display_strategy(){
		return $this->_display_strategy;
	}
	/**
	 * Overwrites the display strategy
	 * @param EE_Display_Strategy_Base $display_strategy
	 */
	public function set_display_strategy($display_strategy){
		$this->_display_strategy = $display_strategy;
		$this->_display_strategy->_construct_finalize($this);
	}
	/**
	 * Gets the normalization strategy set on this input
	 * @return EE_Normalization_Strategy_Base
	 */
	public function get_normalization_strategy(){
		return $this->_normalization_strategy;
	}
	/**
	 * Overwrites the normalization strategy
	 * @param EE_Normalization_Strategy_Base $normalization_strategy
	 */
	public function set_normalization_strategy($normalization_strategy){
		$this->_normalization_strategy = $normalization_strategy;
		$this->_normalization_strategy->_construct_finalize($this);
	}

	/**
	 * Returns all teh validation strategies which apply to this field, numerically indexed
	 * @return EE_Validation_Strategy_Base[]
	 */
	public function get_validation_strategies(){
		if(is_array($this->_validation_strategies)){
			return $this->_validation_strategies;
		}else{
			return array();
		}

	}
	/**
	 * Adds this strategy to the field so it will be used in both JS validation and server-side validation
	 * @param EE_Validation_Strategy_Base $validation_strategy
	 * @return void
	 */
	protected function _add_validation_strategy( EE_Validation_Strategy_Base $validation_strategy ){
		$this->_validation_strategies[ get_class($validation_strategy) ] = $validation_strategy;
	}
	/**
	 * Gets the HTML, JS, and CSS necessary to display this field according
	 * to the parent form's layout strategy
	 * @return string
	 */
	public function get_html_and_js(){
		return $this->_parent_section->get_html_for_input($this);
	}
	/**
	 * Gets the HTML for the input itself (no label or errors) according to the
	 * input's display strategy
	 * Makes sure the JS and CSS are enqueued for it
	 * @return string
	 */
	public function get_html_for_input(){
		return  $this->_get_display_strategy()->display();
	}
	/**
	 * Gets the HTML for displaying the label for this form input
	 * according to the form section's layout strategy
	 * @return string
	 */
	public function get_html_for_label(){
		return $this->_parent_section->get_layout_strategy()->display_label($this);
	}
	/**
	 * Gets the HTML for displaying the errors section for this form input
	 * according to the form section's layout strategy
	 * @return string
	 */
	public function get_html_for_errors(){
		return $this->_parent_section->get_layout_strategy()->display_errors($this);
	}
	/**
	 * Gets the HTML for displaying the help text for this form input
	 * according to the form section's layout strategy
	 * @return string
	 */
	public function get_html_for_help(){
		return $this->_parent_section->get_layout_strategy()->display_help_text($this);
	}
	/**
	 * Validates the input's sanitized value (assumes _sanitize() has already been called)
	 * and returns whether or not the form input's submitted value is value
	 * @return boolean
	 */
	protected function _validate() {
		if(is_array($this->_validation_strategies)){
			foreach($this->_validation_strategies as $validation_strategy){
				if ( $validation_strategy instanceof EE_Validation_Strategy_Base ) {
					try{
						$validation_strategy->validate($this->normalized_value());
					}catch(EE_Validation_Error $e){
						$this->add_validation_error($e);
					}
				}
			}
		}
		if( $this->get_validation_errors()){
			return false;
		}else{
			return true;
		}
	}



	/**
	 * Performs basic sanitization on this value. But what sanitization can be performed anyways?
	 * This value MIGHT be allowed to have tags, so we can't really remove them.
	 * @param string $value
	 * @return null|string
	 */
	private function _sanitize($value){
		return $value !== NULL ?stripslashes(html_entity_decode($value)) : NULL;//don't sanitize_text_field
	}


	/**
	 * Picks out the form value that relates to this form input,
	 * and stores it as the sanitized value on the form input, and sets the normalized value.
	 * Returns whether or not any validation errors occurred
	 *
	 * @param array $req_data like $_POST
	 * @return boolean whether or not there was an error
	 */
	protected function _normalize( $req_data ) {
		//any existing validation errors don't apply so clear them
		$this->_validation_errors = array();
		try {
			$raw_input = $this->find_form_data_for_this_section( $req_data );
			//super simple sanitization for now
			if ( is_array( $raw_input )) {
				$this->_raw_value = array();
				foreach( $raw_input as $key => $value ) {
					$this->_raw_value[ $key ] = $this->_sanitize( $value );
				}
			} else {
				$this->_raw_value = $this->_sanitize( $raw_input );
			}
			//we want ot mostly leave the input alone in case we need to re-display it to the user
			$this->_normalized_value = $this->_normalization_strategy->normalize( $this->raw_value() );
		} catch ( EE_Validation_Error $e ) {
			$this->add_validation_error( $e );
		}
	}



	/**
	 * @return string
	 */
	public function html_name(){
		return $this->_html_name;
	}



	/**
	 * @return string
	 */
	function html_label_id(){
		return ! empty( $this->_html_label_id ) ? $this->_html_label_id : $this->_html_id . '-lbl';
	}



	/**
	 * @return string
	 */
	function html_label_class(){
		return $this->_html_label_class;
	}



	/**
	 * @return string
	 */
	function html_label_style(){
		return $this->_html_label_style;
	}



	/**
	 * @return string
	 */
	function html_label_text(){
		return $this->_html_label_text;
	}



	/**
	 * @return string
	 */
	function html_help_text(){
		return $this->_html_help_text;
	}



	/**
	 * @return string
	 */
	function html_help_class(){
		return $this->_html_help_class;
	}



	/**
	 * @return string
	 */
	function html_help_style(){
		return $this->_html_style;
	}
	/**
	 * returns the raw, UNSAFE, input, almost exactly as the user submitted it.
	 * Please note that almost all client code should instead use the normalized_value;
	 * or possibly raw_value_in_form (which prepares the string for displaying in an HTML attribute on a tag,
	 * mostly by escaping quotes)
	 * Note, we do not store the exact original value sent in the user's request because
	 * it may have malicious content, and we MIGHT want to store the form input in a transient or something...
	 * in which case, we would have stored the malicious content to our database.
	 * @return string
	 */
	function raw_value(){
		return $this->_raw_value;
	}
	/**
	 * Returns a string safe to usage in form inputs when displaying, because
	 * it escapes all html entities
	 * @return string
	 */
	function raw_value_in_form(){
		return htmlentities($this->raw_value(),ENT_QUOTES, 'UTF-8');
	}
	/**
	 * returns the value after it's been sanitized, and then converted into it's proper type
	 * in PHP. Eg, a string, an int, an array,
	 * @return mixed
	 */
	function normalized_value(){
		return $this->_normalized_value;
	}

	/**
	 * Returns the normalized value is a presentable way. By default this is just
	 * the normalized value by itself, but it can be overridden for when that's not
	 * the best thing to display
	 * @return string
	 */
	function pretty_value(){
		return $this->_normalized_value;
	}
	/**
	 * When generating the JS for the jquery validation rules like<br>
	 * <code>$( "#myform" ).validate({
		rules: {
		  password: "required",
		  password_again: {
			equalTo: "#password"
		  }
		}
	  });</code>
		if this field had the name 'password_again', it should return
	 * <br><code>password_again: {
			equalTo: "#password"
		  }</code>
	 * @return array
	 */
	function get_jquery_validation_rules(){
		$jquery_validation_rules = array();
		foreach($this->get_validation_strategies() as $validation_strategy){
			$jquery_validation_rules = array_merge($jquery_validation_rules, $validation_strategy->get_jquery_validation_rule_array());
		}
		if(! empty($jquery_validation_rules)){
			$jquery_validation_js[$this->html_name()] = $jquery_validation_rules;
		}else{
			return array();
		}
		return $jquery_validation_js;
	}

	/**
	 * Sets the input's default value for use in displaying in the form. Note: value should be
	 * normalized (Eg, if providing a default of ra Yes_NO_Input you would provide TRUE or FALSE, not '1' or '0')
	 * @param mixed $value
	 * @return void
	 */
	function set_default($value){
		$this->_normalized_value = $value;
		$this->_raw_value = $this->_normalization_strategy->unnormalize( $value );
	}

	/**
	 * Sets the HTML label text after it has already been defined
	 * @param string $label
	 * @return void
	 */
	function set_html_label_text($label){
		$this->_html_label_text = $label;
	}

	/**
	 * Sets whether or not this field is required, and adjusts the validation strategy
	 * @param boolean $required
	 */
	function set_required($required = true){
		if($required){
			$this->_add_validation_strategy(new EE_Required_Validation_Strategy());
		}else{
			unset($this->_validation_strategies[get_class(new EE_Required_Validation_Strategy())]);
		}
		$this->_required = $required;
	}
	/**
	 * Returns whether or not this field is required
	 * @return boolean
	 */
	public function required(){
		return $this->_required;
	}



	/**
	 * @param string $required_css_class
	 */
	public function set_required_css_class( $required_css_class ) {
		$this->_required_css_class = $required_css_class;
	}



	/**
	 * @return string
	 */
	public function required_css_class() {
		return $this->_required_css_class;
	}



	/**
	 * Sets the help text, in case
	 * @param string $text
	 */
	public function set_html_help_text($text){
		$this->_html_help_text = $text;
	}
	/**
	 * Uses the sensitive data removal strategy to remove the sensitive data from this
	 * input. If there is any kind of sensitive data removal on this input, we clear
	 * out the raw value completely
	 * @return void
	 */
	public function clean_sensitive_data() {
		//if we do ANY kind of sensitive data removal on this, then just clear out the raw value
		//if we need more logic than this we'll make a strategy for it
		if( $this->_sensitive_data_removal_strategy &&
				! $this->_sensitive_data_removal_strategy instanceof EE_No_Sensitive_Data_Removal ){
			$this->_raw_value = NULL;
		}
		//and clean the normalized value according to the appropriate strategy
		$this->_normalized_value = $this->get_sensitive_data_removal_strategy()->remove_sensitive_data($this->_normalized_value);
	}



	/**
	 * @param bool   $primary
	 * @param string $button_size
	 * @param string $other_attributes
	 */
	public function set_button_css_attributes( $primary = TRUE, $button_size = '', $other_attributes = '' ) {
		$button_css_attributes = 'button';
		$button_css_attributes .= $primary === TRUE ? ' button-primary' : ' button-secondary';
		switch ( $button_size ) {
			case 'xs' :
			case 'extra-small' :
				$button_css_attributes .= ' button-xs';
				break;
			case 'sm' :
			case 'small' :
				$button_css_attributes .= ' button-sm';
				break;
			case 'lg' :
			case 'large' :
				$button_css_attributes .= ' button-lg';
				break;
			case 'block' :
				$button_css_attributes .= ' button-block';
				break;
			case 'md' :
			case 'medium' :
			default :
				$button_css_attributes .= '';
		}
		$this->_button_css_attributes .= ! empty( $other_attributes ) ? $button_css_attributes . ' ' . $other_attributes : $button_css_attributes;
	}



	/**
	 * @return string
	 */
	public function button_css_attributes() {
		if ( empty( $this->_button_css_attributes )) {
			$this->set_button_css_attributes();
		}
		return $this->_button_css_attributes;
	}



	/**
	 * find_form_data_for_this_section
	 *
	 * using this section's name and its parents, finds the value of the form data that corresponds to it.
	 * For example, if this form section's HTML name is my_form[subform][form_input_1], then it's value should be in $_REQUEST
	 * at $_REQUEST['my_form']['subform']['form_input_1']. (If that doesn't exist, we also check for this subsection's name
	 * at the TOP LEVEL of the request data. Eg $_REQUEST['form_input_1'].)
	 * This function finds its value in the form.
	 *
	 * @param array $req_data
	 * @return mixed whatever the raw value of this form section is in the request data
	 */
	public function find_form_data_for_this_section( $req_data ){
		// break up the html name by "[]"
		if ( strpos( $this->html_name(), '[' ) !== FALSE ) {
			$before_any_brackets = substr( $this->html_name(), 0, strpos($this->html_name(), '[') );
		} else {
			$before_any_brackets = $this->html_name();
		}
		// grab all of the segments
		preg_match_all('~\[([^]]*)\]~',$this->html_name(), $matches);
		if( isset( $matches[ 1 ] ) && is_array( $matches[ 1 ] ) ){
			$name_parts = $matches[ 1 ];
			array_unshift($name_parts, $before_any_brackets);
		}else{
			$name_parts = array( $before_any_brackets );
		}
		// now get the value for the input
		$value = $this->_find_form_data_for_this_section_using_name_parts($name_parts, $req_data);
		if( $value === NULL ){
			//check if this thing's name is at the TOP level of the request data
			if( isset( $req_data[ $this->name() ] ) ){
				$value = $req_data[ $this->name() ];
			}
		}
		return $value;
	}



	/**
	 *
	 * @param array $html_name_parts
	 * @param array $req_data
	 * @return array | NULL
	 */
	public function _find_form_data_for_this_section_using_name_parts($html_name_parts, $req_data){
		$first_part_to_consider = array_shift( $html_name_parts );
		if( isset( $req_data[ $first_part_to_consider ] ) ){
			if( empty($html_name_parts ) ){
				return $req_data[ $first_part_to_consider ];
			}else{
				return $this->_find_form_data_for_this_section_using_name_parts($html_name_parts, $req_data[ $first_part_to_consider ] );
			}
		}else{
			return NULL;
		}
	}



	/**
	 * Checks if this form input's data is in the request data
	 * @param array $req_data like $_POST
	 * @return boolean
	 */
	public function form_data_present_in($req_data = NULL){
		if( $req_data === NULL ){
			$req_data = $_POST;
		}
		if( $this->find_form_data_for_this_section( $req_data ) ){
			return TRUE;
		}else{
			return FALSE;
		}
	}



}
