package sg.com.sghack.data.v2;

import java.util.List;

public class AllData {
	private String beaconid;
	private Bus bus;
	private List<Attraction> nattractions;
	private List<Event> nevents;
	private List<Amenity> amenities;
	private List<Restaurant> neat;
	public String getBeaconid() {
		return beaconid;
	}
	public void setBeaconid(String beaconid) {
		this.beaconid = beaconid;
	}
	public Bus getBus() {
		return bus;
	}
	public void setBus(Bus bus) {
		this.bus = bus;
	}
	public List<Attraction> getNattractions() {
		return nattractions;
	}
	public void setNattractions(List<Attraction> nattractions) {
		this.nattractions = nattractions;
	}
	public List<Event> getNevents() {
		return nevents;
	}
	public void setNevents(List<Event> nevents) {
		this.nevents = nevents;
	}
	public List<Amenity> getAmenities() {
		return amenities;
	}
	public void setAmenities(List<Amenity> amenities) {
		this.amenities = amenities;
	}
	public List<Restaurant> getNeat() {
		return neat;
	}
	public void setNeat(List<Restaurant> neat) {
		this.neat = neat;
	}
}
