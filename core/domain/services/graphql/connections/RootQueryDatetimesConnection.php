<?php

namespace EventEspresso\core\domain\services\graphql\connections;

use EEM_Datetime;
use EventEspresso\core\domain\services\graphql\connection_resolvers\AbstractConnectionResolver;
use EventEspresso\core\domain\services\graphql\connection_resolvers\DatetimeConnectionResolver;
use EventEspresso\core\domain\services\graphql\abstracts\AbstractRootQueryConnection;
use Exception;

/**
 * Class RootQueryDatetimesConnection
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\connections
 * @author  Manzoor Ahmad Wani
 * @since   5.0.0.p
 */
class RootQueryDatetimesConnection extends AbstractRootQueryConnection
{
    /**
     * DatetimeConnection constructor.
     *
     * @param EEM_Datetime               $model
     */
    public function __construct(EEM_Datetime $model)
    {
        parent::__construct($model);
    }


    /**
     * @return array
     */
    public function config(): array
    {
        return [
            'fromType'           => 'RootQuery',
            'toType'             => $this->namespace . 'Datetime',
            'fromFieldName'      => lcfirst($this->namespace . 'Datetimes'),
            'connectionTypeName' => "{$this->namespace}RootQueryDatetimesConnection",
            'connectionArgs'     => EventDatetimesConnection::get_connection_args(),
            'resolve'            => [$this, 'resolveConnection'],
        ];
    }


    /**
     * @param $entity
     * @param $args
     * @param $context
     * @param $info
     * @return DatetimeConnectionResolver
     * @throws Exception
     */
    public function getConnectionResolver($entity, $args, $context, $info): AbstractConnectionResolver
    {
        return new DatetimeConnectionResolver($entity, $args, $context, $info);
    }
}
