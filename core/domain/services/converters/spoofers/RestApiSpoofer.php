<?php

namespace EventEspresso\core\domain\services\converters\spoofers;

use DomainException;
use EE_Error;
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
     * @var Read
     */
    protected $rest_api;


    /**
     * RestApiSpoofer constructor.
     *
     * @param Read     $rest_api
     * @param string   $api_version
     */
    public function __construct(Read $rest_api, $api_version = '4.8.36')
    {
        $this->rest_api = $rest_api;
        $this->rest_api->setRequestedVersion($api_version);
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
        /** @type array $results */
        $results = $model->get_all_wpdb_results($query_params);
        $rest_request = new WP_REST_Request();
        $rest_request->set_param('include', $include);
        $rest_request->set_param('caps', 'edit');
        $nice_results = array();
        foreach ($results as $result) {
            $nice_results[] = $this->rest_api->createEntityFromWpdbResult(
                $model,
                $result,
                $rest_request
            );
        }
        return $nice_results;
    }
}
