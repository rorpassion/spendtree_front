<?php

class User {
	
	private $dbh;
	
	public function __construct($host,$user,$pass,$db)	{		
		$this->dbh = new PDO("mysql:host=".$host.";dbname=".$db,$user,$pass);		
	}

	public function login($inputUsername,$inputPassword){
		$user = new stdClass; 
		
		
		//verify that both username and password were submitted
		if($inputUsername=='' || $inputPassword =='' || $inputUsername=='undefined' || $inputPassword =='undefined'){
			$user->hasError = true;
			$user->errorText = 'Please enter both username and password';
		}else{
			//lookup email in database 
			$sth = $this->dbh->prepare("SELECT * FROM users WHERE users.email=?");
			$sth->execute(array($inputUsername));
			$row = $sth->fetch(PDO::FETCH_ASSOC);
			
			if(md5($inputPassword) == $row['password']){
				//set _SESSION ID equal to user id in table and return success
				$_SESSION['ID'] = $row['ID'];
				$user->hasError=false;
				$user->$_SESSION['ID']= 1;
			}else{
				$user->hasError=true;
				$user->errorText = 'Password and username do not match.';
			}

		
			
		}
		
		return json_encode($user);
		}
	}
?>