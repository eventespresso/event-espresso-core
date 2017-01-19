<?php

/**
 * Parent class of any field which is a foreign key. It actually inherits all its
 * needed functions from its parent, but because all foreign key fields inherit from
 * this one, its easy ot check if a field is a foreign key.
 */
abstract class EE_Foreign_Key_Field_Base extends EE_Field_With_Model_Name
{
}
