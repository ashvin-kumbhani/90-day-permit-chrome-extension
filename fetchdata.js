console.log('fetching data')

// document.getElementsByClassName("price-table-button-name")[0].click()

setTimeout(function() {
	let Vin = document.getElementsByClassName("vehicle-details-vin")[0].innerText
	console.log("Vin", Vin)
	if (!document.getElementsByName("VehicleYearMakeModel")[0]) {
		document.getElementsByClassName("price-table-button-name")[1].click()
	}
	if (!document.getElementsByClassName("purchaseFieldData")[21]) {
		document.getElementsByClassName("purchaseTableLabel")[3].click()
	}
	// document.getElementsByClassName("purchaseTableLabel")[3].click()
	let ymm = document.getElementsByName("VehicleYearMakeModel")[0].value
	let ymmArr = ymm.split(' ')
	let year = ymmArr[0]
	let make = ymmArr[1]
	let model = ymmArr[2]
	let style1 = document.getElementsByClassName("purchaseFieldData")[21].value
	payload = {
		vin: Vin,
		year: year,
		make: make,
		model: model,
		style: style1
	}
	console.log("payloadpayload--->", payload)
	var port = chrome.runtime.connect({name: "knockknock"});
	port.postMessage({payload: payload});
}, 100)
