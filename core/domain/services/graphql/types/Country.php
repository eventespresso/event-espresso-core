<?php
/**
 *     Event Espresso
 *     Manage events, sell countrys, and receive payments from your WordPress website.
 *     Copyright (c) 2008-2019 Event Espresso  All Rights Reserved.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

namespace EventEspresso\core\domain\services\graphql\types;

use EEM_Country;
use EventEspresso\core\services\graphql\TypeBase;
use EventEspresso\core\domain\services\graphql\fields\GraphQLField;

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
     * @return GraphQLField[]
     * @since $VID:$
     */
    public function getFields()
    {
        return [
            new GraphQLField(
                'name',
                'name',
                'String',
                __('Country Name', 'event_espresso')
            ),
            new GraphQLField(
                'currency_code',
                'currencyCode',
                'String',
                __('Country Currency Code', 'event_espresso')
            ),
            new GraphQLField(
                'currency_name_single',
                'currencySingular',
                'String',
                __('Currency Name Singular', 'event_espresso')
            ),
            new GraphQLField(
                'currency_name_plural',
                'currencyPlural',
                'String',
                __('Currency Name Plural', 'event_espresso')
            ),
            new GraphQLField(
                'currency_sign',
                'currencySign',
                'String',__('Currency Sign', 'event_espresso')
            ),
            new GraphQLField(
                'currency_sign_before',
                'currencySignBeforeNumber',
                'String',
                __('Currency Sign Before Number', 'event_espresso')
            ),
            new GraphQLField(
                'currency_decimal_places',
                'currencyDecimalPlaces',
                'String',
                __('Currency Decimal Places', 'event_espresso')
            ),
            new GraphQLField(
                'currency_decimal_mark',
                'currencyDecimalMark',
                'String',
                __('Currency Decimal Mark', 'event_espresso')
            ),
            new GraphQLField(
                'currency_thousands_separator',
                'currencyThousandsSeparator',
                'String',
                __('Currency Thousands Separator', 'event_espresso')
            ),
        ];
    }
}