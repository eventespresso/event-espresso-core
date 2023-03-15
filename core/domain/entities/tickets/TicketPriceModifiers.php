<?php

namespace EventEspresso\core\domain\entities\tickets;

use EE_Error;
use EE_Price;
use EE_Ticket;
use ReflectionException;

/**
 * Class TicketPriceModifiers
 * methods for retrieving price modifiers for a ticket FROM THE CACHED MODEL RELATIONS
 *
 * !! IMPORTANT !!
 * Subsequent queries, and/or manual adjustments to the model relations cache will be reflected here.
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\domain\entities\cache
 * @since   $VID:$
 */
class TicketPriceModifiers
{
    /**
     * @var EE_Ticket
     */
    private $ticket;


    /**
     * @var EE_Price[]
     */
    private $ticket_prices;


    /**
     * @param EE_Ticket $ticket
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __construct(EE_Ticket $ticket)
    {
        $this->ticket = $ticket;
        // run a query to retrieve ALL of this ticket's related prices before doing anything else
        $this->ticket_prices = $this->ticket->prices();
    }


    /**
     * @param callable  $filter
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function filterModifiersForTicket(callable $filter): array
    {
        $ticket_modifiers = $this->ticket->get_all_from_cache('Price');
        if (empty($ticket_modifiers)) {
            $ticket_modifiers = $this->ticket_prices;
        }
        return array_filter($ticket_modifiers, $filter);
    }


    /**
     * retrieve all price modifiers for the this ticket
     *
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getAllModifiersForTicket(): array
    {
        return $this->filterModifiersForTicket([$this, 'allModifiersFilter']);
    }


    /**
     * pass to filterModifiersForTicket() with a ticket to retrieve all price modifiers for the this ticket
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
     * retrieve all discounts for the this ticket
     *
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getAllDiscountModifiersForTicket(): array
    {
        return $this->filterModifiersForTicket([$this, 'discountModifierFilter']);
    }


    /**
     * pass to filterModifiersForTicket() with a ticket to retrieve all discounts for the this ticket
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
     * retrieve all surcharges for the this ticket
     *
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getAllSurchargeModifiersForTicket(): array
    {
        return $this->filterModifiersForTicket([$this, 'surchargeModifierFilter']);
    }


    /**
     * pass to filterModifiersForTicket() with a ticket to retrieve all surcharges for the this ticket
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
     * retrieve all discounts AND surcharges for the this ticket
     *
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getAllDiscountAndSurchargeModifiersForTicket(): array
    {
        return $this->filterModifiersForTicket([$this, 'discountAndSurchargeModifierFilter']);
    }


    /**
     * pass to filterModifiersForTicket() with a ticket to retrieve all discounts AND surcharges for the this ticket
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
     * retrieve all taxes for the this ticket
     *
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getAllTaxesForTicket(): array
    {
        return $this->filterModifiersForTicket([$this, 'taxModifierFilter']);
    }


    /**
     * pass to filterModifiersForTicket() with a ticket to retrieve all taxes for the this ticket
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
     * retrieve ALL PRICES that are NOT taxes for the this ticket
     *
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getAllNonTaxPricesForTicket(): array
    {
        return $this->filterModifiersForTicket([$this, 'nonTaxPriceFilter']);
    }


    /**
     * pass to filterModifiersForTicket() with a ticket
     * to retrieve ALL PRICES that are NOT taxes for the this ticket
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


    /**
     * retrieve the base price for the this ticket
     *
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getBasePrice(): array
    {
        return $this->filterModifiersForTicket([$this, 'basePriceFilter']);
    }


    /**
     * pass to filterModifiersForTicket()
     * to retrieve the base price for the this ticket
     *
     * @param EE_Price $price_modifier
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function basePriceFilter(EE_Price $price_modifier): bool
    {
        return $price_modifier->is_base_price();
    }
}
