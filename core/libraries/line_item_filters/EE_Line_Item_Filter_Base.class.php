<?php

/**
 * Class EE_Line_Item_Filter_Base
 *
 * Abstract parent class for EE_Line_Item_Filters
 *
 * @see                   EE_Line_Item_Filter
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 * @since                 4.8.0
 *
 */
abstract class EE_Line_Item_Filter_Base implements EE_Line_Item_Filter
{


    /**
     * process
     *
     * @param EE_Line_Item $line_item
     * @return EE_Line_Item
     */
    public function process(EE_Line_Item $line_item): ?EE_Line_Item
    {
        return $line_item;
    }
}
