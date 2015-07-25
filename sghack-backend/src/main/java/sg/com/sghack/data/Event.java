package sg.com.sghack.data;

import java.sql.Time;

public class Event {
	private String name;
	private Time time;
	private Location location;
	
	public Event(String name, Time time, Location location) {
		this.name = name;
		this.time = time;
		this.location = location;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Time getTime() {
		return time;
	}
	public void setTime(Time time) {
		this.time = time;
	}
	public Location getLocation() {
		return location;
	}
	public void setLocation(Location location) {
		this.location = location;
	}
	
	
}
