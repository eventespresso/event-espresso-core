<?php

namespace EventEspresso\core\services\form\meta;

use EventEspresso\core\services\form\meta\inputs\Button;
use EventEspresso\core\services\form\meta\inputs\DateTime;
use EventEspresso\core\services\form\meta\inputs\Input;
use EventEspresso\core\services\form\meta\inputs\Number;
use EventEspresso\core\services\form\meta\inputs\Phone;
use EventEspresso\core\services\form\meta\inputs\Select;
use EventEspresso\core\services\form\meta\inputs\Text;
use EventEspresso\core\services\graphql\Utils as GQLUtils;

/**
 * Class InputTypes
 * For managing all of the various HTML input types
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\form\meta
 * @since   $VID:$
 */
class InputTypes
{
    /**
     * @var Button
     */
    private $button;

    /**
     * @var DateTime
     */
    private $datetime;

    /**
     * @var Input
     */
    private $input;

    /**
     * @var Number
     */
    private $number;

    /**
     * @var Phone
     */
    private $phone;

    /**
     * @var Select
     */
    private $select;

    /**
     * @var Text
     */
    private $text;

    /**
     * @var array
     */
    private $valid_type_options;


    /**
     * InputTypes constructor.
     *
     * @param Button   $button
     * @param DateTime $datetime
     * @param Input    $input
     * @param Number   $number
     * @param Phone    $phone
     * @param Select   $select
     * @param Text     $text
     */
    public function __construct(
        Button $button,
        DateTime $datetime,
        Input $input,
        Number $number,
        Phone $phone,
        Select $select,
        Text $text
    ) {
        $this->button   = $button;
        $this->datetime = $datetime;
        $this->input    = $input;
        $this->number   = $number;
        $this->phone    = $phone;
        $this->select   = $select;
        $this->text     = $text;
        $this->assembleValidTypeOptions();
    }


    private function assembleValidTypeOptions()
    {
        $button     = $this->button->validTypeOptions();
        $datetime   = $this->datetime->validTypeOptions();
        $input      = $this->input->validTypeOptions();
        $number     = $this->number->validTypeOptions();
        $phone      = $this->phone->validTypeOptions();
        $select     = $this->select->validTypeOptions();
        $text       = $this->text->validTypeOptions();
        $this->valid_type_options = apply_filters(
            'FHEE__EventEspresso_core_services_form_meta_ElementTypes__valid_type_options',
            array_merge($button, $datetime, $input, $number, $phone, $select, $text)
        );
    }


    /**
     * @return array
     */
    public function getElementTypesValues(): array
    {
        $values = [];
        foreach ($this->valid_type_options as $value => $description) {
            $values[ GQLUtils::formatEnumKey($value) ] = compact('value', 'description');
        }
        return $values;
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
