<?php

include('./library/conn.php');

$phone = $_REQUEST['phone'];
// $password = $_REQUEST['password'];

$sql = "select * from users where phone='$phone'";

$result = $mysqli->query($sql);

// var_dump ($result);

if($result->num_rows>0){

   


   echo '<script>alert("登陆成功")</script>';
     echo '<script>location.href="../src/html/index.html"</script>';

}else{
    echo '<script>alert("用户名或密码错误")</script>';
    echo '<script>location.href="../src/html/login.html"</script>';
    /* echo "0"; */
}
$mysqli->close();
?>