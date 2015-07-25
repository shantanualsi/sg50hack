package sg.com.sghack.data;

import java.util.List;

import sg.com.sghack.mocks.NearestAttractionsMock;

public class NearestAttractions {
	private List<Location> nearestAttractionsList = null;
	
	public NearestAttractions(String beaconid) {
		nearestAttractionsList = NearestAttractionsMock.getNearestLocations(beaconid);
	}

	public List<Location> getNearestAttractionsList() {
		return nearestAttractionsList;
	}

	public void setNearestAttractionsList(List<Location> nearestAttractionsList) {
		this.nearestAttractionsList = nearestAttractionsList;
	}
}
