<?php

namespace EventEspresso\core\domain\services\graphql\enums;

use EventEspresso\core\services\graphql\enums\EnumBase;

/**
 * Class ModelNameEnum
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\enums
 * @author  Manzoor Wani
 * @since   5.0.0.p
 */
class ModelNameEnum extends EnumBase
{
    /**
     * ModelNameEnum constructor.
     */
    public function __construct()
    {
        $this->setName($this->namespace . 'ModelNameEnum');
        $this->setDescription(esc_html__('Entity model name', 'event_espresso'));
        parent::__construct();
    }


    /**
     * @return array
     */
    protected function getValues(): array
    {
        return [
            'DATETIME' => ['value' => 'Datetime'],
            'TICKET'   => ['value' => 'Ticket'],
            'PRICE'    => ['value' => 'Price'],
        ];
    }
}
