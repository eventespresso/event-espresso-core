<?php

namespace EventEspresso\core\domain\entities\admin\GraphQLData;

/**
 * Class Venues
 * Description
 *
 * @package EventEspresso\core\domain\entities\admin\GraphQLData
 * @author  Manzoor Wani
 * @since   $VID:$
 */
class Venues extends GraphQLData
{
    /**
     * @param array $where_params
     * @return array|null
     * @since $VID:$
     */
    public function getData(array $where_params = [])
    {
        $field_key = lcfirst($this->namespace) . 'Venues';
        $query = <<<QUERY
        query GET_VENUES(\$where: RootQueryTo{$this->namespace}VenueConnectionWhereArgs, \$first: Int, \$last: Int ) {
            {$field_key}(where: \$where, first: \$first, last: \$last) {
                nodes {
                    id
                    address
                    address2
                    cacheId
                    capacity
                    city
                    countryISO
                    countryName
                    dbId
                    name
                    description
                    googleMapLink
                    phone
                    shortDescription
                    stateAbbrev
                    stateName
                    thumbnail
                    url
                    zip
                    __typename
                }
                __typename
            }
        }
QUERY;
        $this->setParams([
            'operation_name' => 'GET_VENUES',
            'variables'      => [
                'first' => 100,
            ],
            'query'          => $query,
        ]);

        return $this->getQueryResponse($field_key, $where_params);
    }
}
