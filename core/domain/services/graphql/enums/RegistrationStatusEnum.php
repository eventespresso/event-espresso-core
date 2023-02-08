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
 * @author  Hossein Rafiei <hoseinrafiei@gmail.com>
 * @since   $VID:$
 */
class RegistrationStatusEnum extends EnumBase
{
    /**
     * @var array
     */
    private $keyValuePairs = [];


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


    /**
     * Get key => value pairs of registration statuses
     * or translate a GQL status to Reg Status ID using the $code
     *
     * @param string $code
     * @return array|string
     */
    public function keyValuePairConversions($code = '')
    {
        if (empty($this->keyValuePairs)) {
            $values = $this->getValues();

            $pairs = [];
            foreach ($values as $key => $value) {
                $pairs[ $key ] = $value['value'];
            }

            $this->keyValuePairs = $pairs;
        }

        if ($code) {
            return isset($this->keyValuePairs[ $code ]) ? $this->keyValuePairs[ $code ] : '';
        }

        return $this->keyValuePairs;
    }
}
