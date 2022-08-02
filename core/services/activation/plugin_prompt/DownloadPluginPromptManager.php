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
        if (class_exists('EventEspresso\core\services\graphql\GraphQLManager') && ! class_exists('WPGraphQL')) {
            $this->plugin_prompts['WPGraphQL'] = new DownloadPluginPrompt(
                'WPGraphQL',
                'https://www.wpgraphql.com/',
                "Event Espresso's new Advanced Editor",
                null,
                null,
                'keen-performance.svg',
                480
            );
        }
        $this->plugin_prompts['Sharks'] = new DownloadPluginPrompt(
            'Sharks with Lasers',
            'https://www.wired.com/2012/05/wicked-lasers-shark/',
            "Dr Evil",
            'Sharks with Frickin’ Laser Beams',
            null,
            'https://assets.vg247.com/current//2018/07/Fortnite_Laser_chomp.png'
        );
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
