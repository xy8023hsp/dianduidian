package com.dianduidian.xyz.controller;

import com.dianduidian.xyz.pojo.Robot;
import com.dianduidian.xyz.websocket.WebSocketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/v1")
public class TestController {

    @Autowired
    private WebSocketService webSocketService;

    @RequestMapping(value = "/test", method = RequestMethod.POST)
    public String test(){
        System.out.println("hello word test");
        return "hello";
    }

    @RequestMapping(value = "/score", method = RequestMethod.GET)
    public List<Robot> selectScore(){
        List<Robot> robots = webSocketService.selectList(null);
        return robots;
    }
}
