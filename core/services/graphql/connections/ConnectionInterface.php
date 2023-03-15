<?php

namespace EventEspresso\core\services\graphql\connections;

use EE_Base_Class;

/**
 * Interface ConnectionInterface
 * Description
 *
 * @package EventEspresso\core\services\graphql
 * @author  Brent Christensen
 * @since   5.0.0.p
 */
interface ConnectionInterface
{
    /**
     * @return array
     * @since 5.0.0.p
     */
    public function config();

    /**
     * @param $entity
     * @param $args
     * @param $context
     * @param $info
     * @return array
     * @since 5.0.0.p
     */
    public function resolveConnection($entity, $args, $context, $info);
}
