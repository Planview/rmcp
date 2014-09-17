<?php 

require_once('./credentials.php');

/**
 * Makes a call to Marketo's SOAP API
 */
function soap_call( $type, $params ) {
	if (!class_exists('SoapClient')) return false;

	//Most of this code came from: http://developers.marketo.com/documentation/soap/requestcampaign/
	$errorText = '';
 
	$marketoSoapEndPoint	 = $GLOBALS['marketoSoapEndPoint'];
	$marketoUserId			 = $GLOBALS['marketoUserId'];
	$marketoSecretKey		 = $GLOBALS['marketoSecretKey'];

	$marketoNameSpace        = "http://www.marketo.com/mktows/";
     
	// Create Signature
	$dtzObj = new DateTimeZone('America/Chicago');
	$dtObj  = new DateTime('now', $dtzObj);
	$timeStamp = $dtObj->format(DATE_W3C);
	$encryptString = $timeStamp . $marketoUserId;
	$signature = hash_hmac('sha1', $encryptString, $marketoSecretKey);
     
	// Create SOAP Header
	$attrs = new stdClass();
	$attrs->mktowsUserId = $marketoUserId;
	$attrs->requestSignature = $signature;
	$attrs->requestTimestamp = $timeStamp;
	$authHdr = new SoapHeader($marketoNameSpace, 'AuthenticationHeader', $attrs);
	$options = array("connection_timeout" => 20, "location" => $marketoSoapEndPoint);
 
	$soapClient = new SoapClient($marketoSoapEndPoint ."?WSDL", $options);
	try {
		$response = $soapClient->__soapCall($type, $params, $options, $authHdr);
	}
	catch(Exception $ex) {
		return false;
	}

	return $response;
}

/**
 * Makes a call to SOAP API to get lead info from cookie
 */
function lead_from_cookie( $cookie_info ) {

	// Create Request
  	$leadKey = array("keyType" => "COOKIE", "keyValue" => $cookie_info );
	$leadKeyParams = array("leadKey" => $leadKey);
	$params = array("paramsGetLead" => $leadKeyParams);

	$lead = soap_call( 'getLead', $params );

	return $lead;
}

/**
 * Encodes a lead record as JSON
 */
function json_lead_from_cookie( $lead ) {
	if (!$lead) {
		return json_encode(array('HaveData' => false));
	}

	$leadData = $lead->result->leadRecordList->leadRecord;

	$leadMap = array();

	$keysToAdd = array(
		'Company',
		'FirstName',
		'LastName',
		'Title',
		'Country'
	);

	if (!filter_var($leadData->Email, FILTER_VALIDATE_EMAIL)) {
		return json_encode(array('HaveData' => false));
	}

	$leadMap['HaveData'] = false;
	$leadMap['Id'] = $leadData->Id;
	$leadMap['Email'] = $leadData->Email;

	foreach ( $leadData->leadAttributeList->attribute as $attribute ) {
		if (in_array($attribute->attrName, $keysToAdd)) {
			$leadMap[$attribute->attrName] = $attribute->attrValue;
		}
		if ($attribute->attrName == "Matched_Company_Name__c") {
			$leadMap['HaveData'] = true;
		}
	}

	return json_encode($leadMap);
}

/**
 * Returns an email hash for Munchkin
 */
function email_hash($email){
	return hash('sha1', $GLOBALS['marketoMunchkinKey'] . $email);
}

/**
 * Returns a JSON object containing the hash for Munchkin
 */
function json_hash($hash) {
	$map = array();
	$map['hashSig'] = $hash;
	return json_encode($map);
}

header('Content-Type: application/json');

if (isset($_GET['action']) && (isset($_GET['key']) || isset($_COOKIE['_mkto_trk']))) {
	if ($_GET['action'] == 'lead') {
		if (isset($_COOKIE['_mkto_trk'])) {
			$lead = lead_from_cookie($_COOKIE['_mkto_trk']);
		} elseif (isset($_GET['key'])) {
			$lead = lead_from_cookie($_GET['key']);
		} else {
			$lead = false;
		}
		echo json_lead_from_cookie($lead);
	} elseif ($_GET['action'] == 'hash') {
		$hash = email_hash($_GET['key']);
		echo json_hash($hash);
	}
}