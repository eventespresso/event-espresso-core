<?php

namespace EventEspresso\core\domain\entities\admin\GraphQLData;

/**
 * Class Prices
 * Description
 *
 * @package EventEspresso\core\domain\entities\admin\GraphQLData
 * @author  Manzoor Wani
 * @since   5.0.0.p
 */
class Prices extends GraphQLData
{
    /**
     * @param array $where_params
     * @return array|null
     * @since 5.0.0.p
     */
    public function getData(array $where_params = []): ?array
    {
        $field_key = lcfirst($this->namespace) . 'Prices';
        $query = <<<QUERY
        query GET_PRICES(\$where: {$this->namespace}RootQueryPricesConnectionWhereArgs, \$first: Int, \$last: Int ) {
            $field_key(where: \$where, first: \$first, last: \$last) {
                nodes {
                    id
                    dbId
                    amount
                    cacheId
                    description
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
        $this->setParams([
            'operation_name' => 'GET_PRICES',
            'variables'      => [
                'first' => GraphQLData::QUERY_LIMIT,
            ],
            'query'          => $query,
        ]);

        return $this->getQueryResponse($field_key, $where_params);
    }
}
