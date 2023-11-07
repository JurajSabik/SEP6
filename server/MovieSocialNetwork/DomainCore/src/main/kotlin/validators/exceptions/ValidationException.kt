package validators.exceptions

class ValidationException(errors: List<String>, validatorName: String) :
  Exception(String.format("Validation errors in %s: ", validatorName) + errors.joinToString("\n"))