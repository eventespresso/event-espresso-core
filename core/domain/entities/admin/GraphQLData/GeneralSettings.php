<?php

namespace EventEspresso\core\domain\entities\admin\GraphQLData;

/**
 * Class GeneralSettings
 * Description
 *
 * @package EventEspresso\core\domain\entities\admin\GraphQLData
 * @author  Manzoor Wani
 * @since   5.0.0.p
 */
class GeneralSettings extends GraphQLData
{
    /**
     * @param array $where_params
     * @return array|null
     * @since 5.0.0.p
     */
    public function getData(array $where_params = []): ?array
    {
        $field_key = 'generalSettings';
        $query = <<<QUERY
        query GET_GENERAL_SETTINGS {
            $field_key {
                dateFormat
                timeFormat
                timezone
                __typename
            }
        }
QUERY;
        $this->setParams([
            'operation_name' => 'GET_GENERAL_SETTINGS',
            'query'          => $query,
        ]);

        return $this->getQueryResponse($field_key, $where_params);
    }
}
