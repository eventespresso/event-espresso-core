<?php

namespace EventEspresso\core\domain\services\graphql\enums;

use EEM_Registration;
use EventEspresso\core\domain\services\registration\RegStatus;
use EventEspresso\core\services\graphql\enums\EnumBase;

/**
 * Class RegistrationStatusEnum
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\enums
 * @author  Manzoor Wani
 * @author  Hossein Rafiei <hoseinrafiei@gmail.com>
 * @since   5.0.0.p
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
    protected function getValues(): array
    {
        return [
            'APPROVED'        => [
                'value' => RegStatus::APPROVED,
            ],
            'CANCELLED'       => [
                'value' => RegStatus::CANCELLED,
            ],
            'DECLINED'        => [
                'value' => RegStatus::DECLINED,
            ],
            'INCOMPLETE'      => [
                'value' => RegStatus::INCOMPLETE,
            ],
            'PENDING_PAYMENT' => [
                'value' => RegStatus::PENDING_PAYMENT,
            ],
            'UNAPPROVED'      => [
                'value' => RegStatus::AWAITING_REVIEW,
            ],
            'WAIT_LIST'       => [
                'value' => RegStatus::WAIT_LIST,
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
    public function keyValuePairConversions(string $code = '')
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
            return $this->keyValuePairs[ $code ] ?? '';
        }

        return $this->keyValuePairs;
    }
}
