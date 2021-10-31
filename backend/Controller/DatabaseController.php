<?php

namespace Controller;

use Exception;
use PDO;

class DatabaseController
{
    private PDO $db;

    /**
     * @throws Exception
     */
    public function __construct()
    {
        $dsn = sprintf(
            'mysql:host=%s;dbname=%s;charset=utf8mb4',
            $_ENV['DB_HOST'],
            $_ENV['DB_DATABASE']
        );

        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ];

        try {
            $db = new PDO($dsn, $_ENV['DB_USERNAME'], $_ENV['DB_PASSWORD'], $options);
            $this->db = $db;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    /**
     * @param string         $table
     * @param array|string[] $columns
     * @param array          $conditions
     * @param array          $joins
     * @return array
     */
    public function select(string $table, array $columns = ['*'], array $conditions = [], array $joins = []): array
    {
        $params = [];
        $columnsSql = '';
        $joinSql = '';

        foreach ($columns as $name => $alias) {
            // There is no alias on this column
            if (is_int($name)) {
                $name = $alias;
                $alias = null;
            }

            // Add comma to separate columns
            if (strlen($columnsSql)) {
                $columnsSql .= ', ';
            }

            $columnsSql .= $name;


            if ($alias) {
                $columnsSql .= sprintf(' %s', $alias);
            }
        }

        foreach ($joins as $join) {
            $joinType = $join['Type'];
            $joinTable = $join['Table'];
            $fKey = $join['ForeignKey'];
            $pKey = $join['PrimaryKey'];
            $alias = $join['Alias'] ?? '';

            $joinSql .= sprintf('%s JOIN %s %s ON %s = %s ', $joinType, $joinTable, $alias, $fKey, $pKey);
        }

        $conditionSql = '';

        foreach ($conditions as $key => $value) {
            if (!$value) {
                continue;
            }

            $params[$key] = $value;

            $conditionSql = sprintf(
                '%s %s %s = :%s',
                $conditionSql,
                strlen($conditionSql) ? 'AND' : 'WHERE',
                $key,
                $key
            );
        }

        $sql = sprintf(
            "SELECT %s FROM $table %s %s",
            $columnsSql,
            $joinSql,
            $conditionSql
        );

        $stmt = $this->db
            ->prepare($sql);
        $stmt->execute($params);

        return $stmt->fetchAll();
    }

    /**
     * @param string $table
     * @param array  $data
     */
    public function insert(string $table, array $data): void
    {
        $values = '';
        $params = [];
        foreach ($data as $key => $value) {
            $values = sprintf('%s%s:%s', $values, $values ? ',' : '', $key);
            $params[$key] = $value;
        }

        $columns = str_replace(':', '', $values);
        $sql = sprintf('INSERT INTO %s (%s) VALUES (%s);', $table, $columns, $values);

        $stmt = $this->db
            ->prepare($sql);
        $stmt->execute($params);
    }

    /**
     * @param string $table
     * @param array  $data
     * @param array  $conditions
     */
    public function update(string $table, array $data, array $conditions): void
    {
        $params = [];
        $dataSql = '';

        foreach ($data as $key => $value) {
            $params["data$key"] = $value;
            $dataSql = sprintf(
                '%s %s %s = :data%s',
                $dataSql,
                strlen($dataSql) ? ',' : 'SET',
                $key,
                $key
            );
        }

        $conditionSql = '';

        foreach ($conditions as $key => $value) {
            $params["condition$key"] = $value;
            $conditionSql = sprintf(
                '%s %s %s = :condition%s',
                $conditionSql,
                strlen($conditionSql) ? 'AND' : 'WHERE',
                $key,
                $key
            );
        }

        $sql = sprintf(
            'UPDATE %s %s %s;',
            $table,
            $dataSql,
            $conditionSql
        );

        $stmt = $this->db
            ->prepare($sql);
        $stmt->execute($params);
    }

    /**
     * @return string
     */
    public function lastInsertID(): string
    {
        return $this->db->lastInsertId();
    }
}
