<?php

namespace EventEspresso\core\services\licensing;

use EventEspresso\core\domain\services\capabilities\FeatureFlags;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * Class AddonLicense
 *
 * Generates PluginLicense objects for add-ons.
 * Retrieves the plugin name from its main file path if needed.
 *
 * @package EventEspresso\core\services\licensing
 * @author  Brent Christensen  Tony Warwick
 * @since   5.0.20.p
 */
class AddonLicense
{
    /**
     * add-on names indexed by plugin slug.
     * Duplicates are because the plugin slugs used in the license data
     * sometimes differ from those used in the register add-on API
     *
     * @var array|string[]
     */
    private static array $addon_names = [
        // Add-ons
        'eea-affiliate-wp'                          => 'AffiliateWP Integration',
        'eea-attendee-mover'                        => 'Attendee Mover',
        'eea-automated-upcoming-event-notification' => 'Automatic Event Notifications',
        'espresso-barcode-scanner'                  => 'Barcode Scanner',
        'espresso_calendar'                         => 'Calendar',
        'eea-event-app-customization'               => 'Event Mobile App Customization',
        'espresso-grid-template'                    => 'Events List Grid Template',
        'espresso-events-table-template'            => 'Events List Table Template',
        'eea-importer'                              => 'Importer',
        'espresso_importer'                         => 'Importer',
        'espresso-infusionsoft'                     => 'Keap Integration',
        'ee4-mailchimp'                             => 'MailChimp Integration',
        'eea-multi-event-registration'              => 'Event Cart',
        'eea-people-addon'                          => 'People Manager',
        'eea-promotions'                            => 'Promotion and Discount Codes',
        'eea-recurring-events-manager'              => 'Recurring Events',
        'eea-events-social-sharing'                 => 'Social Sharing',
        'eea-ticketing'                             => 'Scannable Tickets',
        'eea-utf8-variation'                        => 'Font Pack for DOMPDF',
        'eea-wait-lists'                            => 'Wait List Manager',
        'eea-wpuser-integration'                    => 'WordPress User Integration',
        'eea-payment-methods-pro'                   => 'Payment Methods Manager',
        // Payment Methods
        'eea-authnet-accept'                        => 'Authorize.net Accept Integration',
        'eea-aim-echeck'                            => 'Authorize.net eCheck Integration',
        'eea-braintree-gateway'                     => 'Braintree Integration',
        'eea-chase-orbital'                         => 'Chase Paymentech Orbital Integration',
        'eea-cybersource-gateway'                   => 'CyberSource Integration',
        'eea-payeezy'                               => 'First Data Payeezy Integration',
        'eea-flexible-payment-method'               => 'Flexible Payment Method',
        'eea-ipay88-gateway'                        => 'iPay88 Integration',
        'eea-migs-payment-method'                   => 'Mastercard Gateway Integration',
        'eea-ideal-mollie-gateway'                  => 'Mollie Integration',
        'eea-payflow-pro-gateway'                   => 'Payflow Pro Integration',
        'eea-paypal-smart-buttons'                  => 'PayPal Smart Buttons Integration',
        'eea-quickbooks-gateway'                    => 'QuickBooks Payment Gateway Integration',
        'eea-sage-pay-gateway'                      => 'Opayo Integration',
        'eea-square-gateway'                        => 'Square Integration',
        'eea-stripe-gateway'                        => 'Stripe Integration',
        'espresso-transfirst'                       => 'TSYS TransFirst Integration',
        'eea-vanco-payment-method'                  => 'Vanco Integration',
    ];


    public static function register(string $addon_name, array $license_data)
    {
        if (! $addon_name || ! $license_data) {
            return;
        }
        // also bail if the feature flag is not enabled
        $feature = LoaderFactory::getShared(FeatureFlags::class);
        if (! $feature->allowed('use_edd_plugin_licensing')) {
            return;
        }
        // Get the plugin name.
        $plugin_name = $license_data['plugin_name'] ?? AddonLicense::derivePluginNameFromMainFile($license_data);
        // Bail if we still don't have a plugin name.
        if (empty($plugin_name)) {
            return;
        }
        // ensure defaults are set
        $license_data += [
            'beta'             => false,
            'main_file_path'   => $license_data['main_file_path'] ?? '',
            'min_core_version' => $license_data['min_core_version'] ?? '',
            'plugin_id'        => $license_data['plugin_id'] ?? 0,
            'plugin_name'      => $plugin_name,
            'plugin_slug'      => $license_data['plugin_slug'] ?? '',
            'version'          => $license_data['version'],
            'wp_override'      => false,
        ];

        new PluginLicense(
            $license_data['main_file_path'] ?? '',
            $license_data['plugin_id'] ?? 0,
            $license_data['plugin_name'] ?? '',
            $license_data['plugin_slug'] ?? '',
            $license_data['version'] ?? '',
            $license_data['beta'] ?? '',
            $license_data['wp_override'] ?? '',
            $license_data['min_core_version'] ?? ''
        );
    }


    private static function derivePluginNameFromMainFile(array $license_data): string
    {
        return AddonLicense::$addon_names[ wp_basename($license_data['main_file_path'], '.php') ] ?? '';
    }
}
