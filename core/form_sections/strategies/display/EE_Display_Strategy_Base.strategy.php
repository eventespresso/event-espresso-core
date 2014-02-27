<?php

abstract class EE_Display_Strategy_Base extends EE_Form_Input_Strategy_Base{
	/**
	 * returns HTML and javascript related to the displaying of this forms
	 * @return string
	 */
	abstract function display();
}