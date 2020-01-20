package com.dianduidian.xyz.websocket;

import java.io.IOException;

import java.util.Enumeration;
import java.util.Map;

import java.util.concurrent.ConcurrentHashMap;



import javax.servlet.http.HttpServletRequest;
import javax.websocket.OnClose;

import javax.websocket.OnError;

import javax.websocket.OnMessage;

import javax.websocket.OnOpen;

import javax.websocket.Session;

import javax.websocket.server.PathParam;

import javax.websocket.server.ServerEndpoint;



import com.dianduidian.xyz.pojo.Solo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import org.springframework.stereotype.Service;

import net.sf.json.JSONObject;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@ServerEndpoint("/websocket/{username}")
@Component
public class WebSocket {

    private static int onlineCount = 0;

    private static Map<String, WebSocket> clients = new ConcurrentHashMap<String, WebSocket>();

    private Session session;

    private String username;

    private static WebSocketService webSocketService;

    @Autowired
    public void setChatService(WebSocketService webSocketService) {
        WebSocket.webSocketService = webSocketService;
    }


    @OnOpen

    public void onOpen(Session session, @PathParam("username") String username) throws IOException {

        /*//获取所有参数
        Enumeration<String> parameterNames = request.getParameterNames();

        // 测试只有一条数据
        String param =  parameterNames.nextElement();
        JSONObject jsonTo = JSONObject.fromObject(param);
        Object nickName = jsonTo.get("nickName");*/


        this.username = username;
        this.session = session;


        addOnlineCount();

        clients.put(username, this);

        System.out.println("已连接");
        //onMessage("{'To':'All','message':'你好啊！！！'}");

    }



    @OnClose

    public void onClose() throws IOException {

        clients.remove(username);

        subOnlineCount();

    }



    @OnMessage

    public void onMessage(String message) throws IOException {


        JSONObject jsonTo = JSONObject.fromObject(message);


        String webSocketId = (String) jsonTo.get("webSocketId");

        switch (webSocketId) {
            case "1001-solo":
                Solo solo = webSocketService.solo(jsonTo);
                JSONObject jsonObject = JSONObject.fromObject(solo);
                sendMessageAll(jsonObject.toString());
                break;
            case "1002-solo":
                JSONObject jsonToSelect = webSocketService.soloSelect(jsonTo);
                sendMessageAll(jsonToSelect.toString());
                break;
            case "1003-solo":
                //比赛信息入库操作
                webSocketService.insertion(jsonTo);
                break;
            case "1001-ranking":
                //查询排行榜信息
                webSocketService.selectList(jsonTo);
                break;
            default:
                break;
        }
        //String mes = (String) jsonTo.get("message");



        //        if (!jsonTo.get("To").equals("All")) {
        //
        //            sendMessageTo(mes, jsonTo.get("To").toString());
        //
        //        } else {


    }



    @OnError

    public void onError(Session session, Throwable error) {

        error.printStackTrace();

    }



    public void sendMessageTo(String message, String To) throws IOException {

        // session.getBasicRemote().sendText(message);

        //session.getAsyncRemote().sendText(message);

        for (WebSocket item : clients.values()) {

            if (item.username.equals(To))

                item.session.getAsyncRemote().sendText(message);

        }

    }



    public void sendMessageAll(String message) throws IOException {

        for (WebSocket item : clients.values()) {

            item.session.getAsyncRemote().sendText(message);

        }

    }



    public static synchronized int getOnlineCount() {

        return onlineCount;

    }



    public static synchronized void addOnlineCount() {

        WebSocket.onlineCount++;

    }



    public static synchronized void subOnlineCount() {

        WebSocket.onlineCount--;

    }



    public static synchronized Map<String, WebSocket> getClients() {

        return clients;

    }

}
