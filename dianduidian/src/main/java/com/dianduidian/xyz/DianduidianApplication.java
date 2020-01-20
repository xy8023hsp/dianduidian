package com.dianduidian.xyz;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@ServletComponentScan

@MapperScan("com.dianduidian.xyz.dao")
public class DianduidianApplication {

    public static void main(String[] args) {
        SpringApplication.run(DianduidianApplication.class, args);
    }

    /*@Bean
    public EmbeddedServletContainerFactory servletContainer() {
        //springboot版本不同可能下面的类名会不同或者类的包路径会不同
        TomcatEmbeddedServletContainerFactory tomcat = new TomcatEmbeddedServletContainerFactory() {
            @Override
            protected void postProcessContext(Context context) {
                SecurityConstraint constraint = new SecurityConstraint();
                constraint.setUserConstraint("CONFIDENTIAL");
                SecurityCollection collection = new SecurityCollection();
                collection.addPattern("/*");
                constraint.addCollection(collection);
                context.addConstraint(constraint);
            }
        };
        tomcat.addAdditionalTomcatConnectors(httpConnector());
        return tomcat;
    }

    @Bean
    public Connector httpConnector() {
        Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
        connector.setScheme("http");
        //监听http的端口号
        connector.setPort(80);
        connector.setSecure(false);
        //监听到http的端口号后转向到的https的端口号
        System.out.println("监听到了80端口");
        connector.setRedirectPort(443);//这里的端口写成和配置文件一样的端口就Ok
        return connector;
    }*/

}
