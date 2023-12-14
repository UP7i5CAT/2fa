<?php
require_once('./opt/header.php');
require_once('./opt/GoogleAuthenticator.php');

//读取json
$json_string = file_get_contents('./opt/data.json');
$data = json_decode($json_string, true);

$ga = new PHPGangsta_GoogleAuthenticator();
foreach ($data as $key => $value) {
    
    $oneCode = $ga->getCode($value);
    
    $data[$key] = $oneCode;
}

$data = json_encode($data, JSON_UNESCAPED_UNICODE);
echo $data;

?>