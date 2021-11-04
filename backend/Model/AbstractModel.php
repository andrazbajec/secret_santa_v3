<?php

namespace Model;

use Controller\DatabaseController;

class AbstractModel
{
    /** @var array */
    public array $fillable = [];
    /** @var DatabaseController */
    protected DatabaseController $databaseController;

    public function __construct()
    {
        $this->databaseController = new DatabaseController();
    }

    /**
     * @return array
     */
    public function toArray(): array
    {
        $data = [];

        foreach ($this->fillable as $key) {
            $value = $this->$key ?? null;

            $data[$key] = $value;
        }

        return $data;
    }

    /**
     * @return string
     */
    public function getLastID(): string
    {
        return $this->databaseController->lastInsertID();
    }
}