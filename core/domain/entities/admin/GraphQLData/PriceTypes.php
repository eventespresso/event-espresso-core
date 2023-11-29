<?php

namespace EventEspresso\core\domain\entities\admin\GraphQLData;

/**
 * Class PriceTypes
 * Description
 *
 * @package EventEspresso\core\domain\entities\admin\GraphQLData
 * @author  Manzoor Wani
 * @since   5.0.0.p
 */
class PriceTypes extends GraphQLData
{
    /**
     * @param array $where_params
     * @return array|null
     * @since 5.0.0.p
     */
    public function getData(array $where_params = []): ?array
    {
        $field_key = lcfirst($this->namespace) . 'PriceTypes';
        $query = <<<QUERY
        query GET_PRICE_TYPES(\$first: Int, \$last: Int ) {
            $field_key(first: \$first, last: \$last) {
                nodes {
                    id
                    dbId
                    baseType
                    cacheId
                    isBasePrice
                    isDiscount
                    isPercent
                    isTax
                    isTrashed
                    name
                    order
                    __typename
                }
                __typename
            }
        }
QUERY;
        $this->setParams([
            'operation_name' => 'GET_PRICE_TYPES',
            'variables'      => [
                'first' => GraphQLData::QUERY_LIMIT,
            ],
            'query'          => $query,
        ]);

        return $this->getQueryResponse($field_key, $where_params);
    }
}
