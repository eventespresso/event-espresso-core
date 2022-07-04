<?php
defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class EE_Enum_Text_Field_Test
 * Description
 *
 * @package       Event Espresso
 * @author        Michael Nelson
 * 
 * @group model_fields
 * @group models
 */
class EE_Enum_Text_Field_Test extends EE_UnitTestCase
{

    /**
     * @var EE_Enum_Text_Field
     */
    protected $_an_enum_field;



    public function set_up()
    {
        parent::set_up();
        $this->_an_enum_field = new EE_Enum_Text_Field(
            'A_field',
            'some field',
            true,
            'b',
            array(
                'a' => 'A',
                'b' => 'B',
                'c' => 'C'
            )
        );
    }

    /**
     * ensures that when valid input is provided, its left as-is
     */
    public function test_prepare_for_set__valid()
    {
        $this->assertEquals('a',$this->_an_enum_field->prepare_for_set('a'));
        $this->assertEquals('b',$this->_an_enum_field->prepare_for_set('b'));
    }

    /**
     * verifies that when invalid input is provided, it's replaced with the default
     */
    public function test_prepare_for_set__invalid()
    {
        $this->assertEquals('b', $this->_an_enum_field->prepare_for_set('invalid'));
        $this->assertEquals('b', $this->_an_enum_field->prepare_for_set('borked'));
        //verify an error was issued if WP_DEBUG is on
        $this->assertTrue( WP_DEBUG && EE_Error::has_error());
        EE_Error::reset_notices();
    }



    /**
     * Verify that when retrieving from the DB, we're accepting of invalid input.
     * That's because data might have gotten into the db via models
     * when the filter FHEE__EE_Enum_Text_Field___allowed_enum_options
     * was used, but then the filter callback got removed. In that case,
     * we don't really want to change that existing data
     * in the DB, and we certainly don't want to have errors because of it.
     */
    public function test_prepare_for_set_from_db()
    {
        $this->assertEquals(
            'invalid-data-from-db',
            $this->_an_enum_field->prepare_for_set_from_db('invalid-data-from-db')
        );
    }



    /**
     * Verify that when something borked got into the model
     * (eg from prepare_for_set_from_db()) then it should actually
     * stay that way, even inserting it into the DB.
     * This way, if someone retrieves something borked from the DB and
     * it gets set on the model, if they switch some other field
     * on that model object and re-save it, this enum's "invalid"
     * data won't get overridden.
     * So if we want to enforce switching data back into a valid form,
     * we need to explicitly do that, it won't happen
     * automatically.
     */
    public function test_prepare_for_use_in_db()
    {
        $this->assertEquals(
            'invalid-data-on-model-object',
            $this->_an_enum_field->prepare_for_use_in_db('invalid-data-on-model-object')
        );
    }


    public function test_getSchemaType()
    {
        $this->assertEquals(array('object','null'), $this->_an_enum_field->getSchemaType());
    }


    public function test_get_wpdb_data_type()
    {
        $this->assertEquals('%s', $this->_an_enum_field->get_wpdb_data_type());
    }
}