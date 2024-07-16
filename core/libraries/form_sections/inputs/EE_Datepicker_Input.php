<?php

/**
 * EE_Datepicker_Input
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 */
class EE_Datepicker_Input extends EE_Form_Input_Base
{
    private bool $use_jquery_ui;


    /**
     * @param array $input_settings
     */
    public function __construct($input_settings = [], $use_jquery_ui = false)
    {
        $this->use_jquery_ui = (bool) apply_filters('FHEE__EE_Datepicker_Input__use_jquery_ui', $use_jquery_ui);
        $type                = $this->use_jquery_ui ? 'datepicker' : 'date';
        $this->_set_display_strategy(new EE_Text_Input_Display_Strategy($type));
        $this->_set_normalization_strategy(new EE_Text_Normalization());
        // we could do better for validation, but at least verify its plaintext
        $this->_add_validation_strategy(
            new EE_Plaintext_Validation_Strategy($input_settings['validation_error_message'] ?? null)
        );
        parent::__construct($input_settings);
        $this->set_html_class($this->html_class() . " $type");

        if ($this->use_jquery_ui) {
            // add some style and make it dance
            add_action('wp_enqueue_scripts', ['EE_Datepicker_Input', 'enqueue_styles_and_scripts']);
            add_action('admin_enqueue_scripts', ['EE_Datepicker_Input', 'enqueue_styles_and_scripts']);
        }
    }


    /**
     *    enqueue_styles_and_scripts
     *
     * @access        public
     * @return        void
     */
    public static function enqueue_styles_and_scripts()
    {
        // load css
        wp_register_style(
            'espresso-ui-theme',
            EE_GLOBAL_ASSETS_URL . 'css/espresso-ui-theme/jquery-ui-1.10.3.custom.min.css',
            [],
            EVENT_ESPRESSO_VERSION
        );
        wp_enqueue_style('espresso-ui-theme');
    }


    /**
     * converts the raw value into a date strimg in the format Y-m-d
     * unless we're using jquery ui, in which case we just return the raw value
     *
     * @return string
     * @throws Exception
     */
    public function raw_value_in_form(): string
    {
        if ($this->use_jquery_ui || ! $this->raw_value()) {
            return parent::raw_value_in_form();
        }
        $date = DateTime::createFromFormat(get_option('date_format', 'Y-m-d'), $this->raw_value());
        return $date instanceof DateTime ? $date->format('Y-m-d') : $this->raw_value();
    }
}
