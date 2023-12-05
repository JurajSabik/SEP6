package com.sep6.infrastructureservices.rest.exception_handling

import com.sep6.infrastructureservices.persistence.exceptions.AlreadyFollowingException
import com.sep6.infrastructureservices.persistence.exceptions.ResourceNotFoundException
import io.github.oshai.kotlinlogging.KotlinLogging
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.http.converter.HttpMessageNotReadableException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.context.request.WebRequest
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException
import validators.exceptions.ValidationException
import java.util.*

private val logger = KotlinLogging.logger {}
@ControllerAdvice
class ControllerExceptionHandler {
  @ExceptionHandler(ResourceNotFoundException::class)
  fun resourceNotFoundException(ex: ResourceNotFoundException, request: WebRequest): ResponseEntity<ErrorMessage> {
    val message = getMessage(ex, request, HttpStatus.NOT_FOUND.value())
    return ResponseEntity(message, HttpStatus.NOT_FOUND)
  }
  @ExceptionHandler(HttpMessageNotReadableException::class)
  fun httpMessageNotReadableException(ex: HttpMessageNotReadableException, request: WebRequest): ResponseEntity<ErrorMessage> {
    val message = getMessage(ex, request, HttpStatus.BAD_REQUEST.value())
    return ResponseEntity(message, HttpStatus.BAD_REQUEST)
  }
  @ExceptionHandler(AlreadyFollowingException::class)
  fun alreadyFollowingException(ex: AlreadyFollowingException, request: WebRequest): ResponseEntity<ErrorMessage> {
    val message = getMessage(ex, request, HttpStatus.BAD_REQUEST.value())
    return ResponseEntity(message, HttpStatus.BAD_REQUEST)
  }
  @ExceptionHandler(ValidationException::class)
  fun validationExceptionHandler(ex: Exception, request: WebRequest): ResponseEntity<ErrorMessage> {
    val message = getMessage(ex, request, HttpStatus.BAD_REQUEST.value())
    return ResponseEntity(message, HttpStatus.BAD_REQUEST)
  }

  @ExceptionHandler(MethodArgumentTypeMismatchException::class)
  fun methodArgumentTypeMismatchHandler(ex: Exception, request: WebRequest): ResponseEntity<ErrorMessage> {
    val message = getMessage(ex, request, HttpStatus.BAD_REQUEST.value())
    return ResponseEntity(message, HttpStatus.BAD_REQUEST)
  }

  @ExceptionHandler(IllegalArgumentException::class)
  fun illegalArgumentExceptionHandler(ex: Exception, request: WebRequest): ResponseEntity<ErrorMessage> {
    val message = getMessage(ex, request, HttpStatus.BAD_REQUEST.value())
    return ResponseEntity(message, HttpStatus.BAD_REQUEST)
  }

  @ExceptionHandler(Exception::class)
  fun globalExceptionHandler(ex: Exception, request: WebRequest): ResponseEntity<ErrorMessage> {
    val message = getMessage(ex, request, HttpStatus.INTERNAL_SERVER_ERROR.value())
    return ResponseEntity(message, HttpStatus.INTERNAL_SERVER_ERROR)
  }


  private fun getMessage(ex: Exception, request: WebRequest, statusValue: Int): ErrorMessage? {
    return ex.message?.let {
      logger.error (ex) {ex.message}
      ErrorMessage(
        statusValue,
        Date(),
        it,
        request.getDescription(false)
      )
    }
  }
}