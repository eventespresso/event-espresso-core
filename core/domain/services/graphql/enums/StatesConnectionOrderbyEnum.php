<?php

namespace EventEspresso\core\domain\services\graphql\enums;

use EventEspresso\core\services\graphql\enums\EnumBase;

/**
 * Class StatesConnectionOrderbyEnum
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\enums
 * @author  Manzoor Wani
 * @since   $VID:$
 */
class StatesConnectionOrderbyEnum extends EnumBase
{

    /**
     * StatesConnectionOrderbyEnum constructor.
     */
    public function __construct()
    {
        $this->setName($this->namespace . 'StatesConnectionOrderbyEnum');
        $this->setDescription(esc_html__('Field to order the connection by', 'event_espresso'));
        parent::__construct();
    }


    /**
     * @return array
     */
    protected function getValues(): array
    {
        return [
            'NAME'     => [
                'value'       => 'CNT_name',
                'description' => esc_html__('Order by state name', 'event_espresso'),
            ],
            'COUNTRY_ISO'     => [
                'value'       => 'CNT_ISO',
                'description' => esc_html__('Order by country ISO', 'event_espresso'),
            ],
        ];
    }
}
