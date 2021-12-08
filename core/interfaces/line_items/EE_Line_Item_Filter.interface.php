<?php

/**
 * Line Item Filter Interface
 *
 * Defines the contract required by classes that employ EE_Line_Item_Filters
 * the process() method accepts an EE_Line_Item object
 * and returns an EE_Line_Item object that may or may not have been modified
 * OR can even return null if the line item should be removed entirely
 *
 * @package    Event Espresso
 * @subpackage interfaces
 * @since      4.8.0
 * @author     Brent Christensen
 */
interface EE_Line_Item_Filter
{
    /**
     * process
     *
     * @param EE_Line_Item $line_item
     * @return EE_Line_Item
     */
    public function process(EE_Line_Item $line_item): ?EE_Line_Item;
}
