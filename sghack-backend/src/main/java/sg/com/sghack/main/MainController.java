package sg.com.sghack.main;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import sg.com.sghack.data.AllData;

@RestController
public class MainController {
	
	Logger log = LoggerFactory.getLogger(MainController.class.getName());
	
	@RequestMapping(value = "/alldata", method = RequestMethod.GET)
	public AllData allData(@RequestParam(value="beaconId", required=false)String beaconId) {
		log.info("Received GET request with beaconId=" + beaconId);
		return new AllData();
	}
}
