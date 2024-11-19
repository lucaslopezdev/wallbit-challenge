import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

interface StarRatingProps {
  rating: number
}

export default function StarRating({ rating }: StarRatingProps) {
  const stars = []
  const roundedRating = Math.round(rating * 2) / 2

  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      stars.push(<FaStar key={i} className="text-yellow-400" />)
    } else if (
      i === Math.ceil(roundedRating) &&
      !Number.isInteger(roundedRating)
    ) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />)
    } else {
      stars.push(<FaRegStar key={i} className="text-gray-300" />)
    }
  }

  return (
    <div className="flex items-center">
      {stars}
      <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  )
}
