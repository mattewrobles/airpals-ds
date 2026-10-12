import figma from '@figma/code-connect'
import { IconButton } from '../src/lib/IconButton'

figma.connect(IconButton, 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=747-8438', {
  props: {
    variant: figma.enum('States', {
      Normal:  'normal',
      Outline: 'outline',
      Glow:    'glow',
    }),
  },
  example: ({ variant }) => (
    <IconButton variant={variant} icon="plus" aria-label="Add" />
  ),
})
