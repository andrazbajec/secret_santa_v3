<?php

namespace Controller;

use PDO;
use PDOException;

class DatabaseController
{
    protected PDO $db;
    protected string $error;

    public function __construct()
    {
        $dbHost = $_ENV["DB_HOST"];
        $dbUser = $_ENV["DB_USERNAME"];
        $dbName = $_ENV["DB_DATABASE"];
        $dbPassword = $_ENV["DB_PASSWORD"];
        $charset = 'utf8mb4';

        try {
            $dd = "mysql:host=$dbHost;dbname=$dbName;charset=$charset";
            $db = new PDO($dd, $dbUser, $dbPassword);
            $this->db = $db;
        } catch (PDOException $e) {
            $this->error = $e->getMessage();
        }
    }

    /**
     * @param string $table
     * @param array $data
     */
    public function insert(string $table, array $data)
    {
        $values = '';
        $params = [];
        foreach ($data as $key => $value) {
            $values = sprintf('%s:%s%s', $values, $key, $value != end($data) ? ', ' : '');
            $params[$key] = $value;
        }

        $columns = str_replace(':', "", $values);
        $sql = sprintf("insert into $table (%s) values (%s);", $columns, $values);

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
    }

    /**
     * @param string $table
     * @param array $data
     * @param array $tableColumns
     * @return array
     */
    public function select(string $table, array $data, array $tableColumns): array
    {
        $values = '';
        $params = [];
        foreach ($data as $key => $value) {
            $values = sprintf('%s%s=:%s%s', $values, $key, $key, $value != end($data) ? ' and ' : '');
            $params["$key"] = $value;
        }
        $columns = implode(',', $tableColumns);

        $sql = sprintf("select %s from $table where %s;", $columns, $values);
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }
}