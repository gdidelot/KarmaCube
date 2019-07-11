<?php
/**
* Service access layer class
* Auto generated on the 2019-07-04 13:21:32
*/
namespace Core;

/**
* Service access layer class
* Auto generated on the 2019-07-04 13:21:32
*/
class CoreService
{
 	/**
	* The interface module IDocuments
	*/
	private $IDocuments;

	/**
	* The interface module IConfigurations
	*/
	private $IConfigurations;

	/**
	* The interface module IAddresses
	*/
	private $IAddresses;

	/**
	* The interface module IAssociations
	*/
	private $IAssociations;

	/**
	* The interface module IBooking
	*/
	private $IBooking;

	/**
	* The interface module ICompanies
	*/
	private $ICompanies;

	/**
	* The interface module IOrders
	*/
	private $IOrders;

	/**
	* The interface module ISuppliers
	*/
	private $ISuppliers;

	/**
	* The interface module IUsers
	*/
	private $IUsers;

	/**
	* The interface module IAlerts
	*/
	private $IAlerts;

	/**
	* The interface module ISteps
	*/
	private $ISteps;

	/**
	* The interface module ITaskHistories
	*/
	private $ITaskHistories;

	/**
	* The interface module ITasks
	*/
	private $ITasks;

	/**
	* The interface module IMessages
	*/
	private $IMessages;

	/**
	* The interface module IMaterials
	*/
	private $IMaterials;

	/**
	* The interface module IActivities
	*/
	private $IActivities;

	/**
	* The interface module IMails
	*/
	private $IMails;


 	/**
	* The default constructor
	*/
	public function __construct()
	{
		$this->IDocuments = new CoreComponents\DocumentsManager\Documents(); 
		$this->IConfigurations = new CoreComponents\ConfigurationsManager\Configurations(); 
		$this->IAddresses = new CoreComponents\UsersManager\Addresses(); 
		$this->IAssociations = new CoreComponents\UsersManager\Associations(); 
		$this->IBooking = new CoreComponents\UsersManager\Booking(); 
		$this->ICompanies = new CoreComponents\UsersManager\Companies(); 
		$this->IOrders = new CoreComponents\UsersManager\Orders(); 
		$this->ISuppliers = new CoreComponents\UsersManager\Suppliers(); 
		$this->IUsers = new CoreComponents\UsersManager\Users(); 
		$this->IAlerts = new CoreComponents\TasksManager\Alerts(); 
		$this->ISteps = new CoreComponents\TasksManager\Steps(); 
		$this->ITaskHistories = new CoreComponents\TasksManager\Taskhistories(); 
		$this->ITasks = new CoreComponents\TasksManager\Tasks(); 
		$this->IMessages = new CoreComponents\MessagesManager\Messages(); 
		$this->IMaterials = new CoreComponents\LogisticManager\Materials(); 
		$this->IActivities = new CoreComponents\ActivitiesManager\Activities(); 
		$this->IMails = new CoreComponents\MailsManager\Mails(); 
	}

 	/**
	 * Get all documents from root
	 * 
	 * @param string $root The new value 
	 * @param boolean $forceToRefresh Force to refresh the cache value on the server side
	 * @param string $filter Set a filter on the search pattern
	 *
	 * @return ServiceResponse The response contains all documents found on the provided path with the filter
	 */
	public function getRecursiveDocuments($path, $forceToRefresh, $filter)
	{
		return $this->IDocuments->getRecursiveDocuments($path, $forceToRefresh, $filter);
	}

	/**
	 * Get all documents from root
	 * 
	 * @param string $root The new value 
	 * @param boolean $forceToRefresh Force to refresh the cache value on the server side
	 * @param string $filter Set a filter on the search pattern
	 *
	 * @return ServiceResponse The response contains all documents found on the provided path with the filter
	 */
	public function getDocuments($path, $forceToRefresh, $filter)
	{
		return $this->IDocuments->getDocuments($path, $forceToRefresh, $filter);
	}

	/**
	 * Get the number of documents from root
	 * 
	 * @param string $root The new value 
	 *
	 * @return ServiceResponse The response contains all documents found on the provided path
	 */
	public function getDocumentsCount($root)
	{
		return $this->IDocuments->getDocumentsCount($root);
	}

	/**
	 * Upload document
	 * 
	 * @param string $tempPath The temp path use to upload the document
	 * @param string $dirPath The target directory to copy the file
	 * @param string $filename The file name to copy
	 *
	 * @return ServiceResponse The response contains the uploaded document
	 */
	public function uploadDocument($tempPath, $dirPath, $filename)
	{
		return $this->IDocuments->uploadDocument($tempPath, $dirPath, $filename);
	}

	/**
	 * Delete a document from his path
	 * 
	 * @param string $path The path use to delete the document
	 *
	 * @return ServiceResponse The response contains the deleted document
	 */
	public function deleteDocument($shortpath, $documentName)
	{
		return $this->IDocuments->deleteDocument($shortpath, $documentName);
	}

