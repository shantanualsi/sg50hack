package sg.com.sghack.mocks;

import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

import sg.com.sghack.data.v1.Event;
import sg.com.sghack.data.v1.Location;

public class EventsMock {
	private static Time t1 = new Time(19, 40, 0);
	private static Location l1 = new Location("Wings of time", 26199.99, 26004, "");
	private static Event e1 = new Event("Wings of time", t1, l1);
	
	private static Time t2 = new Time(19, 0, 0);
	private static Location l2 = new Location("Sentosa (Interim car park beside Beach Station)", 26199.99, 26004, "");
	private static Event e2 = new Event("DC Justice League Run", t2, l2);
	
	private static Time t3 = new Time(12, 0, 0);
	private static Location l3 = new Location("Sentosa (Interim car park beside Beach Station)", 26199.99, 26004, "");
	private static Event e3 = new Event("Garfield Run", t3, l3);
	
	private static Time t4 = new Time(12, 20, 0);
	private static Location l4 = new Location("Siloso Beach", 26199.99, 26004, "");
	private static Event e4 = new Event("Commando Challenge 2015", t4, l4);
	
	private static Time t5 = new Time(9, 30, 0);
	private static Location l5 = new Location("Sentosa Merlion, Imbiah Station", 26199.99, 26004, "");
	private static Event e5 = new Event("Sentosa Merlion Experience", t5, l5);
	
	public static List<Event> getEventsListSetOne() {
		List<Event> list = new ArrayList<Event>();
		list.add(e1);
		list.add(e2);
		return list;
	}
	
	public static List<Event> getEventsListSetTwo() {
		List<Event> list = new ArrayList<Event>();
		list.add(e3);
		list.add(e4);
		return list;
	}
	
	public static List<Event> getEventsListSetThree() {
		List<Event> list = new ArrayList<Event>();
		list.add(e5);
		return list;
	}
}
