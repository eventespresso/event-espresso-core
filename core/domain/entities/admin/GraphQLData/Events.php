<?php

namespace EventEspresso\core\domain\entities\admin\GraphQLData;

class Events extends GraphQLData
{

    /**
     * @inheritDoc
     */
    public function getData(array $where_params = [])
    {
        $field_key = lcfirst($this->namespace) . 'Events';
        $query     = <<<QUERY
        query GET_EVENTS(\$where: {$this->namespace}RootQueryEventsConnectionWhereArgs, \$first: Int, \$last: Int ) {
            {$field_key}(where: \$where, first: \$first, last: \$last) {
                nodes {
                    id
                    dbId
                    cacheId
                    additionalLimit
                    allowOverflow
                    created
                    description
                    displayDescription
                    displayTicketSelector
                    externalUrl
                    isActive
                    isCancelled
                    isExpired
                    isInactive
                    isPostponed
                    isSoldOut
                    isTrashed
                    isUpcoming
                    memberOnly
                    name
                    order
                    phone
                    shortDescription
                    status
                    timezoneString
                    visibleOn
                    wpUser
                    __typename
                }
                __typename
            }
        }
QUERY;
        $this->setParams(
            [
                'operation_name' => 'GET_EVENTS',
                'variables'      => [
                    'first' => 500,
                ],
                'query'          => $query,
            ]
        );
        \EEH_Debug_Tools::printr($query, '$query', __FILE__, __LINE__);

        return $this->getQueryResponse($field_key, $where_params);
    }
}
