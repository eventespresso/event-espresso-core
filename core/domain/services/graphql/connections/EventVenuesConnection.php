<?php

namespace EventEspresso\core\domain\services\graphql\connections;

use EE_Base_Class;
use EEM_Venue;
use EventEspresso\core\domain\services\graphql\connection_resolvers\VenueConnectionResolver;
use EventEspresso\core\services\graphql\connections\ConnectionInterface;
use Exception;

/**
 * Class EventVenuesConnection
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\connections
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EventVenuesConnection implements ConnectionInterface
{

    /**
     * @var EEM_Venue $model
     */
    protected $model;


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
            'fromType'           => 'Event',
            'toType'             => 'Venue',
            'fromFieldName'      => 'venues',
            'connectionTypeName' => 'EventVenuesConnection',
            'resolve'            => [$this, 'resolveConnection'],
            'resolveNode'        => [$this, 'resolveNode']
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


    /**
     * @param $id
     * @param $args
     * @param $context
     * @param $info
     * @return EE_Base_Class
     * @since $VID:$
     */
    public function resolveNode($id, $args, $context, $info)
    {
        return $this->model->get_one_by_ID($id);
    }
}