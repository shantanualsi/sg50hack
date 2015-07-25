package sg.com.sghack.mocks;

import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

import sg.com.sghack.data.Event;
import sg.com.sghack.data.Location;

public class EventsMock {
	private static Time time = new Time(19, 40, 0);
	private static Location l1 = new Location("Wings of time", 26199.99, 26004, "");
	private static Event e1 = new Event("Wings of time", time, l1);
	
	public static List<Event> getEventsListSetOne() {
		List<Event> list = new ArrayList<Event>();
		list.add(e1);
		return list;
	}
}
