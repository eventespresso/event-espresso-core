<?php

/**
 * Class EE_Restriction_Generator_Meta_Test
 *
 * @package     Event Espresso
 * @subpackage  tests
 * @author      Mike Nelson
 * @group       core/db_models
 * @group       restriction-generators
 */
class EE_Restriction_Generator_Meta_Test extends EE_UnitTestCase
{
    /**
     * @throws EE_Error
     */
    public function test_no_caps()
    {
        $generator = new EE_Restriction_Generator_Meta('meta_key', 'meta_value');
        $generator->_construct_finalize(EEM_Post_Meta::instance(), EEM_Base::caps_read);
        $restrictions = $generator->generate_restrictions();
        $this->assertArrayHasKey(EE_Restriction_Generator_Base::get_default_restrictions_cap(), $restrictions);
        $this->assertArrayHasKey('apply-to-all-queries-using-caps', $restrictions);
        $this->assertInstanceOf(
            'EE_Return_None_Where_Conditions',
            $restrictions[ EE_Restriction_Generator_Base::get_default_restrictions_cap() ]
        );
        $restrictions_for_all_cap_contexts = $restrictions['apply-to-all-queries-using-caps'];
        $this->assertInstanceOf('EE_Default_Where_Conditions', $restrictions_for_all_cap_contexts);
        $this->assertEquals(
            [
                'meta_key'   => ['NOT_LIKE', "\\\\_%"],
                'meta_value' => ['NOT_REGEXP', '^[aOs]:[\d]:.*$'],
            ],
            $restrictions_for_all_cap_contexts->get_default_where_conditions()
        );
    }


    /**
     * @throws EE_Error
     */
    public function test_no_caps__whitelisted_and_blacklisted()
    {
        add_filter(
            'FHEE__EE_Restriction_Generator_Meta___generate_restrictions__whitelisted_meta_keys',
            [$this, '_whitelist_metas']
        );
        add_filter(
            'FHEE__EE_Restriction_Generator_Meta___generate_restrictions__blacklisted_meta_keys',
            [$this, '_blacklist_metas']
        );
        $generator = new EE_Restriction_Generator_Meta('meta_key', 'meta_value');
        $generator->_construct_finalize(EEM_Post_Meta::instance(), EEM_Base::caps_read);
        $restrictions = $generator->generate_restrictions();
        $this->assertArrayHasKey(EE_Restriction_Generator_Base::get_default_restrictions_cap(), $restrictions);
        $this->assertArrayHasKey('apply-to-all-queries-using-caps', $restrictions);
        $this->assertInstanceOf(
            'EE_Return_None_Where_Conditions',
            $restrictions[ EE_Restriction_Generator_Base::get_default_restrictions_cap() ]
        );
        $restrictions_for_all_cap_contexts = $restrictions['apply-to-all-queries-using-caps'];
        $this->assertInstanceOf('EE_Default_Where_Conditions', $restrictions_for_all_cap_contexts);
        $this->assertEquals(
            [
                'OR*whitelisted-or-normal' => [
                    'meta_key*whitelisted' => ['IN', ['white']],
                    'AND'                  => [
                        'meta_key'             => ['NOT_LIKE', "\\\\_%"],
                        'meta_value'           => ['NOT_REGEXP', '^[aOs]:[\d]:.*$'],
                        'meta_key*blacklisted' => ['NOT_IN', ['black']],
                    ],
                ],
            ],
            $restrictions_for_all_cap_contexts->get_default_where_conditions()
        );
    }


    public function _whitelist_metas(): array
    {
        return ['white'];
    }


    public function _blacklist_metas(): array
    {
        return ['black'];
    }
}
