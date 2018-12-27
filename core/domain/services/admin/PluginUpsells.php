<?php

namespace EventEspresso\core\domain\services\admin;

use DomainException;
use EventEspresso\core\domain\CaffeinatedInterface;
use EventEspresso\core\domain\DomainInterface;

/**
 * PluginUpsells
 * Handles injecting various marketing upsell things throughout the app.
 *
 * @package EventEspresso\core\domain\services\admin
 * @author  Darren Ethier
 * @since   4.9.59.p
 */
class PluginUpsells
{

    /**
     * @var DomainInterface
     */
    private $domain;


    /**
     * PluginUpsells constructor.
     *
     * @param DomainInterface $domain
     */
    public function __construct(DomainInterface $domain)
    {
        $this->domain = $domain;
    }


    /**
     * Hook in various upsells for the decaf version of EE.
     */
    public function decafUpsells()
    {
        if ($this->domain instanceof CaffeinatedInterface && ! $this->domain->isCaffeinated()) {
            add_action('after_plugin_row', array($this, 'doPremiumUpsell'), 10, 3);
        }
    }


    /**
     * Callback for `after_plugin_row` to add upsell info
     *
     * @param string $plugin_file
     * @param array  $plugin_data
     * @param string $status
     * @throws DomainException
     */
    public function doPremiumUpsell($plugin_file, $plugin_data, $status)
    {
        if ($plugin_file === $this->domain->pluginBasename()) {
            list($button_text, $button_url, $upsell_text) = $this->getAfterPluginRowDetails();
            echo '<tr class="plugin-update-tr ee-upsell-plugin-list-table active">
                <td colspan="3" class="plugin-update colspanchange">
                    <div class="notice inline notice-alt">
                        <div class="ee-upsell-container">
                            <div class="ee-upsell-inner-container">
                                <a href="' . $button_url . '">
                                    ' . $button_text . '
                                </a>
                            </div>
                            <div class="ee-upsell-inner-container">
                                <p>' . $upsell_text . '</p>
                            </div>
                            <div style="clear:both"></div>
                        </div>
                    </div>
                </td>
              </tr>';
        }
    }

    /**
     * Provide the details used for the upsell container.
     *
     * @return array
     */
    protected function getAfterPluginRowDetails()
    {
        return array(
            esc_html__('Upgrade for Support', 'event_espresso'),
            'https://eventespresso.com/purchase/?slug=ee4-license-personal&utm_source=wp_admin_plugins_screen&utm_medium=link&utm_campaign=plugins_screen_upgrade_link" class="button button-primary',
            sprintf(
                esc_html__(
                    'You\'re missing out on %1$sexpert support%2$s and %1$sone-click updates%2$s! Don\'t have an Event Espresso support license key? Support the project and buy one today!',
                    'event_espresso'
                ),
                '<strong>',
                '</strong>'
            ),
        );
    }
}