	/**
	 * Rename document
	 * 
	 * @param string $path The document path to rename
	 * @param string $newName The new document name
	 * @param string $oldName The old document name
	 *
	 * @return ServiceResponse The response contains the renamed document
	 */
	public function renameDocument($path, $newName, $oldName)
	{
		return $this->IDocuments->renameDocument($path, $newName, $oldName);
	}

	/**
	 * Create a temporary file to download
	 * 
	 * @param string $sourcePath The path to the targeted document 
	 * 
	 * @return ServiceResponse The response contains the new temporary document 
	 */
	public function createTempDocument($sourcePath)
	{
		return $this->IDocuments->createTempDocument($sourcePath);
	}

	/**
	 * Create a temporary file to download
	 * 
	 * @param string $sourcePath The path to the targeted document 
	 * 
	 * @return ServiceResponse The response contains the new temporary document 
	 */
	public function createTempDocumentFromBinary($fileName, $fileExtension, $binaryDataFile)
	{
		return $this->IDocuments->createTempDocumentFromBinary($fileName, $fileExtension, $binaryDataFile);
	}

	/**
	 * Create a folder
	 * 
	 * @param string $path The path to the targeted repository 
	 * @param string $name The name of the targeted folder to create
	 *
	 * @return ServiceResponse The response contains the created folder
	 */
	public function createFolder($path, $name)
	{
		return $this->IDocuments->createFolder($path, $name);
	}

	/**
	* Move a document
	* 
	* @param string $source The targeted path to move the document
	* @param string $destination The name of the targeted document to move
	*
	* @return ServiceResponse The response contains the moved folder
	*/
	public function moveDocument($source, $destination)
	{
		return $this->IDocuments->moveDocument($source, $destination);
	}

	
	public function initializeProjectDocuments($projectId)
	{
		return $this->IDocuments->initializeProjectDocuments($projectId);
	}

	
	public function attachDocument($shortpath, $tempname, $name, $content, $mime, $extension, $overwrite)
	{
		return $this->IDocuments->attachDocument($shortpath, $tempname, $name, $content, $mime, $extension, $overwrite);
	}

	/**
	* Get the current configuration
	*
	* @return This response contains the current configuration
	*/
	public function getConfiguration()
	{
		return $this->IConfigurations->getConfiguration();
	}

	/**
	* Create a backup
	*/
	public function createBackup()
	{
		return $this->IConfigurations->createBackup();
	}

	/**
	* Drop the database by doctrine process
	*/
	public function dropDatabase()
	{
		return $this->IConfigurations->dropDatabase();
	}

	/**
	* Create the schema by doctrine process
	*/
	public function createSchema()
	{
		return $this->IConfigurations->createSchema();
	}

	/**
	* Update the schema by doctrine process
	*/
	public function updateSchema()
	{
		return $this->IConfigurations->updateSchema();
	}

	/**
	* Set the default data
	*/
	public function setDefaultData()
	{
		return $this->IConfigurations->setDefaultData();
	}

	/**
	* Get total space on directory
	*
	* @param string $directory The targeted directory 
	*
	* @return This response contains the totla space about the directory
	*/
	public function getTotalSpace($directory)
	{
		return $this->IConfigurations->getTotalSpace($directory);
	}

	/**
	* Get free space on directory (octets)
	*
	* @param string $directory The targeted directory 
	*
	* @return This response contains the free space on the directory
	*/
	public function getFreeSpace($directory)
	{
		return $this->IConfigurations->getFreeSpace($directory);
	}

	/**
	* Execute the script
	*
	* @param string $name The script name
	*
	* @return This response contains true if script execution is success
	*/
	public function executeScript($name)
	{
		return $this->IConfigurations->executeScript($name);
	}

	
	public function getUserOnLive()
	{
		return $this->IConfigurations->getUserOnLive();
	}

	
	public function startLive($userId)
	{
		return $this->IConfigurations->startLive($userId);
	}

	
	public function stopLive($userId)
	{
		return $this->IConfigurations->stopLive($userId);
	}

	/**
	* Add an address
	*
	* @param string $number The address number
	* @param string $street The address street
	* @param string $zipcode The address zip code
	* @param string $city The address city
	*
	* @return Core\CoreCommons\ServiceResponse This response contains an address
	*/
	public function addAddress($number, $street, $zipcode, $city)
	{
		return $this->IAddresses->addAddress($number, $street, $zipcode, $city);
	}

	/**
	* Get user association
	*
	* @param integer $userId The user identifier
	*
	* @return Core\CoreCommons\ServiceResponse This response contains an association
	*/
	public function getUserAssociations($userId)
	{
		return $this->IAssociations->getUserAssociations($userId);
	}

	/**
	* Get user association
	*
	* @param integer $userId The user identifier
	*
	* @return Core\CoreCommons\ServiceResponse This response contains an association
	*/
	public function getAssociationUsers($associationId)
	{
		return $this->IAssociations->getAssociationUsers($associationId);
	}

	/**
	* Get association
	*
	* @return Core\CoreCommons\ServiceResponse This response contains associations
	*/
	public function getAssociations()
	{
		return $this->IAssociations->getAssociations();
	}

