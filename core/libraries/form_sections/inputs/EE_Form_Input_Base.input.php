<?php if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * EE_Form_Input_Base
 * For representing a single form input. Extends EE_Form_Section_Base because
 * it is a part of a form and shares a surprisingly large amount of functionality
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 */
abstract class EE_Form_Input_Base extends EE_Form_Section_Validatable
{

    /**
     * the input's name attribute
     *
     * @var string
     */
    protected $_html_name;

    /**
     * id for the html label tag
     *
     * @var string
     */
    protected $_html_label_id;

    /**
     * class for teh html label tag
     *
     * @var string
     */
    protected $_html_label_class;

    /**
     * any additional html attributes that you may want to add
     *
     * @var string
     */
    protected $_html_other_attributes;

    /**
     * style for teh html label tag
     *
     * @var string
     */
    protected $_html_label_style;

    /**
     * text to be placed in the html label
     *
     * @var string
     */
    protected $_html_label_text;

    /**
     * the full html label. If used, all other html_label_* properties are invalid
     *
     * @var string
     */
    protected $_html_label;

    /**
     * HTML to use for help text (normally placed below form input), in a span which normally
     * has a class of 'description'
     *
     * @var string
     */
    protected $_html_help_text;

    /**
     * CSS classes for displaying the help span
     *
     * @var string
     */
    protected $_html_help_class = 'description';

    /**
     * CSS to put in the style attribute on the help span
     *
     * @var string
     */
    protected $_html_help_style;

    /**
     * Stores whether or not this input's response is required.
     * Because certain styling elements may also want to know that this
     * input is required etc.
     *
     * @var boolean
     */
    protected $_required;

    /**
     * css class added to required inputs
     *
     * @var string
     */
    protected $_required_css_class = 'ee-required';

    /**
     * css styles applied to button type inputs
     *
     * @var string
     */
    protected $_button_css_attributes;

    /**
     * The raw data submitted for this, like in the $_POST super global.
     * Generally unsafe for usage in client code
     *
     * @var mixed string or array
     */
    protected $_raw_value;

    /**
     * Value normalized according to the input's normalization strategy.
     * The normalization strategy dictates whether this is a string, int, float,
     * boolean, or array of any of those.
     *
     * @var mixed
     */
    protected $_normalized_value;

    /**
     * Strategy used for displaying this field.
     * Child classes must use _get_display_strategy to access it.
     *
     * @var EE_Display_Strategy_Base
     */
    private $_display_strategy;

    /**
     * Gets all the validation strategies used on this field
     *
     * @var EE_Validation_Strategy_Base[]
     */
    private $_validation_strategies = array();

    /**
     * The normalization strategy for this field
     *
     * @var EE_Normalization_Strategy_Base
     */
    private $_normalization_strategy;

    /**
     * Strategy for removing sensitive data after we're done with the form input
     *
     * @var EE_Sensitive_Data_Removal_Base
     */
    protected $_sensitive_data_removal_strategy;



