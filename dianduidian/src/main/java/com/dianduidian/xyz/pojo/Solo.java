package com.dianduidian.xyz.pojo;

import java.util.Date;
import java.util.List;

/**
 * 单人对战沙盘
 */
public class Solo {

    private String id;
    //对战状态
    private String status;
    //是否准备 0 1
    private String ready;
    //对战对象
    private List<Robot> robots;
    //上比分
    private String upScore;
    //下比分
    private String downScore;
    //比赛时间
    private String fixture;
    //创建时间
    private Date createTime;
    //胜者id
    private String victorId;
    //房间人数
    private Integer baseNum;

    public void setId(String id) {
        this.id = id;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setReady(String ready) {
        this.ready = ready;
    }

    public void setRobots(List<Robot> robots) {
        this.robots = robots;
    }

    public void setUpScore(String upScore) {
        this.upScore = upScore;
    }

    public void setDownScore(String downScore) {
        this.downScore = downScore;
    }

    public void setFixture(String fixture) {
        this.fixture = fixture;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public void setVictorId(String victorId) {
        this.victorId = victorId;
    }

    public void setBaseNum(Integer baseNum) {
        this.baseNum = baseNum;
    }

    public String getId() {
        return id;
    }

    public String getStatus() {
        return status;
    }

    public String getReady() {
        return ready;
    }

    public List<Robot> getRobots() {
        return robots;
    }

    public String getUpScore() {
        return upScore;
    }

    public String getDownScore() {
        return downScore;
    }

    public String getFixture() {
        return fixture;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public String getVictorId() {
        return victorId;
    }

    public Integer getBaseNum() {
        return baseNum;
    }

    @Override
    public String toString() {
        return "Solo{" + "id='" + id + '\'' + ", status='" + status + '\'' + ", ready='" + ready
            + '\'' + ", robots=" + robots + ", upScore='" + upScore + '\'' + ", downScore='"
            + downScore + '\'' + ", fixture='" + fixture + '\'' + ", createTime='" + createTime
            + '\'' + ", victorId='" + victorId + '\'' + ", baseNum=" + baseNum + '}';
    }
}
