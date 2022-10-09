package io.github.kavishkamk.springDemoOne;

public class TrackCoach implements Coach {
	
	private FortuneService fortuneService;

	public TrackCoach(FortuneService fortuneService) {
		this.fortuneService = fortuneService;
	}

	@Override
	public String getDailyWorkout() {
		return "Track coach";
	}

	@Override
	public String getFortuneServise() {
		return fortuneService.getFortune();
	}
	
	public void doMyStartupStuff() {
		System.out.println("inside method doMyStartupStuff");
	}
	
	public void doMyCleanupStuff() {
		System.out.println("inside method doMyCleanupStuff");
	}

}
