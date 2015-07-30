package sg.com.sghack.data.v2.mocks;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import sg.com.sghack.data.v2.Restaurant;

public class NearestRestaurantsMock {
	
	private static final int MAX_CROWD = 80;
	
	public static List<Restaurant> getSetOne() {
		Random rand = new Random();
		int cwd = rand.nextInt(MAX_CROWD);
		String col = (cwd < 35) ? "green": "red";
		
		Restaurant res1 = new Restaurant();
		res1.setCwd(cwd);
		res1.setCol(col);
		res1.setImg("martysUSS1.jpg");
		res1.setName("Marty's Casa Del Wild™ Food Court");
		res1.setSdesc("A variety of Southeast Asian favorites such as our mouth-watering satay, Tom Yum Gai, tender-juicy roasted chicken, vegetarian specials and more.");
		res1.setLoc(40);
		res1.setTim("11am - 6.30pm");
		
		List<Restaurant> list = new ArrayList<Restaurant>();
		list.add(res1);
		return list;
	}
	
	public static List<Restaurant> getSetTwo() {
		Random rand = new Random();
		int cwd = rand.nextInt(MAX_CROWD);
		String col = (cwd < 35) ? "green": "red";
		
		Restaurant res1 = new Restaurant();
		res1.setCwd(cwd);
		res1.setCol(col);
		res1.setImg("P1030579.jpg");
		res1.setName("Discovery food court");
		res1.setSdesc("Savour Singapore's best selection of local delights in the building that was featured in the original Jurassic Park movie. Beware of ferocious dinosuars!");
		res1.setLoc(40);
		res1.setTim("11am - 7pm");
		
		List<Restaurant> list = new ArrayList<Restaurant>();
		list.add(res1);
		return list;
	}
	
	public static List<Restaurant> getSetThree() {
		Random rand = new Random();
		int cwd = rand.nextInt(MAX_CROWD);
		String col = (cwd < 35) ? "green": "red";
		
		Restaurant res1 = new Restaurant();
		res1.setCwd(cwd);
		res1.setCol(col);
		res1.setImg("msiafoodstreet.jpg");
		res1.setName("Malaysian Food Street");
		res1.setSdesc("Malaysian Food Street is one dining destination not to be missed! We created a unique old-town ambience to flavour the experience of indulging in some of Malaysia's finest and famous hawker fare.");
		res1.setLoc(40);
		res1.setTim("9am - 11pm");
		
		List<Restaurant> list = new ArrayList<Restaurant>();
		list.add(res1);
		return list;
	}
 }
