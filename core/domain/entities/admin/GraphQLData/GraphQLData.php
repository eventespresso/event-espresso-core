<?php

namespace EventEspresso\core\domain\entities\admin\GraphQLData;

use Exception;

/**
 * Class GraphQLData
 * abstract parent class for processing GQL requests
 *
 * @package EventEspresso\core\domain\entities\admin\GraphQLData
 * @author  Manzoor Wani
 * @since   5.0.0.p
 */
abstract class GraphQLData implements GraphQLDataInterface
{
    public const QUERY_LIMIT = 250;

    /**
     * @var string $namespace The graphql namespace/prefix.
     */
    protected string $namespace = 'Espresso';

    private array $params = [];


    /**
     * @param array $params
     */
    public function setParams(array $params)
    {
        $this->params = $params;
    }


    /**
     * @param string $field_key
     * @param array  $where_params
     * @return mixed|null
     * @since 5.0.0.p
     */
    protected function getQueryResponse(string $field_key, array $where_params = [])
    {
        if (! empty($where_params)) {
            if (! array_key_exists('variables', $this->params)) {
                $this->params['variables'] = [];
            }
            $this->params['variables']['where'] = $where_params;
        }

        $responseData = $this->makeGraphQLRequest($this->params);
        return ! empty($responseData[ $field_key ]) ? $responseData[ $field_key ] : null;
    }


    /**
     * @param array $data
     * @return array|null
     * @since 5.0.0.p
     */
    protected function makeGraphQLRequest(array $data): ?array
    {
        $error = '';
        try {
            $response = graphql($data);
            if (! empty($response['data'])) {
                return $response['data'];
            }
            $error = ! empty($response['errors'])
                ? print_r($response['errors'], true)
                : esc_html__(
                    'An unknown error has occurred during the GraphQL request and no data was found to return.',
                    'event_espresso'
                );
        } catch (Exception $e) {
            if (defined('GRAPHQL_DEBUG') && GRAPHQL_DEBUG) {
                $error = $e->getMessage();
            }
        }
        if ($error !== '') {
            error_log($error);
        }
        return null;
    }
}
