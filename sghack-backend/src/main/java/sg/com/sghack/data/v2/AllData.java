package sg.com.sghack.data.v2;

import java.util.List;

import sg.com.sghack.data.v2.mocks.NearestAmenitiesMock;
import sg.com.sghack.data.v2.mocks.NearestAttractionsMock;
import sg.com.sghack.data.v2.mocks.NearestBusMock;
import sg.com.sghack.data.v2.mocks.NearestRestaurantsMock;

public class AllData {
	private int beaconid;
	private Bus bus;
	private List<Attraction> nattractions;
	private List<Event> nevents;
	private List<Amenity> namenities;
	private List<Restaurant> neat;
	
	public AllData(int beaconid) {
		this.beaconid = beaconid;
		
		if (beaconid == 1) {
			nattractions = NearestAttractionsMock.getSetOne();
			namenities = NearestAmenitiesMock.getSetOne();
			bus = NearestBusMock.getSetOne();
			neat = NearestRestaurantsMock.getSetOne();
		} else if (beaconid == 2) {
			nattractions = NearestAttractionsMock.getSetTwo();
			namenities = NearestAmenitiesMock.getSetTwo();
			bus = NearestBusMock.getSetTwo();
			neat = NearestRestaurantsMock.getSetTwo();
		} else {
			nattractions = NearestAttractionsMock.getSetThree();
			namenities = NearestAmenitiesMock.getSetThree();
			bus = NearestBusMock.getSetThree();
			neat = NearestRestaurantsMock.getSetThree();
		}
		
	}
	
	public int getBeaconid() {
		return beaconid;
	}
	public void setBeaconid(int beaconid) {
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
		return namenities;
	}
	public void setAmenities(List<Amenity> namenities) {
		this.namenities = namenities;
	}
	public List<Restaurant> getNeat() {
		return neat;
	}
	public void setNeat(List<Restaurant> neat) {
		this.neat = neat;
	}
}
