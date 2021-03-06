console.log("Running bacckground...")

var extensionButtonClicked = false
var runContent4 = false
var payload = null
var sendMessageCount = 0
chrome.browserAction.onClicked.addListener(buttonClicked)

function buttonClicked(tab) {
	console.log("button clicked", tab)
	sendMessageCount = 0
	chrome.tabs.executeScript(tab.id, {file: "fetchdata.js"} );
	chrome.tabs.create({ url: arizonaLink }, function(tab2) {
	  console.log(tab2)
	  extensionButtonClicked = true
	})
}

var arizonaLink = "https://secure.servicearizona.com/gwRegister/gateway/Utils?action=login&url=https://secure.servicearizona.com/secure/gateway/MyAccount!3F!action!3D!accessTab&msg="
var userHomeUrl = "https://secure.servicearizona.com/gwRegister/gateway/UserHome"
var secureGatewayUrl = "https://secure.servicearizona.com/secure/gateway/MyAccount?action=accessTab"
var DealerServiceUrl = "https://secure.servicearizona.com/az/mvd/dealer/webapp/dealer/start.do"
var issuePermitUrl = "https://secure.servicearizona.com/az/mvd/dealer/webapp/nonres/services.do"
var nonRecidentPermit = "https://secure.servicearizona.com/az/mvd/dealer/webapp/nonres/enterVIN.do"
var vehicleInquiry = "https://secure.servicearizona.com/az/mvd/dealer/webapp/nonres/vehicleInquiry.do"
var vehicleUpdate ="https://secure.servicearizona.com/az/mvd/dealer/webapp/nonres/updateVehicle.do"
// var registrationUrl = "https://secure.servicearizona.com/az/mvd/dealer/webapp/showOwnerInfo.do"
var ownerInfoURL = "https://secure.servicearizona.com/az/mvd/dealer/webapp/nonres/ownerInfo.do"
var purchaseInfoUrl = "https://secure.servicearizona.com/az/mvd/dealer/webapp/nonres/purchaseInfo.do"
var certifyInfoUrl = "https://secure.servicearizona.com/az/mvd/dealer/webapp/nonres/certifyInfo.do"
var confermationUrl = "https://secure.servicearizona.com/az/mvd/dealer/webapp/nonres/confirmInfo.do"

chrome.runtime.onConnect.addListener(function(port) {
	runContent4 = false
  console.assert(port.name == "knockknock");
  port.onMessage.addListener(function(msg) {
    console.log("------------>msg-->", msg)
    payload = msg
  })
})

chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab) {
	console.log(tab, "<<<<----------tab")
	if (extensionButtonClicked) {
		if (sendMessageCount <= 5) {
			chrome.tabs.sendMessage(tab.id, tab)
			sendMessageCount++
		}
		// chrome.tabs.executeScript(tab2.id, {file: "content.js"})
		if (tab.url === arizonaLink && performance.navigation.type === 0) {
			chrome.tabs.executeScript(tab.id, {file: "content.js"} );
		}

		if (tab.url === userHomeUrl) {
			chrome.tabs.executeScript(tab.id, {file: "content2.js"} );
		}

		if (tab.url === secureGatewayUrl && runContent4 === false) {
			chrome.tabs.executeScript(tab.id, {file: "content3.js"} );
			runContent4 = true
		}

		if (tab.url === DealerServiceUrl) {
			chrome.tabs.executeScript(tab.id, {file: "content4.js"} );
		}

		if (tab.url === issuePermitUrl) {
			chrome.tabs.executeScript(tab.id, {file: "content5.js"} );
		}

		if (tab.url === nonRecidentPermit) {
			if (payload != null){
				chrome.tabs.sendMessage(tab.id, payload)
			}
			chrome.tabs.executeScript(tab.id, {file: "content6.js"} );
		}

		if (tab.url === vehicleInquiry) {
			console.log("payload",payload)
			if (payload != null) {
					console.log("payload777777", payload)
					chrome.tabs.sendMessage(tab.id, payload)
					chrome.tabs.executeScript(tab.id, {file: "content7.js"} );
			}
		}

		if (tab.url === purchaseInfoUrl) {
			chrome.tabs.executeScript(tab.id, {file: "content12.js"} );
		}

		if (tab.url === vehicleUpdate) {
			if (payload != null) {
				chrome.tabs.sendMessage(tab.id, payload)
			}
			chrome.tabs.executeScript(tab.id, {file: "content8.js"} );
		}

		if (tab.url === ownerInfoURL) {
			if (payload != null) {
				chrome.tabs.sendMessage(tab.id, payload)
			}
			chrome.tabs.executeScript(tab.id, {file: "content9.js"} );
		}

		if (tab.url === certifyInfoUrl) {
			chrome.tabs.executeScript(tab.id, {file: "content10.js"} );
		}

		if (tab.url === confermationUrl) {
			chrome.tabs.executeScript(tab.id, {file: "content11.js"} );
		}
	}
});
