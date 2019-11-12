<?php

namespace EventEspresso\core\domain\services\graphql\connections;

use EE_Base_Class;
use EEM_Datetime;
use EventEspresso\core\domain\services\graphql\connection_resolvers\DatetimeConnectionResolver;
use EventEspresso\core\services\graphql\connections\ConnectionInterface;
use Exception;

/**
 * Class TicketDatetimesConnection
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\connections
 * @author  Brent Christensen
 * @since   $VID:$
 */
class TicketDatetimesConnection implements ConnectionInterface
{

    /**
     * @var EEM_Datetime $model
     */
    protected $model;


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
            'fromType'           => 'Ticket',
            'toType'             => 'Datetime',
            'fromFieldName'      => 'datetimes',
            'connectionTypeName' => 'TicketDatetimesConnection',
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
        $resolver = new DatetimeConnectionResolver($entity, $args, $context, $info);
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