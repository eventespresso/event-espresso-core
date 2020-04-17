<?php

namespace EventEspresso\core\domain\services\graphql\connections;

use EE_Base_Class;
use EEM_Datetime;
use EventEspresso\core\domain\services\graphql\connection_resolvers\DatetimeConnectionResolver;
use EventEspresso\core\domain\services\graphql\connections\EventDatetimesConnection;
use EventEspresso\core\services\graphql\connections\ConnectionBase;
use Exception;

/**
 * Class TicketDatetimesConnection
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\connections
 * @author  Brent Christensen
 * @since   $VID:$
 */
class TicketDatetimesConnection extends ConnectionBase
{


    /**
     * DatetimeConnection constructor.
     *
     * @param EEM_Datetime $model
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
            'fromType'           => $this->namespace . 'Ticket',
            'toType'             => $this->namespace . 'Datetime',
            'fromFieldName'      => 'datetimes',
            'connectionTypeName' => "{$this->namespace}TicketDatetimesConnection",
            'connectionArgs'     => EventDatetimesConnection::get_connection_args(),
            'resolve'            => [$this, 'resolveConnection'],
        ];
    }


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
        $resolver = new DatetimeConnectionResolver($entity, $args, $context, $info);
        return $resolver->get_connection();
    }
}
