package sg.com.sghack.data.v2.mocks;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import sg.com.sghack.data.v2.Attraction;
import sg.com.sghack.main.MainController;

public class NearestAttractionsMock {
	private static Attraction universalStudios;
	private static Attraction madameTussads;
	private static Attraction seaAquarium;
	private static Attraction skylineLuge;
	private static Attraction trickEyeMuseum;
	private static Attraction adventureCoveWaterpark;
	private static Attraction skyTower;
	private static Attraction insectKingdom;
	private static Attraction adventureLand4D;
	private static Attraction portOfLostWonder;
	private static Attraction megazipAdventurePark;
	private static Attraction underWaterWorld;
	private static Attraction fortSiloso;
	private static Attraction iFlySingapore;
	private static Attraction southernmostPoint;
	
	private static final int MAX_CROWD = 500;
	private static Logger log = LoggerFactory.getLogger(NearestAttractionsMock.class.getName());
	
	private static void init() {
		Random rand = new Random();
		int cwd;
		String col;
		//universal studios
		cwd = rand.nextInt(MAX_CROWD);
		col = (cwd < 350) ? "green" : "red";
		universalStudios = new Attraction();
		universalStudios.setCol(col);
		universalStudios.setCwd(cwd);
		universalStudios.setImg("http://192.168.1.8:8080/universal-studios.jpg");
		universalStudios.setSdesc("Movie amusement park with sets & rides on themes from Hollywood to sci-fi, plus live entertainment.");
		universalStudios.setLdesc("Universal Studios Singapore is a theme park located within Resorts World Sentosa on Sentosa Island, Singapore. It was a key component of Genting's bid for the right to build Singapore's second integrated resort. On 8 December 2006, the Singapore government announced that the consortium had won the bid. Construction of the theme park and the rest of the resort started on 19 April 2007. It is the second Universal Studios theme park to open in Asia (Japan being the first), and the first in Southeast Asia. The official plans for the park were unveiled to the public when Universal Studios Singapore released a park map to the public on 20 October 2009.[1] Universal Studios Singapore has since attracted more than 2 million visitors in the 9 months from its opening.");
		universalStudios.setName("Universal Studios Singapore");
		universalStudios.setLoc(15);
		
		//madame tussads
		cwd = rand.nextInt(MAX_CROWD);
		col = (cwd < 200) ? "green" : "red";
		madameTussads = new Attraction();
		madameTussads.setCol(col);
		madameTussads.setCwd(cwd);
		madameTussads.setImg("http://192.168.1.8:8080/madame-tussauds.jpg");
		madameTussads.setSdesc("Madame Tussauds is a wax museum which was founded by wax sculptor Marie Tussaud and was formerly known as \"Madame Tussaud's\"; the apostrophe is no longer used.");
		madameTussads.setLdesc("Bringing our unique blend of glitz and glamour, Madame Tussauds Singapore will take you to a party like no other! With 8 fully themed interactive zones and the new \"Spirit of Singapore\" boat ride, get ready to photograph and pose with your favourite A-Listers, challenge sports stars, hop on stage with music legends and come face to face with international icons from Singapore, Asia and beyond.Sports - Fast paced and interactive, the sports zone let you challenge your sporting heroes from the world of basketball, table tennis and football and boxing. Don’t forget to play the hoops in our basketball zone and challenge football starts in our penalty zone!Music - Meet legends from past and present, jump on stage and join the band, perform with Lady Gaga and master the Jackson lean!Film - Film starts with the romance and elegance of early classic Hollywood before the theming turns into a movie studio backlot! Movie cameras, lighting rigs and much more will give you the illusion that you are amongst a real movie set!A-List - Pose for the paparazzi and get ready to socialise with the A-List on the red carpet, including Hollywood favourites Angelina Jolie and Brad Pitt. Mingle with many more celebrities from Singapore and beyond!");
		madameTussads.setName("Madame Tussads");
		madameTussads.setLoc(25);
		
		//sea aquarium
		cwd = rand.nextInt(MAX_CROWD);
		col = (cwd < 200) ? "green" : "red";
		
		//skyline luge
		cwd = rand.nextInt(MAX_CROWD);
		col = (cwd < 200) ? "green" : "red";
		
		//trick eye museum
	}
	
	public static List<Attraction> getSetOne() {
		init();
		List<Attraction> list = new ArrayList<Attraction>();
		list.add(universalStudios);
		list.add(madameTussads);
		return list;
	}
	
	public static List<Attraction> getSetTwo() {
		return null;
	}
	
	public static List<Attraction> getSetThree() {
		return null;
	}
}
