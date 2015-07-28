package sg.com.sghack.data.v1;

public class AllData {
	private NearestAttractions nearestAttractions;
	private UpcomingEvents upcomingEvents;
	private Counter counter;
	private Beacon beacon;
	
	public AllData(String beaconid) {
		setNearestAttractions(new NearestAttractions(beaconid));
		setUpcomingEvents(new UpcomingEvents(beaconid));
		setCounter(new Counter(beaconid));
		setBeacon(new Beacon(beaconid));
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

	public Beacon getBeacon() {
		return beacon;
	}

	public void setBeacon(Beacon beacon) {
		this.beacon = beacon;
	}
}
