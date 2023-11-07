package validators

interface Validator<T> {
    fun  validate(entity: T)
}