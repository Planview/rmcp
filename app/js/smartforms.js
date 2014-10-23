define(['SmartForms', 'jquery'], function (sf$, $) {
	// Required values: Customer specific values
	sf$.token="351"; // planview.com

	sf$.doSetup = false;
	sf$.showSmartFormAlerts=false;
	sf$.showCriticalAlerts=false;

	// Required mapping: Field ID mapping for user input company data
	sf$.companyNameFieldAlias="Company";
	sf$.cityFieldAlias="City";
	sf$.stateFieldAlias="State";
	sf$.countryFieldAlias="Country";
	sf$.phoneFieldAlias="MainPhone";
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
	sf$.mAltSicFieldAlias="Matched_Duns_Industry__c";
	sf$.mUrlFieldAlias="Matched_URL__c";
	sf$.mLocationTypeFieldAlias="Matched_Location_Type__c";  // Headquarter, Single Location, or Branch location ('HQP', 'SL', or 'BR')
	sf$.mEmplyeeHereFieldAlias="Matched_Employee_Here__c";
	sf$.mSubsidiaryFieldAlias="Matched_Subsidiary__c";
	sf$.mCompXIDFieldAlias="Matched_Company_XID__c";

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
	sf$.hqEmplyeeHereFieldAlias="HQ_Employee_Here__c";
	sf$.hqSubsidiaryFieldAlias="HQ_Subsidiary__c";
	sf$.hqCompXIDFieldAlias="HQ_Company_XID__c";

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
	sf$.dhqEmplyeeHereFieldAlias="DHQ_Employee_Here__c";
	sf$.dhqSubsidiaryFieldAlias="DHQ_Subsidiary__c";
	sf$.dhqCompXIDFieldAlias="DHQ_Company_XID__c";

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
	sf$.ghqAltSicFieldAlias="GHQ_Duns_Industry__c";
	sf$.ghqUrlFieldAlias="GHQ_URL__c";
	sf$.ghqLocationTypeFieldAlias="GHQ_Location_Type__c";
	sf$.ghqEmplyeeHereFieldAlias="GHQ_Employee_Here__c";
	sf$.ghqSubsidiaryFieldAlias="GHQ_Subsidiary__c";
	sf$.ghqCompXIDFieldAlias="GHQ_Company_XID__c";

	// inferred geo-location append mappings
	sf$.inferredCityFieldAlias="my_geoIP_cityID__c";
	sf$.inferredStateFieldAlias="my_geoIP_stateID__c";
	sf$.inferredCountryFieldAlias="my_geoIP_countryID__c";

	// Required mappings:
	sf$.smartFormID="WEBForm"; // ID of the form if available, needed if more than one form is on the page, or if using progressive profiling
	sf$.confidenceLevelFieldAlias="Confidence_Level__c"; // Field ID to hold the confidence level of a company remediation (pass, review, fail, not found) - no remediation (user)

	// Required values: Select list view customization values.
	sf$.selectListTitle="<caption><h3>Please verify your company:</h3><hr style='color:#CCCCCC;background-color:#CCCCCC;height:1px;border:none;' /></caption>"
	sf$.selectListColor1="#BBC7D3"; // RGB color for background of company select list
	sf$.selectListColor2="#ffffff"; // RGB color for background of alternate rows in select list
	sf$.selectListHoverColor="#8eb2d3"; // RGB color of the row with the mouse over it.
	sf$.searchResultCount=10; // 1-10. defaults to 5
	sf$.selectListHeightAdjust=60;

	// Required values: Remediate unmatched or edited company information
	sf$.remediateCompanyLevel="all"; // What level of remediation should be delivered ("all" = pass, review, fail; "review" = pass, review; "pass" = pass)

	// Translates SIC code and returns custom Duns_Industry name to the SmartForms variable AltSic on all levels of the hierarchy.
	sf$.translateAltSic = function (val) {
	    try {
	        if (undefined != val && val != null && val.length > 0) {
	            var subval = val.substr(0,4);
	            var translation = sf$.sicCodeMap[subval];
	            if (translation == null) {
	                subval = val.substr(0,3);
	                translation = sf$.sicCodeMap[subval];
	                if (translation == null) {
	                    subval = val.substr(0,2);
	                    translation = sf$.sicCodeMap[subval];
	                }
	            }
	            val = (translation == null) ? val : translation;
	        }
	    } catch(e) {}
	    return val;
	};

	sf$.sicCodeMap = {
		"01" : "Agriculture",
		"02" : "Agriculture",
		"07" : "Agriculture",
		"08" : "Agriculture",
		"09" : "Agriculture",
		"10" : "Other",
		"12" : "Other",
		"13" : "Energy & Utilities",
		"14" : "Other",
		"15" : "Other",
		"16" : "Other",
		"17" : "Other",
		"20" : "Consumer Products",
		"21" : "Consumer Products",
		"22" : "Consumer Products",
		"23" : "Consumer Products",
		"24" : "Manufacturing",
		"25" : "Consumer Products",
		"26" : "Manufacturing",
		"27" : "Media & Publishing",
		"283" : "Life Sciences - Pharma",
		"28" : "Manufacturing",
		"29" : "Manufacturing",
		"30" : "Manufacturing",
		"31" : "Consumer Products",
		"32" : "Manufacturing",
		"33" : "Manufacturing",
		"34" : "Consumer Products",
		"35" : "Technology",
		"361" : "Manufacturing",
		"362" : "Manufacturing",
		"363" : "Consumer Products",
		"364" : "Manufacturing",
		"365" : "Consumer Products",
		"366" : "Technology",
		"367" : "Technology",
		"369" : "Manufacturing",
		"37" : "Consumer Products",
		"3812" : "Technology",
		"384" : "Life Sciences - Medical Products",
		"385" : "Life Sciences - Medical Products",
		"386" : "Consumer Products",
		"38" : "Manufacturing",
		"39" : "Consumer Products",
		"40" : "Transportation",
		"41" : "Transportation",
		"42" : "Transportation",
		"43" : "Transportation",
		"44" : "Transportation",
		"45" : "Transportation",
		"46" : "Energy & Utilities",
		"47" : "Transportation",
		"48" : "Telecommunications",
		"49" : "Energy & Utilities",
		"50" : "Wholesale Trade",
		"51" : "Wholesale Trade",
		"52" : "Retail",
		"53" : "Retail",
		"54" : "Retail",
		"55" : "Retail",
		"56" : "Retail",
		"57" : "Retail",
		"58" : "Retail",
		"59" : "Retail",
		"60" : "Financial Services (Banking)",
		"61" : "Financial Services (Banking)",
		"62" : "Financial Services (Banking)",
		"631" : "Insurance",
		"632" : "Healthcare Payers",
		"63" : "Insurance",
		"64" : "Insurance",
		"65" : "Other",
		"673" : "Non-Profit",
		"67" : "Other",
		"7011" : "Retail",
		"72" : "Other",
		"7371" : "IT & Development Services",
		"7372" : "Technology",
		"7373" : "IT & Development Services",
		"7376" : "IT & Development Services",
		"7383" : "Media & Publishing",
		"731" : "Ad/PR/Mkt Research",
		"73" : "Business & Professional Services",
		"75" : "Other",
		"769" : "Business & Professional Services",
		"76" : "Other",
		"781" : "Media & Publishing",
		"782" : "Media & Publishing",
		"783" : "Retail",
		"784" : "Retail",
		"79" : "Other",
		"80" : "Healthcare Providers",
		"81" : "Other",
		"822" : "Higher Education",
		"824" : "Higher Education",
		"82" : "Other",
		"8399" : "Non-Profit",
		"83" : "Other",
		"84" : "Other",
		"86" : "Other",
		"8731" : "Life Sciences - CRO",
		"8732" : "Ad/PR/Mkt Research",
		"8733" : "Life Sciences - Other",
		"8734" : "Life Sciences - CRO",
		"8743" : "Ad/PR/Mkt Research",
		"87" : "Business & Professional Services",
		"88" : "Other",
		"89" : "Business & Professional Services",
		"91" : "Public Sector",
		"92" : "Public Sector",
		"93" : "Public Sector",
		"94" : "Public Sector",
		"95" : "Public Sector",
		"96" : "Public Sector",
		"97" : "Public Sector",
		"99" : "Other"
	};


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
