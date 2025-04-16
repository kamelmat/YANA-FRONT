import { useState, useEffect, useRef } from "react"

interface MuteSettings {
  duration: "1h" | "24h"
  createdAt: number
}

interface Settings {
  mode: "dark" | "light"
  appSounds: boolean
  fontSize: "small" | "large"
  saveHistory: boolean
  hideStatus: boolean
  mute: MuteSettings | null
  notifications: boolean
  personification: string
}

const defaultSettings: Settings = {
  mode: "dark",
  appSounds: true,
  fontSize: "small",
  saveHistory: true,
  hideStatus: false,
  mute: null,
  notifications: true,
  personification: "lightBlue",
}

const getMuteEndTime = (mute: MuteSettings): number => {
  return mute.createdAt + (mute.duration === "1h" ? 3600000 : 86400000)
}

export function useSettings() {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const [settings, setSettings] = useState<Settings>(() => {
    const savedSettings = localStorage.getItem("settings")
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings)
      if (parsed.mute) {
        const now = Date.now()
        const muteEndTime = getMuteEndTime(parsed.mute)
        if (now > muteEndTime) {
          parsed.mute = null
        }
      }
      return parsed
    }
    return defaultSettings
  })

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings))
  }, [settings])

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (settings.mute) {
      const muteEndTime = getMuteEndTime(settings.mute)
      const now = Date.now()
      const timeUntilExpiration = muteEndTime - now

      if (timeUntilExpiration > 0) {
        timeoutRef.current = setTimeout(() => {
          setSettings((prev) => ({
            ...prev,
            mute: null,
          }))
        }, timeUntilExpiration)
      } else {
        setSettings((prev) => ({
          ...prev,
          mute: null,
        }))
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [settings.mute])

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((prev) => {
      if (key === "mute" && value) {
        return { ...prev, [key]: { duration: value, createdAt: Date.now() } }
      }
      return { ...prev, [key]: value }
    })
  }

  return { settings, updateSetting }
}
