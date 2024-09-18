<?php

namespace EventEspresso\core\domain\services\capabilities;

use EventEspresso\core\exceptions\InsufficientPermissionsException;

/**
 * Class FeatureFlags
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\domain\services\capabilities
 * @since   5.0.0.p
 */
class FeatureFlags
{
    private CapabilitiesChecker $capabilities_checker;

    protected FeatureFlagsConfig $option;

    /**
     * array of key value pairs where the key is the feature flag in question
     * and the value is either a boolean or a CapCheck object defining the required permissions
     * example:
     *       [
     *          'use_bulk_edit' => true,
     *          'use_death_ray' => new CapCheck( 'ee-death-ray-cap', 'context-desc' )
     *      ]
     * array is filterable via FHEE__EventEspresso_core_domain_services_capabilities_FeatureFlags
     *
     * @var boolean[]|CapCheck[]
     */
    private $feature_flags;


    /**
     * FeatureFlags constructor.
     *
     * @param CapabilitiesChecker $capabilities_checker
     * @param FeatureFlagsConfig  $option
     */
    public function __construct(CapabilitiesChecker $capabilities_checker, FeatureFlagsConfig $option)
    {
        $this->capabilities_checker = $capabilities_checker;
        $this->option = $option;
        $this->feature_flags = apply_filters(
            'FHEE__EventEspresso_core_domain_services_capabilities_FeatureFlags',
            $this->option->getFeatureFlags()
        );
    }


    /**
     * @param string $feature
     * @return bool
     */
    public function allowed(string $feature): bool
    {
        $flag = $this->feature_flags->{$feature} ?? false;
        try {
            return $flag instanceof CapCheck
                ? $this->capabilities_checker->processCapCheck($flag)
                : filter_var($flag, FILTER_VALIDATE_BOOLEAN);
        } catch (InsufficientPermissionsException $e) {
            // eat the exception
        }
        return false;
    }


    /**
     * @return array
     */
    public function getAllowedFeatures(): array
    {
        $allowed = array_filter((array) $this->feature_flags, [$this, 'allowed'], ARRAY_FILTER_USE_KEY);
        return array_keys($allowed);
    }
}
