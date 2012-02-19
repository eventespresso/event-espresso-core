<?php

class EE_Payment {
	public $id;
	public $timestamp;
	public $method;
	public $amount;
	public $status_id;
	public $txn_details;
	public $txn_id;
	public $surcharge;
	public $is_surcharge_percentage; //boolean, is surcharge a percentage
}