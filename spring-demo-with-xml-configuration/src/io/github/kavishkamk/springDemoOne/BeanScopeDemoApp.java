package io.github.kavishkamk.springDemoOne;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class BeanScopeDemoApp {

	public static void main(String[] args) {
		ClassPathXmlApplicationContext context =
				new ClassPathXmlApplicationContext("beanScope-applicationContext.xml");
		
		Coach theCoach = context.getBean("myCoach", Coach.class);
		Coach betaCoach = context.getBean("myCoach", Coach.class);
		System.out.println(theCoach == betaCoach);
		System.out.println(theCoach);
		System.out.println(betaCoach);
		
		context.close();
	}

}
