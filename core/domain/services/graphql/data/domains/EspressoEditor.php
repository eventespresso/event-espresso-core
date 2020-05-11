<?php

namespace EventEspresso\core\domain\services\graphql\data\domains;

use EventEspresso\core\domain\services\graphql\data\loaders as Loaders;
use EventEspresso\core\services\graphql\loaders\GQLDataDomainInterface;
use WPGraphQL\AppContext;

/**
 * Class EspressoEditor
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\data\domains
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EspressoEditor implements GQLDataDomainInterface
{

    /**
     * @param array      $loaders The loaders accessible in the AppContext
     * @param AppContext $context The AppContext
     * @return array
     * @return array
     * @since $VID:$
     */
    public function registerLoaders($loaders, $context)
    {
        $newLoaders = [
            'espresso_attendee'  => new Loaders\AttendeeLoader($context),
            'espresso_datetime'  => new Loaders\DatetimeLoader($context),
            'espresso_price'     => new Loaders\PriceLoader($context),
            'espresso_priceType' => new Loaders\PriceTypeLoader($context),
            'espresso_ticket'    => new Loaders\TicketLoader($context),
            'espresso_venue'     => new Loaders\VenueLoader($context),
        ];

        return array_merge($loaders, $newLoaders);
    }
}
