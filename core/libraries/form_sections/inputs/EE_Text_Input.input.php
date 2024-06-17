<?php

/**
 * EE_Year_Input
 *
 * @package             Event Espresso
 * @subpackage
 * @author              Mike Nelson
 *
 * This input has a default validation strategy of plaintext (which can be removed after construction)
 */
class EE_Text_Input extends EE_Form_Input_Base
{
    /**
     * @param array $options
     */
    public function __construct($options = [], string $input_type = 'text')
    {
        $this->_set_display_strategy(new EE_Text_Input_Display_Strategy($input_type));
        // if the input hasn't set a normalization strategy, apply text normalization strategy
        if (! $this->get_normalization_strategy()) {
            $this->_set_normalization_strategy(new EE_Text_Normalization());
        }
        // if the input hasn't set a validation strategy, apply plaintext validation strategy
        if (! $this->get_validation_strategies()) {
            // by default we use the plaintext validation. If you want something else,
            // just remove it after the input is constructed :P using EE_Form_Input_Base::remove_validation_strategy()
            $this->_add_validation_strategy(new EE_Plaintext_Validation_Strategy());
        }
        parent::__construct($options);
    }
}
