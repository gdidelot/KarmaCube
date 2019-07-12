<?php
/**
* This class provide the doctrine wrapper
*
* @author Didelot Guillaume <gdidelot@live.fr>
* @version 1.0
* @package Core\CoreComponents
* @subpackage TasksManager
*/
namespace Serveur\Datastorage;

require_once (__dir__ . '/../vendor/autoload.php');
 
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
 
 /**
 * The bootstrap class to use doctrine framework
 */
class Bootstrap
{
	/**
	* Unique instance of Bootstrap
	*
	* @var Bootstrap
	* @access private
	* @static
	*/
	private static $instance = null;
   
	/**
    * The entity manager
	* @var EntityManager
	*/
	protected $entityManager;

	/**
	* Default constructor
	*/
	private function __construct()  
	{  
		$parameters = \Serveur\Communs\Parameters::Singleton();
		//$isDebug = $parameters::Get("isDebug");
		$database = $parameters::Get("database");
		
		$paths = array( __dir__ . "/entites");
		//$isDevMode = (bool)$isDebug;
		
		// the connection configuration
		$dbParams = array(
			'driver'   => 'pdo_mysql',
			'user'     => $database->login,
			'password' => $database->password,
			'dbname'   => $database->databasename,
			'host'     => $database->host,
			'port'     => $database->port,
			'charset'  => 'utf8',
			'driverOptions' => array(
				1002 => 'SET NAMES utf8'
			)
		);
		
		$config = Setup::createAnnotationMetadataConfiguration($paths, true);
		
		/*
		if($isDevMode == false){
			$cache = new \Doctrine\Common\Cache\ArrayCache;
			$config->setMetadataCacheImpl($cache);
		}
		*/
		
		$this->entityManager = EntityManager::create($dbParams, $config);
	}
	
	/**
    * Unique method access to get Bootstrap instance
    *
    * @return Bootstrap
    */
    public static function getInstance() 
	{
		if(is_null(self::$instance)) {
			self::$instance = new Bootstrap();  
		}
	 
		return self::$instance;
   }
	
	/**
	* Provide the entity manager
	*/
	public function getEntityManager(){
		return $this->entityManager;
	}
}
?>