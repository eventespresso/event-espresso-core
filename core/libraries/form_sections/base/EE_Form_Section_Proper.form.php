<?php
/**
 * For containing info about a non-field form section, which contains other form sections/fields.
 * Relies heavily on the script form_section_validation.js for client-side validation, mostly
 * the php code just provides form_section_validation.js with teh variables to use.
 * Important: in order for the JS to be loaded properly, you must construct a form section
 * before the hook wp_enqueue_scripts is called (so that the form section can enqueue its needed scripts).
 * However, you may output the form (usually by caling get_html_and_js) anywhere you like.
 */
class EE_Form_Section_Proper extends EE_Form_Section_Base{
	/**
	 * Subsections
	 * @var EE_Form_Section_Base[]
	 */
	protected $_subsections = array();
	
	/**
	 * Strategy for laying out the form
	 * @var EE_Form_Section_Layout_Base
	 */
	protected $_layout_strategy;
	/**
	 * Whether or not this form has received and validated a form submission yet
	 * @var boolean
	 */
	protected $_received_submission = FALSE;
	/**
	 * Stores all the data that will localized for form validation
	 * @var array
	 */
	static protected $_js_localization = array();
	
	/**
	 * when constructing a proper form section, calls _construct_finalize on children
	 * so that they know who their parent is, and what name they've been given.
	 * @param array $options_array keys:<ul>
	 * <li>'subsections' shoudl be EE_Form_Section_Base[], which will be merged with whatever was already
	 * defined in child constructors;</li>
	 * <li>'include' should be an array where values are all subsections to be included, and in that order. This is handy if you want
	 * the subsections to be ordered differently than the default, and if you override which fields are shown</li>
	 * <li>'exclude' should be an array where values are subsections to be excluded. This is handy if you want
	 * to remove certain default subsections</li>
	 * (note: if you specify BOTH 'include' AND 'exclude', the inclusions will be applied first, and the exclusions will exclude items from that list of inclusions)
	 * <li>and parent's keys too</li></ul>
	 */
	public function __construct($options_array = array()){
		//call parent first, as it may be setting the name
		parent::__construct($options_array);
		$this->_set_default_name_if_empty();
		$this->_set_default_html_id_if_empty();
		//if they've included subsections in the constructor, add them now
		if(isset($options_array['subsections'])){
			$this->_subsections = array_merge($this->_subsections,$options_array['subsections']);
		}
		
		if(isset($options_array['include'])){
			//we are going to make sure we ONLY have those those subsections to include
			//AND we are going to make sure they're in that specified order
			$reordered_subsections = array();
			foreach($options_array['include'] as $input_name){
				if(isset($this->_subsections[$input_name])){
					$reordered_subsections[$input_name] = $this->_subsections[$input_name];
				}
			}
			$this->_subsections = $reordered_subsections;
		}
		if(isset($options_array['exclude'])){
			$exclude = $options_array['exclude'];
			$this->_subsections = array_diff_key($this->_subsections, array_flip($exclude));
		}
		foreach($this->_subsections as $name => $subsection){
			$subsection->_construct_finalize($this, $name);
		}
		if(isset($options_array['layout_strategy'])){
			$this->_layout_strategy = $options_array['layout_strategy'];
		}
		if( ! $this->_layout_strategy){
			$this->_layout_strategy = new EE_Two_Column_Layout();
		}
		$this->_layout_strategy->_construct_finalize($this);
		
		$this->_enqueue_jquery_validate_script();
	}
	/**
	 * Gets the layotu strategy for this form section
	 * @return EE_Form_Section_Layout_Base
	 */
	public function get_layout_strategy(){
		return $this->_layout_strategy;
	}
	/**
	 * Gets the HTML for a single input for this form section according
	 * to the layout strategy
	 * @param type $input
	 * @return string
	 */
	public function get_html_for_input($input){
		return $this->_layout_strategy->layout_input($input);
	}
	
