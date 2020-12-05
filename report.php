<?php
	$dbc = mysqli_connect("localhost","qpfa20","ieeeqp","qpdb","3306");//Connect to database
	
	session_start();
	@$id = $_SESSION["user_id"];
	@$username = $_SESSION["username"];
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
			<span style="color:mediumslateblue">Did You Find Something? </span> 
			<br/> 
			<span style="color:limegreen">Let's Return It To The Owner!</span>
		</h1>
		<hr>

		<form action="report.php" method="post" enctype="multipart/form-data">      
			<p align="center">Diary Entry:<br/><textarea rows="7" cols="90" name="entry"></textarea></p>
			<p align="center">
				<select name="public">
					<option value="y" selected>Public</option>
					<option value="n">Private</option>
				</select>
			</p>
			<p align="center">
				<select name="anon">
					<option value="y" selected>Anonymous</option>
					<option value="n">Name Visible</option>
				</select>
			</p>
			<p align="center">
				<input type="submit" name="submit" />
			</p>
		</form>
		
		<?php 
			if($active == 'y'){
				if(isset($_POST['submit'])){//Check that submit button was clicked
					//Pull info from form
					$entry = addslashes($_POST['entry']);//Encode quote-breakers
					$public = $_POST['public'];
					$anon = $_POST['anon'];
				
					//Enter POST request to model here
					$happiness = 0.75;
					$satisfaction = 0.123;
				
					//Input to database
					$sql8 = "INSERT INTO diaries values(null, '$entry', '$username', null,'$anon','$public','$happiness','$satisfaction');";
					$query5 = mysqli_query($dbc,$sql8);
					
					if($query5){
						print("Submitted successfully!");
					}
					else{
						print("Error submitting. Please try again.");
						print($sql8);
					}
				}
			}
			else{
				print("Please sign in to post a diary entry");
			}
		?>
	</body>
</html>