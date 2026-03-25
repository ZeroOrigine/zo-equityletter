"use client"

import * as React from "react"

type ToastVariant = "default" | "destructive" | "success"

interface ToastItem {
  id: string
  title?: string
  description?: string
  variant?: ToastVariant
}

let toastCount = 0

function useToast() {
  const [toasts, setToasts] = React.useState<ToastItem[]>([])

  const addToast = React.useCallback(
    ({ title, description, variant = "default" }: Omit<ToastItem, "id">) => {
      const id = String(++toastCount)
      setToasts((prev) => [...prev, { id, title, description, variant }])
      // Auto-remove after 5s
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, 5000)
      return id
    },
    []
  )

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { toasts, addToast, removeToast }
}

export { useToast }
export type { ToastItem }