    /**
     * @param array                         $input_args       {
     * @type string                         $html_name        the html name for the input
     * @type string                         $html_label_id    the id attribute to give to the html label tag
     * @type string                         $html_label_class the class attribute to give to the html label tag
     * @type string                         $html_label_style the style attribute to give ot teh label tag
     * @type string                         $html_label_text  the text to put in the label tag
     * @type string                         $html_label       the full html label. If used,
     *                                                        all other html_label_* args are invalid
     * @type string                         $html_help_text   text to put in help element
     * @type string                         $html_help_style  style attribute to give to teh help element
     * @type string                         $html_help_class  class attribute to give to the help element
     * @type string                         $default          default value NORMALIZED (eg, if providing the default
     *       for a Yes_No_Input, you should provide TRUE or FALSE, not '1' or '0')
     * @type EE_Display_Strategy_Base       $display          strategy
     * @type EE_Normalization_Strategy_Base $normalization_strategy
     * @type EE_Validation_Strategy_Base[]  $validation_strategies
     *                                                        }
     */
    public function __construct($input_args = array())
    {
        $input_args = (array)apply_filters('FHEE__EE_Form_Input_Base___construct__input_args', $input_args, $this);
        // the following properties must be cast as arrays
        if (isset($input_args['validation_strategies'])) {
            foreach ((array)$input_args['validation_strategies'] as $validation_strategy) {
                if ($validation_strategy instanceof EE_Validation_Strategy_Base) {
                    $this->_validation_strategies[get_class($validation_strategy)] = $validation_strategy;
                }
            }
            unset($input_args['validation_strategies']);
        }
        // loop thru incoming options
        foreach ($input_args as $key => $value) {
            // add underscore to $key to match property names
            $_key = '_' . $key;
            if (property_exists($this, $_key)) {
                $this->{$_key} = $value;
            }
        }
        // ensure that "required" is set correctly
        $this->set_required(
            $this->_required, isset($input_args['required_validation_error_message'])
            ? $input_args['required_validation_error_message']
            : null
        );
        //$this->_html_name_specified = isset( $input_args['html_name'] ) ? TRUE : FALSE;
        $this->_display_strategy->_construct_finalize($this);
        foreach ($this->_validation_strategies as $validation_strategy) {
            $validation_strategy->_construct_finalize($this);
        }
        if (! $this->_normalization_strategy) {
            $this->_normalization_strategy = new EE_Text_Normalization();
        }
        $this->_normalization_strategy->_construct_finalize($this);
        //at least we can use the normalization strategy to populate the default
        if (isset($input_args['default'])) {
            $this->set_default($input_args['default']);
        }
        if (! $this->_sensitive_data_removal_strategy) {
            $this->_sensitive_data_removal_strategy = new EE_No_Sensitive_Data_Removal();
        }
        $this->_sensitive_data_removal_strategy->_construct_finalize($this);
        parent::__construct($input_args);
    }



    /**
     * Sets the html_name to its default value, if none was specified in teh constructor.
     * Calculation involves using the name and the parent's html_name
     *
     * @throws \EE_Error
     */
    protected function _set_default_html_name_if_empty()
    {
        if (! $this->_html_name) {
            $this->_html_name = $this->name();
            if ($this->_parent_section && $this->_parent_section instanceof EE_Form_Section_Proper) {
                $this->_html_name = $this->_parent_section->html_name_prefix() . "[{$this->name()}]";
            }
        }
    }



    /**
     * @param $parent_form_section
     * @param $name
     * @throws \EE_Error
     */
    public function _construct_finalize($parent_form_section, $name)
    {
        parent::_construct_finalize($parent_form_section, $name);
        if ($this->_html_label === null && $this->_html_label_text === null) {
            $this->_html_label_text = ucwords(str_replace("_", " ", $name));
        }
        do_action('AHEE__EE_Form_Input_Base___construct_finalize__end', $this, $parent_form_section, $name);
    }



    /**
     * Returns the strategy for displaying this form input. If none is set, throws an exception.
     *
     * @return EE_Display_Strategy_Base
     * @throws EE_Error
     */
    protected function _get_display_strategy()
    {
        $this->ensure_construct_finalized_called();
        if (! $this->_display_strategy || ! $this->_display_strategy instanceof EE_Display_Strategy_Base) {
            throw new EE_Error(
                sprintf(
                    __(
                        "Cannot get display strategy for form input with name %s and id %s, because it has not been set in the constructor",
                        "event_espresso"
                    ),
                    $this->html_name(),
                    $this->html_id()
                )
            );
        } else {
            return $this->_display_strategy;
        }
    }



    /**
     * Sets the display strategy.
     *
     * @param EE_Display_Strategy_Base $strategy
     */
    protected function _set_display_strategy(EE_Display_Strategy_Base $strategy)
    {
        $this->_display_strategy = $strategy;
    }



    /**
     * Sets the sanitization strategy
     *
     * @param EE_Normalization_Strategy_Base $strategy
     */
    protected function _set_normalization_strategy(EE_Normalization_Strategy_Base $strategy)
    {
        $this->_normalization_strategy = $strategy;
    }



    /**
     * Gets sensitive_data_removal_strategy
     *
     * @return EE_Sensitive_Data_Removal_Base
     */
    public function get_sensitive_data_removal_strategy()
    {
        return $this->_sensitive_data_removal_strategy;
    }



    /**
     * Sets sensitive_data_removal_strategy
     *
     * @param EE_Sensitive_Data_Removal_Base $sensitive_data_removal_strategy
     * @return boolean
     */
    public function set_sensitive_data_removal_strategy($sensitive_data_removal_strategy)
    {
        $this->_sensitive_data_removal_strategy = $sensitive_data_removal_strategy;
    }



