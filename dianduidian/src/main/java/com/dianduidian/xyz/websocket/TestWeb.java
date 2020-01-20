package com.dianduidian.xyz.websocket;

import java.util.Random;

public class TestWeb {

    public static void main(String[] args) {
//        WebsoketMethod websoketMethod = new WebsoketMethod();
//        websoketMethod.change();

//        Robot robot = new Robot();
//        robot.setName("张十三");
//        robot.setTuUrl("surioa");
//        JSONObject jsonObject = JSONObject.fromObject(robot);
//        System.out.println(jsonObject.toString());
        Random random = new Random();
        String tu = String.valueOf(random.nextInt(10));
        System.out.println(tu);
    }
}
