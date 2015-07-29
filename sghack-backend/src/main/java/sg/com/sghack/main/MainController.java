package sg.com.sghack.main;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import sg.com.sghack.data.v1.AllData;
import sg.com.sghack.data.v1.Beacon;
import sg.com.sghack.data.v1.Counter;
import sg.com.sghack.data.v1.NearestAttractions;
import sg.com.sghack.data.v1.UpcomingEvents;
import sg.com.sghack.data.v1.VisitorCount;

@RestController
public class MainController {
	
	Logger log = LoggerFactory.getLogger(MainController.class.getName());
	
	@RequestMapping(value = "/alldata/{beaconid}", method = RequestMethod.GET)
	public AllData allData(@PathVariable String beaconid) {
		log.info("Received GET request with beaconid=" + beaconid);
		VisitorCount.setCounter(beaconid);
		return new AllData(beaconid);
	}
	
	@RequestMapping(value = "/nearest-attractions/{beaconid}", method = RequestMethod.GET)
	public NearestAttractions nearestAttractions(@PathVariable String beaconid, HttpServletRequest request) {
		log.info("Received GET request for nearest-attractions with beaconid=" + beaconid + " from IP => " + request.getRemoteAddr());
		VisitorCount.setCounter(beaconid);
		return new NearestAttractions(beaconid);
	}
	
	@RequestMapping(value = "/upcoming-events/{beaconid}", method = RequestMethod.GET)
	public UpcomingEvents upcomingEvents(@PathVariable String beaconid, HttpServletRequest request) {
		log.info("Received GET request for upcoming-events with beaconid=" + beaconid + " from IP => " + request.getRemoteAddr());
		VisitorCount.setCounter(beaconid);
		return new UpcomingEvents(beaconid);
	}
	
	@RequestMapping(value = "/visitor-count/{beaconid}", method = RequestMethod.GET)
	public Counter visitorCount(@PathVariable String beaconid, HttpServletRequest request) {
		log.info("Received GET request for visitor-count with beaconid=" + beaconid + " from IP => " + request.getRemoteAddr());
		return new Counter(beaconid);
	}
	
	@RequestMapping(value = "/beacon-info/{beaconid}", method = RequestMethod.GET)
	public Beacon beaconInfo(@PathVariable String beaconid, HttpServletRequest request) {
		log.info("Received GET request for beacon-info with beaconid=" + beaconid + " from IP => " + request.getRemoteAddr());
		return new Beacon(beaconid);
	}
	
	
}
