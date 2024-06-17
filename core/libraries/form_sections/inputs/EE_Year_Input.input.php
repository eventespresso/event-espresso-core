<?php

/**
 * EE_Year_Input
 *
 * @package     Event Espresso
 * @subpackage
 * @author      Mike Nelson
 */
class EE_Year_Input extends EE_Select_Input
{
    public function __construct(
        $input_settings = [],
        bool $four_digit_year = true,
        int $years_behind = 100,
        int $years_ahead = 0
    ) {
        $answer_options = [];
        $current_year   = $four_digit_year ? (int) date('Y') : (int) date('y');
        for ($start = $current_year - $years_behind; $start <= ($current_year + $years_ahead); $start++) {
            $answer_options[ $start ] = $start;
        }
        parent::__construct($answer_options, $input_settings);
    }
}
