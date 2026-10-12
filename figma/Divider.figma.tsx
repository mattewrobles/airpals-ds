import figma from '@figma/code-connect'
import { Divider } from '../src/lib/Divider'

figma.connect(Divider, 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=750-3189', {
  props: {
    direction: figma.enum('Direction', { Horizontal: 'horizontal', Vertical: 'vertical' }),
  },
  example: ({ direction }) => (
    <Divider direction={direction} />
  ),
})
