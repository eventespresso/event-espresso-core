<?php

namespace EventEspresso\core\domain\services\graphql\enums;

use EEM_Form_Section;
use EventEspresso\core\services\graphql\enums\EnumBase;

/**
 * Class FormSectionAppliesToEnum
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\enums
 * @author  Manzoor Wani
 * @since   $VID:$
 */
class FormSectionAppliesToEnum extends EnumBase
{
    /**
     * FormSectionAppliesToEnum constructor.
     */
    public function __construct()
    {
        $this->setName($this->namespace . 'FormSectionAppliesToEnum');
        $this->setDescription(esc_html__(
            'Form user type that this form section should be presented to.',
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
            'ALL'         => [
                'value' => EEM_Form_Section::APPLIES_TO_ALL,
            ],
            'PRIMARY'     => [
                'value' => EEM_Form_Section::APPLIES_TO_PRIMARY,
            ],
            'PURCHASER'   => [
                'value' => EEM_Form_Section::APPLIES_TO_PURCHASER,
            ],
            'REGISTRANTS' => [
                'value' => EEM_Form_Section::APPLIES_TO_REGISTRANTS,
            ],
        ];
    }
}
