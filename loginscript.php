<?php
	$dbc = mysqli_connect("localhost","qpfa20","ieeeqp","qpdb","3306");//Connect to database

	if(@$_POST['submit']){//Pull info from signin.php
		$username = strtolower($_POST['userName']);
		$password = $_POST['passWord'];
		
		$sql8 = "SELECT id, username, passcode FROM accounts WHERE username = '$username'";
		$query7 = mysqli_query($dbc,$sql8);
	}
	
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
		<br/>
		<h1 align="center"><span style="color:mediumslateblue">
			<?php
			if($query7){//Pull confirmation credentials from database
				$row = mysqli_fetch_row($query7);
				$user_id = $row[0];
				$dbUsername = $row[1];
				$dbPassword = $row[2];
					
				//Check if credentials match
				if($password == $dbPassword && $username == $dbUsername && $username != ""){
					$_SESSION["user_id"] = $user_id;
					$_SESSION["username"] = $username;
					
					//Set user to logged in
					$sql9 = "update accounts set active = 'y' where id = '$user_id'";
					$query1 = mysqli_query($dbc,$sql9);?>
					You Are Logged In
				<?php 	
				}
				else{?>
					Please Log In Again!
				<?php }
			}
			else{ ?>
				Please Log In Again!
			<?php } ?>
			<br/></span>
		</h1>	
		<script type="text/javascript">	
			setTimeout(function(){ window.location.replace("report.php"); }, 1500);
		</script>				
	</body>
</html>