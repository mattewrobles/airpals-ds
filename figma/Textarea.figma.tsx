import figma from '@figma/code-connect'
import { Textarea } from '../src/lib/Textarea'

figma.connect(Textarea, 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=625-3842', {
  props: {
    placeholder: figma.string('Placeholder#33832:49'),
    helperText:  figma.string('Helper Text#33832:98'),
    disabled:    figma.enum('State', { Disabled: true, Default: false, Hover: false, Focused: false }),
  },
  example: ({ placeholder, helperText, disabled }) => (
    <Textarea placeholder={placeholder} helperText={helperText} disabled={disabled} />
  ),
})
