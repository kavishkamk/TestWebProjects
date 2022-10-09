package io.github.kavishkamk.springdemo;

public class SadFortuneService implements FortuneService {

	@Override
	public String getFortune() {
		return "This is sad fortune service";
	}

}
