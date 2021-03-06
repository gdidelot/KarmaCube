<?php
/**
* Provide an api to a web client
*
* @author Didelot Guillaume <gdidelot@live.fr>
* @version 1.0
* @package 
* @subpackage 
*/
namespace Serveur;

@session_start();

require_once('core.config.php');

$service = new Services();

try {
    if (isset($_GET["validemail"])) 
	{
        $token = $_GET["validemail"];
        if (isset($token)) 
		{
            $result = $service->validUserEmail($token);
            header('Location: https://malesherbunis.fr/');
            exit;
        }
    } 
	else 
	{
        if (!empty($_FILES)) {
            try {
                Communs\Logger::Debug("Server : Files detected");
                
                $tmpName = $_FILES['file']['tmp_name'];
                $name = $_FILES['file']['name'];
                $mime = $_FILES['file']['type'];
                $path = $_FILES['file']['name'];
                $size = $_FILES['file']['size'];
                
                $fp      = fopen($tmpName, 'r');
                $blob = fread($fp, filesize($tmpName));
                fclose($fp);

                if ($size > 10000000) {
                    $result = Communs\ServiceResponse::CreateError(new \Exception("La taille du fichier dépasse 10 Mo : $size"));
                } else {
                    $serviceName = isset($_POST['service']) ? $_POST['service'] : null;
                    $_SESSION['currentuser'] = json_decode($_POST['user']);
                    
                    Communs\Logger::Debug("File size to process is $size");
                    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
                    $extension = pathinfo($path, PATHINFO_EXTENSION);
                    
                    Communs\Logger::Debug("File parameters are mime $mime, extension $extension");
                    
                    if (isset($_POST['service']) == false) {
                        throw new \Exception("Service is not set");
                    }
                    
                    $result = null;
                    
					if ($serviceName == "attachDocument") 
					{
                        $shortpath = $_POST['shortpath'];
                        $overwrite = $_POST['overwrite'];
                        $result = $service->attachDocument($shortpath, $tempPath, $name, $blob, $mime, $extension, $overwrite);
                    } 
                }
				Communs\ComListener::sendData($result);
			}
			catch(\Exception $ex)
			{
				Communs\Logger::Error($ex->getMessage());
			}
		}
		else
		{
			$data = Communs\ComListener::getData();

			$service = $data->context->service;
			$_SESSION['currentuser'] = (isset($data->context->user)) ? $data->context->user : null;

			if($service == "" || $service == null)
			{
				throw new \Exception("The service name have to be filled.");
			}
			
			//Get all method parameters and set all provided parameters
			$method = new \ReflectionMethod('Serveur\Services', $service);
			$params = $method->getParameters();
			
			Communs\Logger::Debug("Server call $service");
			
			$class = new \ReflectionClass('Serveur\Services'); 
			$objectInstance = $class->newInstanceArgs();
			
			if(method_exists($objectInstance , $service ) == false)
			{
				throw new \Exception(sprintf("The method name %s doesn't exist on the server proxy.", $service));
			}

			if(count($params) == 0)
			{
				$result = call_user_func_array(array($objectInstance, $service), array());
			}
			else
			{
				//Compute all parameters to send at the targeted method
				$values = array();
				foreach ($params as $param) 
				{
					$paramName = $param->getName();
					if(isset($data->$paramName))
					{
						$values[] = $data->$paramName;
					}
					else
					{
						$values[] = null;
					}
				}

				$result = call_user_func_array(array($objectInstance, $service), $values);
			}
			Communs\ComListener::sendData($result);
		}
	}
} catch (\Exception $ex) {
	Communs\Logger::Error($ex->getMessage());
	Communs\ComListener::sendData($ex);
}
?>