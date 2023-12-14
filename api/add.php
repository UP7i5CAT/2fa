<?
require_once('./opt/header.php');
/**
 * 添加2fa
 * @method POST
 * @param {string} name 名称
 * @param {string} secret 密钥
 * 
 * @return {number} code 状态码
 */

//获取post数据
$post = json_decode(file_get_contents('php://input'), true);
//获取name-secret
$data = json_decode(file_get_contents('./opt/data.json'), true);

//判断是否重名
if (array_key_exists($post['name'], $data)) {
    output(400);
    exit;
}

//添加
$data[$post['name']] = $post['secret'];
$data = json_encode($data, JSON_UNESCAPED_UNICODE);
file_put_contents('./opt/data.json', $data);

output(200);



function output($code) {
    echo json_encode(array(
        'code' => $code
    ), JSON_UNESCAPED_UNICODE);
}

?>