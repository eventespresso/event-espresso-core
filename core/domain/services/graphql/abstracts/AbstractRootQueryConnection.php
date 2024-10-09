<?php

namespace EventEspresso\core\domain\services\graphql\abstracts;

use EventEspresso\core\domain\services\graphql\connection_resolvers\AbstractConnectionResolver;
use EventEspresso\core\services\graphql\connections\ConnectionBase;
use Exception;
use GraphQL\Deferred;
use WPGraphQL\AppContext;
use GraphQL\Type\Definition\ResolveInfo;

/**
 * Class RootQueryConnection
 * Shared logic for RootQueryConnections
 *
 * @package EventEspresso\core\domain\services\graphql\connections
 * @author  Manzoor Ahmad Wani
 * @since   5.0.0.p
 */
abstract class AbstractRootQueryConnection extends ConnectionBase
{
    /**
     * @param string|int $entity   ID or functional equivalent (scalar, never object)
     * @param array         $args     Arguments to be passed to the connection's resolver
     * @param AppContext    $context  Class AppContext Creates an object that contains all of the context for the GraphQL query This class gets instantiated and populated in the main WPGraphQL class
     * @param ResolveInfo   $info     Structure containing information useful for field resolution process.
     * @return AbstractConnectionResolver
     * @throws Exception
     */
    abstract public function getConnectionResolver($entity, $args, $context, $info): AbstractConnectionResolver;


    /**
     * @param $entity
     * @param $args
     * @param $context
     * @param $info
     * @return mixed|array|Deferred
     * @throws Exception
     */
    public function resolveConnection($entity, $args, $context, $info)
    {
        $resolver = $this->getConnectionResolver($entity, $args, $context, $info);
        return $resolver->get_connection();
    }
}
