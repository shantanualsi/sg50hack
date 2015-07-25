package sg.com.sghack.mocks;

import java.util.ArrayList;
import java.util.List;

import sg.com.sghack.data.Location;

public class LocationMock {
	
	//Attractions
	private static Location l1 = new Location("Marine Life Park", 26269.24, 26811.96);
	private static Location l2 = new Location("Maritime Experimental Museum", 26570.71, 26773.8);
	private static Location l3 = new Location("Equarius water park", 26288.36, 26683.15);
	//private static Location l4 = new Location("Dolphin Lagoon", 27074.89, 25504.29);
	private static Location l5 = new Location("Underwater world Singapore", 25614.17, 26803.3);
	private static Location l6 = new Location("Skyline Luge Singapore", 26176.24, 26085.66);
	private static Location l7 = new Location("Wings of time", 26199.99, 26004);
	private static Location l8 = new Location("iFly Singapore", 26248.96, 26082.55);
	
	//Beacons
	//private static Location b1 = new Location("beacon1", 26400.64, 26794.64); //Nearest attractions are l1, l2, l3
	//private static Location b2 = new Location("beacon2", 25744.95, 26762.99); //Nearest attraction is l5
	//private static Location b3 = new Location("beacon3", 26312.04, 26032.32); // Nearest attractions are l6, l7, l8
	
	public static List<Location> getSetOne() {
		List<Location> list = new ArrayList<Location>();
		list.add(l1);
		list.add(l2);
		list.add(l3);
		return list;
	}
	
	public static List<Location> getSetTwo() {
		List<Location> list = new ArrayList<Location>();
		list.add(l5);
		return list;
	}
	
	public static List<Location> getSetThree() {
		List<Location> list = new ArrayList<Location>();
		list.add(l6);
		list.add(l7);
		list.add(l8);
		return list;
	}
	
}
