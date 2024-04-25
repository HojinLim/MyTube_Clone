import React, { useEffect, useState } from "react"

export const useMicPermission = () => {
  const [hasPermission, setHasPermission] = useState(null)

  const getHasMicPermission = () => {
    navigator.permissions
      .query({
        name: "microphone",
      })
      .then(function (permissionStatus) {
        setHasPermission(permissionStatus.state)
        return permissionStatus.state
      })
  }
  const getMicPermission = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        console.log("You let me use your mic!")
      })
      .catch(function (err) {
        console.log("No mic for you!")
      })
  }
  useEffect(() => {
    getHasMicPermission()
    console.log(hasPermission)
  }, [hasPermission, getMicPermission, getHasMicPermission])

  return { hasPermission, getHasMicPermission, getMicPermission }
}
