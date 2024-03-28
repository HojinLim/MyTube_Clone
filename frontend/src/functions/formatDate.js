export const formatDate = (dateString) => {
  const dateObject = new Date(dateString)

  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(dateObject)

  return formattedDate
}
