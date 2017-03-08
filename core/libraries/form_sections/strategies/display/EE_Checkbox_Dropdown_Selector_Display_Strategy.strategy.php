<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class EE_Checkbox_Dropdown_Selector_Display_Strategy
 * displays a set of checkbox inputs in a hidden modal box that appears when you click the button/selector
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         $VID:$
 */
class EE_Checkbox_Dropdown_Selector_Display_Strategy extends EE_Compound_Input_Display_Strategy
{


    /**
     * enqueues css and js, so that this can be called statically
     */
    public static function enqueue_styles_and_scripts()
    {
        wp_register_style(
            'checkbox_dropdown_selector',
            EE_GLOBAL_ASSETS_URL . 'css/checkbox_dropdown_selector.css',
            array('espresso_default'),
            EVENT_ESPRESSO_VERSION
        );
        wp_enqueue_style('checkbox_dropdown_selector');
        wp_register_script(
            'checkbox_dropdown_selector',
            EE_GLOBAL_ASSETS_URL . 'scripts/checkbox_dropdown_selector.js',
            array('jquery'),
            EVENT_ESPRESSO_VERSION,
            true
        );
        wp_enqueue_script('checkbox_dropdown_selector');
    }



    /**
     * Informs the rest of the forms system what CSS and JS is needed to display the input
     */
    public function enqueue_js(){
        EE_Checkbox_Dropdown_Selector_Display_Strategy::enqueue_styles_and_scripts();
    }



    /**
     * callback for Iframe::addStylesheets() child class methods
     *
     * @param array $iframe_css
     * @return array
     */
    public function iframe_css(array $iframe_css){
        $iframe_css['checkbox_dropdown_selector'] = EE_GLOBAL_ASSETS_URL . 'css/checkbox_dropdown_selector.css';
        return $iframe_css;
    }



    /**
     * callback for Iframe::addScripts() child class methods
     *
     * @param array $iframe_js
     * @return array
     */
    public function iframe_js(array $iframe_js){
        $iframe_js['checkbox_dropdown_selector'] = EE_GLOBAL_ASSETS_URL . 'scripts/checkbox_dropdown_selector.js';
        return $iframe_js;
    }


    /**
     * @throws EE_Error
     * @return string of html to display the field
     */
    public function display()
    {
        $input = $this->get_input();
        $select_button_text = $input instanceof EE_Checkbox_Dropdown_Selector_Input ? $input->select_button_text() : '';
        // $multi = count( $input->options() ) > 1 ? TRUE : FALSE;
        $input->set_label_sizes();
        $label_size_class = $input->get_label_size_class();
        if ( ! is_array($input->raw_value()) && $input->raw_value() !== null) {
            EE_Error::doing_it_wrong(
                'EE_Checkbox_Display_Strategy::display()',
                sprintf(
                    esc_html__(
                        'Input values for checkboxes should be an array of values, but the value for input "%1$s" is "%2$s". Please verify that the input name is exactly "%3$s"',
                        'event_espresso'
                    ),
                    $input->html_id(),
                    var_export($input->raw_value(), true),
                    $input->html_name() . '[]'
                ),
                '4.8.1'
            );
        }


        $html = \EEH_HTML::div('', '', 'checkbox-dropdown-selector-wrap-dv');
        $html .= '<button id="' . $input->html_id() . '-btn"';
        // $html .= ' name="' . $input->html_name() . '"';
        $html .= ' class="' . $input->html_class() . ' checkbox-dropdown-selector-btn button-secondary button"';
        $html .= ' style="' . $input->html_style() . '"';
        $html .= ' data-target="' . $input->html_id() . '-options-dv"';
        $html .= ' ' . $input->html_other_attributes() . '>';
        $html .= '<span class="checkbox-dropdown-selector-selected-spn">';
        $html .= $select_button_text;
        $html .= '</span> <span class="dashicons dashicons-arrow-down"></span>';
        $html .= '</button>';
        $html .= EEH_HTML::div(
            '',
            $input->html_id() . '-options-dv',
            'checkbox-dropdown-selector'
        );
        $html .= EEH_HTML::link(
            '',
            '<span class="dashicons dashicons-no"></span>',
            esc_html__('close datetime selector', 'event_espresso'),
            '',
            'close-espresso-notice'
        );
        $html .= EEH_HTML::ul();
        $input_raw_value = (array)$input->raw_value();
        foreach ($input->options() as $value => $display_text) {
            $html .= EEH_HTML::li();
            $value = $input->get_normalization_strategy()->unnormalize_one($value);
            $html_id = $this->get_sub_input_id($value);
            $html .= EEH_HTML::nl(0, 'checkbox');
            $html .= '<label for="'
                     . $html_id
                     . '" id="'
                     . $html_id
                     . '-lbl" class="ee-checkbox-label-after'
                     . $label_size_class
                     . '">';
            $html .= EEH_HTML::nl(1, 'checkbox');
            $html .= '<input type="checkbox"';
            $html .= ' name="' . $input->html_name() . '[]"';
            $html .= ' id="' . $html_id . '"';
            $html .= ' class="' . $input->html_class() . '-option"';
            $html .= ' style="' . $input->html_style() . '"';
            $html .= ' value="' . esc_attr($value) . '"';
            $html .= ! empty($input_raw_value) && in_array($value, $input_raw_value, true)
                ? ' checked="checked"'
                : '';
            $html .= ' ' . $this->_input->other_html_attributes();
            $html .= '>';
            $html .= '<span class="datetime-selector-option-text-spn">' . $display_text . '</span>';
            $html .= EEH_HTML::nl(-1, 'checkbox') . '</label>';
            $html .= EEH_HTML::lix();
        }
        $html .= EEH_HTML::ulx();
        $html .= EEH_HTML::divx();
        $html .= EEH_HTML::divx();
        $html .= \EEH_HTML::br();
        return $html;
    }



}