<?php

namespace EventEspresso\core\domain\services\capabilities;

use EventEspresso\core\domain\Domain;
use EventEspresso\core\services\database\WordPressOption;
use EventEspresso\core\services\json\JsonDataHandler;
use EventEspresso\core\services\json\JsonDataWordpressOption;
use stdClass;

/**
 * Class FeatureFlagsConfig
 * used to store and retrieve Feature Flags configuration
 * Feature Flags are used to enable/disable new features in Event Espresso
 *
 * @since $VID:$
 */
class FeatureFlagsConfig extends JsonDataWordpressOption
{
    /**
     * WP option name for saving the Feature Flags configuration
     */
    private const OPTION_NAME = 'ee_feature_flags';

    /**
     * Whether to use the New Event Editor (EDTR) or continue using the legacy Event Editor
     * deafult: Enabled for Caffeinated sites, disabled for Decaf or Multisite installs
     */
    public const  USE_ADVANCED_EVENT_EDITOR = 'ee_advanced_event_editor';

    /**
     * Whether to enable the Bulk Edit feature in the Advanced Event Editor (EDTR)
     * default: Enabled for Caffeinated sites, disabled for Decaf or Multisite installs
     */
    public const  USE_EVENT_EDITOR_BULK_EDIT = 'ee_event_editor_bulk_edit';

    /**
     * Whether to enable the new Default Ticket Manager in the EDTR
     * default: Enabled
     */
    public const  USE_DEFAULT_TICKET_MANAGER = 'use_default_ticket_manager';

    /**
     * Whether to enable the Rich Text Editor for the Event Description field in the EDTR or use tinymce
     * default: Disabled
     */
    public const  USE_EVENT_DESCRIPTION_RTE = 'use_event_description_rte';

    /**
     * Whether to enable the Rich Text Editor for all other RTE fields in the EDTR
     * default: Disabled
     */
    public const  USE_EXPERIMENTAL_RTE = 'use_experimental_rte';

    /**
     * Whether to enable the new Registration Form Builder in the EDTR
     * or continue using the legacy Question Groups and Registration Form admin pages
     * default: Disabled
     */
    public const  USE_REG_FORM_BUILDER = 'use_reg_form_builder';

    /**
     * Whether to enable the new Registration Options meta box in the EDTR
     * or continue using the legacy Event Registration Options
     * default: Disabled
     */
    public const  USE_REG_OPTIONS_META_BOX = 'use_reg_options_meta_box';


    protected Domain $domain;


    public function __construct(Domain $domain, JsonDataHandler $json_data_handler)
    {
        $this->domain = $domain;
        parent::__construct($json_data_handler, FeatureFlagsConfig::OPTION_NAME, $this->getDefaultFeatureFlagOptions());
    }


    /**
     * see the FeatureFlagsConfig::USE_* constants for descriptions of each feature flag and their default values
     *
     * @return stdClass
     */
    public function getDefaultFeatureFlagOptions(): stdClass
    {
        return (object) [
            self::USE_ADVANCED_EVENT_EDITOR  => $this->domain->isCaffeinated() && ! $this->domain->isMultiSite(),
            self::USE_EVENT_EDITOR_BULK_EDIT => $this->domain->isCaffeinated() && ! $this->domain->isMultiSite(),
            self::USE_DEFAULT_TICKET_MANAGER => true,
            self::USE_EVENT_DESCRIPTION_RTE  => false,
            self::USE_EXPERIMENTAL_RTE       => false,
            self::USE_REG_FORM_BUILDER       => false,
            self::USE_REG_OPTIONS_META_BOX   => false,
        ];
    }


    /**
     * @return stdClass
     */
    public function getFeatureFlags(): stdClass
    {
        return $this->getAll() ?: $this->getDefaultFeatureFlagOptions();
    }


    public function saveFeatureFlagsConfig(stdClass $feature_flags): int
    {
        return $this->updateOption($feature_flags);
    }


    /**
     * enables a feature flag, ex:
     * $this->enableFeatureFlag(FeatureFlagsConfig::USE_ADVANCED_EVENT_EDITOR);
     *
     * @param string $feature_flag the feature flag to enable. One of the FeatureFlagsConfig::USE_* constants
     * @return int
     */
    public function enableFeatureFlag(string $feature_flag): int
    {
        $feature_flags = $this->getFeatureFlags();
        if (! property_exists($feature_flags, $feature_flag)) {
            return WordPressOption::UPDATE_ERROR;
        }
        $feature_flags->{$feature_flag} = true;
        // if feature flag is the advanced event editor or bulk edit options
        // then only enabled if the site is Caffeinated and not MultiSite
        if ($feature_flag === self::USE_ADVANCED_EVENT_EDITOR || $feature_flag === self::USE_EVENT_EDITOR_BULK_EDIT) {
            $feature_flags->{$feature_flag} = $this->domain->isCaffeinated() && ! $this->domain->isMultiSite();
        }
        return $this->saveFeatureFlagsConfig($feature_flags);
    }


    /**
     * disables a feature flag, ex:
     * $this->disableFeatureFlag(FeatureFlagsConfig::USE_ADVANCED_EVENT_EDITOR);
     *
     * @param string $feature_flag the feature flag to disable. One of the FeatureFlagsConfig::USE_* constants
     * @return int
     */
    public function disableFeatureFlag(string $feature_flag): int
    {
        $feature_flags = $this->getFeatureFlags();
        if (! property_exists($feature_flags, $feature_flag)) {
            return WordPressOption::UPDATE_ERROR;
        }
        $feature_flags->{$feature_flag} = false;
        return $this->saveFeatureFlagsConfig($feature_flags);
    }
}
