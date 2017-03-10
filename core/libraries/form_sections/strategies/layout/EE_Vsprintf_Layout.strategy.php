<?php
defined('EVENT_ESPRESSO_VERSION') || exit('No direct access allowed');


/**
 * Allows client code to pass in a format string used as the first argument for
 * `vsprintf` and that will be included in vsprintf to include all the subsections
 * for the layout.
 *
 * @package    ${PluginName}
 * @subpackage ${context}
 * @author     Darren Ethier
 * @since      ${version}
 */
class EE_Vsprintf_Layout extends EE_No_Layout
{

    /**
     * Will hold the incoming format string to be used for the vsprintf first argument.
     * @var string
     */
    protected $_v_format = '';



    /**
     * EE_Vsprintf_Layout constructor.
     *
     * @param array $options  Expects an array with 'vsprintf_format' as a key to represent the format argument that
     *                        will be passed to the vsprintf function.  Make sure the number of placeholders matches
     *                        the number of subsections in your form.
     */
    public function __construct($options = array())
    {
        $this->_v_format = isset($options['vsprintf_format'])
            ? (string) $options['vsprintf_format']
            : '';
        parent::__construct($options);
    }



    public function layout_form_loop()
    {
        $vsprintf_args = array();
        foreach ($this->_form_section->subsections() as $name => $subsection) {
            if ($subsection instanceof EE_Form_Input_Base) {
                $vsprintf_args[$name] = apply_filters(
                    'FHEE__EE_Form_Section_Layout_Base__layout_form__loop_for_input_' . $name . '__in_' . $this->_form_section->name(),
                    $this->layout_input($subsection),
                    $this->_form_section,
                    $subsection
                );
            } elseif ($subsection instanceof EE_Form_Section_Base) {
                $vsprintf_args[$name] = apply_filters(
                    'FHEE__EE_Form_Section_Layout_Base__layout_form__loop_for_non_input_' . $name . '__in_' . $this->_form_section->name(),
                    $this->layout_subsection($subsection),
                    $this->_form_section,
                    $subsection
                );
            }
        }
        return vsprintf($this->_v_format, $vsprintf_args);
    }



}
