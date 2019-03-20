<?php
	
	header("content-type","text/html;charset=utf-8");
	
 	// let dy = ;
    // let email = "";
    // let tel = "";
    // let pass = "";
    // let name = "";
    // let sex = "";
    // let date = "";

	//1接收数据
	$dy = $_POST["dy"];
	$email = $_POST["email"];
	$tel = $_POST["tel"];
	$pass = $_POST["pass"];
	$name = $_POST["name"];
	$sex = $_POST["sex"];
	$date = $_POST["date"];


	//1、建立连接并选择数据库
	$con = mysql_connect("localhost","root","root");
	if(!$con){
		die("连接失败".mysql_error());
	}
	mysql_select_db("ckshop",$con);
	
	//2、执行SQL语句
	$sqlStr = "insert into user (dy,email,tel,pass,name,sex,date)values('$dy','$email','$tel','$pass','$name','$sex','$date')";
    
	$result=mysql_query($sqlStr,$con);
	
	//3、关闭数据库
	mysql_close($con);
	if($result==1){
		echo "1";
	}else{
		echo "0";
	}
	

?>