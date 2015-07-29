package sg.com.sghack.data.v2;

public class Restaurant {
	private String name;
	private int loc;
	private String img;
	private String sdesc;
	private int cwd;
	private String col;
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
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	public String getSdesc() {
		return sdesc;
	}
	public void setSdesc(String sdesc) {
		this.sdesc = sdesc;
	}
	public int getCwd() {
		return cwd;
	}
	public void setCwd(int cwd) {
		this.cwd = cwd;
	}
	public String getCol() {
		return col;
	}
	public void setCol(String col) {
		this.col = col;
	}
}
