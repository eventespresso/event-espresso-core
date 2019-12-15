<?php

namespace EventEspresso\core\domain\services\graphql\connections;

use EEM_Datetime;
use EventEspresso\core\domain\services\graphql\connection_resolvers\DatetimeConnectionResolver;
use EventEspresso\core\domain\services\graphql\abstracts\AbstractRootQueryConnection;
use Exception;

/**
 * Class RootQueryDatetimesConnection
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\connections
 * @author  Manzoor Ahmad Wani
 * @since   $VID:$
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
        $this->model = $model;
    }


    /**
     * @return array
     * @since $VID:$
     */
    public function config()
    {
        return [
            'fromType'           => 'RootQuery',
            'toType'             => $this->namespace . 'Datetime',
            'fromFieldName'      => lcfirst($this->namespace . 'Datetimes'),
            'connectionTypeName' => "{$this->namespace}RootQueryDatetimesConnection",
            'connectionArgs'     => EventDatetimesConnection::get_connection_args(),
            'resolve'            => [$this, 'resolveConnection'],
            'resolveNode'        => [$this, 'resolveNode']
        ];
    }


    /**
     * @param $entity
     * @param $args
     * @param $context
     * @param $info
     * @return DatetimeConnectionResolver
     * @throws Exception
     * @since $VID:$
     */
    public function getConnectionResolver($entity, $args, $context, $info)
    {
        return new DatetimeConnectionResolver($entity, $args, $context, $info);
    }
}
