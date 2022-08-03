<?php

namespace EventEspresso\core\services\activation\plugin_prompt;

use EventEspresso\core\domain\services\capabilities\CapabilitiesChecker;
use EventEspresso\core\services\request\sanitizers\AllowedTags;

class DownloadPluginPromptManager
{
    /**
     * @var CapabilitiesChecker
     */
    private $cap_checker;

    /**
     * @var DownloadPluginPrompt[]
     */
    private $plugin_prompts = [];


    /**
     * @param CapabilitiesChecker $capabilities_checker
     */
    public function __construct(CapabilitiesChecker $capabilities_checker)
    {
        $this->cap_checker = $capabilities_checker;
        $this->loadPluginPrompts();
        if (! empty($this->plugin_prompts)) {
            add_action('pre_current_active_plugins', [$this, 'displayPluginPrompts'], 100);
        }
    }


    public function loadPluginPrompts()
    {
        // WPGraphQL
        if (class_exists('EventEspresso\core\services\graphql\GraphQLManager') && ! class_exists('WPGraphQL')) {
            $this->plugin_prompts['WPGraphQL'] = new DownloadPluginPrompt(
                'WPGraphQL',
                'https://www.wpgraphql.com/',
                "Event Espresso's new Advanced Editor",
                null,
                null,
                'keen-performance.svg',
                500
            );
        }

        // REST API Authentication
        if (
            class_exists('EED_Core_Rest_Api')
            && ! (class_exists('Jwt_Auth') || defined('MINIORANGE_API_AUTHENTICATION_VERSION'))
        ) {
            $this->plugin_prompts['REST-API-Auth'] = new DownloadPluginPrompt(
                'WP REST API Authentication',
                '',
                "The Event Espresso REST API",
                esc_html__("REST API Authentication!", 'event_espresso'),
                sprintf(
                    /* translators: 'Some Feature' needs the 'Plugin Name' plugin in order provide your site with the maximum functionality it can offer. */
                    esc_html__(
                        'The Event Espresso REST API requires an Authentication plugin to protect your site\'s data endpoints. We highly encourage you to secure your site using one of the following plugins: %1$s',
                        'event_espresso'
                    ),
                    // 'Plugin Name & Link'
                    "
                    <ul>
                        <li>
                            <a href='https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/' target='_blank'>
                                JWT Authentication for WP REST API
                            </a>
                        </li>
                        <li>
                            <a href='https://wordpress.org/plugins/wp-rest-api-authentication/' target='_blank'>
                                WordPress REST API Authentication
                            </a>
                        </li>
                    </ul>"
                ),
                'password.svg',
                570
            );
        }
    }


    public function displayPluginPrompts()
    {
        $notifications = '';
        foreach ($this->plugin_prompts as $plugin_prompt) {
            if ($this->cap_checker->processCapCheck($plugin_prompt->getCapCheck())) {
                $notifications .= $plugin_prompt->displayNotification(true);
            }
        }
        echo "
        <div class='ee-download-plugin-prompts__grid'>
            " . wp_kses($notifications, AllowedTags::getWithFullTags()) . "
        </div>";
    }
}
