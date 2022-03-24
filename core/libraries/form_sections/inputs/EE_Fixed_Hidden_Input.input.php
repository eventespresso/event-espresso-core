<?php

/**
 * EE_Fixed_Hidden_Input
 *
 * @package         Event Espresso
 * @subpackage
 * @author              Brent Christensen
 */
class EE_Fixed_Hidden_Input extends EE_Hidden_Input
{
    /**
     * Fixed Inputs are inputs that do NOT accept user input
     * therefore they will ALWAYS return the default value that was set upon their creation
     * and NO normalization or sanitization will occur because the request value is being ignored
     *
     * @param array $req_data
     * @return boolean whether or not there was an error
     */
    protected function _normalize($req_data)
    {
    }
}
