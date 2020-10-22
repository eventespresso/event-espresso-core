<?php

namespace EventEspresso\core\domain\entities\admin\GraphQLData;

class Event extends GraphQLData
{

    /**
     * @inheritDoc
     */
    public function getData(array $params = [])
    {
        $field_key = lcfirst($this->namespace) . 'Event';
        $query     = <<<QUERY
        query GET_EVENT(\$id: ID!) {
            {$field_key}(id: \$id, idType: DATABASE_ID) {
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
                isUpcoming
                memberOnly
                name
                order
                phone
                shortDescription
                status
                timezoneString
                visibleOn
                __typename
            }
        }
QUERY;
        $this->setParams(
            [
                'operation_name' => 'GET_EVENT',
                'variables'      => $params,
                'query'          => $query,
            ]
        );
        \EEH_Debug_Tools::printr($query, '$query', __FILE__, __LINE__);

        return $this->getQueryResponse($field_key);
    }
}
