package com.sep6.infrastructureservices.security

import jakarta.servlet.http.HttpServletRequest
import org.springframework.security.web.csrf.CsrfToken
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api") // Define your base path here
class CsrfController {
  @GetMapping("/csrf-token")
  fun getCsrfToken(request: HttpServletRequest): CsrfToken? {
    return request.getAttribute(CsrfToken::class.java.name) as CsrfToken?
  }
}