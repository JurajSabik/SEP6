package com.sep6.infrastructureservices.service

import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.ResourceLoader
import org.springframework.stereotype.Service
import javax.annotation.PostConstruct
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import com.google.auth.oauth2.GoogleCredentials
import java.io.IOException

/**
 * Service class for initializing Firebase in the application.
 *
 * This class is responsible for setting up Firebase with the appropriate credentials
 * upon the startup of the application. It uses Spring's `ResourceLoader` to access
 * the Firebase credentials file specified in the application properties.
 * TODO: We should probably move this approach to the other services as well.
 */
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