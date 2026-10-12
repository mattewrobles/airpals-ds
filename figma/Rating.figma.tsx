import figma from '@figma/code-connect'
import { Rating } from '../src/lib/Rating'

figma.connect(Rating, 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=745-9986', {
  props: {
    size: figma.enum('State', { Normal: 'md', Sm: 'sm' }),
  },
  example: ({ size }) => (
    <Rating value={4} size={size} />
  ),
})
