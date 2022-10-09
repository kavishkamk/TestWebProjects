package io.github.kavishkamk.springdemo;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class SwimgJavaConfigurationDemoApp {

	public static void main(String[] args) {
		
		AnnotationConfigApplicationContext context = 
				new AnnotationConfigApplicationContext(SportConfig.class);
		
		SwimCoach theCoach = context.getBean("swimCoach", SwimCoach.class);
		
		System.out.println(theCoach.getDailyWorkout());
		System.out.println(theCoach.getDailyFortune());
		System.out.println(theCoach.getName());
		System.out.println(theCoach.getEmail());
		
		context.close();
		
	}

}
