export const formatDateArray = (created_at) => {
  const date = new Date(created_at)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day]
}
