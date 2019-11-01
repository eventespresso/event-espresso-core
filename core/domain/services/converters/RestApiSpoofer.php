<?php
/**
 *     Event Espresso
 *     Manage events, sell tickets, and receive payments from your WordPress website.
 *     Copyright (c) 2008-2019 Event Espresso  All Rights Reserved.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

namespace EventEspresso\core\domain\services\converters;

use DomainException;
use EE_Base_Class;
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
 * @since   $VID:$
 */
class RestApiSpoofer
{

    /**
     * @var WP_REST_Server $wp_rest_server
     */
    protected $wp_rest_server;

    /**
     * @var Read
     */
    protected $rest_controller;

    /**
     * @var EED_Core_Rest_Api $rest_module
     */
    protected $rest_module;


    /**
     * RestApiSpoofer constructor.
     *
     * @param WP_REST_Server        $wp_rest_server
     * @param EED_Core_Rest_Api $rest_module
     * @param Read                  $rest_api
     * @param string                $api_version
     */
    public function __construct(
        WP_REST_Server $wp_rest_server,
        EED_Core_Rest_Api $rest_module,
        Read $rest_api,
        $api_version = '4.8.36'
    ) {
        $this->wp_rest_server = $wp_rest_server;
        $this->rest_module = $rest_module;
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
     * @since $VID:$
     */
    public function getOneApiResult(EEM_Base $model, array $query_params, $include = '')
    {
        if (! array_key_exists('limit', $query_params)) {
            $query_params['limit'] = 1;
        }
        $result = $this->getApiResults($model, $query_params, $include);
        return is_array($result) && isset($result[0]) ? $result[0] : [];
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
     * @since $VID:$
     */
    public function getApiResults(EEM_Base $model, array $query_params, $include = '')
    {
        if (! array_key_exists('caps', $query_params)) {
            $query_params['caps'] = EEM_Base::caps_read_admin;
        }
        /** @type array $results */
        $results = $model->get_all_wpdb_results($query_params);
        $rest_request = new WP_REST_Request();
        $rest_request->set_param('include', $include);
        $rest_request->set_param('caps', 'edit');
        $nice_results = array();
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
     * @throws EE_Error
     * @since $VID:$
     */
    public function getModelSchema($endpoint)
    {
        $response = $this->wp_rest_server->dispatch(
            new WP_REST_Request(
                'OPTIONS',
                "/ee/v4.8.36/{$endpoint}"
            )
        );
        return $response->get_data();
    }
}
