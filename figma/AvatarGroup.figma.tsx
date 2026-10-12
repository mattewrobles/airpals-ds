import figma from '@figma/code-connect'
import { AvatarGroup } from '../src/lib/AvatarGroup'

figma.connect(AvatarGroup, 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=747-8469', {
  props: {
    size: figma.enum('Sizes', {
      'Extra Small': 'xs', Small: 'sm', Medium: 'md', Large: 'lg', 'Extra Large': 'xl',
    }),
  },
  example: ({ size }) => (
    <AvatarGroup size={size} avatars={[{ src: '/a.jpg' }, { src: '/b.jpg' }, { src: '/c.jpg' }]} />
  ),
})
