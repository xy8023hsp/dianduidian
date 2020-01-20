package com.dianduidian.xyz.dao;

import com.dianduidian.xyz.pojo.Solo;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SoloMapper {
    int deleteByPrimaryKey(String id);

    int insert(Solo record);

    int insertSelective(Solo record);

    Solo selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Solo record);

    int updateByPrimaryKey(Solo record);
}
