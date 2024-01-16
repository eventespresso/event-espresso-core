<?php

use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * Taxes class
 *
 * @package               Event Espresso
 * @subpackage            includes/classes/EE_Taxes.class.php
 * @author                Brent Christensen
 */
class EE_Taxes extends EE_Base
{
    /**
     * This is used for when EE_Taxes is used statically by the admin
     *
     * @var array
     */
    private static array $_subtotal = [];

    /**
     * This holds an array of EE_Price objects that are of PRT_ID == 4 (tax price types)
     *
     * @var EE_Price[]
     */
    private static array $_default_taxes = [];


    /**
     * This method simply calculates the total taxes for a given ticket (by pulling the prices attached to the ticket
     * and applying default taxes to it). Note: this is just an intermediary helper method added to facilitate quick
     * calc of taxes for tickets listed in the event editor.
     *
     * @param EE_Ticket $ticket incoming EE_Ticket
     * @return float             total taxes to apply to ticket.
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function get_total_taxes_for_admin(EE_Ticket $ticket): float
    {
        $tax       = 0;
        $total_tax = 0;
        // This first checks to see if the given ticket is taxable.
        if (! $ticket->taxable()) {
            return (float) $tax;
        }
        // get subtotal (notice we're only retrieving a subtotal if there isn't one given)
        $subtotal = EE_Taxes::get_subtotal_for_admin($ticket);
        // get taxes
        $taxes = EE_Taxes::get_taxes_for_admin();
        // apply taxes to subtotal
        foreach ($taxes as $tax) {
            // assuming taxes are not cumulative
            $total_tax += $subtotal * $tax->amount() / 100;
        }
        return (float) $total_tax;
    }


    /**
     * Gets the total percentage of tax that should be applied to taxable line items
     *
     * @return float the percentage of tax that should be added to taxable items
     * @throws EE_Error
     * @throws ReflectionException
     * eg 20 for %20 tax (NOT 0.20, which
     */
    public static function get_total_taxes_percentage(): float
    {
        $total_tax_percent = 0;
        foreach (EE_Taxes::get_taxes_for_admin() as $tax_price) {
            $total_tax_percent += $tax_price->get('PRC_amount');
        }
        return (float) $total_tax_percent;
    }


    /**
     * @param EE_Ticket $ticket
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function get_subtotal_for_admin(EE_Ticket $ticket): float
    {
        $TKT_ID = $ticket->ID();
        return EE_Taxes::$_subtotal[ $TKT_ID ] ?? EE_Taxes::_get_subtotal_for_admin($ticket);
    }


    /**
     * simply take an incoming ticket and calculate the subtotal for the ticket
     *
     * @param EE_Ticket $ticket
     * @return float     subtotal calculated from all EE_Price[] on Ticket.
     * @throws EE_Error
     * @throws ReflectionException
     */
    private static function _get_subtotal_for_admin(EE_Ticket $ticket)
    {
        $subtotal = 0;
        // get all prices
        $prices = $ticket->get_many_related(
            'Price',
            [
                0                          => [
                    'Price_Type.PBT_ID' => ['!=', EEM_Price_Type::base_type_tax],
                ],
                'default_where_conditions' => 'none',
                'order_by'                 => ['PRC_order' => 'ASC'],
            ]
        );
        // let's loop through them (base price is always the first item)
        foreach ($prices as $price) {
            if ($price instanceof EE_Price) {
                $price_type = $price->type_obj();
                if ($price_type instanceof EE_Price_Type) {
                    switch ($price->type_obj()->base_type()) {
                        case 1: // base price
                        case 3: // surcharges
                            $subtotal += $price->is_percent()
                                ? $subtotal * $price->get('PRC_amount') / 100
                                : $price->get('PRC_amount');
                            break;
                        case 2: // discounts
                            $subtotal -= $price->is_percent()
                                ? $subtotal * $price->get('PRC_amount') / 100
                                : $price->get('PRC_amount');
                            break;
                    }
                }
            }
        }
        $TKT_ID                         = $ticket->ID();
        EE_Taxes::$_subtotal[ $TKT_ID ] = (float) $subtotal;
        return $subtotal;
    }


    /**
     * get all default prices that are a Tax price type (PRT_ID = 4) and return
     *
     * @return EE_Price[] EE_Price objects that have PRT_ID == 4
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function get_taxes_for_admin(): array
    {
        if (empty(EE_Taxes::$_default_taxes)) {
            /** @var EEM_Price $price_model */
            $price_model              = LoaderFactory::getLoader()->getShared('EEM_Price');
            EE_Taxes::$_default_taxes = $price_model->get_all(
                [['PRC_is_default' => 1, 'Price_Type.PBT_ID' => 4]]
            );
        }
        return EE_Taxes::$_default_taxes;
    }
}
