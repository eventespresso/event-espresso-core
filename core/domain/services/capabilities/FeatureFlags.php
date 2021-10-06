<?php

namespace EventEspresso\core\domain\services\capabilities;

use EventEspresso\core\exceptions\InsufficientPermissionsException;

/**
 * Class FeatureFlags
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\domain\services\capabilities
 * @since   $VID:$
 */
class FeatureFlags
{

    /**
     * @var CapabilitiesChecker $capabilities_checker
     */
    private $capabilities_checker;

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
     */
    public function __construct(CapabilitiesChecker $capabilities_checker)
    {
        $this->capabilities_checker = $capabilities_checker;
        $this->feature_flags = apply_filters(
            'FHEE__EventEspresso_core_domain_services_capabilities_FeatureFlags',
            [
                'use_advanced_event_editor'  => false,
                'use_bulk_edit'              => false,
                'use_default_ticket_manager' => false,
                'use_event_description_rte'  => false,
                'use_experimental_rte'       => false,
                'use_reg_form_builder'       => false,
                'use_reg_options_meta_box'   => false,
            ]
        );
    }


    /**
     * @param string $feature
     * @return bool
     */
    public function allowed(string $feature): bool
    {
        $flag = $this->feature_flags[ $feature ] ?? false;
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
        $allowed = array_filter($this->feature_flags, [$this, 'allowed'], ARRAY_FILTER_USE_KEY);
        return array_keys($allowed);
    }
}
