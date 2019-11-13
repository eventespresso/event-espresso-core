<?php

namespace EventEspresso\core\services\graphql\connections;

use EE_Base_Class;

/**
 * Interface ConnectionInterface
 * Description
 *
 * @package EventEspresso\core\services\graphql
 * @author  Brent Christensen
 * @since   $VID:$
 */
interface ConnectionInterface
{

    /**
     * @return array
     * @since $VID:$
     */
    public function config();

    /**
     * @param $entity
     * @param $args
     * @param $context
     * @param $info
     * @return array
     * @since $VID:$
     */
    public function resolveConnection($entity, $args, $context, $info);

    /**
     * @param $id
     * @param $args
     * @param $context
     * @param $info
     * @return EE_Base_Class
     * @since $VID:$
     */
    public function resolveNode($id, $args, $context, $info);
}
