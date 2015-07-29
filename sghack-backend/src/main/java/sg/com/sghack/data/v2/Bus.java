package sg.com.sghack.data.v2;

public class Bus {
	private String name;
	private int nbus;
	private int cwd;
	
	public Bus() {}
	
	public Bus(String name, int nbus, int cwd) {
		this.nbus = nbus;
		this.name = name;
		this.cwd = cwd;
	}
	
	public int getNbus() {
		return nbus;
	}
	public void setNbus(int nbus) {
		this.nbus = nbus;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getCwd() {
		return cwd;
	}
	public void setCwd(int cwd) {
		this.cwd = cwd;
	}
}
