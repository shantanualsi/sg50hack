package sg.com.sghack.data;

public class Counter {
	private long count;
	
	public Counter(String beaconid) {
		System.out.println(beaconid);
		setCount(VisitorCount.getCounter(beaconid));
	}

	public long getCount() {
		return count;
	}

	public void setCount(long count) {
		this.count = count;
	}
}
