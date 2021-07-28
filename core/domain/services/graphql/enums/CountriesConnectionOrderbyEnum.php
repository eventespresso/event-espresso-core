<?php

namespace EventEspresso\core\domain\services\graphql\enums;

use EventEspresso\core\services\graphql\enums\EnumBase;

/**
 * Class CountriesConnectionOrderbyEnum
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\enums
 * @author  Manzoor Wani
 * @since   $VID:$
 */
class CountriesConnectionOrderbyEnum extends EnumBase
{

    /**
     * CountriesConnectionOrderbyEnum constructor.
     */
    public function __construct()
    {
        $this->setName($this->namespace . 'CountriesConnectionOrderbyEnum');
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
                'description' => esc_html__('Order by country name', 'event_espresso'),
            ],
            'ISO'     => [
                'value'       => 'CNT_ISO',
                'description' => esc_html__('Order by country ISO', 'event_espresso'),
            ],
            'CNT_ISO3'     => [
                'value'       => 'CNT_ISO3',
                'description' => esc_html__('Order by country ISO3', 'event_espresso'),
            ],
        ];
    }
}
