<?php

class EE_Registration {
	public $attendee_id;
	public $event_id;
	public $price_option;
	public $is_early_bird;  // boolean, was EB applied?
	public $promo_code;
	public $is_groupon;    // boolean, was promo code a groupon code
	public $timestamp;
}