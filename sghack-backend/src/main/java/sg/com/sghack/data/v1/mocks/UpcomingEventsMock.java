package sg.com.sghack.data.v1.mocks;

import java.util.List;

import sg.com.sghack.data.v1.Event;

public class UpcomingEventsMock {
	public static List<Event> getUpcomingEvents(String beaconid) {
		if (beaconid.equals("beacon1")) {
			return EventsMock.getEventsListSetOne();
		} else if (beaconid.equals("beacon2")){
			return EventsMock.getEventsListSetTwo();
		} else if (beaconid.equals("beacon3")) {
			return EventsMock.getEventsListSetThree();
		} else {
			return null;
		}
	}
}
