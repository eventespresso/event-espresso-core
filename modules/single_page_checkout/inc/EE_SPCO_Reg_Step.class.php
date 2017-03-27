<?php if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class EE_SPCO_Reg_Step
 * Description
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 * @since                 4.5.0
 */
abstract class EE_SPCO_Reg_Step
{

    /**
     *    $_completed - TRUE if this step has fully completed it's duties
     *
     * @access protected
     * @type bool $_completed
     */
    protected $_completed = false;

    /**
     *    $_is_current_step - TRUE if this is the current step
     *
     * @access protected
     * @type bool $_is_current_step
     */
    protected $_is_current_step = false;

    /**
     *    $_order - when the reg step should be run relative to other steps
     *
     * @access protected
     * @type int $_template
     */
    protected $_order = 0;

    /**
     *    $_slug - URL param for this step
     *
     * @access protected
     * @type string $_slug
     */
    protected $_slug;

    /**
     *    $_name - Step Name - translatable string
     *
     * @access protected
     * @type string $_slug
     */
    protected $_name;

    /**
     *    $_submit_button_text - translatable string that appears on this step's submit button
     *
     * @access protected
     * @type string $_slug
     */
    protected $_submit_button_text;

    /**
     *    $_template - template name
     *
     * @access protected
     * @type string $_template
     */
    protected $_template;

    /**
     *    $_reg_form_name - the form input name and id attribute
     *
     * @access protected
     * @var string $_reg_form_name
     */
    protected $_reg_form_name;

    /**
     *    $_success_message - text to display upon successful form submission
     *
     * @access private
     * @var string $_success_message
     */
    protected $_success_message;

    /**
     *    $_instructions - a brief description of how to complete the reg step. Usually displayed in conjunction with
     *    the previous step's success message.
     *
     * @access private
     * @var string $_instructions
     */
    protected $_instructions;

    /**
     *    $_valid_data - the normalized and validated data for this step
     *
     * @access public
     * @var array $_valid_data
     */
    protected $_valid_data = array();

    /**
     *    $reg_form - the registration form for this step
     *
     * @access public
     * @var EE_Form_Section_Proper $reg_form
     */
    public $reg_form;

    /**
     *    $checkout - EE_Checkout object for handling the properties of the current checkout process
     *
     * @access public
     * @var EE_Checkout $checkout
     */
    public $checkout;



    /**
     * @return void
     */
    abstract public function translate_js_strings();



    /**
     * @return void
     */
    abstract public function enqueue_styles_and_scripts();



    /**
     * @return boolean
     */
    abstract public function initialize_reg_step();



    /**
     * @return string
     */
    abstract public function generate_reg_form();



    /**
     * @return boolean
     */
    abstract public function process_reg_step();



    /**
     * @return boolean
     */
    abstract public function update_reg_step();



    /**
     * @return boolean
     */
    public function completed()
    {
        return $this->_completed;
    }



    /**
     * set_completed - toggles $_completed to TRUE
     */
    public function set_completed()
    {
        // DEBUG LOG
        //$this->checkout->log( __CLASS__, __FUNCTION__, __LINE__ );
        $this->_completed = apply_filters('FHEE__EE_SPCO_Reg_Step__set_completed___completed', true, $this);
    }



    /**
     * set_completed - toggles $_completed to FALSE
     */
    public function set_not_completed()
    {
        $this->_completed = false;
    }



    /**
     * @return string
     */
    public function name()
    {
        return $this->_name;
    }



    /**
     * @return string
     */
    public function slug()
    {
        return $this->_slug;
    }



    /**
     * submit_button_text
     * the text that appears on the reg step form submit button
     *
     * @return string
     */
    public function submit_button_text()
    {
        return $this->_submit_button_text;
    }



    /**
     * set_submit_button_text
     * sets the text that appears on the reg step form submit button
     *
     * @param string $submit_button_text
     */
    public function set_submit_button_text($submit_button_text = '')
    {
        if (! empty($submit_button_text)) {
            $this->_submit_button_text = $submit_button_text;
        } else if ($this->checkout->next_step instanceof EE_SPCO_Reg_Step) {
            if ($this->checkout->revisit) {
                $this->_submit_button_text = sprintf(__('Update %s', 'event_espresso'),
                    $this->checkout->current_step->name());
            } else {
                $this->_submit_button_text = sprintf(__('Proceed to %s', 'event_espresso'),
                    $this->checkout->next_step->name());
            }
        }
        // filters the submit button text
        $this->_submit_button_text = apply_filters(
            'FHEE__EE_SPCO_Reg_Step__set_submit_button_text___submit_button_text',
            $this->_submit_button_text,
            $this->checkout
        );
    }



    /**
     * @param boolean $is_current_step
     */
    public function set_is_current_step($is_current_step)
    {
        $this->_is_current_step = $is_current_step;
    }



