<?php

/**
 * Class EED_Paypal_Smart_Buttons
 *
 * Description
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          $VID:$
 *
 */
class EED_Paypal_Smart_Buttons extends EED_Module
{
    public static function set_hooks()
    {
        add_action('wp_enqueue_scripts', array('EED_Paypal_Smart_Buttons','ee_pp_smart_buttons'));
        add_filter(
            'FHEE__EE_Radio_Button_Display_Strategy__display',
            array(
                'EED_Paypal_Smart_Buttons',
                'ee_pp_add_smart_button_to_pms',
            ),
            10,
            3
        );

    }

    public static function set_hooks_admin()
    {
        add_filter(
            'FHEE__EE_Radio_Button_Display_Strategy__display',
            array(
                'EED_Paypal_Smart_Buttons',
                'ee_pp_add_smart_button_to_pms',
            ),
            10,
            3
        );
    }


    /**
     * Enqueues the JS and CSS needed for the buttons
     */
    public static function ee_pp_smart_buttons()
    {
        wp_register_script('paypal_smart_buttons', 'https://www.paypalobjects.com/api/checkout.js');
        $this_dir_url = plugin_dir_url(__FILE__);
        wp_enqueue_script(
            'ee_paypal_smart_buttons',
            $this_dir_url . '/ee_pp_smart_buttons.js',
            array('paypal_smart_buttons', 'jquery', 'espresso_core', 'single_page_checkout'),
            '1.0.8',
            true);
        wp_enqueue_style(
            'ee_paypal_smart_buttons_style',
            $this_dir_url . '/ee_pp_smart_buttons.css'
        );
    }


    /**
     * Adds the DIV where the smart button will appear
     * @param $html
     * @param $display_strategy_instance
     * @param $input
     * @return string
     */
    public static function ee_pp_add_smart_button_to_pms($html, $display_strategy_instance, $input)
    {
        if($input->parent_section()->name() === 'available_payment_methods') {
            $html = '<div id="paypal-button-container"></div>' . $html;
        }
        return $html;
    }

    /**
     *    run - initial module setup
     *    this method is primarily used for activating resources in the EE_Front_Controller thru the use of filters
     *
     * @access    public
     * @var            WP $WP
     * @return    void
     */
    public function run($WP)
    {
        // nothing to do here
    }
}
// End of file EED_Paypal_Smart_Buttons.php
// Location: ${NAMESPACE}/EED_Paypal_Smart_Buttons.php
