plugins {
    kotlin("jvm") version "1.9.0"
}

dependencies {
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.16.0-rc1")
    testImplementation("com.google.code.gson:gson:2.10.1")
    testImplementation("org.apache.commons:commons-text:1.11.0")
    testImplementation(kotlin("test"))
    testImplementation ("org.junit.jupiter:junit-jupiter-params:5.9.3")

}

tasks.test {
    useJUnitPlatform()
}

kotlin {
    jvmToolchain(8)
}
