package com.dianduidian.xyz.util;

import java.util.UUID;

public class Uuid {

	public static String getUUID32() {

		return UUID.randomUUID().toString().replace("-", "").toLowerCase();

	}
}
