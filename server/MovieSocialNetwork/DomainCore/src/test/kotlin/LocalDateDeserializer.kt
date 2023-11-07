import com.google.gson.*
import java.lang.reflect.Type
import java.time.LocalDate
import java.time.format.DateTimeFormatter

class LocalDateDeserializer : JsonDeserializer<LocalDate> {
  private val formatter = DateTimeFormatter.ISO_LOCAL_DATE

  override fun deserialize(json: JsonElement?, typeOfT: Type?, context: JsonDeserializationContext?): LocalDate {
    return LocalDate.parse(json?.asJsonPrimitive?.asString, formatter)
  }
}