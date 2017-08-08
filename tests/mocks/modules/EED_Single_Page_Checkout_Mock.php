<?php

class EED_Single_Page_Checkout_Mock extends EED_Single_Page_Checkout
{

    /**
     * @return EED_Module|EED_Single_Page_Checkout_Mock
     */
    public static function instance()
    {
        return parent::get_instance(__CLASS__);
    }

    public function is_reg_checkout()
    {
        return $this->_is_reg_checkout();
    }
}
