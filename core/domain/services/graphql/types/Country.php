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

use EE_Base_Class;
use EE_Country;
use EE_Error;
use EEM_Country;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\graphql\TypeBase;
use GraphQL\Deferred;
use GraphQL\Error\UserError;
use InvalidArgumentException;
use ReflectionException;

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
        $this->setFields([
            'name'  => [
                'type'        => 'String',
                'description' => __('Country Name', 'event_espresso'),
                'resolve'     => function (EE_Country $country) {
                    return $this->resolveField($country, 'name');
                },
            ],
            'currencyCode'  => [
                'type'        => 'String',
                'description' => __('Country Currency Code', 'event_espresso'),
                'resolve'     => function (EE_Country $country) {
                    return $this->resolveField($country, 'currency_code');
                },
            ],
            'currencySingular'  => [
                'type'        => 'String',
                'description' => __('Currency Name Singular', 'event_espresso'),
                'resolve'     => function (EE_Country $country) {
                    return $this->resolveField($country, 'currency_name_single');
                },
            ],
            'currencyPlural'  => [
                'type'        => 'String',
                'description' => __('Currency Name Plural', 'event_espresso'),
                'resolve'     => function (EE_Country $country) {
                    return $this->resolveField($country, 'currency_name_plural');
                },
            ],
            'currencySign'  => [
                'type'        => 'String',
                'description' => __('Currency Sign', 'event_espresso'),
                'resolve'     => function (EE_Country $country) {
                    return $this->resolveField($country, 'currency_sign');
                },
            ],
            'currencySignBeforeNumber'  => [
                'type'        => 'String',
                'description' => __('Currency Sign Before Number', 'event_espresso'),
                'resolve'     => function (EE_Country $country) {
                    return $this->resolveField($country, 'currency_sign_before');
                },
            ],
            'currencyDecimalPlaces'  => [
                'type'        => 'String',
                'description' => __('Currency Decimal Places', 'event_espresso'),
                'resolve'     => function (EE_Country $country) {
                    return $this->resolveField($country, 'currency_decimal_places');
                },
            ],
            'currencyDecimalMark'  => [
                'type'        => 'String',
                'description' => __('Currency Decimal Mark', 'event_espresso'),
                'resolve'     => function (EE_Country $country) {
                    return $this->resolveField($country, 'currency_decimal_mark');
                },
            ],
            'currencyThousandsSeparator'  => [
                'type'        => 'String',
                'description' => __('Currency Thousands Separator', 'event_espresso'),
                'resolve'     => function (EE_Country $country) {
                    return $this->resolveField($country, 'currency_thousands_separator');
                },
            ],
        ] );
    }


    /**
     * @param EE_Country $country
     * @param mixed $field
     * @return string
     * @since $VID:$
     */
    public function resolveField(EE_Country $country, $field)
    {
        return $country instanceof EE_Country ? $country->{$field}() : null;
    }
}