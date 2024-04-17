import React from "react"
import { useParams } from "react-router-dom"

export const SearchPage = () => {
  const params = useParams()
  console.log(params.keyword)
  return <div>SearchPage</div>
}
