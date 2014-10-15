<?php

/**
 * Just makes sure the string is all upper case. If the user didn't provide an all
 * upper case input, we just correct it for them
 */
class EE_All_Caps_Normalization extends EE_Normalization_Strategy_Base{
	function normalize($value_to_normalize) {
		return strtoupper($value_to_normalize);
	}
}