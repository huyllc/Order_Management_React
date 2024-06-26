<?php
/**
 * Copyright 2024 DevFast Limited. All rights reserved.
 * Email: tech@devfast.us
 * Website: http://devfast.us/
 */

namespace App\Services;

abstract class BaseService
{
    /**
     * @var Application
     */
    protected $app;

    /**
     * @param Application $app
     */
    public function __construct(Application $app)
    {
        $this->app = $app;
        $this->boot();
    }
}