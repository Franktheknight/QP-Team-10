<?php
	$dbc = mysqli_connect("localhost","qpfa20","ieeeqp","qpdb","3306");//Connect to database

	session_start();//Start session for staying logged in
	@$id = $_SESSION["user_id"];
	@$username = $_SESSION["username"];
	
	$threshold = 0.016;//MSE threshold value
	
	function sq_error($val_1,$val_2){//Squared error for 2 items
		$diff = $val_1 - $val_2;
		return $diff*$diff;
	}
?>


<html>
	<head>
		<meta name="viewport" content="width=device-width,initial-scale=1.0">
		<link rel='stylesheet' type='text/css' href='main.css'/>
		<link rel="shortcut icon" href="logo.png"/>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
		<script type='text/javascript' src='script.js'></script>
	</head>
	<body>
	<?php
		include_once 'header.php';
		
		if($active == 'y'){//Check that user is logged in
			$sql = "SELECT * FROM diaries where user_name = '$username'";
			$query = mysqli_query($dbc,	$sql);
			$userEntries = mysqli_fetch_all($query);
			
			if(count($userEntries) == 0){
				$lastHappiness = 1;
				$lastSatisfaction = 1;
			}
			else{
				$lastUserEntry = $userEntries[count($userEntries)-1];//Find most recent entry of user
				$lastHappiness = $lastUserEntry[6];
				$lastSatisfaction = $lastUserEntry[7];
			}
			
			//Search applicable posts
			$sql = "SELECT * FROM diaries where user_name != '$username' and public = 'y'";
			$query = mysqli_query($dbc,$sql);
			
			if($query){//Make sure query went through
				$results = mysqli_fetch_all($query);
				
				$numRecommended = 0;
				for($i = count($results)-1; $i >= 0; $i--){
					$currResult = $results[$i];
					
					//Prediction values of current database entry
					$currEntryText = stripslashes($currResult[1]);
					$currHappiness = $currResult[6];
					$currSatisfaction = $currResult[7];

					//Check if posts are similar enough
					$meanSquaredError = (sq_error($lastHappiness,$currHappiness) + sq_error($lastSatisfaction,$currSatisfaction))/2;
					if($meanSquaredError > $threshold){
						continue;
					}
					
					//Check/Set anonymity of post
					if($currResult[4] == 'y'){
						$currEntryUser = "Anonymous";
					}
					else{
						$currEntryUser = $currResult[2];
					}
					
					print("<div class='searchResult'>" . $currResult[1] . "<br/> Written by " . $currEntryUser . "</div>");
					$numRecommended++;
				}
				
				if($numRecommended == 0){
					print("Sorry, we couldn't find any posts similar to yours. Here are some recent ones instead. <br/><br/>");
					
					for($i = count($results)-1; $i > count($results) - 9; $i--){//8 most recent posts
						$currResult = $results[$i];
						$currEntryText = stripslashes($currResult[1]);
						
						//Check/Set anonymity of post
						if($currResult[4] == 'y'){
							$currEntryUser = "Anonymous";
						}
						else{
							$currEntryUser = $currResult[2];
						}
						
						print("<div class='searchResult'>" . $currResult[1] . "<br/> Written by " . $currEntryUser . "</div>");
					}
				}
			}
			else{
				print("There was an error processing your request. Pleast try again.");
			}
		}
	?>
	</body>
</html>
