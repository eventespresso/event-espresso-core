<?php

namespace EventEspresso\core\domain\services\graphql\connections;

use EE_Base_Class;
use EEM_Base;
use EventEspresso\core\domain\services\graphql\connection_resolvers\AbstractConnectionResolver;
use EventEspresso\core\services\graphql\connections\ConnectionInterface;
use Exception;

/**
 * Class RootQueryConnection
 * Shared logic for RootQueryConnections
 *
 * @package EventEspresso\core\domain\services\graphql\connections
 * @author  Manzoor Ahmad Wani
 * @since   $VID:$
 */
abstract class AbstractRootQueryConnection implements ConnectionInterface
{

    /**
     * @var EEM_Base $model
     */
    protected $model;


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


    /**
     * @param $id
     * @param $args
     * @param $context
     * @param $info
     * @return EE_Base_Class
     * @since $VID:$
     */
    public function resolveNode($id, $args, $context, $info)
    {
        return $this->model->get_one_by_ID($id);
    }
}