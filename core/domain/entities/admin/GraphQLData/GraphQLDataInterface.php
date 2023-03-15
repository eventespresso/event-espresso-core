<?php

namespace EventEspresso\core\domain\entities\admin\GraphQLData;

/**
 * Class GraphQLDataInterface
 * Description
 *
 * @package EventEspresso\core\domain\entities\admin\GraphQLData
 * @author  Brent Christensen
 * @since   $VID:$
 */
interface GraphQLDataInterface
{
    /**
     * @param array $where_params
     * @return array|null
     * @since $VID:$
     */
    public function getData(array $where_params = []);
}
