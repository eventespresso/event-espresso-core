<?php

namespace EventEspresso\core\domain\services\graphql\mutators;

use EEM_Datetime;
use EventEspresso\core\domain\services\graphql\types\Datetime;

class DatetimeBulkUpdate extends EntityMutator
{

    /**
     * Defines the mutation data modification closure.
     *
     * @param EEM_Datetime $model
     * @param Datetime     $type
     * @return callable
     */
    public static function mutateAndGetPayload(EEM_Datetime $model, Datetime $type): callable
    {
        $entityMutator = DatetimeUpdate::mutateAndGetPayload($model, $type);
        $bulkMutator = new BulkEntityMutator($entityMutator);
        return array($bulkMutator, 'updateEntities');
    }
}
