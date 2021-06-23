<?php

use EventEspresso\core\exceptions\EntityNotFoundException;

class EE_Form_Submission extends EE_Base_Class
{

    /**
     * @param array $props_n_values
     * @return EE_Form_Submission
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance(array $props_n_values = []): EE_Form_Submission
    {
        $props_n_values['FSB_submitted'] = new DateTime();
        $has_object = parent::_check_for_object($props_n_values, __CLASS__);
        return $has_object ?: new self($props_n_values);
    }


    /**
     * @param array $props_n_values
     * @return EE_Form_Submission
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance_from_db(array $props_n_values = []): EE_Form_Submission
    {
        return new self($props_n_values, true);
    }


    /**
     * Form Section UUID (universally unique identifier)
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function UUID(): string
    {
        return $this->get('FSB_UUID');
    }


    /**
     * @param string $UUID
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setUUID(string $UUID)
    {
        $this->set('FSB_UUID', $UUID);
    }


    /**
     * UUID or ID of related entity this form submission belongs to.
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function formSection(): string
    {
        return $this->get('FSC_UUID');
    }


    /**
     * @param string $form_section_UUID
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setFormSection(string $form_section_UUID)
    {
        $this->set('FSC_UUID', $form_section_UUID);
    }


    /**
     * Returns the related EE_Transaction this form submission belongs to.
     *
     * @return EE_Transaction
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws ReflectionException
     */
    public function transaction(): EE_Transaction
    {
        $transaction = $this->get_first_related('Transaction');
        if (! $transaction instanceof EE_Transaction) {
            throw new EntityNotFoundException('Transaction ID', $this->transactionID());
        }
        return $transaction;
    }


    /**
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function transactionID(): int
    {
        return $this->get('TXN_ID');
    }


    /**
     * @param int $TXN_ID
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setTransactionID(int $TXN_ID = 0)
    {
        $this->set('TXN_ID', $TXN_ID);
    }


    /**
     * @return mixed
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function data()
    {
        return $this->get('FSB_data');
    }


    /**
     * @param array|string $data
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setData($data)
    {
        $this->set('FSB_data', $data);
    }


    /**
     * @param bool $raw
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function submitted(bool $raw = false): int
    {
        return $raw
            ? $this->get_raw('FSB_submitted')
            : $this->get('FSB_submitted');
    }
}
