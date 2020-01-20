package com.dianduidian.xyz.pojo;

import java.util.Date;

/**
 * 对点机器人实体类
 */
public class Robot implements Comparable<Robot>{

    private String machineId;
    private String name;
    private String tuUrl;
    private Integer score;
    private Date createTime;
    private String soloId;
    private Integer total;

    public String getMachineId() {
        return machineId;
    }

    public String getName() {
        return name;
    }

    public String getTuUrl() {
        return tuUrl;
    }

    public Integer getScore() {
        return score;
    }

    public Integer getTotal() {
        return total;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public void setMachineId(String machineId) {
        this.machineId = machineId;
    }

    public void setSoloId(String soloId) {
        this.soloId = soloId;
    }

    public String getSoloId() {
        return soloId;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setcreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setTuUrl(String tuUrl) {
        this.tuUrl = tuUrl;
    }

    public void setScore(Integer score) {
        this.score = score;
    }


    @Override
    public String toString() {
        return "Robot{" + "machineId='" + machineId + '\'' + ", name='" + name + '\'' + ", tuUrl='"
            + tuUrl + '\'' + ", score=" + score + ", createTime=" + createTime + ", soloId='"
            + soloId + '\'' + ", total=" + total + '}';
    }

    @Override
    public int compareTo(Robot o) {
        if(this.score>o.score) {
            return -1;
        }else if(this.score==o.score) {
            return this.name.compareTo(o.name);
        }else {
            return 1;
        }
    }
}
