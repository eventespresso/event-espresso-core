<?php

namespace EventEspresso\core\domain\services\admin\privacy\policy;

use EE_Offsite_Gateway;
use EE_Onsite_Gateway;
use EEH_Template;
use EEM_Payment_Method;
use EventEspresso\core\domain\values\session\SessionLifespan;
use EventEspresso\core\services\privacy\policy\PrivacyPolicyInterface;

/**
 * Class PrivacyPolicy
 * Class describes the Event Espresso core plugin's privacy policy.
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          4.9.62.p
 */
class PrivacyPolicy implements PrivacyPolicyInterface
{

    /**
     * @var EEM_Payment_Method
     */
    protected $payment_method_model;

    /**
     * @var SessionLifespan
     */
    protected $session_lifespan;

    /**
     * PrivacyPolicy constructor.
     *
     * @param EEM_Payment_Method $payment_method_model
     * @param SessionLifespan    $session_lifespan
     */
    public function __construct(EEM_Payment_Method $payment_method_model, SessionLifespan $session_lifespan)
    {
        $this->payment_method_model = $payment_method_model;
        $this->session_lifespan = $session_lifespan;
    }


    /**
     * Returns the name of the plugin and will be shown in the privacy policy's postbox header
     *
     * @return string
     */
    public function getName()
    {
        return esc_html__('Event Espresso', 'event_espresso');
    }


    /**
     * Gets the HTML for the privacy policy. May be dynamic
     *
     * @return string
     */
    public function getContent()
    {
        // do they have any offsite payment methods? or onsite payment methods?
        $active_payment_methods = $this->payment_method_model->get_all_active(EEM_Payment_Method::scope_cart);
        $active_onsite_pms = array();
        $active_offsite_pms = array();
        foreach ($active_payment_methods as $payment_method) {
            if ($payment_method->type_obj() instanceof \EE_PMT_Base) {
                if ($payment_method->type_obj()->get_gateway() instanceof EE_Onsite_Gateway) {
                    $active_onsite_pms[] = $payment_method->name();
                } elseif ($payment_method->type_obj()->get_gateway() instanceof EE_Offsite_Gateway) {
                    $active_offsite_pms[] = $payment_method->name();
                }
            }
        }
        $session_lifespan_in_hours = round($this->session_lifespan->inSeconds() / HOUR_IN_SECONDS);
        return (string) EEH_Template::display_template(
            __DIR__ . '/privacy_policy.template.php',
            array(
                'active_onsite_payment_methods' => $active_onsite_pms,
                'active_offsite_payment_methods' => $active_offsite_pms,
                'session_lifespan' => sprintf(
                    _nx(
                        '%1$s hour',
                        '%1$s hours',
                        $session_lifespan_in_hours,
                        '2 hours',
                        'event_espresso'
                    ),
                    $session_lifespan_in_hours
                )
            ),
            true
        );
    }
}
// End of file PrivacyPolicy.php
// Location: EventEspresso\core\domain\services\admin\privacy\policy\PrivacyPolicy.php
