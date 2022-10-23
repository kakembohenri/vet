<?php
$number = "0712804062";

$newNumber = preg_replace("/0/", "256", $number, 1);

echo "new number is: " . $newNumber;
