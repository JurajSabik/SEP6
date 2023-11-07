plugins {
    kotlin("jvm") version "1.9.0"
}

dependencies {
    implementation(project(mapOf("path" to ":DomainServices")))
  implementation(project(mapOf("path" to ":DomainCore")))
  testImplementation(kotlin("test"))
}

tasks.test {
    useJUnitPlatform()
}

kotlin {
    jvmToolchain(8)
}
