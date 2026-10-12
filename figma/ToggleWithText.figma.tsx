import figma from '@figma/code-connect'
import { ToggleWithText } from '../src/lib/ToggleWithText'

figma.connect(ToggleWithText, 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=625-3720', {
  props: {
    checked: figma.enum('Active', { ON: true, OFF: false }),
    style:   figma.enum('Style', { '1': 'Standard', '2': 'Navy', '3': 'Subtle' }),
  },
  example: ({ checked, style }) => (
    <ToggleWithText checked={checked} style={style} onChange={() => {}} />
  ),
})
