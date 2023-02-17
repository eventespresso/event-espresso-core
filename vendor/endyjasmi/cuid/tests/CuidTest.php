<?php namespace EndyJasmi;

use PHPUnit_Framework_TestCase as TestCase;

class CuidTest extends TestCase
{
    const MAX_ITERATION = 100000;
    const MIN_ITERATION = 12000;

    public function testInvokeMagicMethod()
    {
        $cuid = new Cuid;

        $hash = $cuid();

        $this->assertInternalType('string', $hash);
        $this->assertRegExp('/c[0-9a-z]{24,}/', $hash);
    }

    public function testCuidMethod()
    {
        $cuid = new Cuid;

        $hash = $cuid->cuid();

        $this->assertInternalType('string', $hash);
        $this->assertRegExp('/c[0-9a-z]{24,}/', $hash);
    }

    public function testCuidStaticMethod()
    {
        $hash = Cuid::cuid();

        $this->assertInternalType('string', $hash);
        $this->assertRegExp('/c[0-9a-z]{24,}/', $hash);
    }

    public function testMakeMethod()
    {
        $cuid = new Cuid;

        $hash = $cuid->make();

        $this->assertInternalType('string', $hash);
        $this->assertRegExp('/c[0-9a-z]{24,}/', $hash);
    }

    public function testMakeStaticMethod()
    {
        $hash = Cuid::make();

        $this->assertInternalType('string', $hash);
        $this->assertRegExp('/c[0-9a-z]{24,}/', $hash);
    }

    public function testSlugMethod()
    {
        $cuid = new Cuid;

        $hash = $cuid->slug();

        $this->assertInternalType('string', $hash);
        $this->assertRegExp('/[0-9a-z]{8}/', $hash);
    }

    public function testSlugStaticMethod()
    {
        $hash = Cuid::slug();

        $this->assertInternalType('string', $hash);
        $this->assertRegExp('/[0-9a-z]{8}/', $hash);
    }

    public function testCuidUniqueness()
    {
        $ids = [];

        for ($i = 1; $i <= static::MAX_ITERATION; $i++) {
            $hash = Cuid::make();

            $this->assertFalse(isset($ids[$hash]));

            $ids[$hash] = $i;
        }
    }

    public function testSlugUniqueness()
    {
        $ids = [];

        for ($i = 1; $i <= static::MIN_ITERATION; $i++) {
            $hash = Cuid::slug();

            $this->assertFalse(isset($ids[$hash]));

            $ids[$hash] = $i;
        }
    }
}
