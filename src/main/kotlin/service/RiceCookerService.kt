package service

import model.RiceCooker
import model.types.Result
fun riceGramToLiter(riceGram: Double): Double {
    val densityOfRice: Double = 0.6  // g/ml
    val riceCapacityInLiters: Double = (riceGram / 1000) / densityOfRice   // l
    return riceCapacityInLiters
}

fun riceWithWater(riceGram: Double, waterLiter: Double): Double {
    return waterLiter + riceGramToLiter(riceGram)    // l
}

fun isCanBeContained(riceCooker: RiceCooker, riceGram: Double = 0.0, waterLiter: Double = 0.0): Boolean {
    return riceCooker.maxCapacityLiter > riceWithWater(riceCooker.riceGram + riceGram, riceCooker.waterLiter + waterLiter)
}

fun addRice(riceCooker: RiceCooker): Result {
    print("add rice (grams): ")
    val inputStr: String = readlnOrNull() ?: ""
    return try {
        val riceAdd: Double = inputStr.toDouble()
        if (riceAdd > 0) {
            if (!isCanBeContained(riceCooker, riceGram = riceAdd)) {
                Result(false, "You exceed the maximum capacity of the rice cooker")
            } else {
                riceCooker.riceGram += riceAdd
                Result(true, "$riceAdd gram of rice added", riceCooker)
            }
        } else {
            throw NumberFormatException()
        }
    } catch (nfe: NumberFormatException) {
        Result(false, "Enter a valid number - Retry", error =  nfe)
    }
}

fun addWater(riceCooker: RiceCooker): Result {
    print("add water (liters): ")
    val inputStr: String = readlnOrNull() ?: ""
    return try {
        val waterAdd: Double = inputStr.toDouble()
        if (waterAdd > 0) {
            if (!isCanBeContained(riceCooker, waterLiter = waterAdd)) {
                Result(false, "You exceed the maximum capacity of the rice cooker")
            } else {
                riceCooker.waterLiter += waterAdd
                Result(true, "$waterAdd liter of water added", riceCooker)
            }
        } else {
            throw NumberFormatException()
        }
    } catch (nfe: NumberFormatException) {
        Result(false, "Enter a valid number - Retry", error = nfe)
    }
}

fun removeRice(riceCooker: RiceCooker): Result {
    print("remove rice (grams): ")
    val inputStr: String = readlnOrNull() ?: ""
    return try {
        val riceRemove: Double = inputStr.toDouble()
        if (riceRemove > 0) {
            if (riceRemove >= riceCooker.riceGram) {
                riceCooker.riceGram = 0.0
                Result(true, "All the rice has been removed")
            } else {
                riceCooker.riceGram -= riceRemove
                Result(true, "$riceRemove grams of rice have been removed", riceCooker)
            }
        } else {
            throw NumberFormatException()
        }
    } catch (nfe: NumberFormatException) {
        Result(false, "Enter a valid number - Retry", error = nfe)
    }
}

fun removeWater(riceCooker: RiceCooker): Result {
    print("remove water (liters): ")
    val inputStr: String = readlnOrNull() ?: ""
    return try {
        val waterRemove: Double = inputStr.toDouble()
        if (waterRemove > 0) {
            if (waterRemove >= riceCooker.waterLiter) {
                riceCooker.waterLiter = 0.0
                Result(true, "All water removed")
            } else {
                riceCooker.waterLiter -= waterRemove
                Result(true, "$waterRemove liter of water removed", riceCooker)
            }
        } else {
            throw NumberFormatException()
        }
    } catch (nfe: NumberFormatException) {
        Result(false, "Enter a valid number - Retry", error = nfe)
    }
}

fun drain(riceCooker: RiceCooker): Result {
    riceCooker.riceGram = 0.0
    riceCooker.waterLiter = 0.0
    return Result(true, "The rice cooker has been emptied")
}

fun connectPowerSource(riceCooker: RiceCooker) {
    riceCooker.isPowered = !riceCooker.isPowered
}

fun cook(riceCooker: RiceCooker): Result {
    return try {
        if (!riceCooker.isPowered) {
            throw IllegalStateException("Your rice cooker is not connected to an electric source")
        }
        if (riceCooker.waterLiter <= 0) {
            throw IllegalStateException("The rice cooker contains no water")
        }
        if (riceCooker.riceGram <= 0) {
            throw IllegalStateException("The rice cooker does not contain rice")
        }
        if (riceCooker.waterLiter < riceGramToLiter(riceCooker.riceGram)) {
            throw IllegalStateException("The rice cooker does not contain enough water")
        }
        Result(true, "A FEW MINUTES LATER\\nYour rice is cooked")
        drain(riceCooker)
    } catch (ise: IllegalStateException) {
        Result(false, ise.message ?: "")
    }
}

fun viewContent(riceCooker: RiceCooker) {
    println("SOURCE POWER: ${riceCooker.isPowered}")
    if (riceCooker.riceGram == 0.0 && riceCooker.waterLiter == 0.0) {
        println("The rice cooker is empty")
    } else {
        if (riceCooker.waterLiter > 0) {
            println("WATER: ${riceCooker.waterLiter} liters")
        }
        if (riceCooker.riceGram > 0) {
            println("RICE: ${riceCooker.riceGram} grams")
        }
    }
}