<?php
namespace EventEspresso\core\domain;

use EventEspresso\core\domain\entities\Context;

/**
 * Interface CapabilitiesActionRestrictionInterface
 * This interface should be implemented by classes that restrict by certain capabilities for various actions.
 *
 * @package EventEspresso\core\domain
 * @subpackage
 * @author  Darren Ethier
 * @since 4.9.55.p
 */
interface CapabilitiesActionRestrictionInterface
{
    /**
     * Return whether the item can be edited for the given context.
     * @param Context $context
     * @return bool
     */
    public function canEdit(Context $context);


    /**
     * Return whether the item can be read for the given context.
     * @param Context $context
     * @return bool
     */
    public function canRead(Context $context);


    /**
     * Return whether the item can be deleted for the given context.
     * @param Context $context
     * @return bool
     */
    public function canDelete(Context $context);


    /**
     * Return whether the item can be created for the given context
     * @param Context $context
     * @return bool
     */
    public function canCreate(Context $context);
}
