<?php

namespace EventEspresso\core\domain\services\admin\entities;

use EE_Base_Class;
use EE_Error;
use ReflectionException;

/**
 * Class DefaultTickets
 * Description
 *
 * @package EventEspresso\core\domain\services\admin\events\editor
 * @author  Brent Christensen
 * @since   5.0.0.p
 */
interface DefaultEntityGeneratorInterface
{
    /**
     * @param EE_Base_Class $entity
     * @return EE_Base_Class[]
     * @throws EE_Error
     * @throws ReflectionException
     * @since 5.0.0.p
     */
    public function create(EE_Base_Class $entity): array;
}
