<?php
require_once('core.config.php');
require_once('coreservice.class.php');


$_SESSION['currentuser'] = (object) array('Id' => '1', 'Email' => 'gdidelot@live.fr');

/**
* The proxy tester class definition
*/
class ProxyTester
{
	private $Methods;
	
	private $Proxy;
	
	public function __construct()
	{
		$this->Methods = array();
		$this->Proxy = new Core\CoreService();
	}
	
	public function DisplayCallMethod($methodName, $postInformations)
	{
		$counter = 0;
		$parameters = array();
		$values = array();
		while(isset($postInformations["param_" . $counter]))
		{
			$this->WriteLine($postInformations["name_param_" . $counter] . " = " . $postInformations["param_" . $counter]);
			$parameters[$postInformations["name_param_" . $counter]] = $postInformations["param_" . $counter];
			$values[] = $postInformations["param_" . $counter];
			$counter++;
		}

		$class = new \ReflectionClass('Core\CoreService'); 
		$objectInstance = $class->newInstanceArgs();
		
		if(method_exists($objectInstance , $methodName ) == false)
		{
			WriteLine(sprintf("The method name %s doesn't exist on the server proxy.", $methodName));
		}
		
		$result = call_user_func_array(array($objectInstance, $methodName), $values);
		var_dump($result);
	}
	
	public function DisplayTableTest()
	{
		$reflector = new ReflectionClass('Core\CoreService');
		$parameters = $reflector->getMethod($_GET["method"])->getParameters();
		
		$this->WriteLine("");
		
		$table = "<form method='post'>";
		$table .= "<input type='hidden' id='request_post' name='request_post' />";
		$table .= "<table border=1>";
		$table .= "<tr>";
		$table .= "<th colspan=2>" . $_GET["method"] . "</th>";
		$table .= "</tr>";
		$counter = 0;
		foreach($parameters as $parameter)
		{
			$table .= "<tr>";
			$table .= "<td><input type='hidden' id='name_param_". $counter ."' name='name_param_". $counter ."' value='" . $parameter->name . "'/>" . $parameter->name . "</th>";
			$table .= "<td><input type='text' id='param_" . $counter . "' name='param_". $counter ."'/></th>";
			$table .= "</tr>";
			$counter++;
		}
		$table .= "<tr>";
		$table .= "<td colspan=2><input type='submit' /></th>";
		$table .= "</tr>";
		$table .= "</table>";
		$table .= "</form>";
		$this->WriteLine($table);
	}
	
	public function DisplayMethods()
	{
		$this->Methods = get_class_methods($this->Proxy); 
		sort($this->Methods);

		foreach ($this->Methods as $method) 
		{
			$this->Methods[] = $method;
			$this->WriteLine("<a href='test.proxy.php?method=". $method ."'>" . $method . "</a>");
		}
	}

	public function WriteLine($text)
	{
		echo $text . "<br/>";
	}
}

try
{
	$proxyTester = new ProxyTester();

	if(isset($_POST["request_post"]) == true && isset($_GET["method"]) == true)
	{
		$proxyTester->DisplayCallMethod($_GET["method"], $_POST);
	}

	if(isset($_GET["method"]) == true)
	{
		$proxyTester->DisplayTableTest();
	}

	$proxyTester->DisplayMethods();
}
catch(\Exception $ex)
{
	echo $ex;
}



?>