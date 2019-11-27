<?php

namespace EventEspresso\core\domain\services\graphql\enums;

use EEM_Price_Type;
use EventEspresso\core\services\graphql\enums\EnumBase;

/**
 * Class PriceBaseTypeEnum
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\enums
 * @author  Manzoor Wani
 * @since   $VID:$
 */
class PriceBaseTypeEnum extends EnumBase
{

    /**
     * PriceBaseTypeEnum constructor.
     */
    public function __construct()
    {
        $this->setName('PriceBaseTypeEnum');
        $this->setDescription(esc_html__('Price Base type ID', 'event_espresso'));
        parent::__construct();
    }


    /**
     * @return array
     * @since $VID:$
     */
    protected function getValues()
    {
        return [
            'BASE_PRICE'     => [
                'value'       => EEM_Price_Type::base_type_base_price,
            ],
            'DISCOUNT'     => [
                'value'       => EEM_Price_Type::base_type_discount,
            ],
            'SURCHARGE'     => [
                'value'       => EEM_Price_Type::base_type_surcharge,
            ],
            'TAX'     => [
                'value'       => EEM_Price_Type::base_type_tax,
            ],
        ];
    }
}
