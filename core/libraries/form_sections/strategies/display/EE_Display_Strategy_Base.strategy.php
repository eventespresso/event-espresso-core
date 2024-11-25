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
    protected string $_tag = '';


    /**
     * returns HTML and javascript related to the displaying of this input
     *
     * @return string
     */
    abstract public function display(): string;


    /**
     * _remove_chars - takes an incoming string, and removes the string $chars from the end of it, but only if $chars
     * is already there
     *
     * @param string $string - the string being processed
     * @param string $chars  - exact string of characters to remove
     * @return string
     */
    protected function _remove_chars(string $string = '', string $chars = '-'): string
    {
        $char_length = strlen($chars) * -1;
        // if last three characters of string is  " - ", then remove it
        return substr($string, $char_length) === $chars
            ? substr($string, 0, $char_length)
            : $string;
    }


    /**
     * _append_chars - takes an incoming string, and adds the string $chars to the end of it, but only if $chars is not
     * already there
     *
     * @param string $string - the string being processed
     * @param string $chars  - exact string of characters to be added to end of string
     * @return string
     */
    protected function _append_chars(string $string = '', string $chars = '-'): string
    {
        return $this->_remove_chars($string, $chars) . $chars;
    }


    /**
     * Gets the HTML IDs of all the inputs
     *
     * @param bool $add_pound_sign
     * @return array
     * @throws EE_Error
     */
    public function get_html_input_ids(bool $add_pound_sign = false): array
    {
        return [$this->get_input()->html_id($add_pound_sign)];
    }


    /**
     * Adds js variables for localization to the $other_js_data. These should be put
     * in each form's "other_data" javascript object.
     *
     * @param array $other_js_data
     * @return array
     */
    public function get_other_js_data(array $other_js_data = []): array
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
    protected function _opening_tag(string $tag): string
    {
        $this->_tag = $tag;
        return "<$this->_tag";
    }


    /**
     * returns string like: '</tag>
     *
     * @return string
     */
    protected function _closing_tag(): string
    {
        return "</$this->_tag>";
    }


    /**
     * returns string like: '/>'
     *
     * @return string
     */
    protected function _close_tag(): string
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
    protected function _standard_attributes_array(): array
    {
        $attributes = [
            'name'  => $this->_input->html_name(),
            'id'    => $this->_input->html_id(),
            'class' => $this->_input->html_class(true),
            0       => ['required', $this->_input->required()],
            1       => $this->_input->other_html_attributes(),
            'style' => $this->_input->html_style(),
        ];
        if ($this->_input->hasLabel()) {
            $attributes['aria-labelledby'] = $this->_input->html_label_id();
        }
        return $attributes;
    }


    /**
     * sets the attributes using the incoming array
     * and returns a string of all attributes rendered as valid HTML
     *
     * @param array $attributes
     * @return string
     */
    protected function _attributes_string(array $attributes = []): string
    {
        $attributes        = apply_filters(
            'FHEE__EE_Display_Strategy_Base__attributes_string__attributes',
            $attributes,
            $this,
            $this->_input
        );
        $attributes_string = '';
        foreach ($attributes as $attribute => $value) {
            if ($attribute !== 'value' && empty($value)) {
                continue;
            }
            if (is_numeric($attribute)) {
                $add = true;
                if (is_array($value)) {
                    $attribute = $value[0] ?? '';
                    $add       = $value[1] ?? false;
                } else {
                    $attribute = $value;
                }
                $attributes_string .= $this->_single_attribute($attribute, $add);
            } else {
                $attributes_string .= $this->_attribute($attribute, $value);
            }
        }
        return $attributes_string;
    }


    /**
     * returns string like: ' attribute="value"'
     * returns an empty string if $value is null
     *
     * @param string $attribute
     * @param string $value
     * @return string
     */
    protected function _attribute(string $attribute, string $value = ''): string
    {
        if ($value === null) {
            return '';
        }
        $value = esc_attr(trim($value));
        // don't add the attribute if the value is empty, unless the attribute is 'value'
        return $value || $attribute === 'value' ? " $attribute=\"$value\"" : '';
    }


    /**
     * returns string like: ' data-attribute-one="value-one" data-attribute-two="value-two"'
     *
     * @param array $data
     * @return string
     */
    protected function dataAttributesString(array $data): string
    {
        $data_attributes = '';
        foreach ($data as $attribute => $value) {
            $data_attributes .= $this->_data_attribute($attribute, $value);
        }
        return $data_attributes;
    }


    /**
     * returns string like: ' data-attribute="value"'
     * returns an empty string if $value is null
     *
     * @param string $attribute
     * @param string $value
     * @return string
     */
    protected function _data_attribute(string $attribute, string $value = ''): string
    {
        $attribute = strpos($attribute, 'data-') !== 0 ? "data-$attribute" : $attribute;
        return $this->_attribute($attribute, $value);
    }


    /**
     * returns string like: ' attribute' if $add is true
     *
     * @param string  $attribute
     * @param boolean $add
     * @return string
     */
    protected function _single_attribute(string $attribute, bool $add = true): string
    {
        $attribute = trim($attribute);
        return $attribute && $add ? " $attribute" : '';
    }
}
