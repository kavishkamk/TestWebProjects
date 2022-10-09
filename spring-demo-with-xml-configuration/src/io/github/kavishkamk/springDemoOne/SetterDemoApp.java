package io.github.kavishkamk.springDemoOne;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SetterDemoApp {

	public static void main(String[] args) {
		
		ClassPathXmlApplicationContext context = 
				new ClassPathXmlApplicationContext("applicationContext.xml");
		
		CricketCoach theCoach = context.getBean("myCricketCoach", CricketCoach.class);
		
		System.out.println(theCoach.getDailyWorkout());
		System.out.println(theCoach.getFortuneServise());
		System.out.println(theCoach.getEmail());
		System.out.println(theCoach.getTeamName());
		
		context.close();

	}

}
