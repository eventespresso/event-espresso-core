<?php

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
    public function display_line_item($line_item, $options = array());
}
