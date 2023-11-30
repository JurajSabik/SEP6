package com.sep6.infrastructureservices.rest.exception_handling

import java.util.*


class ErrorMessage(val statusCode: Int, val timestamp: Date, val message: String, val description: String)