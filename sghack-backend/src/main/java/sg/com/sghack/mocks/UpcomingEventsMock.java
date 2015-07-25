package sg.com.sghack.mocks;

import java.util.List;

import sg.com.sghack.data.Event;

public class UpcomingEventsMock {
	public static List<Event> getUpcomingEvents(String beaconid) {
		if (beaconid.equals("beacon1")) {
			return EventsMock.getEventsListSetOne();
		} else {
			return null;
		}
	}
}
