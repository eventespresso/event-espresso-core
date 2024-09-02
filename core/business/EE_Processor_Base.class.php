<?php

/**
 * Class EE_Processor_Base
 *
 * @package     Event Espresso
 * @subpackage  core
 * @author      Brent Christensen
 * @since       4.6
 */
class EE_Processor_Base
{
    /**
     * Used to indicate whether current request is for an IPN or not.
     *
     * @var bool
     */
    protected static bool $IPN = false;

    /**
     * Used to indicate whether SPCO is being revisited by registrant or not.
     *
     * @var bool
     */
    protected bool $_revisit = false;

    private static bool $debug = false;


    /**
     * @param bool|int|string $IPN truthy/falsey value
     */
    public static function set_IPN($IPN)
    {
        self::$IPN = filter_var($IPN, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * Allows external class (usually checkout) to set whether SPCO is being revisited by registrant or not.
     *
     * @param bool|int|string $revisit
     * @return void
     */
    public function set_revisit($revisit = false)
    {
        $this->_revisit = filter_var($revisit, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * debug
     *
     * @param string              $class
     * @param string              $func
     * @param int|string          $line
     * @param EE_Transaction|null $transaction
     * @param array               $info
     * @param bool                $display_request
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function log(
        string $class = '',
        string $func = '',
        $line = '',
        ?EE_Transaction $transaction = null,
        array $info = [],
        bool $display_request = false
    ) {
        if (EE_Processor_Base::$debug && $transaction instanceof EE_Transaction && $transaction->ID()) {
            // don't serialize objects
            $info = EEH_Debug_Tools::strip_objects($info);
            $info['TXN_status']    = $transaction->status_ID();
            $info['TXN_reg_steps'] = $transaction->reg_steps();
            $index                 = 'EE_Transaction: ' . $transaction->ID();
            EEH_Debug_Tools::log($class, $func, $line, $info, $display_request, $index);
        }
    }
}
