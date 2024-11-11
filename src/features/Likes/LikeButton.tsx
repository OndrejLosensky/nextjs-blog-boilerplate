'use client'

import { useState } from 'react'
import { HiHeart } from 'react-icons/hi'
import { toggleLike } from './actions'
import { useRouter } from 'next/navigation'

interface LikeButtonProps {
  postId: string
  initialLikeCount: number
  initialIsLiked: boolean
  isLoggedIn: boolean
}

export function LikeButton({ postId, initialLikeCount, initialIsLiked, isLoggedIn }: LikeButtonProps) {
  const [likeCount, setLikeCount] = useState(initialLikeCount)
  const [isLiked, setIsLiked] = useState(initialIsLiked)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleLikeClick(e: React.MouseEvent) {
    e.preventDefault() // Prevent the click from bubbling up to the parent link
    
    if (!isLoggedIn) {
      router.push('/login')
      return
    }

    setIsLoading(true)
    const result = await toggleLike(postId)
    setIsLoading(false)

    if (result.success) {
      setIsLiked(!isLiked)
      setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
    }
  }

  return (
    <button
      onClick={handleLikeClick}
      disabled={isLoading}
      className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-colors
        ${isLiked 
          ? 'text-red-600 dark:text-red-400' 
          : 'text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'
        }`}
    >
      <HiHeart 
        className={`w-5 h-5 ${
          isLiked 
            ? 'fill-current' 
            : 'fill-none stroke-current'
        }`} 
      />
      <span>{likeCount}</span>
    </button>
  )
} 