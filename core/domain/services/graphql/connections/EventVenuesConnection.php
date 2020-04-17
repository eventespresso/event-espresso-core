<?php

namespace EventEspresso\core\domain\services\graphql\connections;

use EE_Base_Class;
use EEM_Venue;
use EventEspresso\core\domain\services\graphql\connection_resolvers\VenueConnectionResolver;
use EventEspresso\core\services\graphql\connections\ConnectionBase;
use Exception;
use WPGraphQL\Data\DataSource;

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
        $this->model = $model;
    }


    /**
     * @return array
     * @since $VID:$
     */
    public function config()
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
     * @return array
     * @throws Exception
     * @since $VID:$
     */
    public function resolveConnection($entity, $args, $context, $info)
    {
        $resolver = new VenueConnectionResolver($entity, $args, $context, $info);
        return $resolver->get_connection();
    }
}
