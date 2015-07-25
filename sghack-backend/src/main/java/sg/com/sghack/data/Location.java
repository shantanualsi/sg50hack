package sg.com.sghack.data;

public class Location {
	private String name;
	private double latitude;
	private double longitude;
	
	public Location() {}
	
	public Location(String name, double latitude, double longitude) {
		setName(name);
		setLatitude(latitude);
		setLongitude(longitude);
	}
	
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
}
