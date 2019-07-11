<?php
/**
* Localization class definition. This class allow to use different culture on the web site. It's use xml file in order to provide translations.
*
* @author Didelot Guillaume <gdidelot@live.fr>
* @version 1.0.0
* @package Core
* @subpackage CoreCommons
*/
namespace Core\CoreCommons;

/**
* Localization class definition. This class allow to use different culture on the web site. It's use xml file in order to provide translations.
*
* @method Localization Singleton()
*
* @exception Language_Directory_Not_Found
* @exception Translation_File_Unknwown
*/
class Localization 
{
	/**
	* The parameters keys
	* @var mixed
	*/
	public static $Keys;
	
	/**
	* An instance of localization
	* @var Core\CoreCommons\Localization
	*/
	private static $instance;
	
	/**
	* Singleton pattern
	*/
	public static function Singleton() 
	{
		if (!isset(self::$instance)) {
			$c = __CLASS__;
			self::$instance = new $c;
		}
		return self::$instance;
	}	
	
	/**
	* Default constructor
	*/
	private function __construct() 
	{
		self::UpdateTranslationsList();
	}
	
	/**
	* Get the translation by key
	*	
	* @param string $key Get the translation by key
	*
	* @return string The translation
	*/
	public static function Get($key)
	{
		Logger::Info("Localization.Get : get $key translations");
		
		if(isset(self::$Keys) == false || count(self::$Keys) == 0)
		{
			self::UpdateTranslationsList();
		}
		
		$response = (string)$key;
		
		if(!isset(self::$Keys->$key))
		{
			$response = "### ". (string)$key ." ###";
			Logger::Warning("Localization.Get : Missing translation : " . $key);
		}
		else
		{
			$response = (string)self::$Keys->$key;
		}
		
		return (string)$response;
	}
	
	/**
	* Get all translations
	*
	* @return array The array which contains all translations in Keys property
	*/
	public function GetTranslations()
	{
		Logger::Info("Localization.GetTranslations : get all translations ");
		
		return self::$Keys;
	}
	
	/**
	* This method fill the translations list
	*
	* @return boolean The response is true if is filled
	*/
	private static function UpdateTranslationsList()
	{
		Logger::Info("Localization.UpdateTranslationsList : Start to update translations");
	
		$parameters = Core\CoreCommons\Parameters::Singleton();
		$database = $parameters::Get("database");
	
		$languagesDirectory = sprintf("%s/../app/languages/", CORE_DIR);
	
		//check if folder exist
		if (!file_exists($languagesDirectory)) {
			throw new \Exception("Language_Directory_Not_Found");
		}

		$fileName = 'resources_fr-FR.json';
		
		$resourcesFile = sprintf("%s%s", $languagesDirectory, $fileName);
		
		//check if folder exist
		if (!file_exists($resourcesFile)) {
			throw new \Exception("Translation_File_Unknwown");
		}
		
		//self::$Keys = file_get_contents($resourcesFile);
		$str = file_get_contents($resourcesFile);
		$json = json_decode($str); 
		self::$Keys = $json;
		
		Logger::Info(count(self::$Keys) . " translations loaded");
	}
}

?> 