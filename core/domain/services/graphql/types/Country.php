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
        $this->setGraphQLToModelMap([
            'name'                       => 'name',
            'currencyCode'               => 'currency_code',
            'currencySingular'           => 'currency_name_single',
            'currencyPlural'             => 'currency_name_plural',
            'currencySign'               => 'currency_sign',
            'currencySignBeforeNumber'   => 'currency_sign_before',
            'currencyDecimalPlaces'      => 'currency_decimal_places',
            'currencyDecimalMark'        => 'currency_decimal_mark',
            'currencyThousandsSeparator' => 'currency_thousands_separator',
        ]);

        parent::__construct();
    }


    /**
     * @return array
     * @since $VID:$
     */
    public static function getFieldDefinitions()
    {
        return [
            'name'                       => [
                'type'        => 'String',
                'description' => __('Country Name', 'event_espresso'),
            ],
            'currencyCode'               => [
                'type'        => 'String',
                'description' => __('Country Currency Code', 'event_espresso'),
            ],
            'currencySingular'           => [
                'type'        => 'String',
                'description' => __('Currency Name Singular', 'event_espresso'),
            ],
            'currencyPlural'             => [
                'type'        => 'String',
                'description' => __('Currency Name Plural', 'event_espresso'),
            ],
            'currencySign'               => [
                'type'        => 'String',
                'description' => __('Currency Sign', 'event_espresso'),
            ],
            'currencySignBeforeNumber'   => [
                'type'        => 'String',
                'description' => __('Currency Sign Before Number', 'event_espresso'),
            ],
            'currencyDecimalPlaces'      => [
                'type'        => 'String',
                'description' => __('Currency Decimal Places', 'event_espresso'),
            ],
            'currencyDecimalMark'        => [
                'type'        => 'String',
                'description' => __('Currency Decimal Mark', 'event_espresso'),
            ],
            'currencyThousandsSeparator' => [
                'type'        => 'String',
                'description' => __('Currency Thousands Separator', 'event_espresso'),
            ],
        ];
    }
}