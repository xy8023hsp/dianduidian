package com.dianduidian.xyz.dao;

import com.dianduidian.xyz.pojo.Robot;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.TreeSet;

@Mapper
public interface RobotMapper {
    int deleteByPrimaryKey(String machineid);

    int insert(Robot record);

    int insertSelective(Robot record);

    Robot selectByPrimaryKey(String machineid);

    int updateByPrimaryKeySelective(Robot record);

    int updateByPrimaryKey(Robot record);

    ArrayList<Robot> selectScore();
}
