package service

import model.RiceCooker
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import util.simulateUserInput

class RiceCookerServiceTest {
    @Test
    fun riceGramToLiter() {
        Assertions.assertEquals(0.0, riceGramToLiter(0.0))
        Assertions.assertEquals(1.0, riceGramToLiter(600.0))
        Assertions.assertEquals(2.5, riceGramToLiter(1500.0))
    }

    @Test
    fun riceWithWater() {
        Assertions.assertEquals(2.0, riceWithWater(600.0, 1.0))
        Assertions.assertEquals(4.5, riceWithWater(1500.0, 2.0))
        Assertions.assertEquals(1.3333333333333335, riceWithWater(500.0, 0.5))
    }

    @Test
    fun isCanBeContained_true() {
        val riceCooker = RiceCooker(maxCapacityLiter = 3.0)

        Assertions.assertTrue(isCanBeContained(riceCooker, riceGram = 600.0, waterLiter = 1.0))
        Assertions.assertTrue(isCanBeContained(riceCooker, riceGram = 300.0, waterLiter = 2.0))
    }

    @Test
    fun isCanBeContained_false() {
        val riceCooker = RiceCooker(maxCapacityLiter = 3.0)

        Assertions.assertFalse(isCanBeContained(riceCooker, riceGram = 600.0, waterLiter = 3.0))
        Assertions.assertFalse(isCanBeContained(riceCooker, riceGram = 3000.0, waterLiter = 2.0))
    }

    @Test
    fun addRice_ok() {
        val riceCooker = RiceCooker(maxCapacityLiter = 3.0)
        simulateUserInput("300\n")

        val result = addRice(riceCooker)

        Assertions.assertTrue(result.isSuccess)
        Assertions.assertEquals("300.0 gram of rice added", result.message)
        Assertions.assertEquals(300.0, riceCooker.riceGram)
    }

    @Test
    fun addRice_ko() {
        val riceCooker = RiceCooker(maxCapacityLiter = 2.0)
        simulateUserInput("1200\n")

        val result = addRice(riceCooker)

        Assertions.assertFalse(result.isSuccess)
        Assertions.assertEquals("You exceed the maximum capacity of the rice cooker", result.message)
        Assertions.assertEquals(0.0, riceCooker.riceGram)
    }

    @Test
    fun addWater_ok() {
        val riceCooker = RiceCooker(maxCapacityLiter = 2.0)
        simulateUserInput("1.5\n")

        val result = addWater(riceCooker)

        Assertions.assertTrue(result.isSuccess)
        Assertions.assertEquals("1.5 liter of water added", result.message)
        Assertions.assertEquals(1.5, riceCooker.waterLiter)
    }

    @Test
    fun addWater_ko() {
        val riceCooker = RiceCooker(maxCapacityLiter = 2.0)
        simulateUserInput("2.5\n")

        val result = addWater(riceCooker)

        Assertions.assertFalse(result.isSuccess)
        Assertions.assertEquals("You exceed the maximum capacity of the rice cooker", result.message)
        Assertions.assertEquals(0.0, riceCooker.waterLiter)
    }

    @Test
    fun removeRice_ok() {
        val riceCooker = RiceCooker(maxCapacityLiter = 3.0)

        riceCooker.riceGram = 1200.0
        simulateUserInput("600\n")
        val result = removeRice(riceCooker)

        Assertions.assertTrue(result.isSuccess)
        Assertions.assertEquals(600.0, riceCooker.riceGram)
    }

    @Test
    fun removeWater_ok() {
        val riceCooker = RiceCooker(maxCapacityLiter = 3.0)

        riceCooker.waterLiter = 2.5
        simulateUserInput("1\n")
        val result = removeWater(riceCooker)

        Assertions.assertTrue(result.isSuccess)
        Assertions.assertEquals(1.5, riceCooker.waterLiter)
    }

    @Test
    fun drain_ok() {
        val riceCooker = RiceCooker(maxCapacityLiter = 3.0, riceGram = 600.0, waterLiter = 1.0)

        drain(riceCooker)

        Assertions.assertEquals(0.0, riceCooker.riceGram)
        Assertions.assertEquals(0.0, riceCooker.waterLiter)
    }

    @Test
    fun connectPowerSource_ok() {
        val riceCooker = RiceCooker(maxCapacityLiter = 3.0)

        connectPowerSource(riceCooker)
        Assertions.assertTrue(riceCooker.isPowered)
        connectPowerSource(riceCooker)
        Assertions.assertFalse(riceCooker.isPowered)
    }

    @Test
    fun cook_ok() {
        val riceCooker = RiceCooker(maxCapacityLiter = 3.0, riceGram = 600.0, waterLiter = 1.0)
        connectPowerSource(riceCooker)

        val result = cook(riceCooker)

        Assertions.assertTrue(result.isSuccess)
    }

    @Test
    fun cook_ko() {
        val riceCooker = RiceCooker(maxCapacityLiter = 3.0)
        connectPowerSource(riceCooker)

        val result = cook(riceCooker)

        Assertions.assertFalse(result.isSuccess)
    }
}