	/**
	 * After the form section is initially created, call this to sanitize the data in the submission
	 * which relates to this form section, validate it, and set it as properties on the form.
	 * @param array $req_data should usually be $_REQUEST (the default). However, you CAN
	 * supply a different array. Consider using set_defaults() instead however.
	 * @return void
	 */
	public function receive_form_submission($req_data = NULL){
		if( $req_data === NULL){
			$req_data = $_REQUEST;
		}
		$this->_normalize($req_data);
		$this->_validate();
		$this->_received_submission = TRUE;
	}
	/**
	 * Populates the default data for the form, given an array where keys are
	 * the input names, and values are their values (preferably normalized to be their
	 * proper PHP types, not all strings... although that should be ok too).
	 * Proper subsections are sub-arrays, the key being the subsection's name, and
	 * the value being an array formatted in teh same way
	 * @param array $default_data
	 */
	public function populate_defaults($default_data){
		foreach($this->subsections() as $subsection_name => $subsection){
			if(isset($default_data[$subsection_name])){
				if($subsection instanceof EE_Form_Input_Base){
					$subsection->set_default($default_data[$subsection_name]);
				}elseif($subsection instanceof EE_Form_Section_Proper){
					$subsection->populate_defaults($default_data[$subsection_name]);
				}
			}
		}
	}
	/**
	 * Gets the subsection specified by its name (could be an input or proper subsection)
	 * @param string $name
	 * @return EE_Form_Section_Base
	 */
	public function get_subsection($name){
		return isset($this->_subsections[$name]) ? $this->_subsections[$name] : NULL;
	}
	/**
	 * Gets an input by the given name. If not found, or if its not an EE_FOrm_Input_Base child,
	 * throw an EE_Error.
	 * @param string $name
	 * @return EE_Form_Input_Base
	 * @throws EE_Error
	 */
	public function get_input($name){
		$subsection = $this->get_subsection($name);
		if( ! $subsection instanceof EE_Form_Input_Base){
			throw new EE_Error(sprintf(__("Subsection '%'s is not an intanceof EE_Form_Input_Base on form '%s'", 'event_espresso'),$name, get_class($this)));
		}
		return $subsection;
	}
	/**
	 * Like get_input(), gets the proper subsection of the form given the name,
	 * otherwise throws an EE_Error
	 * @param string $name
	 * @return EE_Form_Section_Proper
	 * @throws EE_Error
	 */
	public function get_proper_subsection($name){
		$subsection = $this->get_subsection($name);
		if( ! $subsection instanceof EE_Form_Section_Proper){
			throw new EE_Error(sprintf(__("Subsection '%'s is not an intanceof EE_Form_Section_Proper on form '%s'", 'event_espresso'),$name, get_class($this)));
		}
		return $subsection;
	}
	/**
	 * Gets the value of the specified input. Should be called after receive_form_submission()
	 * or populate_defaults() on the form, where the normalized value on the input is set.
	 * @param string $name
	 * @return mixed depending on the input's type and its normalization strategy
	 */
	public function get_input_value($name){
		$input = $this->get_input($name);
		return $input->normalized_value();
	}
	/**
	 * Checks if this form section itself is valid, and then checks its subsections
	 * @return boolean
	 */
	public function is_valid() {
		if( ! $this->has_received_submission()){
			throw new EE_Error(sprintf(__("You cannot check if a form is valid before receiving the form submission using receive_form_submission", "event_espresso")));
		}
		if( ! parent::is_valid()){
			return false;
		}
		//ok so no errors general to this entire form section. so let's check the subsections
		foreach($this->_subsections as $subsection){
			if( ! $subsection->is_valid()){
				return false;
			}
		}
		return true;
	}
	
	/**
	 * adds a filter so taht jquery validate gets enqueued in EE_System::wp_enqueue_scripts().
	 * This must be done BEFORE wp_enqueue_scripts() gets called, which is on 
	 * the wp_enqueue_scripts hook.
	 * However, registering the form js and localizing it can happen when we 
	 * actually output the form (which is preferred, seeing how teh form's fields
	 * could change until it's actually outputted)
	 * @return void
	 */
	protected function _enqueue_jquery_validate_script(){
		add_filter( 'FHEE_load_jquery_validate', '__return_true' );
	}
	
	/**
	 * gets teh default name of this form section if none is specified
	 * @return string
	 */
	protected function _set_default_name_if_empty(){
		if( ! $this->_name ){
			$classname = get_class($this);
			$default_name = str_replace("EE_", "", $classname);
			$this->_name =  $default_name;
		}
	}
	
	
	
	
	
