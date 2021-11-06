<?php

namespace Controller;

class AbstractController
{
    /** @var array */
    protected array $controllerData = [];

    public function __construct()
    {
        $this->loadData($_POST);
        $this->loadData($_GET);
    }

    /**
     * @param array $data
     */
    protected function loadData(array $data): void
    {
        foreach ($data as $key => $value) {
            $this->controllerData[$key] = $value;
        }
    }

    /**
     * @param string $key
     * @return mixed
     */
    public function getData(string $key): mixed
    {
        return $this->controllerData[$key] ?? null;
    }

    /**
     * @param string $key
     * @return mixed
     */
    public function getEnv(string $key): mixed
    {
        return $_ENV[$key] ?? null;
    }

    /**
     * @param string $key
     * @return mixed
     */
    public static function getEnv_S(string $key): mixed
    {
        return $_ENV[$key] ?? null;
    }
}