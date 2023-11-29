<?php

namespace EventEspresso\core\domain\entities\admin\GraphQLData;

/**
 * Class GraphQLDataInterface
 * Description
 *
 * @package EventEspresso\core\domain\entities\admin\GraphQLData
 * @author  Brent Christensen
 * @since   5.0.0.p
 */
interface GraphQLDataInterface
{
    /**
     * @param array $where_params
     * @return array|null
     * @since 5.0.0.p
     */
    public function getData(array $where_params = []): ?array;
}
