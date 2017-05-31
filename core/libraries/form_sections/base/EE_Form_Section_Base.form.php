<?php
use EventEspresso\core\libraries\form_sections\strategies\filter\FormHtmlFilter;

if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * EE_Form_Section_Base
 * For shared functionality between form sections that are for display-only, and
 * sections for receiving form input etc.
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 */
abstract class EE_Form_Section_Base
{

    /**
     * the URL the form is submitted to
     *
     * @var string
     */
    protected $_action;

    /**
     * POST (default) or GET
     *
     * @var string
     */
    protected $_method;

    /**
     * html_id and html_name are derived from this by default
     *
     * @var string
     */
    protected $_name;

    /**
     * $_html_id
     * @var string
     */
    protected $_html_id;

    /**
     * $_html_class
     * @var string
     */
    protected $_html_class;

    /**
     * $_html_style
     * @var string
     */
    protected $_html_style;

    /**
     * $_other_html_attributes
     * @var string
     */
    protected $_other_html_attributes;

    /**
     * The form section of which this form section is a part
     *
     * @var EE_Form_Section_Proper
     */
    protected $_parent_section;

    /**
     * flag indicating that _construct_finalize has been called.
     * If it hasn't been called and we try to use functions which require it, we call it
     * with no parameters. But normally, _construct_finalize should be called by the instantiating class
     *
     * @var boolean
     */
    protected $_construction_finalized;

    /**
     * Strategy for parsing the form HTML upon display
     *
     * @var FormHtmlFilter
     */
    protected $_form_html_filter;



    /**
     * @param array $options_array {
     * @type        $name          string the name for this form section, if you want to explicitly define it
     *                             }
     */
    public function __construct($options_array = array())
    {
        // used by display strategies
        // assign incoming values to properties
        foreach ($options_array as $key => $value) {
            $key = '_' . $key;
            if (property_exists($this, $key) && empty($this->{$key})) {
                $this->{$key} = $value;
            }
        }
        // set parser which allows the form section's rendered HTML to be filtered
        if (isset($options_array['form_html_filter']) && $options_array['form_html_filter'] instanceof FormHtmlFilter) {
            $this->_form_html_filter = $options_array['form_html_filter'];
        }
    }



    /**
     * @param $parent_form_section
     * @param $name
     * @throws \EE_Error
     */
    protected function _construct_finalize($parent_form_section, $name)
    {
        $this->_construction_finalized = true;
        $this->_parent_section = $parent_form_section;
        if ($name !== null) {
            $this->_name = $name;
        }
    }



    /**
     * make sure construction finalized was called, otherwise children might not be ready
     *
     * @return void
     * @throws \EE_Error
     */
    public function ensure_construct_finalized_called()
    {
        if (! $this->_construction_finalized) {
            $this->_construct_finalize($this->_parent_section, $this->_name);
        }
    }



    /**
     * @return string
     */
    public function action()
    {
        return $this->_action;
    }



    /**
     * @param string $action
     */
    public function set_action($action)
    {
        $this->_action = $action;
    }



    /**
     * @return string
     */
    public function method()
    {
        return ! empty($this->_method) ? $this->_method : 'POST';
    }



    /**
     * @param string $method
     */
    public function set_method($method)
    {
        switch ($method) {
            case 'get' :
            case 'GET' :
                $this->_method = 'GET';
                break;
            default :
                $this->_method = 'POST';
        }
    }



    /**
     * Sets the html_id to its default value, if none was specified in the constructor.
     * Calculation involves using the name and the parent's html id
     * return void
     *
     * @throws \EE_Error
     */
    protected function _set_default_html_id_if_empty()
    {
        if (! $this->_html_id) {
            if ($this->_parent_section && $this->_parent_section instanceof EE_Form_Section_Proper) {
                $this->_html_id = $this->_parent_section->html_id()
                                  . '-'
                                  . $this->_prep_name_for_html_id($this->name());
            } else {
                $this->_html_id = $this->_prep_name_for_html_id($this->name());
            }
        }
    }



    /**
     * _prep_name_for_html_id
     *
     * @param $name
     * @return string
     */
    private function _prep_name_for_html_id($name)
    {
        return sanitize_key(str_replace(array('&nbsp;', ' ', '_'), '-', $name));
    }



    /**
     * Returns the HTML, JS, and CSS necessary to display this form section on a page.
     * Note however, it's recommended that you instead call enqueue_js on the "wp_enqueue_scripts" action,
     * and call get_html when you want to output the html. Calling get_html_and_js after
     * "wp_enqueue_scripts" has already fired seems to work for now, but is contrary
     * to the instructions on https://developer.wordpress.org/reference/functions/wp_enqueue_script/
     * and so might stop working anytime.
     *
     * @return string
     */
    public function get_html_and_js()
    {
        return $this->get_html();
    }



    /**
     * Gets the HTML for displaying this form section
     *
     * @return string
     */
    public abstract function get_html();



    /**
     * @param bool $add_pound_sign
     * @return string
     */
    public function html_id($add_pound_sign = false)
    {
        $this->_set_default_html_id_if_empty();
        return $add_pound_sign ? '#' . $this->_html_id : $this->_html_id;
    }



