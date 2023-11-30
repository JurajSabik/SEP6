package com.sep6.infrastructureservices.service

import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.ResourceLoader
import org.springframework.stereotype.Service
import javax.annotation.PostConstruct
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import com.google.auth.oauth2.GoogleCredentials
import java.io.IOException

@Service
class FirebaseInitializationService(
  private val resourceLoader: ResourceLoader,
  @Value("\${firebase.credential-file-path}") private val credentialFilePath: String
) {
  @PostConstruct
  fun initializeFirebase() {
    try {
      val resource = resourceLoader.getResource("classpath:$credentialFilePath")
      val options = FirebaseOptions.builder()
        .setCredentials(GoogleCredentials.fromStream(resource.inputStream))
        .build()

      if (FirebaseApp.getApps().isEmpty()) {
        FirebaseApp.initializeApp(options)
      }
    } catch (e: IOException) {
      throw RuntimeException("Failed to initialize Firebase", e)
    }
  }
}