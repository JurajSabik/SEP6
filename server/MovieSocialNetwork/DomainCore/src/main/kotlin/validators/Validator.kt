package validators

interface Validator<T> {
    suspend fun  validate(entity: T)
}