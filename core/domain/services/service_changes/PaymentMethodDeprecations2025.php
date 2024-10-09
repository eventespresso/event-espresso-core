<?php

namespace EventEspresso\core\domain\services\service_changes;

use DateTime;
use EE_Error;
use EE_Payment_Method;
use EEM_Payment_Method;
use EventEspresso\core\domain\entities\notifications\PersistentAdminNotice;
use EventEspresso\core\services\notifications\PersistentAdminNoticeManager;
use ReflectionException;

/**
 * Class PaymentMethodDeprecations2025
 *
 *  Manages the deprecation of certain payment methods by displaying admin notices
 *  to inform users about the upcoming changes and encouraging them to migrate to
 *  newer payment integrations. It handles the activation and deactivation of
 *  deprecated payment methods and ensures that appropriate notices are shown
 *  based on the current date.
 *
 * @package     Event Espresso
 * @subpackage  EventEspresso\core\domain\services\notifications
 * @author      Brent Christensen
 * @since       5.0.28.p
 */
class PaymentMethodDeprecations2025
{
    public const  PM_DEPRECATION_DATE       = '2025-01-15';

    private const NOTIFICATION_DATE_WARNING = '2024-12-01';

    private const NOTIFICATION_DATE_URGENT  = '2025-01-01';

    private const TYPE_INITIAL              = 'initial';

    private const TYPE_WARNING              = 'warning';

    private const TYPE_URGENT               = 'urgent';

    private const TYPE_FINAL                = 'final';

    private const URL_ACCEPT                = 'https://eventespresso.com/product/eea-authorizenet-accept/';

    private const URL_STRIPE                = 'https://eventespresso.com/product/eea-stripe-gateway/';

    private const URL_SQUARE                = 'https://eventespresso.com/product/eea-square-gateway/';



    private EEM_Payment_Method $payment_method_model;

    private ?array $active_deprecated_payment_methods = null;

    private array $deprecated_payment_methods = [
        'aim'                  => 'aim',
        'authorizenet_sim'     => 'authorizenet_sim',
        'braintree_dropin'     => 'braintree_dropin',
        'payflow_pro_onsite'   => 'payflow_pro_onsite',
        'paypal_express'       => 'paypal_express',
        'paypal_pro'           => 'paypal_pro',
        'paypal_smart_buttons' => 'paypal_smart_buttons',
        'paypal_standard'      => 'paypal_standard',
    ];

    private Datetime $deprecation_date;

    private Datetime $now;


    /**
     * @param EEM_Payment_Method $payment_method_model
     */
    public function __construct(EEM_Payment_Method $payment_method_model)
    {
        $this->payment_method_model = $payment_method_model;
        $this->deprecation_date     = new DateTime(self::PM_DEPRECATION_DATE);
        $this->now                  = new Datetime('now');
        // TODO: remove the following comments before release
        // uncomment next line to trigger warning notice
        // $this->now = new Datetime('2024-12-10'); // Dec 10, 2024
        // uncomment next line to trigger urgent notice
        // $this->now = new Datetime('2025-01-10'); // Jan 10, 2025
        // uncomment next line to trigger final notice & PM deactivation
        // $this->now = new Datetime('2025-02-10'); // Feb 10, 2025
        // uncomment the following block of code to "unhide" PMs
        // add_filter(
        //     'FHEE__EventEspresso_PaymentMethods_Manager__hidePaymentMethods__pms_can_hide',
        //     fn() => []
        // );
        // uncomment the following to display ALL notices regardless of dates
        // $this->displayNotification(self::TYPE_INITIAL);
        // $this->displayNotification(self::TYPE_WARNING);
        // $this->displayNotification(self::TYPE_URGENT);
        // $this->displayNotification(self::TYPE_FINAL);
    }


