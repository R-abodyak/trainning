<?php
session_start();
class message
{
    // Properties
    public $success;
    public $error;
}

$objphp = new  message();

$message='';
$first_name='';
$last_name='';
$birthday='';
$gender ='';
$phone='';
$email='';
$password='';
$conn=new mysqli('localhost',"root",'','projectt');

    $first_name=$_POST['first'];
    $last_name=$_POST['last'];
    $birthday=$_POST['birthday'];
    $gender= $_POST['Gender'];
    $phone=$_POST['phone'];
    $email=$_POST['Email1'];
    $password=$_POST['password'];
    


if (mysqli_connect_errno()) {
  // echo("couldnt connect with data base");
    exit;
}


$result=mysqli_query($conn,"SELECT * FROM user WHERE email='$email' ");
$count=mysqli_num_rows($result);
if ($count>0) {

    $objphp->success="";
    $objphp->error="This email is already used ";

    //   header('Location: signup.html?msg='.$message);}
}
else {

    $userlevel=0;//for user

    $insertSQL = "INSERT INTO user(Fname,Lname,birthday,gender,phone,email,password,userlevel) values(?,?,?,?,?,?,?,?)";
    $stmt = $conn->prepare($insertSQL);
    $pass=sha1($password);
    $stmt->bind_param("sssssssi", $first_name, $last_name, $birthday,
        $gender,
        $phone,
        $email,
        $pass, $userlevel);
    $stmt->execute();

    $stmt->close();
    $objphp->success="account created successfuly";
    $objphp->error="";


/*

    $sql = "SELECT * from user WHERE email ='$email'";
    $result = mysqli_query($conn, $sql);

    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $id = $row['Id'];
            $_SESSION['userid'] = $id;
            $_SESSION['userlevel'] = 0;
            $_SESSION['ismember'] = 1;
        }
    }
    else {
        echo "0 results";
    }*/

}
$myJSON = json_encode($objphp);
echo $myJSON;