    /**
     * Gets the display strategy for this input
     *
     * @return EE_Display_Strategy_Base
     */
    public function get_display_strategy()
    {
        return $this->_display_strategy;
    }



    /**
     * Overwrites the display strategy
     *
     * @param EE_Display_Strategy_Base $display_strategy
     */
    public function set_display_strategy($display_strategy)
    {
        $this->_display_strategy = $display_strategy;
        $this->_display_strategy->_construct_finalize($this);
    }



    /**
     * Gets the normalization strategy set on this input
     *
     * @return EE_Normalization_Strategy_Base
     */
    public function get_normalization_strategy()
    {
        return $this->_normalization_strategy;
    }



    /**
     * Overwrites the normalization strategy
     *
     * @param EE_Normalization_Strategy_Base $normalization_strategy
     */
    public function set_normalization_strategy($normalization_strategy)
    {
        $this->_normalization_strategy = $normalization_strategy;
        $this->_normalization_strategy->_construct_finalize($this);
    }



    /**
     * Returns all teh validation strategies which apply to this field, numerically indexed
     *
     * @return EE_Validation_Strategy_Base[]
     */
    public function get_validation_strategies()
    {
        return $this->_validation_strategies;
    }



    /**
     * Adds this strategy to the field so it will be used in both JS validation and server-side validation
     *
     * @param EE_Validation_Strategy_Base $validation_strategy
     * @return void
     */
    protected function _add_validation_strategy(EE_Validation_Strategy_Base $validation_strategy)
    {
        $validation_strategy->_construct_finalize($this);
        $this->_validation_strategies[] = $validation_strategy;
    }



    /**
     * Adds a new validation strategy onto the form input
     *
     * @param EE_Validation_Strategy_Base $validation_strategy
     * @return void
     */
    public function add_validation_strategy(EE_Validation_Strategy_Base $validation_strategy)
    {
        $this->_add_validation_strategy($validation_strategy);
    }



    /**
     * The classname of the validation strategy to remove
     *
     * @param string $validation_strategy_classname
     */
    public function remove_validation_strategy($validation_strategy_classname)
    {
        foreach ($this->_validation_strategies as $key => $validation_strategy) {
            if (
                $validation_strategy instanceof $validation_strategy_classname
                || is_subclass_of($validation_strategy, $validation_strategy_classname)
            ) {
                unset($this->_validation_strategies[$key]);
            }
        }
    }



    /**
     * returns true if input employs any of the validation strategy defined by the supplied array of classnames
     *
     * @param array $validation_strategy_classnames
     * @return bool
     */
    public function has_validation_strategy($validation_strategy_classnames)
    {
        $validation_strategy_classnames = is_array($validation_strategy_classnames)
            ? $validation_strategy_classnames
            : array($validation_strategy_classnames);
        foreach ($this->_validation_strategies as $key => $validation_strategy) {
            if (in_array($key, $validation_strategy_classnames)) {
                return true;
            }
        }
        return false;
    }



    /**
     * Gets the HTML
     *
     * @return string
     */
    public function get_html()
    {
        return $this->_parent_section->get_html_for_input($this);
    }



    /**
     * Gets the HTML for the input itself (no label or errors) according to the
     * input's display strategy
     * Makes sure the JS and CSS are enqueued for it
     *
     * @return string
     * @throws \EE_Error
     */
    public function get_html_for_input()
    {
        return $this->_form_html_filter
            ? $this->_form_html_filter->filterHtml(
                $this->_get_display_strategy()->display(),
                $this
            )
            : $this->_get_display_strategy()->display();
    }



    /**
     * @return string
     */
    public function html_other_attributes()
    {
        return ! empty($this->_html_other_attributes) ? ' ' . $this->_html_other_attributes : '';
    }



    /**
     * @param string $html_other_attributes
     */
    public function set_html_other_attributes($html_other_attributes)
    {
        $this->_html_other_attributes = $html_other_attributes;
    }



    /**
     * Gets the HTML for displaying the label for this form input
     * according to the form section's layout strategy
     *
     * @return string
     */
    public function get_html_for_label()
    {
        return $this->_parent_section->get_layout_strategy()->display_label($this);
    }



    /**
     * Gets the HTML for displaying the errors section for this form input
     * according to the form section's layout strategy
     *
     * @return string
     */
    public function get_html_for_errors()
    {
        return $this->_parent_section->get_layout_strategy()->display_errors($this);
    }



