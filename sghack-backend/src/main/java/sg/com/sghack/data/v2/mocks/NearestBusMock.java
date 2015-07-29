package sg.com.sghack.data.v2.mocks;

import java.util.Random;

import sg.com.sghack.data.v2.Bus;

public class NearestBusMock {
	
	private static final int BUS_CAPACITY = 30;
	
	public static Bus getSetOne() {
		Random rand = new Random();
		return new Bus("Imbiah Lookout", 2, rand.nextInt(BUS_CAPACITY));
	}
	
	public static Bus getSetTwo() {
		Random rand = new Random();
		return new Bus("Artillery avenue", 9, rand.nextInt(BUS_CAPACITY));
	}
	
	public static Bus getSetThree() {
		Random rand = new Random();
		return new Bus("Merlion", 7, rand.nextInt(BUS_CAPACITY));
	}
	
}
