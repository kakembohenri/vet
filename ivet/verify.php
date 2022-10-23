<?php

// use function PHPSTORM_META\type;

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type:application/json");

$formData = json_decode(file_get_contents("php://input"));


function SendSMS($username, $password, $sender, $number, $message)
{

    $url = "www.egosms.co/api/v1/plain/?";

    $parameters = "number=[number]&message=[message]&username=[username]&password=[password]&sender=[sender]";
    $parameters = str_replace("[message]", urlencode($message), $parameters);
    $parameters = str_replace("[sender]", urlencode($sender), $parameters);
    $parameters = str_replace("[number]", urlencode($number), $parameters);
    $parameters = str_replace("[username]", urlencode($username), $parameters);
    $parameters = str_replace("[password]", urlencode($password), $parameters);
    $live_url = "https://" . $url . $parameters;
    $parse_url = file($live_url);
    $response = $parse_url[0];
    return $response;
}


$username = "kakembohenry";
$password = " gtw38sa,clw0epvhwcqa3w6Atnb2053x?=kalw";
$sender = 'kakembo henry';
$number = json_encode($formData->phone_number);
$message = "Your verification code for ivet is " . json_encode($formData->code);
$number = trim($number, '"');
$number = str_replace(',', '', $number);
$number = preg_replace("/0/", "256", $number, 1);
// echo number_format(floatval($newNumber));
// echo $number;
echo SendSMS($username, $password, $sender, $number, $message);
