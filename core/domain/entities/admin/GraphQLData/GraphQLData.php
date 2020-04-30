<?php

namespace EventEspresso\core\domain\entities\admin\GraphQLData;

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
        } catch (\Exception $e) {
            // do something with the errors thrown
            return null;
        }
    }
}