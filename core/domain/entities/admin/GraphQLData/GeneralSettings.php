<?php

namespace EventEspresso\core\domain\entities\admin\GraphQLData;

/**
 * Class GeneralSettings
 * Description
 *
 * @package EventEspresso\core\domain\entities\admin\GraphQLData
 * @author  Manzoor Wani
 * @since   $VID:$
 */
class GeneralSettings extends GraphQLData
{

    /**
     * @param array $where_params
     * @return array|null
     * @since $VID:$
     */
    public function getData(array $where_params = [])
    {
        $field_key = 'generalSettings';
        $query = <<<QUERY
        query GET_GENERAL_SETTINGS {
            {$field_key} {
                dateFormat
                timeFormat
                timezone
                __typename
            }
        }
QUERY;
        $data = [
            'operation_name' => 'GET_GENERAL_SETTINGS',
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
