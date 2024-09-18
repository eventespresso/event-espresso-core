<?php

namespace EventEspresso\core\domain\services\converters;

use DomainException;
use EE_Error;
use EED_Core_Rest_Api;
use EEM_Base;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\exceptions\ModelConfigurationException;
use EventEspresso\core\exceptions\RestPasswordIncorrectException;
use EventEspresso\core\exceptions\RestPasswordRequiredException;
use EventEspresso\core\exceptions\UnexpectedEntityException;
use EventEspresso\core\libraries\rest_api\controllers\model\Read;
use EventEspresso\core\libraries\rest_api\RestException;
use InvalidArgumentException;
use ReflectionException;
use WP_REST_Request;
use WP_REST_Server;

/**
 * Class RestApiSpoofer
 * Description
 *
 * @package EventEspresso\core\domain\services\converters\spoofers
 * @author  Brent Christensen
 * @since   5.0.0.p
 */
class RestApiSpoofer
{
    protected EED_Core_Rest_Api $rest_module;

    protected Read $rest_controller;

    protected WP_REST_Server $wp_rest_server;


    /**
     * RestApiSpoofer constructor.
     *
     * @param WP_REST_Server    $wp_rest_server
     * @param EED_Core_Rest_Api $rest_module
     * @param Read              $rest_api
     * @param string            $api_version
     */
    public function __construct(
        WP_REST_Server $wp_rest_server,
        EED_Core_Rest_Api $rest_module,
        Read $rest_api,
        string $api_version = '4.8.36'
    ) {
        $this->wp_rest_server  = $wp_rest_server;
        $this->rest_module     = $rest_module;
        $this->rest_controller = $rest_api;
        $this->rest_controller->setRequestedVersion($api_version);
        $this->setUpRestServer();
    }


    private function setUpRestServer()
    {
        /* @var WP_REST_Server $wp_rest_server */
        global $wp_rest_server;
        $wp_rest_server = $this->wp_rest_server;
        EED_Core_Rest_Api::set_hooks_both();
        do_action('rest_api_init', $this->wp_rest_server);
    }


    /**
     * @param EEM_Base $model
     * @param array    $query_params
     * @param string   $include
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ModelConfigurationException
     * @throws ReflectionException
     * @throws RestException
     * @throws RestPasswordIncorrectException
     * @throws RestPasswordRequiredException
     * @throws UnexpectedEntityException
     * @throws DomainException
     * @since 5.0.0.p
     */
    public function getOneApiResult(EEM_Base $model, array $query_params, string $include = '')
    {
        if (! array_key_exists('limit', $query_params)) {
            $query_params['limit'] = 1;
        }
        $result = $this->getApiResults($model, $query_params, $include);
        return $result[0] ?? [];
    }


    /**
     * @param EEM_Base $model
     * @param array    $query_params
     * @param string   $include
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ModelConfigurationException
     * @throws ReflectionException
     * @throws RestException
     * @throws RestPasswordIncorrectException
     * @throws RestPasswordRequiredException
     * @throws UnexpectedEntityException
     * @throws DomainException
     * @since 5.0.0.p
     */
    public function getApiResults(EEM_Base $model, array $query_params, string $include = ''): array
    {
        if (! array_key_exists('caps', $query_params)) {
            $query_params['caps'] = EEM_Base::caps_read_admin;
        }
        if (! array_key_exists('default_where_conditions', $query_params)) {
            $query_params['default_where_conditions'] = 'none';
        }
        /** @type array $results */
        $results      = $model->get_all_wpdb_results($query_params);
        $rest_request = new WP_REST_Request();
        $rest_request->set_param('include', $include);
        $rest_request->set_param('caps', 'edit');
        $nice_results = [];
        foreach ($results as $result) {
            $nice_results[] = $this->rest_controller->createEntityFromWpdbResult(
                $model,
                $result,
                $rest_request
            );
        }
        return $nice_results;
    }


    /**
     * @param string $endpoint
     * @return array
     * @since 5.0.0.p
     */
    public function getModelSchema(string $endpoint)
    {
        $response = $this->wp_rest_server->dispatch(
            new WP_REST_Request('OPTIONS', "/ee/v4.8.36/$endpoint")
        );
        return $response->get_data();
    }
}
