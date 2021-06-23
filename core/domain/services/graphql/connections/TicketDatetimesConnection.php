<?php

namespace EventEspresso\core\domain\services\graphql\connections;

use EEM_Datetime;
use EventEspresso\core\domain\services\graphql\connection_resolvers\DatetimeConnectionResolver;
use EventEspresso\core\services\graphql\connections\ConnectionBase;
use Exception;
use GraphQL\Deferred;

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
        parent::__construct($model);
    }


    /**
     * @return array
     */
    public function config(): array
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
     * @return array|Deferred|mixed
     * @throws Exception
     */
    public function resolveConnection($entity, $args, $context, $info)
    {
        $resolver = new DatetimeConnectionResolver($entity, $args, $context, $info);
        return $resolver->get_connection();
    }
}
