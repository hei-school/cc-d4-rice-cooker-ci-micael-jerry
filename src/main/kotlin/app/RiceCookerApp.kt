package app

import model.RiceCooker
import view.printMenu
import model.types.Result
import service.*
import view.bar

fun add(riceCooker: RiceCooker) {
    var conditionRunning = true
    while (conditionRunning) {
        printMenu("Add rice", "Add water", "Do not add")
        print("Choice: ")
        val inputStr: String = readlnOrNull() ?: ""

        val choice: Int = inputStr.toIntOrNull() ?: 0
        when (choice) {
            1 -> {
                val res: Result = addRice(riceCooker)
                println(res.message)
            }
            2 -> {
                val res: Result = addWater(riceCooker)
                println(res.message)
            }
            3 -> conditionRunning = false
            else -> println("RETRY")
        }
    }
}

fun remove(riceCooker: RiceCooker) {
    var conditionRunning = true
    while (conditionRunning) {
        printMenu("Remove rice", "Remove water", "Empty the rice cooker", "Do not remove")
        print("Choix: ")
        val inputStr: String = readlnOrNull() ?: ""

        val choice: Int = inputStr.toIntOrNull() ?: 0
        when (choice) {
            1 -> {
                val res: Result = removeRice(riceCooker)
                println(res.message)
            }
            2 -> {
                val res: Result = removeWater(riceCooker)
                println(res.message)
            }
            3 -> {
                val res: Result = drain(riceCooker)
                println(res.message)
            }
            4 -> conditionRunning = false
            else -> println("RETRY")
        }
    }
}

fun run() {
    println("Welcome")
    val riceCooker: RiceCooker = RiceCooker(maxCapacityLiter = 5.0)

    println("THE MAXIMUM CAPACITY OF THE RICE COOKER IS ${riceCooker.maxCapacityLiter} LITERS")
    var conditionRunning = true
    while (conditionRunning) {
        val choice4: String = if (!riceCooker.isPowered) "Connect to a power source" else "Disconnect from a power source"
        printMenu("Status", "Add", "Remove", choice4, "Cook", "Exit")
        print("Choice: ")
        val inputStr: String = readlnOrNull() ?: ""

        val choice: Int = inputStr.toIntOrNull() ?: 0
        when (choice) {
            1 -> {
                bar("Status")
                viewContent(riceCooker)
            }
            2 -> {
                bar("Add")
                add(riceCooker)
            }
            3 -> {
                bar("Remove")
                remove(riceCooker)
            }
            4 -> {
                bar(choice4)
                connectPowerSource(riceCooker)
            }
            5 -> {
                bar("Cook")
                val res: Result = cook(riceCooker)
                println(res.message)
            }
            6 -> {
                conditionRunning = false
                println("Bye")
            }
            else -> println("RETRY")
        }
    }
}