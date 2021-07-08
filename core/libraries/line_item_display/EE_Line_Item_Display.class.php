<?php

use EventEspresso\core\libraries\line_item_display\LineItemDisplayStrategy;
use EventEspresso\core\services\formatters\CurrencyFormatter;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 *
 * Class EE_Line_Item_Display
 *
 * Description
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 *
 *
 */
class EE_Line_Item_Display
{

    /**
     * @var LineItemDisplayStrategy
     */
    private $strategy;


    /**
     * @param string $context - where/how the line items are being displayed
     * @param string $other_line_item_display_strategy
     */
    public function __construct($context = '', $other_line_item_display_strategy = '')
    {
        $currency_formatter = LoaderFactory::getLoader()->getShared(CurrencyFormatter::class);
        if (! empty($other_line_item_display_strategy)
            && class_exists($other_line_item_display_strategy)
        ) {
            $this->strategy = new  $other_line_item_display_strategy($currency_formatter);
        } else {
            $context = strtolower($context);
            switch ($context) {
                case 'invoice':
                    $this->strategy = new EE_Invoice_Line_Item_Display_Strategy($currency_formatter);
                    break;
                case 'receipt':
                    $this->strategy = new EE_Receipt_Line_Item_Display_Strategy($currency_formatter);
                    break;
                case 'spco':
                    $this->strategy = new EE_SPCO_Line_Item_Display_Strategy($currency_formatter);
                    break;
                default:
                    $this->strategy = new EE_Default_Line_Item_Display_Strategy($currency_formatter);
            }
        }
    }


    /**
     * @param EE_Line_Item $line_item
     * @param array        $options
     * @return mixed
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function display_line_item(EE_Line_Item $line_item, $options = array())
    {
        return $this->strategy->display_line_item($line_item, $options);
    }


    /**
     * @return float
     */
    public function grand_total()
    {
        return $this->strategy->grand_total();
    }


    /**
     * @return float
     */
    public function total_items()
    {
        return $this->strategy->total_items();
    }
}
