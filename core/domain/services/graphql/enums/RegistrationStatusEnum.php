<?php

namespace EventEspresso\core\domain\services\graphql\enums;

use EEM_Registration;
use EventEspresso\core\services\graphql\enums\EnumBase;

/**
 * Class RegistrationStatusEnum
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\enums
 * @author  Manzoor Wani
 * @since   $VID:$
 */
class RegistrationStatusEnum extends EnumBase
{

    /**
     * RegistrationStatusEnum constructor.
     */
    public function __construct()
    {
        $this->setName($this->namespace . 'RegistrationStatusEnum');
        $this->setDescription(esc_html__('Registration status', 'event_espresso'));
        parent::__construct();
    }


    /**
     * @return array
     * @since $VID:$
     */
    protected function getValues()
    {
        return [
            'APPROVED'        => [
                'value' => EEM_Registration::status_id_approved,
            ],
            'CANCELLED'       => [
                'value' => EEM_Registration::status_id_cancelled,
            ],
            'DECLINED'        => [
                'value' => EEM_Registration::status_id_declined,
            ],
            'INCOMPLETE'      => [
                'value' => EEM_Registration::status_id_incomplete,
            ],
            'PENDING_PAYMENT' => [
                'value' => EEM_Registration::status_id_pending_payment,
            ],
            'UNAPPROVED'      => [
                'value' => EEM_Registration::status_id_not_approved,
            ],
            'WAIT_LIST'       => [
                'value' => EEM_Registration::status_id_wait_list,
            ],
        ];
    }
}
