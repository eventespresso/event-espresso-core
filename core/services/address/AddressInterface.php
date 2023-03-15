<?php

namespace EventEspresso\core\services\address;

use EE_Country;
use EE_State;
use EEI_Address;

/**
 * Interface AddressInterface
 */
interface AddressInterface extends EEI_Address
{
    public function address(): string;


    public function address2(): string;


    public function city(): string;


    public function state_obj(): ?EE_State;


    public function state_ID(): int;


    public function state_name(): string;


    public function state_abbrev(): string;


    public function state(): string;


    public function country_obj(): ?EE_Country;


    public function country_ID(): string;


    public function country_name(): string;


    public function country(): string;


    public function zip(): string;
}
