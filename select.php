<?php
	header("content-type","text/html;charset=utf-8");
	
	//1接收数据
	$tel = $_POST["tel"];
	$email = $_POST["email"];
	
	//2、在数据库中查询
	   //1)、建立连接，并选择数据库
	   $con = mysql_connect("localhost","root","root");
	   mysql_select_db("ckshop",$con);
	   //2)、执行SQL语句（查询）
	if($tel==""){
		$sqlStr="select * from user where email='$email'";
	}else{
		$sqlStr="select * from user where tel='$tel'";
	}
	$result=mysql_query($sqlStr,$con);
    $query_row = mysql_fetch_array($result);
    $str = $query_row[5];
     //3)、关闭连接
    mysql_close($con);
    echo $str;
?>