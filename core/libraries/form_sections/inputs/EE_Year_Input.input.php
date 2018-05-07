<?php

/**
 * EE_Year_Input
 *
 * @package         Event Espresso
 * @subpackage
 * @author              Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Year_Input extends EE_Select_Input
{

    public function __construct($input_settings = array(), $four_digit_year = true, $years_behind = 100, $years_ahead = 0)
    {
        if ($four_digit_year) {
            $current_year_int = intval(date('Y'));
        } else {
            $current_year_int = intval(date('y'));
        }
        $answer_options = array();
        for ($start = $current_year_int - $years_behind; $start <= ($current_year_int + $years_ahead); $start++) {
            $answer_options[ $start ] = $start;
        }
        parent::__construct($answer_options, $input_settings);
    }
}
