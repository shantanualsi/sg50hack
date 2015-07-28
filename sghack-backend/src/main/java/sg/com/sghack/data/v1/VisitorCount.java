package sg.com.sghack.data.v1;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

public class VisitorCount {
	private static Map<String, AtomicLong> counter = new HashMap<String, AtomicLong>();
	
	public static void setCounter(String beaconid) {
		if(counter.containsKey(beaconid)) {
			counter.get(beaconid).incrementAndGet();
		} else {
			AtomicLong a = new AtomicLong();
			a.incrementAndGet();
			counter.put(beaconid, a);
		}
		
	}
	
	public static Long getCounter(String beaconid) {
		if (!counter.containsKey(beaconid)) {
			counter.put(beaconid, new AtomicLong());
		}
		return counter.get(beaconid).get();
	}
} 
