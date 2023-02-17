<?php

namespace EventEspresso\core\domain\services\graphql\connections;

use EEM_Ticket;
use EventEspresso\core\domain\services\graphql\connection_resolvers\AbstractConnectionResolver;
use EventEspresso\core\domain\services\graphql\connection_resolvers\TicketConnectionResolver;
use EventEspresso\core\domain\services\graphql\abstracts\AbstractRootQueryConnection;
use Exception;

/**
 * Class RootQueryTicketsConnection
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\connections
 * @author  Manzoor Ahmad Wani
 * @since   $VID:$
 */
class RootQueryTicketsConnection extends AbstractRootQueryConnection
{
    /**
     * TicketConnection constructor.
     *
     * @param EEM_Ticket               $model
     */
    public function __construct(EEM_Ticket $model)
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
            'toType'             => $this->namespace . 'Ticket',
            'fromFieldName'      => lcfirst($this->namespace) . 'Tickets',
            'connectionTypeName' => "{$this->namespace}RootQueryTicketsConnection",
            'connectionArgs'     => DatetimeTicketsConnection::get_connection_args(),
            'resolve'            => [$this, 'resolveConnection'],
        ];
    }


    /**
     * @param $entity
     * @param $args
     * @param $context
     * @param $info
     * @return TicketConnectionResolver
     * @throws Exception
     */
    public function getConnectionResolver($entity, $args, $context, $info): AbstractConnectionResolver
    {
        return new TicketConnectionResolver($entity, $args, $context, $info);
    }
}
