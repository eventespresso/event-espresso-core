<?php

namespace EventEspresso\core\domain\services\graphql\types;

use EEM_Country;
use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;
use EventEspresso\core\services\graphql\types\TypeBase;
use EventEspresso\core\services\graphql\fields\GraphQLField;

/**
 * Class Country
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\types
 * @author  Brent Christensen
 * @since   $VID:$
 */
class Country extends TypeBase
{

    /**
     * Country constructor.
     *
     * @param EEM_Country $country_model
     */
    public function __construct(EEM_Country $country_model)
    {
        $this->model = $country_model;
        $this->setName('Country');
        $this->setDescription(__('A country', 'event_espresso'));
        $this->setIsCustomPostType(false);
        parent::__construct();
    }


    /**
     * @return \EventEspresso\core\services\graphql\fields\GraphQLFieldInterface[]
     * @since $VID:$
     */
    public function getFields()
    {
        return [
            new GraphQLField(
                'isActive',
                'Boolean',
                null, // 'active',
                __('Flag that indicates if the country should appear in dropdown select lists', 'event_espresso')
            ),
            new GraphQLField(
                'ISO',
                'String',
                null, //'ISO',
                __('Country ISO Code', 'event_espresso')
            ),
            new GraphQLField(
                'ISO3',
                'String',
                null, //'ISO3',
                __('Country ISO3 Code', 'event_espresso')
            ),
            new GraphQLField(
                'name',
                'String',
                'name',
                __('Country Name', 'event_espresso')
            ),
            new GraphQLField(
                'currencyCode',
                'String',
                'currency_code',
                __('Country Currency Code', 'event_espresso')
            ),
            new GraphQLField(
                'currencySingular',
                'String',
                'currency_name_single',
                __('Currency Name Singular', 'event_espresso')
            ),
            new GraphQLField(
                'currencyPlural',
                'String',
                'currency_name_plural',
                __('Currency Name Plural', 'event_espresso')
            ),
            new GraphQLField(
                'currencySign',
                'String',
                'currency_sign',__('Currency Sign', 'event_espresso')
            ),
            new GraphQLField(
                'currencySignBeforeNumber',
                'String',
                'currency_sign_before',
                __('Currency Sign Before Number', 'event_espresso')
            ),
            new GraphQLField(
                'currencyDecimalPlaces',
                'String',
                'currency_decimal_places',
                __('Currency Decimal Places', 'event_espresso')
            ),
            new GraphQLField(
                'currencyDecimalMark',
                'String',
                'currency_decimal_mark',
                __('Currency Decimal Mark', 'event_espresso')
            ),
            new GraphQLField(
                'currencyThousandsSeparator',
                'String',
                'currency_thousands_separator',
                __('Currency Thousands Separator', 'event_espresso')
            ),
        ];
    }
}