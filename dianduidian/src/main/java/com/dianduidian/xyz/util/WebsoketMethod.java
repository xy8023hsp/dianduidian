package com.dianduidian.xyz.util;


enum Signal {

    GREEN, YELLOW, RED

}


public class WebsoketMethod {


    Signal color = Signal.RED;

    public void change() {

        switch (color) {

            case RED:

                color = Signal.GREEN;

                break;

            case YELLOW:
                color = Signal.RED;

                break;

            case GREEN:

                color = Signal.YELLOW;

                break;

        }

    }
}
