package sg.com.sghack.data;

public class AllData {
	private NearestAttractions nearestAttractions;
	private UpcomingEvents upcomingEvents;
	private Counter counter;
	
	public AllData(String beaconid) {
		setNearestAttractions(new NearestAttractions(beaconid));
		setUpcomingEvents(new UpcomingEvents(beaconid));
		setCounter(new Counter(beaconid));
	}
	
	public NearestAttractions getNearestAttractions() {
		return nearestAttractions;
	}
	public void setNearestAttractions(NearestAttractions nearestAttractions) {
		this.nearestAttractions = nearestAttractions;
	}
	public UpcomingEvents getUpcomingEvents() {
		return upcomingEvents;
	}
	public void setUpcomingEvents(UpcomingEvents upcomingEvents) {
		this.upcomingEvents = upcomingEvents;
	}
	public Counter getCounter() {
		return counter;
	}
	public void setCounter(Counter counter) {
		this.counter = counter;
	}
}
