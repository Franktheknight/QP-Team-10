<html>
	<head>
		<link rel='stylesheet' text='text/css' href='main.css'/>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
		<script type='text/javascript' src='script.js'></script>
	</head>
	<body>
		<?php
			$dbc = mysqli_connect("localhost", "qpfa20", "ieeeqp", "qpdb", "3306");//Connect to database

			session_start();//Create session to stay logged in
			$id = $_SESSION['user_id'];
		
			include_once 'header.php';
			
			//Set user to logged out
			$sql = "UPDATE accounts SET active = 'n' WHERE id = '$id'";
			$query = mysqli_query($dbc,$sql);
		
			//Ensure log out worked
			if($query){
				print "It worked! You are logged out!";
			}
			else{
				print "There was a problem...";
			}
		?>
		
		<script type="text/javascript">	
			setTimeout(function(){ window.location.replace("signin.php"); }, 1500);
		</script>		
	</body>
</html>