<?php 
class SimpleMath {
	var $a;
	var $b;
	var $math;
	
	function add($a, $b){
		$math = $a + $b;
		return $math;
	}
	function subtract($a, $b){
		$math = $a - $b;
		return $math;
	}
	function multiply($a, $b){
		$math = $a * $b;
		return $math;
	}
	function divide($a, $b){
		$math = $a / $b;
		return $math;
	}
}