    /**
     * @return boolean
     */
    public function is_current_step()
    {
        return $this->_is_current_step;
    }



    /**
     * @return boolean
     */
    public function is_final_step()
    {
        return $this instanceof EE_SPCO_Reg_Step_Finalize_Registration ? true : false;
    }



    /**
     * @param int $order
     */
    public function set_order($order)
    {
        $this->_order = $order;
    }



    /**
     * @return int
     */
    public function order()
    {
        return $this->_order;
    }



    /**
     * @return string
     */
    public function template()
    {
        return $this->_template;
    }



    /**
     * @return string
     */
    public function success_message()
    {
        return $this->_success_message;
    }



    /**
     * _set_success_message
     *
     * @param string $success_message
     */
    protected function _set_success_message($success_message)
    {
        $this->_success_message = $success_message;
    }



    /**
     * _reset_success_message
     *
     * @return void
     */
    protected function _reset_success_message()
    {
        $this->_success_message = '';
    }



    /**
     * @return string
     */
    public function _instructions()
    {
        return $this->_instructions;
    }



    /**
     * @param string $instructions
     */
    public function set_instructions($instructions)
    {
        $this->_instructions = apply_filters(
            'FHEE__EE_SPCO_Reg_Step__set_instructions__instructions',
            $instructions,
            $this
        );
    }



    /**
     * @param array $valid_data
     */
    public function set_valid_data($valid_data)
    {
        $this->_valid_data = $valid_data;
    }



    /**
     * @return array
     */
    public function valid_data()
    {
        if (empty($this->_valid_data)) {
            $this->_valid_data = $this->reg_form->valid_data();
        }
        return $this->_valid_data;
    }



    /**
     * @return string
     */
    public function reg_form_name()
    {
        if (empty($this->_reg_form_name)) {
            $this->set_reg_form_name('ee-spco-' . $this->slug() . '-reg-step-form');
        }
        return $this->_reg_form_name;
    }



    /**
     * @param string $reg_form_name
     */
    protected function set_reg_form_name($reg_form_name)
    {
        $this->_reg_form_name = $reg_form_name;
    }



    /**
     * reg_step_url
     *
     * @param string $action
     * @return string
     */
    public function reg_step_url($action = '')
    {
        $query_args = array('step' => $this->slug());
        if (! empty($action)) {
            $query_args['action'] = $action;
        }
        // final step has no display
        if ($this instanceof EE_SPCO_Reg_Step_Finalize_Registration && $action === 'display_spco_reg_step') {
            $query_args['action'] = 'process_reg_step';
        }
        if ($this->checkout->revisit) {
            $query_args['revisit'] = true;
        }
        if ($this->checkout->reg_url_link) {
            $query_args['e_reg_url_link'] = $this->checkout->reg_url_link;
        }
        return add_query_arg($query_args, $this->checkout->reg_page_base_url);
    }



    /**
     * creates the default hidden inputs section
     *
     * @return EE_Form_Section_Proper
     * @throws \EE_Error
     */
    public function reg_step_hidden_inputs()
    {
        // hidden inputs for admin registrations
        if ($this->checkout->admin_request) {
            return new EE_Form_Section_Proper(
                array(
                    'layout_strategy' => new EE_Div_Per_Section_Layout(),
                    'html_id'         => 'ee-' . $this->slug() . '-hidden-inputs',
                    'subsections'     => array(
                        'next_step' => new EE_Fixed_Hidden_Input(
                            array(
                                'html_name' => 'next_step',
                                'html_id'   => 'spco-' . $this->slug() . '-next-step',
                                'default'   => $this->checkout->next_step instanceof EE_SPCO_Reg_Step
                                    ? $this->checkout->next_step->slug() : '',
                            )
                        ),
                    ),
                )
            );
        } else {
            $default_form_action = apply_filters(
                'FHEE__EE_SPCO_Reg_Step__reg_step_hidden_inputs__default_form_action',
                empty($this->checkout->reg_url_link)
                    ? 'process_reg_step'
                    : 'update_reg_step',
                $this
            );
            // hidden inputs for frontend registrations
            return new EE_Form_Section_Proper(
                array(
                    'layout_strategy' => new EE_Div_Per_Section_Layout(),
                    'html_id'         => 'ee-' . $this->slug() . '-hidden-inputs',
                    'subsections'     => array(
                        'action'         => new EE_Fixed_Hidden_Input(
                            array(
                                'html_name' => 'action',
                                'html_id'   => 'spco-' . $this->slug() . '-action',
                                'default'   => $default_form_action,
                            )
                        ),
                        'next_step'      => new EE_Fixed_Hidden_Input(
                            array(
                                'html_name' => 'next_step',
                                'html_id'   => 'spco-' . $this->slug() . '-next-step',
                                'default'   => $this->checkout->next_step instanceof EE_SPCO_Reg_Step
                                    ? $this->checkout->next_step->slug() : '',
                            )
                        ),
                        'e_reg_url_link' => new EE_Fixed_Hidden_Input(
                            array(
                                'html_name' => 'e_reg_url_link',
                                'html_id'   => 'spco-reg_url_link',
                                'default'   => $this->checkout->reg_url_link,
                            )
                        ),
                        'revisit'        => new EE_Fixed_Hidden_Input(
                            array(
                                'html_name' => 'revisit',
                                'html_id'   => 'spco-revisit',
                                'default'   => $this->checkout->revisit,
                            )
                        ),
                    ),
                )
            );
        }
    }



