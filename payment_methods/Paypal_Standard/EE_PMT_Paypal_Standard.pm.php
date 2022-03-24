<?php

use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\RequestInterface;

/**
 *
 * Class EE_PMT_Paypal_Standard
 *
 * @package             Event Espresso
 * @subpackage          core
 * @author              Mike Nelson
 *
 *
 */
class EE_PMT_Paypal_Standard extends EE_PMT_Base
{
    const shipping_info_none     = 1;

    const shipping_info_optional = 0;

    const shipping_info_required = 2;


    /**
     * @param null $pm_instance
     * @throws EE_Error
     */
    public function __construct($pm_instance = null)
    {
        require_once($this->file_folder() . 'EEG_Paypal_Standard.gateway.php');
        $this->_gateway             = new EEG_Paypal_Standard();
        $this->_pretty_name         = esc_html__("PayPal Standard", 'event_espresso');
        $this->_default_description = sprintf(
            esc_html__(
                'Upon submitting this form, you will be forwarded to PayPal to make your payment. %1$sMake sure you return to this site in order to properly finalize your registration.%2$s',
                'event_espresso'
            ),
            '<strong>',
            '</strong>'
        );
        parent::__construct($pm_instance);
        $this->_default_button_url = $this->file_url() . 'lib/paypal-logo.png';
    }


    /**
     * Creates the billing form for this payment method type
     *
     * @param EE_Transaction $transaction
     * @return NULL
     */
    public function generate_new_billing_form(EE_Transaction $transaction = null)
    {
        return null;
    }


    /**
     * Gets the form for all the settings related to this payment method type
     *
     * @return EE_Payment_Method_Form
     * @throws EE_Error
     */
    public function generate_new_settings_form()
    {
        require_once($this->file_folder() . 'EE_Paypal_Standard_Form.form.php');
        $form = new EE_Paypal_Standard_Form($this);
        $form->get_input('PMD_debug_mode')->set_html_label_text(
            sprintf(esc_html__("Use PayPal Sandbox %s", 'event_espresso'), $this->get_help_tab_link())
        );
        $form->get_input('shipping_details')->set_html_label_text(
            sprintf(esc_html__("Shipping Address Options %s", "event_espresso"), $this->get_help_tab_link())
        );
        return $form;
    }


    /**
     * Adds the help tab
     *
     * @return array
     * @see EE_PMT_Base::help_tabs_config()
     */
    public function help_tabs_config()
    {
        return [
            $this->get_help_tab_name() => [
                'title'    => esc_html__("PayPal Standard Settings", 'event_espresso'),
                'filename' => 'payment_methods_overview_paypalstandard',
            ],
        ];
    }


    /**
     * Logic to be accomplished when the payment attempt is complete.
     * Most payment methods don't need to do anything at this point; but some, like Mijireh, do.
     * (Mijireh was an offsite gateway which doesn't send an IPN. So when the user returns to EE from
     * Mijireh, this method needs to be called so the Mijireh PM can ping Mijireh to know the status
     * of the payment). Fed a transaction because it's always assumed to be the last payment that
     *
     * @param EE_Transaction $transaction
     * @return EE_Payment
     * @throws EE_Error
     */
    public function finalize_payment_for($transaction)
    {
        /** @var RequestInterface $request */
        $request = LoaderFactory::getLoader()->getShared(RequestInterface::class);
        // PayPal standard actually sends the IPN info along with the user when they return to our site
        // so in case the IPN is arriving later, let's try to process an IPN!
        if ($request->getServerParam('REQUEST_METHOD') === 'POST') {
            return $this->handle_ipn($request->postParams(), $transaction);
        } else {
            return parent::finalize_payment_for($transaction);
        }
    }
}
