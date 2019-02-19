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
     * The html "type" attribute value. default is "text"
     * @var string
     */
    protected $allowed_extensions;



    /**
     * @param string $allowed_extensions
     */
    public function __construct($type = 'file', $allowed_extensions = [])
    {
        $this->allowed_extensions = $allowed_extensions;
        parent::__construct($type);
    }
}
