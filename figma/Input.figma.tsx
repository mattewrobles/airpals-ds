import figma from '@figma/code-connect'
import { Input } from '../src/lib/Input'

figma.connect(Input, 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=625-2537', {
  props: {
    placeholder: figma.string('Placeholder#33767:73'),
    label:       figma.string('Type Label Text#33767:0'),
    helperText:  figma.string('Type Helper Text#33767:146'),
    disabled: figma.enum('State', { Disabled: true, Default: false, Hover: false, Focused: false }),
    status: figma.enum('Status', {
      Default: 'default',
      Error:   'error',
      Success: 'success',
    }),
  },
  example: ({ placeholder, label, helperText, disabled, status }) => (
    <Input
      placeholder={placeholder}
      label={label}
      helperText={helperText}
      disabled={disabled}
      status={status}
    />
  ),
})
