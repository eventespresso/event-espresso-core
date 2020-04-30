<?php

namespace EventEspresso\core\domain\entities\admin\GraphQLData;

/**
 * Class CurrentUser
 * Description
 *
 * @package EventEspresso\core\domain\entities\admin\GraphQLData
 * @author  Manzoor Wani
 * @since   $VID:$
 */
class CurrentUser extends GraphQLData
{

    /**
     * @param array $where_params
     * @return array|null
     * @since $VID:$
     */
    public function getData(array $where_params = [])
    {
        $field_key = 'viewer';
        $query = <<<QUERY
        query GET_CURRENT_USER {
            {$field_key} {
                description
                email
                firstName
                id
                name
                nicename
                nickname
                lastName
                locale
                userId
                username
                __typename
            }
        }
QUERY;
        $data = [
            'operation_name' => 'GET_CURRENT_USER',
            'query'          => $query,
        ];

        if (! empty($where_params)) {
            $data['variables'] = [];
            $data['variables']['where'] = $where_params;
        }

        $responseData = $this->makeGraphQLRequest($data);
        return ! empty($responseData[ $field_key ]) ? $responseData[ $field_key ] : null;
    }
}