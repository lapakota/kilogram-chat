export const formatDate = (createdAt: string) => {
  const currentDate = new Date().toLocaleDateString()

  const date = new Date(createdAt).toLocaleDateString()
  const time = new Date(createdAt).toLocaleTimeString()

  if (currentDate === date) return time.split(":").slice(0, 2).join(":")

  return date
}