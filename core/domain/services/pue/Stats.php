<?php

namespace EventEspresso\core\domain\services\pue;

use Closure;
use EE_Admin_Page;
use EE_Error;
use EE_Maintenance_Mode;
use EEH_Template;
use EEM_Payment_Method;
use Exception;

/**
 * Stats
 * This service exposes various stat collection logic retrieval and storage. Used for prepping the stats package sent
 * through PUE as a part of the UXIP stats collection.
 *
 * @package EventEspresso\core\domain\services\pue
 * @author  Darren Ethier
 * @since   4.9.59.p
 */
class Stats
{

    const OPTIONS_KEY_EXPIRY_TIMESTAMP_FOR_SENDING_STATS = 'ee_uxip_stats_expiry';

    /**
     * @var Config
     */
    private $config;


    /**
     * @var StatsGatherer
     */
    private $stats_gatherer;


    /**
     * @var EE_Maintenance_Mode
     */
    private $maintenance_mode;

    public function __construct(
        Config $config,
        EE_Maintenance_Mode $maintenance_mode,
        StatsGatherer $stats_gatherer
    ) {
        $this->config = $config;
        $this->maintenance_mode = $maintenance_mode;
        $this->stats_gatherer = $stats_gatherer;
        $this->setUxipNotices();
    }


    /**
     * Displays uxip opt-in notice if necessary.
     */
    private function setUxipNotices()
    {
        if ($this->canDisplayNotices()) {
            add_action('admin_notices', array($this, 'optinNotice'));
            add_action('admin_enqueue_scripts', array($this, 'enqueueScripts'));
            add_action('wp_ajax_espresso_data_optin', array($this, 'ajaxHandler'));
        }
    }


    /**
     * This returns the callback that PluginUpdateEngineChecker will use for getting any extra stats to send.
     *
     * @return Closure
     */
    public function statsCallback()
    {
        // returns a callback that can is used to retrieve the stats to send along to the pue server.
        return function () {
            // we only send stats one a week, so let's see if our stat timestamp has expired.
            if (! $this->sendStats()) {
                return array();
            }
            return $this->stats_gatherer->stats();
        };
    }


    /**
     * Return whether notices can be displayed or not
     *
     * @return bool
     */
    private function canDisplayNotices()
    {
        return ! $this->config->hasNotifiedForUxip()
               && $this->maintenance_mode->level() !== EE_Maintenance_Mode::level_2_complete_maintenance;
    }


    /**
     * Callback for the admin_notices hook that outputs the UXIP optin-in notice.
     */
    public function optinNotice()
    {
        ?>
        <div class="updated data-collect-optin" id="espresso-data-collect-optin-container">
            <div id="data-collect-optin-options-container">
                <span class="dashicons dashicons-admin-site"></span>
                <span class="data-optin-text"><?php echo self::optinText(); ?></span>
                <span style="display: none" id="data-optin-nonce"><?php echo wp_create_nonce('ee-data-optin'); ?></span>
                <button class="button-secondary data-optin-button" value="no">
                    <?php _e('Dismiss', 'event_espresso'); ?>
                </button>
                <div style="clear:both"></div>
            </div>
        </div>
        <?php
    }


    /**
     * Retrieves the optin text (static so it can be used in multiple places as necessary).
     *
     * @param bool $extra
     */
    public static function optinText($extra = true)
    {
        if (! $extra) {
            echo '<h2 class="ee-admin-settings-hdr" '
                 . (! $extra ? 'id="UXIP_settings"' : '')
                 . '>'
                 . esc_html__('User eXperience Improvement Program (UXIP)', 'event_espresso')
                 . EEH_Template::get_help_tab_link('organization_logo_info')
                 . '</h2>';
            printf(
                esc_html__(
                    '%1$sPlease help us make Event Espresso better and vote for your favorite features.%2$s The %3$sUser eXperience Improvement Program (UXIP)%4$s, has been created so when you use Event Espresso you are voting for the features and settings that are important to you. The UXIP helps us understand how you use our products and services, track problems and in what context. If you opt-out of the UXIP you essentially elect for us to disregard how you use Event Espresso as we build new features and make changes. Participation in the program is completely voluntary and it is disabled by default. The end results of the UXIP are software improvements to better meet your needs. The data we collect will never be sold, traded, or misused in any way. %5$sPlease see our %6$sPrivacy Policy%7$s for more information.',
                    'event_espresso'
                ),
                '<p><em>',
                '</em></p>',
                '<a href="https://eventespresso.com/about/user-experience-improvement-program-uxip/" target="_blank">',
                '</a>',
                '<br><br>',
                '<a href="https://eventespresso.com/about/privacy-policy/" target="_blank">',
                '</a>'
            );
        } else {
            $settings_url = EE_Admin_Page::add_query_args_and_nonce(
                array('action' => 'default'),
                admin_url('admin.php?page=espresso_general_settings')
            );
            $settings_url .= '#UXIP_settings';
            printf(
                esc_html__(
                    'The Event Espresso UXIP feature is not yet active on your site. For %1$smore info%2$s and to opt-in %3$sclick here%4$s.',
                    'event_espresso'
                ),
                '<a href="https://eventespresso.com/about/user-experience-improvement-program-uxip/" target="_blank">',
                '</a>',
                '<a href="' . $settings_url . '" target="_blank">',
                '</a>'
            );
        }
    }


    /**
     * Callback for admin_enqueue_scripts that sets up the scripts and styles for the uxip notice
     */
    public function enqueueScripts()
    {
        wp_register_script(
            'ee-data-optin-js',
            EE_GLOBAL_ASSETS_URL . 'scripts/ee-data-optin.js',
            array('jquery'),
            EVENT_ESPRESSO_VERSION,
            true
        );
        wp_register_style(
            'ee-data-optin-css',
            EE_GLOBAL_ASSETS_URL . 'css/ee-data-optin.css',
            array(),
            EVENT_ESPRESSO_VERSION
        );

        wp_enqueue_script('ee-data-optin-js');
        wp_enqueue_style('ee-data-optin-css');
    }


    /**
     * Callback for wp_ajax_espresso_data_optin that handles the ajax request
     */
    public function ajaxHandler()
    {
        // verify nonce
        if (isset($_POST['nonce']) && ! wp_verify_nonce($_POST['nonce'], 'ee-data-optin')) {
            exit();
        }

        // update has notified option
        $this->config->setHasNotifiedAboutUxip();
        exit();
    }


    /**
     * Used to determine whether additional stats are sent.
     */
    private function sendStats()
    {
        return $this->config->isOptedInForUxip()
               && $this->maintenance_mode->level() !== EE_Maintenance_Mode::level_2_complete_maintenance
               && $this->statSendTimestampExpired();
    }


    /**
     * Returns true when the timestamp used to track whether stats get sent (currently a weekly interval) is expired.
     * Returns false otherwise.
     *
     * @return bool
     */
    private function statSendTimestampExpired()
    {
        $current_expiry = get_option(self::OPTIONS_KEY_EXPIRY_TIMESTAMP_FOR_SENDING_STATS, null);
        if ($current_expiry === null) {
            add_option(self::OPTIONS_KEY_EXPIRY_TIMESTAMP_FOR_SENDING_STATS, time() + WEEK_IN_SECONDS, '', 'no');
            return true;
        }

        if (time() > (int) $current_expiry) {
            update_option(self::OPTIONS_KEY_EXPIRY_TIMESTAMP_FOR_SENDING_STATS, time() + WEEK_IN_SECONDS);
            return true;
        }
        return false;
    }
}
