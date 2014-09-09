define(['SmartForms', 'jquery'], function (sf$, $) {
	// Required values: Customer specific values
	sf$.token="351"; // planview.com

	sf$.showSmartFormAlerts=false;
	sf$.showCriticalAlerts=false;

	// Required mapping: Field ID mapping for required input company data
	sf$.companyNameFieldAlias="Company";

	// Optional mappings: Field ID mappings for additional input company data
	sf$.addr1FieldAlias="Address1"; //unisfair field
	sf$.cityFieldAlias="City"; //unisfair field
	sf$.stateFieldAlias="Region";
	sf$.zipFieldAlias="PostalCode"; //unisfair field
	sf$.countryFieldAlias="Country";
	sf$.phoneFieldAlias="WorkPhone";

	// Optional mappings: Field ID mappings for additional data that can be used in the remediation process
	sf$.firstNameFieldAlias="FirstName";
	sf$.lastNameFieldAlias="LastName";
	sf$.emailFieldAlias="EmailAddress";

	// Optional mappings: Field ID mappings for matched company data
	sf$.mCompanyNameFieldAlias="Matched_Company_Name__c";
	sf$.mAddr1FieldAlias="Matched_Address1__c";
	sf$.mAddr2FieldAlias="Matched_Address2__c";
	sf$.mCityFieldAlias="Matched_City__c";
	sf$.mStateFieldAlias="Matched_State__c";
	sf$.mZipFieldAlias="Matched_Zip__c";
	sf$.mCountryFieldAlias="Matched_Country__c";
	sf$.mPhoneFieldAlias="Matched_Phone__c";
	sf$.mTradeNameFieldAlias="Matched_Trade_Name__c"
	sf$.mStateCodeFieldAlias="Matched_State_Code__c";
	sf$.mCountryCodeFieldAlias="Matched_Country_Code__c";
	sf$.mEmplyeeCountFieldAlias="Matched_Employee_Count__c";
	sf$.mAnnualRevFieldAlias="Matched_Annual_Revenue__c";
	sf$.mSicFieldAlias="Matched_SIC__c";
	sf$.mSicNameFieldAlias="Matched_SIC_Name__c";
	sf$.mNaicsFieldAlias="Matched_NAICS__c";
	sf$.mNaicsNameFieldAlias="Matched_NAICS_Name__c";
	sf$.mAltNaicsFieldAlias = "Matched_Company_Duns_Industry__c";
	sf$.mUrlFieldAlias="Matched_URL__c";
	sf$.mLocationTypeFieldAlias="Matched_Location_Type__c";  // Headquarter, Single Location, or Branch location ('HQP', 'SL', or 'BR')

	// Optional mappings: Field ID mappings for matched company data headquarter location
	sf$.hqCompanyNameFieldAlias="HQ_Company__c";
	sf$.hqAddr1FieldAlias="HQ_Address1__c";
	sf$.hqAddr2FieldAlias="HQ_Address2__c";
	sf$.hqCityFieldAlias="HQ_City__c";
	sf$.hqStateFieldAlias="HQ_State__c";
	sf$.hqZipFieldAlias="HQ_Zip__c";
	sf$.hqCountryFieldAlias="HQ_Country__c";
	sf$.hqPhoneFieldAlias="HQ_Phone__c";
	sf$.hqTradeNameFieldAlias="HQ_Trade_Name__c"
	sf$.hqStateCodeFieldAlias="HQ_State_Code__c";
	sf$.hqCountryCodeFieldAlias="HQ_Country_Code__c";
	sf$.hqEmplyeeCountFieldAlias="HQ_Employee_Count__c";
	sf$.hqAnnualRevFieldAlias="HQ_Annual_Revenue__c";
	sf$.hqSicFieldAlias="HQ_SIC_Field__c";
	sf$.hqSicNameFieldAlias="HQ_SIC_Name__c";
	sf$.hqNaicsFieldAlias="HQ_NAICS__c";
	sf$.hqNaicsNameFieldAlias="HQ_NAICS_Name__c";
	sf$.hqUrlFieldAlias="HQ_URL__c";
	sf$.hqLocationTypeFieldAlias="HQ_Location_Type__c";

	// Optional mappings: Field ID mappings for matched company data domestic headquarter location
	sf$.dhqCompanyNameFieldAlias="DHQ_Company__c";
	sf$.dhqAddr1FieldAlias="DHQ_Address1__c";
	sf$.dhqAddr2FieldAlias="DHQ_Address2__c";
	sf$.dhqCityFieldAlias="DHQ_City__c";
	sf$.dhqStateFieldAlias="DHQ_State__c";
	sf$.dhqZipFieldAlias="DHQ_Zip__c";
	sf$.dhqCountryFieldAlias="DHQ_Country__c";
	sf$.dhqPhoneFieldAlias="DHQ_Phone__c";
	sf$.dhqTradeNameFieldAlias="DHQ_Trade_Name__c"
	sf$.dhqStateCodeFieldAlias="DHQ_State_Code__c";
	sf$.dhqCountryCodeFieldAlias="DHQ_Country_Code__c";
	sf$.dhqEmplyeeCountFieldAlias="DHQ_Employee_Count__c";
	sf$.dhqAnnualRevFieldAlias="DHQ_Annual_Revenue__c";
	sf$.dhqSicFieldAlias="DHQ_SIC__c";
	sf$.dhqSicNameFieldAlias="DHQ_SIC_Name__c";
	sf$.dhqNaicsFieldAlias="DHQ_NAICS__c";
	sf$.dhqNaicsNameFieldAlias="DHQ_NAICS_Name__c";
	sf$.dhqUrlFieldAlias="DHQ_URL__c";
	sf$.dhqLocationTypeFieldAlias="DHQ_Location_Type__c";

	// Optional mappings: Field ID mappings for matched company data global headquarter location
	sf$.ghqCompanyNameFieldAlias="GHQ_Company__c";
	sf$.ghqAddr1FieldAlias="GHQ_Address1__c";
	sf$.ghqAddr2FieldAlias="GHQ_Address2__c";
	sf$.ghqCityFieldAlias="GHQ_City__c";
	sf$.ghqStateFieldAlias="GHQ_State__c";
	sf$.ghqZipFieldAlias="GHQ_Zip__c";
	sf$.ghqCountryFieldAlias="GHQ_Country__c";
	sf$.ghqPhoneFieldAlias="GHQ_Phone__c";
	sf$.ghqTradeNameFieldAlias="GHQ_Trade_Name__c"
	sf$.ghqStateCodeFieldAlias="GHQ_State_Code__c";
	sf$.ghqCountryCodeFieldAlias="GHQ_Country_Code__c";
	sf$.ghqEmplyeeCountFieldAlias="GHQ_Employee_Count__c";
	sf$.ghqAnnualRevFieldAlias="GHQ_Annual_Revenue__c";
	sf$.ghqSicFieldAlias="GHQ_SIC__c";
	sf$.ghqSicNameFieldAlias="GHQ_SIC_Name__c";
	sf$.ghqNaicsFieldAlias="GHQ_NAICS__c";
	sf$.ghqNaicsNameFieldAlias="GHQ_NAICS_Name__c";
	sf$.ghqAltNaicsFieldAlias = "GHQ_Duns_Industry__c";
	sf$.ghqUrlFieldAlias="GHQ_URL__c";
	sf$.ghqLocationTypeFieldAlias="GHQ_Location_Type__c";

	// Optional mappings: Field ID mappings for custom ID fields that you want us to keep with a given record
	//sf$.uid1FieldAlias="Custom1";
	//sf$.uid2FieldAlias="Custom2";
	//sf$.uid3FieldAlias="Custom3";

	// Required mappings:
	sf$.smartFormID="WEBForm"; // ID of the form if available, needed if more than one form is on the page, or if using progressive profiling
	sf$.confidenceLevelFieldAlias="Confidence_Level__c"; // Field ID to hold the confidence level of a company remediation (pass, review, fail, not found) - no remediation (user)

	// Required values: Select list view customization values.
	sf$.selectListTitle="<caption><h3>Please verify your company:</h3><hr style='color:#CCCCCC;background-color:#CCCCCC;height:1px;border:none;' /></caption>"
	sf$.selectListColor1="#BBC7D3"; // RGB color for background of company select list
	sf$.selectListColor2="#ffffff"; // RGB color for background of alternate rows in select list
	sf$.selectListHoverColor="#8eb2d3"; // RGB color of the row with the mouse over it.
	sf$.searchResultCount=10; // 1-10. defaults to 5
	sf$.usePhoneFilter=true; // true = use phone number for localized search; false = do not use phone in search (default false)
	sf$.selectListHeightAdjust=60;

	// Required values: Remediate unmatched or edited company information
	sf$.remediateCompany=true; // true = perform a remediation on companies not selected from the company select list; false = no remediation  (default true)
	sf$.remediateCompanyLevel="all"; // What level of remediation should be delivered ("all" = pass, review, fail; "review" = pass, review; "pass" = pass)

	// new fields added 04/27/2012
	sf$.mCompXIDFieldAlias="Matched_Company_XID__c";
	sf$.mEmplyeeHereFieldAlias="Matched_Employee_Here__c";
	sf$.mSubsidiaryFieldAlias="Matched_Subsidiary__c";
	sf$.hqCompXIDFieldAlias="HQ_Company_XID__c";
	sf$.hqEmplyeeHereFieldAlias="HQ_Employee_Here__c";
	sf$.hqSubsidiaryFieldAlias="HQ_Subsidiary__c";
	sf$.dhqCompXIDFieldAlias="DHQ_Company_XID__c";
	sf$.dhqEmplyeeHereFieldAlias="DHQ_Employee_Here__c";
	sf$.dhqSubsidiaryFieldAlias="DHQ_Subsidiary__c";
	sf$.ghqCompXIDFieldAlias="GHQ_Company_XID__c";
	sf$.ghqEmplyeeHereFieldAlias="GHQ_Employee_Here__c";
	sf$.ghqSubsidiaryFieldAlias="GHQ_Subsidiary__c";

	// new fields added 06/20/2013
	sf$.inferredCityFieldAlias="my_geoIP_cityID__c";
	sf$.inferredStateFieldAlias="my_geoIP_stateID__c";
	sf$.inferredCountryFieldAlias="my_geoIP_countryID__c";

	// Translates NAICS code and returns custom Duns_Industry name to the SmartForms variable AltNaics on all levels of the hierarchy.
	sf$.translateAltNaics = function(val) {
	    try {
	        if (undefined != val && val != null && val.length > 0) {
	            var subval = val.substr(0,4);
	            var translation = sf$.naicsCodeMap[subval];
	            if (translation == null) {
	                subval = val.substr(0,3);
	                translation = sf$.naicsCodeMap[subval];
	                if (translation == null) {
	                    subval = val.substr(0,2);
	                    translation = sf$.naicsCodeMap[subval];
	                }
	            }
	            val = (translation == null) ? val : translation;
	        }
	    } catch(e) {}
	    return val;
	}
	sf$.naicsCodeMap = {
		"11" : "Agriculture",
		"211" : "Energy and Utilities",
		"212" : "Mining",
		"213" : "Energy and Utilities",
		"22" : "Energy and Utilities",
		"23" : "Construction",
		"311" : "Manuf - Consumer Fast Goods",
		"312" : "Manuf - Consumer Fast Goods",
		"313" : "Manuf - Consumer Soft Goods",
		"314" : "Manuf - Consumer Soft Goods",
		"315" : "Manuf - Consumer Soft Goods",
		"316" : "Manuf - Consumer Soft Goods",
		"321" : "Manuf - Mfg Parts",
		"322" : "Manuf - Mfg Materials",
		"323" : "Media and Publishing",
		"324" : "Manuf - Chemical and Related",
		"3254" : "Manuf - Pharma",
		"3256" : "Manuf - Consumer Fast Goods",
		"325" : "Manuf - Chemical and Related",
		"326291" : "Manuf - Commercial Durable Goods",
		"3262" : "Manuf - Consumer Durable Goods",
		"326" : "Manuf - Chemical and Related",
		"3271" : "Manuf - Mfg Materials",
		"3272" : "Manuf - Mfg Parts",
		"3273" : "Manuf - Mfg Materials",
		"3274" : "Manuf - Mfg Materials",
		"3279" : "Manuf - Mfg Materials",
		"3311" : "Manuf - Mfg Materials",
		"3312" : "Manuf - Mfg Materials",
		"3313" : "Manuf - Mfg Materials",
		"3314" : "Manuf - Mfg Materials",
		"3315" : "Manuf - Mfg Materials",
		"3321" : "Manuf - Mfg Materials",
		"3322" : "Manuf - Consumer Durable Goods",
		"3323" : "Manuf - Mfg Materials",
		"3324" : "Manuf - Heavy Machinery",
		"3325" : "Manuf - Mfg Materials",
		"3326" : "Manuf - Mfg Materials",
		"3327" : "Manuf - Mfg Services",
		"3328" : "Manuf - Mfg Services",
		"3329" : "Manuf - Mfg Materials",
		"333112" : "Manuf - Consumer Durable Goods",
		"3331" : "Manuf - Heavy Machinery",
		"3332" : "Manuf - Heavy Machinery",
		"3333" : "Manuf - Commercial Durable Goods",
		"3334" : "Manuf - Commercial Durable Goods",
		"3335" : "Manuf - Heavy Machinery",
		"333611" : "Manuf - Heavy Machinery",
		"3336" : "Manuf - Mfg Parts",
		"333991" : "Manuf - Consumer Durable Goods",
		"333993" : "Manuf - Heavy Machinery",
		"333994" : "Manuf - Heavy Machinery",
		"33392" : "Manuf - Heavy Machinery",
		"3339" : "Manuf - Commercial Durable Goods",
		"3341" : "Manuf - Technology",
		"3342" : "Manuf - Technology",
		"3343" : "Manuf - Technology",
		"3344" : "Manuf - Technology",
		"334510" : "Manuf - Medical Products",
		"334515" : "Manuf - Technology",
		"334516" : "Manuf - Medical Products",
		"334517" : "Manuf - Medical Products",
		"334519" : "Manuf - Commercial Durable Goods",
		"3345" : "Manuf - Commercial Durable Goods",
		"3346" : "Manuf - Consumer Soft Goods",
		"3351" : "Manuf - Consumer Durable Goods",
		"3352" : "Manuf - Consumer Durable Goods",
		"3353" : "Manuf - Commercial Durable Goods",
		"3359" : "Manuf - Technology",
		"336120" : "Manuf - Heavy Machinery",
		"3361" : "Manuf - Consumer Durable Goods",
		"336211" : "Manuf - Mfg Parts",
		"336212" : "Manuf - Commercial Durable Goods",
		"336213" : "Manuf - Consumer Durable Goods",
		"336214" : "Manuf - Consumer Durable Goods",
		"336370" : "Manuf - Mfg Materials",
		"3363" : "Manuf - Mfg Parts",
		"3364" : "Manuf - Heavy Machinery",
		"3365" : "Manuf - Heavy Machinery",
		"3366" : "Manuf - Heavy Machinery",
		"336991" : "Manuf - Mfg Parts",
		"336992" : "Manuf - Heavy Machinery",
		"336999" : "Manuf - Consumer Durable Goods",
		"337" : "Manuf - Consumer Durable Goods",
		"3391" : "Manuf - Medical Products",
		"339920" : "Manuf - Consumer Soft Goods",
		"33994" : "Manuf - Consumer Soft Goods",
		"33995" : "Manuf - Consumer Soft Goods",
		"33999" : "Manuf - Consumer Soft Goods",
		"3399" : "Manuf - Consumer Durable Goods",
		"42" : "Wholesale Trade",
		"44" : "Retail",
		"45" : "Retail",
		"486" : "Energy and Utilities",
		"487" : "Personal Services",
		"48" : "Transportation",
		"491110" : "Business and Professional Services",
		"492110" : "Business and Professional Services",
		"492210" : "Business and Professional Services",
		"493" : "Personal Services",
		"511210" : "Software Publishers",
		"517110" : "Telecommunications Services",
		"517210" : "Telecommunications Services",
		"517410" : "Telecommunications",
		"517911" : "Telecommunications",
		"517919" : "Telecommunications",
		"518210" : "Business and Professional Services - SRP",
		"51" : "Media and Publishing",
		"524114" : "Healthcare Payers",
		"524" : "Insurance",
		"52" : "Financial Services (Banking)",
		"533110" : "Personal Services",
		"5313" : "Business and Professional Services",
		"53" : "Real Estate",
		"541110" : "Law Firms",
		"541219" : "Business and Professional Services - SRP",
		"541330" : "Business and Professional Services - SRP",
		"541380" : "Business and Professional Services - SRP",
		"541511" : "IT and Development Services",
		"541512" : "IT and Development Services",
		"541513" : "IT and Development Services",
		"541519" : "IT and Development Services",
		"5416" : "Business and Professional Services - SRP",
		"541711" : "Life Science - CRO",
		"541712" : "Life Science - Other",
		"541720" : "Life Science - Other",
		"541810" : "Business and Professional Services - SRP",
		"541820" : "Business and Professional Services - SRP",
		"541890" : "Business and Professional Services - SRP",
		"541910" : "Business and Professional Services - SRP",
		"541990" : "Business and Professional Services - SRP",
		"54" : "Business and Professional Services",
		"55" : "Holding Company",
		"561621" : "Business and Professional Services - SRP",
		"5615" : "Personal Services",
		"56" : "Business and Professional Services",
		"611110" : "Other",
		"6116" : "Other",
		"611710" : "Business and Professional Services",
		"61" : "Higher Education",
		"6241" : "Personal Services",
		"6242" : "Non-Profit",
		"624310" : "Personal Services",
		"624410" : "Personal Services",
		"62" : "Healthcare Providers",
		"711410" : "Personal Services",
		"713210" : "Personal Services",
		"71" : "Other",
		"721" : "Personal Services",
		"722" : "Retail",
		"8112" : "Business and Professional Services",
		"8113" : "Business and Professional Services",
		"812331" : "Business and Professional Services",
		"812332" : "Business and Professional Services",
		"8131" : "Non-Profit",
		"8132" : "Non-Profit",
		"8133" : "Non-Profit",
		"8134" : "Non-Profit",
		"8139" : "Other",
		"8141" : "Other",
		"81" : "Personal Services",
		"92" : "Public Sector"
	}

	//noinspection JSUndeclaredVariable
	var sfcc$ = window.sfcc$ = {};
	sfcc$.doAppend = true;

	return {
		config: function (callback) {
			sf$.doSetup = true;
			sf$.doSmartFormSubmit = function () {
				$("#RFLoadingFrame").remove();
				$("#RFBlockFrame").remove();
				document.body.style.cursor = "auto";
				callback();
			};
			sf$.runSFSetup();
			return this;
		},
		submit: function () {
			if (typeof sf$ === "object" && (typeof sf$.forceSelection === "function" && sfcc$.doAppend)) {
	            sfcc$.doAppend = false;
	            sf$.forceSelection();
	        }
		}
	}
});