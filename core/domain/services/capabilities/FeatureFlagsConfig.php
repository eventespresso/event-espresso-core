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
 * @since 5.0.11.p
 */
class FeatureFlagsConfig extends JsonDataWordpressOption
{
    /**
     * WP option name for saving the Feature Flags configuration
     */
    private const OPTION_NAME = 'ee_feature_flags';

    /**
     * use FeatureFlag::USE_EVENT_EDITOR_BULK_EDIT instead
     * this hasn't been deleted because it's used in the REM add-on
     *
     * @deprecated 5.0.18.p
     */
    public const  USE_EVENT_EDITOR_BULK_EDIT = FeatureFlag::USE_EVENT_EDITOR_BULK_EDIT;

    private static array $removed = [
        FeatureFlag::USE_ADVANCED_EVENT_EDITOR,
    ];



    protected Domain $domain;

    private ?stdClass $feature_flags = null;


    public function __construct(Domain $domain, JsonDataHandler $json_data_handler)
    {
        $this->domain = $domain;
        parent::__construct($json_data_handler, FeatureFlagsConfig::OPTION_NAME, $this->getDefaultFeatureFlagOptions());
    }


    /**
     * see the FeatureFlag::USE_* constants for descriptions of each feature flag and their default values
     *
     * @return stdClass
     */
    public function getDefaultFeatureFlagOptions(): stdClass
    {
        return (object) [
            FeatureFlag::USE_DATETIME_STATUS_CONTROLS  => false,
            FeatureFlag::USE_DEFAULT_TICKET_MANAGER    => true,
            FeatureFlag::USE_EDD_PLUGIN_LICENSING      => defined('EE_USE_EDD_PLUGIN_LICENSING')
                                                            && EE_USE_EDD_PLUGIN_LICENSING,
            FeatureFlag::USE_EVENT_DESCRIPTION_RTE     => false,
            FeatureFlag::USE_EVENT_EDITOR_BULK_EDIT    => $this->domain->isCaffeinated()
                                                            && ! $this->domain->isMultiSite(),
            FeatureFlag::USE_EXPERIMENTAL_RTE          => false,
            FeatureFlag::USE_PAYMENT_PROCESSOR_FEES    => true,
            FeatureFlag::USE_REG_FORM_BUILDER          => false,
            FeatureFlag::USE_REG_FORM_TICKET_QUESTIONS => false,
            FeatureFlag::USE_REG_OPTIONS_META_BOX      => false,
            FeatureFlag::USE_SPCO_FORM_REFACTOR        => false,
        ];
    }


    /**
     * feature flags that absolutely must be enabled/disabled based on hard-coded conditions
     *
     * @return stdClass
     * @since 5.0.20.p
     */
    public function getOverrides(): stdClass
    {
        $overrides = [];
        if (defined('EE_USE_EDD_PLUGIN_LICENSING')) {
            $overrides[ FeatureFlag::USE_EDD_PLUGIN_LICENSING ] = EE_USE_EDD_PLUGIN_LICENSING;
        }
        return (object) $overrides;
    }


    /**
     * @return stdClass
     */
    public function getFeatureFlags(): stdClass
    {
        if ($this->feature_flags) {
            return $this->feature_flags;
        }
        $default_options     = $this->getDefaultFeatureFlagOptions();
        $this->feature_flags = $this->getAll();
        $overrides           = $this->getOverrides();
        // ensure that all feature flags are set
        foreach ($default_options as $key => $value) {
            // if the feature flag is not set, use the default value
            if (! isset($this->feature_flags->$key)) {
                $this->feature_flags->$key = $value;
            }
            // ensure that all overrides are set
            if (isset($overrides->$key)) {
                $this->feature_flags->$key = $overrides->$key;
            }
        }
        return $this->feature_flags;
    }


    public function saveFeatureFlagsConfig(?stdClass $feature_flags = null): int
    {
        $feature_flags = $feature_flags ?? $this->feature_flags;
        foreach (FeatureFlagsConfig::$removed as $feature_flag) {
            unset($feature_flags->{$feature_flag});
        }
        $this->feature_flags = $feature_flags;
        return $this->updateOption($feature_flags);
    }


    /**
     * enables a feature flag, ex:
     * $this->enableFeatureFlag(FeatureFlag::USE_ADVANCED_EVENT_EDITOR);
     *
     * @param string $feature_flag the feature flag to enable. One of the FeatureFlag::USE_* constants
     * @param bool   $add_if_missing
     * @param bool   $save
     * @return int
     */
    public function enableFeatureFlag(string $feature_flag, bool $add_if_missing = false, bool $save = true): int
    {
        if (! $this->feature_flags) {
            $this->getFeatureFlags();
        }
        if (! property_exists($this->feature_flags, $feature_flag) && ! $add_if_missing) {
            return WordPressOption::UPDATE_ERROR;
        }
        $this->feature_flags->{$feature_flag} = true;
        // if feature flag is the advanced event editor bulk edit options
        // then only enabled if the site is Caffeinated and not MultiSite
        if ($feature_flag === FeatureFlag::USE_EVENT_EDITOR_BULK_EDIT) {
            $this->feature_flags->{$feature_flag} = $this->domain->isCaffeinated() && ! $this->domain->isMultiSite();
        }
        if ($save) {
            return $this->saveFeatureFlagsConfig($this->feature_flags);
        }
        return WordPressOption::UPDATE_NONE;
    }


    /**
     * disables a feature flag, ex:
     * $this->disableFeatureFlag(FeatureFlag::USE_ADVANCED_EVENT_EDITOR);
     *
     * @param string $feature_flag the feature flag to disable. One of the FeatureFlag::USE_* constants
     * @param bool   $save
     * @return int
     */
    public function disableFeatureFlag(string $feature_flag, bool $save = true): int
    {
        if (! $this->feature_flags) {
            $this->getFeatureFlags();
        }
        if (! property_exists($this->feature_flags, $feature_flag)) {
            return WordPressOption::UPDATE_ERROR;
        }
        $this->feature_flags->{$feature_flag} = false;
        if ($save) {
            return $this->saveFeatureFlagsConfig($this->feature_flags);
        }
        return WordPressOption::UPDATE_NONE;
    }


    public function getFeatureFlagsFormOptions(): ?array
    {
        return FeatureFlag::getFormOptions();
    }
}