	/**
	 * Returns the JS for validating the form (and subsections) inside script tags. 
	 * Also returns the HTML for the form, except for the form opening and closing tags 
	 * (as the form section doesn't know where you necessarily want to send the information to), and except for a submit button.
	 */
	public function get_html_and_js(){
		$this->_enqueue_and_localize_form_js();
		return $this->get_html();
	}
	
	/**
	 * returns HTML for displaying this form section. recursively calls display_section() on all subsections
	 * @return string
	 */
	public function get_html(){
		return $this->_layout_strategy->layout_form();
	}
	
	/**
	 * returns HTML for generating the opening form HTML tag (<form>)
	 * @param string $action the URL the form is submitted to
	 * @param string $method POST (default) or GET
	 * @param string $other_attributes anything else added to the form open tag, MUST BE VALID HTML
	 * @return string
	 */
	public function form_open( $action = NULL, $method = 'POST', $other_attributes = '' ) {
		return ee_newline(1) . '<form id="ee-' . $this->html_id() . '-form" action="' . $action . '" method="' . $method . '"' . $other_attributes . '>';
	}
	
	/**
	 * returns HTML for generating an HTML form submit button
	 * @return string
	 */
	public function form_submit_button( $value = 'Update', $primary = TRUE, $btn_size = 'large', $other_attributes = '' ) {
		$primary = $primary === TRUE ? 'primary' : 'secondary';
		return ee_newline() . '<input id="ee-' . $this->html_id() . '-submit" class="button button-' . $primary . ' button-' . $btn_size . '" type="submit" value="' . $value . '" name="ee_' . $this->html_id() . '_submit" ' . $other_attributes . '/>';
	}
	
	/**
	 * returns HTML for generating the closing form HTML tag (</form>)
	 * @return string
	 */
	public function form_close() {
		return ee_newline(-1) . '</form>' . ee_newline() . '<!-- end of ee-' . $this->html_id() . '-form -->' . ee_newline();
	}

	
	/**
	 * gets the variables used by form_section_validation.js.
	 * This needs to be called AFTER we've called $this->_enqueue_jquery_validate_script,
	 * but before the wordpress hook wp_loaded
	 */
	public function _enqueue_and_localize_form_js(){
		wp_register_script('jquery-validate', EE_GLOBAL_ASSETS_URL . 'scripts/jquery.validate.min.js', array('jquery'), '1.11.1', TRUE);	
		wp_enqueue_script('ee_form_section_validation', EE_GLOBAL_ASSETS_URL.'scripts/form_section_validation.js', array('jquery-validate'), '1', true);
		$validation_rules = $this->get_jquery_validation_rules();
		$form_section_id = $this->html_id();
		//actually, we don't want to localize jsut yet. There may be other forms on the page.
		//so we need to add our form section data to a static variable accessible by all form sections
		//and localize it just before the footer
		EE_Form_Section_Proper::$_js_localization['form_data'][] =array(
			'form_section_id'=>'#'.$form_section_id,
			'validation_rules'=>$validation_rules);
		add_action('get_footer', array('EE_Form_Section_Proper','localize_script_for_all_forms'));
		add_action('admin_footer', array('EE_Form_Section_Proper','localize_script_for_all_forms'));
	}
	
	/**
	 * passes all the form data required by the JS to the JS, and enqueues the few required JS files.
	 * Should be setup by each form during the _enqueues_and_localize_form_js
	 */
	public static function localize_script_for_all_forms(){
		//allow inputs and stuff to hook in their JS and stuff here
		do_action('AHEE__EE_Form_Section_Proper__localize_script_for_all_forms__begin');
		EE_Form_Section_Proper::$_js_localization['localized_error_messages'] = EE_Form_Section_Proper::_get_localized_error_messages();
		wp_register_script('jquery-validate', EE_GLOBAL_ASSETS_URL . 'scripts/jquery.validate.min.js', array('jquery'), '1.11.1', TRUE);	
		wp_enqueue_script('ee_form_section_validation', EE_GLOBAL_ASSETS_URL.'scripts/form_section_validation.js', array('jquery-validate'),
				'1',true);
		wp_localize_script('ee_form_section_validation','ee_form_section_vars', EE_Form_Section_Proper::$_js_localization);
	}
	/**
	 * Gets the hard-coded validation error messages to be used in the JS. The convention
	 * is that the key here should be the same as the custom validation rule put in the JS file
	 * @return array keys are custom validation rules, and values are internationalized strings
	 */
	private static function _get_localized_error_messages(){
		return array(
			'validUrl'=>  __("This is not a valid absolute URL. Eg, http://mysite.com/monkey.jpg", "event_espresso")
		);
	}
	
