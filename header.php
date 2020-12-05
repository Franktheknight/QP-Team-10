<!DOCTYPE html>
<html>
	<head>
		<link rel="shortcut icon" href="http://localhost/Lost-N-Found-v1/logo.png"/>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
		<link rel='stylesheet' text='text/css' href='main.css'/>
		
	</head>
	<body>
		<header id="mainHeader">
			<div id="menuContainer" class="absolute">
				<a href="#">
					<span class="absolute">
						<img id="menu" class="absolute" src="menu.png"/>
					</span>
				</a>
			</div>
			
			<div id="logoContainer" class="absolute">
				<h1 style="font-size:73px;">Diary Distiller</h1>
			</div>
			<?php
				$sql = "SELECT active, fullname FROM accounts where id = '$id'";
				$query = mysqli_query($dbc,$sql);
				
				if($query){
					$row = mysqli_fetch_row($query);
					$active = $row[0];
					$full_name = $row[1];
					
					if($active == 'y'){?>
						<span id="account" class="absolute" style="display:inline;">
							<?php @print("Welcome " . $full_name . " <a href='#'><div style='display:inline-block;' id='arrow-down'></div></a>"); ?> 
						</span>
					<?php 
					}
				}
			?>
		</header>
		
		<span>
			<table style="display:inline-block" id="leftMenu">
				<tr>
					<td><a href="home.php" class="menuItem">Home</a></td>
				</tr>
				<tr>
					<td><a href="signin.php" class="menuItem">Sign In</a></td>
				</tr>
				<tr>
					<td><a href="signup.php" class="menuItem">Sign Up</a></td>
				</tr>
				<tr>
					<td><a href="search.php" class="menuItem">Search</a></td>
				</tr>
				<tr>
					<td><a href="report.php" class="menuItem">Report</a></td>
				</tr>
				<tr>
					<td><a href="contactus.php" class="menuItem">Contact Us</a></td>
				</tr>
			</table>
		</span>
		
		<table id="personal" class="display">
			<tr>
				<td><a href="profile.php" class="menuItem">Profile</a></td>
			</tr>
			<tr>
				<td><a href="logoutpage.php" class="menuItem">Log Out</a></td>
			</tr>
		</table>
		<hr>
	</body>
</html>