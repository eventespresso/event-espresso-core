<?php
/**
 * Class EE_Text_Input_Display_Strategy
 * Display strategy that handles how to display form file form inputs which can be used outside of the admin context.
 * @package             Event Espresso
 * @subpackage    core
 * @author              Mike Nelson
 * @since                   4.6
 *
 */
class EE_File_Input_Display_Strategy extends EE_Text_Input_Display_Strategy
{
    /**
     * Override's parent to just set the type. May someday support other arguments.
     */
    public function __construct()
    {
        parent::__construct('file');
    }
}
