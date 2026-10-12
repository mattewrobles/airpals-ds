import figma from '@figma/code-connect'
import { Button } from '../src/lib/Button'

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=596-24'

figma.connect(Button, FIGMA_URL, {
  props: {
    type: figma.enum('Type', {
      Primary:          'Primary',
      Secondary:        'Secondary',
      Ghost:            'Ghost',
      'Ghost II':       'Ghost II',
      Accent:           'Accent',
      'Negative Button':'Negative',
    }),
    state: figma.enum('State', {
      Default:  'Default',
      Disabled: 'Disabled',
    }),
    children: figma.string('Text#624:2'),
  },
  example: ({ type, state, children }) => (
    <Button type={type} state={state}>{children}</Button>
  ),
})
