var EXPORTED_SYMBOLS = ["cardbookRepository"];

var cardbookRepository = {
	cardbookDatabase : {},
	cardbookDatabaseVersion : "6",
	cardbookDatabaseName : "CardBook",
	
	LIGHTNING_ID : "{e2fda1a4-762b-4020-b5ad-a41df1933103}",
	
	allColumns : { "display": ["fn"],
					"personal": ["prefixname", "firstname", "othername", "lastname", "suffixname", "nickname", "bday", "gender"],
					"org": ["org", "title", "role"],
					"categories": ["categories"],
					"arrayColumns": [ ["email", ["email"] ],
						["adr", ["postOffice", "extendedAddr", "street", "locality", "region", "postalCode", "country"] ],
						["impp", ["impp"] ],
						["tel", ["tel"] ],
						["url", ["url"] ] ],
					"note": ["note"],
					"technical": ["version", "rev"] },

	dateFormats : ["YYYY-MM-DD", "YYYY.MM.DD", "YYYY/MM/DD", "YYYYMMDD", "DD-MM-YYYY", "DD.MM.YYYY", "DD/MM/YYYY", "DDMMYYYY", "MM-DD-YYYY", "MM.DD.YYYY", "MM/DD/YYYY", "MMDDYYYY"],

	defaultFnFormula : "({{1}} |)({{2}} |)({{3}} |)({{4}} |)({{5}} |)({{6}} |)",

	typesSeed : {"adr": ["HOME","WORK"], "email": ["HOME","WORK"], "impp": ["HOME","WORK"], "tel": ["CELL", "FAX", "HOME","WORK"], "url": ["HOME","WORK"]},

	preferEmailPref : true,
	
	cardbookAccounts : [],
	cardbookAccountsCategories : {},
	cardbookCards : {},
	cardbookDisplayCards : {},
	cardbookCardSearch : {},
	cardbookCardEmails : {},
	cardbookFileCacheCards : {},
	cardbookComplexSearch : {},

	cardbookMailPopularityIndex : {},

	cardbookDirRequest : {},
	cardbookDirResponse : {},
	cardbookFileRequest : {},
	cardbookFileResponse : {},
	cardbookDBRequest : {},
	cardbookDBResponse : {},
	cardbookComplexSearchRequest : {},
	cardbookComplexSearchResponse : {},
	cardbookComplexSearchReloadRequest : {},
	cardbookComplexSearchReloadResponse : {},
	filesFromCacheDB : {},
	
	cardbookServerValidation : {},

	cardbookGoogleAccessTokenRequest : {},
	cardbookGoogleAccessTokenResponse : {},
	cardbookGoogleAccessTokenError : {},
	cardbookGoogleRefreshTokenRequest : {},
	cardbookGoogleRefreshTokenResponse : {},
	cardbookGoogleRefreshTokenError : {},
	cardbookServerDiscoveryRequest : {},
	cardbookServerDiscoveryResponse : {},
	cardbookServerDiscoveryError : {},
	cardbookServerSyncRequest : {},
	cardbookServerSyncResponse : {},
	cardbookServerSyncEmptyCache : {},
	cardbookServerSyncLoadCacheDone : {},
	cardbookServerSyncLoadCacheTotal : {},
	cardbookServerSyncDone : {},
	cardbookServerSyncTotal : {},
	cardbookServerSyncError : {},
	cardbookServerSyncNotUpdated : {},
	cardbookServerSyncNewOnServer : {},
	cardbookServerSyncNewOnDisk : {},
	cardbookServerSyncUpdatedOnServer : {},
	cardbookServerSyncUpdatedOnDisk : {},
	cardbookServerSyncUpdatedOnBoth : {},
	cardbookServerSyncUpdatedOnDiskDeletedOnServer : {},
	cardbookServerSyncDeletedOnDisk : {},
	cardbookServerSyncDeletedOnDiskUpdatedOnServer : {},
	cardbookServerSyncDeletedOnServer : {},
	cardbookServerSyncAgain : {},
	cardbookServerSyncCompareWithCacheDone : {},
	cardbookServerSyncCompareWithCacheTotal : {},
	cardbookServerSyncHandleRemainingDone : {},
	cardbookServerSyncHandleRemainingTotal : {},
	cardbookServerGetRequest : {},
	cardbookServerGetResponse : {},
	cardbookServerGetError : {},
	cardbookServerGetForMergeRequest : {},
	cardbookServerGetForMergeResponse : {},
	cardbookServerGetForMergeError : {},
	cardbookServerMultiGetArray : {},
	cardbookServerMultiGetParams : {},
	cardbookServerMultiGetRequest : {},
	cardbookServerMultiGetResponse : {},
	cardbookServerMultiGetError : {},
	cardbookServerUpdatedRequest : {},
	cardbookServerUpdatedResponse : {},
	cardbookServerUpdatedError : {},
	cardbookServerCreatedRequest : {},
	cardbookServerCreatedResponse : {},
	cardbookServerCreatedError : {},
	cardbookServerDeletedRequest : {},
	cardbookServerDeletedResponse : {},
	cardbookServerDeletedError : {},
	cardbookImageGetRequest : {},
	cardbookImageGetResponse : {},
	cardbookImageGetError : {},
	cardbookSyncMode : "NOSYNC",

	cardbookSearchMode : "NOSEARCH",
	cardbookSearchValue : "",
	cardbookComplexSearchMode : "NOSEARCH",
	cardbookComplexSearchPrefId : "",

	lTimerLoadCacheAll : {},
	lTimerDirAll : {},
	lTimerSyncAll : {},
	lTimerImportAll : {},
	lComplexSearchAll : {},
	lTimerNoSyncModeAll : {},
	
	// used to ensure that the initial load is done only once
	firstLoad : false,

	// used to remember the choice of overriding or not cards
	// while importing, dragging, copying or duplicating
	importConflictChoice : "",
	importConflictChoicePersist : false,

	// used to store the msgIdentityKey by window
	composeMsgIdentity : {},
	
	// used to remember the choice of name format
	showNameAs : "",

	cardbookDynamicCssRules : {},

	cardbookUncategorizedCards : "",
	cardbookCollectedCards : "",
	cardbookCollectedCardsId : "Collected",
	
	cardbookMailPopularityFile : "mailPopularityIndex.txt",

	customFields : {},
									
	statusInformation : [],

	cardbookgdata : {
		CLIENT_ID:                  "779554755808-957jloa2c3c8n0rrm1a5304fkik7onf0.apps.googleusercontent.com",
		CLIENT_SECRET:              "h3NUkhofCKAW2E1X_NKSn4C_",
		REDIRECT_URI:               "urn:ietf:wg:oauth:2.0:oob",
		REDIRECT_TITLE:             "Success code=",
		RESPONSE_TYPE:              "code",
		SCOPE:                      "https://www.googleapis.com/auth/carddav",
		OAUTH_URL:                  "https://accounts.google.com/o/oauth2/auth",
		TOKEN_REQUEST_URL:          "https://accounts.google.com/o/oauth2/token",
		TOKEN_REQUEST_TYPE:         "POST",
		TOKEN_REQUEST_GRANT_TYPE:   "authorization_code",
		REFRESH_REQUEST_URL:        "https://accounts.google.com/o/oauth2/token",
		REFRESH_REQUEST_TYPE:       "POST",
		REFRESH_REQUEST_GRANT_TYPE: "refresh_token",
		AUTH_URL:                   "https://www.google.com/accounts/ClientLogin",
		AUTH_REQUEST_TYPE:          "POST",
		AUTH_SUB_SESSION_URL:       "https://www.google.com/accounts/AuthSubSessionToken",
		AUTH_SUB_SESSION_TYPE:      "GET",
		AUTH_SUB_REVOKE_URL:        "https://www.google.com/accounts/AuthSubRevokeToken",
		AUTH_SUB_REVOKE_TYPE:       "GET",
		GOOGLE_API:                 "https://www.googleapis.com",
	},

	APPLE_API : "https://contacts.icloud.com",
	
	cardbookBirthdayPopup : 0,
	
	jsInclude: function(files, target) {
		var loader = Components.classes["@mozilla.org/moz/jssubscript-loader;1"].getService(Components.interfaces.mozIJSSubScriptLoader);
		for (var i = 0; i < files.length; i++) {
			try {
				loader.loadSubScript(files[i], target);
			}
			catch(e) {
				dump("cardbookRepository.jsInclude : failed to include '" + files[i] + "'\n" + e + "\n");
			}
		}
	},
		
    loadCustoms: function () {
		// for file opened with version <= 19.6
		var typeList = [ 'Name', 'Org' ];
		var numberList = [ '1', '2' ];
		for (var i in typeList) {
			var myTargetNumber = 0;
			for (var j in numberList) {
				try {
					var mySourceField = "extensions.cardbook.customs.customField" + numberList[j] + typeList[i];
					var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
					var mySourceValue = prefs.getComplexValue(mySourceField, Components.interfaces.nsISupportsString).data;
					var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
					if (typeList[i] === "Name") {
						var myTargetType = "pers";
					} else {
						var myTargetType = "org";
					}
					if (mySourceValue != "") {
						var cardbookPrefService = new cardbookPreferenceService();
						cardbookPrefService.setCustomFields(myTargetType, myTargetNumber, mySourceValue);
						myTargetNumber++;
					}
					prefs.deleteBranch(mySourceField);
				}
				catch (e) {}
			}
		}
		var cardbookPrefService = new cardbookPreferenceService();
		cardbookRepository.customFields = {};
		cardbookRepository.customFields = cardbookPrefService.getAllCustomFields();
	},
		
    setCollected: function () {
		try {
			// for file opened with version <= 18.7
			var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
			var emailsCollection = prefs.getComplexValue("extensions.cardbook.emailsCollection", Components.interfaces.nsISupportsString).data;
			var emailsCollectionCat = "";
			try {
				emailsCollectionCat = prefs.getComplexValue("extensions.cardbook.emailsCollectionCat", Components.interfaces.nsISupportsString).data;
			}
			catch (e) {}
			if (emailsCollection != "") {
				var cardbookPrefService = new cardbookPreferenceService();
				emailsCollectionList = emailsCollection.split(',');
				for (var i = 0; i < emailsCollectionList.length; i++) {
					cardbookPrefService.setEmailsCollection(i.toString(), "true::include::allMailAccounts::" + emailsCollectionList[i] + "::" + emailsCollectionCat);
				}
				var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
				str.data = "";
				prefs.setComplexValue("extensions.cardbook.emailsCollection", Components.interfaces.nsISupportsString, str);
				prefs.setComplexValue("extensions.cardbook.emailsCollectionCat", Components.interfaces.nsISupportsString, str);
			}
		}
		catch (e) {
			return "";
		}
	},
		
    setTypes: function () {
		var cardbookPrefService = new cardbookPreferenceService();
		var myTypes = [];
		var myOldTypes = [];
		myTypes = cardbookPrefService.getAllTypesCategory();
		// for file opened with version <= 4.0
		for (var i = 0; i < myTypes.length; i++) {
			if (!(myTypes[i].indexOf(".") >= 0)) {
				myOldTypes.push(cardbookPrefService.getTypes(myTypes[i]));
				cardbookPrefService.delTypes(myTypes[i]);
				myTypes.splice(i,1);
				i--;
			}
		}
		for (var i = 0; i < myOldTypes.length; i++) {
				cardbookPrefService.setTypes("adr", i, myOldTypes[i]);
				cardbookPrefService.setTypes("email", i, myOldTypes[i]);
				cardbookPrefService.setTypes("tel", i, myOldTypes[i]);
				cardbookPrefService.setTypes("impp", i, myOldTypes[i]);
				cardbookPrefService.setTypes("url", i, myOldTypes[i]);
		}
		// for file opened with version <= 4.8
		var myPhoneTypes = [];
		myTypes = cardbookPrefService.getAllTypesCategory();
		for (var i = 0; i < myTypes.length; i++) {
			if (myTypes[i].indexOf("phone.") >= 0) {
				myPhoneTypes.push(cardbookPrefService.getTypes(myTypes[i]));
				cardbookPrefService.delTypes(myTypes[i]);
				myTypes.splice(i,1);
				i--;
			}
		}
		for (var i = 0; i < myPhoneTypes.length; i++) {
			cardbookPrefService.setTypes("tel", i, myPhoneTypes[i]);
		}
		// for file opened with version <= 4.8
		var notfound = true;
		myTypes = cardbookPrefService.getAllTypesCategory();
		for (var i = 0; i < myTypes.length; i++) {
			if (myTypes[i].indexOf("url.") >= 0) {
				notfound = false;
				break;
			}
		}
		if (notfound) {
			for (var i = 0; i < cardbookRepository.typesSeed.url.length; i++) {
				cardbookPrefService.setTypes("url", i, cardbookRepository.typesSeed.url[i]);
			}
		}
		// for file opened with version <= 4.8
		var notfound = true;
		myTypes = cardbookPrefService.getAllTypesCategory();
		for (var i = 0; i < myTypes.length; i++) {
			if (myTypes[i].indexOf("tel.") >= 0) {
				notfound = false;
				break;
			}
		}
		if (notfound) {
			for (var i = 0; i < cardbookRepository.typesSeed.tel.length; i++) {
				cardbookPrefService.setTypes("tel", i, cardbookRepository.typesSeed.tel[i]);
			}
		}
		// for file opened with version <= 4.8
		var notfound = true;
		myTypes = cardbookPrefService.getAllTypesCategory();
		for (var i = 0; i < myTypes.length; i++) {
			if (myTypes[i].indexOf("impp.") >= 0) {
				notfound = false;
				break;
			}
		}
		if (notfound) {
			for (var i = 0; i < cardbookRepository.typesSeed.impp.length; i++) {
				cardbookPrefService.setTypes("impp", i, cardbookRepository.typesSeed.impp[i]);
			}
		}
		// for file opened with version <= 4.8
		var notfound = true;
		myTypes = cardbookPrefService.getAllTypesCategory();
		for (var i = 0; i < myTypes.length; i++) {
			if (myTypes[i].indexOf("email.") >= 0) {
				notfound = false;
				break;
			}
		}
		if (notfound) {
			for (var i = 0; i < cardbookRepository.typesSeed.email.length; i++) {
				cardbookPrefService.setTypes("email", i, cardbookRepository.typesSeed.email[i]);
			}
		}
		// for file opened with version <= 11.6
		var notfound = true;
		myTypes = cardbookPrefService.getAllTypesCategory();
		for (var i = 0; i < myTypes.length; i++) {
			if (myTypes[i].indexOf("adr.") >= 0) {
				notfound = false;
				break;
			}
		}
		if (notfound) {
			for (var i = 0; i < cardbookRepository.typesSeed.adr.length; i++) {
				cardbookPrefService.setTypes("adr", i, cardbookRepository.typesSeed.adr[i]);
			}
		}
		// for file opened with version <= 15.3
		var myIMPPs = [];
		myIMPPs = cardbookPrefService.getAllIMPPs();
		if (myIMPPs.length == 0) {
			cardbookPrefService.insertIMPPsSeed();
		}
	},

	setSolveConflicts: function() {
		try {
			// for file opened with version <= 14.0
			var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
			var preferDisk = prefs.getBoolPref("extensions.cardbook.preferDisk");
			var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
			if (preferDisk) {
				str.data = "Local";
			} else {
				str.data = "Remote";
			}
			prefs.setComplexValue("extensions.cardbook.solveConflicts", Components.interfaces.nsISupportsString, str);
			prefs.deleteBranch("extensions.cardbook.preferDisk");
		}
		catch (e) {
			return "";
		}
	},

	getLocalDirectory: function() {
		let directoryService = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties);
		// this is a reference to the profile dir (ProfD) now.
		let localDir = directoryService.get("ProfD", Components.interfaces.nsIFile);
		
		localDir.append("cardbook");
		
		if (!localDir.exists() || !localDir.isDirectory()) {
			// read and write permissions to owner and group, read-only for others.
			localDir.create(Components.interfaces.nsIFile.DIRECTORY_TYPE, 0774);
		}
		return localDir;
	},

	arrayUnique: function (array) {
		var a = array.concat();
		for (var i=0; i<a.length; ++i) {
			for (var j=i+1; j<a.length; ++j) {
				if (a[i] === a[j])
					a.splice(j--, 1);
			}
		}
		return a;
	},
	
	getSearchString: function(aCard) {
		var lResult = "";
		lResult = lResult + aCard.lastname;
		lResult = lResult + aCard.firstname;
		lResult = lResult + aCard.othername;
		lResult = lResult + aCard.prefixname;
		lResult = lResult + aCard.suffixname;
		lResult = lResult + aCard.fn;
		lResult = lResult + aCard.nickname;
		lResult = lResult + aCard.bday;
		lResult = lResult + aCard.categories.join();
		for (let i = 0; i < aCard.adr.length; i++) {
			lResult = lResult + aCard.adr[i][0].join();
		}
		for (let i = 0; i < aCard.tel.length; i++) {
			lResult = lResult + aCard.tel[i][0].join();
		}
		for (let i = 0; i < aCard.email.length; i++) {
			lResult = lResult + aCard.email[i][0].join();
		}
		lResult = lResult + aCard.title;
		lResult = lResult + aCard.role;
		lResult = lResult + aCard.org;
		lResult = lResult + aCard.note;
		for (let i = 0; i < aCard.url.length; i++) {
			lResult = lResult + aCard.url[i][0].join();
		}
		for (let i = 0; i < aCard.impp.length; i++) {
			lResult = lResult + aCard.impp[i][0].join();
		}
		lResult = lResult.replace(/[\s+\-+\.+\,+\;+]/g, "").toUpperCase();
		return lResult;
	},

	setEmptyContainer: function(aAccountId) {
		if (cardbookRepository.cardbookAccountsCategories[aAccountId]) {
			if (cardbookRepository.cardbookAccountsCategories[aAccountId].length > 0) {
				for (var i = 0; i < cardbookRepository.cardbookAccounts.length; i++) {
					if (cardbookRepository.cardbookAccounts[i][4] == aAccountId) {
						cardbookRepository.cardbookAccounts[i][3] = false;
						return;
					}
				}
			} else {
				for (var i = 0; i < cardbookRepository.cardbookAccounts.length; i++) {
					if (cardbookRepository.cardbookAccounts[i][4] == aAccountId) {
						cardbookRepository.cardbookAccounts[i][3] = true;
						cardbookRepository.cardbookAccounts[i][2] = false;
						return;
					}
				}
			}
		}
	},
	
	addAccountToRepository: function(aAccountId, aAccountName, aAccountType, aAccountUrl, aAccountUser, aColor, aEnabled, aExpanded, aVCard, aReadOnly, aDateFormat, aUrnuuid, aDBcached, aPrefInsertion) {
		var cacheDir = cardbookRepository.getLocalDirectory();
		cacheDir.append(aAccountId);
		if (!cacheDir.exists() || !cacheDir.isDirectory()) {
			cacheDir.create(Components.interfaces.nsIFile.DIRECTORY_TYPE, 0774);
			cacheDir.append("mediacache");
			cacheDir.create(Components.interfaces.nsIFile.DIRECTORY_TYPE, 0774);
		}
		if (aPrefInsertion) {
			let cardbookPrefService = new cardbookPreferenceService(aAccountId);
			cardbookPrefService.setId(aAccountId);
			cardbookPrefService.setName(aAccountName);
			cardbookPrefService.setType(aAccountType);
			cardbookPrefService.setUrl(aAccountUrl);
			cardbookPrefService.setUser(aAccountUser);
			cardbookPrefService.setColor(aColor);
			cardbookPrefService.setEnabled(aEnabled);
			cardbookPrefService.setExpanded(aExpanded);
			cardbookPrefService.setVCard(aVCard);
			cardbookPrefService.setReadOnly(aReadOnly);
			cardbookPrefService.setDateFormat(aDateFormat);
			cardbookPrefService.setUrnuuid(aUrnuuid);
			cardbookPrefService.setDBCached(aDBcached);
		}
		
		cardbookRepository.cardbookAccounts.push([aAccountName, true, aExpanded, true, aAccountId, aEnabled, aAccountType, aReadOnly]);
		cardbookRepository.cardbookDisplayCards[aAccountId] = [];
		cardbookRepository.cardbookAccountsCategories[aAccountId] = [];
	},

	removeAccountFromRepository: function(aAccountId) {
		cardbookRepository.removeAccountFromCollected(aAccountId);
		cardbookRepository.removeAccountFromBirthday(aAccountId);

		var cacheDir = cardbookRepository.getLocalDirectory();
		cacheDir.append(aAccountId);
		if (cacheDir.exists() && cacheDir.isDirectory()) {
			cacheDir.remove(true);
		}

		if (cardbookRepository.cardbookAccountsCategories[aAccountId]) {
			for (var i = 0; i < cardbookRepository.cardbookAccountsCategories[aAccountId].length; i++) {
				var myAccountId = aAccountId+"::"+cardbookRepository.cardbookAccountsCategories[aAccountId][i];
				function searchCard1(element) {
					return (element[4] != myAccountId);
				}
				cardbookRepository.cardbookAccounts = cardbookRepository.cardbookAccounts.filter(searchCard1);
				delete cardbookRepository.cardbookDisplayCards[myAccountId];
			}
			delete cardbookRepository.cardbookAccountsCategories[aAccountId];
			delete cardbookRepository.cardbookDisplayCards[aAccountId];
		}

		function searchCard2(element) {
			return (element[4] != aAccountId);
		}
		cardbookRepository.cardbookAccounts = cardbookRepository.cardbookAccounts.filter(searchCard2, aAccountId);

		for (var key in cardbookRepository.cardbookCards) {
			if (cardbookRepository.cardbookCards.hasOwnProperty(key)) {
				if (key.indexOf(aAccountId) >= 0) {
					cardbookRepository.removeCardFromSearch(cardbookRepository.cardbookCards[key]);
					if (cardbookRepository.cardbookFileCacheCards[aAccountId] && cardbookRepository.cardbookFileCacheCards[aAccountId][cardbookRepository.cardbookCards[key].cacheuri]) {
						delete cardbookRepository.cardbookFileCacheCards[aAccountId][cardbookRepository.cardbookCards[key].cacheuri];
					}
					delete cardbookRepository.cardbookCards[key];
				}
			}
		}
	},
		
	removeComplexSearchFromRepository: function(aAccountId) {
		var cacheDir = cardbookRepository.getLocalDirectory();
		cacheDir.append(aAccountId);
		if (cacheDir.exists() && cacheDir.isDirectory()) {
			cacheDir.remove(true);
		}

		if (cardbookRepository.cardbookAccountsCategories[aAccountId]) {
			for (var i = 0; i < cardbookRepository.cardbookAccountsCategories[aAccountId].length; i++) {
				var myAccountId = aAccountId+"::"+cardbookRepository.cardbookAccountsCategories[aAccountId][i];
				function searchCard1(element) {
					return (element[4] != myAccountId);
				}
				cardbookRepository.cardbookAccounts = cardbookRepository.cardbookAccounts.filter(searchCard1);
				delete cardbookRepository.cardbookDisplayCards[myAccountId];
			}
			delete cardbookRepository.cardbookAccountsCategories[aAccountId];
			delete cardbookRepository.cardbookDisplayCards[aAccountId];
		}

		function searchCard2(element) {
			return (element[4] != aAccountId);
		}
		cardbookRepository.cardbookAccounts = cardbookRepository.cardbookAccounts.filter(searchCard2, aAccountId);

		delete cardbookRepository.cardbookComplexSearch[aAccountId];
	},
		
	emptyAccountFromRepository: function(aAccountId) {
		if (cardbookRepository.cardbookAccountsCategories[aAccountId]) {
			for (var i = 0; i < cardbookRepository.cardbookAccountsCategories[aAccountId].length; i++) {
				var myAccountId = aAccountId+"::"+cardbookRepository.cardbookAccountsCategories[aAccountId][i];
				function searchCard1(element) {
					return (element[4] != myAccountId);
				}
				cardbookRepository.cardbookAccounts = cardbookRepository.cardbookAccounts.filter(searchCard1);
				cardbookRepository.cardbookDisplayCards[myAccountId] = [];
			}
			cardbookRepository.cardbookAccountsCategories[aAccountId] = [];
			cardbookRepository.cardbookDisplayCards[aAccountId] = [];
		}
		cardbookRepository.setEmptyContainer(aAccountId);

		for (var key in cardbookRepository.cardbookCards) {
			if (cardbookRepository.cardbookCards.hasOwnProperty(key)) {
				if (key.indexOf(aAccountId) >= 0) {
					cardbookRepository.removeCardFromSearch(cardbookRepository.cardbookCards[key]);
					if (cardbookRepository.cardbookFileCacheCards[aAccountId] && cardbookRepository.cardbookFileCacheCards[aAccountId][cardbookRepository.cardbookCards[key].cacheuri]) {
						delete cardbookRepository.cardbookFileCacheCards[aAccountId][cardbookRepository.cardbookCards[key].cacheuri];
					}
					delete cardbookRepository.cardbookCards[key];
				}
			}
		}
	},

	emptyComplexSearchFromRepository: function(aAccountId) {
		if (cardbookRepository.cardbookAccountsCategories[aAccountId]) {
			for (var i = 0; i < cardbookRepository.cardbookAccountsCategories[aAccountId].length; i++) {
				var myAccountId = aAccountId+"::"+cardbookRepository.cardbookAccountsCategories[aAccountId][i];
				function searchCard1(element) {
					return (element[4] != myAccountId);
				}
				cardbookRepository.cardbookAccounts = cardbookRepository.cardbookAccounts.filter(searchCard1);
				cardbookRepository.cardbookDisplayCards[myAccountId] = [];
			}
			cardbookRepository.cardbookAccountsCategories[aAccountId] = [];
			cardbookRepository.cardbookDisplayCards[aAccountId] = [];
		}
		cardbookRepository.setEmptyContainer(aAccountId);
	},

	removeAccountFromComplexSearch: function (aDirPrefId) {
		if (cardbookRepository.cardbookDisplayCards[aDirPrefId]) {
			for (var i in cardbookRepository.cardbookComplexSearch) {
				for (var j = 0; j < cardbookRepository.cardbookDisplayCards[aDirPrefId].length; j++) {
					var myCard = cardbookRepository.cardbookDisplayCards[aDirPrefId][j];
					cardbookRepository.removeCardFromCategories(myCard, i);
					cardbookRepository.removeCardFromDisplay(myCard, i);
				}
			}
		}
	},

	removeAccountFromCollected: function (aDirPrefId) {
		var cardbookPrefService = new cardbookPreferenceService();
		var result = [];
		var allEmailsCollections = [];
		allEmailsCollections = cardbookPrefService.getAllEmailsCollections();
		for (var i = 0; i < allEmailsCollections.length; i++) {
			var resultArray = allEmailsCollections[i].split("::");
			if (aDirPrefId !== resultArray[3]) {
				result.push([resultArray[0], resultArray[1], resultArray[2], resultArray[3], resultArray[4]]);
			}
		}
		for (var i = 0; i < result.length; i++) {
			cardbookPrefService.setEmailsCollection(i.toString(), result[i][0] + "::" + result[i][1] + "::" + result[i][2] + "::" + result[i][3] + "::" + result[i][4]);
		}
	},

	// only used from the import of Thunderbird standard address books 
	addAccountToCollected: function (aDirPrefId) {
		var cardbookPrefService = new cardbookPreferenceService();
		var result = [];
		var allEmailsCollections = [];
		allEmailsCollections = cardbookPrefService.getAllEmailsCollections();
		for (var i = 0; i < allEmailsCollections.length; i++) {
			var resultArray = allEmailsCollections[i].split("::");
			result.push([resultArray[0], resultArray[1], resultArray[2], resultArray[3], resultArray[4]]);
		}
		result.push(["true", "include", "allMailAccounts", aDirPrefId, ""]);

		for (var i = 0; i < result.length; i++) {
			cardbookPrefService.setEmailsCollection(i.toString(), result[i][0] + "::" + result[i][1] + "::" + result[i][2] + "::" + result[i][3] + "::" + result[i][4]);
		}
	},

	removeAccountFromBirthday: function (aDirPrefId) {
		var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
		var addressBooks = prefs.getComplexValue("extensions.cardbook.addressBooksNameList", Components.interfaces.nsISupportsString).data;
		var addressBooksList = [];
		addressBooksList = addressBooks.split(',');
		function filterAccount(element) {
			return (element != aDirPrefId);
		}
		addressBooksList = addressBooksList.filter(filterAccount);
		var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
		str.data = addressBooksList.join(',');
		prefs.setComplexValue("extensions.cardbook.addressBooksNameList", Components.interfaces.nsISupportsString, str);
	},

	removeCardFromRepository: function (aCard, aCacheDeletion) {
		try {
			cardbookRepository.removeCardFromSearch(aCard);
			cardbookRepository.removeCardFromEmails(aCard);
			cardbookRepository.removeCardFromCategories(aCard, aCard.dirPrefId);
			cardbookRepository.removeCardFromDisplay(aCard, aCard.dirPrefId);
			for (var i in cardbookRepository.cardbookComplexSearch) {
				cardbookRepository.removeCardFromCategories(aCard, i);
				cardbookRepository.removeCardFromDisplay(aCard, i);
			}
			if (aCacheDeletion) {
				cardbookRepository.removeCardFromCache(aCard);
			}
			cardbookRepository.removeCardFromList(aCard);
			delete aCard;
		}
		catch (e) {
			wdw_cardbooklog.updateStatusProgressInformation("cardbookRepository.removeCardFromRepository error : " + e, "Error");
		}
	},

	addCardToRepository: function (aCard, aMode, aFileName) {
		try {
			cardbookRepository.addCardToEmails(aCard);
			cardbookRepository.addCardToSearch(aCard);
			cardbookRepository.addCardToList(aCard);
			cardbookRepository.addCardToCache(aCard, aMode, aFileName);
			cardbookRepository.addCardToCategories(aCard, aCard.dirPrefId);
			cardbookRepository.addCardToDisplay(aCard, aCard.dirPrefId);
			for (var i in cardbookRepository.cardbookComplexSearch) {
				if (cardbookComplexSearch.isMyCardFound(aCard, i)) {
					cardbookRepository.addCardToCategories(aCard, i);
					cardbookRepository.addCardToDisplay(aCard, i);
				}
			}
		}
		catch (e) {
			wdw_cardbooklog.updateStatusProgressInformation("cardbookRepository.addCardToRepository error : " + e, "Error");
		}
	},

	addCardToList: function(aCard) {
		cardbookRepository.cardbookCards[aCard.dirPrefId+"::"+aCard.uid] = aCard;
	},
		
	removeCardFromList: function(aCard) {
		delete cardbookRepository.cardbookCards[aCard.dirPrefId+"::"+aCard.uid];
	},
		
	addCardToCache: function(aCard, aMode, aFileName) {
		try {
			var cardbookPrefService = new cardbookPreferenceService(aCard.dirPrefId);
			var myDirPrefIdName = cardbookPrefService.getName();
			var myDirPrefIdType = cardbookPrefService.getType();
			var myDirPrefIdUrl = cardbookPrefService.getUrl();

			cardbookSynchronization.cachePutMediaCard(aCard, "photo", myDirPrefIdType);
			cardbookSynchronization.cachePutMediaCard(aCard, "logo", myDirPrefIdType);
			cardbookSynchronization.cachePutMediaCard(aCard, "sound", myDirPrefIdType);

			if (myDirPrefIdType === "DIRECTORY") {
				aCard.cacheuri = aFileName;
				var myFile = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
				myFile.initWithPath(myDirPrefIdUrl);
				myFile.append(aFileName);
				if (aMode === "INITIAL") {
					if (!myFile.exists()) {
						cardbookSynchronization.writeCardsToFile(myFile.path, [aCard], true);
						wdw_cardbooklog.updateStatusProgressInformationWithDebug2(myDirPrefIdName + " : debug mode : Contact " + aCard.fn + " written to directory");
					}
				} else {
					cardbookSynchronization.writeCardsToFile(myFile.path, [aCard], true);
					wdw_cardbooklog.updateStatusProgressInformationWithDebug2(myDirPrefIdName + " : debug mode : Contact " + aCard.fn + " written to directory");
				}
			} else if (myDirPrefIdType === "FILE" || myDirPrefIdType === "SEARCH") {
				return;
			} else if (myDirPrefIdType === "GOOGLE" || myDirPrefIdType === "APPLE" || myDirPrefIdType === "CARDDAV" || myDirPrefIdType === "LOCALDB") {
				aCard.cacheuri = aFileName;
				if (cardbookRepository.cardbookFileCacheCards[aCard.dirPrefId]) {
					cardbookRepository.cardbookFileCacheCards[aCard.dirPrefId][aFileName] = aCard;
				} else {
					cardbookRepository.cardbookFileCacheCards[aCard.dirPrefId] = {};
					cardbookRepository.cardbookFileCacheCards[aCard.dirPrefId][aFileName] = aCard;
				}
				if (aMode === "INITIAL") {
					cardbookIndexedDB.addItemIfMissing(myDirPrefIdName, aCard);
				} else {
					cardbookIndexedDB.addItem(myDirPrefIdName, aCard);
				}
			} else if (myDirPrefIdType === "CACHE") {
				var myFile = cardbookRepository.getLocalDirectory();
				myFile.append(aCard.dirPrefId);
				myFile.append(aFileName);
				if (aMode === "INITIAL") {
					if (!myFile.exists()) {
						cardbookSynchronization.writeCardsToFile(myFile.path, [aCard], false);
						wdw_cardbooklog.updateStatusProgressInformationWithDebug2(myDirPrefIdName + " : debug mode : Contact " + aCard.fn + " written to cache");
					}
				} else {
					if (myFile.exists() && myFile.isFile()) {
						myFile.remove(true);
					}
					cardbookSynchronization.writeCardsToFile(myFile.path, [aCard], false);
					wdw_cardbooklog.updateStatusProgressInformationWithDebug2(myDirPrefIdName + " : debug mode : Contact " + aCard.fn + " written to cache");
				}
				aCard.cacheuri = aFileName;
				if (cardbookRepository.cardbookFileCacheCards[aCard.dirPrefId]) {
					cardbookRepository.cardbookFileCacheCards[aCard.dirPrefId][aFileName] = aCard;
				} else {
					cardbookRepository.cardbookFileCacheCards[aCard.dirPrefId] = {};
					cardbookRepository.cardbookFileCacheCards[aCard.dirPrefId][aFileName] = aCard;
				}
			}
		}
		catch(e) {
			wdw_cardbooklog.updateStatusProgressInformation("cardbookRepository.addCardToCache error : " + e, "Error");
		}
	},

	removeCardFromCache: function(aCard) {
		try {
			cardbookSynchronization.cacheDeleteMediaCard(aCard);
			
			var cardbookPrefService = new cardbookPreferenceService(aCard.dirPrefId);
			var myDirPrefIdName = cardbookPrefService.getName();
			var myDirPrefIdType = cardbookPrefService.getType();
			var myDirPrefIdUrl = cardbookPrefService.getUrl();
			if (myDirPrefIdType === "DIRECTORY") {
				var myFile = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
				myFile.initWithPath(myDirPrefIdUrl);
				myFile.append(aCard.cacheuri);
				if (myFile.exists() && myFile.isFile()) {
					myFile.remove(true);
					wdw_cardbooklog.updateStatusProgressInformationWithDebug2(myDirPrefIdName + " : debug mode : Contact " + aCard.fn + " deleted from directory");
				}
			} else if (myDirPrefIdType === "FILE" || myDirPrefIdType === "SEARCH") {
				return;
			} else if (myDirPrefIdType === "GOOGLE" || myDirPrefIdType === "APPLE" || myDirPrefIdType === "CARDDAV" || myDirPrefIdType === "LOCALDB") {
				cardbookIndexedDB.removeItem(myDirPrefIdName, aCard);
				if (cardbookRepository.cardbookFileCacheCards[aCard.dirPrefId][aCard.cacheuri]) {
					delete cardbookRepository.cardbookFileCacheCards[aCard.dirPrefId][aCard.cacheuri];
				}
			} else if (myDirPrefIdType === "CACHE") {
				var myFile = cardbookRepository.getLocalDirectory();
				myFile.append(aCard.dirPrefId);
				myFile.append(aCard.cacheuri);
				if (myFile.exists() && myFile.isFile()) {
					myFile.remove(true);
					wdw_cardbooklog.updateStatusProgressInformationWithDebug2(myDirPrefIdName + " : debug mode : Contact " + aCard.fn + " deleted from cache");
					if (cardbookRepository.cardbookFileCacheCards[aCard.dirPrefId][aCard.cacheuri]) {
						delete cardbookRepository.cardbookFileCacheCards[aCard.dirPrefId][aCard.cacheuri];
					}
				}
			}
		}
		catch(e) {
			wdw_cardbooklog.updateStatusProgressInformation("cardbookRepository.removeCardFromCache error : " + e, "Error");
		}
	},

	addCardToCategories: function(aCard, aDirPrefId) {
		if (aCard.categories.length != 0) {
			cardbookRepository.cardbookAccountsCategories[aDirPrefId] = cardbookRepository.arrayUnique(cardbookRepository.cardbookAccountsCategories[aDirPrefId].concat(aCard.categories));
		} else {
			var uncategorizedCards = cardbookRepository.cardbookUncategorizedCards;
			cardbookRepository.cardbookAccountsCategories[aDirPrefId] = cardbookRepository.arrayUnique(cardbookRepository.cardbookAccountsCategories[aDirPrefId].concat([uncategorizedCards]));
		}
		cardbookRepository.cardbookAccountsCategories[aDirPrefId] = cardbookUtils.sortArrayByString(cardbookRepository.cardbookAccountsCategories[aDirPrefId],-1,1);
		cardbookRepository.setEmptyContainer(aDirPrefId);
	},
		
	removeCardFromCategories: function(aCard, aDirPrefId) {
		if (aCard.categories.length != 0) {
			for (var j = 0; j < aCard.categories.length; j++) {
				if (cardbookRepository.cardbookAccountsCategories[aDirPrefId]) {
					function searchCategory(element) {
						if (element != aCard.categories[j]) {
							return true;
						} else if (cardbookRepository.cardbookDisplayCards[aDirPrefId+"::"+aCard.categories[j]].length > 1) {
							return true;
						} else if (cardbookRepository.cardbookDisplayCards[aDirPrefId+"::"+aCard.categories[j]].length == 1) {
							if (cardbookRepository.cardbookDisplayCards[aDirPrefId+"::"+aCard.categories[j]][0].uid == aCard.uid) {
								return false;
							} else {
								return true;
							}
						}
					}
					cardbookRepository.cardbookAccountsCategories[aDirPrefId] = cardbookRepository.cardbookAccountsCategories[aDirPrefId].filter(searchCategory);
				}
				
				if (cardbookRepository.cardbookDisplayCards[aDirPrefId+"::"+aCard.categories[j]]) {
					if (cardbookRepository.cardbookDisplayCards[aDirPrefId+"::"+aCard.categories[j]].length === 1) {
						cardbookRepository.removeCategoryFromAccounts(aDirPrefId+"::"+aCard.categories[j]);
						cardbookRepository.removeCategoryFromCategories(aDirPrefId, aCard.categories[j]);
					} else if (cardbookRepository.cardbookDisplayCards[aDirPrefId+"::"+aCard.categories[j]].length === 0) {
						cardbookRepository.removeCategoryFromDisplay(aDirPrefId+"::"+aCard.categories[j]);
					}
				}
			}
		} else {
			var uncategorizedCards = cardbookRepository.cardbookUncategorizedCards;
			if (cardbookRepository.cardbookAccountsCategories[aDirPrefId]) {
				function searchCategory(element) {
					return ((element == uncategorizedCards && cardbookRepository.cardbookDisplayCards[aDirPrefId+"::"+uncategorizedCards].length > 1)
							|| (element != uncategorizedCards));
				}
				cardbookRepository.cardbookAccountsCategories[aDirPrefId] = cardbookRepository.cardbookAccountsCategories[aDirPrefId].filter(searchCategory);
			}

			if (cardbookRepository.cardbookDisplayCards[aDirPrefId+"::"+uncategorizedCards]) {
				if (cardbookRepository.cardbookDisplayCards[aDirPrefId+"::"+uncategorizedCards].length === 1) {
					cardbookRepository.removeCategoryFromAccounts(aDirPrefId+"::"+uncategorizedCards);
				} else if (cardbookRepository.cardbookDisplayCards[aDirPrefId+"::"+uncategorizedCards].length === 0) {
					cardbookRepository.removeCategoryFromDisplay(aDirPrefId+"::"+uncategorizedCards);
				}
			}
		}
		cardbookRepository.setEmptyContainer(aDirPrefId);
	},

	removeCategoryFromAccounts: function(aCategory) {
		function searchAccount(element) {
			return (element[4] !== aCategory);
		}
		cardbookRepository.cardbookAccounts = cardbookRepository.cardbookAccounts.filter(searchAccount);
	},

	removeCategoryFromCategories: function(aDirPrefId, aCategoryName) {
		function searchCategory(element) {
			return (element !== aCategoryName);
		}
		cardbookRepository.cardbookAccountsCategories[aDirPrefId] = cardbookRepository.cardbookAccountsCategories[aDirPrefId].filter(searchCategory);
	},

	addCategoryToCard: function(aCard, aCategoryName) {
		aCard.categories.push(aCategoryName);
		aCard.categories = cardbookUtils.cleanCategories(aCard.categories);
	},

	removeCategoryFromCard: function(aCard, aCategoryName) {
		function searchCategory(element) {
			return (element !== aCategoryName);
		}
		aCard.categories = aCard.categories.filter(searchCategory);
	},

	renameCategoryFromCard: function(aCard, aOldCategoryName, aNewCategoryName) {
		cardbookRepository.removeCategoryFromCard(aCard, aOldCategoryName);
		cardbookRepository.addCategoryToCard(aCard, aNewCategoryName);
	},

	removeCategoryFromDisplay: function(aCategory) {
		delete cardbookRepository.cardbookDisplayCards[aCategory];
	},

	addCardToDisplay: function(aCard, aDirPrefId) {
		cardbookRepository.cardbookDisplayCards[aDirPrefId].push(aCard);
		if (aCard.categories.length != 0) {
			for (let j = 0; j < aCard.categories.length; j++) {
				if (cardbookRepository.cardbookDisplayCards[aDirPrefId+"::"+aCard.categories[j]]) {
					cardbookRepository.cardbookDisplayCards[aDirPrefId+"::"+aCard.categories[j]].push(aCard);
				} else {
					cardbookRepository.cardbookDisplayCards[aDirPrefId+"::"+aCard.categories[j]] = [];
					cardbookRepository.cardbookDisplayCards[aDirPrefId+"::"+aCard.categories[j]].push(aCard);
				}
			}
		} else {
			var uncategorizedCards = cardbookRepository.cardbookUncategorizedCards;
			if (cardbookRepository.cardbookDisplayCards[aDirPrefId+"::"+uncategorizedCards]) {
				cardbookRepository.cardbookDisplayCards[aDirPrefId+"::"+uncategorizedCards].push(aCard);
			} else {
				cardbookRepository.cardbookDisplayCards[aDirPrefId+"::"+uncategorizedCards] = [];
				cardbookRepository.cardbookDisplayCards[aDirPrefId+"::"+uncategorizedCards].push(aCard);
			}
		}
		var myPrefName = cardbookUtils.getPrefNameFromPrefId(aDirPrefId);
		wdw_cardbooklog.updateStatusProgressInformationWithDebug2(myPrefName + " : debug mode : Contact " + aCard.fn + " added to display");

		if (cardbookRepository.cardbookSearchMode === "SEARCH") {
			if (cardbookRepository.getSearchString(aCard).indexOf(cardbookRepository.cardbookSearchValue) >= 0) {
				cardbookRepository.cardbookDisplayCards[cardbookRepository.cardbookSearchValue].push(aCard);
			}
			wdw_cardbooklog.updateStatusProgressInformationWithDebug2(myPrefName + " : debug mode : Contact " + aCard.fn + " added to display search");
		}
	},
	
	removeCardFromDisplay: function(aCard, aDirPrefId) {
		if (cardbookRepository.cardbookDisplayCards[aDirPrefId]) {
			function searchCard(element) {
				return (element.uid != aCard.uid);
			}
			cardbookRepository.cardbookDisplayCards[aDirPrefId] = cardbookRepository.cardbookDisplayCards[aDirPrefId].filter(searchCard);
			if (aCard.categories.length != 0) {
				for (let j = 0; j < aCard.categories.length; j++) {
					if (cardbookRepository.cardbookDisplayCards[aDirPrefId+"::"+aCard.categories[j]]) {
						function searchCard(element) {
							return (element.uid != aCard.uid);
						}
						cardbookRepository.cardbookDisplayCards[aDirPrefId+"::"+aCard.categories[j]] = cardbookRepository.cardbookDisplayCards[aDirPrefId+"::"+aCard.categories[j]].filter(searchCard);
						if (cardbookRepository.cardbookDisplayCards[aDirPrefId+"::"+aCard.categories[j]].length == 0) {
							delete cardbookRepository.cardbookDisplayCards[aDirPrefId+"::"+aCard.categories[j]];
						}
					}
				}
			} else {
				var uncategorizedCards = cardbookRepository.cardbookUncategorizedCards;
				if (cardbookRepository.cardbookDisplayCards[aDirPrefId+"::"+uncategorizedCards]) {
					function searchCard(element) {
						return (element.uid != aCard.uid);
					}
					cardbookRepository.cardbookDisplayCards[aDirPrefId+"::"+uncategorizedCards] = cardbookRepository.cardbookDisplayCards[aDirPrefId+"::"+uncategorizedCards].filter(searchCard);
				}
			}
			var myPrefName = cardbookUtils.getPrefNameFromPrefId(aDirPrefId);
			wdw_cardbooklog.updateStatusProgressInformationWithDebug2(myPrefName + " : debug mode : Contact " + aCard.fn + " deleted from display");
		}
		if (cardbookRepository.cardbookSearchMode === "SEARCH") {
			function searchCard(element) {
				return (element.dirPrefId+"::"+element.uid != aDirPrefId+"::"+aCard.uid);
			}
			cardbookRepository.cardbookDisplayCards[cardbookRepository.cardbookSearchValue] = cardbookRepository.cardbookDisplayCards[cardbookRepository.cardbookSearchValue].filter(searchCard);
			var myPrefName = cardbookUtils.getPrefNameFromPrefId(aDirPrefId);
			wdw_cardbooklog.updateStatusProgressInformationWithDebug2(myPrefName + " : debug mode : Contact " + aCard.fn + " deleted from display search");
		}
	},
	
	addCardToEmails: function(aCard) {
		for (var i = 0; i < aCard.email.length; i++) {
			var myEmail = aCard.email[i][0][0].toLowerCase();
			if (myEmail != null && myEmail !== undefined && myEmail != "") {
				if (!cardbookRepository.cardbookCardEmails[aCard.dirPrefId]) {
					cardbookRepository.cardbookCardEmails[aCard.dirPrefId] = {};
				}
				if (!cardbookRepository.cardbookCardEmails[aCard.dirPrefId][myEmail]) {
					cardbookRepository.cardbookCardEmails[aCard.dirPrefId][myEmail] = [];
				}
				cardbookRepository.cardbookCardEmails[aCard.dirPrefId][myEmail].push(aCard);
			}
		}
	},
		
	removeCardFromEmails: function(aCard) {
		if (cardbookRepository.cardbookCardEmails[aCard.dirPrefId]) {
			for (var i = 0; i < aCard.email.length; i++) {
				var myEmail = aCard.email[i][0][0].toLowerCase();
				if (myEmail != null && myEmail !== undefined && myEmail != "") {
					if (cardbookRepository.cardbookCardEmails[aCard.dirPrefId][myEmail]) {
						if (cardbookRepository.cardbookCardEmails[aCard.dirPrefId][myEmail].length == 1) {
							delete cardbookRepository.cardbookCardEmails[aCard.dirPrefId][myEmail];
						} else {
							function searchCard(element) {
								return (element.dirPrefId+"::"+element.uid != aCard.dirPrefId+"::"+aCard.uid);
							}
							cardbookRepository.cardbookCardEmails[aCard.dirPrefId][myEmail] = cardbookRepository.cardbookCardEmails[aCard.dirPrefId][myEmail].filter(searchCard);
						}
					}
				}
			}
		}
	},

	addCardFromDisplayAndEmail: function (aDirPrefId, aDisplayName, aEmail, aCategory) {
		if (!(aDisplayName != null && aDisplayName !== undefined && aDisplayName != "")) {
			if (!(aEmail != null && aEmail !== undefined && aEmail != "")) {
				return;
			} else {
				aDisplayName = aEmail;
			}
		}
		this.jsInclude(["chrome://cardbook/content/cardbookCardParser.js"]);
		var cardbookPrefService = new cardbookPreferenceService(aDirPrefId);
		var myDirPrefIdName = cardbookPrefService.getName();
		var myDirPrefIdType = cardbookPrefService.getType();
		var myDirPrefIdUrl = cardbookPrefService.getUrl();
		var myDirPrefIdVCard = cardbookPrefService.getVCard();
		var myDirPrefIdReadOnly = cardbookPrefService.getReadOnly();
		if (!myDirPrefIdReadOnly) {
			var myNewCard = new cardbookCardParser();
			myNewCard.dirPrefId = aDirPrefId;
			myNewCard.version = myDirPrefIdVCard;
			cardbookUtils.setCardUUID(myNewCard);
			myNewCard.fn = aDisplayName;
			if (myNewCard.fn == "") {
				myNewCard.fn = aEmail.substr(0, aEmail.indexOf("@")).replace("."," ").replace("_"," ");
			}
			var myDisplayNameArray = aDisplayName.split(" ");
			if (myDisplayNameArray.length > 1) {
				myNewCard.lastname = myDisplayNameArray[myDisplayNameArray.length - 1];
				var removed = myDisplayNameArray.splice(myDisplayNameArray.length - 1, 1);
				myNewCard.firstname = myDisplayNameArray.join(" ");
			}
			myNewCard.email = [ [ [aEmail], [] ,"", [] ] ];
			if (aCategory != null && aCategory !== undefined && aCategory != "") {
				cardbookRepository.addCategoryToCard(myNewCard, aCategory);
			}
			var myNullCard = new cardbookCardParser();
			cardbookRepository.saveCard(myNullCard, myNewCard, "cardbook.cardAddedIndirect");
			cardbookRepository.reWriteFiles([aDirPrefId]);
		} else {
			cardbookUtils.formatStringForOutput("addressbookReadOnly", [myDirPrefIdName]);
		}
	},

	verifyABRestrictions: function (aDirPrefId, aSearchAB, aABExclRestrictions, aABInclRestrictions) {
		if (aABExclRestrictions[aDirPrefId]) {
			return false;
		}
		if (((aABInclRestrictions.length == 0) && ((aSearchAB == aDirPrefId) || (aSearchAB === "allAddressBooks"))) ||
			((aABInclRestrictions.length > 0) && ((aSearchAB == aDirPrefId) || ((aSearchAB === "allAddressBooks") && aABInclRestrictions[aDirPrefId])))) {
			return true;
		} else {
			return false;
		}
	},
	
	verifyCatRestrictions: function (aDirPrefId, aCategory, aSearchInput, aABExclRestrictions, aCatExclRestrictions, aCatInclRestrictions) {
		if (aABExclRestrictions[aDirPrefId]) {
			return false;
		}
		if (aCatExclRestrictions[aDirPrefId] && aCatExclRestrictions[aDirPrefId][aCategory]) {
			return false;
		}
		if (((!(aCatInclRestrictions[aDirPrefId])) && (aCategory.replace(/[\s+\-+\.+\,+\;+]/g, "").toUpperCase().indexOf(aSearchInput) >= 0 || aSearchInput == "")) ||
				((aCatInclRestrictions[aDirPrefId]) && (aCatInclRestrictions[aDirPrefId][aCategory]))) {
			return true;
		} else {
			return false;
		}
	},

	isEmailRegistered: function(aEmail, aIdentityKey) {
		var ABInclRestrictions = {};
		var ABExclRestrictions = {};
		var catInclRestrictions = {};
		var catExclRestrictions = {};

		function _loadRestrictions(aIdentityKey) {
			var cardbookPrefService = new cardbookPreferenceService();
			var result = [];
			result = cardbookPrefService.getAllRestrictions();
			ABInclRestrictions = {};
			ABExclRestrictions = {};
			catInclRestrictions = {};
			catExclRestrictions = {};
			if (aIdentityKey == "") {
				ABInclRestrictions["length"] = 0;
				return;
			}
			for (var i = 0; i < result.length; i++) {
				var resultArray = result[i].split("::");
				if ((resultArray[0] == "true") && ((resultArray[2] == aIdentityKey) || (resultArray[2] == "allMailAccounts"))) {
					if (resultArray[1] == "include") {
						ABInclRestrictions[resultArray[3]] = 1;
						if (resultArray[4] && resultArray[4] != null && resultArray[4] !== undefined && resultArray[4] != "") {
							if (!(catInclRestrictions[resultArray[3]])) {
								catInclRestrictions[resultArray[3]] = {};
							}
							catInclRestrictions[resultArray[3]][resultArray[4]] = 1;
						}
					} else {
						if (resultArray[4] && resultArray[4] != null && resultArray[4] !== undefined && resultArray[4] != "") {
							if (!(catExclRestrictions[resultArray[3]])) {
								catExclRestrictions[resultArray[3]] = {};
							}
							catExclRestrictions[resultArray[3]][resultArray[4]] = 1;
						} else {
							ABExclRestrictions[resultArray[3]] = 1;
						}
					}
				}
			}
			ABInclRestrictions["length"] = cardbookUtils.sumElements(ABInclRestrictions);
		};
		
		_loadRestrictions(aIdentityKey);
		
		if (aEmail != null && aEmail !== undefined && aEmail != "") {
			var myEmail = aEmail.toLowerCase();
			for (var i = 0; i < cardbookRepository.cardbookAccounts.length; i++) {
				if (cardbookRepository.cardbookAccounts[i][1] && cardbookRepository.cardbookAccounts[i][5] && (cardbookRepository.cardbookAccounts[i][6] != "SEARCH")) {
					var myDirPrefId = cardbookRepository.cardbookAccounts[i][4];
					if (cardbookRepository.verifyABRestrictions(myDirPrefId, "allAddressBooks", ABExclRestrictions, ABInclRestrictions)) {
						if (cardbookRepository.cardbookCardEmails[myDirPrefId]) {
							if (cardbookRepository.cardbookCardEmails[myDirPrefId][myEmail]) {
								for (var j = 0; j < cardbookRepository.cardbookCardEmails[myDirPrefId][myEmail].length; j++) {
									var myCard = cardbookRepository.cardbookCardEmails[myDirPrefId][myEmail][j];
									if (catExclRestrictions[myDirPrefId]) {
										var add = true;
										for (var l in catExclRestrictions[myDirPrefId]) {
											if (cardbookUtils.contains(myCard.categories, l)) {
												add = false;
												break;
											}
										}
										if (!add) {
											continue;
										}
									}
									if (catInclRestrictions[myDirPrefId]) {
										var add = false;
										for (var l in catInclRestrictions[myDirPrefId]) {
											if (cardbookUtils.contains(myCard.categories, l)) {
												add = true;
												break;
											}
										}
										if (!add) {
											continue;
										}
									}
									return true;
								}
							}
						}
					}
				}
			}
		}
		return false;
	},

	// this function is only used by the CardBook filters
	// as mail account restrictions do not apply to filters
	isEmailInPrefIdRegistered: function(aDirPrefId, aEmail) {
		if (aEmail != null && aEmail !== undefined && aEmail != "") {
			var myTestString = aEmail.toLowerCase();
			if (cardbookRepository.cardbookCardEmails[aDirPrefId]) {
				if (cardbookRepository.cardbookCardEmails[aDirPrefId][myTestString]) {
					return true;
				}
			}
		}
		return false;
	},
		
	addCardToSearch: function(aCard) {
		var myText = cardbookRepository.getSearchString(aCard);
		if (myText != null && myText !== undefined && myText != "") {
			if (!cardbookRepository.cardbookCardSearch[aCard.dirPrefId]) {
				cardbookRepository.cardbookCardSearch[aCard.dirPrefId] = {};
			}
			if (!cardbookRepository.cardbookCardSearch[aCard.dirPrefId][myText]) {
				cardbookRepository.cardbookCardSearch[aCard.dirPrefId][myText] = [];
			}
			cardbookRepository.cardbookCardSearch[aCard.dirPrefId][myText].push(aCard);
		}
	},
		
	removeCardFromSearch: function(aCard) {
		var myText = cardbookRepository.getSearchString(aCard);
		if (myText != null && myText !== undefined && myText != "") {
			if (cardbookRepository.cardbookCardSearch[aCard.dirPrefId][myText]) {
				if (cardbookRepository.cardbookCardSearch[aCard.dirPrefId][myText].length == 1) {
					delete cardbookRepository.cardbookCardSearch[aCard.dirPrefId][myText];
				} else {
					function searchCard(element) {
						return (element.dirPrefId+"::"+element.uid != aCard.dirPrefId+"::"+aCard.uid);
					}
					cardbookRepository.cardbookCardSearch[aCard.dirPrefId][myText] = cardbookRepository.cardbookCardSearch[aCard.dirPrefId][myText].filter(searchCard);
				}
			}
		}
	},

	saveCard: function(aOldCard, aNewCard, aSource) {
		try {
			var cardbookPrefService = new cardbookPreferenceService(aNewCard.dirPrefId);
			var myDirPrefIdType = cardbookPrefService.getType();
			var myDirPrefIdName = cardbookPrefService.getName();
			var myDirPrefIdUrl = cardbookPrefService.getUrl();
			if (cardbookPrefService.getReadOnly()) {
				return;
			}
			if (cardbookRepository.cardbookComplexSearchPrefId != "") {
				var myDisplayPrefId = cardbookRepository.cardbookComplexSearchPrefId;
			} else {
				var myDisplayPrefId = aNewCard.dirPrefId;
			}

			var newCats = [];
			for (var i = 0; i < aNewCard.categories.length; i++) {
				var found = false;
				for (var j = 0; !found && j < cardbookRepository.cardbookAccountsCategories[aNewCard.dirPrefId].length; j++) {
					if (cardbookRepository.cardbookAccountsCategories[aNewCard.dirPrefId][j] == aNewCard.categories[i]) {
						found = true;
					}
				}
				if (!found) {
					newCats.push(aNewCard.categories[i]);
				}
			}

			cardbookUtils.setCalculatedFields(aNewCard);
			// Existing card
			if (cardbookRepository.cardbookCards[aOldCard.dirPrefId+"::"+aNewCard.uid] && aOldCard.dirPrefId == aNewCard.dirPrefId) {
				var myCard = cardbookRepository.cardbookCards[aOldCard.dirPrefId+"::"+aNewCard.uid];
				if (myDirPrefIdType === "CACHE" || myDirPrefIdType === "DIRECTORY" || myDirPrefIdType === "LOCALDB") {
					// if aOldCard and aNewCard have the same cached medias
					cardbookUtils.changeMediaFromFileToContent(aNewCard);
					cardbookRepository.removeCardFromRepository(myCard, true);
					cardbookUtils.nullifyTagModification(aNewCard);
					cardbookUtils.nullifyEtag(aNewCard);
					cardbookRepository.addCardToRepository(aNewCard, "WINDOW", cardbookUtils.getFileCacheNameFromCard(aNewCard, myDirPrefIdType));
				} else if (myDirPrefIdType === "FILE") {
					// if aOldCard and aNewCard have the same cached medias
					cardbookUtils.changeMediaFromFileToContent(aNewCard);
					cardbookRepository.removeCardFromRepository(myCard, true);
					cardbookUtils.nullifyTagModification(aNewCard);
					cardbookUtils.nullifyEtag(aNewCard);
					cardbookRepository.addCardToRepository(aNewCard, "WINDOW");
				} else {
					// if aOldCard and aNewCard have the same cached medias
					cardbookUtils.changeMediaFromFileToContent(aNewCard);
					if (!(cardbookUtils.searchTagCreated(aNewCard))) {
						cardbookUtils.addTagUpdated(aNewCard);
					}
					cardbookRepository.removeCardFromRepository(myCard, true);
					cardbookRepository.addCardToRepository(aNewCard, "WINDOW", cardbookUtils.getFileCacheNameFromCard(aNewCard, myDirPrefIdType));
				}
				cardbookUtils.formatStringForOutput("cardUpdatedOK", [myDirPrefIdName, aNewCard.fn]);
				cardbookUtils.notifyObservers(aSource, "cardid:" + myDisplayPrefId + "::" + aNewCard.uid);
			// Moved card
			} else if (aOldCard.dirPrefId != "" && cardbookRepository.cardbookCards[aOldCard.dirPrefId+"::"+aNewCard.uid] && aOldCard.dirPrefId != aNewCard.dirPrefId) {
				var myCard = cardbookRepository.cardbookCards[aOldCard.dirPrefId+"::"+aNewCard.uid];
				var cardbookPrefService = new cardbookPreferenceService(myCard.dirPrefId);
				var myDirPrefIdName = cardbookPrefService.getName();
				var myDirPrefIdType = cardbookPrefService.getType();
				if (myDirPrefIdType === "FILE") {
					cardbookRepository.removeCardFromRepository(myCard, false);
				} else if (myDirPrefIdType === "CACHE" || myDirPrefIdType === "DIRECTORY" || myDirPrefIdType === "LOCALDB") {
					cardbookRepository.removeCardFromRepository(myCard, true);
				} else {
					if (cardbookUtils.searchTagCreated(myCard)) {
						cardbookRepository.removeCardFromRepository(myCard, true);
					} else {
						cardbookUtils.addTagDeleted(myCard);
						cardbookRepository.addCardToCache(myCard, "WINDOW", cardbookUtils.getFileCacheNameFromCard(myCard));
						cardbookRepository.removeCardFromRepository(myCard, false);
					}
				}
				cardbookUtils.formatStringForOutput("cardDeletedOK", [myDirPrefIdName, myCard.fn]);
				wdw_cardbooklog.addActivity("cardDeletedOK", [myDirPrefIdName, myCard.fn], "deleteMail");
				cardbookUtils.notifyObservers("cardbook.cardRemovedIndirect");
				
				var cardbookPrefService = new cardbookPreferenceService(aNewCard.dirPrefId);
				var myDirPrefIdName = cardbookPrefService.getName();
				var myDirPrefIdType = cardbookPrefService.getType();
				aNewCard.cardurl = "";
				cardbookUtils.setCardUUID(aNewCard);
				if (myDirPrefIdType === "CACHE" || myDirPrefIdType === "DIRECTORY" || myDirPrefIdType === "LOCALDB") {
					cardbookUtils.nullifyTagModification(aNewCard);
					cardbookUtils.nullifyEtag(aNewCard);
					cardbookRepository.addCardToRepository(aNewCard, "WINDOW", cardbookUtils.getFileCacheNameFromCard(aNewCard, myDirPrefIdType));
				} else if (myDirPrefIdType === "FILE") {
					cardbookUtils.nullifyTagModification(aNewCard);
					cardbookUtils.nullifyEtag(aNewCard);
					cardbookRepository.addCardToRepository(aNewCard, "WINDOW");
				} else {
					cardbookUtils.addTagCreated(aNewCard);
					cardbookUtils.addEtag(aNewCard, "0");
					cardbookRepository.addCardToRepository(aNewCard, "WINDOW", cardbookUtils.getFileCacheNameFromCard(aNewCard, myDirPrefIdType));
				}
				cardbookUtils.formatStringForOutput("cardCreatedOK", [myDirPrefIdName, aNewCard.fn]);
				wdw_cardbooklog.addActivity("cardCreatedOK", [myDirPrefIdName, aNewCard.fn], "addItem");
				cardbookUtils.notifyObservers(aSource, "cardid:" + myDisplayPrefId + "::" + aNewCard.uid);
			// New card
			} else {
				if (aNewCard.uid == "") {
					cardbookUtils.setCardUUID(aNewCard);
				}
				if (myDirPrefIdType === "CACHE" || myDirPrefIdType === "DIRECTORY" || myDirPrefIdType === "LOCALDB") {
					cardbookUtils.nullifyTagModification(aNewCard);
					cardbookUtils.nullifyEtag(aNewCard);
					cardbookRepository.addCardToRepository(aNewCard, "WINDOW", cardbookUtils.getFileCacheNameFromCard(aNewCard, myDirPrefIdType));
				} else if (myDirPrefIdType === "FILE") {
					cardbookUtils.nullifyTagModification(aNewCard);
					cardbookUtils.nullifyEtag(aNewCard);
					cardbookRepository.addCardToRepository(aNewCard, "WINDOW");
				} else {
					cardbookUtils.addTagCreated(aNewCard);
					cardbookUtils.addEtag(aNewCard, "0");
					cardbookRepository.addCardToRepository(aNewCard, "WINDOW", cardbookUtils.getFileCacheNameFromCard(aNewCard, myDirPrefIdType));
				}
				cardbookUtils.formatStringForOutput("cardCreatedOK", [myDirPrefIdName, aNewCard.fn]);
				wdw_cardbooklog.addActivity("cardCreatedOK", [myDirPrefIdName, aNewCard.fn], "addItem");
				cardbookUtils.notifyObservers(aSource, "cardid:" + myDisplayPrefId + "::" + aNewCard.uid);
			}
			delete aOldCard;
			for (var i = 0; i < newCats.length; i++) {
				cardbookUtils.formatStringForOutput("categoryCreatedOK", [myDirPrefIdName, newCats[i]]);
				wdw_cardbooklog.addActivity("categoryCreatedOK", [myDirPrefIdName, newCats[i]], "addItem");
				cardbookUtils.notifyObservers("cardbook.catAddedIndirect", "accountid:" + myDisplayPrefId+"::"+newCats[i]);
			}
		}
		catch (e) {
			wdw_cardbooklog.updateStatusProgressInformation("cardbookRepository.saveCard error : " + e, "Error");
		}
	},

	deleteCards: function (aListOfCards, aSource) {
		try {
			var listOfFileToRewrite = [];
			for (var i = 0; i < aListOfCards.length; i++) {
				if (!cardbookUtils.isMyAccountReadOnly(aListOfCards[i].dirPrefId)) {
					var cardbookPrefService = new cardbookPreferenceService(aListOfCards[i].dirPrefId);
					var myDirPrefIdName = cardbookPrefService.getName();
					var myDirPrefIdType = cardbookPrefService.getType();
					if (myDirPrefIdType === "FILE") {
						listOfFileToRewrite.push(aListOfCards[i].dirPrefId);
						cardbookRepository.removeCardFromRepository(aListOfCards[i], false);
					} else if (myDirPrefIdType === "CACHE" || myDirPrefIdType === "DIRECTORY" || myDirPrefIdType === "LOCALDB") {
						cardbookRepository.removeCardFromRepository(aListOfCards[i], true);
					} else {
						if (cardbookUtils.searchTagCreated(aListOfCards[i])) {
							cardbookRepository.removeCardFromRepository(aListOfCards[i], true);
						} else {
							cardbookUtils.addTagDeleted(aListOfCards[i]);
							cardbookRepository.addCardToCache(aListOfCards[i], "WINDOW", cardbookUtils.getFileCacheNameFromCard(aListOfCards[i]));
							cardbookRepository.removeCardFromRepository(aListOfCards[i], false);
						}
					}
					cardbookUtils.formatStringForOutput("cardDeletedOK", [myDirPrefIdName, aListOfCards[i].fn]);
					wdw_cardbooklog.addActivity("cardDeletedOK", [myDirPrefIdName, aListOfCards[i].fn], "deleteMail");
					// performance reason
					// update the UI only at the end
					if (i == aListOfCards.length - 1) {
						cardbookUtils.notifyObservers(aSource);
					}
				}
			}
			cardbookRepository.reWriteFiles(listOfFileToRewrite);
		}
		catch (e) {
			wdw_cardbooklog.updateStatusProgressInformation("cardbookRepository.deleteCards error : " + e, "Error");
		}
	},

	reWriteFiles: function (aListOfFiles) {
		listOfFilesToRewrite = cardbookRepository.arrayUnique(aListOfFiles);
		for (var i = 0; i < listOfFilesToRewrite.length; i++) {
			var cardbookPrefService = new cardbookPreferenceService(listOfFilesToRewrite[i]);
			if (cardbookPrefService.getType() === "FILE" && !cardbookPrefService.getReadOnly()) {
				cardbookSynchronization.writeCardsToFile(cardbookPrefService.getUrl(), cardbookRepository.cardbookDisplayCards[listOfFilesToRewrite[i]], true);
			}
		}
	},

	isthereSearchRulesToCreate: function () {
		var todo = 0;
		var allRules = false;
		for (var i = 0; i < cardbookRepository.cardbookAccounts.length; i++) {
			if (cardbookRepository.cardbookAccounts[i][1] && cardbookRepository.cardbookAccounts[i][5] && (cardbookRepository.cardbookAccounts[i][6] != "SEARCH")) {
				todo++;
			}
			if (todo >= 2) {
				allRules = true;
				break;
			}
		}
		return allRules;
	},

	getRuleFile: function (aPrefId) {
		var cacheDir = cardbookRepository.getLocalDirectory();
		cacheDir.append(aPrefId);
		cacheDir.append(aPrefId + ".rul");
		return cacheDir;
	},

	deleteCssAllRules: function (aStyleSheet) {
		for (var i = cardbookRepository.cardbookDynamicCssRules[aStyleSheet.href].length - 1 ; i >= 0; i--) {
			try {
				aStyleSheet.deleteRule(cardbookRepository.cardbookDynamicCssRules[aStyleSheet.href][i]);
			} catch(e) {}
		}
		cardbookRepository.cardbookDynamicCssRules[aStyleSheet.href] = [];
	},

	createCssAccountRules: function (aStyleSheet, aDirPrefId, aColor) {
		var ruleString = ".cardbookAccountTreeClass treechildren::-moz-tree-cell(accountColor odd container color_" + aDirPrefId + ") {}";
		var ruleIndex = aStyleSheet.insertRule(ruleString, aStyleSheet.cssRules.length);
		aStyleSheet.cssRules[ruleIndex].style.backgroundColor = aColor;
		cardbookRepository.cardbookDynamicCssRules[aStyleSheet.href].push(ruleIndex);
		var ruleString = ".cardbookAccountTreeClass treechildren::-moz-tree-cell(accountColor even container color_" + aDirPrefId + ") {}";
		var ruleIndex = aStyleSheet.insertRule(ruleString, aStyleSheet.cssRules.length);
		aStyleSheet.cssRules[ruleIndex].style.backgroundColor = aColor;
		cardbookRepository.cardbookDynamicCssRules[aStyleSheet.href].push(ruleIndex);
	},

	createCssCardRules: function (aStyleSheet, aDirPrefId, aColor) {
		var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
		var useColor = prefs.getComplexValue("extensions.cardbook.useColor", Components.interfaces.nsISupportsString).data;
		if (useColor == "text") {
			var ruleString = ".cardbookCardsTreeClass treechildren::-moz-tree-cell-text(SEARCH odd color_" + aDirPrefId + ") {color: " + aColor + ";}";
			var ruleIndex = aStyleSheet.insertRule(ruleString, aStyleSheet.cssRules.length);
			cardbookRepository.cardbookDynamicCssRules[aStyleSheet.href].push(ruleIndex);
			var ruleString = ".cardbookCardsTreeClass treechildren::-moz-tree-cell-text(SEARCH even color_" + aDirPrefId + ") {color: " + aColor + ";}";
			var ruleIndex = aStyleSheet.insertRule(ruleString, aStyleSheet.cssRules.length);
			cardbookRepository.cardbookDynamicCssRules[aStyleSheet.href].push(ruleIndex);
		} else {
			var ruleString = ".cardbookCardsTreeClass treechildren::-moz-tree-row(SEARCH odd color_" + aDirPrefId + ") {background-color: " + aColor + ";}";
			var ruleIndex = aStyleSheet.insertRule(ruleString, aStyleSheet.cssRules.length);
			cardbookRepository.cardbookDynamicCssRules[aStyleSheet.href].push(ruleIndex);
			var ruleString = ".cardbookCardsTreeClass treechildren::-moz-tree-row(SEARCH even color_" + aDirPrefId + ") {background-color: " + aColor + ";}";
			var ruleIndex = aStyleSheet.insertRule(ruleString, aStyleSheet.cssRules.length);
			cardbookRepository.cardbookDynamicCssRules[aStyleSheet.href].push(ruleIndex);
		}
	},

	unregisterCss: function (aChromeUri) {
		var sss = Components.classes['@mozilla.org/content/style-sheet-service;1'].getService(Components.interfaces.nsIStyleSheetService);
		var ios = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
		var uri = ios.newURI(aChromeUri, null, null);
		if (sss.sheetRegistered(uri, sss.AUTHOR_SHEET)) {
			sss.unregisterSheet(uri, sss.AUTHOR_SHEET);
		}
	},

	reloadCss: function (aChromeUri) {
		var sss = Components.classes['@mozilla.org/content/style-sheet-service;1'].getService(Components.interfaces.nsIStyleSheetService);
		var ios = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
		var uri = ios.newURI(aChromeUri, null, null);
		if (sss.sheetRegistered(uri, sss.AUTHOR_SHEET)) {
			sss.unregisterSheet(uri, sss.AUTHOR_SHEET);
		}
		sss.loadAndRegisterSheet(uri, sss.AUTHOR_SHEET);
	},

	getIconType: function (aType) {
		switch(aType) {
			case "CACHE":
			case "DIRECTORY":
			case "FILE":
			case "LOCALDB":
				return "local";
				break;
			case "APPLE":
			case "CARDDAV":
			case "GOOGLE":
				return "remote";
				break;
			case "SEARCH":
				return "search";
				break;
		};
		return aType;
	}

};

cardbookRepository.jsInclude(["chrome://cardbook/content/preferences/cardbookPreferences.js"]);
cardbookRepository.jsInclude(["chrome://cardbook/content/wdw_log.js"]);
cardbookRepository.jsInclude(["chrome://cardbook/content/cardbookUtils.js"]);
cardbookRepository.jsInclude(["chrome://cardbook/content/cardbookIndexedDB.js"]);
cardbookRepository.jsInclude(["chrome://cardbook/content/cardbookSynchronization.js"]);
cardbookRepository.jsInclude(["chrome://cardbook/content/complexSearch/cardbookComplexSearch.js"]);
