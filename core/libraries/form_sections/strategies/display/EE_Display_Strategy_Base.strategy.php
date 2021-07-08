<?php
/**
 * Class EE_Display_Strategy_Base
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Mike Nelson, Brent Christensen
 * @since                 4.6
 */
abstract class EE_Display_Strategy_Base extends EE_Form_Input_Strategy_Base
{


    /**
     * @var string $_tag
     */
    protected $_tag = '';





    /**
     * returns HTML and javascript related to the displaying of this input
     *
     * @return string
     */
    abstract public function display();



    /**
     * _remove_chars - takes an incoming string, and removes the string $chars from the end of it, but only if $chars
     * is already there
     *
     * @param string $string - the string being processed
     * @param string $chars  - exact string of characters to remove
     * @return string
     */
    protected function _remove_chars($string = '', $chars = '-')
    {
        $char_length = strlen($chars) * -1;
        // if last three characters of string is  " - ", then remove it
        return substr($string, $char_length) === $chars ? substr($string, 0, $char_length) : $string;
    }



    /**
     * _append_chars - takes an incoming string, and adds the string $chars to the end of it, but only if $chars is not
     * already there
     *
     * @param string $string - the string being processed
     * @param string $chars  - exact string of characters to be added to end of string
     * @return string
     */
    protected function _append_chars($string = '', $chars = '-')
    {
        return $this->_remove_chars($string, $chars) . $chars;
    }



    /**
     * Gets the HTML IDs of all the inputs
     *
     * @param bool $add_pound_sign
     * @return array
     */
    public function get_html_input_ids($add_pound_sign = false)
    {
        return array($this->get_input()->html_id($add_pound_sign));
    }



    /**
     * Adds js variables for localization to the $other_js_data. These should be put
     * in each form's "other_data" javascript object.
     *
     * @param array $other_js_data
     * @return array
     */
    public function get_other_js_data($other_js_data = array())
    {
        return $other_js_data;
    }



    /**
     * Opportunity for this display strategy to call wp_enqueue_script and wp_enqueue_style.
     * This should be called during wp_enqueue_scripts
     */
    public function enqueue_js()
    {
    }



    /**
     * returns string like: '<tag'
     *
     * @param string $tag
     * @return string
     */
    protected function _opening_tag($tag)
    {
        $this->_tag = $tag;
        return "<{$this->_tag}";
    }


    /**
     * returns '>'
     *
     * @return string
     */
    protected function _end_opening_tag()
    {
        return '>';
    }



    /**
     * returns string like: '</tag>
     *
     * @return string
     */
    protected function _closing_tag()
    {
        return "</{$this->_tag}>";
    }



    /**
     * returns string like: '/>'
     *
     * @return string
     */
    protected function _close_tag()
    {
        return '/>';
    }


    /**
     * returns an array of standard HTML attributes that get added to nearly all inputs,
     * where string keys represent named attributes like id, class, etc
     * and numeric keys represent single attributes like 'required'.
     * Note: this does not include "value" because many inputs (like dropdowns, textareas, and checkboxes) don't use
     * it.
     *
     * @return array
     * @throws EE_Error
     */
    protected function _standard_attributes_array()
    {
        return [
            'name'  => $this->_input->html_name(),
            'id'    => $this->_input->html_id(),
            'class' => $this->_input->html_class(true),
            0       => ['required', $this->_input->required()],
            1       => $this->_input->other_html_attributes(),
            'style' => $this->_input->html_style(),
        ];
    }


    /**
     * sets the attributes using the incoming array
     * and returns a string of all attributes rendered as valid HTML
     *
     * @param array $attributes
     * @return string
     */
    protected function _attributes_string($attributes = array())
    {
        $attributes = apply_filters(
            'FHEE__EE_Display_Strategy_Base__attributes_string__attributes',
            $attributes,
            $this,
            $this->_input
        );
        $filtered_attributes = array_filter(
            $attributes,
            function ($value, $attribute) {
                // always add 'value' attribute or arrays of attributes
                if ($attribute === 'value' || is_array($value)) {
                    return true;
                }
                // otherwise only add those with a value (ie: attribute has been set)
                return ! empty($value);
            },
            ARRAY_FILTER_USE_BOTH
        );
        $processed_attributes = [];
        foreach ($filtered_attributes as $attribute => $value) {
            $attribute = trim($attribute);
            if (is_numeric($attribute)) {
                $add = true;
                if (is_array($value)) {
                    $attribute = isset($value[0]) ? $value[0] : '';
                    $add = isset($value[1]) ? $value[1] : false;
                } else {
                    $attribute = $value;
                }
                $attribute_string = $this->_single_attribute($attribute, $add);
            } else {
                $attribute_string = $this->_attribute($attribute, $value);
            }
            $attribute_string = trim($attribute_string);
            if ($attribute_string) {
                $processed_attributes[] = trim($attribute_string);
            }
        }
        return ! empty($processed_attributes) ? ' ' . implode(' ', $processed_attributes) : '';
    }



    /**
     * returns string like: ' attribute="value"'
     * returns an empty string if $value is null
     *
     * @param string $attribute
     * @param string $value
     * @return string
     */
    protected function _attribute($attribute, $value = '')
    {
        if ($value === null) {
            return '';
        }
        $value = esc_attr(trim($value));
        return "{$attribute}=\"{$value}\"";
    }



    /**
     * returns string like: ' data-attribute="value"'
     * returns an empty string if $value is null
     *
     * @param string $attribute
     * @param string $value
     * @return string
     */
    protected function _data_attribute($attribute, $value = '')
    {
        if ($value === null) {
            return '';
        }
        $value = esc_attr($value);
        return "data-{$attribute}=\"{$value}\"";
    }



    /**
     * returns string like: ' attribute' if $add is true
     *
     * @param string  $attribute
     * @param boolean $add
     * @return string
     */
    protected function _single_attribute($attribute, $add = true)
    {
        $attribute = trim($attribute);
        return $add ? "{$attribute}" : '';
    }


    /**
     * @param string $tag
     * @param string $children
     * @return string
     * @throws EE_Error
     * @since   $VID:$
     */
    protected function fullDisplayString($tag, $children)
    {
        return EEH_HTML::nl(0, $tag)
               . $this->_opening_tag($tag)
               . $this->_attributes_string($this->_standard_attributes_array())
               . $this->_end_opening_tag()
               . $children
               . EEH_HTML::nl(0, $tag)
               . $this->_closing_tag();
    }
}
