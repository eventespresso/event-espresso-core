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
            add_action('after_plugin_row', array($this, 'doPremiumUpsell'), 10);
        }
    }


    /**
     * Callback for `after_plugin_row` to add upsell info
     *
     * @param string $plugin_file
     * @throws DomainException
     */
    public function doPremiumUpsell($plugin_file)
    {
        if ($plugin_file === $this->domain->pluginBasename()) {
            echo '
    <tr class="ee-upsell-plugin-list-table active">
        <th scope="row" class="check-column"></th>
        <td class="column-primary">
            <div class="ee-upsell-col" style="padding:10px 0;">
                <a href="https://eventespresso.com/purchase/?slug=ee4-license-personal&utm_source=wp_admin_plugins_screen&utm_medium=link&utm_campaign=plugins_screen_upgrade_link"">
                    <button class="button button-secondary" style="background:#008dcb; border:1px solid #008dcb; color:#fff; ">'
                     . esc_html__('Upgrade for Support', 'event_espresso')
                     . '</button>
                </a>
            </div>                 
        </td>
        <td class="column-description"> 
            <div class="ee-upsell-col plugin-description" style="font-size: .85rem; line-height: 1.2rem; padding:5px 0;">'
                 . sprintf(
                     esc_html__(
                         'You\'re missing out on %1$sexpert support%2$s and %1$sone-click updates%2$s!%3$sDon\'t have an Event Espresso support license key? Support the project and buy one today!',
                         'event_espresso'
                     ),
                     '<strong>',
                     '</strong>',
                     '<br />'
                 ) .
            '</div>
        </td>
    </tr>
';
        }
    }
}
