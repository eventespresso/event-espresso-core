<?php

namespace EventEspresso\core\domain\services\admin\entities;

use EE_Base_Class;
use EE_Error;
use EE_Price;
use EE_Price_Type;
use EE_Ticket;
use EEM_Price;
use EEM_Price_Type;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use ReflectionException;
use RuntimeException;

/**
 * Class DefaultPrices
 * Description
 *
 * @package EventEspresso\core\domain\services\admin\events\editor
 * @author  Brent Christensen
 * @since   $VID:$
 */
class DefaultPrices implements DefaultEntityGeneratorInterface
{
    /**
     * @var EEM_Price
     */
    protected $price_model;

    /**
     * @var EEM_Price_Type
     */
    protected $price_type_model;

    /**
     * @var EE_Price[]
     */
    protected $new_prices = [];

    /**
     * @var EE_Price[]
     */
    protected $taxes = [];


    /**
     * @param EEM_Price      $price_model
     * @param EEM_Price_Type $price_type_model
     */
    public function __construct(EEM_Price $price_model, EEM_Price_Type $price_type_model)
    {
        $this->price_model      = $price_model;
        $this->price_type_model = $price_type_model;
    }


    /**
     * @param EE_Ticket|EE_Base_Class $entity
     * @return EE_Price[]
     * @throws EE_Error
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function create(EE_Base_Class $entity): array
    {
        if (! $entity instanceof EE_Ticket) {
            throw new InvalidEntityException($entity, 'EE_Ticket');
        }
        $is_free                   = true;
        $has_base_price            = false;
        $remove_existing_relations = true;
        // first, let's get all of the default taxes for the site
        $this->taxes = $this->price_model->getAllDefaultTaxes();
        // then separate taxes from the other prices for the existing default ticket prices
        $default_prices = $this->separateTaxesFromOtherPrices($entity->prices());
        // but if that's empty, then let's get the default global prices
        if (empty($default_prices)) {
            $default_global_prices     = $this->price_model->get_all_default_prices();
            $default_prices            = $this->separateTaxesFromOtherPrices($default_global_prices);
            $remove_existing_relations = false;
        }
        // then clone and apply all of the default prices
        [$has_base_price, $is_free] = $this->cloneDefaultPrices(
            $entity,
            $default_prices,
            $remove_existing_relations,
            $has_base_price,
            $is_free
        );
        if (! $has_base_price) {
            $new_base_price                            = $this->createNewBasePrice($entity);
            $this->new_prices[ $new_base_price->ID() ] = $new_base_price;
        }
        $this->applyTaxes($entity, $is_free);
        $ticket_total = $entity->get_ticket_total_with_taxes(true);
        if ($ticket_total !== $entity->ticket_price()) {
            $entity->set_price($ticket_total);
            $entity->save();
        }
        return $this->new_prices;
    }


    /**
     * @param EE_Ticket $ticket
     * @param bool      $is_free
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function applyTaxes(EE_Ticket $ticket, bool $is_free)
    {
        if (! $is_free && $ticket->taxable() && ! empty($this->taxes)) {
            foreach ($this->taxes as $tax) {
                // assign taxes but don't duplicate them because they operate globally
                $ticket->set_taxable(true);
                $tax->_add_relation_to($ticket, 'Ticket');
            }
        }
    }


    /**
     * @param EE_Ticket  $ticket
     * @param EE_Price[] $default_prices
     * @param bool       $remove_existing_relations
     * @param bool       $has_base_price
     * @param bool       $is_free
     * @return bool[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function cloneDefaultPrices(
        EE_Ticket $ticket,
        array $default_prices,
        bool $remove_existing_relations,
        bool $has_base_price,
        bool $is_free
    ): array {
        foreach ($default_prices as $default_price) {
            // duplicate the default price so that it does not get mutated
            $default_price_clone = clone $default_price;
            if ($remove_existing_relations) {
                $ticket->_remove_relation_to($default_price, 'Price');
            }
            if (
                (
                    // has non-zero base price
                    $default_price_clone->is_base_price()
                    && $default_price_clone->amount() > 0
                )
                || (
                    // or has fixed amount surcharge
                    $default_price_clone->is_surcharge()
                    && ! $default_price_clone->is_percent()
                )
            ) {
                $is_free = false;
            }
            $is_base_price = $default_price_clone->is_base_price();
            // add this price to ticket if it is a regular price modifier, ie: NOT a base price,
            // OR if it IS a base price but this ticket does NOT already have a base price
            if (! $is_base_price || ! $has_base_price) {
                $default_price_clone->set('PRC_ID', null);
                $default_price_clone->set('PRC_is_default', false);

                $order = $default_price_clone->get('PRC_order');

                // enforce base price order to be 1 and 5 if the order is not set for a modifier
                $order = $is_base_price ? 1 : $order;
                $order = $order ?? 5;

                $default_price_clone->set('PRC_order', $order);

                $default_price_clone->save();
                $default_price_clone->_add_relation_to($ticket, 'Ticket');
                $this->new_prices[ $default_price_clone->ID() ] = $default_price_clone;
                // then recheck that a base price has been set so that we don't add another one
                $has_base_price = $is_base_price ? true : $has_base_price;
            }
        }
        return [$has_base_price, $is_free];
    }


    /**
     * @param EE_Ticket $ticket
     * @return EE_Price
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function createNewBasePrice(EE_Ticket $ticket): EE_Price
    {
        $new_base_price  = $this->price_model->get_new_price();
        $base_price_type = $this->price_type_model->get_one(
            [
                [
                    'PBT_ID' => EEM_Price_Type::base_type_base_price,
                ],
            ]
        );
        if (! $base_price_type instanceof EE_Price_Type) {
            throw new RuntimeException(
                esc_html__(
                    'A valid base price type could not be retrieved from the database.',
                    'event_espresso'
                )
            );
        }
        $new_base_price->set('PRT_ID', $base_price_type->ID());
        // set base price order to 1
        $new_base_price->set('PRC_order', 1);
        $new_base_price->set('PRC_is_default', false);
        $new_base_price->save();
        $new_base_price->_add_relation_to($ticket, 'Ticket');
        return $new_base_price;
    }


    /**
     * @param array $prices
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function separateTaxesFromOtherPrices(array $prices = []): array
    {
        $default_prices = [];
        if (is_array($prices)) {
            foreach ($prices as $key => $price) {
                if (! $price instanceof EE_Price) {
                    throw new InvalidEntityException($price, 'EE_Price');
                }
                // grab any taxes but don't do anything just yet
                if ($price->is_tax()) {
                    $this->taxes[ $price->ID() ] = $price;
                    continue;
                }
                $default_prices[ $price->ID() ] = $price;
            }
        }
        return $default_prices;
    }
}
