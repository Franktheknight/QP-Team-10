<?php
	$dbc = mysqli_connect("localhost","qpfa20","ieeeqp","qpdb","3306");//Connect to database
	
	session_start();//Start session to stay logged in
	@$id = $_SESSION["user_id"];
?>

<!DOCTYPE html>
<html>
	<head>
		<link rel="shortcut icon" href="logo.png"/>
		<link rel='stylesheet' type='text/css' href='main.css'/>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
		<script type='text/javascript' src='script.js'></script>
	</head>
	<body>
	<?php include_once 'header.php'; ?>
	</body>
	<script type="text/javascript">	
		setTimeout(function(){ window.location.replace("signin.php"); }, 250);
	</script>
</html>