    /**
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setHooks()
    {
        $this->deactivateDeprecatedPaymentMethods();
        // don't bother if we're 6 months past the deprecation date
        if ($this->now > $this->deprecation_date->modify('+6 months')) {
            return;
        }
        // check for deprecated payment methods on every request
        // jumping in at priority 0 before persistent admin notices are loaded
        add_action(
            'admin_notices',
            [$this, 'loadAdminNotices'],
            0
        );
        // check again whenever a payment method is activated
        add_action(
            'AHEE__EE_Payment_Method_Manager__activate_a_payment_method_of_type__after_activation',
            [$this, 'maybeDismissNotifications']
        );
        // and also when a payment method is deactivated
        add_action(
            'AHEE__EE_Payment_Method_Manager__deactivate_payment_method__after_deactivating_payment_method',
            [$this, 'paymentMethodDeactivation']
        );
    }


    /**
     * If there are no active deprecated payment methods, then dismiss all notices.
     * Callback for the `AHEE__EE_Payment_Method_Manager__activate_a_payment_method_of_type__after_activation` action.
     *
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function maybeDismissNotifications()
    {
        if (! $this->activeDeprecatedPaymentMethods()) {
            $notices = [
                'pm-deprecations-2025-initial',
                'pm-deprecations-2025-warning',
                'pm-deprecations-2025-urgent',
            ];
            foreach ($notices as $notice) {
                PersistentAdminNoticeManager::dismissPersistentAdminNotice($notice);
            }
        }
    }


    /**
     * If the payment method being deactivated is in the deprecated list,
     * then we need to check if there are any other deprecated payment methods still active.
     * `AHEE__EE_Payment_Method_Manager__deactivate_payment_method__after_deactivating_payment_method` callback
     *
     * @param string $payment_method_slug
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function paymentMethodDeactivation(string $payment_method_slug)
    {
        if (in_array($payment_method_slug, array_keys($this->deprecated_payment_methods), true)) {
            $this->maybeDismissNotifications();
        }
    }


    /**
     * IF we are past the deprecation date, then deactivate any active deprecated payment methods
     *
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function deactivateDeprecatedPaymentMethods()
    {
        if ($this->now >= $this->deprecation_date) {
            $active_deprecated_payment_methods = $this->activeDeprecatedPaymentMethods();
            foreach ($active_deprecated_payment_methods as $active_deprecated_pm) {
                if ($active_deprecated_pm instanceof EE_Payment_Method) {
                    $active_deprecated_pm->deactivate();
                    unset($this->active_deprecated_payment_methods[ $active_deprecated_pm->slug() ]);
                }
            }
            $this->maybeDismissNotifications();
            // get the PM Manager to hide the deprecated PMs
            add_filter(
                'FHEE__EventEspresso_PaymentMethods_Manager__hidePaymentMethods__pms_can_hide',
                [$this, 'hideDeprecatedPaymentMethods']
            );
        }
    }


    /**
     * adds the list of deprecated PMs to the list of PMs to remove from the UI
     * Callback for FHEE__EventEspresso_PaymentMethods_Manager__hidePaymentMethods__pms_can_hide
     *
     * @param array $pms_can_hide
     * @return array
     */
    public function hideDeprecatedPaymentMethods(array $pms_can_hide): array
    {
        return array_merge($pms_can_hide, $this->deprecated_payment_methods);
    }


    /**
     * Returns an array of deprecated payment methods that are currently active
     *
     * @return EE_Payment_Method[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function activeDeprecatedPaymentMethods(): array
    {
        if ($this->active_deprecated_payment_methods === null) {
            $this->active_deprecated_payment_methods = [];
            $deprecated_payment_methods              = $this->payment_method_model->get_all(
                [['PMD_slug' => ['IN', array_keys($this->deprecated_payment_methods)]]]
            );
            if (! $deprecated_payment_methods) {
                return $this->active_deprecated_payment_methods;
            }
            foreach ($deprecated_payment_methods as $deprecated_pm) {
                if ($deprecated_pm instanceof EE_Payment_Method && $deprecated_pm->active()) {
                    $this->active_deprecated_payment_methods[ $deprecated_pm->slug() ] = $deprecated_pm;
                }
            }
        }
        return $this->active_deprecated_payment_methods;
    }


    /**
     * If there are any deprecated payment methods active,
     * then load the appropriate admin notices based on the current date.
     * Callback for the `admin_notices` action.
     *
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function loadAdminNotices()
    {
        if ($this->activeDeprecatedPaymentMethods()) {
            if ($this->now < new DateTime(self::NOTIFICATION_DATE_WARNING)) {
                $this->displayNotification(self::TYPE_INITIAL);
                return;
            }
            if ($this->now < new DateTime(self::NOTIFICATION_DATE_URGENT)) {
                $this->displayNotification(self::TYPE_WARNING);
                return;
            }
            if ($this->now < new DateTime(self::PM_DEPRECATION_DATE)) {
                $this->displayNotification(self::TYPE_URGENT);
                return;
            }
        }
        if ($this->now > new DateTime(self::PM_DEPRECATION_DATE)) {
            $this->displayNotification(self::TYPE_FINAL);
        }
    }


    /**
     * @param string $type
     * @return void
     */
    private function displayNotification(string $type)
    {
        switch ($type) {
            case self::TYPE_WARNING:
                $name        = 'pm-deprecations-2025-warning';
                $notice_type = 'attention';
                break;
            case self::TYPE_URGENT:
                $name        = 'pm-deprecations-2025-urgent';
                $notice_type = 'warning';
                break;
            case self::TYPE_FINAL:
                $name        = 'pm-deprecations-2025-final';
                $notice_type = 'error';
                break;
            case self::TYPE_INITIAL:
            default:
                $name        = 'pm-deprecations-2025-initial';
                $notice_type = 'info';
        }

        $message = sprintf(
            '
            <h3>%1$s</h3>
            %2$s
            <span class="dashicons dashicons-bank dashicons--huge"></span>',
            $this->heading($type),
            $this->firstPg($type)
            . $this->theFollowingPaymentsPg()
            . $this->whatYouNeedToDoPg($type)
            . $this->toMigratePg()
            . $this->supportPg()
        );

        new PersistentAdminNotice(
            $name,
            $message,
            $notice_type === 'warning',
            'manage_options',
            'view persistent admin notice',
            false,
            $notice_type,
            'ee-service-change'
        );
    }


