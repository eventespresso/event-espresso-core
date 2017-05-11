<?php
namespace EventEspresso\Codeception\helpers;

trait Test
{
    public function seeSomething()
    {
        /* @var \EventEspressoAcceptanceTester **/
        $I = $this;
        $I->seeElement('#cheesburger');
    }
}