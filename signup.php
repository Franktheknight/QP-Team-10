<?php
	$dbc = mysqli_connect("localhost","qpfa20","ieeeqp","qpdb","3306");//Connect to database
	
	session_start();//Create session to stay logged in
	@$id = $_SESSION["user_id"];
?>

<!DOCTYPE html>
<html>
	<head>
		<link rel='stylesheet' href='style.css'/>
		<link rel="shortcut icon" href="logo.png"/>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
		<link rel='stylesheet' text='text/css' href='main.css'/>
		<script type='text/javascript' src='script.js'></script>
	</head>
	<body>
		<?php include_once 'header.php'; ?>
		<h1 align="center">
			<span style="color:mediumslateblue">Not Part of the Club Yet?</span> 
			<br/> 
			<span style="color:limegreen">Go Ahead and Join Today!</span>
		</h1>
		<hr>
		
		<form action="sendsignupinfo.php" method="post">
			<p align="center">
				Username:
				<br/>
				<input type="text" name="userName">
				<br/><br/>
				Password:
				<br/>
				<input type="password" name="passWord">
				<br/><br/>
				Full Name:
				<br/>
				<input type="text" name="fullName">
				<br/><br/>
				Email:
				<br/>
				<input type="text" name="emailAddress">
				<br/><br/>
				<input type="submit" name="submit" value="Sign Up">
			</p>
		</form>
	</body>
</html>