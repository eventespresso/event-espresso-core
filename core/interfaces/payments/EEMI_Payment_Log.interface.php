<?php

/**
 * Interface EEMI_Payment_Log
 */
interface EEMI_Payment_Log
{
    /**
     * Logs a message
     *
     * @param array|string $message
     * @param int|string   $id
     * @param string       $model_name
     * @return EE_Change_Log
     */
    public function gateway_log($message, $id, string $model_name): EE_Change_Log;
}
