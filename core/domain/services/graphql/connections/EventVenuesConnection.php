<?php

namespace EventEspresso\core\domain\services\graphql\connections;

use EEM_Venue;
use EventEspresso\core\domain\services\graphql\connection_resolvers\VenueConnectionResolver;
use EventEspresso\core\services\graphql\connections\ConnectionBase;
use Exception;
use GraphQL\Deferred;

/**
 * Class EventVenuesConnection
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\connections
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EventVenuesConnection extends ConnectionBase
{
    /**
     * DatetimeConnection constructor.
     *
     * @param EEM_Venue $model
     */
    public function __construct(EEM_Venue $model)
    {
        parent::__construct($model);
    }


    /**
     * @return array
     */
    public function config(): array
    {
        return [
            'fromType'           => $this->namespace . 'Event',
            'toType'             => $this->namespace . 'Venue',
            'fromFieldName'      => 'venues',
            'connectionTypeName' => "{$this->namespace}EventVenuesConnection",
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
        $resolver = new VenueConnectionResolver($entity, $args, $context, $info);
        return $resolver->get_connection();
    }
}
