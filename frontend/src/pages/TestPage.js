import { ShortsContainerr } from "components/shorts/ShortsContainerr"
import { dummyData } from "dummy"
import { getAverageRGBFromJpgUrl } from "functions/getAverageRGBFromJpgUrl"
import person from "assets/images/person.png"
import logo from "assets/images/logos/logo.png"
import React from "react"

export const TestPage = () => {
  const dummy = dummyData
  console.log(dummy[0].thumb)
  console.log(getAverageRGBFromJpgUrl(dummy[0].thumb))
  const getData = async () => {
    console.log(await getAverageRGBFromJpgUrl(dummy[0].thumb))
  }
  getData()
  return <div>ss</div>
}
