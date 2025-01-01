export default async function globalTeardown() {
  global.__MONGOINSTANCE.stop()
}
