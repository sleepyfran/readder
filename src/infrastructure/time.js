/**
 * Returns the current time. This abstraction allows us to easily switch the returned time in tests.
 */
const now = () => Date.now()

export default { now }
