<?php

namespace EventEspresso\core\domain\services\licensing;

/**
 * AddonEddData
 *
 * @package     Event Espresso
 * @subpackage  EventEspresso\core\services\licensing
 * @author      Brent Christensen   Tony Warwick
 * @since       5.0.40.p
 */
class AddonEddData
{
    /**
     * Add-on IDs and names indexed by plugin slug.
     * Duplicates are because the plugin slugs used in the license data
     * sometimes differ from those used in the register add-on API
     *
     * @var array|string[]
     */
    private static array $data_map = [
        // Add-ons
        'eea-affiliate-wp'                          => [
            'item_id'   => 277,
            'item_name' => 'AffiliateWP Integration',
        ],
        'eea-attendee-mover'                        => [
            'item_id'   => 285,
            'item_name' => 'Attendee Mover',
        ],
        'eea-automated-upcoming-event-notification' => [
            'item_id'   => 289,
            'item_name' => 'Automatic Event Notifications',
        ],
        'espresso-barcode-scanner'                  => [
            'item_id'   => 299,
            'item_name' => 'Barcode Scanner',
        ],
        'espresso_calendar'                         => [
            'item_id'   => 304,
            'item_name' => 'Calendar',
        ],
        'eea-event-app-customization'               => [
            'item_id'   => 313,
            'item_name' => 'Event Mobile App Customization',
        ],
        'espresso-grid-template'                    => [
            'item_id'   => 322,
            'item_name' => 'Events List Grid Template',
        ],
        'espresso-events-table-template'            => [
            'item_id'   => 380,
            'item_name' => 'Events List Table Template',
        ],
        'eea-importer'                              => [
            'item_id'   => 325,
            'item_name' => 'Importer',
        ],
        'espresso_importer'                         => [
            'item_id'   => 325,
            'item_name' => 'Importer',
        ],
        'espresso-infusionsoft'                     => [
            'item_id'   => 328,
            'item_name' => 'Keap Integration (Infusionsoft)',
        ],
        'ee4-mailchimp'                             => [
            'item_id'   => 334,
            'item_name' => 'MailChimp Integration',
        ],
        'eea-multi-event-registration'              => [
            'item_id'   => 337,
            'item_name' => 'Event Cart (Multi Event Registration)',
        ],
        'eea-people-addon'                          => [
            'item_id'   => 356,
            'item_name' => 'People Manager',
        ],
        'eea-promotions'                            => [
            'item_id'   => 359,
            'item_name' => 'Promotion and Discount Codes',
        ],
        'eea-recurring-events-manager'              => [
            'item_id'   => 365,
            'item_name' => 'Recurring Events',
        ],
        'eea-events-social-sharing'                 => [
            'item_id'   => 371,
            'item_name' => 'Social Sharing',
        ],
        'eea-ticketing'                             => [
            'item_id'   => 383,
            'item_name' => 'Scannable Tickets',
        ],
        'eea-utf8-variation'                        => [
            'item_id'   => 0,
            'item_name' => 'Font Pack for DOMPDF',
        ],
        'eea-wait-lists'                            => [
            'item_id'   => 392,
            'item_name' => 'Wait Lists Manager',
        ],
        'eea-wpuser-integration'                    => [
            'item_id'   => 395,
            'item_name' => 'WordPress User Integration',
        ],
        'eea-payment-methods-pro'                   => [
            'item_id'   => 349,
            'item_name' => 'Payment Methods Manager',
        ],
        // Payment Methods
        'eea-authnet-accept'                        => [
            'item_id'   => 292,
            'item_name' => 'Authorize.net Accept Integration',
        ],
        'eea-aim-echeck'                            => [
            'item_id'   => 295,
            'item_name' => 'Authorize.net eCheck Integration',
        ],
        'eea-braintree-gateway'                     => [
            'item_id'   => 298,
            'item_name' => 'Braintree Integration',
        ],
        'eea-chase-orbital'                         => [
            'item_id'   => 307,
            'item_name' => 'Chase Paymentech Orbital Integration',
        ],
        'eea-cybersource-gateway'                   => [
            'item_id'   => 310,
            'item_name' => 'CyberSource Gateway Integration',
        ],
        'eea-payeezy'                               => [
            'item_id'   => 316,
            'item_name' => 'First Data Payeezy Gateway Integration',
        ],
        'eea-flexible-payment-method'               => [
            'item_id'   => 319,
            'item_name' => 'Flexible Payment Method',
        ],
        'eea-ipay88-gateway'                        => [
            'item_id'   => 331,
            'item_name' => 'iPay88 Payment Gateway Integration',
        ],
        'eea-migs-payment-method'                   => [
            'item_id'   => 340,
            'item_name' => 'Mastercard Gateway Integration',
        ],
        'eea-ideal-mollie-gateway'                  => [
            'item_id'   => 343,
            'item_name' => 'Mollie Payment Gateway Integration',
        ],
        'eea-payflow-pro-gateway'                   => [
            'item_id'   => 346,
            'item_name' => 'PayPal Payflow Pro Gateway Integration',
        ],
        'eea-paypal-smart-buttons'                  => [
            'item_id'   => 352,
            'item_name' => 'PayPal Smart Buttons Gateway Integration',
        ],
        'eea-quickbooks-gateway'                    => [
            'item_id'   => 362,
            'item_name' => 'QuickBooks Payment Gateway Integration',
        ],
        'eea-sage-pay-gateway'                      => [
            'item_id'   => 368,
            'item_name' => 'Opayo Payment Gateway Integration (Sage Pay)',
        ],
        'eea-square-gateway'                        => [
            'item_id'   => 374,
            'item_name' => 'Square Payment Gateway Integration',
        ],
        'eea-stripe-gateway'                        => [
            'item_id'   => 377,
            'item_name' => 'Stripe Payment Gateway Integration',
        ],
        'espresso-transfirst'                       => [
            'item_id'   => 386,
            'item_name' => 'TSYS TransFirst Integration',
        ],
        'eea-vanco-payment-method'                  => [
            'item_id'   => 389,
            'item_name' => 'Vanco Payment Gateway Integration',
        ],
    ];


    public static function getPluginItemID($plugin_slug): int
    {
        return self::$data_map[ $plugin_slug ]['item_id'] ?? 0;
    }


    public static function getPluginItemName($plugin_slug): string
    {
        return self::$data_map[ $plugin_slug ]['item_name'] ?? '';
    }
}
