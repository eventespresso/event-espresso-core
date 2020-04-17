<?php

namespace EventEspresso\core\domain\services\graphql\abstracts;

use EE_Base_Class;
use EEM_Base;
use EventEspresso\core\domain\services\graphql\connection_resolvers\AbstractConnectionResolver;
use EventEspresso\core\services\graphql\connections\ConnectionBase;
use Exception;

/**
 * Class RootQueryConnection
 * Shared logic for RootQueryConnections
 *
 * @package EventEspresso\core\domain\services\graphql\connections
 * @author  Manzoor Ahmad Wani
 * @since   $VID:$
 */
abstract class AbstractRootQueryConnection extends ConnectionBase
{


    /**
     * @param $entity
     * @param $args
     * @param $context
     * @param $info
     * @return AbstractConnectionResolver
     * @throws Exception
     * @since $VID:$
     */
    abstract public function getConnectionResolver($entity, $args, $context, $info);


    /**
     * @param $entity
     * @param $args
     * @param $context
     * @param $info
     * @return array
     * @throws Exception
     * @since $VID:$
     */
    public function resolveConnection($entity, $args, $context, $info)
    {
        $resolver = $this->getConnectionResolver($entity, $args, $context, $info);
        return $resolver->get_connection();
    }
}
