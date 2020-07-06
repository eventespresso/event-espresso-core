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
     * JsonDataNodeHandler constructor.
     *
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
        $graphqlEndpoint = class_exists('WPGraphQL') ? trailingslashit(site_url()) . Router::$route : '';
        $this->addData('graphqlEndpoint', esc_url($graphqlEndpoint));
        $this->setInitialized(true);
    }
}
