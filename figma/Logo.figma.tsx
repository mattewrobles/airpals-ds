import figma from '@figma/code-connect'
import { Logo } from '../src/lib/Logo'

figma.connect(Logo, 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=572-91', {
  props: {},
  example: () => (
    <Logo />
  ),
})
