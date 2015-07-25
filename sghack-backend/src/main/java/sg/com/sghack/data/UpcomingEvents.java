package sg.com.sghack.data;

import java.util.List;

import sg.com.sghack.mocks.UpcomingEventsMock;

public class UpcomingEvents {
	private List<Event> events;
	
	public UpcomingEvents(String beaconid) {
		setEvents(UpcomingEventsMock.getUpcomingEvents(beaconid));
	}

	public List<Event> getEvents() {
		return events;
	}

	public void setEvents(List<Event> events) {
		this.events = events;
	}
}
