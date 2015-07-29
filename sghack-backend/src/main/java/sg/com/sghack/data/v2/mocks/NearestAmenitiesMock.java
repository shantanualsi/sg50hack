package sg.com.sghack.data.v2.mocks;

import java.util.ArrayList;
import java.util.List;

import sg.com.sghack.data.v2.Amenity;

public class NearestAmenitiesMock {
	private static Amenity water1;
	private static Amenity water2;
	private static Amenity water3;
	private static Amenity toilet1;
	private static Amenity toilet2;
	private static Amenity toilet3;
	
	private static void init() {
		water1 = new Amenity("Water Spring", 5);
		water2 = new Amenity("Water Spring", 10);
		water3 = new Amenity("Water Spring", 15);
		toilet1 = new Amenity("Toilet", 5);
		toilet2 = new Amenity("Toilet", 10);
		toilet3 = new Amenity("Toilet", 15);
	}
	
	public static List<Amenity> getSetOne() {
		init();
		List<Amenity> list = new ArrayList<Amenity>();
		list.add(toilet1);
		list.add(water3);
		return list;
	}
	
	public static List<Amenity> getSetTwo() {
		init();
		List<Amenity> list = new ArrayList<Amenity>();
		list.add(toilet2);
		list.add(water1);
		return list;
	}
	
	public static List<Amenity> getSetThree() {
		init();
		List<Amenity> list = new ArrayList<Amenity>();
		list.add(toilet3);
		list.add(water2);
		return list;
	}
}
