const initialTime = Date.now()

export const getCurrentTime = () => {
  return (Date.now() - initialTime) / 1000
}
