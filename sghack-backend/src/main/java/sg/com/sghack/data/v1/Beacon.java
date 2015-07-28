package sg.com.sghack.data.v1;

import sg.com.sghack.mocks.LocationMock;

public class Beacon {
	private Location beacon;
	
	public Beacon(String beaconid) {
		setBeacon(LocationMock.getBeaconInfo(beaconid));
	}

	public Location getBeacon() {
		return beacon;
	}

	public void setBeacon(Location beacon) {
		this.beacon = beacon;
	}
	
}
