<?php

namespace EventEspresso\core\domain\services\registration\form\v2;

use EE_Error;
use EE_Form_Element;
use ReflectionException;

/**
 * Class MaxFieldLengthCalculator
 * For calculating the maximum and/or minimum field length for a form input
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\domain\services\registration\form\v2
 * @since   $VID:$
 */
class FieldLengthCalculator
{

    /**
     * @var array
     */
    private $max_field_lengths
        = [
            'Attendee.fname'         => 45,
            'Attendee.lname'         => 45,
            'Attendee.email'         => 255,
            'Attendee.email_confirm' => 255,
            'Attendee.address'       => 255,
            'Attendee.address2'      => 255,
            'Attendee.city'          => 45,
            'Attendee.zip'           => 12,
            'Attendee.phone'         => 45,
        ];

    /**
     * @var array
     */
    private $min_field_lengths
        = [
            'Attendee.fname'         => 2,
            'Attendee.lname'         => 2,
            'Attendee.email'         => 8,
            'Attendee.email_confirm' => 8,
            'Attendee.zip'           => 4,
            'Attendee.phone'         => 4,
        ];


    /**
     * Returns an array where keys are Model + Field names in dot notation; ex: Attendee.email,
     * and values are the highest question max the admin can set on the question
     * (aka the "max max"; eg, a site admin can change the zip question to have a max
     * of 5, but no larger than 12)
     *
     * @return array
     */
    public function maxFieldLengths(): array
    {
        return $this->max_field_lengths;
    }


    /**
     * @return array
     */
    public function minFieldLengths(): array
    {
        return $this->min_field_lengths;
    }


    /**
     * @param string|null $model_field_name
     * @return int|float
     */
    public function getMaxFieldLength(?string $model_field_name)
    {
        return $this->max_field_lengths[ $model_field_name ] ?? EE_INF;
    }


    /**
     * @param string|null $model_field_name
     * @return int|float
     */
    public function getMinFieldLength(?string $model_field_name)
    {
        return $this->min_field_lengths[ $model_field_name ] ?? 0;
    }


    /**
     * @param EE_Form_Element $form_input
     * @return int|float
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getMaxFieldLengthForInput(EE_Form_Element $form_input)
    {
        $max_field_length = $this->getMaxFieldLength($form_input->mapsTo());
        $max_input_length = $form_input->getAttribute('max') ?: EE_INF;
        return min($max_field_length, $max_input_length);
    }


    /**
     * @param EE_Form_Element $form_input
     * @return int|float
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getMinFieldLengthForInput(EE_Form_Element $form_input)
    {
        $min_field_length = $this->getMinFieldLength($form_input->mapsTo());
        $min_input_length = $form_input->getAttribute('min') ?: 0;
        return max($min_field_length, $min_input_length);
    }
}
