<?php

namespace EventEspresso\core\domain\services\graphql\enums;

use EventEspresso\core\services\graphql\enums\EnumBase;
use EventEspresso\core\services\form\meta\FormStatus;

/**
 * Class FormStatusEnum
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\enums
 * @author  Manzoor Wani
 * @since   $VID:$
 */
class FormStatusEnum extends EnumBase
{

    /**
     * FormStatusEnum constructor.
     */
    public function __construct()
    {
        $this->setName($this->namespace . 'FormStatusEnum');
        $this->setDescription(esc_html__(
            'Whether form section or element is active, archived, shared, trashed, or used as a default on new forms.',
            'event_espresso'
        ));
        parent::__construct();
    }


    /**
     * @return array
     */
    protected function getValues(): array
    {
        return [
            'ACTIVE'   => [
                'value' => FormStatus::ACTIVE,
            ],
            'ARCHIVED' => [
                'value' => FormStatus::ARCHIVED,
            ],
            'DEFAULT'  => [
                'value' => FormStatus::DEFAULT,
            ],
            'SHARED'   => [
                'value' => FormStatus::SHARED,
            ],
            'TRASHED'  => [
                'value' => FormStatus::TRASHED,
            ],
        ];
    }
}
