<?php
	header("content-type","text/html;charset=utf-8");
	
	//1接收数据
	$tel = $_POST["tel"];
	$email = $_POST["email"];
	$userPass = $_POST["pass"];
	
	//2、在数据库中查询
	   //1)、建立连接，并选择数据库
	   $con = mysql_connect("localhost","root","root");
	   mysql_select_db("ckshop",$con);
	   //2)、执行SQL语句（查询）
	//    tel='".$tel."' and 
	if ($tel=="" && $userPass=="") {
		$sqlStr="select * from user where email='$email'";
	}else if($email=="" && $userPass==""){
		$sqlStr="select * from user where tel='$tel'";
	}else{
		if($tel==""){
			$sqlStr="select * from user where email='".$email."' and pass='".$userPass."'";
		}else{
			$sqlStr="select * from user where tel='".$tel."' and pass='".$userPass."'";
		}
	}
	   $result=mysql_query($sqlStr,$con);
	   
	   //3)、关闭连接
	   mysql_close($con);
	//3、响应结果
	//获得$result的行数
	$rows = mysql_num_rows($result);
		
	// echo $rows;
	if($rows>0){//登录成功
		echo "1";	
	}else {//登录失败，返回0.
		echo "0";
	}	
?>