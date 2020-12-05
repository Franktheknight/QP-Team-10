<?php
	$dbc = mysqli_connect("localhost","qpfa20","ieeeqp","qpdb","3306");//Connect to database
	
	session_start();
	@$id = $_SESSION["user_id"];
	@$username = $_SESSION["username"];
	
	$data;
	
	function inferEmotion($inputtext) {
		#===TOKENIZATION===
		$inputtext = strtolower($inputtext);
		$tokens_alpha = explode(" ",$inputtext);
		#this block of text is supposed to
		#replace !\"#$%&()*+,-./:;<=>?@\[\\\]^_`{|}~\t\n with ''
		function clearspecials(&$value,$key)
		{
			$value = preg_replace("/\W|_/", '', $value);
		}
		array_walk($tokens_alpha,"clearspecials");
		#unfortunately it also removes apostrophes; creates minor discrepancies
		#but nothing fatal, still worth looking into

		$json = file_get_contents('tokenizer.json');
		
		global $data;
		$data = json_decode($json);
		$data = $data->config;
		$data = json_decode($data->index_word);
		$data = get_object_vars($data);

		function alphaToID(&$value,$key)
		{
			global $data;
			$out = array_search($value,$data);
			if ($out != False) {
				$value = $out;
			} 
			else {
				$value = 1;
			}
		}
		array_walk($tokens_alpha,"alphaToID");
		#===PADDING===
		if(count($tokens_alpha) < 1000) {
			$zeroes = array_fill(0,(1000 - count($tokens_alpha)),0);
			$tokens_padded = array_merge($zeroes,$tokens_alpha);
		}
		else {
			$tokens_padded = array_slice($a,999);
		}
		#===SENDING THE REQUEST===
		$request_body = new \stdClass();
		$request_body->instances = array($tokens_padded);
		$request_json = json_encode($request_body);

		$url = 'http://diadist.herokuapp.com/v1/models/diarydistiller/versions/1:predict';
		//Initiate cURL.
		$ch = curl_init($url);
		//Tell cURL that we want to send a POST request.
		curl_setopt($ch, CURLOPT_POST, 1);
		//Attach our encoded JSON string to the POST fields.
		curl_setopt($ch, CURLOPT_POSTFIELDS, $request_json);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		//Set the content type to application/json
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json')); 
		//Execute the request
		$result_json = curl_exec($ch);
		curl_close($ch);  
		$response = json_decode($result_json);
		return $response->predictions[0];
	}
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
					$result_array = inferEmotion($entry);
					$happiness = $result_array[0];
					$satisfaction = $result_array[1];
				
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
