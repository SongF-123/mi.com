<?php

include('./library/conn.php');

$phone = $_REQUEST['phone'];
// $password = $_REQUEST['password'];

$sql = "select * from users where phone='$phone'";

$result = $mysqli->query($sql);

// var_dump ($result);

if($result->num_rows>0){
   echo '1';
}else{
  echo '0';
}
$mysqli->close();
?>