    /**
     * generate_reg_form_for_actions
     *
     * @param array $actions
     * @return void
     */
    public function generate_reg_form_for_actions($actions = array())
    {
        $actions = array_merge(
            array(
                'generate_reg_form',
                'display_spco_reg_step',
                'process_reg_step',
                'update_reg_step',
            ), $actions
        );
        $this->checkout->generate_reg_form = in_array($this->checkout->action, $actions, true) ? true : false;
    }



    /**
     * @return string
     * @throws \EE_Error
     */
    public function display_reg_form()
    {
        $html = '';
        if ($this->reg_form instanceof EE_Form_Section_Proper) {
            $html .= ! $this->checkout->admin_request ? $this->reg_form->form_open($this->reg_step_url()) : '';
            if (EE_Registry::instance()->REQ->ajax) {
                $this->reg_form->localize_validation_rules();
                $this->checkout->json_response->add_validation_rules(EE_Form_Section_Proper::js_localization());
            }
            $html .= $this->reg_form->get_html();
            $html .= ! $this->checkout->admin_request ? $this->reg_step_submit_button() : '';
            $html .= ! $this->checkout->admin_request ? $this->reg_form->form_close() : '';
        }
        return $html;
    }



    /**
     * div_class - returns nothing for current step, but a css class of "hidden" for others
     *
     * @return string
     * @throws \EE_Error
     */
    public function reg_step_submit_button()
    {
        if (! $this->checkout->next_step instanceof EE_SPCO_Reg_Step) {
            return '';
        }
        ob_start();
        do_action('AHEE__before_spco_whats_next_buttons', $this->slug(), $this->checkout->next_step->slug(),
            $this->checkout);
        $html = ob_get_clean();
        // generate submit button
        $sbmt_btn = new EE_Submit_Input(array(
            'html_name'             => 'spco-go-to-step-' . $this->checkout->next_step->slug(),
            'html_id'               => 'spco-go-to-step-' . $this->checkout->next_step->slug(),
            'html_class'            => 'spco-next-step-btn',
            'other_html_attributes' => ' rel="' . $this->slug() . '"',
            'default'               => $this->submit_button_text(),
        ));
        $sbmt_btn->set_button_css_attributes(true, 'large');
        $sbmt_btn_html = $sbmt_btn->get_html_for_input();
        $html .= EEH_HTML::div(
            apply_filters('FHEE__EE_SPCO_Reg_Step__reg_step_submit_button__sbmt_btn_html', $sbmt_btn_html, $this),
            'spco-' . $this->slug() . '-whats-next-buttons-dv',
            'spco-whats-next-buttons'
        );
        return $html;
    }



    /**
     * div_class - returns nothing for current step, but a css class of "hidden" for others
     *
     * @return string
     */
    public function div_class()
    {
        return $this->is_current_step() ? '' : ' hidden';
    }



    /**
     * div_class - returns  a css class of "hidden" for current step, but nothing for others
     *
     * @return string
     */
    public function edit_lnk_url()
    {
        return add_query_arg(array('step' => $this->slug()), $this->checkout->reg_page_base_url);
    }



    /**
     * div_class - returns  a css class of "hidden" for current step, but nothing for others
     *
     * @return string
     */
    public function edit_link_class()
    {
        return $this->is_current_step() ? ' hidden' : '';
    }



    /**
     * update_checkout with changes that have been made to the cart
     *
     * @return void
     * @throws \EE_Error
     */
    public function update_checkout()
    {
        // grab the cart grand total and reset TXN total
        $this->checkout->transaction->set_total($this->checkout->cart->get_cart_grand_total());
        $this->checkout->stash_transaction_and_checkout();
    }



    /**
     *    __sleep
     * to conserve db space, let's remove the reg_form and the EE_Checkout object from EE_SPCO_Reg_Step objects upon
     * serialization EE_Checkout will handle the reimplementation of itself upon waking, but we won't bother with the
     * reg form, because if needed, it will be regenerated anyways
     *
     * @return array
     */
    public function __sleep()
    {
        // remove the reg form and the checkout
        return array_diff(array_keys(get_object_vars($this)), array('reg_form', 'checkout'));
    }



}
// End of file EE_SPCO_Reg_Step.class.php
// Location: /EE_SPCO_Reg_Step.class.php