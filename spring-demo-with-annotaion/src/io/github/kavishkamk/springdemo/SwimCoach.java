package io.github.kavishkamk.springdemo;

import org.springframework.beans.factory.annotation.Value;

public class SwimCoach implements Coach {
	
	private FortuneService fortuneService;
	
	@Value("${foo.name}")
	private String name;
	
	@Value("${foo.email}")
	private String email;

	public SwimCoach(FortuneService fortuneService) {
		super();
		this.fortuneService = fortuneService;
	}

	@Override
	public String getDailyWorkout() {
		return "Swimg 1000 meaters as workup";
	}

	@Override
	public String getDailyFortune() {
		return fortuneService.getFortune();
	}

	public String getName() {
		return name;
	}

	public String getEmail() {
		return email;
	}

}
