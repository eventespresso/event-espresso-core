<?php

namespace EventEspresso\core\domain\entities\admin\GraphQLData;

/**
 * Class CurrentUser
 * Description
 *
 * @package EventEspresso\core\domain\entities\admin\GraphQLData
 * @author  Manzoor Wani
 * @since   5.0.0.p
 */
class CurrentUser extends GraphQLData
{
    /**
     * @param array $where_params
     * @return array|null
     * @since 5.0.0.p
     */
    public function getData(array $where_params = []): ?array
    {
        $field_key = 'viewer';
        $query = <<<QUERY
        query GET_CURRENT_USER {
            $field_key {
                id
                databaseId
                description
                email
                firstName
                lastName
                locale
                name
                nicename
                nickname
                username
                __typename
            }
        }
QUERY;
        $this->setParams([
            'operation_name' => 'GET_CURRENT_USER',
            'query'          => $query,
        ]);

        return $this->getQueryResponse($field_key, $where_params);
    }
}