	/**
	* Add an association
	*
	* @param string $name The association name
	* @param string $phonenumber The association phonenumber
	* @param string $email The association email
	* @param string $address The association address
	* @param string $webaddress The association webaddress
	*
	* @return Core\CoreCommons\ServiceResponse This response contains an association
	*/
	public function addAssociation($name, $phonenumber, $email, $address, $webaddress)
	{
		return $this->IAssociations->addAssociation($name, $phonenumber, $email, $address, $webaddress);
	}

	/**
	* Add an user association
	*
	* @param string $user The user
    * @param string $association The association
	*
	* @return Core\CoreCommons\ServiceResponse This response contains an user association
	*/
	public function addUserAssociation($userId, $associationId)
	{
		return $this->IAssociations->addUserAssociation($userId, $associationId);
	}

	/**
	* Get user association
	*
	* @param integer $userId The user identifier
	*
	* @return Core\CoreCommons\ServiceResponse This response contains an association
	*/
	public function getBooking($associationId)
	{
		return $this->IBooking->getBooking($associationId);
	}

	/**
	* Add a booking
	*
	* @param integer $associationId The association identifier
	* @param string $place The place name
	*
	* @return Core\CoreCommons\ServiceResponse This response contains a booking
	*/
	public function addBooking($associationId, $place)
	{
		return $this->IBooking->addBooking($associationId, $place);
	}

	/**
	* Get booking dates
	*
	* @param integer $bookingId The booking identifier
	*
	* @return Core\CoreCommons\ServiceResponse This response contains a booking dates
	*/
	public function getBookingDates($bookingId)
	{
		return $this->IBooking->getBookingDates($bookingId);
	}

	/**
	* Add booking dates
	*
	* @param integer $bookingId The booking identifier
	*
	* @return Core\CoreCommons\ServiceResponse This response contains a booking date
	*/
	public function addBookingDate($bookingId, $date, $description)
	{
		return $this->IBooking->addBookingDate($bookingId, $date, $description);
	}

	/**
	* Get bookings
	*
	* @return Core\CoreCommons\ServiceResponse This response contains bookings
	*/
	public function getBookings()
	{
		return $this->IBooking->getBookings();
	}

	/**
	* Get bookings date states
	*
	* @return Core\CoreCommons\ServiceResponse This response contains bookings
	*/
	public function getBookingDateStates()
	{
		return $this->IBooking->getBookingDateStates();
	}

	/**
	* Refuse the booking date
	*
	* @param integer $bookingDateId The booking date identifier
	*
	* @return Core\CoreCommons\ServiceResponse This response contains a booking date
	*/
	public function refuseBookingDate($bookingDateId)
	{
		return $this->IBooking->refuseBookingDate($bookingDateId);
	}

	/**
	* Valid the booking date
	*
	* @param integer $bookingDateId The booking date identifier
	*
	* @return Core\CoreCommons\ServiceResponse This response contains a booking date
	*/
	public function validBookingDate($bookingDateId)
	{
		return $this->IBooking->validBookingDate($bookingDateId);
	}

	/**
	* Get all companies
	*
	* @return Core\CoreCommons\ServiceResponse This response contains all companies
	*/
	public function getCompanies()
	{
		return $this->ICompanies->getCompanies();
	}

	/**
	* Add a company
	*
	* @param string $name The company's name 
	* @param string $siret The company's siret number 
	* @param string $taxnumber The company's tax number
	* @param string $addressnumber The company's address number
	* @param string $addressstreet The company's address street
	* @param string $addresszipcode The company's address zip code
	* @param string $addresscity The company's address city
	*
	* @return Core\CoreCommons\ServiceResponse This response contains the new company
	*/
	public function addCompany($name, $siret, $taxnumber, $addressnumber, $addressstreet, $addresszipcode, $addresscity)
	{
		return $this->ICompanies->addCompany($name, $siret, $taxnumber, $addressnumber, $addressstreet, $addresszipcode, $addresscity);
	}

	/**
	* Update a company
	*
	* @param integer $id The company's identifier 
	* @param string $name The company's name 
	* @param string $siret The company's siret number 
	* @param string $taxnumber The tax number
	* @param string $addressnumber The address number
	* @param string $addressstreet The address street
	* @param string $addresszipcode The address zip code
	* @param string $addresscity The address city
	* @param integer $accountingmonth The accounting month
	* @param string $specificBillText The specific bill text
	*
	* @return Core\CoreCommons\ServiceResponse This response contains all companies
	*/
	public function updateCompany($id, $name, $siret, $taxnumber, $addressnumber, $addressstreet, $addresszipcode, $addresscity, $accountingmonth, $specificBillText)
	{
		return $this->ICompanies->updateCompany($id, $name, $siret, $taxnumber, $addressnumber, $addressstreet, $addresszipcode, $addresscity, $accountingmonth, $specificBillText);
	}

	/**
	* Get a company by name
	*
	* @param string $name The company's name 
	*
	* @return Core\CoreCommons\ServiceResponse This response contains the company
	*/
	public function getCompanyByName($name)
	{
		return $this->ICompanies->getCompanyByName($name);
	}