    private function heading(string $type = self::TYPE_INITIAL): string
    {
        switch ($type) {
            case self::TYPE_WARNING:
                return esc_html__(
                    'Urgent Reminder: To continue processing payments, migrate to a new payment integration today.',
                    'event_espresso'
                );
            case self::TYPE_URGENT:
                return esc_html__(
                    'Immediate Action Required: To continue processing payments, migrate to a new payment integration NOW!',
                    'event_espresso'
                );
            case self::TYPE_FINAL:
                return esc_html__('Payment Gateway Integrations Deactivated!', 'event_espresso');
            case self::TYPE_INITIAL:
            default:
                return esc_html__(
                    'Action Required: To continue processing payments, migrate to a new payment integration soon.',
                    'event_espresso'
                );
        }
    }


    private function firstPg(string $type = self::TYPE_INITIAL): string
    {
        switch ($type) {
            case self::TYPE_WARNING:
                return sprintf(
                    esc_html__(
                        '%1$sRemember, we will soon deprecate and remove the following outdated or obsolete payment integrations and ask you to migrate to a new payment integration as soon as possible. Our replacement payment integrations offer more features and security.%2$s',
                        'event_espresso'
                    ),
                    '<p>',
                    '</p>'
                );
            case self::TYPE_URGENT:
                $date = new DateTime(self::PM_DEPRECATION_DATE);
                return sprintf(
                    esc_html__(
                        '%1$sOn %3$s we will deprecate and remove the following outdated or obsolete payment integrations and ask you to migrate to a new payment integration now. Our replacement payment integrations offer more features and security.%2$s',
                        'event_espresso'
                    ),
                    '<p>',
                    '</p>',
                    $date->format('F jS, Y')
                );
            case self::TYPE_FINAL:
                return sprintf(
                    esc_html__(
                        '%1$sThe following payment integrations have been deactivated: PayPal Standard, PayPal Express, PayPal Smart Buttons, PayPal Pro, Braintree, Payflow Pro, Authorize.net SIM and Authorize.net AIM.%2$s',
                        'event_espresso'
                    ),
                    '<p>',
                    '</p>'
                );
            case self::TYPE_INITIAL:
            default:
                return sprintf(
                    esc_html__(
                        '%1$sIn early 2025 we will be deprecating the following outdated or obsolete payment integrations and ask you to migrate to a new payment integration as soon as possible. Our replacement payment integrations offer more features and security.%2$s',
                        'event_espresso'
                    ),
                    '<p>',
                    '</p>'
                );
        }
    }


    private function theFollowingPaymentsPg(): string
    {
        return sprintf(
            esc_html__(
                '%1$sThe following payment integrations will be %3$sremoved%4$s: PayPal Standard, PayPal Express, PayPal Smart Buttons, PayPal Pro, Braintree, Payflow Pro, Authorize.net SIM and Authorize.net AIM.%2$s',
                'event_espresso'
            ),
            '<p>',
            '</p>',
            '<strong>',
            '</strong>'
        );
    }


