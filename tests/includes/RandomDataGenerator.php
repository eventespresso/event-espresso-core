<?php

namespace EventEspresso\tests\includes;

use stdClass;

/**
 * Class RandomDataGenerator
 *
 * @author  Brent Christensen
 * @package EventEspresso\tests\includes
 * @since   $VID:$
 */
class RandomDataGenerator
{
    /**
     * @return bool
     */
    public function coinToss()
    {
        return mt_rand(0, 100) < 50;
    }


    /**
     * @param int  $length
     * @param bool $include_symbols
     * @return string
     */
    public function generateRandomString(
        $length = 10,
        $include_letters = true,
        $include_numbers = false,
        $include_symbols = false,
        $include_spaces = false
    ) {
        // ensure at least one char type is turned on
        if (! $include_letters && ! $include_numbers && ! $include_symbols) {
            $include_letters = true;
        }
        $characters = '';
        if ($include_letters) {
            $characters .= 'abcd efg hijk lmnop qrs tuv wxyz ABCD EFG HIJK LMNOP QRS TUV WXYZ';
        }
        if ($include_numbers) {
            $characters .= '0123456789';
        }
        if ($include_symbols) {
            $characters .= '`~!@#$%^&*()-_=+[{]}\\|;:\'"<>,.?/';
        }
        $charactersLength = strlen($characters) - 1;
        $randomString     = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[ mt_rand(0, $charactersLength) ];
        }
        $randomString = $include_spaces ? $randomString : str_replace(' ', '', $randomString);
        // ensure returned value is a string
        return (string) $randomString;
    }


    /**
     * @param false $add_query_args
     * @return string
     */
    public function generateRandomURL($add_query_args = false)
    {
        $url = $this->coinToss() ? 'https://www.' : 'https://';
        $url .= $this->generateRandomString(mt_rand(5, 15));
        $url .= '.' . $this->generateRandomString(mt_rand(2, 4));
        for ($i = 0; $i < mt_rand(0, 4); $i++) {
            $url .= '/' . $this->generateRandomString(mt_rand(5, 20), true, true);
        }
        if (! $add_query_args) {
            return $url;
        }
        $url        .= '?';
        $query_args = [];
        for ($i = 0; $i < mt_rand(1, 4); $i++) {
            $key          = $this->generateRandomString(mt_rand(1, 12));
            $yes          = $this->coinToss();
            $maybe        = $this->coinToss() ? $yes : ! $yes;
            $value        = $this->generateRandomString(mt_rand(1, 12), $maybe, $maybe);
            $query_args[] = "{$key}={$value}";
        }
        $url .= implode('&', $query_args);
        return $url;
    }


    /**
     * @return string
     */
    public function generatePropertyOrKeyName()
    {
        $property = str_replace(' ', '', $this->generateRandomString(mt_rand(5, 10)));
        if (empty($property)) {
            return $this->generatePropertyOrKeyName();
        }
        return $property;
    }


    /**
     * @return string
     */
    public function getString()
    {
        return 'LPT: Change all of your passwords to "incorrect" so that your computer just tells you when you forget!';
    }


    /**
     * @return array
     */
    public function getArrayData()
    {
        $array      = [];
        $array_size = mt_rand(5, 10);
        for ($x = 0; $x <= $array_size; $x++) {
            $key           = $this->coinToss()
                ? $this->generatePropertyOrKeyName()
                : count($array);
            $array[ $key ] = $this->generateRandomString(mt_rand(10, 50));
        }
        return $array;
    }


    /**
     * @return stdClass
     */
    public function getObjectData()
    {
        $object     = new stdClass();
        $array_size = mt_rand(5, 10);
        for ($x = 0; $x <= $array_size; $x++) {
            $property            = $this->generatePropertyOrKeyName();
            $object->{$property} = $this->generateRandomString(mt_rand(10, 50));
        }
        return $object;
    }
}
