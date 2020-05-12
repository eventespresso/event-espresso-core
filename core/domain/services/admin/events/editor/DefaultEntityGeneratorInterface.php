<?php

namespace EventEspresso\core\domain\services\admin\events\editor;


use EE_Base_Class;
use EE_Error;
use ReflectionException;

/**
 * Class DefaultTickets
 * Description
 *
 * @package EventEspresso\core\domain\services\admin\events\editor
 * @author  Brent Christensen
 * @since   $VID:$
 */
interface DefaultEntityGeneratorInterface
{

    /**
     * @param EE_Base_Class $entity
     * @throws EE_Error
     * @throws ReflectionException
     * @since $VID:$
     */
    public function create(EE_Base_Class $entity);
}