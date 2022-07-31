const { assert } = require("chai")
const { ethers } = require("hardhat")

describe("SimpleStorage", function (params) {
    let simpleStorageFactory
    let simpleStorage
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })
    it("Should start with a fav number of 13", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "13"
        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Should update when we call store", async function () {
        const newValue = "7"
        const transactionResponse = await simpleStorage.store(newValue)
        await transactionResponse.wait(1)
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = newValue
        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Person should be added when calling addPerson", async function () {
        const expectedPersonName = "deept"
        const expectedFavoriteNumber = "12"
        const transactionResponse = await simpleStorage.addPerson(
            expectedPersonName,
            expectedFavoriteNumber
        )
        await transactionResponse.wait(1)
        const { favoriteNumber, name } = await simpleStorage.people(0)
        assert.equal(name, expectedPersonName)
        assert.equal(favoriteNumber, expectedFavoriteNumber)
        const lengthOfPeople = await simpleStorage.people.length
        console.log(lengthOfPeople)
        assert.equal(lengthOfPeople, 1)
    })
})
