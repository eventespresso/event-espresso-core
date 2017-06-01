<?php

namespace EventEspresso\core\services\activation;

use EE_Addon;
use EE_Maintenance_Mode;
use EE_System;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\request\RequestType;
use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');


/**
 * Class ActivationsAndUpgradesManager
 * Checks for activation or upgrade for EE core,
 * then checks for activation or upgrade for registered addons
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Michael Nelson, Brent Christensen
 * @since         4.9.40
 */
class ActivationsAndUpgradesManager
{

    /**
     * @var EE_System $core
     */
    private $core;

    /**
     * @var ActivationHistory $core_activation_history
     */
    private $core_activation_history;

    /**
     * @var RequestType $core_request_type
     */
    private $core_request_type;

    /**
     * @var EE_Maintenance_Mode $maintenance_mode
     */
    private $maintenance_mode;

    /**
     * @var EE_Addon[] $addons
     */
    private $addons;



    /**
     * ActivationsAndUpgradesManager constructor.
     *
     * @param EE_System           $core
     * @param ActivationHistory   $core_activation_history
     * @param RequestType         $core_request_type
     * @param EE_Maintenance_Mode $maintenance_mode
     * @param EE_Addon[]          $addons
     */
    public function __construct(
        EE_System $core,
        ActivationHistory $core_activation_history,
        RequestType $core_request_type,
        EE_Maintenance_Mode $maintenance_mode,
        array $addons
    ) {
        $this->core = $core;
        $this->core_activation_history = $core_activation_history;
        $this->core_request_type = $core_request_type;
        $this->maintenance_mode = $maintenance_mode;
        $this->addons = $addons;
    }



    /**
     * @throws InvalidEntityException
     * @throws InvalidArgumentException
     */
    public function detectActivationsAndUpgrades()
    {
        $core_activation_handler = new DetectActivationsAndUpgrades(
            $this->core,
            $this->core_request_type,
            $this->core_activation_history,
            $this->maintenance_mode
        );
        $core_activation_handler->handleActivationRequestTypes();
        foreach ($this->addons as $addon) {
            if ( ! $addon instanceof EE_Addon) {
                throw new InvalidEntityException($addon, 'EE_Addon');
            }
            // get activation history for addon
            $addon_activation_history = new ActivationHistory(
                $addon->get_activation_history_option_name(),
                $addon->get_activation_indicator_option_name(),
                $addon->version()
            );
            $addon->setActivationHistory($addon_activation_history);
            // detect the request type for that addon
            $addon_request_type = new RequestType($addon_activation_history);
            $addon_request_type->resolveFromActivationHistory();
            $addon_request_type->detectMajorVersionChange();
            // handle activations or upgrades
            $addon_activation_handler = new DetectActivationsAndUpgrades(
                $addon,
                $addon_request_type,
                $addon_activation_history,
                $this->maintenance_mode
            );
            $addon_activation_handler->handleActivationRequestTypes();
            $addon->setRequestType($addon_request_type);
        }
    }




}