    private function whatYouNeedToDoPg(string $type = self::TYPE_INITIAL): string
    {
        // link to the payment settings page
        // ex: '/wp-admin/admin.php?page=espresso_payment_settings&action=default&payment_method=paypalcheckout'
        $paypal_url = add_query_arg(
            [
                'page'           => 'espresso_payment_settings',
                'action'         => 'default',
                'payment_method' => 'paypalcheckout',
            ],
            admin_url('admin.php')
        );
        switch ($type) {
            case self::TYPE_WARNING:
                return sprintf(
                    esc_html__(
                        '%1$sWhat You Need To Do%2$s%3$sPlease begin transitioning to one of our other payment integrations such as %5$sPayPal Commerce,%9$s %6$sStripe,%9$s %7$sSquare,%9$s or %8$sAuthorize.net Accept%9$s soon.%4$s',
                        'event_espresso'
                    ),
                    '<h4>',
                    '</h4>',
                    '<p>',
                    '</p>',
                    '<a href="' . esc_url_raw($paypal_url) . '">',
                    '<a href="' . esc_url_raw(self::URL_STRIPE) . '">',
                    '<a href="' . esc_url_raw(self::URL_SQUARE) . '">',
                    '<a href="' . esc_url_raw(self::URL_ACCEPT) . '">',
                    '</a>',
                );
            case self::TYPE_URGENT:
            case self::TYPE_FINAL:
                return sprintf(
                    esc_html__(
                        '%1$sWhat You Need To Do%2$s%3$sPlease begin transitioning to one of our other payment integrations such as %5$sPayPal Commerce,%9$s %6$sStripe,%9$s %7$sSquare,%9$s or %8$sAuthorize.net Accept%9$s immediately to avoid payment processing interruptions.%4$s',
                        'event_espresso'
                    ),
                    '<h4>',
                    '</h4>',
                    '<p>',
                    '</p>',
                    '<a href="' . esc_url_raw($paypal_url) . '">',
                    '<a href="' . esc_url_raw(self::URL_STRIPE) . '">',
                    '<a href="' . esc_url_raw(self::URL_SQUARE) . '">',
                    '<a href="' . esc_url_raw(self::URL_ACCEPT) . '">',
                    '</a>',
                );
            case self::TYPE_INITIAL:
            default:
                return sprintf(
                    esc_html__(
                        '%1$sWhat You Need To Do%2$s%3$sPlease begin transitioning to one of our other payment integrations such as %5$sPayPal Commerce,%9$s %6$sStripe,%9$s %7$sSquare,%9$s or %8$sAuthorize.net Accept%9$s at your earliest convenience.%4$s',
                        'event_espresso'
                    ),
                    '<h4>',
                    '</h4>',
                    '<p>',
                    '</p>',
                    '<a href="' . esc_url_raw($paypal_url) . '">',
                    '<a href="' . esc_url_raw(self::URL_STRIPE) . '">',
                    '<a href="' . esc_url_raw(self::URL_SQUARE) . '">',
                    '<a href="' . esc_url_raw(self::URL_ACCEPT) . '">',
                    '</a>',
                );
        }
    }


    private function toMigratePg(): string
    {
        return sprintf(
            esc_html__(
                '%1$sTo migrate to PayPal Commerce, simply go to %3$sEvent Espresso%4$s > %3$sPayment Methods%4$s > click the PayPal Commerce tab > activate PayPal Commerce > and click the blue "Connect with PayPal" button and follow the prompts.%2$s',
                'event_espresso'
            ),
            '<p>',
            '</p>',
            '<strong>',
            '</strong>'
        );
    }


    private function supportPg(): string
    {
        return sprintf(
            esc_html__(
                '%1$sSupport%2$s%3$sOur support team is available to assist you with the transition process and answer any questions you may have. Contact us at %5$s for help. This message will disappear once you deactivate any of the affected gateways.%4$s
%3$sWe appreciate your understanding and cooperation as we replace legacy integrations with new integrations.%4$s
%3$s%6$sThe team at Event Espresso %8$s%7$s%4$s',
                'event_espresso'
            ),
            '<h4>',
            '</h4>',
            '<p>',
            '</p>',
            '<a href="mailto:support@eventespresso.com">support@eventespresso.com</a>',
            '<h5>',
            '</h5>',
            '<span class="ee-icon ee-icon-ee-cup-thick"></span>'
        );
    }
}
