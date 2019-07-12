<?php
/**
* This class manage application logs.
*
* @author Didelot Guillaume <gdidelot@live.fr>
* @version 1.0
* @package Core\CoreCommons
* @subpackage CoreCommons
*/
namespace Serveur\Communs;

/**
* Logger class definition. This class manage application logs.
*
* @method Logger Singleton()
* @method void Debug($message)
* @method void Info($message)
* @method void Warning($message)
* @method void Error($message)
*
* @todo : use level from .json configuration file
*/
class Logger
{
    /**
    * @var Logger $instance The session instance
    */
    private static $instance;

    /**
    * The singleton instance
    *
    * @return A new Logger instance
    */
    public static function Singleton()
    {
        if (!isset(self::$instance)) {
            $class = __CLASS__;
            self::$instance = new $class;
        }
        return self::$instance;
    }
    
    /**
    * Default constructor
    */
    private function __construct()
    {
    }
    
    /**
    * Debug trace method
    *
    * @param string $message The message to write on the log file
    */
    public static function Debug($message)
    {
		$parameters = Parameters::Singleton();
		$level = strtolower($parameters::Get("logger"));
		if($level == "debug")
		{
			$trace = debug_backtrace();
			$caller = isset($trace[1]) ? $trace[1] : 'unknown';
			$function = (isset($caller['function'])) ? $caller['function'] : 'unknown';
			$class = (isset($caller['class'])) ? $caller['class'] : 'unknown';
			$logger = \Logger::getLogger($class);
			$address = (isset($_SERVER['REMOTE_ADDR'])) ? $_SERVER['REMOTE_ADDR'] : 'localhost';
			$logger->debug(sprintf("%s %s", $address, $message));
		}
    }
    
    /**
    * Info trace method
    *
    * @param string $message The message to write on the log file
    */
    public static function Info($message)
    {
		$parameters = Parameters::Singleton();
		$level = strtolower($parameters::Get("logger"));
		if($level == "debug" || $level == "info")
		{
			$trace = debug_backtrace();
			$caller = isset($trace[1]) ? $trace[1] : 'unknown';
			$function = (isset($caller['function'])) ? $caller['function'] : 'unknown';
			$class = (isset($caller['class'])) ? $caller['class'] : 'unknown';
			$logger = \Logger::getLogger($class);
			$address = (isset($_SERVER['REMOTE_ADDR'])) ? $_SERVER['REMOTE_ADDR'] : 'localhost';
			$logger->info(sprintf("%s %s", $address, $message));
		}
    }

    /**
    * Warning trace method
    *
    * @param string $message The message to write on the log file
    */
    public static function Warning($message)
    {
		$parameters = Parameters::Singleton();
		$level = strtolower($parameters::Get("logger"));
		if($level == "debug" || $level == "info" || $level == "warning")
		{
			$trace = debug_backtrace();
			$caller = isset($trace[1]) ? $trace[1] : 'unknown';
			$function = (isset($caller['function'])) ? $caller['function'] : 'unknown';
			$class = (isset($caller['class'])) ? $caller['class'] : 'unknown';
			$logger = \Logger::getLogger($class);
			$address = (isset($_SERVER['REMOTE_ADDR'])) ? $_SERVER['REMOTE_ADDR'] : 'localhost';
			$logger->warn(sprintf("%s %s", $address, $message));
		}
    }
    
    /**
    * Error trace method
    *
    * @param string $message The message to write on the log file
    */
    public static function Error($message)
    {
		$parameters = Parameters::Singleton();
		$level = strtolower($parameters::Get("logger"));
		if($level == "debug" || $level == "info" || $level == "warning" || $level == "error")
		{
			$trace = debug_backtrace();
			$caller = isset($trace[2]) ? $trace[2] : 'unknown';
			$function = (isset($caller['function'])) ? $caller['function'] : 'unknown';
			$class = isset($caller['class']) ? $caller['class'] : "unknown";
			$logger = \Logger::getLogger($class);
			$address = (isset($_SERVER['REMOTE_ADDR'])) ? $_SERVER['REMOTE_ADDR'] : 'localhost';
			$logger->error(sprintf("%s %s %s %s", $address, $class, $function, $message));
		}
    }
}
?>