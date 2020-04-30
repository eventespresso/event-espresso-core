<?php

namespace EventEspresso\core\domain\entities\admin\GraphQLData;

/**
 * Class Tickets
 * Description
 *
 * @package EventEspresso\core\domain\entities\admin\GraphQLData
 * @author  Manzoor Wani
 * @since   $VID:$
 */
class Tickets extends GraphQLData
{

    /**
     * @param array $where_params
     * @return array|null
     * @since $VID:$
     */
    public function getData(array $where_params = [])
    {
        $field_key = lcfirst($this->namespace) . 'Tickets';
        $query = <<<QUERY
        query GET_TICKETS(\$where: {$this->namespace}RootQueryTicketsConnectionWhereArgs, \$first: Int, \$last: Int ) {
            {$field_key}(where: \$where, first: \$first, last: \$last) {
                nodes {
                    id
                    cacheId
                    dbId
                    description
                    endDate
                    isDefault
                    isExpired
                    isFree
                    isOnSale
                    isPending
                    isRequired
                    isSoldOut
                    isTaxable
                    isTrashed
                    max
                    min
                    name
                    order
                    price
                    quantity
                    registrationCount
                    reserved
                    reverseCalculate
                    sold
                    startDate
                    uses
                    __typename
                }
                __typename
            }
        }
QUERY;
        $data = [
            'operation_name' => 'GET_TICKETS',
            'variables'      => [
                'first' => 100,
            ],
            'query'          => $query,
        ];

        if (! empty($where_params)) {
            $data['variables']['where'] = $where_params;
        }

        $responseData = $this->makeGraphQLRequest($data);
        return ! empty($responseData[ $field_key ]) ? $responseData[ $field_key ] : null;
    }
}
