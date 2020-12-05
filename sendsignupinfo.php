<?php
	$dbc = mysqli_connect("localhost","qpfa20","ieeeqp","qpdb","3306");
	
	if($_POST['submit']){
		$username = strtolower($_POST['userName']);
		$password = $_POST['passWord'];
		$fullname = $_POST['fullName'];
		$email = $_POST['emailAddress'];
	}
	else{
	}	
	
	session_start();
	@$id = @$_SESSION["user_id"];
?>
<html>
<head>
<title>Processing...</title>
<link rel='stylesheet' text='text/css' href='main.css'/>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script type='text/javascript' src='script.js'></script>
</head>
<body>
<?php include_once 'header.php'; ?>
	<?php 
	if($active !== 'y'){
		$sql = "insert into accounts values(null,'$fullname','$username','$email','$password','n')";
		$query6 = mysqli_query($dbc,$sql);
	}
	if($query6){
	?><h1 align="center"><span style="color:mediumslateblue">You Are Signed Up! <br/> Please Redirect Yourself To The <a href="http://localhost/Lost-N-Found-v1/SignIn.php">Sign In</a> Page To Log In</span></h1><?php
	}
	else{
		print "There was some issue processing your request. Please try again later.";
	}
	?>
</body>
</html>