    /**
     * @return string
     */
    public function html_class()
    {
        return $this->_html_class;
    }



    /**
     * @return string
     */
    public function html_style()
    {
        return $this->_html_style;
    }



    /**
     * @param mixed $html_class
     */
    public function set_html_class($html_class)
    {
        $this->_html_class = $html_class;
    }



    /**
     * @param mixed $html_id
     */
    public function set_html_id($html_id)
    {
        $this->_html_id = $html_id;
    }



    /**
     * @param mixed $html_style
     */
    public function set_html_style($html_style)
    {
        $this->_html_style = $html_style;
    }



    /**
     * @param string $other_html_attributes
     */
    public function set_other_html_attributes($other_html_attributes)
    {
        $this->_other_html_attributes = $other_html_attributes;
    }



    /**
     * @return string
     */
    public function other_html_attributes()
    {
        return $this->_other_html_attributes;
    }



    /**
     * Gets the name of the form section. This is not the same as the HTML name.
     *
     * @throws EE_Error
     * @return string
     */
    public function name()
    {
        if (! $this->_construction_finalized) {
            throw new EE_Error(sprintf(__('You cannot use the form section\s name until _construct_finalize has been called on it (when we set the name). It was called on a form section of type \'s\'',
                'event_espresso'), get_class($this)));
        }
        return $this->_name;
    }



    /**
     * Gets the parent section
     *
     * @return EE_Form_Section_Proper
     */
    public function parent_section()
    {
        return $this->_parent_section;
    }



    /**
     * returns HTML for generating the opening form HTML tag (<form>)
     *
     * @param string $action           the URL the form is submitted to
     * @param string $method           POST (default) or GET
     * @param string $other_attributes anything else added to the form open tag, MUST BE VALID HTML
     * @return string
     */
    public function form_open($action = '', $method = '', $other_attributes = '')
    {
        if (! empty($action)) {
            $this->set_action($action);
        }
        if (! empty($method)) {
            $this->set_method($method);
        }
        $html = EEH_HTML::nl(1, 'form') . '<form';
        $html .= $this->html_id() !== '' ? ' id="' . $this->html_id() . '"' : '';
        $html .= ' action="' . $this->action() . '"';
        $html .= ' method="' . $this->method() . '"';
        $html .= $other_attributes . '>';
        return $html;
    }



    /**
     * returns HTML for generating the closing form HTML tag (</form>)
     *
     * @return string
     */
    public function form_close()
    {
        return EEH_HTML::nl(-1, 'form')
               . '</form>'
               . EEH_HTML::nl()
               . '<!-- end of ee-'
               . $this->html_id()
               . '-form -->'
               . EEH_HTML::nl();
    }



    /**
     * enqueues JS (and CSS) for the form (ie immediately call wp_enqueue_script and
     * wp_enqueue_style; the scripts could have optionally been registered earlier)
     * Default does nothing, but child classes can override
     *
     * @return void
     */
    public function enqueue_js()
    {
        //defaults to enqueue NO js or css
    }



    /**
     * Adds any extra data needed by js. Eventually we'll call wp_localize_script
     * with it, and it will be on each form section's 'other_data' property.
     * By default nothing is added, but child classes can extend this method to add something.
     * Eg, if you have an input that will cause a modal dialog to appear,
     * here you could add an entry like 'modal_dialog_inputs' to this array
     * to map between the input's html ID and the modal dialogue's ID, so that
     * your JS code will know where to find the modal dialog when the input is pressed.
     * Eg $form_other_js_data['modal_dialog_inputs']['some-input-id']='modal-dialog-id';
     *
     * @param array $form_other_js_data
     * @return array
     */
    public function get_other_js_data($form_other_js_data = array())
    {
        return $form_other_js_data;
    }



    /**
     * This isn't just the name of an input, it's a path pointing to an input. The
     * path is similar to a folder path: slash (/) means to descend into a subsection,
     * dot-dot-slash (../) means to ascend into the parent section.
     * After a series of slashes and dot-dot-slashes, there should be the name of an input,
     * which will be returned.
     * Eg, if you want the related input to be conditional on a sibling input name 'foobar'
     * just use 'foobar'. If you want it to be conditional on an aunt/uncle input name
     * 'baz', use '../baz'. If you want it to be conditional on a cousin input,
     * the child of 'baz_section' named 'baz_child', use '../baz_section/baz_child'.
     * Etc
     *
     * @param string|false $form_section_path we accept false also because substr( '../', '../' ) = false
     * @return EE_Form_Section_Base
     */
    public function find_section_from_path($form_section_path)
    {
        if (strpos($form_section_path, '/') === 0) {
            $form_section_path = substr($form_section_path, strlen('/'));
        }
        if (empty($form_section_path)) {
            return $this;
        }
        if (strpos($form_section_path, '../') === 0) {
            $parent = $this->parent_section();
            $form_section_path = substr($form_section_path, strlen('../'));
            if ($parent instanceof EE_Form_Section_Base) {
                return $parent->find_section_from_path($form_section_path);
            } elseif (empty($form_section_path)) {
                return $this;
            }
        }
        //couldn't find it using simple parent following
        return null;
    }


}
// End of file EE_Form_Section_Base.form.php