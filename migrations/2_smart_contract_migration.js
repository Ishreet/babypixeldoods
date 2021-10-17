const TinyTurtles = artifacts.require('TinyTurtles')

module.exports = function (deployer) {
	deployer.deploy(TinyTurtles)
}