	/**
	 * Gets the JS to put inside the jquery validation rules for subsection of this form section. See parent function for more...
	 * @return array
	 */
	function get_jquery_validation_rules(){
		$jquery_validation_rules = array();
		foreach($this->_subsections as $subsection){
			$jquery_validation_rules = array_merge($jquery_validation_rules,  $subsection->get_jquery_validation_rules());
		}
		return $jquery_validation_rules;
	}
	
	/**
	 * Sanitizes all the data and sets the sanitized value of each field
	 * @param array $req_data like $_POST
	 */
	protected function _normalize($req_data) {
		foreach($this->_subsections as $subsection){
			$subsection->_normalize($req_data);
		}
	}
	/**
	 * Performs validation on thsi form section and its subsections. For each subsection,
	 * calls _validate_{subsection_name} on THIS form (if the function exists) and passes it the subsection, then calls _validate on that subsection.
	 * If you need to perform validation on the form as a whole (considering multiple) you would be best to override this _validate method,
	 * calling parent::_validate() first.
	 * @param type $req_data
	 */
	protected function _validate() {
		foreach($this->_subsections as $subsection_name => $subsection){
			if(method_exists($this,'_validate_'.$subsection_name)){
				call_user_func_array(array($this,'_validate_'.$subsection_name), array($subsection));
			}
			$subsection->_validate();
		}
	}
	
	/**
	 * Gets all the inputs on this form section
	 * @return EE_Form_Input_Base[]
	 */
	public function inputs(){
		$inputs = array();
		foreach($this->_subsections as $name=>$obj){
			if($obj instanceof EE_Form_Input_Base){
				$inputs[$name] = $obj;
			}
		}
		return $inputs;
	}
	/**
	 * Gets all the subsections whcih are a proper form
	 * @return EE_Form_Section_Proper[]
	 */
	public function subforms(){
		$form_sections = array();
		foreach($this->_subsections as $name=>$obj){
			if($obj instanceof EE_Form_Section_Proper){
				$form_sections[$name] = $obj;
			}
		}
		return $form_sections;
	}
	/**
	 * Gets all the subsections. Consider using inputs() or subforms()
	 * if you only want form inputs or proper form sections.
	 * @return EE_Form_Section[]
	 */
	public function subsections(){
		return $this->_subsections;
	}
	/**
	 * Returns a simple array where keys are input names, and values are their normalized
	 * values. (Similar to calling get_input_value on inputs)
	 * @return array
	 */
	public function input_values(){
		$input_values = array();
		foreach($this->inputs() as $name => $input_obj){
			$input_values[$name] = $input_obj->normalized_value();
		}
		return $input_values;
	}
	/**
	 * Indicates whether or not this form has received a submission yet 
	 * (ie, had receive_form_submission called on it yet)
	 * @return boolean
	 */
	public function has_received_submission(){
		return $this->_received_submission;
	}
	/**
	 * Equivalent to passing 'exclude' in the constructor's options array.
	 * Removes the listed inputs from the form
	 * @param array $inputs_to_exclude values are the input names
	 * @return void
	 */
	public function exclude($inputs_to_exclude = array()){
		foreach($inputs_to_exclude as $input_to_exclude_name){
			unset($this->_subsections[$input_to_exclude_name]);
		}
	}
	
	public function hide($inputs_to_hide= array()){
		foreach($inputs_to_hide as $input_to_hide){
			$input = $this->get_input($input_to_hide);
			
			$input->set_display_strategy(new EE_Hidden_Display_Strategy());
		}
	}
}
	
/**
 * @return string - newline character plus # of indents passed (can be + or -)
 */
function ee_newline( $indent = 0 ) {
	static $tabs = 0;
	$tabs += $indent;		
	$html = EENL;
	for ( $x = 0; $x <= $tabs; $x++ ) {
		$html .= "\t";
	}
	return $html;
}
