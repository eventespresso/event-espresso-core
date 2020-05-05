<?php

namespace EventEspresso\core\domain\entities\admin\GraphQLData;

use Exception;

/**
 * Class GraphQLData
 * Description
 *
 * @package EventEspresso\core\domain\entities\admin\GraphQLData
 * @author  Manzoor Wani
 * @since   $VID:$
 */
abstract class GraphQLData implements GraphQLDataInterface
{

    /**
     * @var string $namespace The graphql namespace/prefix.
     */
    protected $namespace = 'Espresso';

    /**
     * @var array $params
     */
    private $params = [];


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
     * @since $VID:$
     */
    protected function getQueryResponse($field_key, array $where_params = [])
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
     * @return array
     * @since $VID:$
     */
    protected function makeGraphQLRequest($data)
    {
        try {
            $response = graphql($data);
            if (! empty($response['data'])) {
                return $response['data'];
            }
            return null;
        } catch (Exception $e) {
            // do something with the errors thrown
            return null;
        }
    }
}
