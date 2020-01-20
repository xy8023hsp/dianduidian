package com.dianduidian.xyz.websocket;

import com.dianduidian.xyz.pojo.Robot;
import com.dianduidian.xyz.pojo.Solo;
import net.sf.json.JSONObject;

import java.util.List;

public interface WebSocketService {


    Solo solo(JSONObject jsonTo);

    JSONObject soloSelect(JSONObject jsonTo);

    void insertion(JSONObject jsonTo);

    List<Robot> selectList(JSONObject jsonTo);
}
