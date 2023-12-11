package view

fun printMenu(vararg menu: String) {
    bar("Menu")
    for ((index, item) in menu.withIndex()) {
        println("${index + 1}. $item")
    }
}
