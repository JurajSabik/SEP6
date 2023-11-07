import com.google.gson.GsonBuilder
import com.google.gson.reflect.TypeToken
import java.io.File
import java.time.LocalDate
import java.util.stream.Stream

inline fun <reified T> getStreamOfDomainModels(fileName: String): Stream<T> {
  val rootDir = System.getProperty("user.dir")
  val filePath = "$rootDir/src/test/resources/validator-test-data/$fileName"
  val fileContents: String =
    File(filePath).readText(
      Charsets.UTF_8
    )
  val listType = object : TypeToken<List<T>>() {}.type
  val gson = GsonBuilder().registerTypeAdapter(LocalDate::class.java, LocalDateDeserializer())
    .create()
  return gson.fromJson<List<T>>(fileContents, listType).stream()
}