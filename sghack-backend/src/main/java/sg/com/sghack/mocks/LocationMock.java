package sg.com.sghack.mocks;

import java.util.ArrayList;
import java.util.List;

import sg.com.sghack.data.v1.Location;

public class LocationMock {
	
	//Attractions
	private static Location l1 = new Location("Marine Life Park", 26269.24, 26811.96, "Marine Life Park is a part of Resorts World Sentosa, Sentosa, situated in southern Singapore. The 8-hectare park houses two attractions, the S.E.A Aquarium and the Adventure Cove Waterpark, and features the largest oceanarium in the world.");
	private static Location l2 = new Location("Maritime Experimental Museum", 26570.71, 26773.8, "The Maritime Experiential Museum, formerly the Maritime Xperiential Museum and the Maritime Experiential Museum & Aquarium, is a museum in Resorts World Sentosa, Sentosa, Singapore, built to house the Jewel of Muscat and some of the 60,000 artefacts salvaged from the Belitung shipwreck, an Arabian dhow wrecked off the coast of Belitung Island.");
	private static Location l3 = new Location("Equarius water park", 26288.36, 26683.15, "Aquatic amusement park with an aquarium, waterslides, a wave pool, tubing, snorkeling & more.");
	//private static Location l4 = new Location("Dolphin Lagoon", 27074.89, 25504.29);
	private static Location l5 = new Location("Underwater world Singapore", 25614.17, 26803.3, "Underwater World, also known as Underwater World Singapore Pte Ltd, is an oceanarium located on the offshore Singaporean island of Sentosa. Opened in 1991, it has more than 2,500 marine animals of 250 species from different regions of the world.");
	private static Location l6 = new Location("Skyline Luge Singapore", 26176.24, 26085.66, "Skyline Luge Sentosa is a luge located in Sentosa, Singapore. The attraction opened in the second half of 2005. The luge, situated on the Imbiah Lookout cluster opposite the Tiger Sky Tower, has two tracks.");
	private static Location l7 = new Location("Wings of time", 26199.99, 26004, "End your day at Sentosa with the Award Winning Outdoor Night Show in the world set against the majestic open sea. Be mesmerized by a multi-sensory presentation of water display, laser show, fire effects and spectacular music as you soar through space and time in a magical adventure.");
	private static Location l8 = new Location("iFly Singapore", 26248.96, 26082.55, "Experience the thrill of skydiving without any of the danger. Take up the whole new sport of bodyflying with iFly Singapore, the world's largest themed wind tunnel for indoor skydiving");
	
	//Beacons
	private static Location b1 = new Location("Next to Hard Rock Hotel", 26400.64, 26794.64, ""); //Nearest attractions are l1, l2, l3
	private static Location b2 = new Location("Imbiah walk, Siloso Road", 25744.95, 26762.99, ""); //Nearest attraction is l5
	private static Location b3 = new Location("Beach arrival plaza", 26312.04, 26032.32, ""); // Nearest attractions are l6, l7, l8
	
	private static void setImageUrls() {
		l1.setImageUrl("http://www.citytours.sg/images/Shark%20Seas.jpg");
		l2.setImageUrl("http://www.yoursingapore.com/content/traveller/en/browse/see-and-do/family-fun/attraction/maritime-experiential-museum/_jcr_content/html/image.img.png");
		l3.setImageUrl("http://4.bp.blogspot.com/-ytuLh_3rCzg/TyqxA58BVcI/AAAAAAAAMX0/wRh5JmzLMKo/s640/18+Taking+a+Daytime+Ride+on+Singapore+Cable+Car+%2540+The+Jewel+Box+%255BMount+Faber%255D%252C+Singapore+%2528Large%2529.jpg");
		l5.setImageUrl("http://i.ytimg.com/vi/OC27f7jJgt4/maxresdefault.jpg");
		l6.setImageUrl("http://www.skylineluge.com/content/images/959/LugeHeader2011/Skyline_Luge_Main_Banner.jpg");
		l7.setImageUrl("http://www.jnlvacation.com/wp-content/uploads/2014/10/Sentosa-WingsofTime-visual-web-zps9fd29572.jpg");
		l8.setImageUrl("http://static.sg.groupon-content.net/87/56/1315629225687.jpg");
	}
	
	public static List<Location> getSetOne() {
		setImageUrls();
		List<Location> list = new ArrayList<Location>();
		list.add(l1);
		list.add(l2);
		list.add(l3);
		return list;
	}
	
	public static List<Location> getSetTwo() {
		setImageUrls();
		List<Location> list = new ArrayList<Location>();
		list.add(l5);
		return list;
	}
	
	public static List<Location> getSetThree() {
		setImageUrls();
		List<Location> list = new ArrayList<Location>();
		list.add(l6);
		list.add(l7);
		list.add(l8);
		return list;
	}
	
	public static Location getBeaconInfo(String beaconid) {
		if (beaconid.equals("beacon1")) {
			return b1;
		} else if (beaconid.equals("beacon2")) {
			return b2;
		} else if (beaconid.equals("beacon3")) {
			return b3;
		} else {
			return null;
		}
	}
	
}
