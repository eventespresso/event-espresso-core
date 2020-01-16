<?php

namespace EventEspresso\core\domain\services\graphql\enums;

use EE_Datetime;
use EventEspresso\core\services\graphql\enums\EnumBase;

/**
 * Class DatetimeStatusEnum
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\enums
 * @author  Manzoor Wani
 * @since   $VID:$
 */
class DatetimeStatusEnum extends EnumBase
{

    /**
     * DatetimeStatusEnum constructor.
     */
    public function __construct()
    {
        $this->setName($this->namespace . 'DatetimeStatusEnum');
        $this->setDescription(esc_html__('Datetime status', 'event_espresso'));
        parent::__construct();
    }


    /**
     * @return array
     * @since $VID:$
     */
    protected function getValues()
    {
        return [
            'SOLD_OUT'     => [
                'value'       => EE_Datetime::sold_out,
            ],
            'ACTIVE'     => [
                'value'       => EE_Datetime::active,
            ],
            'UPCOMING'     => [
                'value'       => EE_Datetime::upcoming,
            ],
            'POSTPONED'     => [
                'value'       => EE_Datetime::postponed,
            ],
            'CANCELLED'     => [
                'value'       => EE_Datetime::cancelled,
            ],
            'EXPIRED'     => [
                'value'       => EE_Datetime::expired,
            ],
            'INACTIVE'     => [
                'value'       => EE_Datetime::inactive,
            ],
        ];
    }
}
