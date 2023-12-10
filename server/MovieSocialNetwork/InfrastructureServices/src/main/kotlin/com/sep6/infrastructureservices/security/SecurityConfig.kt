package com.sep6.infrastructureservices.security

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.web.SecurityFilterChain
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.reactive.CorsConfigurationSource
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource

@Configuration
@EnableWebSecurity
class SecurityConfig(
) {
    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain? {
        return http.cors {cors -> cors.disable()}.csrf { csrf -> csrf.disable() }
            .build()
    }

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val config = CorsConfiguration()
        config.allowedOrigins = listOf("http://localhost:4200", "http://localhost:40839/", "http://localhost:42185/", "http://20.67.134.65" )
        config.allowCredentials = true
        config.setAllowedMethods(listOf("GET", "POST", "PUT", "DELETE", "OPTIONS"))
        config.allowedHeaders = listOf("*")
        config.maxAge = 3600L
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", config)
        return source
    }
}