	/**
	* Get a company by siret
	*
	* @param string $siret The company's SIRET 
	*
	* @return Core\CoreCommons\ServiceResponse This response contains the company
	*/
	public function getCompanyBySiret($siret)
	{
		return $this->ICompanies->getCompanyBySiret($siret);
	}

	/**
	* Get a company by user
	*
	* @param string $siret The company's user id 
	*
	* @return Core\CoreCommons\ServiceResponse This response contains the company
	*/
	public function getCompanyByUser($userId)
	{
		return $this->ICompanies->getCompanyByUser($userId);
	}

	/**
	* Get a company by name
	*
	* @param integer $companyId The company's identifier 
	*
	* @return Core\CoreCommons\ServiceResponse This response contains the company
	*/
	public function deleteCompany($companyId)
	{
		return $this->ICompanies->deleteCompany($companyId);
	}

	/**
    * Attach a logo on a company
    *
	* @param integer $userId The user id
    * @param integer $companyId The company id
    * @param string $tempname The temporary file name
    * @param binary[] $file The avatar file
    * @param string $mime The avatar file mime type
    * @param string $extension The avatar file extension
    *
    * @return Core\CoreCommons\ServiceResponse This response contains the company with his logo
    */
	public function attachLogoOnAnCompany($userId, $companyId, $tempname, $file, $mime, $extension)
	{
		return $this->ICompanies->attachLogoOnAnCompany($userId, $companyId, $tempname, $file, $mime, $extension);
	}

	/**
    * Add a new user order
    *
    * @param integer $userId The user identifier
    *
    * @return This response contains the user order object
    */
	public function addOrder($userId)
	{
		return $this->IOrders->addOrder($userId);
	}

	/**
    * Valid a user order
    *
    * @param integer $orderId The user order identifier
    * @param integer $licenceType The licence type
    *
    * @return This response contains the user order object
    */
	public function validOrder($orderId, $licenceType)
	{
		return $this->IOrders->validOrder($orderId, $licenceType);
	}

	/**
    * Delete a user order
    *
    * @param integer $orderId The user order identifier
    *
    * @return This response contains the user order object
    */
	public function deleteOrder($orderId)
	{
		return $this->IOrders->deleteOrder($orderId);
	}

	/**
	* Add a new supplier
	*
	* @param string $name The supplier's name
	* @param string $siret The supplier's siret
	* @param string $address The supplier's address
	*
	* @return Core\CoreCommons\ServiceResponse This response contains the user
	*/
	public function addSupplier($name, $siret, $address)
	{
		return $this->ISuppliers->addSupplier($name, $siret, $address);
	}

	/**
	* Update a supplier
	*
	* @param integer $supplierId The supplier's identifier
	* @param string $name The supplier's name
	* @param string $siret The supplier's siret
	* @param string $address The supplier's address
	*
	* @return Core\CoreCommons\ServiceResponse This response contains the supplier
	*/
	public function updateSupplier($supplierId, $name, $siret, $address)
	{
		return $this->ISuppliers->updateSupplier($supplierId, $name, $siret, $address);
	}

	/**
	* Delete a supplier
	*
	* @param integer $supplierId The supplier's identifier
	*
	* @return Core\CoreCommons\ServiceResponse This response contains the supplier
	*/
	public function deleteSupplier($supplierId)
	{
		return $this->ISuppliers->deleteSupplier($supplierId);
	}

	/**
	* Get all suppliers
	*
	* @return Core\CoreCommons\ServiceResponse This response contains the supplier
	*/
	public function getSuppliers()
	{
		return $this->ISuppliers->getSuppliers();
	}

	/**
	* Authenticate an user
	* 
	* @param string $mail The user's mail 
	* @param string $password The user's password 
	*
	* @return Core\CoreCommons\ServiceResponse This response contains the user object
	*/
	public function authenticate($mail, $password)
	{
		return $this->IUsers->authenticate($mail, $password);
	}

	/**
	* Check the user authorization
	*
	* @param int $userid The user unique identifier
	*
	* @return Core\CoreCommons\ServiceResponse This response contains the user object or null
	*/
	public function checkUserAuthorization($userid)
	{
		return $this->IUsers->checkUserAuthorization($userid);
	}

	/**
	* Update users's informations
	*
	* @param int $id The unique identifier of a user
	* @param string $newPassword The user's new password 
	*
	* @return Core\CoreCommons\ServiceResponse This response contains the updated user
	*/
	public function updateUserPassword($id, $newPassword)
	{
		return $this->IUsers->updateUserPassword($id, $newPassword);
	}

	/**
	* Set user as online
	*
	* @param int $userid The user unique identifier
	*
	* @return Core\CoreCommons\ServiceResponse This response contains the user 
	*/
	public function setUserAsOnline($userid)
	{
		return $this->IUsers->setUserAsOnline($userid);
	}

