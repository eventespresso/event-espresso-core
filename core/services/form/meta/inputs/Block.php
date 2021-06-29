<?php

namespace EventEspresso\core\services\form\meta\inputs;

class Block
{
    /**
     * indicates that the element is a general HTML block
     */
    public const TYPE_HTML = 'html';

    /**
     * @var array
     */
    private $valid_type_options;


    public function __construct()
    {
        $this->valid_type_options = apply_filters(
            'FHEE__EventEspresso_core_services_form_meta_inputs_Block__valid_type_options',
            [
                Block::TYPE_HTML => esc_html__('HTML Block', 'event_espresso'),
            ]
        );
    }


    /**
     * @param bool $constants_only
     * @return array
     */
    public function validTypeOptions(bool $constants_only = false): array
    {
        return $constants_only
            ? array_keys($this->valid_type_options)
            : $this->valid_type_options;
    }
}
