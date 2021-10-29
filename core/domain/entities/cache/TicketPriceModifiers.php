<?php

namespace EventEspresso\core\domain\entities\cache;

use EE_Error;
use EE_Price;
use EE_Ticket;
use ReflectionException;

/**
 * Class TicketPriceModifiers
 * methods for retrieving price modifiers for a ticket FROM THE CACHED MODEL RELATIONS
 *
 * !! IMPORTANT !! ==> DOES NOT QUERY THE DATABASE
 *
 * If a query has not already been run to retrieve the required objects they will not be in the cache.
 * Subsequent queries, and/or manual adjustments to the model relations cache will be reflected here.
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\domain\entities\cache
 * @since   $VID:$
 */
class TicketPriceModifiers
{

    /**
     * @param EE_Ticket $ticket
     * @param callable  $filter
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function filterModifiersForTicket(EE_Ticket $ticket, callable $filter): array
    {
        $ticket_modifiers = $ticket->get_all_from_cache('Price');
        if (! empty($ticket_modifiers)) {
            $ticket_modifiers = $ticket->get_many_related('Price');
        }

        return array_filter($ticket_modifiers, $filter);
    }


    /**
     * retrieve all price modifiers for the supplied ticket
     *
     * @param EE_Ticket $ticket
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getAllModifiersForTicket(EE_Ticket $ticket): array
    {
        return $this->filterModifiersForTicket($ticket, [$this, 'allModifiersFilter']);
    }


    /**
     * pass to filterModifiersForTicket() with a ticket to retrieve all price modifiers for the supplied ticket
     *
     * @param EE_Price $price_modifier
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function allModifiersFilter(EE_Price $price_modifier): bool
    {
        return ! $price_modifier->is_base_price();
    }


    /**
     * retrieve all discounts for the supplied ticket
     *
     * @param EE_Ticket $ticket
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getAllDiscountModifiersForTicket(EE_Ticket $ticket): array
    {
        return $this->filterModifiersForTicket($ticket, [$this, 'discountModifierFilter']);
    }


    /**
     * pass to filterModifiersForTicket() with a ticket to retrieve all discounts for the supplied ticket
     *
     * @param EE_Price $price_modifier
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function discountModifierFilter(EE_Price $price_modifier): bool
    {
        return $price_modifier->is_discount();
    }


    /**
     * retrieve all surcharges for the supplied ticket
     *
     * @param EE_Ticket $ticket
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getAllSurchargeModifiersForTicket(EE_Ticket $ticket): array
    {
        return $this->filterModifiersForTicket($ticket, [$this, 'surchargeModifierFilter']);
    }


    /**
     * pass to filterModifiersForTicket() with a ticket to retrieve all surcharges for the supplied ticket
     *
     * @param EE_Price $price_modifier
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function surchargeModifierFilter(EE_Price $price_modifier): bool
    {
        return $price_modifier->is_surcharge();
    }


    /**
     * retrieve all discounts AND surcharges for the supplied ticket
     *
     * @param EE_Ticket $ticket
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getAllDiscountAndSurchargeModifiersForTicket(EE_Ticket $ticket): array
    {
        return $this->filterModifiersForTicket($ticket, [$this, 'discountAndSurchargeModifierFilter']);
    }


    /**
     * pass to filterModifiersForTicket() with a ticket to retrieve all discounts AND surcharges for the supplied ticket
     *
     * @param EE_Price $price_modifier
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function discountAndSurchargeModifierFilter(EE_Price $price_modifier): bool
    {
        return $price_modifier->is_discount() || $price_modifier->is_surcharge();
    }


    /**
     * retrieve all taxes for the supplied ticket
     *
     * @param EE_Ticket $ticket
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getAllTaxModifiersForTicket(EE_Ticket $ticket): array
    {
        return $this->filterModifiersForTicket($ticket, [$this, 'taxModifierFilter']);
    }


    /**
     * pass to filterModifiersForTicket() with a ticket to retrieve all taxes for the supplied ticket
     *
     * @param EE_Price $price_modifier
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function taxModifierFilter(EE_Price $price_modifier): bool
    {
        return $price_modifier->is_tax();
    }


    /**
     * retrieve ALL PRICES that are NOT taxes for the supplied ticket
     *
     * @param EE_Ticket $ticket
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getAllNonTaxPricesForTicket(EE_Ticket $ticket): array
    {
        return $this->filterModifiersForTicket($ticket, [$this, 'nonTaxPriceFilter']);
    }


    /**
     * pass to filterModifiersForTicket() with a ticket
     * to retrieve ALL PRICES that are NOT taxes for the supplied ticket
     *
     * @param EE_Price $price_modifier
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function nonTaxPriceFilter(EE_Price $price_modifier): bool
    {
        return ! $price_modifier->is_base_price() && ! $price_modifier->is_tax();
    }
}
