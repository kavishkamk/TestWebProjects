package io.github.kavishkamk.springDemoOne;

public class CricketCoach implements Coach {
	
	private FortuneService fortuneService;
	
	private String email;
	private String teamName;

	public void setFortuneService(FortuneService fortuneService) {
		this.fortuneService = fortuneService;
	}

	@Override
	public String getDailyWorkout() {
		return "Cricket coach working";
	}

	@Override
	public String getFortuneServise() {
		return fortuneService.getFortune();
	}
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTeamName() {
		return teamName;
	}

	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}

}
