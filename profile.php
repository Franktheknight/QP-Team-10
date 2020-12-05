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
			<span style="color:mediumslateblue">Did You Need To Change Something? </span> 
			<br/> 
			<span style="color:limegreen">You Can Fix It Right Away!</span>
		</h1>
		<hr>
		<?php 
		if($active == 'y'){//Check if user is logged in
			//Pull info from database
			$sql = "SELECT fullname, username, email, active FROM accounts WHERE id = '$id'";
			$query = mysqli_query($dbc, $sql);
			
			$row1 = mysqli_fetch_row($query);
			$dbFullName = $row1[0];
			$dbUserName = $row1[1];
			$dbEmail = $row1[2];
			$active = $row1[3];
			?>
			<h4 class="profileItem">Name:</h4><?php print " " . $dbFullName ?> 
			<br/><br/> 
			<h4 class="profileItem">Username:</h4><?php print " ". $dbUserName?> 
			<br/><br/> 
			<h4 class="profileItem">Email Address:</h4><?php print " " . $dbEmail; 
		}
		else{
			print "Please sign in...";
		}
		?>
	</body>
</html>