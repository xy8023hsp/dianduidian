package com.dianduidian.xyz.websocket;

import com.dianduidian.xyz.dao.RobotMapper;
import com.dianduidian.xyz.dao.SoloMapper;
import com.dianduidian.xyz.util.BaseName;
import com.dianduidian.xyz.util.Uuid;
import com.dianduidian.xyz.pojo.Robot;
import com.dianduidian.xyz.pojo.Solo;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class WebSocketServiceImpl implements WebSocketService{

    @Autowired
    private SoloMapper soloMapper;
    @Autowired
    private RobotMapper robotMapper;

    @Override
    public Solo solo(JSONObject jsonTo) {
        //单人对战状态

        //假设匹配人机
        //获取人机信息
        Robot robot = createMachine();
        String machineId = (String) jsonTo.get("machineId");
        robot.setMachineId(machineId);

        //构建自身信息
        Robot robotlf = new Robot();
        robotlf.setMachineId(Uuid.getUUID32());
        robotlf.setTuUrl((String)jsonTo.get("oneselfTu"));
        robotlf.setName((String)jsonTo.get("oneselfName"));

        //组合玩家信息
        List<Robot> robots = new ArrayList<>();
        robots.add(robot);
        robots.add(robotlf);


        //查找是否有空余，若没有则创建一个房间
        Solo room = isRoom();
        if (room == null){
            room = new Solo();
            room.setRobots(robots);
            room.setId(UUID.randomUUID().toString());
            room.setCreateTime(new Date());
            room.setReady("1");
            room.setFixture("60");
            room.setBaseNum(2);
        }

        return room;
    }

    @Override
    public JSONObject soloSelect(JSONObject jsonTo) {
        Integer integer = GrowthFactor();
//        List<Robot> robots = (List<Robot>) jsonTo.get("robots");
        List<Robot> robots = (List<Robot>)JSONArray.toCollection(jsonTo.getJSONArray("robots"),Robot.class);
//        List<Robot> studentList1 = JSON.pparseArray(JSON.parseObject(jsonTo).getString("robots"), Robot.class);
//        System.out.println(robots.toString());
        Robot robot = robots.get(0);
        robots.remove(0);
        robot.setScore(robot.getScore()+integer);
        robots.add(0,robot);
        jsonTo.put("robots",robots);
        return jsonTo;
    }

    @Override
    public void insertion(JSONObject jsonTo) {
        Solo   solo = (Solo) JSONObject.toBean(jsonTo, Solo.class);
        String uuid = Uuid.getUUID32();
        solo.setId(uuid);
        solo.setCreateTime(new Date());
        soloMapper.insertSelective(solo);
        List<Robot> robots = (List<Robot>)JSONArray.toCollection(jsonTo.getJSONArray("robots"),Robot.class);
        for (Robot robot : robots) {
            robot.setcreateTime(new Date());
            robot.setSoloId(uuid);
            robotMapper.insertSelective(robot);
        }

    }

    @Override
    public List<Robot> selectList(JSONObject jsonTo) {
        ArrayList<Robot> robots = robotMapper.selectScore();

        List<Robot> robotValues = robots.stream().collect(
            Collectors.collectingAndThen(Collectors.toCollection(
                () -> new TreeSet<>(Comparator.comparing(o -> o.getName()))), ArrayList::new)
        );

        Collections.sort(robotValues, new Comparator<Robot>() {
            @Override
            public int compare(Robot o1, Robot o2) {
                return o2.getScore().compareTo(o1.getScore());
            }
        });

        return robotValues;
    }

    /**
     * 随机设定增涨因子
     */
    public Integer GrowthFactor(){
        Random random = new Random();
        return  random.nextInt(6)+1;
    }

    //创建人机信息方法  Create a machine
    public Robot createMachine(){
        //构造人名
        String baseName = BaseName.getBaseName();
        //随机生成图片
        Random random = new Random();
        String tu = String.valueOf(random.nextInt(10)+1);
        Robot robot = new Robot();
        robot.setName(baseName);
        robot.setTuUrl("https://dian-1259675363.cos.ap-chengdu.myqcloud.com/image/touxiang/touxiang"+tu+".jpg");
        return robot;
    }

    public Solo isRoom(){
        //判断数据库房间表，是否空余房间，有则返回，没有则null
        return null;
    }
}
