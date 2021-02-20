<?php

namespace EventEspresso\core\libraries\line_item_display;

use EEI_Line_Item_Display;
use EventEspresso\core\services\formatters\CurrencyFormatter;
use EventEspresso\core\services\formatters\NumberFormatter;
use EventEspresso\core\services\loaders\LoaderFactory;

abstract class LineItemDisplayStrategy implements EEI_Line_Item_Display
{

    /**
     * @var CurrencyFormatter
     * @since $VID:$
     */
    protected $currency_formatter;

    /**
     * @var NumberFormatter
     */
    protected $decimal_formatter;


    /**
     * LineItemDisplayStrategy constructor.
     *
     * @param CurrencyFormatter $currency_formatter
     */
    public function __construct(CurrencyFormatter $currency_formatter = null)
    {
        if (! $currency_formatter instanceof CurrencyFormatter) {
            $currency_formatter = LoaderFactory::getLoader()->getShared(CurrencyFormatter::class);
        }
        $this->currency_formatter = $currency_formatter;
    }
}
