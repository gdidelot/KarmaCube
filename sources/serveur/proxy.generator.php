<?php

/**
* The proxy method to generate
*/
class ProxyMethod 
{
	/**
	* @var string $Component The method component
	*/
	public $Component;
	
	/**
	* @var string $MethodComponent The method component
	*/
	public $MethodComponent;
	
	/**
	* @var string $MethodComments The method comment
	*/
	public $MethodComments;
	
	/**
	* @var string $MethodName The method name
	*/
	public $MethodName;
	
	/**
	* @var array $MethodParameters The method parameters
	*/
	public $MethodParameters;
	
	/**
	* @var string $Interface The method interface
	*/
	public $MethodInterface;
}

/**
* The class which generate the proxy
*/
class ProxyGenerator
{
	const PROXY_CLASS_NAME = 'Services'; 
	
	const PROXY_FILE_NAME = 'services.class.php'; 
	
	/**
	* @var array $Interfaces The used interfaces with their namespace
	*/
	private $InterfacesFullName;
	
	/**
	* @var array $Interfaces The used interfaces without their namespace
	*/
	private $InterfacesName;
	
	/**
	* @var array $Interfaces The used interfaces without their namespace
	*/
	private $ComponentsName;
	
	/**
	* @var array $componentClasses The used component classes
	*/
	private $ComponentClasses;
	
	/**
	* @var array $ProxyMethods The used proxy methods
	*/
	private $ProxyMethods;
	
	/**
	* The constructor
	*
	* @param array<string> $components The components to compute
	*/
	public function __construct($components)
	{
		if(isset($components) == false)
		{
			throw new Exception("Set the components");
		}
		
		if(count($components) == 0)
		{
			throw new Exception("There is no components to generate");
		}
		
		$this->ComponentsName = array();
		
		$this->ComponentClasses = array();
		
		foreach($components as $component)
		{
			array_push($this->ComponentsName, ucwords($component));
			
			$path = COMPONENTS_DIR . 'Gestion' . $component;
		
			foreach (glob($path . "/*.services.php") as $filename) 
			{
				$arrayName = explode(".", basename($filename));
				$name = 'Serveur\\Composants\\Gestion' . ucwords($component)  . '\\'. ucwords($arrayName[0]);
				
				array_push($this->ComponentClasses, $name);
			}
		}
	}
	
	/**
	* This function generate the proxy file class
	*/
	public function generate()
	{
		$this->generateProxyMethods();
		
		$header = sprintf('%s%s', "<?php", "\n");
        $header .= sprintf('%s%s', "/**", "\n");
		$header .= sprintf('%s%s', "* Service access layer class", "\n");   
		$header .= sprintf('%s%s%s', "* Auto generated on the ",  date("Y-m-d H:i:s"), "\n");
		$header .= sprintf('%s%s', "*/", "\n");
		$header .= sprintf('%s%s', "namespace Serveur;", "\n\n");
        $header .= sprintf('%s%s', "/**", "\n");
		$header .= sprintf('%s%s', "* Service access layer class", "\n");   
		$header .= sprintf('%s%s%s', "* Auto generated on the ",  date("Y-m-d H:i:s"), "\n");
		$header .= sprintf('%s%s', "*/", "\n");
		$header .= sprintf('%s%s', "class Services", "\n");
		$header .= sprintf('%s%s', "{", "\n");
	
		$interfacesMembers = $this->generateInterfacesMembers();

		$constructor = $this->generateConstructor();
		
		$methods = $this->generateMethods();

		$footer = sprintf('%s%s', "}", "\n");
		$footer .= sprintf('%s%s', "?>", "\n");
		
		$proxyClass = sprintf("%s %s %s %s %s", $header, $interfacesMembers, $constructor, $methods, $footer);

		//Create the file
		$this->writeProxyClassFile(self::PROXY_FILE_NAME, $proxyClass);
		
		echo $proxyClass;
	}
	
	/**
	* This method generate all proxy methods
	*/
	private function generateProxyMethods()
	{
		$this->ProxyMethods = array();
	
		foreach($this->ComponentClasses as $class)
		{
			$interface = class_implements($class);
			$methods_implemented = get_class_methods(array_shift($interface));
			$reflector = new ReflectionClass($class);
			$interfaces = $reflector->getInterfaces();
			$interfaces = array_keys($interfaces);
			
			foreach($methods_implemented as $method)
			{
				$proxyMethod = new ProxyMethod();
				
				$proxyMethod->Component =  str_replace("Gestion", "",explode("\\", $class)[count(explode("\\", $class)) - 2]);
				$proxyMethod->MethodName = $method;
				$proxyMethod->MethodInterface = explode("\\", $interfaces[0])[count(explode("\\", $interfaces[0])) - 1];
				$proxyMethod->MethodComponent = explode("\\", $class)[count(explode("\\", $class)) - 1];
				$parameters = $reflector->getMethod($method)->getParameters();
				$proxyMethod->MethodComments = $reflector->getMethod($method)->getDocComment();
				$proxyMethod->MethodParameters = array();
				foreach($parameters as $param)
				{
					array_push($proxyMethod->MethodParameters, $param->name);
				}
				
				array_push($this->ProxyMethods, $proxyMethod);
			}
		}
	}
	
