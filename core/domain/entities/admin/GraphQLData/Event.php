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
                allowDonations
                allowOverflow
                altRegPage
                created
                defaultRegStatus
                description
                displayDescription
                displayTicketSelector
                isActive
                isCancelled
                isExpired
                isInactive
                isPostponed
                isSoldOut
                isUpcoming
                manager {
                    id
                    name
                }
                maxRegistrations
                memberOnly
                name
                order
                phoneNumber
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

        return $this->getQueryResponse($field_key);
    }
}
