package sg.com.sghack.data.v1.mocks;

import java.util.List;

import sg.com.sghack.data.v1.Location;

public class NearestAttractionsMock {
	
	public static List<Location> getNearestLocations(String beaconid) {
		if (beaconid.equals("beacon1")) {
			return LocationMock.getSetOne();
		} else if (beaconid.equals("beacon2")) {
			return LocationMock.getSetTwo();
		} else if (beaconid.equals("beacon3")) {
			return LocationMock.getSetThree();
		} else {
			return null;
		}
	}
}
