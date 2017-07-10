<?php

namespace EventEspresso\core\services\activation;

/**
 * ActivatableInterface
 * defines classes that belong to a system that can be activated
 * such as EE_System (for core) or EE_Addon (for addons)
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         4.9.40
 */
interface ActivatableInterface
{


    /**
     * Gets the ActivationHistory object for this addon
     *
     * @return ActivationHistory
     */
    public function getActivationHistory(): ActivationHistory;


    /**
     * @param ActivationHistory $activation_history
     */
    public function setActivationHistory(ActivationHistory $activation_history);


    /**
     * @return ActivationType
     */
    public function getActivationType(): ActivationType;


    /**
     * @param ActivationType $activation_type
     */
    public function setActivationType(ActivationType $activation_type);
}
