package sg.com.sghack.data.v2;

public class Amenity {
	private String name;
	private int loc;
	
	public Amenity() {}
	
	public Amenity(String name, int loc) {
		this.name = name;
		this.loc = loc;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getLoc() {
		return loc;
	}
	public void setLoc(int loc) {
		this.loc = loc;
	}
	
	
}
