<?php

namespace EventEspresso\core\domain\services\graphql\connections;

use EEM_Price_Type;
use EventEspresso\core\domain\services\graphql\connection_resolvers\PriceTypeConnectionResolver;
use EventEspresso\core\domain\services\graphql\abstracts\AbstractRootQueryConnection;
use Exception;

/**
 * Class RootQueryPriceTypesConnection
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\connections
 * @author  Manzoor Ahmad Wani
 * @since   $VID:$
 */
class RootQueryPriceTypesConnection extends AbstractRootQueryConnection
{

    /**
     * @var EEM_Price_Type $model
     */
    protected $model;


    /**
     * PriceTypeConnection constructor.
     *
     * @param EEM_Price_Type               $model
     */
    public function __construct(EEM_Price_Type $model)
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
            'toType'             => 'PriceType',
            'fromFieldName'      => 'priceTypes',
            'connectionTypeName' => 'RootQueryPriceTypesConnection',
            'resolve'            => [$this, 'resolveConnection'],
            'resolveNode'        => [$this, 'resolveNode']
        ];
    }


    /**
     * @param $entity
     * @param $args
     * @param $context
     * @param $info
     * @return PriceTypeConnectionResolver
     * @throws Exception
     * @since $VID:$
     */
    public function getConnectionResolver($entity, $args, $context, $info)
    {
        return new PriceTypeConnectionResolver($entity, $args, $context, $info);
    }
}
