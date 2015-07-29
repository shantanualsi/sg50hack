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
		res1.setImg("http://i488.photobucket.com/albums/rr247/kevin-sg/Universal%20Studios%20Singapore%2022-March-2010/P1030579.jpg");
		res1.setName("Discovery food court");
		res1.setSdesc("Khana khane ki jagah");
		res1.setLoc(40);
		
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
		res1.setImg("http://i488.photobucket.com/albums/rr247/kevin-sg/Universal%20Studios%20Singapore%2022-March-2010/P1030579.jpg");
		res1.setName("Discovery food court");
		res1.setSdesc("Khana khane ki jagah");
		res1.setLoc(40);
		
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
		res1.setImg("http://i488.photobucket.com/albums/rr247/kevin-sg/Universal%20Studios%20Singapore%2022-March-2010/P1030579.jpg");
		res1.setName("Discovery food court");
		res1.setSdesc("Khana khane ki jagah");
		res1.setLoc(40);
		
		List<Restaurant> list = new ArrayList<Restaurant>();
		list.add(res1);
		return list;
	}
 }
