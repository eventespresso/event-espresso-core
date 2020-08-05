<?php

namespace EventEspresso\core\domain\services\graphql\mutators;

use EEM_Ticket;
use EventEspresso\core\domain\services\graphql\types\Ticket;

class TicketBulkUpdate extends EntityMutator
{

    /**
     * Defines the mutation data modification closure.
     *
     * @param EEM_Ticket $model
     * @param Ticket     $type
     * @return callable
     */
    public static function mutateAndGetPayload(EEM_Ticket $model, Ticket $type)
    {
        $entityMutator = TicketUpdate::mutateAndGetPayload($model, $type);
        $bulkMutator = new BulkEntityMutator($entityMutator);
        return array($bulkMutator, 'updateEntities');
    }
}
