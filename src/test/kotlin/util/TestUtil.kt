package util

fun simulateUserInput(input: String) {
    System.setIn(input.byteInputStream())
}
