<?php
include('./library/conn.php');


$phone = $_REQUEST['phone'];


// echo "$phone";

$sql = "select * from users where phone = '$phone'";

$result = $mysqli->query($sql);

//  var_dump($result);

// $result->num_rows>0时 数据库有该数据
// $result->num_rows=0时 数据库没有改数据
// 并将数据写入数据库
if ($result->num_rows > 0) {
    //    echo '1';

} else {
    // echo '0';


    $sqll = "INSERT INTO users (phone) VALUES ('$phone')";
    echo $sqll;
    $res = $mysqli->query($sqll);
}






$mysqli->close();
