import { cn } from 'cn'
import Image from 'next/image'
import BookCoverSvg from './BookCoverSvg'

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: 'book-cover_extra_small',
  small: 'book-cover_small',
  medium: 'book-cover_medium',
  regular: 'book-cover_regular',
  wide: 'book-cover_wide',
}

interface Props {
  className?: string
  variant?: BookCoverVariant
  coverColor: string
  coverImage: string
}

const BookCover = ({
  variant = 'regular',
  className,
  coverColor = '#012B48 ',
  coverImage = 'https://placehold.co/400x600.png',
}: Props) => {
  return (
    <div className={cn('relative transition-all duration-300', variantStyles[variant], className)}>
      {/* Book Side SVG */}
      <BookCoverSvg coverColor={coverColor} />
      {/* Book Side SVG */}

      <div
        className='absolute z-10'
        style={{ left: '12%', width: '87.5%', height: '88% ' }}
      >
        <Image
          src={coverImage}
          alt='Book Cover'
          fill
          sizes='100%'
          loading='lazy'
          className='rounded-sm object-fill'
        />
      </div>
    </div>
  )
}

export default BookCover
