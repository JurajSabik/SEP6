package com.sep6.infrastructureservices.security

import com.google.firebase.auth.FirebaseAuth

import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.HttpStatus
import org.springframework.security.web.csrf.CsrfToken
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException


@RestController
@RequestMapping("/api")
class CsrfController {
  @GetMapping("/csrf-token-old")
  fun getCsrfTokenOld(request: HttpServletRequest): CsrfToken? {
    return request.getAttribute(CsrfToken::class.java.name) as CsrfToken?
  }
  @GetMapping("/csrf-token")
  fun getCsrfToken(
    request: HttpServletRequest,
    @RequestHeader("Firebase-Token") firebaseToken: String
  ): CsrfToken? {
    // Extract the token from the Authorization header
    //initialize firebase admin sdk
    val idToken = firebaseToken.substringAfter("Bearer ")
    // Validate the Firebase token
    val decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken)
    if (decodedToken != null) {
      // Return the CSRF token if Firebase token is valid
      return request.getAttribute(CsrfToken::class.java.name) as CsrfToken?
    } else {
      throw ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid Firebase Token")
    }
  }
}