	/**
    * Update an user
    *
    * @param integer $id The unique identifier of a user
    * @param string $firstname The user's firstname
    * @param string $lastname The user's lastname
    * @param string $email The user's email
    * @param string $phonenumber The user's phonenumber
    * @param string $webaddress The user's web address
    * @param integer $profile The user's profile
    * @param integer $type The user's type
    * @param integer $addressid The user's address identifier
    * @param string $addressnumber The user's address number
    * @param string $addressstreet The user's address street
    * @param string $addresszipcode The user's address zip code
    * @param string $addresscity The user's address city
    *
    * @return Core\CoreCommons\ServiceResponse This response contains the updated user
    */
	public function updateUser($id, $firstname, $lastname, $email, $phonenumber, $profile, $address, $islocal, $isadherent)
	{
		return $this->IUsers->updateUser($id, $firstname, $lastname, $email, $phonenumber, $profile, $address, $islocal, $isadherent);
	}

	/**
    * Attach a avatar on an user
    *
    * @param integer $userId The user id
    * @param string $tempname The temporary file name
    * @param binary[] $content The avatar file
    * @param string $mime The avatar file mime type
    * @param string $extension The avatar file extension
    *
    * @return Core\CoreCommons\ServiceResponse This response contains the user with his avatar
    */
	public function attachAvatarOnAnUser($userId, $tempname, $content, $mime, $extension)
	{
		return $this->IUsers->attachAvatarOnAnUser($userId, $tempname, $content, $mime, $extension);
	}

	/**
	* Set user as offline
	*
	* @param int $userid The user unique identifier
	*
	* @return Core\CoreCommons\ServiceResponse This response contains the user 
	*/
	public function setUserAsOffline($userid)
	{
		return $this->IUsers->setUserAsOffline($userid);
	}

	/**
	* Get all users
	*
	* @return Core\CoreCommons\ServiceResponse This response contains all users
	*/
	public function getUsers()
	{
		return $this->IUsers->getUsers();
	}

	/**
	* Get all administrators
	*
	* @return Core\CoreCommons\ServiceResponse This response contains all administrators
	*/
	public function getAdministrators()
	{
		return $this->IUsers->getAdministrators();
	}

	/**
    * Add an user
    *
    * @param string $firstname The user's firstname
    * @param string $lastname The user's lastname
    * @param string $email The user's email
    * @param string $phonenumber The user's phonenumber
    * @param integer $profile The user's profile
    *
    * @return Core\CoreCommons\ServiceResponse This response contains the added user
    */
	public function addUser($firstname, $lastname, $email, $phonenumber, $profile, $address)
	{
		return $this->IUsers->addUser($firstname, $lastname, $email, $phonenumber, $profile, $address);
	}

	/**
	* Send a contact mail
	*
	* @param string $name The user's name 
	* @param string $email The user's email 
	* @param string $object The user's object 
	* @param string $message The user's message 
	*
	* @return Core\CoreCommons\ServiceResponse This response contains the added user
	*/
	public function sendContact($name, $email, $object, $message)
	{
		return $this->IUsers->sendContact($name, $email, $object, $message);
	}

	/**
	* valid an user
	*
	* @param string $password The user's password 
	*
	* @return Core\CoreCommons\ServiceResponse This response contains the validate user
	*/
	public function validUserEmail($password)
	{
		return $this->IUsers->validUserEmail($password);
	}

	/**
	* Get all profiles
	*
	* @return Core\CoreCommons\ServiceResponse This response contains all profiles
	*/
	public function getProfiles()
	{
		return $this->IUsers->getProfiles();
	}

	/**
	* Delete an user
	*
	* @param int $id The user's identifier 
	*
	* @return Core\CoreCommons\ServiceResponse This response contains the deleted user
	*/
	public function deleteUser($id)
	{
		return $this->IUsers->deleteUser($id);
	}

	/**
	* Reset user password
	*
	* @param int $userid The user unique identifier
	*
	* @return Core\CoreCommons\ServiceResponse This response contains the user object or null
	*/
	public function resetUserPassword($userid)
	{
		return $this->IUsers->resetUserPassword($userid);
	}

	/**
	* Get an user by his email
	*
	* @param string $email The user's email address 
	*
	* @return Core\CoreCommons\ServiceResponse This response contains the user
	*/
	public function getUserByEmail($email)
	{
		return $this->IUsers->getUserByEmail($email);
	}

	/**
	* Get online users
	*
	* @return Core\CoreCommons\ServiceResponse This response contains all online users
	*/
	public function getOnlineUsers()
	{
		return $this->IUsers->getOnlineUsers();
	}

	/**
	* Get an user
	*
	* @param int $id The user's identifier 
	*
	* @return Core\CoreCommons\ServiceResponse This response contains the user
	*/
	public function getUser($id)
	{
		return $this->IUsers->getUser($id);
	}

	/**
	* Generate a new password for an user
	*
	* @param string $mail The user's mail 
	*
	* @return Core\CoreCommons\ServiceResponse This response contains the user
	*/
	public function generateNewPassword($email)
	{
		return $this->IUsers->generateNewPassword($email);
	}

