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
        // Two ways, uncomment as necessary:
        
        // 1. One value
        /*
        const expectedPersonName = "deept"
        const expectedFavoriteNumber = "12"
        const 
        const transactionResponse = await simpleStorage.addPerson(
            expectedPersonName,
            expectedFavoriteNumber
        )
        await transactionResponse.wait(1)
        const { favoriteNumber, name } = await simpleStorage.people(0)
        assert.equal(name, expectedPersonName)
        assert.equal(favoriteNumber, expectedFavoriteNumber)
        const lengthOfPeople = await simpleStorage.getPeopleLength()
        console.log(lengthOfPeople)
        assert.equal(lengthOfPeople, 1)
        */
        
        
        // Two values:
        /*
        const expectedPersonName = "deept"
        const expectedPersonName2 = "deep2"
        const expectedFavoriteNumber = "12"
        const expectedFavoriteNumber2 = "13"
        const 
        const transactionResponse = await simpleStorage.addPerson(
            expectedPersonName,
            expectedFavoriteNumber
        )
        await transactionResponse.wait(1)
        
        const transactionResponse2 = await simpleStorage.addPerson(
            expectedPersonName2,
            expectedFavoriteNumber2
        )
        await transactionResponse2.wait(1)
        
        // First object check: Index 0
        const { favoriteNumber, name } = await simpleStorage.people(0)
        assert.equal(name, expectedPersonName)
        assert.equal(favoriteNumber, expectedFavoriteNumber)
        
        // Second object check: Index 1
        const { favoriteNumber, name } = await simpleStorage.people(1)
        assert.equal(name, expectedPersonName2)
        assert.equal(favoriteNumber, expectedFavoriteNumber2)
        const lengthOfPeople = await simpleStorage.getPeopleLength()
        console.log(lengthOfPeople)
        assert.equal(lengthOfPeople, 2)
        */
    })
})
