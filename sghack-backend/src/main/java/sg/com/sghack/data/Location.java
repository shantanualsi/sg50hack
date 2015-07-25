package sg.com.sghack.data;

public class Location {
	private String name;
	private double latitude;
	private double longitude;
	private String description;
	private String imageUrl;
	
	public Location() {}
	
	public Location(String name, double latitude, double longitude, String description) {
		setName(name);
		setLatitude(latitude);
		setLongitude(longitude);
		setDescription(description);
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
}
