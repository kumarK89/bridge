package com.instructure.bridge.connection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

public class DBSetUp {

    static Connection connection;

    static Properties properties;

    public static Connection connection() {
        if (connection == null) {
            try {
                Class.forName("org.postgresql.Driver");

                connection = DriverManager.getConnection(
                        url(),
                        username(),
                        password());
                connection.setAutoCommit(false);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

        return connection;
    }

    public static String password() {
        return properties().getProperty("spring.datasource.password");
    }

    public static String username() {
        return properties().getProperty("spring.datasource.username");
    }

    public static String url() {
        return properties().getProperty("spring.datasource.url");
    }

    public static String driver() {
        return properties().getProperty("spring.datasource.driver-class-name");
    }

    public static Properties properties() {
        if (properties == null) {
            try {
                properties = new Properties();
                properties.load(DBSetUp.class.getResourceAsStream("/application.properties"));

            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

        return properties;
    }
}