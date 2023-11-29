<?php

namespace EventEspresso\core\domain\entities\admin\GraphQLData;

/**
 * Class Datetimes
 * Description
 *
 * @package EventEspresso\core\domain\entities\admin\GraphQLData
 * @author  Manzoor Wani
 * @since   5.0.0.p
 */
class Datetimes extends GraphQLData
{
    /**
     * @param array $where_params
     * @return array|null
     * @since 5.0.0.p
     */
    public function getData(array $where_params = []): ?array
    {
        $field_key = lcfirst($this->namespace) . 'Datetimes';
        $query = <<<QUERY
        query GET_DATETIMES(\$where: {$this->namespace}RootQueryDatetimesConnectionWhereArgs, \$first: Int, \$last: Int ) {
            $field_key(where: \$where, first: \$first, last: \$last) {
                nodes {
                    id
                    dbId
                    cacheId
                    capacity
                    description
                    endDate
                    isActive
                    isExpired
                    isPrimary
                    isSoldOut
                    isTrashed
                    isUpcoming
                    length
                    name
                    order
                    reserved
                    sold
                    status
                    startDate
                    venue
                    __typename
                }
                __typename
            }
        }
QUERY;
        $this->setParams([
            'operation_name' => 'GET_DATETIMES',
            'variables'      => [
                'first' => GraphQLData::QUERY_LIMIT,
            ],
            'query'          => $query,
        ]);

        return $this->getQueryResponse($field_key, $where_params);
    }
}