	/**
    * Get user's accountant
    *
    * @param integer $userId The user identifier
    *
    * @return Core\CoreCommons\ServiceResponse This response contains the accountant
    */
	public function getAccountant($userId)
	{
		return $this->IUsers->getAccountant($userId);
	}

	/**
    * Delete user's accountant
    *
    * @param integer $userId The user identifier
    *
    * @return Core\CoreCommons\ServiceResponse This response contains the accountant
    */
	public function deleteAccountant($userId)
	{
		return $this->IUsers->deleteAccountant($userId);
	}

	/**
    * Get user's types
    *
    * @return Core\CoreCommons\ServiceResponse This response contains the user types
    */
	public function getUserTypes()
	{
		return $this->IUsers->getUserTypes();
	}

	/**
    * Get the last licence
    *
	* @param string $mail The user mail
	*
    * @return Core\CoreCommons\ServiceResponse This response contains the licence
    */
	public function getLastLicence($mail)
	{
		return $this->IUsers->getLastLicence($mail);
	}

	/**
    * Delete a user account
    *
    * @param integer $userId The user identifier
    *
    * @return Core\CoreCommons\ServiceResponse This response contains the user
    */
	public function deleteUserAccount($userId)
	{
		return $this->IUsers->deleteUserAccount($userId);
	}

	/**
    * Get user states
    *
    * @return Core\CoreCommons\ServiceResponse This response contains the user states
    */
	public function getUserStates()
	{
		return $this->IUsers->getUserStates();
	}

	/**
    * Get user states
    *
    * @return Core\CoreCommons\ServiceResponse This response contains the user states
    */
	public function logout($userId)
	{
		return $this->IUsers->logout($userId);
	}

	/**
    * Get user states
    *
    * @return Core\CoreCommons\ServiceResponse This response contains the user states
    */
	public function getUserNetworks($userId)
	{
		return $this->IUsers->getUserNetworks($userId);
	}

	/**
    * Get user states
    *
    * @return Core\CoreCommons\ServiceResponse This response contains the user states
    */
	public function updateUserPosition($userId, $latitude, $longitude)
	{
		return $this->IUsers->updateUserPosition($userId, $latitude, $longitude);
	}

	
	public function getUserRelations($userId)
	{
		return $this->IUsers->getUserRelations($userId);
	}

	/**
    * Get alerts by types
    *
    * @param integer $type The type
    * @param integer $typeId The type Id
    *
    * @return Core\CoreCommons\ServiceResponse This response contains all alerts
    */
	public function getAlerts($type, $typeId)
	{
		return $this->IAlerts->getAlerts($type, $typeId);
	}

	/**
    * Get all alerts
    *
    * @return Core\CoreCommons\ServiceResponse This response contains all alerts
    */
	public function getAllAlerts()
	{
		return $this->IAlerts->getAllAlerts();
	}

	/**
    * Add an alert
    *
    * @param string $name The alert name
    * @param string $description The alert description
    * @param string $frequency The alert frequency
    * @param string $type The alert type
    * @param string $typeId The alert type identifier
    * @param datetime $deadline The alert deadline
    *
    * @return Core\CoreCommons\ServiceResponse This response contains the added alert
    */
	public function addAlert($name, $description, $frequency, $type, $typeId, $deadline)
	{
		return $this->IAlerts->addAlert($name, $description, $frequency, $type, $typeId, $deadline);
	}

	/**
    * Delete a task
    *
    * @param integer $draining The unique task identifier
    *
    * @return Core\CoreCommons\ServiceResponse This response contains the deleted task
    */
	public function deleteAlert($id)
	{
		return $this->IAlerts->deleteAlert($id);
	}

	/**
    * Update a alert
    *
    * @param integer $id The alert id
    * @param string $name The alert name
    * @param string $description The alert description
    * @param integer $frequency The alert frequency
    * @param integer $state The alert state
    * @param integer $type The alert type
    * @param integer $typeId The alert type identifier
    * @param datetime $deadline The alert deadline
    *
    * @return Core\CoreCommons\ServiceResponse This response contains the updated alert
    */
	public function updateAlert($id, $name, $description, $frequency, $state, $type, $typeId, $deadline)
	{
		return $this->IAlerts->updateAlert($id, $name, $description, $frequency, $state, $type, $typeId, $deadline);
	}

	/**
	* Get frequencies's alerts
	* 
	* @return Core\CoreCommons\ServiceResponse This response contains all alerts
	*/
	public function getAlertFrequencies()
	{
		return $this->IAlerts->getAlertFrequencies();
	}

	/**
	* Get task's steps
	* 
	* @param integer $taskId The task id
	*
	* @return Core\CoreCommons\ServiceResponse This response contains all steps
	*/
	public function getSteps($taskId)
	{
		return $this->ISteps->getSteps($taskId);
	}

	/**
	 * Get all steps
	 * 
	 * @return Core\CoreCommons\ServiceResponse This response contains all steps
	 */
	public function getAllSteps()
	{
		return $this->ISteps->getAllSteps();
	}

