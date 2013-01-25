<?php

class EE_Country {
	public $id;
	public $iso3;
	public $region_id;
	public $name;
	public $currency_singular;
	public $currency_plural;
	public $currency_location;  // right of price amount, or left of
	public $is_EU;  // boolean
}