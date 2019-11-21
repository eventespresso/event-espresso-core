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
     * @return GraphQLFieldInterface[]
     * @since $VID:$
     */
    public function getFields()
    {
        return [
            new GraphQLField(
                'id',
                ['non_null' => 'ID'],
                null,
                esc_html__('The globally unique ID for the object.', 'event_espresso')
            ),
            new GraphQLField(
                'isActive',
                'Boolean',
                null, // 'active',
                esc_html__(
                    'Flag that indicates if the country should appear in dropdown select lists',
                    'event_espresso'
                )
            ),
            new GraphQLField(
                'ISO',
                'String',
                null, // 'ISO',
                esc_html__('Country ISO Code', 'event_espresso')
            ),
            new GraphQLField(
                'ISO3',
                'String',
                null, // 'ISO3',
                esc_html__('Country ISO3 Code', 'event_espresso')
            ),
            new GraphQLField(
                'name',
                'String',
                'name',
                esc_html__('Country Name', 'event_espresso')
            ),
            new GraphQLField(
                'currencyCode',
                'String',
                'currency_code',
                esc_html__('Country Currency Code', 'event_espresso')
            ),
            new GraphQLField(
                'currencySingular',
                'String',
                'currency_name_single',
                esc_html__('Currency Name Singular', 'event_espresso')
            ),
            new GraphQLField(
                'currencyPlural',
                'String',
                'currency_name_plural',
                esc_html__('Currency Name Plural', 'event_espresso')
            ),
            new GraphQLField(
                'currencySign',
                'String',
                'currency_sign',
                __('Currency Sign', 'event_espresso')
            ),
            new GraphQLField(
                'currencySignBeforeNumber',
                'String',
                'currency_sign_before',
                esc_html__('Currency Sign Before Number', 'event_espresso')
            ),
            new GraphQLField(
                'currencyDecimalPlaces',
                'String',
                'currency_decimal_places',
                esc_html__('Currency Decimal Places', 'event_espresso')
            ),
            new GraphQLField(
                'currencyDecimalMark',
                'String',
                'currency_decimal_mark',
                esc_html__('Currency Decimal Mark', 'event_espresso')
            ),
            new GraphQLField(
                'currencyThousandsSeparator',
                'String',
                'currency_thousands_separator',
                esc_html__('Currency Thousands Separator', 'event_espresso')
            ),
        ];
    }
}