    /**
     * Gets the HTML for displaying the help text for this form input
     * according to the form section's layout strategy
     *
     * @return string
     */
    public function get_html_for_help()
    {
        return $this->_parent_section->get_layout_strategy()->display_help_text($this);
    }



    /**
     * Validates the input's sanitized value (assumes _sanitize() has already been called)
     * and returns whether or not the form input's submitted value is value
     *
     * @return boolean
     */
    protected function _validate()
    {
        foreach ($this->_validation_strategies as $validation_strategy) {
            if ($validation_strategy instanceof EE_Validation_Strategy_Base) {
                try {
                    $validation_strategy->validate($this->normalized_value());
                } catch (EE_Validation_Error $e) {
                    $this->add_validation_error($e);
                }
            }
        }
        if ($this->get_validation_errors()) {
            return false;
        } else {
            return true;
        }
    }



    /**
     * Performs basic sanitization on this value. But what sanitization can be performed anyways?
     * This value MIGHT be allowed to have tags, so we can't really remove them.
     *
     * @param string $value
     * @return null|string
     */
    private function _sanitize($value)
    {
        return $value !== null ? stripslashes(html_entity_decode(trim($value))) : null;
    }



    /**
     * Picks out the form value that relates to this form input,
     * and stores it as the sanitized value on the form input, and sets the normalized value.
     * Returns whether or not any validation errors occurred
     *
     * @param array $req_data like $_POST
     * @return boolean whether or not there was an error
     * @throws \EE_Error
     */
    protected function _normalize($req_data)
    {
        //any existing validation errors don't apply so clear them
        $this->_validation_errors = array();
        try {
            $raw_input = $this->find_form_data_for_this_section($req_data);
            //super simple sanitization for now
            if (is_array($raw_input)) {
                $raw_value = array();
                foreach ($raw_input as $key => $value) {
                    $raw_value[$key] = $this->_sanitize($value);
                }
                $this->_set_raw_value($raw_value);
            } else {
                $this->_set_raw_value($this->_sanitize($raw_input));
            }
            //we want to mostly leave the input alone in case we need to re-display it to the user
            $this->_set_normalized_value($this->_normalization_strategy->normalize($this->raw_value()));
        } catch (EE_Validation_Error $e) {
            $this->add_validation_error($e);
        }
    }



    /**
     * @return string
     */
    public function html_name()
    {
        $this->_set_default_html_name_if_empty();
        return $this->_html_name;
    }



    /**
     * @return string
     */
    public function html_label_id()
    {
        return ! empty($this->_html_label_id) ? $this->_html_label_id : $this->_html_id . '-lbl';
    }



    /**
     * @return string
     */
    public function html_label_class()
    {
        return $this->_html_label_class;
    }



    /**
     * @return string
     */
    public function html_label_style()
    {
        return $this->_html_label_style;
    }



    /**
     * @return string
     */
    public function html_label_text()
    {
        return $this->_html_label_text;
    }



    /**
     * @return string
     */
    public function html_help_text()
    {
        return $this->_html_help_text;
    }



    /**
     * @return string
     */
    public function html_help_class()
    {
        return $this->_html_help_class;
    }



