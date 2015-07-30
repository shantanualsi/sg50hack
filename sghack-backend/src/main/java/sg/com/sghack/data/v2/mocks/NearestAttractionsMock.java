package sg.com.sghack.data.v2.mocks;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import sg.com.sghack.data.v2.Attraction;

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
//	private static Attraction portOfLostWonder;
//	private static Attraction megazipAdventurePark;
//	private static Attraction underWaterWorld;
//	private static Attraction fortSiloso;
//	private static Attraction iFlySingapore;
//	private static Attraction southernmostPoint;
	
	private static final int MAX_CROWD = 500;
//	private static Logger log = LoggerFactory.getLogger(NearestAttractionsMock.class.getName());
	
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
		universalStudios.setImg("universal-studios.jpg");
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
		madameTussads.setImg("madame-tussauds.jpg");
		madameTussads.setSdesc("Madame Tussauds is a wax museum which was founded by wax sculptor Marie Tussaud and was formerly known as \"Madame Tussaud's\"; the apostrophe is no longer used.");
		madameTussads.setLdesc("Bringing our unique blend of glitz and glamour, Madame Tussauds Singapore will take you to a party like no other! With 8 fully themed interactive zones and the new \"Spirit of Singapore\" boat ride, get ready to photograph and pose with your favourite A-Listers, challenge sports stars, hop on stage with music legends and come face to face with international icons from Singapore, Asia and beyond.Sports - Fast paced and interactive, the sports zone let you challenge your sporting heroes from the world of basketball, table tennis and football and boxing. Don’t forget to play the hoops in our basketball zone and challenge football starts in our penalty zone!Music - Meet legends from past and present, jump on stage and join the band, perform with Lady Gaga and master the Jackson lean!Film - Film starts with the romance and elegance of early classic Hollywood before the theming turns into a movie studio backlot! Movie cameras, lighting rigs and much more will give you the illusion that you are amongst a real movie set!A-List - Pose for the paparazzi and get ready to socialise with the A-List on the red carpet, including Hollywood favourites Angelina Jolie and Brad Pitt. Mingle with many more celebrities from Singapore and beyond!");
		madameTussads.setName("Madame Tussads");
		madameTussads.setLoc(25);
		
		//sea aquarium
		cwd = rand.nextInt(MAX_CROWD);
		col = (cwd < 200) ? "green" : "red";
		seaAquarium = new Attraction();
		seaAquarium.setCol(col);
		seaAquarium.setCwd(cwd);
		seaAquarium.setImg("sea-aquarium.jpg");
		seaAquarium.setSdesc("Begin the journey by travelling back in time to discover Asia's maritime heritage at The Maritime Experiential Museum™. Then enter and explore the marine realm of S.E.A. Aquarium™, home to more than 100,000 marine animals of over 800 species, across into 49 different habitats, each one as fascinating as the next. It's an experience you won’t forget.");
		seaAquarium.setLdesc("Discover the awe-inspiring world of life in the ocean at the world’s largest aquarium. Step into S.E.A. Aquarium and immerse yourself in a magical marine world seen through our planet’s largest window to the ocean. With more than 800 species of marine animals, the aquarium is home to majestic manta rays, enormous goliath grouper, napoleon wrasse, and other gentle giants of the sea. Come face-to-face with over 200 sharks and uncover the centuries of myths about these ocean predators. Sneak a peek at a moray eel in a rocky crevice or tour an underwater reef community. Discover and unfold the endless wonders of our blue planet at S.E.A. Aquarium.");
		seaAquarium.setName("S.E.A. Aquarium");
		seaAquarium.setLoc(42);
		
		//skyline luge
		cwd = rand.nextInt(MAX_CROWD-100);
		col = (cwd < 200) ? "green" : "red";
		skylineLuge = new Attraction();
		skylineLuge.setCol(col);
		skylineLuge.setCwd(cwd);
		skylineLuge.setImg("skyline-luge.jpg");
		skylineLuge.setSdesc("Skyline Luge Sentosa is a luge located in Sentosa, Singapore. The attraction opened in the second half of 2005. The luge, situated on the Imbiah Lookout cluster opposite the Tiger Sky Tower, has two tracks.");
		skylineLuge.setLdesc("Skyline Luge Sentosa is a luge located in Sentosa, Singapore. The attraction opened in the second half of 2005. The luge, situated on the Imbiah Lookout cluster opposite the Tiger Sky Tower, has two tracks. The older one is called the Jungle Trail (628 metres (2,060 ft)) and the newer one the Dragon Trail (688 metres (2,257 ft)). The luge is a self-driving car system in which riders control the speed by pushing a pair of handlebars back and forth. The luge ride goes downhill, relying on gravitational pull to move. After the ride, the Skyride using chairlifts brings riders, luge carts, and the helmets back to the starting point. The Skyride is similar to a ski lift.");
		skylineLuge.setName("Skyline Luge");
		skylineLuge.setLoc(30);
		
		//trick eye museum
		cwd = rand.nextInt(MAX_CROWD-150);
		col = (cwd < 250) ? "green" : "red";
		trickEyeMuseum = new Attraction();
		trickEyeMuseum.setCol(col);
		trickEyeMuseum.setCwd(cwd);
		trickEyeMuseum.setImg("trick-eye-museum.jpg");
		trickEyeMuseum.setSdesc("Trick Eye Museum is finally here in Singapore. Get ready to let your imagination march into a miraculous dimension of original 3D artworks.");
		trickEyeMuseum.setLdesc("Trick Eye is short for ‘Trick of the eye’, which refers to an art technique that turns two-dimensional paintings into three-dimensional images through the use of optical illusions. With that, 2D paintings on the museum walls, floors and ceilings appear to pop out of the surface and come to life. Visitors are more than welcome to explore the various themed galleries with their eyes, hands and even cameras. Step inside the paintings to complete a visual narrative with your creative poses, and watch a “tricky” story unfold before your camera. At Trick Eye Museum, you’ll be creating unforgettable memories with friends and family amid fun and laughter, with a dash of educational and cultural enrichment.");
		trickEyeMuseum.setName("Trick Eye Museum");
		trickEyeMuseum.setLoc(20);
		
		//adventure cove waterpark
		cwd = rand.nextInt(MAX_CROWD+200);
		col = (cwd < 400) ? "green" : "red";
		adventureCoveWaterpark = new Attraction();
		adventureCoveWaterpark.setCol(col);
		adventureCoveWaterpark.setCwd(cwd);
		adventureCoveWaterpark.setImg("adventure-cove-waterpark.jpg");
		adventureCoveWaterpark.setSdesc("Promising endless splashes of fun, Adventure Cove Waterpark is an aquatic adventure park with something for everyone.");
		adventureCoveWaterpark.setLdesc("Feel the adrenaline rush as you zoom down thrilling waterslides such as Southeast Asia’s first hydro-magnetic coaster. Chill out with friends at Bluwater Bay wave pool, or grab a tube and journey down Adventure River, passing through 14 stunning scenes including a tropical jungle garden and a grotto inhabited by whimsical sea creatures. Snorkel over a colourful coral reef with 20,000 friendly fish or wade amongst dozens of rays as you touch their velvety wings. For a day of wet and wild fun in the sun, come and experience it all at Adventure Cove Waterpark.");
		adventureCoveWaterpark.setName("Adventure cove waterpark");
		adventureCoveWaterpark.setLoc(70);
		
		//tiger sky tower
		cwd = rand.nextInt(40);
		col = (cwd < 20) ? "green" : "red";
		skyTower = new Attraction();
		skyTower.setCol(col);
		skyTower.setCwd(cwd);
		skyTower.setImg("tiger-sky-tower.jpg");
		skyTower.setSdesc("The Tiger Sky Tower, previously known as Carlsberg Sky Tower, is the highest observation tower in Singapore. It is located in the Imbiah Lookout zone in the centre of Sentosa Island. ");
		skyTower.setLdesc("The Tiger Sky Tower, previously known as Carlsberg Sky Tower, is the highest observation tower in Singapore. It is located in the Imbiah Lookout zone in the centre of Sentosa Island. The tower has a height of 110 metres (360 ft) above ground level, or about 36 floors tall — and an elevation of 131 metres (430 ft) above sea level. The tower was completed in 2004, and is owned by C. Melchers GmbH & Co.");
		skyTower.setName("Tiger sky tower");
		skyTower.setLoc(25);
		
		//butterfly park and insect kingdom
		cwd = rand.nextInt(MAX_CROWD);
		col = (cwd < 250) ? "green" : "red";
		insectKingdom = new Attraction();
		insectKingdom.setCol(col);
		insectKingdom.setCwd(cwd);
		insectKingdom.setImg("butterfly-park-and-insect-kingdom.jpg");
		insectKingdom.setSdesc("Stroll through the lush surrounds of the Butterfly Park & Insect Kingdom and allow 1,500 live butterflies – from over 50 species – to flutter about you as you enjoy the cool outdoor conservatory.");
		insectKingdom.setLdesc("Surrounded with lush tropical greenery, Butterfly Park & Insect Kingdom showcases the stunning beauties of mother nature. With a great variety of fluttering butterflies and exotic insects, this tamed wilderness is sure to delight you. A must-see outdoor experience for children, tourists and nature lovers alike, Butterfly Park & Insect Kingdom has wowed visitors from all over the world. With the scents, sights and sounds of an authentic tropical rainforest, it's a multi-sensory, interactive experience that's guaranteed to engage you from start to finish.");
		insectKingdom.setName("Butterfly park and insect kingdom");
		insectKingdom.setLoc(23);
		
		//4D adventure land
		cwd = rand.nextInt(MAX_CROWD-300);
		col = (cwd < 50) ? "green" : "red";
		adventureLand4D = new Attraction();
		adventureLand4D.setCol(col);
		adventureLand4D.setCwd(cwd);
		adventureLand4D.setImg("adventureland-4d.jpg");
		adventureLand4D.setSdesc("Home to UNLIMITED FUN! Go on in an immersive 4-D movie, Journey 2: The Mysterious Island, The 4-D Experience.");
		adventureLand4D.setLdesc("Hang On Tight as you ride on a virtual 4-D roller coaster “Extreme Log Ride” and Grab a motion-sensor pistol, aim and fire at Asia’s first 4-D Interactive Shoot-Out game happening at “Desperados”. ");
		adventureLand4D.setName("4D Adventure Land");
		adventureLand4D.setLoc(41);
		
	}
	
	public static List<Attraction> getSetOne() {
		init();
		List<Attraction> list = new ArrayList<Attraction>();
		list.add(universalStudios);
		list.add(seaAquarium);
		list.add(adventureCoveWaterpark);
		return list;
	}
	
	public static List<Attraction> getSetTwo() {
		init();
		List<Attraction> list = new ArrayList<Attraction>();
		list.add(madameTussads);
		list.add(skylineLuge);
		list.add(insectKingdom);
		list.add(adventureLand4D);
		return list;
	}
	
	public static List<Attraction> getSetThree() {
		init();
		List<Attraction> list = new ArrayList<Attraction>();
		list.add(skyTower);
		list.add(trickEyeMuseum);
		return list;
	}
}
