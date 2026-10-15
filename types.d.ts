interface Book {
  title: string
  author: string
  genre: string
  rating: number
  totalCopies: number
  availableCopies: number
  description: string
  coverColor: string
  coverUrl: string
  videoUrl: string
  summary: string
  isLoaned?: boolean
}

type BookCoverVariant = 'extraSmall' | 'small' | 'medium' | 'regular' | 'wide'