	/**
	* Add a step
	*
	* @param integer $taskId The affected task
	* @param string $name The step name
	* @param datetime $date The step date
	* 
	* @return Core\CoreCommons\ServiceResponse This response contains the added task
	*/
	public function addStep($taskId, $name, $date)
	{
		return $this->ISteps->addStep($taskId, $name, $date);
	}

	/**
	* Delete a step
	* 
	* @param integer $draining The unique task identifier
	*
	* @return Core\CoreCommons\ServiceResponse This response contains the deleted step
	*/
	public function deleteStep($id)
	{
		return $this->ISteps->deleteStep($id);
	}

	/**
	* Update a step
	* 
	* @param integer $id The step id 
	* @param integer $name The new step name 
	* @param string $status The new step date 
	* @param integer $status The new step state 
	*
	* @return Core\CoreCommons\ServiceResponse This response contains the updated step
	*/
	public function updateStep($id, $name, $date, $state)
	{
		return $this->ISteps->updateStep($id, $name, $date, $state);
	}

	/**
	* Get steps's states
	* 
	* @return Core\CoreCommons\ServiceResponse This response contains steps's states
	*/
	public function getStepStates()
	{
		return $this->ISteps->getStepStates();
	}

	/**
	 * Get user's tasks
	 * 
	 * @param int $user The user id
	 *
	 * @return Core\CoreCommons\ServiceResponse This response contains all tasks
	 */
	public function getTaskHistories($taskId)
	{
		return $this->ITaskHistories->getTaskHistories($taskId);
	}

	/**
	* Delete a task
	* 
	* @param integer $draining The unique task identifier
	*
	* @return Core\CoreCommons\ServiceResponse This response contains the deleted task
	*/
	public function deleteTaskHistories($taskId)
	{
		return $this->ITaskHistories->deleteTaskHistories($taskId);
	}

	/**
	 * Get user's tasks
	 * 
	 * @param integer $userId The user id
	 *
	 * @return Core\CoreCommons\ServiceResponse This response contains all tasks
	 */
	public function getTasks($userId)
	{
		return $this->ITasks->getTasks($userId);
	}

	/**
	 * Get all tasks
	 *
	 * @return Core\CoreCommons\ServiceResponse This response contains all tasks
	 */
	public function getAllTasks()
	{
		return $this->ITasks->getAllTasks();
	}

	/**
	* Get user's tasks
	* 
	* @param integer $userId The user id
	*
	* @return Core\CoreCommons\ServiceResponse This response contains all tasks
	*/
	public function getTasksByEmail($email)
	{
		return $this->ITasks->getTasksByEmail($email);
	}

	/**
	* Add a task
	*
	* @param string $name The task name
	* @param string $description The task description
	* @param User $user The affected user id
	* @param integer $priority The priority task
    * @param datetime $deadline The deadline
	* 
	* @return Core\CoreCommons\ServiceResponse This response contains the added task
	*/
	public function addTask($name, $description, $userId, $priority, $deadline)
	{
		return $this->ITasks->addTask($name, $description, $userId, $priority, $deadline);
	}

	/**
	 * Delete a task
	 * 
	 * @param integer $draining The unique task identifier
	 *
	 * @return Core\CoreCommons\ServiceResponse This response contains the deleted task
	 */
	public function deleteTask($taskId)
	{
		return $this->ITasks->deleteTask($taskId);
	}

	/**
	* Update a task
	* 
	* @param integer $id The task id 
	* @param integer $status The new task status 
	* @param integer $completion The new task completion 
	* @param string $name The new task name 
	* @param string $description The new task description 
	* @param integer $affectedUser The new task affected user
	* @param integer $priority The priority task
    * @param datetime $deadline The deadline
	*
	* @return Core\CoreCommons\ServiceResponse This response contains the updated task
	*/
	public function updateTask($id, $status, $completion, $name, $description, $affectedUser, $priority, $deadline)
	{
		return $this->ITasks->updateTask($id, $status, $completion, $name, $description, $affectedUser, $priority, $deadline);
	}

	/**
	* Attach a document on a task
	*
	* @param int $taskId The task id
	* @param string $tempname The task temporary name
	* @param string $name The task name
	* @param byte[] $file The poster file
	* @param string $mime The poster file mime type
	* @param string $extension The poster file extension
	* 
	* @return Core\CoreCommons\ServiceResponse This response contains the task with his document
	*/
	public function attachDocumentOnATask($taskId, $tempname, $name, $file, $mime, $extension)
	{
		return $this->ITasks->attachDocumentOnATask($taskId, $tempname, $name, $file, $mime, $extension);
	}

	/**
	* Get all task's attachments
	*
	* @param integer $taskId The task id
	*
	* @return Core\CoreCommons\ServiceResponse This response contains all task's attachments
	*/
	public function getTaskAttachments($taskId)
	{
		return $this->ITasks->getTaskAttachments($taskId);
	}

	/**
	* Get all task's attachments
	*
	* @param int $taskAttachmentId The task attachment id
	*
	* @return Core\CoreCommons\ServiceResponse This response contains the task's attachments
	*/
	public function getTaskAttachment($taskAttachmentId)
	{
		return $this->ITasks->getTaskAttachment($taskAttachmentId);
	}

