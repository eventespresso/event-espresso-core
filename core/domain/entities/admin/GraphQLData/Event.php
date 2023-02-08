<?php

namespace EventEspresso\core\domain\entities\admin\GraphQLData;

class Event extends GraphQLData
{
    /**
     * @inheritDoc
     * @param mixed[] $params
     */
    public function getData($params = [])
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
                venue
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
