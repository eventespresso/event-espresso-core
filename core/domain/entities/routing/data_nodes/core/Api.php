<?php

namespace EventEspresso\core\domain\entities\routing\data_nodes\core;

use DomainException;
use EED_Core_Rest_Api;
use EventEspresso\core\services\json\JsonDataNode;
use EventEspresso\core\services\json\JsonDataNodeValidator;
use WPGraphQL\Router;

/**
 * Class Config
 * Description
 *
 * @package EventEspresso\core\domain\entities\routing\data_nodes
 * @author  Brent Christensen
 * @since   $VID:$
 */
class Api extends JsonDataNode
{
    const NODE_NAME = 'api';


    /**
     * @param JsonDataNodeValidator $validator
     */
    public function __construct(JsonDataNodeValidator $validator)
    {
        parent::__construct($validator);
        $this->setNodeName(Api::NODE_NAME);
    }


    /**
     * @throws DomainException
     * @since $VID:$
     */
    public function initialize()
    {
        $this->addData('restApiNonce', wp_create_nonce('wp_rest'));
        $this->addData('restApiBaseUrl', rest_url());
        $this->addData('restApiRouteUrl', rest_url('ee/v4.8.36/'));
        $this->addData('restApiCollectionEndpoints', EED_Core_Rest_Api::getCollectionRoutesIndexedByModelName());
        $this->addData('restApiPrimaryKeys', EED_Core_Rest_Api::getPrimaryKeyNamesIndexedByModelName());

        // route can be something like 'graphql'
        $route = trim(Router::$route, '/');
        // make sure we are dealing with sane folks
        $has_pretty_permalinks = (bool) get_option('permalink_structure');
        // if pretty permalinks, use '/graphql' otherwise '?graphql=1'
        $graphqlEndpoint = $has_pretty_permalinks ? site_url($route) : add_query_arg($route, 1, site_url());
        $this->addData('graphqlEndpoint', esc_url($graphqlEndpoint));
        $this->setInitialized(true);
    }
}
