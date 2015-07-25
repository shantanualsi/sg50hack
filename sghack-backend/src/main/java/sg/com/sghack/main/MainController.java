package sg.com.sghack.main;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import sg.com.sghack.data.AllData;
import sg.com.sghack.data.NearestAttractions;

@RestController
public class MainController {
	
	Logger log = LoggerFactory.getLogger(MainController.class.getName());
	
	@RequestMapping(value = "/alldata/{beaconid}", method = RequestMethod.GET)
	public AllData allData(@PathVariable String beaconid) {
		log.info("Received GET request with beaconid=" + beaconid);
		return new AllData();
	}
	
	@RequestMapping(value = "/nearest-attractions/{beaconid}", method = RequestMethod.GET)
	public NearestAttractions nearestAttractions(@PathVariable String beaconid) {
		log.info("Received GET request with beaconid=" + beaconid);
		return new NearestAttractions(beaconid);
	}
}
