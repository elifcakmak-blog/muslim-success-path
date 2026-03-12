'use client'
import { useRouter } from 'next/navigation'

interface Props {
  className?: string
  style?: React.CSSProperties
}

export default function BackButton({ className, style }: Props) {
  const router = useRouter()
  return (
    <button
      onClick={() => router.back()}
      className={className}
      style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0, ...style }}
    >
      ← Back
    </button>
  )
}
