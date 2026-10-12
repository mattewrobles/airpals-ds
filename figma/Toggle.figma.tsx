import figma from '@figma/code-connect'
import { Toggle } from '../src/lib/Toggle'

figma.connect(Toggle, 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=742-64561', {
  props: {
    checked:  figma.enum('Pressed', { True: true, False: false }),
    disabled: figma.enum('State', { Disabled: true, Default: false, Hover: false, Focus: false }),
  },
  example: ({ checked, disabled }) => (
    <Toggle checked={checked} disabled={disabled} onChange={() => {}} />
  ),
})