    /**
     * @return string
     */
    public function html_help_style()
    {
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
     *
     * @return string
     */
    public function raw_value()
    {
        return $this->_raw_value;
    }



    /**
     * Returns a string safe to usage in form inputs when displaying, because
     * it escapes all html entities
     *
     * @return string
     */
    public function raw_value_in_form()
    {
        return htmlentities($this->raw_value(), ENT_QUOTES, 'UTF-8');
    }



    /**
     * returns the value after it's been sanitized, and then converted into it's proper type
     * in PHP. Eg, a string, an int, an array,
     *
     * @return mixed
     */
    public function normalized_value()
    {
        return $this->_normalized_value;
    }



    /**
     * Returns the normalized value is a presentable way. By default this is just
     * the normalized value by itself, but it can be overridden for when that's not
     * the best thing to display
     *
     * @return string
     */
    public function pretty_value()
    {
        return $this->_normalized_value;
    }



    /**
     * When generating the JS for the jquery validation rules like<br>
     * <code>$( "#myform" ).validate({
     * rules: {
     * password: "required",
     * password_again: {
     * equalTo: "#password"
     * }
     * }
     * });</code>
     * if this field had the name 'password_again', it should return
     * <br><code>password_again: {
     * equalTo: "#password"
     * }</code>
     *
     * @return array
     */
    public function get_jquery_validation_rules()
    {
        $jquery_validation_js = array();
        $jquery_validation_rules = array();
        foreach ($this->get_validation_strategies() as $validation_strategy) {
            $jquery_validation_rules = array_replace_recursive(
                $jquery_validation_rules,
                $validation_strategy->get_jquery_validation_rule_array()
            );
        }
        if (! empty($jquery_validation_rules)) {
            foreach ($this->get_display_strategy()->get_html_input_ids(true) as $html_id_with_pound_sign) {
                $jquery_validation_js[$html_id_with_pound_sign] = $jquery_validation_rules;
            }
        }
        return $jquery_validation_js;
    }



    /**
     * Sets the input's default value for use in displaying in the form. Note: value should be
     * normalized (Eg, if providing a default of ra Yes_NO_Input you would provide TRUE or FALSE, not '1' or '0')
     *
     * @param mixed $value
     * @return void
     */
    public function set_default($value)
    {
        $this->_set_normalized_value($value);
        $this->_set_raw_value($value);
    }



    /**
     * Sets the normalized value on this input
     *
     * @param mixed $value
     */
    protected function _set_normalized_value($value)
    {
        $this->_normalized_value = $value;
    }



    /**
     * Sets the raw value on this input (ie, exactly as the user submitted it)
     *
     * @param mixed $value
     */
    protected function _set_raw_value($value)
    {
        $this->_raw_value = $this->_normalization_strategy->unnormalize($value);
    }



    /**
     * Sets the HTML label text after it has already been defined
     *
     * @param string $label
     * @return void
     */
    public function set_html_label_text($label)
    {
        $this->_html_label_text = $label;
    }



    /**
     * Sets whether or not this field is required, and adjusts the validation strategy.
     * If you want to use the EE_Conditionally_Required_Validation_Strategy,
     * please add it as a validation strategy using add_validation_strategy as normal
     *
     * @param boolean $required boolean
     * @param null    $required_text
     */
    public function set_required($required = true, $required_text = null)
    {
        $required = filter_var($required, FILTER_VALIDATE_BOOLEAN);
        //whether $required is a string or a boolean, we want to add a required validation strategy
        if ($required) {
            $this->_add_validation_strategy(new EE_Required_Validation_Strategy($required_text));
        } else {
            $this->remove_validation_strategy('EE_Required_Validation_Strategy');
        }
        $this->_required = $required;
    }



    /**
     * Returns whether or not this field is required
     *
     * @return boolean
     */
    public function required()
    {
        return $this->_required;
    }



    /**
     * @param string $required_css_class
     */
    public function set_required_css_class($required_css_class)
    {
        $this->_required_css_class = $required_css_class;
    }



    /**
     * @return string
     */
    public function required_css_class()
    {
        return $this->_required_css_class;
    }



    /**
     * Sets the help text, in case
     *
     * @param string $text
     */
    public function set_html_help_text($text)
    {
        $this->_html_help_text = $text;
    }



    /**
     * Uses the sensitive data removal strategy to remove the sensitive data from this
     * input. If there is any kind of sensitive data removal on this input, we clear
     * out the raw value completely
     *
     * @return void
     */
    public function clean_sensitive_data()
    {
        //if we do ANY kind of sensitive data removal on this, then just clear out the raw value
        //if we need more logic than this we'll make a strategy for it
        if ($this->_sensitive_data_removal_strategy
            && ! $this->_sensitive_data_removal_strategy instanceof EE_No_Sensitive_Data_Removal
        ) {
            $this->_set_raw_value(null);
        }
        //and clean the normalized value according to the appropriate strategy
        $this->_set_normalized_value(
            $this->get_sensitive_data_removal_strategy()->remove_sensitive_data(
                $this->_normalized_value
            )
        );
    }



    /**
     * @param bool   $primary
     * @param string $button_size
     * @param string $other_attributes
     */
    public function set_button_css_attributes($primary = true, $button_size = '', $other_attributes = '')
    {
        $button_css_attributes = 'button';
        $button_css_attributes .= $primary === true ? ' button-primary' : ' button-secondary';
        switch ($button_size) {
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
        $this->_button_css_attributes .= ! empty($other_attributes)
            ? $button_css_attributes . ' ' . $other_attributes
            : $button_css_attributes;
    }



    /**
     * @return string
     */
    public function button_css_attributes()
    {
        if (empty($this->_button_css_attributes)) {
            $this->set_button_css_attributes();
        }
        return $this->_button_css_attributes;
    }



    /**
     * find_form_data_for_this_section
     * using this section's name and its parents, finds the value of the form data that corresponds to it.
     * For example, if this form section's HTML name is my_form[subform][form_input_1],
     * then it's value should be in $_REQUEST at $_REQUEST['my_form']['subform']['form_input_1'].
     * (If that doesn't exist, we also check for this subsection's name
     * at the TOP LEVEL of the request data. Eg $_REQUEST['form_input_1'].)
     * This function finds its value in the form.
     *
     * @param array $req_data
     * @return mixed whatever the raw value of this form section is in the request data
     * @throws \EE_Error
     */
    public function find_form_data_for_this_section($req_data)
    {
        // break up the html name by "[]"
        if (strpos($this->html_name(), '[') !== false) {
            $before_any_brackets = substr($this->html_name(), 0, strpos($this->html_name(), '['));
        } else {
            $before_any_brackets = $this->html_name();
        }
        // grab all of the segments
        preg_match_all('~\[([^]]*)\]~', $this->html_name(), $matches);
        if (isset($matches[1]) && is_array($matches[1])) {
            $name_parts = $matches[1];
            array_unshift($name_parts, $before_any_brackets);
        } else {
            $name_parts = array($before_any_brackets);
        }
        // now get the value for the input
        $value = $this->_find_form_data_for_this_section_using_name_parts($name_parts, $req_data);
        // check if this thing's name is at the TOP level of the request data
        if ($value === null && isset($req_data[$this->name()])) {
            $value = $req_data[$this->name()];
        }
        return $value;
    }



    /**
     * @param array $html_name_parts
     * @param array $req_data
     * @return array | NULL
     */
    public function _find_form_data_for_this_section_using_name_parts($html_name_parts, $req_data)
    {
        $first_part_to_consider = array_shift($html_name_parts);
        if (isset($req_data[$first_part_to_consider])) {
            if (empty($html_name_parts)) {
                return $req_data[$first_part_to_consider];
            } else {
                return $this->_find_form_data_for_this_section_using_name_parts(
                    $html_name_parts,
                    $req_data[$first_part_to_consider]
                );
            }
        } else {
            return null;
        }
    }



    /**
     * Checks if this form input's data is in the request data
     *
     * @param array $req_data like $_POST
     * @return boolean
     * @throws \EE_Error
     */
    public function form_data_present_in($req_data = null)
    {
        if ($req_data === null) {
            $req_data = $_POST;
        }
        $checked_value = $this->find_form_data_for_this_section($req_data);
        if ($checked_value !== null) {
            return true;
        } else {
            return false;
        }
    }



    /**
     * Overrides parent to add js data from validation and display strategies
     *
     * @param array $form_other_js_data
     * @return array
     */
    public function get_other_js_data($form_other_js_data = array())
    {
        $form_other_js_data = $this->get_other_js_data_from_strategies($form_other_js_data);
        return $form_other_js_data;
    }



    /**
     * Gets other JS data for localization from this input's strategies, like
     * the validation strategies and the display strategy
     *
     * @param array $form_other_js_data
     * @return array
     */
    public function get_other_js_data_from_strategies($form_other_js_data = array())
    {
        $form_other_js_data = $this->get_display_strategy()->get_other_js_data($form_other_js_data);
        foreach ($this->get_validation_strategies() as $validation_strategy) {
            $form_other_js_data = $validation_strategy->get_other_js_data($form_other_js_data);
        }
        return $form_other_js_data;
    }



    /**
     * Override parent because we want to give our strategies an opportunity to enqueue some js and css
     *
     * @return void
     */
    public function enqueue_js()
    {
        //ask our display strategy and validation strategies if they have js to enqueue
        $this->enqueue_js_from_strategies();
    }



    /**
     * Tells strategies when its ok to enqueue their js and css
     *
     * @return void
     */
    public function enqueue_js_from_strategies()
    {
        $this->get_display_strategy()->enqueue_js();
        foreach ($this->get_validation_strategies() as $validation_strategy) {
            $validation_strategy->enqueue_js();
        }
    }
}
