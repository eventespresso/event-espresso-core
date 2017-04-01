<?php
defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Interface EEMI_Payment_Log
 */
interface EEMI_Payment_Log
{

    /**
     * Logs a message
     *
     * @param string     $message
     * @param int|string $id
     * @param string     $model_name
     * @return EE_Log
     */
    public function gateway_log($message, $id, $model_name);



}
// End of file EEMI_Payment_Log.interface.php
// Location: ${NAMESPACE}/EEMI_Payment_Log.interface.php