	/**
	* This function generate the first part of the proxy which contains all interfaces reference
	*
	* @return string The result is the text block associated to the interfaces properties
	*/
	public function generateInterfacesMembers()
	{
		$result = '';
		
		if(isset($this->ProxyMethods) == false)
		{
			throw new Exception("Set the proxy methods");
		}
		
		if(count($this->ProxyMethods) == 0)
		{
			throw new Exception("There is no proxy methods to generate");
		}
		
		$interfaces = array();
		
		foreach($this->ProxyMethods as $proxyMethod)
		{
			if (in_array($proxyMethod->MethodInterface, $interfaces) == false) {
				array_push($interfaces, $proxyMethod->MethodInterface);
			}
		}
		
		foreach($interfaces as $interface)
		{
            $result .= sprintf('%s%s%s', "\t", "/**", "\n");
            $result .= sprintf('%s%s %s%s', "\t", "* The interface module", $interface, "\n");
            $result .= sprintf('%s%s%s', "\t", "*/", "\n");
			$result .= sprintf('%sprivate $%s;%s', "\t", $interface, "\n\n");
		}
		
		return $result . "\n";
	}
	
	/**
	* This function generate the constructor
	*/
	public function generateConstructor()
	{
		if(isset($this->ProxyMethods) == false)
		{
			throw new Exception("Set the proxy methods");
		}
		
		if(count($this->ProxyMethods) == 0)
		{
			throw new Exception("There is no proxy methods to generate");
		}
        
        $result = sprintf('%s%s%s', "\t", "/**", "\n");
        $result .= sprintf('%s%s%s', "\t", "* The default constructor", "\n");
        $result .= sprintf('%s%s%s', "\t", "*/", "\n");
		$result .= sprintf('%s%s%s', "\t", "public function __construct()", "\n");
		$result .= sprintf('%s%s%s', "\t", "{", "\n");
		
		$filteredProxyByInterfaces = array();
		$filteredProxy = array();

		foreach($this->ProxyMethods as $proxyMethod)
		{
			if (in_array($proxyMethod->MethodInterface, $filteredProxyByInterfaces) == false) {
				array_push($filteredProxyByInterfaces, $proxyMethod->MethodInterface);
				array_push($filteredProxy, $proxyMethod);
			}
		}
			
		foreach($filteredProxy as $proxyMethod)
		{
			$result .= sprintf('%s%s$this->%s = new Composants\\Gestion%s\\%s(); %s', "\t", "\t", $proxyMethod->MethodInterface, $proxyMethod->Component, $proxyMethod->MethodComponent, "\n");
		}	
		
		$result .= sprintf('%s%s%s', "\t", "}", "\n");
		
		return $result . "\n";
	}
	
	/**
	* This function generate the all proxy methods
	*/
	public function generateMethods()
	{
		$result = '';

		foreach($this->ProxyMethods as $proxyMethod)
		{
			$result .= sprintf('%s%s%s', "\t", $proxyMethod->MethodComments, "\n");
			$result .= sprintf('%spublic function %s(', "\t", $proxyMethod->MethodName);
			foreach($proxyMethod->MethodParameters as $methodParameter)
			{
				$result .= sprintf('$%s, ', $methodParameter);
			}
			$result = rtrim($result, ", ");
			$result .= sprintf(')%s', "\n");
			$result .= sprintf('%s{%s', "\t", "\n");
			$result .= sprintf('%s%sreturn $this->%s->%s(', "\t", "\t",$proxyMethod->MethodInterface, $proxyMethod->MethodName);
			foreach($proxyMethod->MethodParameters as $methodParameter)
			{
				$result .= sprintf('$%s, ', $methodParameter);
			}
			$result = rtrim($result, ", ");
			$result .= sprintf(');%s', "\n");
			$result .= sprintf('%s}%s', "\t", "\n\n");
		}
		
		return $result;
	}
	
	/**
	* This function write in a file the proxy class
	*
	* @param string $filename The file name to write on
	* @param string $text The text to write on the file
	*/
	private function writeProxyClassFile($filename, $text)
	{
		file_put_contents($filename, $text);
	}
}

//get all components
require_once('core.config.php');

try
{
	$proxyGenerator = new ProxyGenerator($components);
	$proxyGenerator->generate();
}
catch(Exception $ex)
{
	var_dump($ex);
}
?> 