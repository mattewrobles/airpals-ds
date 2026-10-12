import figma from '@figma/code-connect'
import { Checkbox } from '../src/lib/Checkbox'

figma.connect(Checkbox, 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=594-98', {
  props: {
    checked:       figma.enum('🟢 Active', { On: true, Off: false }),
    indeterminate: figma.enum('❓ Indeterminate', { On: true, Off: false }),
    disabled:      figma.enum('📌 State', { Disabled: true, Default: false, Hover: false, Focused: false }),
    size:          figma.enum('📏 Size', { Medium: 'md', Small: 'sm' }),
  },
  example: ({ checked, indeterminate, disabled, size }) => (
    <Checkbox checked={checked} indeterminate={indeterminate} disabled={disabled} size={size} />
  ),
})
