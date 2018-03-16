<?php
defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Interface EEI_Line_Item_Display
 */
interface EEI_Line_Item_Display
{

    /**
     * @param EE_Line_Item $line_item
     * @param array        $options
     * @return mixed
     */
    public function display_line_item(EE_Line_Item $line_item, $options = array());

}

// End of file EEI_Line_Item_Display.interface.php
// Location: core/line_items/EEI_Line_Item_Display.interface.php