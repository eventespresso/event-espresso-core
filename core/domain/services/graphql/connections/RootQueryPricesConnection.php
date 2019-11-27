<?php

namespace EventEspresso\core\domain\services\graphql\connections;

use EEM_Price;
use EventEspresso\core\domain\services\graphql\connection_resolvers\PriceConnectionResolver;
use EventEspresso\core\domain\services\graphql\abstracts\AbstractRootQueryConnection;
use Exception;

/**
 * Class RootQueryPricesConnection
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\connections
 * @author  Manzoor Ahmad Wani
 * @since   $VID:$
 */
class RootQueryPricesConnection extends AbstractRootQueryConnection
{

    /**
     * @var EEM_Price $model
     */
    protected $model;


    /**
     * PriceConnection constructor.
     *
     * @param EEM_Price               $model
     */
    public function __construct(EEM_Price $model)
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
            'toType'             => 'Price',
            'fromFieldName'      => 'prices',
            'connectionTypeName' => 'RootQueryPricesConnection',
            'connectionArgs'     => TicketPricesConnection::get_connection_args(),
            'resolve'            => [$this, 'resolveConnection'],
            'resolveNode'        => [$this, 'resolveNode']
        ];
    }


    /**
     * @param $entity
     * @param $args
     * @param $context
     * @param $info
     * @return PriceConnectionResolver
     * @throws Exception
     * @since $VID:$
     */
    public function getConnectionResolver($entity, $args, $context, $info)
    {
        return new PriceConnectionResolver($entity, $args, $context, $info);
    }
}
