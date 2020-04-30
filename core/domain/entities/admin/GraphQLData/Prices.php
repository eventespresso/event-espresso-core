<?php

namespace EventEspresso\core\domain\entities\admin\GraphQLData;

/**
 * Class Prices
 * Description
 *
 * @package EventEspresso\core\domain\entities\admin\GraphQLData
 * @author  Manzoor Wani
 * @since   $VID:$
 */
class Prices extends GraphQLData
{

    /**
     * @param array $where_params
     * @return array|null
     * @since $VID:$
     */
    public function getData(array $where_params = [])
    {
        $field_key = lcfirst($this->namespace) . 'Prices';
        $query = <<<QUERY
        query GET_PRICES(\$where: {$this->namespace}RootQueryPricesConnectionWhereArgs, \$first: Int, \$last: Int ) {
            {$field_key}(where: \$where, first: \$first, last: \$last) {
                nodes {
                    id
                    dbId
                    amount
                    cacheId
                    desc
                    isBasePrice
                    isDefault
                    isDiscount
                    isPercent
                    isTax
                    isTrashed
                    name
                    order
                    overrides
                    __typename
                }
                __typename
            }
        }
QUERY;
        $data = [
            'operation_name' => 'GET_PRICES',
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
