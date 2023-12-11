package model.types

class Result(
    var isSuccess: Boolean,
    var message: String? = null,
    var data: Any? = null,
    var error: Any? = null,
)
