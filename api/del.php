<?php
require_once('./opt/header.php');
/**
 * 删除2fa
 * @method POST
 * @param {string} name 名称
 * 
 * @return {number} code 状态码
 */

//获取post数据
$post = json_decode(file_get_contents('php://input'), true);
//获取name-secret
$data = json_decode(file_get_contents('./opt/data.json'), true);

//判断是否存在
if (!array_key_exists($post['name'], $data)) {
    output(400);
    exit;
}

//删除
unset($data[$post['name']]);
$data = json_encode($data, JSON_UNESCAPED_UNICODE);
file_put_contents('./opt/data.json', $data);

output(200);

function output($code) {
    echo json_encode(array(
        'code' => $code
    ), JSON_UNESCAPED_UNICODE);
}

?>