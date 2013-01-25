<?php

class EE_Venue {

	public $id;
	public $address;
	public $address2;
	public $city;
	public $state;
	public $zip;
	public $country_id;
	public $phone;

	public function __construct($venue_id = NULL) {
		$this->id = $venue_id;
	}

	public function populate_from_array($data) {
		foreach ($data as $key => $value) {
			$this->$key = $value;
		}
	}
}