	/**
	* Delete a task attachment
	*
	* @param int $attachmentId The attachment id
	*
	* @return Core\CoreCommons\ServiceResponse This response contains the task's attachment
	*/
	public function deleteTaskAttachment($attachmentId)
	{
		return $this->ITasks->deleteTaskAttachment($attachmentId);
	}

	/**
	* Get all task's states
	*
	* @return Core\CoreCommons\ServiceResponse This response contains all task's states
	*/
	public function getTaskStates()
	{
		return $this->ITasks->getTaskStates();
	}

	/**
	* Get all task's priorities
	*
	* @return Core\CoreCommons\ServiceResponse This response contains all task's priorities
	*/
	public function getTaskPriorities()
	{
		return $this->ITasks->getTaskPriorities();
	}

	/**
	* Get user's message
	* 
	* @param integer $userId The account unique identifier for user
	*
	* @return Core\CoreCommons\ServiceResponse This response contains all tasks
	*/
	public function getMessages($userId)
	{
		return $this->IMessages->getMessages($userId);
	}

	/**
	* Add a message
	*
	* @param integer $to The targeted user
	* @param integer $by The sender user
	* @param string $subject The message title
	* @param string $text The message
	* 
	* @return Core\CoreCommons\ServiceResponse This response contains the added message
	*/
	public function addMessage($to, $by, $subject, $text)
	{
		return $this->IMessages->addMessage($to, $by, $subject, $text);
	}

	/**
	* Delete a message
	* 
	* @param integer $id The unique message identifier
	*
	* @return Core\CoreCommons\ServiceResponse This response contains the deleted message
	*/
	public function deleteMessage($id)
	{
		return $this->IMessages->deleteMessage($id);
	}

	/**
	* Update a message
	* 
	* @param integer $id The message id 
	* @param integer $status The new message status 
	*
	* @return Core\CoreCommons\ServiceResponse This response contains the updated message
	*/
	public function updateMessage($id, $status)
	{
		return $this->IMessages->updateMessage($id, $status);
	}

	/**
	* Get all materials
	*
	* @return This response contains all materials
	*/
	public function getMaterials()
	{
		return $this->IMaterials->getMaterials();
	}

	/**
	* Get all material states
	*
	* @return Core\CoreCommons\ServiceResponse This response contains all states material
	*/
	public function getStates()
	{
		return $this->IMaterials->getStates();
	}

	/**
	* Add a material
	*
	* @param int $state The material state
	* @param string $name The material name
	* @param string $description The material description
	* @param User $affectedUser The affected user which have the material
	* @param string $location The material location
	*
	* @return This response contains the added material
	*/
	public function addMaterial($state, $name, $description, $affectedUser, $location)
	{
		return $this->IMaterials->addMaterial($state, $name, $description, $affectedUser, $location);
	}

	/**
	* Update a material
	*
	* @param int $id The material unique identifier to update
	* @param int $state The material state
	* @param string $name The material name
	* @param string $description The material description
	* @param User $affectedUser The affected user which have the material
	* @param string $location The material location
	*
	* @return This response contains the added material
	*/
	public function updateMaterial($id, $state, $name, $description, $affectedUser, $location)
	{
		return $this->IMaterials->updateMaterial($id, $state, $name, $description, $affectedUser, $location);
	}

	/**
	* Delete a material
	* 
	* @param integer $id The unique material identifier
	*
	* @return Core\CoreCommons\ServiceResponse This response contains the deleted material
	*/
	public function deleteMaterial($id)
	{
		return $this->IMaterials->deleteMaterial($id);
	}

	/**
	* Get all user's activites
	*
	* @param integer $userId The user identifier
	*
	* @return This response contains all user's activities
	*/
	public function getActivities($userId)
	{
		return $this->IActivities->getActivities($userId);
	}

	/**
	* Get user's message
	* 
	* @param integer $userId The account unique identifier for user
	*
	* @return Core\CoreCommons\ServiceResponse This response contains all tasks
	*/
	public function getMails()
	{
		return $this->IMails->getMails();
	}

	/**
	* Get user's tasks
	* 
	* @param integer $userId The account unique identifier for user
	*
	* @return Core\CoreCommons\ServiceResponse This response contains all tasks
	*/
	public function getMailMessage($index)
	{
		return $this->IMails->getMailMessage($index);
	}

	/**
	* Get user's tasks
	* 
	* @param integer $userId The account unique identifier for user
	*
	* @return Core\CoreCommons\ServiceResponse This response contains all tasks
	*/
	public function deleteMail($index)
	{
		return $this->IMails->deleteMail($index);
	}

	/**
	* Get user's tasks
	* 
	* @param integer $userId The account unique identifier for user
	*
	* @return Core\CoreCommons\ServiceResponse This response contains all tasks
	*/
	public function sendMail($to, $subject, $message)
	{
		return $this->IMails->sendMail($to, $subject, $message);
	}

 }
?>
