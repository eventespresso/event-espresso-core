<?php

/**
 * Class EE_Line_Item_Filter_Base
 *
 * Abstract parent class for EE_Line_Item_Filters
 *
 * @see                   \EEI_Line_Item_Filter
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 * @since                 4.8.0
 *
 */
abstract class EE_Line_Item_Filter_Base implements EEI_Line_Item_Filter
{
    /**
     * process
     *
     * @param \EEI_Line_Item $line_item
     * @return \EEI_Line_Item
     */
    public function process(EEI_Line_Item $line_item)
    {
        return $line_item;
    }
}
