package io.github.kavishkamk.springDemoOne;

public class BaseballCoach implements Coach {
	
	private FortuneService fortuneService;
	
	public BaseballCoach(FortuneService fortuneService) {
		this.fortuneService = fortuneService;
	}

	@Override
	public String getDailyWorkout() {
		return "Working.....";
	}

	@Override
	public String getFortuneServise() {
		return fortuneService.getFortune();
	}

}
