<?php

use EventEspresso\core\services\form\meta\Element;

abstract class EEM_Form_Element extends EEM_Base
{

    /**
     * @var Element
     */
    protected $element;

    /**
     * @var array
     */
    protected $valid_status_options;


    protected function __construct(Element $element, $timezone)
    {
        $this->element = $element;
        parent::__construct($timezone);
    }


    /**
     * @param bool $constants_only
     * @return array
     */
    public function validStatusOptions(bool $constants_only = false): array
    {
        return $this->element->validStatusOptions($constants_only);
    }
}
