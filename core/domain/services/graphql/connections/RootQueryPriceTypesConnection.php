<?php

namespace EventEspresso\core\domain\services\graphql\connections;

use EEM_Price_Type;
use EventEspresso\core\domain\services\graphql\connection_resolvers\AbstractConnectionResolver;
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
     * PriceTypeConnection constructor.
     *
     * @param EEM_Price_Type               $model
     */
    public function __construct(EEM_Price_Type $model)
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
            'toType'             => $this->namespace . 'PriceType',
            'fromFieldName'      => lcfirst($this->namespace) . 'PriceTypes',
            'connectionTypeName' => "{$this->namespace}RootQueryPriceTypesConnection",
            'resolve'            => [$this, 'resolveConnection'],
        ];
    }


    /**
     * @param $entity
     * @param $args
     * @param $context
     * @param $info
     * @return PriceTypeConnectionResolver
     * @throws Exception
     */
    public function getConnectionResolver($entity, $args, $context, $info): AbstractConnectionResolver
    {
        return new PriceTypeConnectionResolver($entity, $args, $context, $info);
    }
}
